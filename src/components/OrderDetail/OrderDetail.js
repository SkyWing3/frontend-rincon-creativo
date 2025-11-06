import React from 'react';
import { LuArrowLeft, LuPackageCheck } from 'react-icons/lu';

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

const DEFAULT_PRODUCT_IMAGE = 'https://via.placeholder.com/60';

const OrderDetail = ({ order, onBack }) => {
  if (!order) {
    return null;
  }

  const orderDetails = Array.isArray(order.details) ? order.details : [];

  return (
    <div className="mt-6 space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
      >
        <LuArrowLeft className="h-4 w-4" />
        Volver a la lista
      </button>

      <div className="rounded-3xl border border-border/60 bg-muted/20 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LuPackageCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Pedido #{order.id}</h3>
            <p className="text-sm text-muted-foreground">Detalles completos de la compra</p>
          </div>
        </div>
        <dl className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.3em]">Fecha</dt>
            <dd className="font-medium text-foreground">{formatDate(order.created_at)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em]">Total</dt>
            <dd className="font-medium text-primary">{formatCurrency(order.total_amount)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em]">Estado</dt>
            <dd className="font-medium text-foreground">{translateStatus(order.state)}</dd>
          </div>
          {order.global_discount !== undefined && order.global_discount !== null && (
            <div>
              <dt className="text-xs uppercase tracking-[0.3em]">Descuento global</dt>
              <dd className="font-medium text-foreground">{order.global_discount}%</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="space-y-4 rounded-3xl border border-border/60 bg-card/95 p-6">
        <h3 className="text-lg font-semibold text-foreground">Productos</h3>
        {orderDetails.length === 0 ? (
          <p className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
            No se registraron productos para este pedido.
          </p>
        ) : (
          <div className="space-y-4">
            {orderDetails.map((detail) => {
              const subtotal =
                detail.subtotal_price !== undefined ? parseFloat(detail.subtotal_price) : null;
              const quantity = detail.quantity ?? 0;
              const unitPrice =
                detail.product?.price !== undefined && detail.product?.price !== null
                  ? detail.product.price
                  : quantity > 0 && subtotal !== null && !Number.isNaN(subtotal)
                    ? subtotal / quantity
                    : null;

              const productName = detail.product?.name || `Producto #${detail.product_id}`;
              const productImage = detail.product?.image || DEFAULT_PRODUCT_IMAGE;

              return (
                <div
                  key={detail.id}
                  className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card px-4 py-3 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 overflow-hidden rounded-2xl border border-border/60 bg-muted/30">
                      <img src={productImage} alt={productName} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{productName}</p>
                      <p className="text-xs text-muted-foreground">
                        Precio unitario:{' '}
                        {unitPrice !== null && !Number.isNaN(unitPrice)
                          ? formatCurrency(unitPrice)
                          : 'No disponible'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em]">Cantidad</p>
                      <p className="font-medium text-foreground">{quantity}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em]">Subtotal</p>
                      <p className="font-medium text-primary">
                        {subtotal !== null && !Number.isNaN(subtotal)
                          ? formatCurrency(subtotal)
                          : 'No disponible'}
                      </p>
                    </div>
                    {detail.unit_discount ? (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em]">Desc. unitario</p>
                        <p className="font-medium text-foreground">{detail.unit_discount}%</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
