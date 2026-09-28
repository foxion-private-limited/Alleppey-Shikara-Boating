'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquareQuote,
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  Clock,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Filter,
} from 'lucide-react';

interface ReviewItem {
  _id: string;
  name: string;
  review: string;
  rating?: number | null;
  status: 'pending' | 'approved' | 'rejected';
  historicalId?: string | null;
  isHistorical?: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/reviews?all=true');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      } else {
        setMessage({ text: 'Failed to load reviews. Are you logged in?', type: 'error' });
      }
    } catch (e) {
      setMessage({ text: 'Error connecting to reviews API', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    try {
      setActionInProgress(id);
      const res = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setReviews((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: updated.status } : r))
        );
        setMessage({
          text: `Review marked as ${newStatus}.`,
          type: 'success',
        });
      } else {
        setMessage({ text: 'Failed to update review status.', type: 'error' });
      }
    } catch (e) {
      setMessage({ text: 'Error updating review.', type: 'error' });
    } finally {
      setActionInProgress(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this review?')) return;

    try {
      setActionInProgress(id);
      const res = await fetch(`/api/reviews?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
        setMessage({ text: 'Review permanently deleted.', type: 'success' });
      } else {
        setMessage({ text: 'Failed to delete review.', type: 'error' });
      }
    } catch (e) {
      setMessage({ text: 'Error deleting review.', type: 'error' });
    } finally {
      setActionInProgress(null);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const rejectedCount = reviews.filter((r) => r.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-forest-900 text-cream-50 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-gold-400 text-xs uppercase tracking-wider font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Feedback & Trust</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-cream-50">
            Guest Reviews Moderation
          </h1>
          <p className="text-xs sm:text-sm text-cream-200/80 font-light mt-1">
            Review public guest testimonials before they appear live on the homepage.
          </p>
        </div>

        <button
          onClick={fetchReviews}
          disabled={loading}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-cream-100 hover:bg-white text-forest-950 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center justify-between shadow-sm animate-in fade-in duration-200 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-red-50 text-red-900 border border-red-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-xs underline ml-4 hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === 'all'
              ? 'bg-white border-forest-800 shadow-md ring-1 ring-forest-800'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-serif font-semibold text-slate-900 mt-1">{reviews.length}</p>
        </button>

        <button
          onClick={() => setStatusFilter('pending')}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === 'pending'
              ? 'bg-amber-50/80 border-amber-600 shadow-md ring-1 ring-amber-600'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wider flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </p>
          <p className="text-2xl font-serif font-semibold text-amber-900 mt-1">{pendingCount}</p>
        </button>

        <button
          onClick={() => setStatusFilter('approved')}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === 'approved'
              ? 'bg-emerald-50/80 border-emerald-600 shadow-md ring-1 ring-emerald-600'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Live on Site</span>
          </p>
          <p className="text-2xl font-serif font-semibold text-emerald-900 mt-1">{approvedCount}</p>
        </button>

        <button
          onClick={() => setStatusFilter('rejected')}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === 'rejected'
              ? 'bg-red-50/80 border-red-600 shadow-md ring-1 ring-red-600'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <p className="text-xs font-medium text-red-700 uppercase tracking-wider flex items-center space-x-1">
            <XCircle className="w-3 h-3" />
            <span>Rejected</span>
          </p>
          <p className="text-2xl font-serif font-semibold text-red-900 mt-1">{rejectedCount}</p>
        </button>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <h2 className="font-serif text-lg font-medium text-slate-900">
              {statusFilter === 'all'
                ? 'All Reviews'
                : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Reviews`}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
              {filteredReviews.length}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest-800 mb-2" />
            <span>Loading reviews from database...</span>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <MessageSquareQuote className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p>No reviews found matching this filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredReviews.map((item) => (
              <div
                key={item._id}
                className="p-5 sm:p-6 hover:bg-slate-50/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-3xl">
                  {/* Header info */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900 text-base">{item.name}</h3>

                    {/* Rating stars if available */}
                    {item.rating && (
                      <div className="flex items-center space-x-0.5 text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    )}

                    {/* Status Pill */}
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        item.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* Historical tag */}
                    {item.isHistorical && (
                      <span className="text-[10px] uppercase font-medium tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        Migrated Review
                      </span>
                    )}

                    <span className="text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Moderation Action Buttons */}
                <div className="flex items-center space-x-2 flex-shrink-0 pt-2 lg:pt-0">
                  {item.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(item._id, 'approved')}
                      disabled={actionInProgress === item._id}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
                      title="Approve and show on live site"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {item.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(item._id, 'rejected')}
                      disabled={actionInProgress === item._id}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors shadow-xs"
                      title="Reject review"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={actionInProgress === item._id}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete review permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
