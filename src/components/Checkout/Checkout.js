import React, { useContext, useEffect, useMemo, useState } from 'react';
import { LuClipboardList, LuExternalLink } from 'react-icons/lu';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';

const Checkout = ({ cartItems = [], orderDetails = null, orderError = null }) => {
    const { user, token } = useContext(AuthContext);
    const [profile, setProfile] = useState(user || null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [profileError, setProfileError] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchProfile = async () => {
            setIsLoadingProfile(true);
            setProfileError(null);
            try {
                const response = await authService.getProfile(token);
                const payload = response?.data || response;
                if (payload?.data) {
                    setProfile(payload.data);
                } else {
                    setProfile(payload);
                }
            } catch (error) {
                console.error('No se pudo obtener el perfil del usuario', error);
                setProfileError('No se pudieron cargar los datos del perfil.');
            } finally {
                setIsLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [token]);

    useEffect(() => {
        if (user) {
            setProfile(user);
        }
    }, [user]);

    const hasItems = cartItems.length > 0;
    const cartTotal = useMemo(() => {
        if (!hasItems) {
            return 0;
        }
        return cartItems.reduce((total, item) => {
            const price = Number(item.price) || 0;
            return total + price * (item.quantity || 0);
        }, 0);
    }, [cartItems, hasItems]);

    if (!token) {
        return (
            <div className="bg-background py-16 text-foreground">
                <div className="container rounded-3xl border border-border/60 bg-card/95 p-12 text-center shadow-soft">
                    <h2 className="text-3xl font-semibold">Finalizar compra</h2>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Debes iniciar sesión para finalizar la compra.
                    </p>
                </div>
            </div>
        );
    }

    const hasOrder = Boolean(orderDetails);
    const paymentInstructions = orderDetails?.payment_instructions;

    return (
        <div className="bg-background py-16 text-foreground">
            <div className="container space-y-10">
                <div className="flex flex-col gap-3">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                        <LuClipboardList className="h-4 w-4" />
                        Confirmación
                    </span>
                    <h1 className="text-3xl font-semibold md:text-4xl">Finalizar compra</h1>
                    <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                        Revisa tus datos personales y el resumen del pedido. Si ya generaste la orden, encontrarás las
                        instrucciones de pago a continuación.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
                    <section className="space-y-6 rounded-3xl border border-border/60 bg-card/95 p-8 shadow-soft">
                        <header className="flex flex-col gap-2 border-b border-border/50 pb-4">
                            <h2 className="text-xl font-semibold">Datos de la cuenta</h2>
                            <p className="text-sm text-muted-foreground">
                                Verifica que tu información esté actualizada para coordinar envíos y seguimiento.
                            </p>
                        </header>

                        {isLoadingProfile && (
                            <p className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                                Cargando datos del perfil...
                            </p>
                        )}

                        {profileError && !isLoadingProfile && (
                            <p className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                                {profileError}
                            </p>
                        )}

                        {!isLoadingProfile && !profileError && profile && (
                            <dl className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Nombre</dt>
                                    <dd className="text-sm font-medium">{profile.first_name || 'N/D'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Apellido paterno</dt>
                                    <dd className="text-sm font-medium">{profile.f_last_name || 'N/D'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Apellido materno</dt>
                                    <dd className="text-sm font-medium">{profile.s_last_name || 'N/D'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Correo electrónico</dt>
                                    <dd className="text-sm font-medium">{profile.email || 'N/D'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Teléfono</dt>
                                    <dd className="text-sm font-medium">{profile.phone || 'N/D'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Departamento</dt>
                                    <dd className="text-sm font-medium">{profile.departamento || 'N/D'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Ciudad</dt>
                                    <dd className="text-sm font-medium">{profile.city || 'N/D'}</dd>
                                </div>
                                <div className="md:col-span-2">
                                    <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Dirección</dt>
                                    <dd className="text-sm font-medium">{profile.address || 'N/D'}</dd>
                                </div>
                            </dl>
                        )}

                        {!isLoadingProfile && !profileError && !profile && (
                            <p className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                                No se encontraron datos del perfil. Intenta nuevamente más tarde.
                            </p>
                        )}
                    </section>

                    <aside className="space-y-6 rounded-3xl border border-border/60 bg-card/95 p-8 shadow-soft">
                        <header className="flex flex-col gap-2 border-b border-border/50 pb-4">
                            <h2 className="text-xl font-semibold">Resumen del pedido</h2>
                            <p className="text-sm text-muted-foreground">
                                Confirmación de los productos y total estimado.
                            </p>
                        </header>

                        {!hasItems && (
                            <p className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                                Aún no tienes productos en tu carrito. Agrega artículos en el catálogo para continuar.
                            </p>
                        )}

                        {hasItems && (
                            <div className="space-y-4">
                                {cartItems.map((item) => {
                                    const subtotal = Number(item.price || 0) * (item.quantity || 0);
                                    return (
                                        <div key={item.id} className="flex items-start justify-between gap-4 rounded-2xl border border-border/40 bg-card px-4 py-3">
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {item.name} <span className="text-muted-foreground">(x{item.quantity})</span>
                                                </p>
                                                {item.categoryName && (
                                                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                                        {item.categoryName}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-sm font-semibold text-primary">Bs {subtotal.toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                                <div className="flex items-center justify-between rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
                                    <span>Total estimado</span>
                                    <span>Bs {cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        )}

                        {orderError && (
                            <p className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                                {orderError}
                            </p>
                        )}

                        {!hasOrder && !orderError && (
                            <p className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                                Genera una orden desde el carrito para ver las instrucciones de pago.
                            </p>
                        )}

                        {hasOrder && paymentInstructions && (
                            <div className="space-y-4 rounded-3xl border border-primary/40 bg-primary/10 p-6 text-primary">
                                <h3 className="text-lg font-semibold">Instrucciones de pago</h3>
                                <dl className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <dt>Activo</dt>
                                        <dd className="font-semibold">{paymentInstructions.asset}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt>Monto a pagar</dt>
                                        <dd className="font-semibold">
                                            {paymentInstructions.usdt_amount} {paymentInstructions.asset}
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt>Red</dt>
                                        <dd className="font-semibold">{paymentInstructions.network}</dd>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <dt>Dirección</dt>
                                        <dd className="font-mono text-xs">{paymentInstructions.usdt_address}</dd>
                                    </div>
                                </dl>
                                {paymentInstructions.note && (
                                    <p className="rounded-2xl border border-primary/50 bg-primary/15 px-4 py-3 text-xs">
                                        {paymentInstructions.note}
                                    </p>
                                )}
                                <a
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
                                    href="https://www.binance.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ir a Binance Pay
                                    <LuExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
