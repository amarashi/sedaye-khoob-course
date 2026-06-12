/* Testimonials — 3D carousel (faithful to the original site): active card
   front-center, prev/next tilted behind on the sides, dots + arrows. */
const TestDS = window.SedayeKhoobDesignSystem_7ce729;

const T_ITEMS = [
  { quote: "«برای اولین بار فهمیدم فاصله‌ها فقط اسم نیستند؛ واقعاً می‌شود صدایشان را تشخیص داد و در تمرین ساز از آن‌ها استفاده کرد.»", name: "یارا گیگیلی", role: "هنرجوی پیانو", art: "../../assets/design/testimonial-piano.png", accent: "indigo" },
  { quote: "«درس‌ها کوتاه و مرتب‌اند. وقتی تمرین‌ها را انجام می‌دهم، حس می‌کنم تئوری بالاخره به آهنگسازی روزمره‌ام وصل شده است.»", name: "امیر بتهوونیان", role: "تولیدکننده‌ی موسیقی", art: "../../assets/design/testimonial-guitar.png", accent: "gold" },
  { quote: "«لحن آموزش آرام و قدم‌به‌قدم است. بدون این‌که در اصطلاحات گم شوم، گام‌ها و آکوردهای پایه را بهتر شنیدم.»", name: "محیا اشی مشی", role: "هنرجوی آواز", art: "../../assets/design/testimonial-parts-3.png", accent: "magenta" },
];

function Testimonials() {
  const [active, setActive] = React.useState(0);
  const len = T_ITEMS.length;
  const go = (dir) => setActive((a) => (a + dir + len) % len);

  const posClass = (i) => {
    const off = (i - active + len) % len;
    if (off === 0) return " is-active";
    if (off === 1) return " is-next";
    if (off === len - 1) return " is-prev";
    return " is-hidden";
  };

  return (
    <section className="section tband" id="testimonials" data-screen-label="Testimonials">
      <div className="wrap">
        <div className="tband__head reveal">
          <span className="eyebrow">نظر هنرجوها</span>
          <h2 style={{ marginTop: 16 }}>هنرجوها چه می‌گویند؟</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            بازخورد هنرجوها کمک می‌کند مسیر آموزش ساده‌تر، کاربردی‌تر و نزدیک‌تر به تجربه‌ی واقعی یادگیری باشد.
          </p>
        </div>

        <div className="tcarousel reveal" aria-label="نظر هنرجوها">
          {T_ITEMS.map((t, i) => (
            <div
              key={t.name}
              className={"tcard" + posClass(i)}
              onClick={() => { if (i !== active) setActive(i); }}
              role={i !== active ? "button" : undefined}
              aria-hidden={posClass(i) === " is-hidden"}
            >
              <TestDS.Testimonial quote={t.quote} name={t.name} role={t.role} art={t.art} accent={t.accent} />
            </div>
          ))}
          <div className="tcontrols">
            <button className="tbtn" type="button" aria-label="قبلی" onClick={() => go(-1)}>‹</button>
            <div className="tdots">
              {T_ITEMS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  className={"tdot" + (i === active ? " is-active" : "")}
                  aria-label={"نظر " + (i + 1)}
                  onClick={() => setActive(i)}
                ></button>
              ))}
            </div>
            <button className="tbtn" type="button" aria-label="بعدی" onClick={() => go(1)}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Testimonials = Testimonials;
