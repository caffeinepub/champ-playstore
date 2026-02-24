import { Link } from '@tanstack/react-router';
import type { App, AppCategory } from '../backend';
import AppCard from './AppCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategorySectionProps {
  category: AppCategory;
  apps: App[];
}

const categoryIcons: Record<AppCategory, string> = {
  games: '/assets/generated/icon-games.dim_128x128.png',
  social: '/assets/generated/icon-social.dim_128x128.png',
  productivity: '/assets/generated/icon-productivity.dim_128x128.png',
  entertainment: '/assets/generated/icon-entertainment.dim_128x128.png',
  education: '/assets/generated/icon-education.dim_128x128.png',
  tools: '/assets/generated/icon-tools.dim_128x128.png',
};

export default function CategorySection({ category, apps }: CategorySectionProps) {
  const categoryApps = apps.filter((app) => app.category === category).slice(0, 10);

  if (categoryApps.length === 0) return null;

  const categoryDisplayName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={categoryIcons[category]} alt={category} className="h-10 w-10" />
          <h2 className="text-2xl font-bold">{categoryDisplayName}</h2>
        </div>
        <Link to="/category/$categoryName" params={{ categoryName: category }}>
          <Button variant="ghost" size="sm">
            See all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {categoryApps.map((app) => (
            <div key={app.id} className="w-[160px] flex-shrink-0">
              <AppCard app={app} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
