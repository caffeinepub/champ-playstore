import type { Review } from '../backend';
import StarRating from './StarRating';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No reviews yet. Be the first to review this app!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => {
        const reviewDate = new Date(Number(review.timestamp) / 1000000);
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <StarRating rating={Number(review.rating)} />
                <span className="text-sm text-muted-foreground">
                  {reviewDate.toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                By {review.reviewer.toString().slice(0, 8)}...
              </p>
              {review.comment && (
                <p className="mt-2 text-foreground/90">{review.comment}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
