import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StepIndicator } from '@/components/StepIndicator';
import { useRegistration } from '@/context/RegistrationContext';
import { 
  Camera, 
  Fingerprint, 
  CheckCircle, 
  XCircle, 
  Loader2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  User,
  ScanFace
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type BiometricStep = 'face' | 'fingerprint';
type StepState = 'idle' | 'scanning' | 'processing' | 'success' | 'failed';

export default function BiometricVerificationPage() {
  const navigate = useNavigate();
  const { setVerificationStatus, setCurrentStep } = useRegistration();
  const [currentBioStep, setCurrentBioStep] = useState<BiometricStep>('face');
  const [faceState, setFaceState] = useState<StepState>('idle');
  const [fingerState, setFingerState] = useState<StepState>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (faceState === 'success' && fingerState === 'success') {
      setVerificationStatus(prev => ({ ...prev, biometric: 'verified' }));
      toast({
        title: 'Biometric Verification Complete',
        description: 'Proceeding to AI duplicate check...',
      });
      setTimeout(() => {
        setCurrentStep('duplicate');
        navigate('/verify/duplicate');
      }, 2000);
    }
  }, [faceState, fingerState]);

  const simulateVerification = async (type: BiometricStep) => {
    const setStateFunc = type === 'face' ? setFaceState : setFingerState;
    
    setStateFunc('scanning');
    setProgress(0);
    
    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    setStateFunc('processing');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success
    setStateFunc('success');
    
    if (type === 'face') {
      setCurrentBioStep('fingerprint');
    }
  };

  const renderFaceVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
          <ScanFace className="h-6 w-6 text-primary" />
          Face Verification
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Position your face within the frame for verification
        </p>
      </div>

      {/* Camera Frame */}
      <div className="relative aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden bg-muted border-4 border-primary/20">
        {faceState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-32 h-40 border-4 border-dashed border-primary/40 rounded-2xl mb-4 flex items-center justify-center">
              <User className="h-16 w-16 text-primary/30" />
            </div>
            <p className="text-sm text-muted-foreground">Camera access required</p>
          </div>
        )}

        {faceState === 'scanning' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/5">
            <div className="relative w-32 h-40 rounded-2xl overflow-hidden border-4 border-primary">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent scan-line" />
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="h-16 w-16 text-primary/50" />
              </div>
            </div>
            <div className="mt-4 w-full max-w-[200px]">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-200 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-center text-muted-foreground mt-2">Scanning... {progress}%</p>
            </div>
          </div>
        )}

        {faceState === 'processing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/5">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground mt-4">Processing face data...</p>
          </div>
        )}

        {faceState === 'success' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-success/5">
            <CheckCircle className="h-16 w-16 text-success animate-scale-in" />
            <p className="text-sm text-success font-medium mt-4">Face Verified</p>
          </div>
        )}

        {faceState === 'failed' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/5">
            <XCircle className="h-16 w-16 text-destructive" />
            <p className="text-sm text-destructive font-medium mt-4">Verification Failed</p>
          </div>
        )}
      </div>

      {faceState === 'idle' && (
        <Button onClick={() => simulateVerification('face')} size="lg" className="w-full">
          <Camera className="h-5 w-5 mr-2" />
          Start Face Verification
        </Button>
      )}
    </div>
  );

  const renderFingerprintVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
          <Fingerprint className="h-6 w-6 text-primary" />
          Fingerprint Verification
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Place your finger on the scanner
        </p>
      </div>

      {/* Fingerprint Scanner */}
      <div className="relative w-48 h-48 mx-auto">
        <div className={`
          absolute inset-0 rounded-full border-4 flex items-center justify-center
          transition-all duration-300
          ${fingerState === 'idle' ? 'border-primary/30 bg-muted' : ''}
          ${fingerState === 'scanning' ? 'border-primary bg-primary/10 verification-pulse' : ''}
          ${fingerState === 'processing' ? 'border-primary/50 bg-primary/5' : ''}
          ${fingerState === 'success' ? 'border-success bg-success/10' : ''}
          ${fingerState === 'failed' ? 'border-destructive bg-destructive/10' : ''}
        `}>
          {fingerState === 'idle' && (
            <Fingerprint className="h-20 w-20 text-primary/40" />
          )}

          {fingerState === 'scanning' && (
            <div className="text-center">
              <Fingerprint className="h-20 w-20 text-primary mx-auto" />
              <div className="mt-4 w-32 mx-auto">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-200 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {fingerState === 'processing' && (
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          )}

          {fingerState === 'success' && (
            <CheckCircle className="h-16 w-16 text-success animate-scale-in" />
          )}

          {fingerState === 'failed' && (
            <XCircle className="h-16 w-16 text-destructive" />
          )}
        </div>
      </div>

      {fingerState === 'idle' && (
        <Button onClick={() => simulateVerification('fingerprint')} size="lg" className="w-full">
          <Fingerprint className="h-5 w-5 mr-2" />
          Start Fingerprint Scan
        </Button>
      )}
    </div>
  );

  const allComplete = faceState === 'success' && fingerState === 'success';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="bg-primary/5 border-b border-border">
          <StepIndicator currentStep="biometric" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">Biometric Verification</h1>
              <p className="text-muted-foreground">
                Complete face and fingerprint verification
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex items-center justify-center gap-8 mb-8 animate-fade-in">
              <div className={`flex items-center gap-2 ${faceState === 'success' ? 'text-success' : 'text-muted-foreground'}`}>
                {faceState === 'success' ? <CheckCircle className="h-5 w-5" /> : <ScanFace className="h-5 w-5" />}
                <span className="font-medium">Face</span>
              </div>
              <div className="h-px w-12 bg-border" />
              <div className={`flex items-center gap-2 ${fingerState === 'success' ? 'text-success' : 'text-muted-foreground'}`}>
                {fingerState === 'success' ? <CheckCircle className="h-5 w-5" /> : <Fingerprint className="h-5 w-5" />}
                <span className="font-medium">Fingerprint</span>
              </div>
            </div>

            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {currentBioStep === 'face' && renderFaceVerification()}
              {currentBioStep === 'fingerprint' && renderFingerprintVerification()}

              {allComplete && (
                <div className="text-center space-y-4 py-4 animate-fade-in">
                  <div className="flex items-center justify-center gap-2 text-success">
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-semibold">All Biometric Checks Complete</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Proceeding to AI duplicate detection...
                  </p>
                  <Loader2 className="h-6 w-6 text-primary mx-auto animate-spin" />
                </div>
              )}
            </div>

            {/* Accessibility Fallback */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Need an alternative?</p>
                  <p className="text-muted-foreground">
                    If you're unable to complete biometric verification, you can request manual verification 
                    at your nearest election office with valid photo ID documents.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary mt-2">
                    Request Manual Verification
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button variant="outline" onClick={() => navigate('/verify/identity')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              {!allComplete && (
                <Button variant="ghost" onClick={() => navigate('/verify/duplicate')}>
                  Skip for Demo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
