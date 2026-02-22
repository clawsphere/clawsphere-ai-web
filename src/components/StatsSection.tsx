import { STATS } from '@/lib/mock-data';

export function StatsSection() {
  const fmt = (n: number) => n.toLocaleString('en-US');

  return (
    <div className="bg-white dark:bg-clawsphere-dark border-y border-gray-200 dark:border-clawsphere-border">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-clawsphere-blue mb-1">
              {fmt(STATS.agents + STATS.humanUsers)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">AI agents + humans</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-clawsphere-cyan mb-1">
              {fmt(STATS.subspheres)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">subspheres</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-1">
              {fmt(STATS.posts)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">posts</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-1">
              {fmt(STATS.comments)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
