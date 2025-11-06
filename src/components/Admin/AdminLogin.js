import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { adminLogin } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await adminLogin(email, password);
        } catch (err) {
            let errorMessage = 'No se pudo iniciar sesión como administrador.';
            if (err?.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative flex min-h-[70vh] overflow-hidden rounded-3xl border border-border/60 bg-card/95 shadow-soft">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10" />
            <div className="relative z-10 grid w-full gap-0 md:grid-cols-2">
                <div className="flex flex-col justify-center gap-6 px-10 py-14">
                    <span className="inline-flex w-fit rounded-full bg-secondary/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                        Panel administrativo
                    </span>
                    <h1 className="text-3xl font-semibold text-foreground">
                        Bienvenido al hub de gestión de Rincón Creativo
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Administra usuarios, pedidos y catálogo desde un solo lugar. Ingresa tus credenciales de administrador para continuar.
                    </p>
                    <div className="rounded-3xl border border-secondary/30 bg-secondary/10 p-6 text-sm text-secondary">
                        Recuerda proteger tus credenciales. Si detectas actividad inusual, cambia tu contraseña de inmediato.
                    </div>
                </div>

                <div className="flex items-center justify-center bg-card/90 px-10 py-14 backdrop-blur">
                    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold text-foreground">Acceso administrador</h2>
                            <p className="text-sm text-muted-foreground">
                                Ingresa con tu cuenta corporativa para gestionar el sistema.
                            </p>
                        </div>

                        {error && (
                            <div className="rounded-2xl border border-rose-400/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-600">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="admin-email" className="text-sm font-medium text-foreground">
                                Correo
                            </label>
                            <input
                                id="admin-email"
                                className="w-full rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 dark:bg-slate-900/70"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="admin-password" className="text-sm font-medium text-foreground">
                                Contraseña
                            </label>
                            <input
                                id="admin-password"
                                className="w-full rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 dark:bg-slate-900/70"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <button
                            className="w-full rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-soft transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Ingresando...' : 'Entrar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
