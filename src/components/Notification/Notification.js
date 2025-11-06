import React, { useEffect } from 'react';

const TYPE_STYLES = {
  success: 'border-emerald-400/50 bg-emerald-500/10 text-emerald-600',
  error: 'border-rose-400/50 bg-rose-500/10 text-rose-600',
  warning: 'border-amber-400/50 bg-amber-500/10 text-amber-600',
  info: 'border-primary/40 bg-primary/10 text-primary',
};

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const style = TYPE_STYLES[type] || TYPE_STYLES.info;

  return (
    <div className="pointer-events-none fixed right-4 top-24 z-50 flex flex-col gap-2">
      <div className={`pointer-events-auto flex min-w-[260px] items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur ${style}`}>
        <span className="font-semibold">Notificación</span>
        <p className="text-xs text-foreground/70">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
