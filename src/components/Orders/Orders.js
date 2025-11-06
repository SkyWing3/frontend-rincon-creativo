
import React, { useEffect, useMemo, useState } from 'react';
import { LuChevronRight, LuPackage, LuX } from 'react-icons/lu';
import OrderDetail from '../OrderDetail/OrderDetail';

const translateStatus = (status) => {
  if (!status) {
    return 'Desconocido';
  }

  const normalized = status.toLowerCase();
  switch (normalized) {
    case 'delivered':
    case 'completed':
      return 'Entregado';
    case 'pending':
    case 'processing':
      return 'Pendiente';
    case 'cancelled':
    case 'canceled':
      return 'Cancelado';
    default:
      return status;
  }
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) {
    return 'Bs 0.00';
  }

  const value = typeof amount === 'number' ? amount : parseFloat(amount);
  if (Number.isNaN(value)) {
    return `Bs ${amount}`;
  }

  return `Bs ${value.toFixed(2)}`;
};

const formatDate = (isoString) => {
  if (!isoString) {
    return 'Fecha no disponible';
  }

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return date.toLocaleDateString('es-BO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const STATUS_STYLES = {
  delivered: 'bg-emerald-500/10 text-emerald-600',
  completed: 'bg-emerald-500/10 text-emerald-600',
  pending: 'bg-amber-500/10 text-amber-600',
  processing: 'bg-amber-500/10 text-amber-600',
  cancelled: 'bg-rose-500/10 text-rose-600',
  canceled: 'bg-rose-500/10 text-rose-600',
};

const Orders = ({ show, onClose, orders = [] }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const safeOrders = useMemo(() => (Array.isArray(orders) ? orders : []), [orders]);

  useEffect(() => {
    if (!show) {
      setSelectedOrder(null);
    }
  }, [show]);

  useEffect(() => {
    setSelectedOrder(null);
  }, [safeOrders]);

  if (!show) {
    return null;
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  const renderStatusBadge = (status) => {
    if (!status) {
      return <span className="rounded-full bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground">Desconocido</span>;
    }
    const normalized = status.toLowerCase();
    const style = STATUS_STYLES[normalized] || 'bg-muted/60 text-muted-foreground';
    return (
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
        {translateStatus(status)}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
      <div className="relative w-full max-w-4xl rounded-3xl border border-border/60 bg-card/98 p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LuPackage className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Mis pedidos</h2>
              <p className="text-sm text-muted-foreground">
                {safeOrders.length === 0 ? 'Aún no realizaste compras' : `Historial de ${safeOrders.length} pedidos`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition hover:border-accent/40 hover:text-accent"
            aria-label="Cerrar"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        {selectedOrder ? (
          <OrderDetail order={selectedOrder} onBack={handleBack} />
        ) : (
          <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
            {safeOrders.length === 0 ? (
              <div className="rounded-3xl border border-border/60 bg-muted/30 px-6 py-10 text-center text-muted-foreground">
                No tienes pedidos registrados todavía.
              </div>
            ) : (
              <div className="space-y-4">
                {safeOrders.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => handleOrderClick(order)}
                    className="flex w-full items-center justify-between gap-4 rounded-3xl border border-border/60 bg-card/95 px-5 py-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        Pedido #{order.id}
                      </p>
                      <p className="text-xs text-muted-foreground">Fecha: {formatDate(order.created_at)}</p>
                      <p className="text-xs text-muted-foreground">Total: {formatCurrency(order.total_amount)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {renderStatusBadge(order.state)}
                      <LuChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
