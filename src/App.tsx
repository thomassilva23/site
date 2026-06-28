import React, { useEffect, useState, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  ExternalLink,
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────

const T = {
  pt: {
    nav: {
      about: 'Sobre',
      services: 'Serviços',
      technologies: 'Tecnologias',
      projects: 'Projetos',
      contact: 'Contato',
      cta: 'Solicitar Orçamento',
    },
    hero: {
      greeting: 'Olá, sou',
      name: 'Thomas Silva',
      role: 'Desenvolvedor Full Stack',
      description:
        'Construo sites, sistemas e e-commerces para empresas que precisam de resultado — do levantamento de requisitos ao deploy.',
      cta1: 'Ver Projetos',
      cta2: 'Solicitar Orçamento',
      scroll: 'Role para ver mais',
    },
    stats: [
      { value: '6+', label: 'Anos de experiência' },
      { value: '20+', label: 'Projetos entregues' },
      { value: '100%', label: 'Remoto & Presencial' },
    ],
    about: {
      title: 'Sobre Mim',
      badge: '● Disponível para Freelance',
      p1: 'Desenvolvedor Full Stack com 6 anos de experiência entregando sites institucionais, e-commerces e sistemas web para empresas de pequeno e médio porte.',
      p2: 'Trabalho com o ciclo completo: do levantamento de requisitos até o deploy — back-end em PHP/Laravel ou Node.js, front-end em React ou Angular, banco de dados em MySQL, e integração com APIs de terceiros.',
      p3: 'Atualmente disponível para projetos freelance. Se você precisa de um sistema web ou site profissional, me chame.',
      cta: 'Falar no WhatsApp',
    },
    services: {
      title: 'O que eu faço',
      items: [
        {
          num: '01',
          title: 'Sites & E-commerces',
          description:
            'Sites institucionais, lojas virtuais e landing pages responsivas com foco em performance e conversão.',
        },
        {
          num: '02',
          title: 'Sistemas Web',
          description:
            'Painéis administrativos, sistemas de gestão e plataformas internas sob medida para o seu negócio.',
        },
        {
          num: '03',
          title: 'APIs & Integrações',
          description:
            'Integração com ERPs, CRMs, gateways de pagamento e qualquer serviço externo via API REST.',
        },
      ],
    },
    technologies: {
      title: 'Tecnologias',
      subtitle: 'Ferramentas que uso no dia a dia',
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Seleção de projetos desenvolvidos',
      viewDemo: 'Demo',
      viewCode: 'Código',
    },
    contact: {
      title: 'Vamos Conversar?',
      subtitle:
        'Tem um projeto em mente? Me chame no WhatsApp ou preencha o formulário — respondo em até 24h.',
      form: {
        name: 'Seu nome',
        email: 'Seu e-mail',
        message: 'Descreva seu projeto...',
        send: 'Enviar pelo WhatsApp',
      },
      orContact: 'Ou entre em contato diretamente',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
    },
  },
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      technologies: 'Technologies',
      projects: 'Projects',
      contact: 'Contact',
      cta: 'Request a Quote',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Thomas Silva',
      role: 'Full Stack Developer',
      description:
        'I build websites, systems and e-commerce for businesses that need results — from requirements to deployment.',
      cta1: 'View Projects',
      cta2: 'Request a Quote',
      scroll: 'Scroll to explore',
    },
    stats: [
      { value: '6+', label: 'Years of experience' },
      { value: '20+', label: 'Projects delivered' },
      { value: '100%', label: 'Remote & On-site' },
    ],
    about: {
      title: 'About Me',
      badge: '● Available for Freelance',
      p1: 'Full Stack Developer with 6 years of experience delivering institutional websites, e-commerce platforms, and web systems for small and medium-sized businesses.',
      p2: 'I handle the full cycle: from requirements gathering to deployment — back-end in PHP/Laravel or Node.js, front-end in React or Angular, MySQL databases, and third-party API integrations.',
      p3: 'Currently available for freelance projects. If you need a professional website or web system, reach out.',
      cta: 'Message on WhatsApp',
    },
    services: {
      title: 'What I do',
      items: [
        {
          num: '01',
          title: 'Websites & E-commerce',
          description:
            'Institutional websites, online stores and responsive landing pages focused on performance and conversion.',
        },
        {
          num: '02',
          title: 'Web Systems',
          description:
            'Admin panels, management systems and internal platforms tailored to your business needs.',
        },
        {
          num: '03',
          title: 'APIs & Integrations',
          description:
            'Integration with ERPs, CRMs, payment gateways and external services via REST API.',
        },
      ],
    },
    technologies: {
      title: 'Technologies',
      subtitle: 'Tools I use every day',
    },
    projects: {
      title: 'Projects',
      subtitle: 'A selection of projects I have built',
      viewDemo: 'Demo',
      viewCode: 'Code',
    },
    contact: {
      title: "Let's Talk?",
      subtitle:
        'Have a project in mind? Message me on WhatsApp or fill out the form — I reply within 24h.',
      form: {
        name: 'Your name',
        email: 'Your email',
        message: 'Describe your project...',
        send: 'Send via WhatsApp',
      },
      orContact: 'Or contact me directly',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
} as const;

type Lang = keyof typeof T;

// ─── DATA ──────────────────────────────────────────────────────────────────────

const techCategories = [
  {
    name: 'Front-end',
    items: ['React', 'Angular', 'Vue.js', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Sass'],
  },
  {
    name: 'Back-end',
    items: ['PHP', 'Laravel', 'Node.js', 'NestJS', 'Express', 'Python'],
  },
  {
    name: { pt: 'Banco de Dados', en: 'Databases' },
    items: ['MySQL', 'MongoDB', 'SQL Server', 'Oracle DB', 'Prisma ORM'],
  },
  {
    name: 'CMS & Design',
    items: ['WordPress', 'Figma', 'Photoshop', 'Illustrator', 'Canva'],
  },
  {
    name: { pt: 'Ferramentas', en: 'Tools' },
    items: ['Git', 'GitHub', 'Docker', 'REST API', 'JWT', 'Vite'],
  },
];

const BASE = import.meta.env.BASE_URL;

const projects = [
  {
    title: 'HDC Events',
    description: {
      pt: 'Plataforma de gerenciamento de eventos com Laravel — cadastro e autenticação de usuários, CRUD de eventos com upload de imagens, sistema de confirmação de presença e dashboard pessoal com controle de acesso.',
      en: 'Event management platform built with Laravel — user registration and authentication, event CRUD with image upload, attendance confirmation system and personal dashboard with access control.',
    },
    tech: ['PHP', 'Laravel', 'MySQL', 'Livewire', 'Jetstream', 'Bootstrap'],
    github: 'https://github.com/thomassilva23/hdcevents',
    demo: null as string | null,
    image: `${BASE}projects/hdc-events.jpg`,
  },
  {
    title: 'Barbearia Premium',
    description: {
      pt: 'Site institucional completo para barbearia — carousel de hero, seções de serviços, equipe e localização, sistema de agendamento integrado e painel administrativo.',
      en: 'Complete institutional website for a barbershop — hero carousel, services, team and location sections, integrated scheduling system and admin panel.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Lovable'],
    github: 'https://github.com/thomassilva23/barbershop-connect',
    demo: 'https://sitebarbeariapremium.lovable.app/',
    image: `${BASE}projects/barbearia-premium.jpg`,
  },
  {
    title: 'Barbershop SaaS',
    description: {
      pt: 'Plataforma SaaS para barbearias — busca por estabelecimentos e serviços, agendamento com validação de fuso horário (Brasília), login via Google e dashboard com perfil do usuário.',
      en: 'SaaS platform for barbershops — search for barbershops and services, booking with timezone validation (Brasília), Google login and user profile dashboard.',
    },
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Google OAuth', 'Vercel'],
    github: 'https://github.com/thomassilva23/barbershop',
    demo: null as string | null,
    image: `${BASE}projects/barbershop.jpg`,
  },
  {
    title: 'My Money App',
    description: {
      pt: 'Aplicação fullstack de gestão financeira pessoal — ciclos de pagamento, controle de créditos e débitos, dashboard com resumo consolidado e autenticação JWT.',
      en: 'Fullstack personal finance app — payment cycles, credit/debit tracking, consolidated balance dashboard and JWT authentication.',
    },
    tech: ['React', 'Redux', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    github: 'https://github.com/thomassilva23/my-money-front',
    githubBack: 'https://github.com/thomassilva23/my-money-back',
    demo: null as string | null,
    image: `${BASE}projects/my-money-app.jpg`,
  },
];

const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/thomas-silva/',
  whatsapp: 'https://wa.me/5551980574085',
  email: 'mailto:thomassilva23@hotmail.com',
  github: 'https://github.com/thomassilva23',
};

// ─── HOOKS ─────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function ScrollProgress({ value }: { value: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent">
      <div
        className="h-full bg-amber transition-all duration-150 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

interface NavProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  t: typeof T.pt.nav;
}

function Nav({ lang, onLangChange, t }: NavProps) {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: 'about', label: t.about },
    { key: 'services', label: t.services },
    { key: 'technologies', label: t.technologies },
    { key: 'projects', label: t.projects },
    { key: 'contact', label: t.contact },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 backdrop-blur-xl bg-bg/85 border-b border-card-border'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-syne font-bold text-lg tracking-tight"
          >
            <span className="text-amber">T</span>
            <span className="text-cream">S</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.key)}
                className="nav-link font-dm text-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center gap-1 bg-elevated border border-card-border rounded-full p-1">
              {(['pt', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLangChange(l)}
                  className={`font-mono text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                    lang === l
                      ? 'bg-amber text-bg font-bold'
                      : 'text-muted hover:text-cream'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA (desktop) */}
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-amber text-bg font-syne font-semibold text-sm px-4 py-2 rounded-lg hover:bg-amber-dim transition-colors"
            >
              {t.cta}
            </a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-muted hover:text-cream transition-colors p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between p-6">
            <span className="font-syne font-bold text-lg">
              <span className="text-amber">T</span>
              <span className="text-cream">S</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-muted hover:text-cream transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-6 mt-8">
            {navItems.map((item, i) => (
              <button
                key={item.key}
                onClick={() => { scrollTo(item.key); setMenuOpen(false); }}
                className="text-left font-syne font-semibold text-3xl text-cream/80 hover:text-cream py-2 transition-colors"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto px-6 pb-10">
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-amber text-bg font-syne font-bold py-4 rounded-xl text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              {t.cta}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = T[lang].hero;
  const stats = T[lang].stats;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16 px-6 md:px-10"
    >
      {/* Animated background blobs */}
      <div
        className="blob w-[500px] h-[500px] opacity-[0.07] animate-blob"
        style={{ background: '#f0a500', top: '-120px', right: '-80px' }}
      />
      <div
        className="blob w-[350px] h-[350px] opacity-[0.05] animate-blob-slow"
        style={{ background: '#c47f00', bottom: '80px', left: '-60px' }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Greeting */}
        <p className="hero-item hero-d1 font-jb text-sm text-amber tracking-widest uppercase mb-4">
          {t.greeting}
        </p>

        {/* Name */}
        <h1 className="hero-item hero-d2 font-syne font-black text-5xl sm:text-6xl md:text-8xl text-cream leading-[0.95] tracking-tight mb-4">
          Thomas
          <br />
          Silva
        </h1>

        {/* Role */}
        <p
          className="hero-item hero-d3 font-syne font-bold text-2xl md:text-4xl mb-6"
          style={{
            background: 'linear-gradient(135deg, #f0a500 0%, #ede9e3 60%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t.role}
        </p>

        {/* Description */}
        <p className="hero-item hero-d4 font-dm text-cream-muted text-base md:text-lg max-w-xl leading-relaxed mb-10">
          {t.description}
        </p>

        {/* CTAs */}
        <div className="hero-item hero-d5 flex flex-wrap gap-3 mb-16">
          <button
            onClick={() => scrollTo('projects')}
            className="flex items-center gap-2 bg-amber text-bg font-syne font-bold px-6 py-3 rounded-lg hover:bg-amber-dim transition-all duration-200 hover:scale-[1.02]"
          >
            {t.cta1}
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-card-border text-cream font-syne font-semibold px-6 py-3 rounded-lg hover:border-amber/40 hover:bg-amber-subtle transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            {t.cta2}
          </a>
        </div>

        {/* Stats */}
        <div className="hero-item hero-d6 flex flex-wrap gap-8 pt-8 border-t border-card-border">
          {stats.map((stat, i) => (
            <div key={i}>
              <span className="font-syne font-black text-3xl text-amber">{stat.value}</span>
              <p className="font-dm text-sm text-cream-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-dim hero-item hero-d6">
        <span className="font-jb text-xs tracking-widest uppercase opacity-50">{t.scroll}</span>
        <ChevronDown className="w-4 h-4 opacity-40 animate-bounce" />
      </div>
    </section>
  );
}

function About({ lang }: { lang: Lang }) {
  const t = T[lang].about;

  return (
    <section id="about" className="py-24 px-6 md:px-10 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="amber-divider" />
              <span className="font-jb text-xs text-amber tracking-widest uppercase">
                {lang === 'pt' ? 'Sobre' : 'About'}
              </span>
            </div>
            <h2 className="reveal reveal-d1 font-syne font-black text-4xl md:text-5xl text-cream leading-tight mb-8">
              {t.title}
            </h2>
            <div className="space-y-4">
              {[t.p1, t.p2, t.p3].map((p, i) => (
                <p key={i} className={`reveal reveal-d${i + 2} font-dm text-cream-muted leading-relaxed`}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="reveal reveal-d2 flex flex-col gap-4">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 bg-elevated border border-card-border rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-jb text-xs text-cream-muted">{t.badge.replace('● ', '')}</span>
            </div>

            {/* Highlight cards */}
            <div className="card-amber p-6">
              <p className="font-jb text-xs text-amber uppercase tracking-wider mb-3">Stack principal</p>
              <div className="flex flex-wrap gap-2">
                {['PHP', 'Laravel', 'React', 'Angular', 'Node.js', 'MySQL', 'WordPress'].map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="card-amber p-6">
              <p className="font-jb text-xs text-amber uppercase tracking-wider mb-3">
                {lang === 'pt' ? 'Especialidades' : 'Specialties'}
              </p>
              <ul className="space-y-2">
                {(lang === 'pt'
                  ? [
                      'Sites institucionais & e-commerces',
                      'Sistemas de gestão web',
                      'APIs REST & integrações',
                      'WordPress customizado',
                    ]
                  : [
                      'Institutional websites & e-commerce',
                      'Web management systems',
                      'REST APIs & integrations',
                      'Custom WordPress',
                    ]
                ).map((item) => (
                  <li key={item} className="font-dm text-sm text-cream-muted flex items-start gap-2">
                    <span className="text-amber mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-amber text-bg font-syne font-bold py-4 rounded-xl hover:bg-amber-dim transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ lang }: { lang: Lang }) {
  const t = T[lang].services;

  return (
    <section id="services" className="py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-6">
          <div className="amber-divider" />
          <span className="font-jb text-xs text-amber tracking-widest uppercase">
            {lang === 'pt' ? 'Serviços' : 'Services'}
          </span>
        </div>
        <h2 className="reveal reveal-d1 font-syne font-black text-4xl md:text-5xl text-cream leading-tight mb-16">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {t.items.map((item, i) => (
            <div key={i} className={`reveal reveal-d${i + 1} card-amber p-8 flex flex-col gap-6`}>
              <span className="font-jb text-3xl font-bold text-amber/30 select-none">{item.num}</span>
              <div>
                <h3 className="font-syne font-bold text-xl text-cream mb-3">{item.title}</h3>
                <p className="font-dm text-cream-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Technologies({ lang }: { lang: Lang }) {
  const t = T[lang].technologies;

  return (
    <section id="technologies" className="py-24 px-6 md:px-10 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-6">
          <div className="amber-divider" />
          <span className="font-jb text-xs text-amber tracking-widest uppercase">
            {lang === 'pt' ? 'Tecnologias' : 'Technologies'}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <h2 className="reveal reveal-d1 font-syne font-black text-4xl md:text-5xl text-cream leading-tight">
            {t.title}
          </h2>
          <p className="reveal reveal-d2 font-dm text-cream-muted text-sm">{t.subtitle}</p>
        </div>

        <div className="space-y-8">
          {techCategories.map((cat, i) => {
            const catName = typeof cat.name === 'string' ? cat.name : cat.name[lang as 'pt' | 'en'];
            return (
              <div key={i} className={`reveal reveal-d${Math.min(i + 1, 5)}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-jb text-xs text-amber-dim tracking-widest uppercase whitespace-nowrap">
                    {catName}
                  </span>
                  <div className="flex-1 h-px bg-card-border" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects({ lang }: { lang: Lang }) {
  const t = T[lang].projects;

  return (
    <section id="projects" className="py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-6">
          <div className="amber-divider" />
          <span className="font-jb text-xs text-amber tracking-widest uppercase">
            {lang === 'pt' ? 'Projetos' : 'Projects'}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <h2 className="reveal reveal-d1 font-syne font-black text-4xl md:text-5xl text-cream leading-tight">
            {t.title}
          </h2>
          <p className="reveal reveal-d2 font-dm text-cream-muted text-sm">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div key={i} className={`reveal reveal-d${i + 1} card-amber overflow-hidden flex flex-col group`}>
              {/* Project image */}
              <div className="relative h-48 overflow-hidden bg-elevated border-b border-card-border">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-syne font-black text-5xl text-card-border select-none">
                      {project.title.split(' ').map((w: string) => w[0]).join('')}
                    </span>
                  </div>
                )}
                {/* Demo badge */}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 flex items-center gap-1 bg-amber text-bg font-jb text-xs font-bold px-2.5 py-1 rounded-full hover:bg-amber-dim transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live
                  </a>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1 gap-3">
                <h3 className="font-syne font-bold text-lg text-cream">{project.title}</h3>
                <p className="font-dm text-cream-muted text-sm leading-relaxed flex-1">
                  {project.description[lang as 'pt' | 'en']}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech: string) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-1 border-t border-card-border">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-syne font-semibold text-sm text-amber hover:text-amber-dim transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.viewDemo}
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-syne font-semibold text-sm text-cream-muted hover:text-cream transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    {'githubBack' in project ? 'Front-end' : t.viewCode}
                  </a>
                  {'githubBack' in project && (project as any).githubBack && (
                    <a
                      href={(project as any).githubBack}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-syne font-semibold text-sm text-cream-muted hover:text-cream transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Back-end
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = T[lang].contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      lang === 'pt'
        ? `Olá Thomas! Me chamo ${form.name}.\n\n${form.message}\n\nMeu e-mail: ${form.email}`
        : `Hi Thomas! My name is ${form.name}.\n\n${form.message}\n\nMy email: ${form.email}`;
    window.open(`https://wa.me/5551980574085?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-10 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-6">
          <div className="amber-divider" />
          <span className="font-jb text-xs text-amber tracking-widest uppercase">
            {lang === 'pt' ? 'Contato' : 'Contact'}
          </span>
        </div>
        <h2 className="reveal reveal-d1 font-syne font-black text-4xl md:text-5xl text-cream leading-tight mb-4">
          {t.title}
        </h2>
        <p className="reveal reveal-d2 font-dm text-cream-muted max-w-lg mb-16">{t.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="reveal reveal-d2 flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder={t.form.name}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="form-input"
            />
            <input
              type="email"
              placeholder={t.form.email}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              className="form-input"
            />
            <textarea
              placeholder={t.form.message}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              rows={5}
              className="form-input"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-amber text-bg font-syne font-bold py-4 rounded-xl hover:bg-amber-dim transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5" />
              {t.form.send}
            </button>
          </form>

          {/* Social links */}
          <div className="reveal reveal-d3 flex flex-col gap-4">
            <p className="font-jb text-xs text-amber tracking-widest uppercase mb-2">{t.orContact}</p>

            {[
              {
                icon: <MessageCircle className="w-5 h-5" />,
                label: 'WhatsApp',
                value: '+55 51 98057-4085',
                href: socialLinks.whatsapp,
                color: '#25D366',
              },
              {
                icon: <Linkedin className="w-5 h-5" />,
                label: 'LinkedIn',
                value: 'linkedin.com/in/thomas-silva',
                href: socialLinks.linkedin,
                color: '#0077B5',
              },
              {
                icon: <Mail className="w-5 h-5" />,
                label: 'E-mail',
                value: 'thomassilva23@hotmail.com',
                href: socialLinks.email,
                color: '#f0a500',
              },
              {
                icon: <Github className="w-5 h-5" />,
                label: 'GitHub',
                value: 'github.com/thomassilva23',
                href: socialLinks.github,
                color: '#ede9e3',
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-amber flex items-center gap-4 p-4 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: `${link.color}18`, color: link.color }}
                >
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-jb text-xs text-cream-muted uppercase tracking-wider">{link.label}</p>
                  <p className="font-dm text-sm text-cream truncate">{link.value}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-cream-dim group-hover:text-amber transition-colors ml-auto flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const t = T[lang].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 md:px-10 border-t border-card-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-syne font-bold text-base">
          <span className="text-amber">T</span>
          <span className="text-cream">S</span>
        </span>
        <p className="font-dm text-xs text-cream-dim text-center">
          © {year} Thomas Silva. {t.rights}
        </p>
        <div className="flex gap-4">
          {[
            { icon: <Github className="w-4 h-4" />, href: socialLinks.github },
            { icon: <Linkedin className="w-4 h-4" />, href: socialLinks.linkedin },
            { icon: <MessageCircle className="w-4 h-4" />, href: socialLinks.whatsapp },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-dim hover:text-amber transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>('pt');
  const progress = useScrollProgress();

  useRevealOnScroll();

  return (
    <div className="bg-bg text-cream min-h-screen">
      <ScrollProgress value={progress} />
      <Nav lang={lang} onLangChange={setLang} t={T[lang].nav} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Services lang={lang} />
        <Technologies lang={lang} />
        <Projects lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
