'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  Tag,
  Package,
  LogOut,
  ExternalLink,
  Menu,
  X,
  LayoutDashboard,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Pricing & Offers', href: '/admin/pricing', icon: Tag },
  { label: 'Packages', href: '/admin/packages', icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render children directly without admin shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      {/* Mobile Header */}
      <header className="md:hidden bg-forest-950 text-cream-50 px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-forest-900">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-gold-400" />
          <span className="font-serif text-sm font-semibold">Alleppey Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg text-cream-100 hover:bg-forest-900"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-30 w-64 bg-forest-950 text-cream-100 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-forest-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-forest-800 text-gold-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-base font-semibold text-cream-50 leading-tight">
                Alleppey Boating
              </h1>
              <span className="text-[11px] text-cream-200/60 uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Simplified Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-forest-800 text-gold-300 shadow-sm'
                    : 'text-cream-200/80 hover:bg-forest-900 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-cream-300/70'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-forest-900/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-cream-200/80 hover:bg-forest-900 hover:text-white transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
