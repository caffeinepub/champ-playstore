import { useGetAllApps } from '../hooks/useQueries';
import AppCard from '../components/AppCard';
import CategorySection from '../components/CategorySection';
import { AppCategory } from '../backend';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { data: apps, isLoading } = useGetAllApps();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-[400px] w-full rounded-2xl" />
        <div className="mt-12 space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="mb-4 h-8 w-48" />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {[1, 2, 3, 4, 5].map((j) => (
                  <Skeleton key={j} className="h-[200px] rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const featuredApps = apps?.slice(0, 6) || [];
  const popularApps = [...(apps || [])].sort((a, b) => Number(b.downloadCount - a.downloadCount)).slice(0, 10);

  const categories = [
    AppCategory.games,
    AppCategory.social,
    AppCategory.productivity,
    AppCategory.entertainment,
    AppCategory.education,
    AppCategory.tools,
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="Champ Playstore"
          className="h-[300px] w-full object-cover opacity-20 md:h-[400px]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-6xl">
              Champ Playstore
            </h1>
            <p className="text-lg font-medium text-white/90 md:text-xl">
              Discover amazing apps for every need
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Apps */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Featured Apps</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {featuredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        {/* Popular Apps */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Popular Apps</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {popularApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        {/* Category Sections */}
        {categories.map((category) => (
          <CategorySection key={category} category={category} apps={apps || []} />
        ))}
      </div>
    </div>
  );
}
