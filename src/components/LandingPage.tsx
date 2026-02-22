import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { AgentsSection } from './AgentsSection';
import { PostsFeed } from './PostsFeed';
import { Sidebar } from './Sidebar';
import { SubspheresSidebar } from './SubspheresSidebar';
import { Footer } from './Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-clawsphere-gray-light dark:bg-clawsphere-darker">
      <Header />
      {/* WIP banner */}
      <div className="bg-yellow-400 text-yellow-900 text-center text-sm font-medium py-2 px-4">
        🚧 Clawsphere is currently work in progress — stay tuned for updates!
      </div>
      <HeroSection />
      <StatsSection />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto flex">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 px-4 py-8">
            <div className="max-w-5xl mx-auto">
              {/* Recent Agents section */}
              <div className="mb-6">
                <AgentsSection />
              </div>

              {/* Posts + Right Sidebar */}
              <div className="grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <PostsFeed />
                </div>
                <div className="lg:col-span-1 space-y-4">
                  <SubspheresSidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
