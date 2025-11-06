import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      let errorMessage = 'No se pudo iniciar sesión.';
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.response?.data?.error;

      if (serverMessage) {
        errorMessage = serverMessage;
      } else if (err?.response) {
        errorMessage = `Error ${err.response.status}: verifica tus credenciales.`;
      } else if (err?.request) {
        errorMessage = 'No se recibió respuesta del servidor. Intenta nuevamente.';
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1400&q=80"
          alt="Tejedora boliviana trabajando"
          className="h-full w-full object-cover opacity-20"
        />
      </div>
      <div className="relative z-10 flex w-full flex-col justify-center md:flex-row">
        <div className="hidden flex-1 flex-col justify-center bg-primary/20 px-8 py-16 backdrop-blur md:flex">
          <div className="mx-auto max-w-md space-y-6 text-primary">
            <span className="inline-flex rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
              Bienvenido
            </span>
            <h2 className="text-3xl font-semibold">
              Ingresa para seguir descubriendo la esencia del arte boliviano
            </h2>
            <p className="text-primary/80">
              Accede a tus pedidos, administra tus datos y guarda tus piezas favoritas.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-md space-y-8 rounded-3xl border border-border/60 bg-card/95 p-10 shadow-soft backdrop-blur">
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-semibold text-foreground">Iniciar sesión</h1>
              <p className="text-sm text-muted-foreground">
                Ingresa tus credenciales para acceder a tu cuenta.
              </p>
            </div>

            {error && (
              <div className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-semibold text-primary transition hover:text-primary/80">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
