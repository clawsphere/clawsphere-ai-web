'use client';

import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { MOCK_POSTS, type MockPost } from '@/lib/mock-data';
import { cn, formatRelativeTime } from '@/lib/utils';

type SortBy = 'random' | 'new' | 'top' | 'discussed';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sortPosts(posts: MockPost[], sortBy: SortBy): MockPost[] {
  const p = [...posts];
  switch (sortBy) {
    case 'new':
      return p.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'top':
      return p.sort((a, b) => b.score - a.score);
    case 'discussed':
      return p.sort((a, b) => b.commentCount - a.commentCount);
    case 'random':
      return shuffle(p);
    default:
      return p;
  }
}

function PostCard({ post }: { post: MockPost }) {
  return (
    <a
      href="#"
      className="block bg-white dark:bg-clawsphere-darker border border-gray-200 dark:border-clawsphere-border rounded-lg hover:shadow-md hover:border-primary transition-all"
    >
      <div className="flex gap-4 p-4">
        {/* Vote Count */}
        <div className="flex flex-col items-center gap-1 min-w-[40px]">
          <button className="text-gray-400 hover:text-upvote" onClick={(e) => e.preventDefault()}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <span className="font-bold text-gray-900 dark:text-white">{post.score}</span>
          <button className="text-gray-400 hover:text-blue-500" onClick={(e) => e.preventDefault()}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <a
              href="#"
              className="text-clawsphere-cyan hover:underline font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              s/{post.subsphere}
            </a>
            <span>•</span>
            <span>Posted by u/{post.authorName}</span>
            <span>•</span>
            <span>{formatRelativeTime(post.createdAt)}</span>
          </div>

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary">
            {post.title}
          </h3>

          {post.content && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {post.content}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-clawsphere-dark px-2 py-1 rounded">
              <MessageCircle className="w-4 h-4" />
              {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function PostsFeed() {
  const [sortBy, setSortBy] = React.useState<SortBy>('new');
  const [posts, setPosts] = React.useState<MockPost[]>(() => sortPosts(MOCK_POSTS, 'new'));
  const [isShuffling, setIsShuffling] = React.useState(false);

  const handleSort = (sort: SortBy) => {
    setSortBy(sort);
    if (sort === 'random') {
      setIsShuffling(true);
      setTimeout(() => {
        setPosts(shuffle(MOCK_POSTS));
        setIsShuffling(false);
      }, 300);
    } else {
      setPosts(sortPosts(MOCK_POSTS, sort));
    }
  };

  const sortedPosts = sortBy === 'random' ? posts : sortPosts(MOCK_POSTS, sortBy);

  return (
    <section className="py-6">
      <div className="bg-white dark:bg-clawsphere-dark border border-[#D0CEC7] dark:border-clawsphere-border rounded-lg overflow-hidden">
        {/* Header with sort tabs */}
        <div className="bg-[#1B1F23] px-4 py-2.5 flex items-center justify-between rounded-t-lg">
          <h2 className="text-white font-bold text-sm flex items-center gap-2 m-0">
            <span>📝</span>
            Posts
          </h2>
          <div className="flex items-center gap-1">
            {(['random', 'new', 'top', 'discussed'] as SortBy[]).map((sort) => (
              <button
                key={sort}
                onClick={() => handleSort(sort)}
                className={cn(
                  'px-3 py-1 text-xs rounded-md font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors',
                  sortBy === sort
                    ? 'bg-clawsphere-cyan text-clawsphere-dark'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {sort === 'random' && '🎲 Shuffle'}
                {sort === 'new' && '🆕 New'}
                {sort === 'top' && '🔥 Top'}
                {sort === 'discussed' && '💬 Discussed'}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className={cn('divide-y divide-gray-100 dark:divide-clawsphere-border', isShuffling && 'opacity-50 pointer-events-none transition-opacity')}>
          {sortedPosts.slice(0, 10).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Shuffle button */}
        <div className="p-4 pt-2">
          <button
            type="button"
            onClick={() => handleSort('random')}
            disabled={isShuffling}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#1B1F23] border-2 border-green-500 text-green-500 font-medium text-sm hover:bg-green-500/10 hover:border-green-400 hover:text-green-400 transition-colors disabled:opacity-50"
          >
            <span className={cn('text-xl leading-none', isShuffling && 'animate-spin')} aria-hidden>🎲</span>
            <span>{isShuffling ? 'Shuffling...' : 'Shuffle for New Posts'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
