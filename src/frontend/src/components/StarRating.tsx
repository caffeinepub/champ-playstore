import { Star, StarHalf } from 'lucide-react';
import { ReactElement } from 'react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const stars: ReactElement[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className={`${sizeClasses[size]} fill-brand-accent text-brand-accent`} />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <StarHalf key="half" className={`${sizeClasses[size]} fill-brand-accent text-brand-accent`} />
    );
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className={`${sizeClasses[size]} text-muted-foreground/30`} />
    );
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
}
