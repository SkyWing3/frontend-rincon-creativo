import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const departments = [
  { label: 'Beni', value: 'Beni' },
  { label: 'Cochabamba', value: 'Cochabamba' },
  { label: 'Chuquisaca', value: 'Chuquisaca' },
  { label: 'La Paz', value: 'La Paz' },
  { label: 'Oruro', value: 'Oruro' },
  { label: 'Pando', value: 'Pando' },
  { label: 'Potosí', value: 'Potosi' },
  { label: 'Santa Cruz', value: 'Santa Cruz' },
  { label: 'Tarija', value: 'Tarija' },
];

const strengthMeta = [
  {
    label: '',
    barActive: 'bg-muted',
    textClass: 'text-muted-foreground',
  },
  {
    label: 'muy débil',
    barActive: 'bg-rose-500',
    textClass: 'text-rose-500',
  },
  {
    label: 'básica',
    barActive: 'bg-amber-500',
    textClass: 'text-amber-500',
  },
  {
    label: 'sólida',
    barActive: 'bg-primary',
    textClass: 'text-primary',
  },
  {
    label: 'excelente',
    barActive: 'bg-emerald-500',
    textClass: 'text-emerald-500',
  },
];

const defaultFormData = {
  first_name: '',
  f_last_name: '',
  s_last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone: '',
  departamento: '',
  city: '',
  address: '',
};

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState(defaultFormData);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const strengthMessage = useMemo(() => {
    if (passwordStrength === 0) {
      return 'Usa al menos 8 caracteres combinando mayúsculas, números y símbolos.';
    }
    return `Seguridad ${strengthMeta[passwordStrength].label}`;
  }, [passwordStrength]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) {
      setSubmitError(null);
    }
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
    if (name === 'password') {
      evaluateStrength(value);
    }
  };

  const evaluateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      setSubmitError('Las contraseñas no coinciden. Verifica e inténtalo nuevamente.');
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await register(formData);
      setSubmitSuccess(true);
    } catch (error) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        (Array.isArray(error?.response?.data) ? error.response.data.join(' ') : null);

      setSubmitError(apiMessage || 'No se pudo completar el registro. Intenta más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { textClass, barActive } = strengthMeta[passwordStrength] ?? strengthMeta[0];

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/15 to-accent/15" />
        <img
          src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=1400&q=80"
          alt="Artesanos creando piezas"
          className="h-full w-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 flex w-full flex-col lg:flex-row">
        <div className="flex flex-1 flex-col justify-center px-8 py-16 lg:px-16">
          <div className="mx-auto max-w-xl space-y-6">
            <span className="inline-flex rounded-full bg-primary/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Rincón Creativo
            </span>
            <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
              Crea tu cuenta y acompáñanos a preservar la artesanía boliviana
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
              Completa la información para descubrir colecciones personalizadas, seguimiento de
              pedidos y beneficios exclusivos para nuestra comunidad.
            </p>
            <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
              <div className="rounded-3xl border border-primary/30 bg-primary/10 p-5">
                <p className="font-semibold text-primary">Impacto real</p>
                <p className="mt-2 text-primary/80">
                  El 70% de cada compra regresa a las manos de los artesanos.
                </p>
              </div>
              <div className="rounded-3xl border border-secondary/30 bg-secondary/10 p-5">
                <p className="font-semibold text-secondary">Comunidad</p>
                <p className="mt-2 text-secondary/80">
                  Más de 20 comunidades fortalecen sus tradiciones junto a nosotros.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-16 lg:px-12">
          <div className="w-full max-w-xl rounded-3xl border border-border/60 bg-card/95 p-8 shadow-soft backdrop-blur md:p-10">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              <div className="space-y-3 text-center md:text-left">
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                  Información personal
                </h2>
                <p className="text-sm text-muted-foreground">
                  Los datos nos ayudan a ofrecerte envíos precisos y recomendaciones acordes a tu región.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="first_name" className="text-sm font-medium text-foreground">
                    Nombre
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="f_last_name" className="text-sm font-medium text-foreground">
                    Apellido paterno
                  </label>
                  <input
                    id="f_last_name"
                    name="f_last_name"
                    type="text"
                    autoComplete="family-name"
                    value={formData.f_last_name}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="s_last_name" className="text-sm font-medium text-foreground">
                    Apellido materno
                  </label>
                  <input
                    id="s_last_name"
                    name="s_last_name"
                    type="text"
                    autoComplete="additional-name"
                    value={formData.s_last_name}
                    onChange={handleChange}
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  />
                  <div className="flex gap-1" aria-hidden="true">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <span
                        key={index}
                        className={`h-1.5 flex-1 rounded-full bg-muted ${index < passwordStrength ? barActive : ''}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${textClass}`}>{strengthMessage}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="password_confirmation" className="text-sm font-medium text-foreground">
                    Confirmar contraseña
                  </label>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="departamento" className="text-sm font-medium text-foreground">
                    Departamento
                  </label>
                  <select
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {departments.map((dep) => (
                      <option key={dep.value} value={dep.value}>
                        {dep.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="city" className="text-sm font-medium text-foreground">
                    Ciudad
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col space-y-2">
                  <label htmlFor="address" className="text-sm font-medium text-foreground">
                    Dirección
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={handleChange}
                    className="rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/70"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Al registrarte aceptas nuestros{' '}
                  <a href="/terminos" className="font-semibold text-primary transition hover:text-primary/80">
                    Términos y Condiciones
                  </a>
                  .
                </p>
              </div>
            </form>

            {(submitError || submitSuccess) && (
              <div
                className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                  submitError
                    ? 'border-accent/40 bg-accent/10 text-accent'
                    : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-600'
                }`}
                role="alert"
              >
                {submitError
                  ? submitError
                  : 'Registro exitoso. Estamos preparando tu experiencia.'}
              </div>
            )}

            <p className="mt-8 text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-semibold text-primary transition hover:text-primary/80">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
