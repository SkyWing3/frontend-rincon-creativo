import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuMinus, LuPlus, LuTrash2, LuWallet } from 'react-icons/lu';
import { AuthContext } from '../../context/AuthContext';

const ShoppingCart = ({ cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout }) => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);

    const hasItems = Array.isArray(cartItems) && cartItems.length > 0;

    const cartTotals = useMemo(() => {
        if (!hasItems) {
            return { quantity: 0, total: 0 };
        }
        return cartItems.reduce(
            (acc, item) => {
                const quantity = Number(item.quantity || 0);
                const price = Number(item.price || 0);
                return {
                    quantity: acc.quantity + quantity,
                    total: acc.total + quantity * price,
                };
            },
            { quantity: 0, total: 0 },
        );
    }, [cartItems, hasItems]);

    const handleFinalizePurchase = async () => {
        if (isSubmitting) {
            return;
        }

        setCheckoutError(null);

        if (!token) {
            navigate('/login');
            return;
        }

        if (!hasItems) {
            setCheckoutError('No hay productos en el carrito.');
            return;
        }

        if (typeof onCheckout !== 'function') {
            navigate('/checkout');
            return;
        }

        try {
            setIsSubmitting(true);
            await onCheckout();
            navigate('/checkout');
        } catch (error) {
            const message = error?.message || 'No se pudo finalizar la compra.';
            setCheckoutError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background py-16 text-foreground">
            <div className="container space-y-10">
                <div className="flex flex-col gap-4">
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                        Tu selección
                    </span>
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <h1 className="text-3xl font-semibold md:text-4xl">Carrito de compras</h1>
                        {hasItems && (
                            <p className="text-sm text-muted-foreground">
                                {cartTotals.quantity} {cartTotals.quantity === 1 ? 'producto' : 'productos'} en tu carrito
                            </p>
                        )}
                    </div>
                </div>

                {!hasItems ? (
                    <div className="rounded-3xl border border-border/60 bg-card/90 p-12 text-center text-muted-foreground shadow-sm">
                        <p>No hay productos en el carrito. Explora el catálogo para encontrar tus piezas favoritas.</p>
                        <button
                            type="button"
                            onClick={() => navigate('/catalog')}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
                        >
                            Ir al catálogo
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                        <div className="space-y-6">
                            {cartItems.map((item) => {
                                const quantity = Number(item.quantity || 0);
                                const price = Number(item.price || 0);
                                const subtotal = quantity * price;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/95 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft md:flex-row md:items-center"
                                    >
                                        <div className="flex items-center gap-4 md:w-2/3">
                                            <div className="h-24 w-24 overflow-hidden rounded-2xl border border-border/60 bg-muted/50">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col gap-1">
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                                {item.categoryName && (
                                                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                                        {item.categoryName}
                                                    </span>
                                                )}
                                                <p className="text-sm text-muted-foreground">
                                                    Precio unitario: <span className="font-medium text-primary">Bs {price.toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-end">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => onUpdateQuantity(item, quantity - 1)}
                                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-foreground/80 transition hover:border-primary/40 hover:text-primary"
                                                    aria-label="Reducir cantidad"
                                                >
                                                    <LuMinus className="h-4 w-4" />
                                                </button>
                                                <span className="min-w-[2rem] text-center text-sm font-semibold">{quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => onUpdateQuantity(item, quantity + 1)}
                                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-foreground/80 transition hover:border-primary/40 hover:text-primary"
                                                    aria-label="Aumentar cantidad"
                                                >
                                                    <LuPlus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                                    Subtotal
                                                </p>
                                                <p className="text-lg font-semibold text-primary">
                                                    Bs {subtotal.toFixed(2)}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => onRemoveFromCart(item)}
                                                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm font-medium text-foreground/70 transition hover:border-accent/40 hover:text-accent"
                                            >
                                                <LuTrash2 className="h-4 w-4" />
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <aside className="flex h-fit flex-col gap-6 rounded-3xl border border-border/60 bg-card/95 p-8 shadow-soft">
                            <div className="space-y-3">
                                <h2 className="text-xl font-semibold text-foreground">Resumen</h2>
                                <p className="text-sm text-muted-foreground">
                                    Revisa tu selección antes de continuar al pago.
                                </p>
                            </div>

                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center justify-between">
                                    <span>Productos</span>
                                    <span>{cartTotals.quantity}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Total estimado</span>
                                    <span className="text-lg font-semibold text-primary">
                                        Bs {cartTotals.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {checkoutError && (
                                <div className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                                    {checkoutError}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={handleFinalizePurchase}
                                disabled={!hasItems || isSubmitting}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <LuWallet className="h-4 w-4" />
                                {isSubmitting ? 'Procesando...' : 'Finalizar compra'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/catalog')}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 px-5 py-3 text-sm font-semibold text-foreground/80 transition hover:border-primary/40 hover:text-primary"
                            >
                                Seguir comprando
                            </button>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;
