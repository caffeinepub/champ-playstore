import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ScreenshotsGalleryProps {
  screenshots: string[];
}

export default function ScreenshotsGallery({ screenshots }: ScreenshotsGalleryProps) {
  if (screenshots.length === 0) return null;

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {screenshots.map((screenshot, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Dialog>
              <DialogTrigger asChild>
                <button className="group relative overflow-hidden rounded-xl border">
                  <img
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
