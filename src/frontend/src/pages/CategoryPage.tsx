import { useParams } from '@tanstack/react-router';
import { useGetAppsByCategory } from '../hooks/useQueries';
import AppCard from '../components/AppCard';
import { AppCategory } from '../backend';
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type SortOption = 'popularity' | 'rating' | 'name';

export default function CategoryPage() {
  const { categoryName } = useParams({ from: '/category/$categoryName' });
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  const category = categoryName as AppCategory;
  const { data: apps, isLoading } = useGetAppsByCategory(category);

  const sortedApps = useMemo(() => {
    if (!apps) return [];
    const appsCopy = [...apps];

    switch (sortBy) {
      case 'popularity':
        return appsCopy.sort((a, b) => Number(b.downloadCount - a.downloadCount));
      case 'rating':
        return appsCopy.sort((a, b) => Number(b.rating - a.rating));
      case 'name':
        return appsCopy.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return appsCopy;
    }
  }, [apps, sortBy]);

  const categoryDisplayName = category.charAt(0).toUpperCase() + category.slice(1);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-8 h-12 w-64" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Skeleton key={i} className="h-[200px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-bold">{categoryDisplayName}</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedApps.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No apps found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sortedApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
