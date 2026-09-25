'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Save, Sparkles, Check, X, Users, AlertCircle } from 'lucide-react';

interface PricingData {
  name: string;
  currentPrice: number;
  originalPrice: number | null;
  offerActive: boolean;
  capacity: number;
  description: string;
}

export default function AdminPricingPage() {
  const [pricing, setPricing] = useState<PricingData>({
    name: 'Standard Shikara',
    currentPrice: 600,
    originalPrice: 650,
    offerActive: true,
    capacity: 6,
    description:
      'One boat · Up to 6 people. Rates are for the entire private Shikara boat. Price may vary depending on the boat and group requirements.',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch('/api/pricing')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setPricing({
            name: data.name || 'Standard Shikara',
            currentPrice: data.currentPrice ?? 600,
            originalPrice: data.originalPrice ?? 650,
            offerActive: Boolean(data.offerActive),
            capacity: data.capacity ?? 6,
            description: data.description || '',
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricing),
      });

      if (res.ok) {
        setMessage({ text: 'Pricing changes saved successfully!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to save changes.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Error connecting to database.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Automatic discount calculation
  const hasOffer =
    pricing.offerActive &&
    pricing.originalPrice &&
    pricing.originalPrice > pricing.currentPrice;

  const discountPercentage = hasOffer
    ? Math.round(((pricing.originalPrice! - pricing.currentPrice) / pricing.originalPrice!) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-slate-900">
          Standard Shikara Pricing &amp; Offers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update the base hourly rate, group capacity, and active promotional discounts.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-medium flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Editor Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Boat / Experience Name
              </label>
              <input
                type="text"
                required
                value={pricing.name}
                onChange={(e) => setPricing({ ...pricing, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Boat Passenger Capacity (Max People)
              </label>
              <input
                type="number"
                min="1"
                required
                value={pricing.capacity}
                onChange={(e) =>
                  setPricing({ ...pricing, capacity: parseInt(e.target.value, 10) || 6 })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Current Price (₹ / hour)
              </label>
              <input
                type="number"
                min="0"
                required
                value={pricing.currentPrice}
                onChange={(e) =>
                  setPricing({ ...pricing, currentPrice: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Original Price (₹ / hour Optional)
              </label>
              <input
                type="number"
                min="0"
                value={pricing.originalPrice || ''}
                onChange={(e) =>
                  setPricing({
                    ...pricing,
                    originalPrice: e.target.value ? parseInt(e.target.value, 10) : null,
                  })
                }
                placeholder="650"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
              />
            </div>
          </div>

          {/* Offer Active Switch */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 block">
                Promotional Offer
              </span>
              <span className="text-xs text-slate-500">
                When active, displays original crossed-out price with auto-calculated discount percentage.
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pricing.offerActive}
                onChange={(e) => setPricing({ ...pricing, offerActive: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-800"></div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Short Description / Pricing Clarification
            </label>
            <textarea
              rows={2}
              value={pricing.description}
              onChange={(e) => setPricing({ ...pricing, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>

        {/* Live Website Display Preview */}
        <div className="pt-6 border-t border-slate-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-3">
            Live Public Website Display Preview:
          </span>

          <div className="max-w-sm bg-cream-50 p-6 rounded-2xl border border-forest-900/10 shadow-sm">
            <h3 className="font-serif text-lg font-medium text-forest-950 mb-1">
              {pricing.name}
            </h3>

            <div className="inline-flex items-center space-x-1.5 text-xs text-forest-700 font-semibold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Up to {pricing.capacity} People (One Boat)</span>
            </div>

            <div className="flex items-baseline space-x-2 mb-2">
              <span className="font-serif text-3xl font-semibold text-forest-950">
                ₹{pricing.currentPrice}
              </span>
              <span className="text-xs text-earth-700 font-medium">/ hour</span>

              {hasOffer && (
                <div className="flex items-center space-x-2 ml-2">
                  <span className="text-sm text-earth-500 line-through">
                    ₹{pricing.originalPrice}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    {discountPercentage}% OFF
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-earth-700 font-light leading-relaxed">
              {pricing.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
