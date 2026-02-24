import { useState, useEffect } from 'react';
import { useSearchAppsByName, useSearchAppsByDeveloper } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import StarRating from './StarRating';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { data: nameResults = [] } = useSearchAppsByName(debouncedTerm);
  const { data: developerResults = [] } = useSearchAppsByDeveloper(debouncedTerm);

  // Combine and deduplicate results
  const allResults = [...nameResults, ...developerResults].filter(
    (app, index, self) => self.findIndex((a) => a.id === app.id) === index
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setShowResults(debouncedTerm.length > 0);
  }, [debouncedTerm]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search apps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(debouncedTerm.length > 0)}
          className="pl-10"
        />
      </div>

      {showResults && allResults.length > 0 && (
        <Card className="absolute top-full z-50 mt-2 max-h-[400px] w-full overflow-y-auto p-2">
          {allResults.map((app) => (
            <Link
              key={app.id}
              to="/app/$appId"
              params={{ appId: app.id }}
              onClick={() => {
                setShowResults(false);
                setSearchTerm('');
              }}
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
            >
              <img src={app.iconUrl} alt={app.name} className="h-12 w-12 rounded-lg border object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="truncate font-semibold">{app.name}</h4>
                <p className="truncate text-sm text-muted-foreground">{app.developer}</p>
                <div className="flex items-center gap-1">
                  <StarRating rating={Number(app.rating)} size="sm" />
                  <span className="text-xs capitalize text-muted-foreground">• {app.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </Card>
      )}
    </div>
  );
}
