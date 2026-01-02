import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StepIndicator } from '@/components/StepIndicator';
import { useRegistration } from '@/context/RegistrationContext';
import { states, constituenciesByState, defaultConstituencies } from '@/data/states';
import { 
  CheckCircle2, 
  Download, 
  Share2, 
  Home,
  Calendar,
  MapPin,
  Shield,
  FileText,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { voterData, setVerificationResult } = useRegistration();
  const [verificationId, setVerificationId] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    // Generate verification ID and timestamp
    const id = `VVP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const now = new Date();
    const ts = now.toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
    });
    
    setVerificationId(id);
    setTimestamp(ts);
    
    setVerificationResult({
      verificationId: id,
      timestamp: now.toISOString(),
      status: 'success',
      voterData,
    });
  }, []);

  const stateName = states.find(s => s.value === voterData.state)?.label || voterData.state;
  const constituencyName = (constituenciesByState[voterData.state] || defaultConstituencies)
    .find(c => c.value === voterData.constituency)?.label || voterData.constituency;

  const nextSteps = [
    'Your voter registration is now active in the national database.',
    'You will receive an SMS confirmation within 24 hours.',
    'Your updated Voter ID card will be dispatched within 15 working days.',
    'You can now vote at any designated polling station in your constituency.',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="bg-primary/5 border-b border-border">
          <StepIndicator currentStep="success" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Success Banner */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="relative inline-block">
                <div className="w-24 h-24 mx-auto rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
                  <CheckCircle2 className="h-14 w-14 text-success" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-warning animate-float" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mt-6 mb-2">
                Registration Successful!
              </h1>
              <p className="text-muted-foreground">
                You are now registered to vote in the upcoming elections.
              </p>
            </div>

            {/* Verification Card */}
            <div className="glass-card p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    <span className="font-semibold">VoteSecure Verification</span>
                  </div>
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm opacity-80">Verification ID</p>
                  <p className="font-mono text-xl font-bold tracking-wider">{verificationId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Voter Name</p>
                    <p className="font-medium">{voterData.fullName || 'Demo User'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{voterData.dateOfBirth || '01/01/1990'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Constituency</p>
                    <p className="font-medium">{constituencyName || 'Demo Constituency'}</p>
                    <p className="text-sm text-muted-foreground">{stateName || 'Demo State'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Verified On</p>
                    <p className="font-medium text-sm">{timestamp}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="glass-card p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-primary" />
                What Happens Next
              </h2>
              <ul className="space-y-3">
                {nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="flex-1">
                <Download className="h-5 w-5 mr-2" />
                Download Acknowledgment
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>

            <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <Home className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
