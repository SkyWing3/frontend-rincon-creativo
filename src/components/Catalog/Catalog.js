
import React, { useState, useEffect, useMemo } from 'react';
import { LuShoppingCart, LuSlidersHorizontal, LuSearch } from 'react-icons/lu';
import catalogService from '../../services/catalogService';

const Catalog = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCatalogData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    catalogService.getProducts(),
                    catalogService.getCategories(),
                ]);

                const normalizedProducts = productsResponse.map((product) => {
                    const numericPrice = Number(product?.precio ?? product?.price ?? 0);
                    const parsedPrice = Number.isNaN(numericPrice) ? 0 : numericPrice;
                    const categoryId = product?.category_id ?? product?.category?.id ?? null;
                    const categoryName =
                        product?.category?.nombre ||
                        product?.category?.name ||
                        product?.category_name ||
                        '';

                    return {
                        id: product.id,
                        name: product.nombre || product.name || `Producto ${product.id}`,
                        description: product.descripcion || product.description || 'Sin descripción disponible.',
                        price: parsedPrice,
                        image:
                            product.imagen_url ||
                            product.image_url ||
                            product.image ||
                            'https://via.placeholder.com/300x300.png?text=Producto',
                        categoryId,
                        categoryName,
                        raw: product,
                    };
                });

                const normalizedCategories = categoriesResponse.map((categoryRecord) => ({
                    id: categoryRecord.id,
                    name: categoryRecord.nombre || categoryRecord.name || `Categoría ${categoryRecord.id}`,
                }));

                setProducts(normalizedProducts);
                setFilteredProducts(normalizedProducts);
                setCategories(normalizedCategories);
            } catch (err) {
                console.error(err);
                setError('No se pudieron cargar los productos. Intenta nuevamente.');
                setProducts([]);
                setFilteredProducts([]);
                setCategories([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCatalogData();
    }, []);

    useEffect(() => {
        let result = [...products];

        if (category !== 'all') {
            result = result.filter(
                (product) => String(product.categoryId) === String(category)
            );
        }

        const normalizedSearch = searchTerm.trim().toLowerCase();
        if (normalizedSearch) {
            result = result.filter((product) => {
                const haystack = `${product.name} ${product.description ?? ''}`.toLowerCase();
                return haystack.includes(normalizedSearch);
            });
        }

        result.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            }
            return b.price - a.price;
        });

        setFilteredProducts(result);
    }, [category, searchTerm, sortOrder, products]);

    const categoryOptions = useMemo(
        () => [{ id: 'all', name: 'Todos' }, ...categories],
        [categories],
    );

    return (
        <div className="min-h-screen bg-background text-foreground">
            <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16">
                <div className="container space-y-4">
                    <h2 className="text-3xl font-semibold md:text-4xl">Catálogo de productos</h2>
                    <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                        Explora nuestra colección completa de artesanías bolivianas. Filtra por categoría,
                        busca por nombre y ordena para encontrar la pieza perfecta.
                    </p>
                </div>
            </section>

            <section className="container py-12">
                <div className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-card/90 p-6 shadow-sm md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap gap-2">
                            {categoryOptions.map((categoryOption) => {
                                const isActive = category === categoryOption.id;
                                return (
                                    <button
                                        key={categoryOption.id}
                                        type="button"
                                        onClick={() => setCategory(categoryOption.id)}
                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                            isActive
                                                ? 'border-primary bg-primary text-primary-foreground shadow-soft'
                                                : 'border-border/80 bg-card text-foreground/80 hover:border-primary/40 hover:text-primary'
                                        }`}
                                    >
                                        {categoryOption.name}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <div className="relative w-full md:w-64">
                                <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre..."
                                    className="w-full rounded-full border border-border/70 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-foreground/80 shadow-sm transition placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-900/60"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3 py-2 shadow-sm transition focus-within:border-primary dark:bg-slate-900/60">
                                <LuSlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                                <select
                                    className="bg-transparent text-sm text-foreground/80 outline-none"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="asc">Precio: menor a mayor</option>
                                    <option value="desc">Precio: mayor a menor</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>
                            Mostrando {filteredProducts.length}{' '}
                            {filteredProducts.length === 1 ? 'producto' : 'productos'}
                        </p>
                        {category !== 'all' && (
                            <button
                                type="button"
                                onClick={() => setCategory('all')}
                                className="text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:text-primary/80"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading && (
                        <div className="col-span-full rounded-3xl border border-border/60 bg-card/90 p-10 text-center text-muted-foreground">
                            Cargando productos...
                        </div>
                    )}
                    {error && !isLoading && (
                        <div className="col-span-full rounded-3xl border border-accent/40 bg-accent/10 p-10 text-center text-accent">
                            {error}
                        </div>
                    )}
                    {!isLoading && !error && filteredProducts.length === 0 && (
                        <div className="col-span-full rounded-3xl border border-border/60 bg-card/90 p-10 text-center text-muted-foreground">
                            No se encontraron productos con los filtros aplicados.
                        </div>
                    )}
                    {!isLoading &&
                        !error &&
                        filteredProducts.map((product) => (
                            <article
                                key={product.id}
                                className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/90 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                            >
                                <div className="relative h-56 w-full overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                                    />
                                    {product.categoryName && (
                                        <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground shadow-soft">
                                            {product.categoryName}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col gap-4 p-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                                        <p
                                            className="mt-2 text-sm text-muted-foreground"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-lg font-semibold text-primary">
                                            Bs {Number(product.price).toFixed(2)}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => onAddToCart(product)}
                                            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
                                        >
                                            <LuShoppingCart className="h-4 w-4" />
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default Catalog;
