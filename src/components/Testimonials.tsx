'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  PenLine,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageSquareQuote,
  Compass,
} from 'lucide-react';

export interface Review {
  _id: string;
  name: string;
  review: string;
  rating?: number | null;
  status?: string;
  isHistorical?: boolean;
  createdAt: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formReview, setFormReview] = useState('');
  const [formRating, setFormRating] = useState<number | null>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Fetch approved reviews from database API
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.warn('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Client-side validations
    const trimmedName = formName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setFormError('Please enter your name (minimum 2 characters).');
      return;
    }
    if (trimmedName.length > 100) {
      setFormError('Name must be 100 characters or fewer.');
      return;
    }

    const trimmedReview = formReview.trim();
    if (!trimmedReview || trimmedReview.length < 10) {
      setFormError('Please write a review of at least 10 characters.');
      return;
    }
    if (trimmedReview.length > 2000) {
      setFormError('Review must be 2000 characters or fewer.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          review: trimmedReview,
          rating: formRating,
          website: honeypot, // Honeypot trap
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setFormError(result.error || 'Failed to submit review. Please try again.');
        return;
      }

      setFormSuccess(
        result.message ||
          'Thank you for your feedback! Your review has been submitted for moderation.'
      );
      setFormName('');
      setFormReview('');
      setFormRating(5);
    } catch (err) {
      setFormError('An unexpected error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-cream-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-forest-700 mb-3 block">
              Guest Reflections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight">
              Loved by Travelers
            </h2>
            <p className="text-base sm:text-lg text-earth-800 font-light mt-3 leading-relaxed">
              Authentic stories and experiences from guests who explored Kerala&apos;s quiet village
              canals and serene backwaters with us.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <PenLine className="w-4 h-4 text-gold-400" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white p-8 rounded-2xl border border-forest-900/10 h-72 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-4 bg-forest-100 rounded w-24" />
                  <div className="h-3 bg-forest-50 rounded w-full" />
                  <div className="h-3 bg-forest-50 rounded w-5/6" />
                  <div className="h-3 bg-forest-50 rounded w-4/6" />
                </div>
                <div className="h-10 bg-forest-50 rounded w-1/2 pt-4" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-forest-900/10 p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-forest-800 mb-4">
              <MessageSquareQuote className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-forest-950 font-normal mb-2">No reviews yet</h3>
            <p className="text-sm text-earth-700 font-light mb-6">
              Be the first to share your experience aboard our Alleppey shikara boat.
            </p>
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
            >
              <PenLine className="w-4 h-4 text-gold-400" />
              <span>Write the First Review</span>
            </button>
          </div>
        ) : (
          /* Real Reviews Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {reviews.map((item) => (
              <div
                key={item._id}
                className="bg-white p-7 sm:p-8 rounded-2xl sm:rounded-3xl border border-forest-900/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
              >
                <div>
                  {/* Rating Stars (only shown if reviewer provided a rating) */}
                  {item.rating ? (
                    <div className="flex items-center space-x-1 mb-4 text-gold-500">
                      {[...Array(item.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  ) : (
                    <div className="inline-flex items-center space-x-1.5 text-forest-700/80 text-xs font-medium uppercase tracking-wider mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                      <span>Verified Guest</span>
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-earth-800 leading-relaxed font-light mb-6 whitespace-pre-line">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Footer with Name and Date */}
                <div className="pt-4 border-t border-forest-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-forest-950">{item.name}</h4>
                    {item.createdAt && (
                      <p className="text-xs text-earth-600 font-light mt-0.5">
                        {formatDate(item.createdAt)}
                      </p>
                    )}
                  </div>
                  <Quote className="w-6 h-6 text-forest-200 stroke-[1.5] group-hover:text-forest-300 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-forest-950/65 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-title"
            className="relative w-full max-w-lg bg-cream-50 rounded-2xl sm:rounded-3xl shadow-2xl border border-forest-900/10 overflow-hidden z-10 my-6 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Top Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-forest-800 via-gold-400 to-forest-800" />

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="relative pb-5 border-b border-forest-900/10">
                <button
                  onClick={handleCloseModal}
                  className="absolute -top-1 -right-1 sm:top-0 sm:right-0 p-2 rounded-full text-forest-800/60 hover:text-forest-950 hover:bg-forest-900/5 transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-900/5 border border-forest-900/10 text-forest-800 text-[11px] font-semibold uppercase tracking-widest mb-2.5">
                  <Compass className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Guest Feedback</span>
                </div>

                <h3
                  id="write-review-title"
                  className="font-serif text-2xl sm:text-3xl text-forest-950 font-normal tracking-tight"
                >
                  Share Your Experience
                </h3>
                <p className="text-xs sm:text-sm text-earth-700 font-light mt-1.5 leading-relaxed pr-6">
                  Tell us about your backwater voyage. Submitted reviews are reviewed and posted to
                  the website.
                </p>
              </div>

              {/* Status Notifications */}
              {formError && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-medium text-forest-950">
                    Review Submitted!
                  </h4>
                  <p className="text-sm text-earth-700 font-light max-w-sm mx-auto leading-relaxed">
                    {formSuccess}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Review Form */
                <form onSubmit={handleSubmitReview} className="pt-5 space-y-4">
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="review-name"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-forest-900/80 mb-1.5"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      required
                      maxLength={100}
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Rahul & Priya"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-forest-900/15 bg-white text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700/20 focus:border-forest-700 transition-colors shadow-xs"
                    />
                  </div>

                  {/* Rating Field (Optional 1-5 Stars) */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-forest-900/80 mb-1.5">
                      Rating (Optional)
                    </label>
                    <div className="flex items-center space-x-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled =
                          hoverRating !== null ? star <= hoverRating : formRating && star <= formRating;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setFormRating((prev) => (prev === star ? null : star))
                            }
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="p-1 text-gold-400 hover:scale-110 transition-transform focus:outline-none"
                            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          >
                            <Star
                              className={`w-6 h-6 ${
                                isFilled ? 'fill-gold-400 text-gold-400' : 'text-earth-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs text-earth-600 ml-2 font-light">
                        {formRating ? `${formRating} out of 5 stars` : 'No rating selected'}
                      </span>
                    </div>
                  </div>

                  {/* Review Textarea */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="review-text"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-forest-900/80"
                      >
                        Your Review <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-earth-500">
                        {formReview.length}/2000 characters
                      </span>
                    </div>
                    <textarea
                      id="review-text"
                      required
                      rows={4}
                      maxLength={2000}
                      value={formReview}
                      onChange={(e) => setFormReview(e.target.value)}
                      placeholder="Share details about the boat ride, the views, the captain, or the quiet canals..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-forest-900/15 bg-white text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700/20 focus:border-forest-700 transition-colors resize-none placeholder:text-earth-400 shadow-xs"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-5 py-2.5 rounded-full text-forest-800 text-xs font-semibold hover:bg-forest-900/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-50 active:scale-[0.99]"
                    >
                      {submitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <PenLine className="w-3.5 h-3.5 text-gold-400" />
                          <span>Submit Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
