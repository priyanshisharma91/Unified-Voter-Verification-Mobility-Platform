import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StepIndicator } from '@/components/StepIndicator';
import { useRegistration } from '@/context/RegistrationContext';
import { 
  Brain, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  ArrowRight,
  ArrowLeft,
  Search,
  Database,
  Shield,
  Info
} from 'lucide-react';

type ScanPhase = 'idle' | 'scanning' | 'analyzing' | 'complete';

export default function DuplicateCheckPage() {
  const navigate = useNavigate();
  const { voterData, setDuplicateResult, setVerificationStatus, setCurrentStep } = useRegistration();
  const [phase, setPhase] = useState<ScanPhase>('idle');
  const [progress, setProgress] = useState(0);
  const [statesScanned, setStatesScanned] = useState(0);
  const [recordsChecked, setRecordsChecked] = useState(0);
  const [result, setResult] = useState<'clear' | 'flagged' | null>(null);

  const startScan = async () => {
    setPhase('scanning');
    setProgress(0);
    setStatesScanned(0);
    setRecordsChecked(0);

    // Simulate scanning across states
    const totalStates = 28;
    for (let i = 1; i <= totalStates; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setStatesScanned(i);
      setRecordsChecked(prev => prev + Math.floor(Math.random() * 50000) + 10000);
      setProgress((i / totalStates) * 70);
    }

    // Analyzing phase
    setPhase('analyzing');
    for (let i = 70; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    // Determine result (mostly clear for demo)
    const isClear = Math.random() > 0.15;
    const scanResult = isClear ? 'clear' : 'flagged';
    setResult(scanResult);
    setPhase('complete');

    setDuplicateResult({
      status: scanResult,
      confidenceScore: isClear ? 98 : 87,
      reason: isClear ? undefined : 'Partial name match found in Maharashtra voter database',
      matchedRecords: isClear ? 0 : 1,
    });

    setVerificationStatus(prev => ({
      ...prev,
      duplicate: scanResult === 'clear' ? 'clear' : 'flagged',
    }));

    if (isClear) {
      setTimeout(() => {
        setCurrentStep('mobility');
        navigate('/verify/mobility');
      }, 3000);
    }
  };

  useEffect(() => {
    // Auto-start after a short delay
    const timer = setTimeout(() => {
      startScan();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderScanningVisual = () => (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
      
      {/* Spinning scanner */}
      <div 
        className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary animate-spin"
        style={{ animationDuration: '1s' }}
      />
      
      {/* Inner content */}
      <div className="absolute inset-8 rounded-full bg-primary/5 flex flex-col items-center justify-center">
        <Brain className="h-12 w-12 text-primary mb-2" />
        <span className="text-sm font-medium text-primary">AI Scanning</span>
      </div>

      {/* Floating data points */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary/40 rounded-full animate-ping"
          style={{
            top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
            left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.5s',
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="bg-primary/5 border-b border-border">
          <StepIndicator currentStep="duplicate" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">AI Duplicate Check</h1>
              <p className="text-muted-foreground">
                Scanning voter databases across all states
              </p>
            </div>

            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {(phase === 'idle' || phase === 'scanning' || phase === 'analyzing') && (
                <div className="space-y-8">
                  {renderScanningVisual()}

                  <div className="space-y-4">
                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {phase === 'analyzing' ? 'Analyzing data...' : 'Scanning databases...'}
                        </span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-center gap-2 text-primary mb-1">
                          <Database className="h-4 w-4" />
                          <span className="font-semibold">{statesScanned}/28</span>
                        </div>
                        <p className="text-xs text-muted-foreground">States Scanned</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-center gap-2 text-primary mb-1">
                          <Search className="h-4 w-4" />
                          <span className="font-semibold">{recordsChecked.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Records Checked</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {phase === 'complete' && result === 'clear' && (
                <div className="text-center space-y-6 py-4 animate-fade-in">
                  <div className="w-24 h-24 mx-auto rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
                    <CheckCircle className="h-14 w-14 text-success" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Duplicates Found</h3>
                    <p className="text-muted-foreground">
                      Your identity is unique across all state databases.
                    </p>
                  </div>

                  <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-success" />
                      <span className="font-semibold text-success">Confidence Score: 98%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI verification complete with high confidence
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm">Proceeding to next step...</span>
                  </div>
                </div>
              )}

              {phase === 'complete' && result === 'flagged' && (
                <div className="text-center space-y-6 py-4 animate-fade-in">
                  <div className="w-24 h-24 mx-auto rounded-full bg-warning/10 flex items-center justify-center animate-scale-in">
                    <AlertTriangle className="h-14 w-14 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Possible Duplicate Detected</h3>
                    <p className="text-muted-foreground">
                      Your application has been flagged for manual review.
                    </p>
                  </div>

                  <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-5 w-5 text-warning" />
                      <span className="font-semibold text-warning">Confidence Score: 87%</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Why was this flagged?</p>
                        <p className="text-sm text-muted-foreground">
                          A partial name match was found in the Maharashtra voter database. This may be 
                          a coincidence or an existing registration that needs resolution.
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-2 text-sm">
                        <Info className="h-4 w-4 text-info flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">
                          An election officer will review your application within 2-3 business days. 
                          You'll receive an update via SMS.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => navigate('/dashboard')} size="lg" className="w-full">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              )}
            </div>

            {/* Navigation */}
            {phase === 'complete' && result === 'clear' && (
              <div className="flex justify-center mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Button onClick={() => navigate('/verify/mobility')} size="lg">
                  Continue to Mobility Check
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            )}

            {(phase === 'scanning' || phase === 'analyzing') && (
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => navigate('/verify/biometric')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
