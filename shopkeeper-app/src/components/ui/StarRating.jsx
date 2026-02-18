import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating, count, size = 14 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            <div className="flex text-yellow-500">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} size={size} fill="currentColor" />
                ))}
                {hasHalfStar && <StarHalf size={size} fill="currentColor" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={`empty-${i}`} size={size} className="text-gray-300" />
                ))}
            </div>
            {count !== undefined && (
                <span className="text-xs text-text-muted">({count})</span>
            )}
        </div>
    );
};

export default StarRating;
