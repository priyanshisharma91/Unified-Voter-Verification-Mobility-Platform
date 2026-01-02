import { Shield, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export function Header({ isLoggedIn = false, userName, onLogout }: HeaderProps) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className="w-full border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground leading-tight">VoteSecure</span>
            <span className="text-xs text-muted-foreground leading-tight">Unified Voter Platform</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {!isLanding && (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Admin
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="hidden sm:inline font-medium">{userName}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              {isLanding && (
                <Link to="/register">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
