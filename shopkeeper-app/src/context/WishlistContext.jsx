import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem("apni_dukan_wishlist");
        if (savedWishlist) {
            setWishlistItems(JSON.parse(savedWishlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("apni_dukan_wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        setWishlistItems((prev) => {
            if (!prev.find((item) => item._id === product._id)) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    };

    const isWishlisted = (productId) => {
        return wishlistItems.some((item) => item._id === productId);
    };

    const toggleWishlist = (product) => {
        if (isWishlisted(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    }

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        toggleWishlist
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
