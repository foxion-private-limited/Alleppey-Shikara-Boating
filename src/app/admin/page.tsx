'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Package, ArrowRight, Sparkles } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-forest-900 text-cream-50 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-gold-400 text-xs uppercase tracking-wider font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alleppey Village Shikara Boating</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-cream-50">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-cream-200/80 font-light mt-1">
            Easily update boat prices, promotional offers, and tour packages.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cream-100 hover:bg-white text-forest-950 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
        >
          <span>Live Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Two Clean Management Cards as requested */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Pricing & Offers */}
        <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center mb-5">
              <Tag className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h2 className="font-serif text-xl font-medium text-slate-900 mb-2">
              Pricing
            </h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
              Manage boat prices, active discount offers, and boat passenger capacity.
            </p>
          </div>

          <div>
            <Link
              href="/admin/pricing"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span>Manage Pricing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Packages */}
        <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center mb-5">
              <Package className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h2 className="font-serif text-xl font-medium text-slate-900 mb-2">
              Packages
            </h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
              Manage boating packages, duration routes, pricing, and recommended experiences.
            </p>
          </div>

          <div>
            <Link
              href="/admin/packages"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span>Manage Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
