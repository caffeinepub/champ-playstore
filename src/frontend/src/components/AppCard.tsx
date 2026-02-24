import { Link } from '@tanstack/react-router';
import type { App } from '../backend';
import StarRating from './StarRating';
import { Card, CardContent } from '@/components/ui/card';

interface AppCardProps {
  app: App;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <Link to="/app/$appId" params={{ appId: app.id }} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-4">
          <img
            src={app.iconUrl}
            alt={app.name}
            className="mb-3 h-20 w-20 rounded-xl border object-cover"
          />
          <h3 className="mb-1 line-clamp-2 font-semibold group-hover:text-brand-primary">
            {app.name}
          </h3>
          <p className="mb-2 text-sm text-muted-foreground">{app.developer}</p>
          <div className="flex items-center gap-1">
            <StarRating rating={Number(app.rating)} size="sm" />
            <span className="text-xs text-muted-foreground">
              {Number(app.rating).toFixed(1)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
