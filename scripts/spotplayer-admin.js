#!/usr/bin/env node
// Spot Player operator CLI.
//
//   npm run spotplayer courses          list course IDs for SPOTPLAYER_COURSE_IDS
//   npm run spotplayer pending          show paid orders with no licence yet
//   npm run spotplayer retry            issue licences for every pending order
//   npm run spotplayer retry <orderId>  issue the licence for one order
//
// `retry` exists because a paid order whose licence call failed represents money
// already taken. There is intentionally no HTTP endpoint for this.

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");
const spotPlayer = require("../server/spotplayer");

const dbPath = path.join(__dirname, "..", "data", "orders.sqlite");
const PENDING_STATUSES = ["paid", "paid_licence_pending"];

async function main() {
  const [command, argument] = process.argv.slice(2);

  switch (command) {
    case "courses":
      return listCourses();
    case "pending":
      return listPending();
    case "retry":
      return retry(argument);
    default:
      console.log("Usage: npm run spotplayer <courses|pending|retry [orderId]>");
      process.exitCode = 1;
  }
}

async function listCourses() {
  const courses = await spotPlayer.listCourses();
  const rows = Array.isArray(courses) ? courses : courses?.data || [];

  if (rows.length === 0) {
    console.log("No courses returned. Check that SPOTPLAYER_API is correct.");
    return;
  }

  console.log("Course ID                  Name");
  for (const course of rows) {
    console.log(`${String(course._id || "?").padEnd(26)} ${course.name || ""}`);
  }
  console.log("\nPut the IDs you sell into SPOTPLAYER_COURSE_IDS (comma-separated) in .env.");
}

function listPending() {
  const orders = openDb()
    .prepare(
      `SELECT * FROM orders
       WHERE status IN (${PENDING_STATUSES.map(() => "?").join(",")})
       ORDER BY created_at`
    )
    .all(...PENDING_STATUSES);

  if (orders.length === 0) {
    console.log("No paid orders are waiting for a licence.");
    return;
  }

  console.log(`${orders.length} paid order(s) waiting for a licence:\n`);
  for (const order of orders) {
    console.log(
      `${order.id}  ${order.created_at}  ${order.full_name} (${order.mobile})  ` +
        `status=${order.status} spotplayer=${order.spotplayer_status}` +
        (order.error_message ? `\n    last error: ${order.error_message}` : "")
    );
  }
}

async function retry(orderId) {
  const db = openDb();
  const orders = orderId
    ? [db.prepare("SELECT * FROM orders WHERE id = ?").get(orderId)].filter(Boolean)
    : db
        .prepare(
          `SELECT * FROM orders
           WHERE status IN (${PENDING_STATUSES.map(() => "?").join(",")})
           ORDER BY created_at`
        )
        .all(...PENDING_STATUSES);

  if (orders.length === 0) {
    console.log(orderId ? `Order ${orderId} was not found.` : "Nothing to retry.");
    return;
  }

  // Guard against re-issuing (and re-charging a course seat) for a licence that
  // already exists.
  const alreadyIssued = orders.filter((order) => order.spotplayer_license_key);
  for (const order of alreadyIssued) {
    console.log(`Skipping ${order.id}: a licence already exists (${order.spotplayer_license_key}).`);
  }

  const targets = orders.filter((order) => !order.spotplayer_license_key);
  if (targets.length === 0) return;

  spotPlayer.assertConfigured();

  const update = db.prepare(
    `UPDATE orders
     SET updated_at = ?, status = ?, spotplayer_status = ?,
         spotplayer_license_id = ?, spotplayer_license_key = ?, spotplayer_license_url = ?,
         error_message = ?
     WHERE id = ?`
  );

  for (const order of targets) {
    if (!PENDING_STATUSES.includes(order.status)) {
      console.log(`Skipping ${order.id}: status is "${order.status}", not a paid order.`);
      continue;
    }

    try {
      const licence = await spotPlayer.createLicence({
        name: order.full_name,
        watermarkText: spotPlayer.buildWatermark({
          fullName: order.full_name,
          mobile: order.mobile,
          email: order.email,
        }),
        payload: order.id,
      });

      update.run(
        new Date().toISOString(),
        "licence_issued",
        "issued",
        licence.id,
        licence.key,
        licence.url,
        null,
        order.id
      );

      console.log(`Issued for ${order.id} (${order.full_name}): key=${licence.key} url=${licence.url}`);
    } catch (error) {
      update.run(
        new Date().toISOString(),
        "paid_licence_pending",
        "failed",
        null,
        null,
        null,
        error.message,
        order.id
      );
      console.error(`FAILED for ${order.id} (${order.full_name}): ${error.message}`);
      process.exitCode = 1;
    }
  }
}

function openDb() {
  // node:sqlite has no fileMustExist option, and would silently create an empty
  // database — which would report "nothing to retry" for orders that do exist.
  if (!fs.existsSync(dbPath)) {
    throw new Error(`No order database at ${dbPath}. Start the server once, or run this on the server.`);
  }
  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA journal_mode = WAL;");
  return db;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
