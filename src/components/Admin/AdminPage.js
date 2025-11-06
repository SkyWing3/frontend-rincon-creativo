import React, { useContext } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { AuthContext } from '../../context/AuthContext';

const AdminPage = () => {
    const { user } = useContext(AuthContext);
    const role = user?.role;
    const isAdmin = role && role !== 'client';
    const isClient = role === 'client';

    if (isAdmin) {
        return (
            <div className="bg-background py-16 text-foreground">
                <div className="container">
                    <AdminDashboard />
                </div>
            </div>
        );
    }

    if (isClient) {
        return (
            <div className="bg-background py-20 text-foreground">
                <div className="container flex flex-col items-center gap-6 rounded-3xl border border-border/60 bg-card/95 p-12 text-center shadow-soft">
                    <h2 className="text-3xl font-semibold text-foreground">Acceso restringido</h2>
                    <p className="max-w-xl text-sm text-muted-foreground">
                        Tu cuenta actual no tiene permisos de administrador. Cierra sesión e ingresa con un usuario autorizado para acceder al panel administrativo.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background py-16 text-foreground">
            <div className="container">
                <AdminLogin />
            </div>
        </div>
    );
};

export default AdminPage;
