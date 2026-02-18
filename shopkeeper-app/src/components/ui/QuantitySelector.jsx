import { Minus, Plus } from "lucide-react";
import { Button } from "./Button";

const QuantitySelector = ({ quantity, setQuantity, min = 1, max }) => {
    const decrease = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantity > min) setQuantity(quantity - 1);
    };

    const increase = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!max || quantity < max) setQuantity(quantity + 1);
    };

    return (
        <div className="flex items-center border border-border rounded-lg h-8 bg-white" onClick={(e) => e.preventDefault()}>
            <button
                onClick={decrease}
                disabled={quantity <= min}
                className="px-2 h-full text-text-muted hover:text-navy disabled:opacity-30 transition-colors"
            >
                <Minus size={14} />
            </button>

            <span className="w-8 text-center text-sm font-medium text-navy">{quantity}</span>

            <button
                onClick={increase}
                disabled={max && quantity >= max}
                className="px-2 h-full text-text-muted hover:text-navy disabled:opacity-30 transition-colors"
            >
                <Plus size={14} />
            </button>
        </div>
    );
};

export default QuantitySelector;
