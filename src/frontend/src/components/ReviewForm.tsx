import { useState } from 'react';
import { useAddReview } from '../hooks/useQueries';
import StarRatingInput from './StarRatingInput';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ReviewFormProps {
  appId: string;
}

export default function ReviewForm({ appId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const addReviewMutation = useAddReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    try {
      await addReviewMutation.mutateAsync({
        appId,
        rating: BigInt(rating),
        comment,
      });

      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Your Rating</label>
            <StarRatingInput value={rating} onChange={setRating} />
          </div>

          <div>
            <label htmlFor="comment" className="mb-2 block text-sm font-medium">
              Your Review
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this app..."
              rows={4}
            />
          </div>

          <Button type="submit" disabled={addReviewMutation.isPending}>
            {addReviewMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
