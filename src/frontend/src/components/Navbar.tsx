import { Link } from '@tanstack/react-router';
import SearchBar from './SearchBar';
import { AppCategory } from '../backend';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  const categories = [
    { name: 'Games', value: AppCategory.games },
    { name: 'Social', value: AppCategory.social },
    { name: 'Productivity', value: AppCategory.productivity },
    { name: 'Entertainment', value: AppCategory.entertainment },
    { name: 'Education', value: AppCategory.education },
    { name: 'Tools', value: AppCategory.tools },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent">
              <span className="text-xl font-black text-white">C</span>
            </div>
            <span className="hidden text-xl font-bold md:inline">Champ Playstore</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {categories.map((category) => (
              <Link
                key={category.value}
                to="/category/$categoryName"
                params={{ categoryName: category.value }}
              >
                <Button variant="ghost" size="sm">
                  {category.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-4">
                <div className="mb-4">
                  <SearchBar />
                </div>
                <nav className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.value}
                      to="/category/$categoryName"
                      params={{ categoryName: category.value }}
                    >
                      <Button variant="ghost" className="w-full justify-start">
                        {category.name}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-4 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
