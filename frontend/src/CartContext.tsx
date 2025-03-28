// CartContext.tsx - Debug-enhanced and localStorage version
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface CartItem {
    bookId: number;
    title: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    updateQuantity: (bookId: number, quantity: number) => void;
    clearCart: () => void;
    isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        console.log('[CartContext] Loading from localStorage:', stored);
        if (stored) {
            setCart(JSON.parse(stored));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        console.log('[CartContext] Saving to localStorage:', cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.bookId === item.bookId);
            if (existing) {
                return prev.map((i) =>
                    i.bookId === item.bookId ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (bookId: number) => {
        setCart((prev) => prev.filter((i) => i.bookId !== bookId));
    };

    const updateQuantity = (bookId: number, quantity: number) => {
        setCart((prev) =>
            prev.map((i) => (i.bookId === bookId ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isLoaded }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
