import { useState, useEffect, useCallback, useRef } from "react";
import myPhoto from "../imports/gpt-image-2__medium__a_Professional_corpora.png";
import { Mail, MapPin, Globe, ChevronLeft, ChevronRight, X, FileText, Maximize2, ZoomIn, ArrowDown } from "lucide-react";

// ── constants ────────────────────────────────────────────────────────────────
const FD = "'Fraunces', Georgia, serif";
const FB = "'Plus Jakarta Sans', system-ui, sans-serif";
const FM = "'DM Mono', monospace";

const INK   = "#111009";
const CREAM = "#F2EDE4";
const GREEN = "#0D6E5C";
const MUTED = "#7C7568";
const BORDER= "#D9D2C7";

const PHOTO = myPhoto;

const MARQUEE_ITEMS = ["Figma","UX Research","Design Systems","Articulate Storyline","EdTech","B2B SaaS","Courselab","Prototype","SCORM","Педагогический дизайн","Maya","Blender","iSpring","GenAI","Figma Make","Enterprise UX","NoCode"];

const EXPERIENCE = [
  {
    company:"PRO Robotech", url:"in-cloud.io",
    period:"Март 2025 — Июнь 2026", duration:"1 г. 4 мес.",
    role:"UX/UI-дизайнер", tag:"IT · SaaS · Kubernetes",
    accent: GREEN,
    items:[
      "Спроектировал интерфейс in-Cloud Console — платформы управления Kubernetes-инфраструктурой",
      "Построил дизайн-систему на базе Ant Design в Figma: компоненты для управления кластерами, ролями и операторами",
      "Переработал технические процессы в NoCode-ориентированный UX — полный контроль при нулевом пороге входа",
    ],
  },
  {
    company:"ТЕРМИКА", url:"termika.ru",
    period:"Октябрь 2012 — настоящее время", duration:"~14 л.",
    role:"Методист → Старший художник компьютерной графики (дизайнер)", tag:"EdTech · Enterprise",
    accent:"#C8860A",
    items:[
      "Полный цикл разработки интерактивных курсов и тренажёров для Enterprise-клиентов (нефтегаз, энергетика, производство): анализ сценариев → UX-потоки с проверкой знаний → адаптивная навигация → мультиплатформенный билд",
      "Визуализация контента: сложные анимированные презентации (PowerPoint + iSpring) и smart-документы (Adobe Illustrator) для коммуникаций и инструкций",
      "Геймификация и графика: разработка персонажей-маскотов, их анимация и внедрение в курсы для повышения вовлечённости; 3D-иллюстрации (Maya, Blender)",
      "Технологический стек: Courselab, Articulate Storyline; обеспечение корректной работы мультимедиа во всех браузерах и на мобильных устройствах",
      "Управление: руководство проектными группами (распределение задач, контроль качества), наставничество младших дизайнеров",
      "Методист: разработка сценариев интерактивных элементов и скриптов поведения курсов в Courselab для крупнейших госкорпораций (банки, заводы); подготовка контента на основе нормативной документации (Консультант+, Кодекс)",
    ],
  },
  {
    company:"МГПУ", url:"mgpu.ru",
    period:"Декабрь 2009 — Сентябрь 2012", duration:"2 г. 10 мес.",
    role:"Специалист по административной и технической поддержке", tag:"Высшее образование · LMS",
    accent:"#0EA5E9",
    items:[
      "Запуск и администрирование систем дистанционного обучения (LMS Прометей, Moodle)",
      "Внедрение стандартов SCORM, HTML/CSS-вёрстка порталов",
      "Онлайн- и офлайн-лекции для преподавателей, разработка первых методических пособий",
    ],
  },
  {
    company:"РГСУ", url:"rgsu.net",
    period:"Сентябрь 2008 — Октябрь 2009", duration:"1 г. 2 мес.",
    role:"Техник → Программист", tag:"Высшее образование · IT",
    accent:"#10A37F",
    items:[
      "Техническая поддержка студентов и преподавателей, администрирование системы дистанционного обучения",
      "Организация рабочих мест, сопровождение мультимедийного оборудования на выставках и презентациях",
      "Разработка электронных учебных курсов с нуля, администрирование сайта IT-отдела",
      "Внедрение стандартов SCORM, настройка LMS Moodle и Прометей для заочного отделения",
    ],
  },
];

