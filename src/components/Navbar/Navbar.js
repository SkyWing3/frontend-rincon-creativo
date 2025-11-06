
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LuShoppingCart,
  LuUser,
  LuMenu,
  LuX,
  LuSun,
  LuMoon,
  LuLogOut,
} from 'react-icons/lu';
import logo from '../../assets/logo.jpg';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

const NAV_LINKS = [
  { label: 'Inicio', path: '/' },
  { label: 'Catálogo', path: '/catalog' },
  { label: 'Sobre nosotros', path: '/#about', type: 'anchor' },
  { label: 'Contacto', path: '/#contact', type: 'anchor' },
];

const Navbar = ({ cartItemCount = 0 }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActivePath = (path) => {
    if (path === '/' || path === '') {
      return location.pathname === '/';
    }
    if (path.startsWith('/#')) {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigate = (path, type) => {
    setIsMobileOpen(false);
    if (type === 'anchor') {
      navigate('/');
      const anchorId = path.split('#')[1];
      if (!anchorId) {
        return;
      }
      requestAnimationFrame(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
      return;
    }
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const renderNavLinks = (variant = 'desktop') =>
    NAV_LINKS.map(({ label, path, type }) => (
      <button
        key={path}
        type="button"
        onClick={() => handleNavigate(path, type)}
        className={`text-sm font-medium transition-colors ${
          isActivePath(path) && type !== 'anchor'
            ? 'text-primary'
            : 'text-foreground/80 hover:text-primary'
        } ${variant === 'mobile' ? 'w-full text-left py-2.5 px-2 rounded-lg hover:bg-primary/10' : ''}`}
      >
        {label}
      </button>
    ));

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <img src={logo} alt="Rincón Creativo" className="h-10 w-10 rounded-full border border-primary/30" />
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Rincón Creativo</span>
              <span className="text-[0.75rem] text-muted-foreground">Artesanías Bolivianas</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {renderNavLinks('desktop')}
            {user && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors ${
                  isActivePath('/admin') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                }`}
              >
                Panel
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card text-sm text-foreground/80 transition hover:border-primary/40 hover:text-primary md:flex"
              aria-label="Cambiar tema"
            >
              {isDarkMode ? <LuSun className="h-4 w-4" /> : <LuMoon className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => handleNavigate('/cart')}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card transition hover:border-primary/40 hover:text-primary"
              aria-label="Ir al carrito"
            >
              <LuShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-accent-foreground shadow-soft">
                  {cartItemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  to="/profile"
                  className={`flex h-10 items-center gap-2 rounded-full border border-border/80 bg-card px-4 text-sm font-medium transition hover:border-primary/40 hover:text-primary ${
                    isActivePath('/profile') ? 'border-primary/50 text-primary' : ''
                  }`}
                >
                  <LuUser className="h-4 w-4" />
                  Mi Perfil
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-10 items-center gap-2 rounded-full border border-border/80 bg-card px-4 text-sm font-medium text-foreground/80 transition hover:border-accent/40 hover:bg-accent hover:text-accent-foreground"
                >
                  <LuLogOut className="h-4 w-4" />
                  Salir
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  to="/login"
                  className="flex h-10 items-center gap-2 rounded-full border border-border/80 bg-card px-4 text-sm font-medium transition hover:border-primary/40 hover:text-primary"
                >
                  <LuUser className="h-4 w-4" />
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
                >
                  Crear cuenta
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card text-sm text-foreground/80 transition hover:border-primary/40 hover:text-primary md:hidden"
              aria-label="Abrir menú"
            >
              {isMobileOpen ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMobileOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-border/60 bg-background/98 backdrop-blur md:hidden">
          <div className="container flex flex-col gap-2 py-4">
            {renderNavLinks('mobile')}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center justify-between rounded-lg border border-border/80 bg-card px-4 py-2.5 text-sm font-medium text-foreground/80 transition hover:border-primary/40 hover:text-primary"
            >
              Cambiar tema
              {isDarkMode ? <LuSun className="h-4 w-4" /> : <LuMoon className="h-4 w-4" />}
            </button>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg border border-border/80 bg-card px-4 py-2.5 text-sm font-medium transition hover:border-primary/40 hover:text-primary"
                >
                  <LuUser className="h-4 w-4" />
                  Mi Perfil
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg border border-border/80 bg-card px-4 py-2.5 text-sm font-medium text-foreground/80 transition hover:border-accent/40 hover:bg-accent hover:text-accent-foreground"
                >
                  <LuLogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg border border-border/80 bg-card px-4 py-2.5 text-sm font-medium transition hover:border-primary/40 hover:text-primary"
                >
                  <LuUser className="h-4 w-4" />
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
                >
                  Crear cuenta
                </Link>
              </>
            )}

            {user && (
              <Link
                to="/admin"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg border border-border/80 bg-card px-4 py-2.5 text-sm font-medium transition hover:border-primary/40 hover:text-primary"
              >
                Panel administrativo
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
