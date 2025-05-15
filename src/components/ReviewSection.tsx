import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Review } from '../types';

interface ReviewSectionProps {
  teaId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ teaId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadReviews();
    checkUser();
  }, [teaId]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:user_id (
          email
        )
      `)
      .eq('tea_id', teaId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading reviews:', error);
      return;
    }

    setReviews(data.map(review => ({
      id: review.id,
      userId: review.user_id,
      teaId: review.tea_id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.created_at,
      user: review.user
    })));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in to leave a review');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const { error } = await supabase
      .from('reviews')
      .upsert({
        user_id: user.id,
        tea_id: teaId,
        rating: newReview.rating,
        comment: newReview.comment
      });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    setNewReview({ rating: 5, comment: '' });
    loadReviews();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      {user && (
        <form onSubmit={handleSubmitReview} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newReview.rating
                        ? 'text-amber-500 fill-current'
                        : 'text-amber-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={3}
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-amber-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-amber-500 fill-current'
                          : 'text-amber-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-amber-600">
                  {review.user?.email}
                </span>
              </div>
              <span className="text-xs text-amber-500">
                {format(new Date(review.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
            <p className="text-amber-800 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>

      {!user && (
        <p className="text-center text-amber-600 text-sm">
          Please sign in to leave a review
        </p>
      )}
    </div>
  );
};

export default ReviewSection;