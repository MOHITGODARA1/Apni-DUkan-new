import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios"; // Will uncomment when API is ready

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load cart from local storage on mount (mock persistence)
    useEffect(() => {
        const savedCart = localStorage.getItem("apni_dukan_cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("apni_dukan_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item._id === product._id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
        // showToast("Added to cart ✓", "success");
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
        // showToast("Removed from cart", "info");
    };

    const updateQty = (productId, newQty) => {
        if (newQty < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === productId ? { ...item, quantity: newQty } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Derived state
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Calculate total with simple logic (price * qty)
    // In a real bulk app, this might check tiers: if qty >= tier.min, use tier.price
    const cartTotal = cartItems.reduce((acc, item) => {
        // Check for bulk pricing logic if available on item
        let unitPrice = item.price;
        if (item.bulkPricing) {
            const tier = item.bulkPricing.find(t => item.quantity >= t.minQty && (t.maxQty === null || item.quantity <= t.maxQty));
            if (tier) unitPrice = tier.price;
        }
        return acc + (unitPrice * item.quantity);
    }, 0);

    const value = {
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
