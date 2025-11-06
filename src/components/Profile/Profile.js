import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  LuMail,
  LuMapPin,
  LuPencil,
  LuPhone,
  LuSave,
  LuUser,
  LuCircleUser,
  LuX,
  LuBookOpen,
} from 'react-icons/lu';
import Orders from './../Orders/Orders';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';

const DEFAULT_PROFILE_PICTURE = 'https://www.vecteezy.com/png/24983914-simple-user-default-icon';

const normalizeProfileData = (profile) => {
  const data = profile?.data ?? profile ?? {};

  return {
    id: data.id ?? null,
    nombre: data.first_name ?? '',
    apellidoPaterno: data.f_last_name ?? '',
    apellidoMaterno: data.s_last_name ?? '',
    departamento: data.departamento ?? '',
    ciudad: data.city ?? '',
    telefono: data.phone ?? '',
    correo: data.email ?? '',
    direccion: data.address ?? '',
    profilePicture: data.photo_url || DEFAULT_PROFILE_PICTURE,
    createdAt: data.created_at ?? '',
    ordersCount: data.orders_count ?? 0,
    orders: Array.isArray(data.orders) ? data.orders : [],
  };
};

const Profile = () => {
  const { token, user: sessionUser } = useContext(AuthContext);
  const [user, setUser] = useState(() => (sessionUser ? normalizeProfileData(sessionUser) : null));
  const [editedUser, setEditedUser] = useState(() => (sessionUser ? normalizeProfileData(sessionUser) : null));
  const [orders, setOrders] = useState(() => {
    if (!sessionUser) {
      return [];
    }

    const normalized = normalizeProfileData(sessionUser);
    return normalized.orders;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('Debes iniciar sesión para ver tu perfil.');
      setUser(null);
      setEditedUser(null);
      setOrders([]);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.getProfile(token);
        if (!isMounted) {
          return;
        }

        const normalized = normalizeProfileData(response.data);
        setUser(normalized);
        setEditedUser(normalized);
        setOrders(normalized.orders);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        console.error('Error fetching profile', err);
        setError('No se pudo cargar el perfil. Inténtalo nuevamente.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [token]);

  useEffect(() => {
    if (!sessionUser) {
      setUser(null);
      setEditedUser(null);
      setOrders([]);
      return;
    }

    const normalized = normalizeProfileData(sessionUser);
    setUser(normalized);
    setEditedUser(normalized);
    setOrders(normalized.orders);
  }, [sessionUser]);

  const handleEdit = () => {
    if (!user) {
      return;
    }

    setEditedUser(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setEditedUser(user);
    }
  };

  const handleSave = () => {
    if (!editedUser) {
      return;
    }

    setUser(editedUser);
    setIsEditing(false);
    console.log('Saving user data:', editedUser);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const displayedUser = isEditing ? editedUser : user;
  const initials = useMemo(() => {
    if (!displayedUser) {
      return '';
    }
    const firstInitial = displayedUser.nombre?.[0] ?? '';
    const lastInitial = displayedUser.apellidoPaterno?.[0] ?? '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }, [displayedUser]);

  return (
    <div className="bg-background py-16 text-foreground">
      <div className="container space-y-8">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <LuCircleUser className="h-4 w-4" />
            Perfil
          </span>
          <h1 className="text-3xl font-semibold md:text-4xl">Tu espacio personal en Rincón Creativo</h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Administra tus datos de contacto, revisa tu historial de pedidos y mantente al tanto de las novedades de tu comunidad artesana.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_2fr]">
          <aside className="space-y-6 rounded-3xl border border-border/60 bg-card/95 p-8 shadow-soft">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-primary/40 bg-primary/10 shadow-soft">
                {displayedUser?.profilePicture ? (
                  <img
                    src={displayedUser.profilePicture}
                    alt="Foto de perfil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-primary">
                    {initials || <LuUser className="h-10 w-10" />}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {`${displayedUser?.nombre || ''} ${displayedUser?.apellidoPaterno || ''}`.trim() || 'Usuario sin nombre'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {displayedUser?.correo || 'Sin correo disponible'}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-muted/20 p-5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {user?.ordersCount ?? 0} pedidos realizados
              </p>
              <p className="mt-2">
                Mantente al día con tus compras y accede a beneficios exclusivos para miembros.
              </p>
            </div>

            <div className="grid gap-3">
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 px-5 py-3 text-sm font-semibold text-foreground/80 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!user || isEditing}
              >
                <LuPencil className="h-4 w-4" />
                Editar perfil
              </button>
              <button
                type="button"
                onClick={() => setShowOrders(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!orders.length}
              >
                <LuBookOpen className="h-4 w-4" />
                Mis pedidos
              </button>
            </div>
          </aside>

          <section className="space-y-6 rounded-3xl border border-border/60 bg-card/95 p-8 shadow-soft">
            <header className="flex items-center justify-between border-b border-border/50 pb-4">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-foreground">Información de contacto</h2>
                <p className="text-sm text-muted-foreground">
                  Actualiza tus datos para recibir notificaciones y coordinar envíos sin inconvenientes.
                </p>
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm font-medium text-foreground/70 transition hover:border-accent/40 hover:text-accent"
                  >
                    <LuX className="h-4 w-4" />
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
                  >
                    <LuSave className="h-4 w-4" />
                    Guardar
                  </button>
                </div>
              )}
            </header>

            {loading && (
              <p className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                Cargando perfil...
              </p>
            )}

            {error && !loading && (
              <p className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                {error}
              </p>
            )}

            {!loading && !error && displayedUser && (
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Nombre"
                  icon={<LuUser className="h-4 w-4" />}
                  name="nombre"
                  value={displayedUser.nombre}
                  editable={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Apellido paterno"
                  icon={<LuUser className="h-4 w-4" />}
                  name="apellidoPaterno"
                  value={displayedUser.apellidoPaterno}
                  editable={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Apellido materno"
                  icon={<LuUser className="h-4 w-4" />}
                  name="apellidoMaterno"
                  value={displayedUser.apellidoMaterno}
                  editable={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Teléfono"
                  icon={<LuPhone className="h-4 w-4" />}
                  name="telefono"
                  value={displayedUser.telefono}
                  editable={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Departamento"
                  icon={<LuMapPin className="h-4 w-4" />}
                  name="departamento"
                  value={displayedUser.departamento}
                  editable={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Ciudad"
                  icon={<LuMapPin className="h-4 w-4" />}
                  name="ciudad"
                  value={displayedUser.ciudad}
                  editable={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Dirección"
                  icon={<LuMapPin className="h-4 w-4" />}
                  name="direccion"
                  value={displayedUser.direccion}
                  editable={isEditing}
                  onChange={handleInputChange}
                  className="md:col-span-2"
                />
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Correo electrónico</label>
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                    <LuMail className="h-4 w-4" />
                    <span>{displayedUser.correo || 'Sin información'}</span>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <Orders show={showOrders} onClose={() => setShowOrders(false)} orders={orders} />
    </div>
  );
};

const Field = ({ label, icon, name, value, editable, onChange, className = '' }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
    {editable ? (
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 dark:bg-slate-900/70">
        {icon}
        <input
          name={name}
          value={value || ''}
          onChange={onChange}
          className="w-full bg-transparent text-sm text-foreground outline-none"
        />
      </div>
    ) : (
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
        {icon}
        <span>{value || 'Sin información'}</span>
      </div>
    )}
  </div>
);

export default Profile;
