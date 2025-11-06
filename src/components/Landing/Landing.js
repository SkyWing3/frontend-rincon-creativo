
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LuArrowRight,
  LuHeart,
  LuShieldCheck,
  LuTruck,
  LuSparkles,
  LuStar,
} from 'react-icons/lu';

const FEATURES = [
  {
    icon: LuHeart,
    title: 'Hecho a mano',
    description: 'Cada pieza es elaborada con dedicación por artesanos bolivianos.',
    accent: 'bg-primary/10 text-primary',
  },
  {
    icon: LuShieldCheck,
    title: 'Autenticidad garantizada',
    description: 'Trabajamos de la mano con comunidades para preservar sus tradiciones.',
    accent: 'bg-secondary/10 text-secondary',
  },
  {
    icon: LuTruck,
    title: 'Envío seguro',
    description: 'Empacado cuidadosamente para llegar perfecto a tu hogar.',
    accent: 'bg-accent/10 text-accent',
  },
];

const CATEGORIES = [
  {
    name: 'Textiles',
    description: 'Tejidos tradicionales con diseños únicos.',
    image:
      'https://images.unsplash.com/photo-1759599870816-8419bf6b58a1?auto=format&fit=crop&w=1080&q=80',
  },
  {
    name: 'Cerámica',
    description: 'Alfarería artesanal de alta calidad.',
    image:
      'https://images.unsplash.com/photo-1719852255246-898f965e04e4?auto=format&fit=crop&w=1080&q=80',
  },
  {
    name: 'Joyería',
    description: 'Accesorios únicos hechos con materiales nobles.',
    image:
      'https://images.unsplash.com/photo-1758974504445-65b1ee86e47e?auto=format&fit=crop&w=1080&q=80',
  },
  {
    name: 'Cestería',
    description: 'Canastas y productos tejidos a mano.',
    image:
      'https://images.unsplash.com/photo-1758487424832-a53ae6cdefdb?auto=format&fit=crop&w=1080&q=80',
  },
];

const TESTIMONIALS = [
  {
    quote:
      '¡Productos increíbles y de alta calidad! Me encanta la historia detrás de cada pieza.',
    author: 'María Fernanda',
  },
  {
    quote:
      'El servicio al cliente fue excepcional. Recibí mi pedido rápidamente y en perfectas condiciones.',
    author: 'Carlos Alberto',
  },
];

const Landing = () => {
  const navigate = useNavigate();

  const navigateToCatalog = () => navigate('/catalog');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-24">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1731275668160-f18f97c6faac?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container relative z-10 flex flex-col gap-10 text-white md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em]">
              <LuSparkles className="h-4 w-4" />
              Artesanía Boliviana
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Descubre el arte que da vida a nuestras tradiciones
            </h1>
            <p className="text-lg text-white/85 md:text-xl">
              Piezas únicas creadas con pasión por artesanos bolivianos. Conecta con historias
              ancestrales y lleva a casa un pedacito de nuestra cultura.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={navigateToCatalog}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft transition hover:bg-white/90"
              >
                Explorar catálogo
                <LuArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: document.getElementById('about')?.offsetTop ?? 0,
                    behavior: 'smooth',
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Conoce nuestra historia
              </button>
            </div>
          </div>
          <div className="grid gap-4 text-sm text-white/85 md:w-[320px]">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Compromiso</p>
              <p className="mt-3 text-lg font-semibold">Más de 80 artesanos trabajan junto a nosotros.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Impacto</p>
              <p className="mt-3 text-lg font-semibold">
                El 70% de cada venta regresa directamente a las comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-20">
        <div className="container grid gap-8 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, accent }) => (
            <article
              key={title}
              className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${accent}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-muted/40 py-20">
        <div className="container flex flex-col gap-10 md:flex-row md:items-center">
          <div className="grid flex-1 gap-4 md:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80"
              alt="Artesana trabajando en un telar"
              className="h-72 w-full rounded-3xl object-cover shadow-soft md:h-80"
            />
            <img
              src="https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?auto=format&fit=crop&w=900&q=80"
              alt="Artesanía en cerámica"
              className="h-72 w-full rounded-3xl object-cover shadow-soft md:mt-12 md:h-80"
            />
          </div>
          <div className="flex-1 space-y-6">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Nuestra historia
            </span>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Artesanía con propósito: tradición, identidad y comunidad
            </h2>
            <p className="text-muted-foreground">
              Rincón Creativo nace como un homenaje a la diversidad cultural de Bolivia. Colaboramos
              con artesanos de distintos departamentos para que cada pieza represente la riqueza de
              nuestras raíces.
            </p>
            <p className="text-muted-foreground">
              Nos enfocamos en prácticas sostenibles, comercio justo e innovación sin perder la
              esencia ancestral. Cada compra impulsa directamente a las familias creadoras.
            </p>
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-sm text-primary">
              Más de 20 comunidades forman parte de Rincón Creativo, llevando sus tradiciones a todo
              el país.
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="catalog-preview" className="bg-background py-20">
        <div className="container space-y-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
              Categorías
            </span>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Explora nuestra colección</h2>
            <p className="mt-3 text-muted-foreground md:max-w-2xl md:mx-auto">
              Descubre piezas seleccionadas cuidadosamente para celebrar la diversidad y creatividad
              de nuestros artesanos.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map(({ name, description, image }) => (
              <button
                key={name}
                type="button"
                onClick={navigateToCatalog}
                className="group relative h-72 overflow-hidden rounded-3xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <p className="mt-2 text-sm text-white/80">{description}</p>
                </div>
                <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition group-hover:bg-white group-hover:text-primary">
                  <LuArrowRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="contact" className="bg-muted/30 py-20">
        <div className="container space-y-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Comunidad
            </span>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Lo que dicen quienes confían en nosotros
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map(({ quote, author }) => (
              <figure
                key={author}
                className="flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-card/90 p-8 shadow-sm"
              >
                <div>
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <LuStar key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg text-foreground/90">&ldquo;{quote}&rdquo;</blockquote>
                </div>
                <figcaption className="mt-6 text-sm font-semibold text-muted-foreground">
                  {author}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-primary/30 bg-primary/10 px-8 py-10 text-center md:px-16">
            <h3 className="text-2xl font-semibold text-primary">¿Listo para descubrir algo único?</h3>
            <p className="text-sm text-primary/80 md:max-w-xl">
              Únete a nuestra comunidad y sé el primero en conocer nuestras nuevas colecciones y
              colaboraciones con artesanos de todo el país.
            </p>
            <button
              type="button"
              onClick={navigateToCatalog}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
            >
              Explorar catálogo
              <LuArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
