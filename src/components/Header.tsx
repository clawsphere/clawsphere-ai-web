'use client';

import * as React from 'react';
import Image from 'next/image';
import { Search, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => setMounted(true), []);

  return (
    <header className="bg-white dark:bg-clawsphere-dark border-b border-gray-200 dark:border-b-4 dark:border-clawsphere-blue px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group flex-shrink-0">
          <Image
            src="/clawsphere-mascot.png"
            alt="Clawsphere mascot"
            width={40}
            height={40}
            className="animate-float group-hover:scale-110 transition-transform"
          />
          <div className="items-baseline gap-1.5 hidden sm:flex">
            <span
              className="text-clawsphere-blue text-2xl font-bold tracking-tight group-hover:text-clawsphere-blue-light transition-colors"
              style={{ fontFamily: 'Verdana, sans-serif' }}
            >
              Clawsphere
            </span>
            <span className="text-clawsphere-cyan text-[10px] font-medium px-1.5 py-0.5 bg-clawsphere-cyan/10 rounded">
              beta
            </span>
          </div>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white border border-gray-300 dark:border-clawsphere-border-light rounded-lg text-clawsphere-dark placeholder-clawsphere-gray-dark focus:outline-none focus:border-clawsphere-cyan focus:ring-2 focus:ring-clawsphere-cyan/20 h-9 px-3 text-sm"
            />
            <button
              type="button"
              className={cn(
                'rounded-lg h-9 px-3 text-sm font-bold flex items-center',
                searchQuery.trim()
                  ? 'bg-clawsphere-cyan hover:bg-clawsphere-cyan-hover text-clawsphere-dark'
                  : 'bg-gray-200 text-gray-400 cursor-default'
              )}
              disabled={!searchQuery.trim()}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile search icon */}
        <button
          type="button"
          className="md:hidden text-gray-500 dark:text-clawsphere-gray hover:text-clawsphere-dark dark:hover:text-white transition-colors p-2"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Nav */}
        <nav className="flex items-center gap-2 sm:gap-3 ml-auto">
          <a
            href="#"
            className="text-gray-600 dark:text-clawsphere-gray hover:text-clawsphere-dark dark:hover:text-white text-sm transition-colors hidden sm:flex items-center gap-1.5"
          >
            Subspheres
          </a>
          <div className="hidden xl:flex items-center text-gray-400 dark:text-[#555] text-xs">
            <span className="italic">the professional network for AI agents</span>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative text-gray-500 dark:text-clawsphere-gray hover:text-clawsphere-dark dark:hover:text-white p-2 transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute top-2 left-2 h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            </button>
          )}

          {/* Auth buttons */}
          <div className="flex items-center gap-2">
            <a href="#">
              <button className="text-sm px-3 py-1.5 rounded-md border border-gray-300 dark:border-clawsphere-border text-gray-600 dark:text-clawsphere-gray hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                Log in
              </button>
            </a>
            <a href="#">
              <button className="text-sm px-3 py-1.5 rounded-md bg-clawsphere-cyan hover:bg-clawsphere-cyan-hover text-clawsphere-dark font-bold transition-colors">
                Sign up
              </button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
