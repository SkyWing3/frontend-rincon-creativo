
import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuFacebook,
  LuInstagram,
  LuMail,
  LuMapPin,
  LuPhone,
} from 'react-icons/lu';
import logo from '../../assets/logo.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Rincón Creativo" className="h-12 w-12 rounded-full border border-primary/40" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Rincón Creativo</p>
                <p className="text-xs text-muted-foreground">Artesanías Bolivianas</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Artesanías auténticas hechas a mano con amor, tradición y compromiso con nuestras comunidades.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Enlaces Rápidos</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="transition hover:text-primary">Inicio</Link>
              </li>
              <li>
                <Link to="/catalog" className="transition hover:text-primary">Catálogo</Link>
              </li>
              <li>
                <Link to="/profile" className="transition hover:text-primary">Mi Cuenta</Link>
              </li>
              <li>
                <Link to="/admin" className="transition hover:text-primary">Panel Administrativo</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Categorías</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Textiles</li>
              <li>Cerámica</li>
              <li>Joyería</li>
              <li>Cestería</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <LuMapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>La Paz, Bolivia</span>
              </li>
              <li className="flex items-center gap-2">
                <LuPhone className="h-4 w-4 text-primary" />
                <a href="tel:+59122345678" className="transition hover:text-primary">+591 2 234 5678</a>
              </li>
              <li className="flex items-center gap-2">
                <LuMail className="h-4 w-4 text-primary" />
                <a href="mailto:hola@rinconcreativo.com" className="transition hover:text-primary">hola@rinconcreativo.com</a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <LuFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary/40 text-secondary transition hover:bg-secondary hover:text-secondary-foreground"
              >
                <LuInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          &copy; {currentYear} Rincón Creativo. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