const PORTFOLIO = [
  {
    id:1, title:"in-Cloud Console", sub:"Управление Kubernetes-инфраструктурой",
    description:"Проектирование платформы управления Kubernetes с нуля. Дизайн-система на базе Ant Design, адаптированная для управления кластерами, ролями и операторами. NoCode-ориентированный UX при полном контроле для администраторов.",
    category:"UX/UI", type:"image" as const,
    thumb:"https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?w=900&h=600&fit=crop&auto=format",
    full:"https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?w=1800&h=1100&fit=crop&auto=format",
    tags:["Figma","Ant Design","Дизайн-система","B2B SaaS","Kubernetes"],
    year:"2025–2026", client:"PRO Robotech",
  },
  {
    id:2, title:"Аналитический дашборд", sub:"Корпоративная аналитическая платформа",
    description:"Информационная архитектура и компоновка виджетов аналитического раздела. Акцент на читаемость данных и снижение когнитивной нагрузки. Адаптивная сетка для всех устройств.",
    category:"UX/UI", type:"image" as const,
    thumb:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
    full:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&h=1100&fit=crop&auto=format",
    tags:["Dashboard","Data Viz","UX Research"],
    year:"2024", client:"ТЕРМИКА",
  },
  {
    id:3, title:"Курс по промышленной безопасности", sub:"E-Learning для нефтегазовой отрасли",
    description:"UX-поток полного цикла: сценарная логика, ветвление, адаптивная обратная связь, геймификация. Мультиплатформенный вывод через Articulate Storyline.",
    category:"EdTech", type:"image" as const,
    thumb:"https://images.unsplash.com/photo-1771765856781-3adbac14d75b?w=900&h=600&fit=crop&auto=format",
    full:"https://images.unsplash.com/photo-1771765856781-3adbac14d75b?w=1800&h=1100&fit=crop&auto=format",
    tags:["Articulate Storyline","Геймификация","SCORM","Нефтегаз"],
    year:"2023", client:"ТЕРМИКА",
  },
  {
    id:4, title:"Тренажёр операторов ТЭЦ", sub:"Интерактивный симулятор для энергетики",
    description:"Симулятор обучения операторов: визуализация технологических процессов, разветвлённые сценарии, персонажи-маскоты с анимацией в Maya и Blender.",
    category:"EdTech", type:"image" as const,
    thumb:"https://images.unsplash.com/photo-1758685733664-4cde7bbe4713?w=900&h=600&fit=crop&auto=format",
    full:"https://images.unsplash.com/photo-1758685733664-4cde7bbe4713?w=1800&h=1100&fit=crop&auto=format",
    tags:["Courselab","Анимация","Энергетика","3D","Маскот"],
    year:"2022", client:"ТЕРМИКА",
  },
  {
    id:5, title:"Дизайн-система Figma", sub:"Компонентная библиотека для продукта",
    description:"Корпоративная дизайн-система: атомы, молекулы, организмы. Токены, авто-лейаут, варианты компонентов. Документация для передачи разработчикам. Веб, планшет, мобайл.",
    category:"UX/UI", type:"image" as const,
    thumb:"https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=900&h=600&fit=crop&auto=format",
    full:"https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=1800&h=1100&fit=crop&auto=format",
    tags:["Figma","Design Tokens","Авто-лейаут","Документация"],
    year:"2025", client:"PRO Robotech",
  },
  {
    id:6, title:"Корпоративные презентации", sub:"Smart-документы и инфографика",
    description:"Анимированные презентации, интерактивные PDF-инструкции и smart-документы для внутренних и внешних коммуникаций. Adobe Illustrator + iSpring.",
    category:"Презентации", type:"pdf" as const,
    thumb:"https://images.unsplash.com/photo-1680016661694-1cd3faf31c3a?w=900&h=600&fit=crop&auto=format",
    full:"https://images.unsplash.com/photo-1680016661694-1cd3faf31c3a?w=1800&h=1100&fit=crop&auto=format",
    tags:["PowerPoint","iSpring","Illustrator","Инфографика"],
    year:"2020–2024", client:"ТЕРМИКА",
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

// ── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y py-4" style={{ borderColor: BORDER, background: INK }}>
      <div className="flex gap-10 animate-[marqueeScroll_28s_linear_infinite] whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="text-sm font-medium shrink-0 flex items-center gap-10" style={{ fontFamily: FM, color: "rgba(255,255,255,0.45)" }}>
            {item}
            <span style={{ color: GREEN }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marqueeScroll { from { transform:translateX(0) } to { transform:translateX(-50%) } }`}</style>
      <style>{`@keyframes spinSlow { from { transform:rotate(0deg) } to { transform:rotate(360deg) } } @keyframes spinReverse { from { transform:rotate(0deg) } to { transform:rotate(-360deg) } } @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} } @keyframes heroFade { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  );
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext, onJump }: {
  items: typeof PORTFOLIO; index: number; onClose:()=>void; onPrev:()=>void; onNext:()=>void; onJump:(i:number)=>void;
}) {
  const item = items[index];
  const [loaded, setLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => { setLoaded(false); setZoomed(false); }, [index]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key==="Escape") onClose(); if (e.key==="ArrowLeft") onPrev(); if (e.key==="ArrowRight") onNext(); };
    window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex" style={{ background: "rgba(17,16,9,0.94)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <button onClick={onPrev} className="absolute left-5 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all"
          style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)" }}
          onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.16)")}
          onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.08)")}>
          <ChevronLeft size={20} className="text-white" />
        </button>
        {item.type === "image" ? (
          <div className="relative w-full h-full flex items-center justify-center px-20 cursor-zoom-in" onClick={() => setZoomed(z=>!z)}>
            {!loaded && <div className="absolute w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />}
            <img src={item.full} alt={item.title} onLoad={() => setLoaded(true)}
              className="transition-all duration-500"
              style={{ maxWidth:zoomed?"none":"100%", maxHeight:zoomed?"none":"100%", objectFit:"contain", opacity:loaded?1:0, cursor:zoomed?"zoom-out":"zoom-in" }} />
            {loaded && !zoomed && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ fontFamily:FM, color:"rgba(255,255,255,0.4)", background:"rgba(0,0,0,0.5)" }}>
                <ZoomIn size={11} /> увеличить
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 text-white">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center" style={{ background:"rgba(13,110,92,0.2)", border:"1px solid rgba(13,110,92,0.4)" }}>
              <FileText size={40} style={{ color:GREEN }} />
            </div>
            <p style={{ fontFamily:FD, fontSize:"1.3rem", fontStyle:"italic" }}>PDF-документ</p>
            <p className="text-sm" style={{ color:"rgba(255,255,255,0.4)", fontFamily:FM }}>Предоставляется по запросу</p>
          </div>
        )}
        <button onClick={onNext} className="absolute right-5 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all"
          style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)" }}
          onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.16)")}
          onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.08)")}>
          <ChevronRight size={20} className="text-white" />
        </button>
        <div className="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs" style={{ fontFamily:FM, color:"rgba(255,255,255,0.4)", background:"rgba(0,0,0,0.5)" }}>
          {index+1} / {items.length}
        </div>
      </div>

      <div className="w-[360px] shrink-0 flex flex-col" style={{ background:"#FBF8F3", fontFamily:FB }}>
        <div className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor:BORDER }}>
          <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background:GREEN+"15", color:GREEN }}>{item.category}</span>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[#E2DAD0]">
            <X size={15} style={{ color:MUTED }} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-7 space-y-6">
          <div>
            <p className="text-xs mb-1" style={{ fontFamily:FM, color:MUTED }}>{item.client} · {item.year}</p>
            <h3 style={{ fontFamily:FD, fontSize:"1.3rem", fontStyle:"italic", lineHeight:1.2, color:INK }}>{item.title}</h3>
            <p className="text-sm mt-1" style={{ color:GREEN, fontFamily:FM }}>{item.sub}</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color:"#3D3A30" }}>{item.description}</p>
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase mb-3" style={{ color:MUTED }}>Инструменты</p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded text-xs" style={{ background:"#E2DAD0", color:"#3D3A30" }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase mb-3" style={{ color:MUTED }}>Другие работы</p>
            <div className="grid grid-cols-3 gap-1.5">
              {items.map((it, i) => (
                <div key={it.id} className="aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all"
                  style={{ borderColor: i===index ? GREEN : "transparent" }}
                  onClick={() => onJump(i)}>
                  <img src={it.thumb} alt={it.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t px-8 py-4" style={{ borderColor:BORDER }}>
          <p className="text-center text-xs" style={{ fontFamily:FM, color:"#C8C2B8" }}>← → навигация · Esc закрыть</p>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [openExp, setOpenExp] = useState<string | null>(EXPERIENCE[0].company + EXPERIENCE[0].role);
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const [pfCat, setPfCat] = useState("Все");

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Section tracking — scroll-position based, works in both directions
  useEffect(() => {
    const ids = ["about","portfolio","experience","skills","contact"];
    const fn = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
      if (atBottom) { setActiveSection("contact"); return; }
      const mid = window.scrollY + window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", fn, { passive:true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filteredPf = pfCat === "Все" ? PORTFOLIO : PORTFOLIO.filter(p => p.category === pfCat);
  const prevPf = useCallback(() => setLbIndex(i => i===null?null:(i-1+filteredPf.length)%filteredPf.length), [filteredPf.length]);
  const nextPf = useCallback(() => setLbIndex(i => i===null?null:(i+1)%filteredPf.length), [filteredPf.length]);

  const scrolled = scrollY > 60;
  const NAV = [
    { id:"about",      label:"Обо мне"    },
    { id:"portfolio",  label:"Портфолио"  },
    { id:"experience", label:"Опыт"       },
    { id:"skills",     label:"Навыки"     },
    { id:"contact",    label:"Контакты"   },
  ];

  return (
    <div style={{ background:CREAM, color:INK, fontFamily:FB, minHeight:"100vh" }}>
      {/* ─── HEADER ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-400"
        style={{ background: scrolled ? "rgba(242,237,228,0.92)" : "transparent", backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#about" style={{ fontFamily:FD, fontStyle:"italic", fontSize:"1.1rem", fontWeight:700, color:INK, textDecoration:"none" }}>
            Антон Борисов
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <a key={n.id} href={`#${n.id}`}
                className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                style={{ color: activeSection===n.id ? INK : MUTED, fontWeight: activeSection===n.id ? 600 : 400, background: activeSection===n.id ? "rgba(17,16,9,0.07)" : "transparent", textDecoration:"none" }}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href="mailto:antonborisov@yandex.ru"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background:INK, textDecoration:"none" }}>
            <Mail size={13} /> Написать
          </a>
        </div>
      </header>

      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section id="about" className="min-h-screen flex flex-col" style={{ paddingTop:"64px" }}>
        <div className="flex-1 max-w-7xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-[1fr_420px] gap-10 items-center py-16 md:py-0">
          {/* Left: text */}
          <div>
            <h1 style={{ fontFamily:FD, fontWeight:900, lineHeight:0.9, fontSize:"clamp(72px,11vw,156px)", letterSpacing:"-0.02em", animation:"heroFade 0.9s ease both" }}>
              Антон<br />
              <span style={{ fontStyle:"italic", color:GREEN }}>Борисов</span>
            </h1>

            <div className="flex items-center gap-4 mt-8 mb-8">
              <div className="h-px flex-1" style={{ background:BORDER }} />
              <p style={{ fontFamily:FD, fontStyle:"italic", fontSize:"1.25rem", color:MUTED, whiteSpace:"nowrap" }}>
                Продуктовый дизайнер · UX/UI · EdTech
              </p>
              <div className="h-px flex-1" style={{ background:BORDER }} />
            </div>

            <p className="text-base leading-relaxed max-w-lg mb-10" style={{ color:"#4A4740" }}>
              Проектирую продукты, которые одинаково удобны для пользователя и&nbsp;эффективны для бизнеса.
              Соединяю <strong style={{ color:INK }}>педагогический дизайн</strong> и&nbsp;<strong style={{ color:INK }}>UX-практики</strong> в&nbsp;единое решение.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-12">
              <a href="mailto:antonborisov@yandex.ru"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ background:INK, textDecoration:"none" }}>
                <Mail size={14} /> antonborisov@yandex.ru
              </a>
              <div className="flex items-center gap-2 px-4 py-3 rounded-full text-sm" style={{ background:"rgba(17,16,9,0.06)", color:MUTED }}>
                <Globe size={13} /> Английский C2
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-full text-sm" style={{ background:"rgba(17,16,9,0.06)", color:MUTED }}>
                <MapPin size={13} /> Удалённо / Гибрид / Офис
              </div>
            </div>

            <a href="#portfolio" className="inline-flex items-center gap-2 text-sm transition-all hover:gap-3" style={{ color:MUTED, textDecoration:"none", fontFamily:FM }}>
              <ArrowDown size={14} /> смотреть работы
            </a>
          </div>

          {/* Right: photo */}
          <div className="relative flex items-center justify-center">
            {/* Outer dashed ring — clockwise */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[430px] h-[430px] rounded-full border-[2px] border-dashed"
                style={{ borderColor:GREEN, opacity:0.35, animation:"spinSlow 32s linear infinite" }} />
            </div>
            {/* Inner dashed ring — counter-clockwise */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[360px] h-[360px] rounded-full border-[2px] border-dashed"
                style={{ borderColor:GREEN, opacity:0.2, animation:"spinReverse 24s linear infinite" }} />
            </div>

            {/* Photo */}
            <div className="relative z-10 w-[340px] h-[420px] rounded-[48px] overflow-hidden shadow-2xl border-2"
              style={{ borderColor:BORDER, animation:"heroFade 1s ease both" }}>
              <img src={PHOTO} alt="Антон Борисов — продуктовый дизайнер" className="w-full h-full object-cover object-top" />
              {/* Glass overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between"
                style={{ background:"linear-gradient(to top, rgba(17,16,9,0.65) 0%, transparent 100%)", backdropFilter:"blur(2px)" }}>
                <div>
                  <p className="text-white text-xs mb-0.5" style={{ fontFamily:FM }}>Опыт работы</p>
                  <p style={{ fontFamily:FD, fontStyle:"italic", color:"white", fontSize:"1.5rem", fontWeight:700, lineHeight:1 }}>17+ лет</p>
                </div>
                <div className="text-right">
                  <p className="text-xs mb-0.5" style={{ fontFamily:FM, color:"rgba(255,255,255,0.6)" }}>Отраслей</p>
                  <p style={{ fontFamily:FD, fontStyle:"italic", color:GREEN, fontSize:"1.5rem", fontWeight:700, lineHeight:1 }}>5+</p>
                </div>
              </div>
            </div>

            {/* Floating chip top — glass */}
            <div className="absolute top-8 -right-4 px-4 py-2.5 rounded-2xl shadow-lg border text-sm font-medium z-20"
              style={{ background:"rgba(251,248,243,0.7)", backdropFilter:"blur(12px)", borderColor:"rgba(217,210,199,0.6)", color:INK, animation:"floatUp 5s ease-in-out infinite" }}>
              Figma<span style={{ color:GREEN }}>✦</span>UX/UI
            </div>
            {/* Floating chip bottom — glass dark */}
            <div className="absolute bottom-16 -left-6 px-4 py-2.5 rounded-2xl shadow-lg border text-sm z-20"
              style={{ background:"rgba(17,16,9,0.75)", backdropFilter:"blur(12px)", borderColor:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.85)", fontFamily:FM, animation:"floatUp 6s ease-in-out infinite 1s" }}>
              EdTech / E-Learning
            </div>
          </div>
        </div>

        {/* About text strip */}
        <div className="border-t" style={{ borderColor:BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid md:grid-cols-3 gap-8">
            {[
              { n:"12+", label:"лет в EdTech и e-Learning", accent:GREEN },
              { n:"B2B", label:"Enterprise-клиенты: нефтегаз, банки, энергетика", accent:"#C8860A" },
              { n:"Full", label:"Полный цикл: исследование → прототип → релиз", accent:"#7C3AED" },
            ].map(s => (
              <div key={s.label} className="flex items-start gap-5">
                <span style={{ fontFamily:FD, fontStyle:"italic", fontSize:"2.5rem", fontWeight:700, color:s.accent, lineHeight:1 }}>{s.n}</span>
                <p className="text-sm leading-relaxed pt-1" style={{ color:MUTED }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ────────────────────────────────────────────────── */}
      <Marquee />

      {/* ─── PORTFOLIO ──────────────────────────────────────────────── */}
      <section id="portfolio" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily:FM, color:MUTED }}>Избранные работы</p>
                <h2 style={{ fontFamily:FD, fontStyle:"italic", fontWeight:900, fontSize:"clamp(3rem,7vw,6rem)", lineHeight:0.9, color:INK }}>
                  Портфолио
                </h2>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["Все","UX/UI","EdTech","Презентации"].map(c => (
                  <button key={c} onClick={() => setPfCat(c)}
                    className="px-4 py-2 rounded-full text-sm transition-all duration-150"
                    style={ pfCat===c ? { background:INK, color:CREAM, fontWeight:600 } : { background:"rgba(17,16,9,0.06)", color:MUTED } }>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Featured first project */}
          {filteredPf.length > 0 && (
            <FadeUp delay={80}>
              <button onClick={() => setLbIndex(0)}
                className="group w-full text-left mb-5 rounded-3xl overflow-hidden block relative"
                style={{ background:INK }}>
                <div className="relative h-[55vh] overflow-hidden">
                  <img src={filteredPf[0].thumb} alt={filteredPf[0].title}
                    className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:opacity-75 group-hover:scale-105" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <span className="text-xs mb-3 px-3 py-1 rounded-full inline-block w-fit" style={{ fontFamily:FM, background:GREEN, color:"white" }}>
                      {filteredPf[0].category}
                    </span>
                    <h3 style={{ fontFamily:FD, fontStyle:"italic", fontWeight:700, fontSize:"clamp(1.8rem,4vw,3rem)", color:"white", lineHeight:1.1 }}>
                      {filteredPf[0].title}
                    </h3>
                    <p className="text-sm mt-2 max-w-lg" style={{ color:"rgba(255,255,255,0.6)" }}>{filteredPf[0].sub}</p>
                    <div className="flex items-center gap-3 mt-4">
                      {filteredPf[0].tags.slice(0,3).map(t=>(
                        <span key={t} className="text-xs px-2 py-1 rounded" style={{ fontFamily:FM, background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.7)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0" style={{ background:"white" }}>
                    <Maximize2 size={18} style={{ color:INK }} />
                  </div>
                </div>
              </button>
            </FadeUp>
          )}

          {/* Remaining grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPf.slice(1).map((item, i) => {
              const cc = item.category==="UX/UI" ? GREEN : item.category==="EdTech" ? "#C8860A" : "#7C3AED";
              return (
                <FadeUp key={item.id} delay={i*55}>
                  <button onClick={() => setLbIndex(i+1)}
                    className="group w-full text-left rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{ background:"#FBF8F3", borderColor:BORDER }}>
                    <div className="relative aspect-video overflow-hidden bg-[#E2DAD0]">
                      <img src={item.thumb} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background:"rgba(17,16,9,0.45)" }}>
                        {item.type==="pdf" ? <FileText size={26} className="text-white" /> : <Maximize2 size={22} className="text-white" />}
                      </div>
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ background:cc }}>{item.category}</span>
                        {item.type==="pdf" && <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ background:INK }}>PDF</span>}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 style={{ fontFamily:FD, fontStyle:"italic", fontSize:"1.05rem", lineHeight:1.25, color:INK }} className="mb-1 line-clamp-1">{item.title}</h3>
                      <p className="text-xs mb-3 line-clamp-1" style={{ fontFamily:FM, color:cc }}>{item.sub}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ fontFamily:FM, color:MUTED }}>{item.client} · {item.year}</span>
                        <span className="text-xs font-semibold" style={{ color:cc }}>Открыть →</span>
                      </div>
                    </div>
                  </button>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {lbIndex !== null && (
        <Lightbox items={filteredPf} index={lbIndex} onClose={()=>setLbIndex(null)} onPrev={prevPf} onNext={nextPf} onJump={setLbIndex} />
      )}

      {/* ─── EXPERIENCE ─────────────────────────────────────────────── */}
      <section id="experience" className="py-24 md:py-32 border-t" style={{ borderColor:BORDER }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily:FM, color:MUTED }}>Карьерный путь</p>
            <h2 style={{ fontFamily:FD, fontStyle:"italic", fontWeight:900, fontSize:"clamp(3rem,7vw,6rem)", lineHeight:0.9, color:INK, marginBottom:"3rem" }}>
              Опыт работы
            </h2>
          </FadeUp>

          <div className="space-y-3">
            {EXPERIENCE.map((exp, i) => {
              const key = exp.company + exp.role;
              const isOpen = openExp === key;
              return (
                <FadeUp key={key} delay={i*60}>
                  <div className="rounded-2xl overflow-hidden border transition-all duration-300"
                    style={{ borderTopColor: isOpen ? exp.accent+"60" : BORDER, borderRightColor: isOpen ? exp.accent+"60" : BORDER, borderBottomColor: isOpen ? exp.accent+"60" : BORDER, borderLeftColor:exp.accent, borderLeftWidth:3, background:"#FBF8F3", boxShadow: isOpen ? `0 4px 24px ${exp.accent}18` : "none" }}>
                    <button className="w-full text-left px-8 py-6 flex items-start justify-between gap-6 group"
                      onClick={() => setOpenExp(isOpen ? null : key)}>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-4 mb-1">
                          <span style={{ fontFamily:FD, fontStyle:"italic", fontWeight:700, fontSize:"1.4rem", color:INK }}>{exp.company}</span>
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background:exp.accent+"15", color:exp.accent }}>{exp.tag}</span>
                        </div>
                        <p className="text-sm font-semibold mb-1" style={{ color:"#3D3A30" }}>{exp.role}</p>
                        <p className="text-xs" style={{ fontFamily:FM, color:MUTED }}>{exp.period} · {exp.duration}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all duration-200"
                        style={{ background: isOpen ? exp.accent : "rgba(17,16,9,0.06)", color: isOpen ? "white" : MUTED, transform: isOpen ? "rotate(90deg)" : "none" }}>
                        <ChevronRight size={14} />
                      </div>
                    </button>
                    <div className="overflow-hidden transition-all duration-350" style={{ maxHeight: isOpen ? "1000px" : 0 }}>
                      <div className="px-8 pb-7 border-t pt-5" style={{ borderColor:BORDER }}>
                        <ul className="space-y-3">
                          {exp.items.map((item, ii) => (
                            <li key={ii} className="flex gap-3 text-sm leading-relaxed" style={{ color:"#4A4740" }}>
                              <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background:exp.accent }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-32 border-t" style={{ borderColor:BORDER, background:"#FBF8F3" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily:FM, color:MUTED }}>Что умею</p>
            <h2 style={{ fontFamily:FD, fontStyle:"italic", fontWeight:900, fontSize:"clamp(3rem,7vw,6rem)", lineHeight:0.9, color:INK, marginBottom:"3rem" }}>
              Навыки
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { cat:"Проектирование интерфейсов", accent:GREEN, items:["UI","UX","Figma","Прототипирование","Дизайн-системы","Интерактивный дизайн"] },
              { cat:"EdTech и e-Learning", accent:"#C8860A", items:["E-Learning","Instructional Design","Педагогический дизайн","SCORM","Courselab","Articulate Storyline","Адаптивная навигация"] },
              { cat:"Продуктовое мышление", accent:"#7C3AED", items:["Product","B2B SaaS","Enterprise","NoCode","Internal Tools"] },
              { cat:"Визуальные коммуникации", accent:"#C0392B", items:["Adobe Illustrator","Геймификация","3D: Maya, Blender","Анимация персонажей"] },
              { cat:"Технологии и AI", accent:"#0EA5E9", items:["GenAI","Figma Make","Вайбкодинг","Kubernetes / K8s"] },
            ].map((group, gi) => (
              <FadeUp key={group.cat} delay={gi*55} className={gi===0 ? "md:col-span-2" : ""}>
                <div className="rounded-2xl border p-7 transition-all hover:shadow-md" style={{ borderColor:BORDER, borderTopWidth:3, borderTopColor:group.accent }}>
                  <h3 style={{ fontFamily:FD, fontStyle:"italic", fontWeight:600, fontSize:gi===0?"1.4rem":"1.1rem", color:INK, marginBottom:"1.25rem" }}>{group.cat}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:scale-105 cursor-default"
                        style={{ background:group.accent+"12", color:group.accent, border:`1px solid ${group.accent}25` }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-40 border-t" style={{ borderColor:BORDER }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <h2 style={{ fontFamily:FD, fontStyle:"italic", fontWeight:900, fontSize:"clamp(3.5rem,9vw,8rem)", lineHeight:0.88, color:INK, marginBottom:"1.5rem" }}>
              Контакты
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:antonborisov@yandex.ru"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white transition-all hover:scale-[1.03] hover:shadow-xl"
                style={{ background:INK, textDecoration:"none" }}>
                <Mail size={17} />
                antonborisov@yandex.ru
              </a>
              <a href="https://t.me/savageforce" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-[1.03] hover:shadow-xl border-2"
                style={{ background:"transparent", borderColor:INK, color:INK, textDecoration:"none" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.447l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.112z"/></svg>
                Telegram
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="border-t py-8" style={{ borderColor:BORDER }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-center">
          <p className="text-xs text-center" style={{ fontFamily:FM, color:MUTED }}>
            Навайбкодено Антоном Борисовым · Москва {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
