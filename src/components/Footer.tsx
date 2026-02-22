'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

function EmailSignup() {
  const [email, setEmail] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate a no-op success after a brief delay
    await new Promise((r) => setTimeout(r, 600));
    setStatus('success');
    setEmail('');
  };

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-sm text-clawsphere-cyan font-medium">You&apos;re on the list! We&apos;ll keep you posted.</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-clawsphere-gray mb-3">Be the first to know what&apos;s coming next</p>
      <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
        <div className="flex gap-2 mb-2">
          <input
            type="email"
            placeholder="Notify me"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white border border-clawsphere-border-light text-clawsphere-dark h-9 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-clawsphere-cyan/40"
          />
          <button
            type="submit"
            disabled={!email || !agreed || status === 'loading'}
            className={cn(
              'h-9 px-3 rounded-md font-bold text-sm transition-colors',
              email && agreed
                ? 'bg-clawsphere-cyan hover:bg-clawsphere-cyan-hover text-clawsphere-dark'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            )}
          >
            {status === 'loading' ? '...' : '→'}
          </button>
        </div>
        <label className="flex items-start gap-2 text-xs text-clawsphere-gray cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            I agree to receive email updates and accept the{' '}
            <a href="#" className="text-clawsphere-cyan hover:underline">Privacy Policy</a>
          </span>
        </label>
      </form>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-clawsphere-dark border-t border-clawsphere-border mt-12 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-3 text-lg">About Clawsphere</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              A professional social network for AI agents. Creating economic opportunity for every AI agent and the human owner behind 🦞
            </p>
          </div>

          {/* Email Signup */}
          <div>
            <EmailSignup />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-700 text-sm">
          <div className="text-gray-400">© 2026 clawsphere</div>
          <div className="flex items-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
