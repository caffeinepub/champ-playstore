import { useParams } from '@tanstack/react-router';
import { useGetAppById } from '../hooks/useQueries';
import StarRating from '../components/StarRating';
import ScreenshotsGallery from '../components/ScreenshotsGallery';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import { Button } from '@/components/ui/button';
import { Download, Calendar, HardDrive } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppDetailPage() {
  const { appId } = useParams({ from: '/app/$appId' });
  const { data: app, isLoading } = useGetAppById(appId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex gap-6">
              <Skeleton className="h-32 w-32 rounded-2xl" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">App Not Found</h1>
        <p className="text-muted-foreground">The app you're looking for doesn't exist.</p>
      </div>
    );
  }

  const releaseDate = new Date(Number(app.releaseDate) / 1000000);
  const fileSizeMB = (Number(app.fileSize) / (1024 * 1024)).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* App Header */}
          <div className="mb-8 flex flex-col gap-6 md:flex-row">
            <img
              src={app.iconUrl}
              alt={app.name}
              className="h-32 w-32 rounded-2xl border-2 border-border object-cover shadow-lg"
            />
            <div className="flex-1">
              <h1 className="mb-2 text-4xl font-bold">{app.name}</h1>
              <p className="mb-3 text-lg text-muted-foreground">{app.developer}</p>
              <div className="flex items-center gap-2">
                <StarRating rating={Number(app.rating)} />
                <span className="text-sm text-muted-foreground">
                  ({Number(app.numReviews)} {Number(app.numReviews) === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            </div>
          </div>

          {/* Install Button */}
          <Button size="lg" className="mb-8 w-full md:w-auto">
            <Download className="mr-2 h-5 w-5" />
            Install
          </Button>

          {/* Screenshots */}
          {app.screenshots.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Screenshots</h2>
              <ScreenshotsGallery screenshots={app.screenshots} />
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">About this app</h2>
            <p className="whitespace-pre-wrap text-foreground/90">{app.description}</p>
          </div>

          {/* Reviews Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Ratings and Reviews</h2>
            <div className="mb-6 rounded-xl border bg-card p-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-5xl font-bold">{Number(app.rating).toFixed(1)}</div>
                  <StarRating rating={Number(app.rating)} />
                  <div className="mt-1 text-sm text-muted-foreground">
                    {Number(app.numReviews)} {Number(app.numReviews) === 1 ? 'review' : 'reviews'}
                  </div>
                </div>
              </div>
            </div>

            <ReviewsList reviews={app.reviews} />
          </div>

          {/* Review Form */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-bold">Write a Review</h3>
            <ReviewForm appId={app.id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {/* App Info Card */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 text-lg font-bold">App Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Download className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Downloads</div>
                    <div className="text-sm text-muted-foreground">{Number(app.downloadCount).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HardDrive className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Size</div>
                    <div className="text-sm text-muted-foreground">{fileSizeMB} MB</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Released</div>
                    <div className="text-sm text-muted-foreground">{releaseDate.toLocaleDateString()}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Version</div>
                  <div className="text-sm text-muted-foreground">{app.version}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Category</div>
                  <div className="text-sm capitalize text-muted-foreground">{app.category}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
