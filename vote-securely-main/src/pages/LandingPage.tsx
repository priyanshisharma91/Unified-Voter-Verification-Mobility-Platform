import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrustIndicators } from '@/components/TrustBadge';
import { 
  Shield, 
  UserCheck, 
  MapPin, 
  Fingerprint, 
  CheckCircle2, 
  ArrowRight,
  Vote,
  Users,
  BarChart3,
  Lock
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Fingerprint,
      title: 'Biometric Verification',
      description: 'Secure identity verification using Aadhaar-linked biometrics to prevent impersonation.',
    },
    {
      icon: Users,
      title: 'AI Duplicate Detection',
      description: 'Advanced AI scans across states to eliminate duplicate voter registrations.',
    },
    {
      icon: MapPin,
      title: 'Voter Mobility',
      description: 'Seamlessly update your constituency when you relocate—vote from anywhere in India.',
    },
    {
      icon: Lock,
      title: 'Tamper-Proof Records',
      description: 'Immutable audit logs ensure complete transparency and accountability.',
    },
  ];

  const stats = [
    { value: '90Cr+', label: 'Registered Voters' },
    { value: '28', label: 'States Connected' },
    { value: '99.9%', label: 'Uptime' },
    { value: '0', label: 'Data Breaches' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6 animate-fade-in">
              <Vote className="h-4 w-4" />
              <span className="text-sm font-medium">Official Government Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              One Citizen. One Vote.
              <span className="block text-accent">Anywhere in India.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The Unified Voter Verification & Mobility Platform ensures secure, 
              transparent, and accessible elections for every Indian citizen.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/register">
                <Button variant="hero" size="xl" className="group">
                  Register to Vote
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Already Registered? Login
                </Button>
              </Link>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <TrustIndicators />
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100V0C240 60 480 90 720 90C960 90 1200 60 1440 0V100H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center p-6 rounded-xl bg-card border border-border animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How VoteSecure Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive verification system that ensures every vote is authentic and every voter is empowered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple 5-Step Verification
            </h2>
            <p className="text-lg text-muted-foreground">
              Complete your voter registration in minutes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              { step: 1, title: 'Fill Registration Form', desc: 'Enter your basic details and Aadhaar number' },
              { step: 2, title: 'Verify Identity', desc: 'OTP-based Aadhaar verification' },
              { step: 3, title: 'Biometric Check', desc: 'Face and fingerprint verification' },
              { step: 4, title: 'AI Duplicate Scan', desc: 'Cross-state duplicate detection' },
              { step: 5, title: 'Confirmation', desc: 'Receive your verification ID' },
            ].map((item, index) => (
              <div 
                key={item.step}
                className="flex items-start gap-4 mb-6 last:mb-0 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="flex-1 pb-6 border-b border-border last:border-0">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Register?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join millions of verified voters and ensure your voice is heard in every election.
          </p>
          <Link to="/register">
            <Button variant="hero" size="xl">
              Start Registration
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
