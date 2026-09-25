'use client';

import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit2, Trash2, X, Sparkles, Check, Clock, Users } from 'lucide-react';

interface TourPackage {
  _id?: string;
  name: string;
  duration: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  offerActive: boolean;
  maxPeople: number;
  recommended: boolean;
  active: boolean;
  route?: string;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState<TourPackage | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/packages');
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleCreateNew = () => {
    setEditingPkg({
      name: 'New Shikara Tour',
      duration: '2 Hours',
      description: 'Scenic cruise along calm Kerala backwaters and village canals.',
      price: 1200,
      originalPrice: 1300,
      offerActive: true,
      maxPeople: 6,
      recommended: false,
      active: true,
      route: 'Punnamada Lake → Villages → Paddy Fields → Canals → Refreshment Area',
    });
    setIsNew(true);
  };

  const handleEdit = (pkg: TourPackage) => {
    setEditingPkg({ ...pkg });
    setIsNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;

    try {
      const url = '/api/packages';
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPkg),
      });

      if (res.ok) {
        setMessage({ text: 'Package saved successfully!', type: 'success' });
        setEditingPkg(null);
        setIsNew(false);
        fetchPackages();
      } else {
        setMessage({ text: 'Failed to save package.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Error saving package.', type: 'error' });
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Are you sure you want to delete this package?')) return;
    try {
      const res = await fetch(`/api/packages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ text: 'Package deleted.', type: 'success' });
        fetchPackages();
      }
    } catch (e) {
      setMessage({ text: 'Failed to delete package.', type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-slate-900">
            Boating Packages Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, and update backwater experiences, duration routes, and package pricing.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
        </button>
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

      {/* Editor Modal / Form */}
      {editingPkg && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="font-serif text-xl font-medium text-slate-900">
              {isNew ? 'Create New Package' : `Edit: ${editingPkg.name}`}
            </h2>
            <button
              onClick={() => setEditingPkg(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Package Name
                </label>
                <input
                  type="text"
                  required
                  value={editingPkg.name}
                  onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
                  placeholder="e.g. 3 Hour Backwater Experience"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Duration
                </label>
                <input
                  type="text"
                  required
                  value={editingPkg.duration}
                  onChange={(e) => setEditingPkg({ ...editingPkg, duration: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
                  placeholder="e.g. 3 Hours"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Package Price (₹ Total / Hour)
                </label>
                <input
                  type="number"
                  required
                  value={editingPkg.price}
                  onChange={(e) =>
                    setEditingPkg({ ...editingPkg, price: parseInt(e.target.value, 10) || 0 })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
                  placeholder="1800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Original Price (₹ Optional)
                </label>
                <input
                  type="number"
                  value={editingPkg.originalPrice || ''}
                  onChange={(e) =>
                    setEditingPkg({
                      ...editingPkg,
                      originalPrice: e.target.value ? parseInt(e.target.value, 10) : null,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
                  placeholder="1950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Max People (Capacity)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={editingPkg.maxPeople}
                  onChange={(e) =>
                    setEditingPkg({
                      ...editingPkg,
                      maxPeople: parseInt(e.target.value, 10) || 6,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Route Description / Sequence
              </label>
              <input
                type="text"
                value={editingPkg.route || ''}
                onChange={(e) => setEditingPkg({ ...editingPkg, route: e.target.value })}
                placeholder="e.g. Vembanad Lake → Village + Walking → Paddy Fields → Canals → Refreshment Area"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                rows={2}
                value={editingPkg.description}
                onChange={(e) => setEditingPkg({ ...editingPkg, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingPkg.offerActive}
                  onChange={(e) => setEditingPkg({ ...editingPkg, offerActive: e.target.checked })}
                  className="w-4 h-4 rounded text-forest-700 focus:ring-forest-600"
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                  Offer Active
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingPkg.recommended}
                  onChange={(e) => setEditingPkg({ ...editingPkg, recommended: e.target.checked })}
                  className="w-4 h-4 rounded text-forest-700 focus:ring-forest-600"
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                  Recommended Badge
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingPkg.active}
                  onChange={(e) => setEditingPkg({ ...editingPkg, active: e.target.checked })}
                  className="w-4 h-4 rounded text-forest-700 focus:ring-forest-600"
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                  Active On Website
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingPkg(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
              >
                Save Package
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Packages Cards / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const hasOffer =
            pkg.offerActive && pkg.originalPrice && pkg.originalPrice > pkg.price;
          const percent = hasOffer
            ? Math.round(((pkg.originalPrice! - pkg.price) / pkg.originalPrice!) * 100)
            : 0;

          return (
            <div
              key={pkg._id}
              className={`bg-white rounded-2xl p-6 border shadow-sm flex flex-col justify-between relative transition-all ${
                pkg.recommended ? 'border-forest-800 ring-1 ring-forest-800/10' : 'border-slate-200/80'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-3 left-6 inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-forest-800 text-gold-300 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>RECOMMENDED</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mt-1 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-forest-700">
                    {pkg.duration}
                  </span>
                  <span
                    className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      pkg.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {pkg.active ? 'Active' : 'Hidden'}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-slate-900 mb-2">
                  {pkg.name}
                </h3>

                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="font-serif text-3xl font-semibold text-slate-900">
                    ₹{pkg.price}
                  </span>
                  <span className="text-xs text-slate-500">
                    {pkg.duration.toLowerCase().includes('custom') ? '/ hour' : 'ride'}
                  </span>

                  {hasOffer && (
                    <div className="flex items-center space-x-1.5 ml-2">
                      <span className="text-xs text-slate-400 line-through">
                        ₹{pkg.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {percent}% OFF
                      </span>
                    </div>
                  )}
                </div>

                <div className="inline-flex items-center space-x-1 text-xs text-slate-500 mb-3">
                  <Users className="w-3.5 h-3.5" />
                  <span>Up to {pkg.maxPeople} guests</span>
                </div>

                {pkg.route && (
                  <p className="text-xs text-forest-800 font-medium mb-3 bg-forest-50 p-2.5 rounded-xl border border-forest-100">
                    {pkg.route}
                  </p>
                )}

                <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">
                  {pkg.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-forest-800 hover:bg-slate-100 transition-colors"
                  title="Edit Package"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                  title="Delete Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
