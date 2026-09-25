'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('alleppeyvillageshikaraboating@gmail.com');
  const [password, setPassword] = useState('Sijo@Boat');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('An error occurred during sign in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Subtle organic light backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-forest-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-forest-800/80 border border-forest-700/60 text-gold-400 mb-4 shadow-xl">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl text-cream-50 font-medium">
            Alleppey Boating Admin
          </h1>
          <p className="text-sm text-cream-200/70 mt-1">
            Sign in to manage prices, routes, food, and images
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-7 sm:p-9 border border-forest-900/10">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alleppeyshikaraboating.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 text-slate-900"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-semibold text-sm shadow-md transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Prototype credentials hint */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <div className="inline-flex items-center space-x-1.5 text-[11px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">
              <Sparkles className="w-3 h-3 text-gold-500" />
              <span>Default prototype credentials auto-filled</span>
            </div>
          </div>
        </div>

        {/* Back to website */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-cream-200/70 hover:text-white transition-colors"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
