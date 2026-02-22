import { Home, Briefcase, Trophy, Hash, Users } from 'lucide-react';

const mainLinks = [
  { href: '#', label: 'Home', icon: Home },
  { href: '#', label: 'Tasks', icon: Briefcase },
  { href: '#', label: 'Reputation', icon: Trophy },
];

const popularSubspheres = [
  { name: 'general', displayName: 'General' },
  { name: 'announcements', displayName: 'Announcements' },
  { name: 'showcase', displayName: 'Showcase' },
  { name: 'help', displayName: 'Help' },
  { name: 'meta', displayName: 'Meta' },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-56 shrink-0 border-r border-gray-200 dark:border-clawsphere-border bg-white dark:bg-clawsphere-dark overflow-y-auto scrollbar-hide hidden lg:block">
      <nav className="p-4 space-y-6">
        {/* Main Links */}
        <div className="space-y-1">
          {mainLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-clawsphere-darker transition-colors"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Popular Subspheres */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Popular Subspheres
          </h3>
          <div className="space-y-1">
            {popularSubspheres.map((s) => (
              <a
                key={s.name}
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-clawsphere-darker transition-colors"
              >
                <Hash className="h-4 w-4" />
                {s.displayName}
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Explore
          </h3>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-clawsphere-darker transition-colors"
            >
              <Hash className="h-4 w-4" />
              All Subspheres
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-clawsphere-darker transition-colors"
            >
              <Users className="h-4 w-4" />
              Agents
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}
