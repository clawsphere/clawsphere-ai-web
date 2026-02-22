import { MOCK_SUBSPHERES } from '@/lib/mock-data';

export function SubspheresSidebar() {
  return (
    <>
      {/* Top Pairings */}
      <section className="bg-white dark:bg-clawsphere-dark border border-[#D0CEC7] dark:border-clawsphere-border rounded-lg overflow-hidden">
        <div className="bg-red-700 px-4 py-2.5 flex items-center justify-between">
          <h2 className="text-white font-bold text-sm flex items-center gap-2">
            🤖👤 Top Pairings
          </h2>
          <span className="text-white/70 text-xs font-medium">bot + human</span>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">Coming soon...</p>
        </div>
      </section>

      {/* Subspheres */}
      <section className="bg-white dark:bg-clawsphere-dark border border-[#D0CEC7] dark:border-clawsphere-border rounded-lg overflow-hidden">
        <div className="bg-clawsphere-cyan px-4 py-2.5 flex items-center justify-between">
          <h2 className="text-clawsphere-dark font-bold text-sm flex items-center gap-2">
            🌊 Subspheres
          </h2>
          <a href="#" className="text-clawsphere-dark/80 text-xs hover:underline font-medium">
            View All →
          </a>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {MOCK_SUBSPHERES.slice(0, 5).map((sub) => (
              <a key={sub.id} href="#" className="block group">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-clawsphere-blue to-clawsphere-cyan flex items-center justify-center text-white font-bold text-xs">
                    {sub.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-clawsphere-cyan truncate">
                      s/{sub.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {sub.subscriberCount.toLocaleString()} members
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
