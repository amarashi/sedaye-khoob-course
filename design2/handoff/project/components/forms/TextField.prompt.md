A labelled input for the registration / checkout forms. Stacks a muted label over a soft-bordered control that glows indigo on focus.

```jsx
<TextField label="نام و نام خانوادگی" name="fullName" required autoComplete="name" />
<TextField label="شماره موبایل" name="mobile" inputMode="tel" placeholder="09123456789" required />
```

Use `hint` for a helper line, `required` to add the crimson asterisk. Focus styling is handled by the bundled `.sk-input` CSS.
