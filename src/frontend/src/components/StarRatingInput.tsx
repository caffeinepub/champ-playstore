import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
}

export default function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          onMouseEnter={() => setHoverRating(rating)}
          onMouseLeave={() => setHoverRating(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`h-8 w-8 ${
              rating <= displayRating
                ? 'fill-brand-accent text-brand-accent'
                : 'text-muted-foreground/30'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
