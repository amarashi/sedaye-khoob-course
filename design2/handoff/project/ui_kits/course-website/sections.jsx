/* Course intro, curriculum (interactive stepper) & outcomes */
const SecDS = window.SedayeKhoobDesignSystem_7ce729;

const MODULES = [
  { id: "notes",  label: "نت‌ها",   title: "نت‌ها را مثل مختصات موسیقی بخوانید.", text: "خطوط حامل، کلیدها، نام نت‌ها و الگوهای اکتاو را با تمرین‌های تشخیص سریع یاد بگیرید.", img: "../../assets/design/ostad-piano.png" },
  { id: "scales", label: "گام‌ها",  title: "گام‌ها را مثل رنگ‌های موسیقی بشناسید.", text: "الگوهای ماژور، مینور و مدال را بسازید و بشنوید هرکدام چگونه رنگ ملودی را عوض می‌کنند.", img: "../../assets/design/ostad-tar.png" },
  { id: "chords", label: "آکوردها", title: "آکوردها را با اطمینان بسازید.", text: "از فاصله‌ها به تریادها، آکوردهای هفتم و توالی‌هایی برسید که همان لحظه قابل استفاده‌اند.", img: "../../assets/design/ostad-guitar.png" },
  { id: "rhythm", label: "ریتم",    title: "ریتم را قبل از شمردن حس کنید.", text: "پالس، تقسیم‌بندی و سنکوپ را با تمرین‌هایی یاد بگیرید که از شنیدن شروع می‌شوند.", img: "../../assets/design/ostad-tombak.png" },
];

function CourseIntro({ onBuy }) {
  return (
    <section className="section section--line" id="course" data-screen-label="Course intro">
      <div className="wrap intro">
        <div className="reveal">
          <span className="eyebrow">دوره پیش رو</span>
          <h2 style={{ marginTop: 16 }}>تئوری موسیقی، شبیه تجربه‌ی نواختن.</h2>
          <p className="lead" style={{ marginTop: 20 }}>
            اولین دوره‌ی آنلاینِ صدای خوب آماده‌ی فروش است: مسیری که نت‌ها، فاصله‌ها،
            گام‌ها و آکوردها را به تصمیم‌های روشنِ موسیقایی تبدیل می‌کند.
          </p>
          <div style={{ marginTop: 28 }}>
            <SecDS.Button variant="primary" onClick={onBuy}>خرید دوره</SecDS.Button>
          </div>
        </div>
        <SecDS.Card variant="spectrum" className="reveal">
          <SecDS.Badge tone="gold" dot>دوره آنلاین</SecDS.Badge>
          <h3 style={{ margin: "12px 0 4px" }}>چه چیزی می‌گیرید</h3>
          <div className="intro__media" style={{ margin: "18px 0 22px" }}>
            <span className="intro__inst"><img src="../../assets/design/inst-piano.png" alt="" /></span>
            <span className="intro__inst"><img src="../../assets/design/inst-tar.png" alt="" /></span>
            <span className="intro__inst"><img src="../../assets/design/inst-tombak.png" alt="" /></span>
          </div>
          <SecDS.Checklist items={[
            "درس‌های ویدیویی کوتاه با مثال‌های تصویری",
            "برگه‌های تمرین قابل دانلود",
            "تمرین شنیداری برای هر بخش",
          ]} />
        </SecDS.Card>
      </div>
    </section>
  );
}

function Curriculum() {
  const [active, setActive] = React.useState(0);
  const mod = MODULES[active];
  return (
    <section className="section section--line" id="curriculum" data-screen-label="Curriculum">
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 680 }}>
          <span className="eyebrow">سرفصل‌ها</span>
          <h2 style={{ marginTop: 16 }}>نقشه‌ای از تئوری که واقعاً شنیده می‌شود.</h2>
          <p className="lead" style={{ marginTop: 18 }}>با درس‌های کوتاه، تمرین‌های شنیداری و ایده‌های عملی آهنگسازی جلو بروید.</p>
        </div>

        <div className="modgrid">
          {MODULES.map((m, i) => (
            <div key={m.id} className="reveal" onMouseEnter={() => setActive(i)} style={{ cursor: "pointer" }}>
              <SecDS.InstrumentOrb src={m.img} title={m.label} size={188} float={i === active} />
            </div>
          ))}
        </div>

        <div className="focus reveal">
          <div className="focus__steps">
            {MODULES.map((m, i) => (
              <button key={m.id} className={"step" + (i === active ? " is-active" : "")} onClick={() => setActive(i)}>
                <h4>{m.label}</h4>
                <p>{m.text}</p>
              </button>
            ))}
          </div>
          <div className="lessonpanel">
            <div>
              <span className="meta">تمرکز درس</span>
              <h3 style={{ margin: "10px 0 14px" }}>{mod.title}</h3>
              <p className="lead" style={{ fontSize: 17 }}>{mod.text}</p>
            </div>
            <div className="lessonpanel__art">
              <img src={mod.img} alt="" key={mod.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  const items = [
    { t: "ساختار را بشنوید", d: "تشخیص دهید ملودی‌ها، آکوردها و جمله‌ها چگونه کنار هم قرار می‌گیرند.", img: "../../assets/design/inst-piano.png" },
    { t: "با اطمینان یاد بگیرید", d: "زبان تئوری را بدون گیر افتادن در اصطلاحات خشک به کار ببرید.", img: "../../assets/design/ostad-flute.png" },
    { t: "سریع‌تر خلق کنید", d: "یک گام، آکورد یا ایده‌ی ریتمیک را به طرحی واقعی تبدیل کنید.", img: "../../assets/design/ostad-daf.png" },
  ];
  return (
    <section className="section section--line" id="studio" data-screen-label="Outcomes">
      <div className="wrap outcomes">
        <div className="reveal">
          <span className="eyebrow">شیوه‌ی آموزش</span>
          <h2 style={{ marginTop: 16 }}>از نشانه‌ها تا انتخاب‌های موسیقایی.</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            هر مبحث با لحظه‌های شنیداری، تمرین‌های خلاقانه‌ی کوتاه و بررسی‌های ساده همراه است
            تا ایده به موسیقی واقعی وصل شود.
          </p>
        </div>
        <div className="outgrid">
          {items.map((o) => (
            <div key={o.t} className="outcard reveal">
              <img src={o.img} alt="" />
              <h4>{o.t}</h4>
              <p>{o.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.CourseIntro = CourseIntro;
window.Curriculum = Curriculum;
window.Outcomes = Outcomes;
