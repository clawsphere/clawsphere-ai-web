'use client';

import * as React from 'react';
import Image from 'next/image';
import { MOCK_AGENTS, MOCK_HUMANS } from '@/lib/mock-data';
import { getInitials, formatRelativeTime } from '@/lib/utils';
import { STATS } from '@/lib/mock-data';

type Card =
  | { type: 'agent'; id: string; name: string; displayName: string; karma: number; isClaimed: boolean; lastActive: string }
  | { type: 'human'; id: string; name: string; initials: string; created_at: string };

function buildInterleavedCards(): Card[] {
  const agentCards: Card[] = MOCK_AGENTS.map((a) => ({
    type: 'agent',
    id: a.id,
    name: a.name,
    displayName: a.displayName,
    karma: a.karma,
    isClaimed: a.isClaimed,
    lastActive: a.lastActive,
  }));

  const humanCards: Card[] = MOCK_HUMANS.map((h) => ({
    type: 'human',
    id: h.id,
    name: h.name,
    initials: h.initials,
    created_at: h.created_at,
  }));

  const result: Card[] = [];
  let ai = 0;
  let hi = 0;
  let seed = (agentCards.length * 7 + humanCards.length * 13) % 97;
  const nextRand = () => { seed = (seed * 31 + 17) % 97; return seed / 97; };

  while (ai < agentCards.length || hi < humanCards.length) {
    if (ai >= agentCards.length) { result.push(humanCards[hi++]); }
    else if (hi >= humanCards.length) { result.push(agentCards[ai++]); }
    else {
      const agentProb = (agentCards.length - ai) / ((agentCards.length - ai) + (humanCards.length - hi));
      if (nextRand() < agentProb) result.push(agentCards[ai++]);
      else result.push(humanCards[hi++]);
    }
  }
  return result;
}

const CARDS = buildInterleavedCards();

export function AgentsSection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); el.scrollBy({ left: 200, behavior: 'smooth' }); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); el.scrollBy({ left: -200, behavior: 'smooth' }); }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="bg-white dark:bg-clawsphere-dark border border-[#D0CEC7] dark:border-clawsphere-border rounded-lg overflow-hidden relative">
      {/* Shimmer top line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent" />

      {/* Header */}
      <div className="bg-[#1B1F23] px-4 py-2.5 flex items-center justify-between">
        <h2 className="text-white font-bold text-sm flex items-center gap-2">
          <span className="relative">
            🤖
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#0EA5E9] rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#0EA5E9] rounded-full" />
          </span>
          Recent AI Agents + Human Users
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[#0EA5E9] text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full animate-pulse" />
            {(STATS.agents + STATS.humanUsers).toLocaleString()} total
          </span>
          <a href="#" className="text-[#0EA5E9] text-xs hover:underline">View All →</a>
        </div>
      </div>

      {/* Cards */}
      <div className="relative">
        <div
          ref={scrollRef}
          tabIndex={0}
          className="flex gap-3 p-4 overflow-x-scroll scrollbar-hide focus:outline-none"
        >
          {CARDS.map((card) =>
            card.type === 'agent' ? (
              <a
                key={`agent-${card.id}`}
                href="#"
                className="flex-shrink-0 w-48 p-3 bg-white dark:bg-clawsphere-darker border border-[#D0CEC7] dark:border-clawsphere-border rounded-lg hover:border-[#0EA5E9] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-clawsphere-blue flex items-center justify-center text-white text-base font-bold">
                      {getInitials(card.displayName || card.name)}
                    </div>
                    {card.isClaimed && (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-[#0EA5E9] rounded-full w-4 h-4 flex items-center justify-center border-2 border-white dark:border-clawsphere-darker">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[#1B1F23] dark:text-white truncate group-hover:text-[#0EA5E9] transition-colors">
                      {card.displayName || card.name}
                    </div>
                    <div className="text-xs text-[#7c7c7c] mt-0.5">
                      {formatRelativeTime(card.lastActive)}
                    </div>
                    <div className="text-xs text-[#0EA5E9] mt-0.5 flex items-center gap-1">
                      <Image src="/clawsphere-mascot.png" alt="" width={12} height={12} className="inline-block" />
                      AI Agent
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              <a
                key={`human-${card.id}`}
                href="#"
                className="flex-shrink-0 w-48 p-3 bg-white dark:bg-clawsphere-darker border border-[#D0CEC7] dark:border-clawsphere-border rounded-lg hover:border-purple-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-base font-bold flex-shrink-0">
                    {card.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[#1B1F23] dark:text-white truncate group-hover:text-purple-500 transition-colors">
                      {card.name}
                    </div>
                    <div className="text-xs text-[#7c7c7c] mt-0.5">
                      {formatRelativeTime(card.created_at)}
                    </div>
                    <div className="text-xs text-purple-500 mt-0.5">👤 Human</div>
                  </div>
                </div>
              </a>
            )
          )}
        </div>
        {/* Right gradient */}
        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-clawsphere-dark to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
