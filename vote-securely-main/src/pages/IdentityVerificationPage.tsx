import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StepIndicator } from '@/components/StepIndicator';
import { useRegistration } from '@/context/RegistrationContext';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Smartphone,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type VerificationState = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'failed';

export default function IdentityVerificationPage() {
  const navigate = useNavigate();
  const { voterData, setVerificationStatus, setCurrentStep } = useRegistration();
  const [state, setState] = useState<VerificationState>('idle');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const maskedAadhaar = voterData.aadhaarNumber 
    ? `XXXX XXXX ${voterData.aadhaarNumber.slice(-4)}`
    : 'XXXX XXXX XXXX';

  const maskedPhone = voterData.phone
    ? `XXXXXX${voterData.phone.slice(-4)}`
    : 'XXXXXXXXXX';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const sendOTP = async () => {
    setState('sending');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setState('sent');
    setCountdown(30);
    toast({
      title: 'OTP Sent',
      description: `A 6-digit OTP has been sent to ${maskedPhone}`,
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const verifyOTP = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter all 6 digits',
        variant: 'destructive',
      });
      return;
    }

    setState('verifying');
    setVerificationStatus(prev => ({ ...prev, identity: 'verifying' }));
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate success (in real app, validate with backend)
    if (otpValue === '123456' || Math.random() > 0.2) {
      setState('verified');
      setVerificationStatus(prev => ({ ...prev, identity: 'verified' }));
      toast({
        title: 'Identity Verified',
        description: 'Your Aadhaar identity has been successfully verified.',
      });
      setTimeout(() => {
        setCurrentStep('biometric');
        navigate('/verify/biometric');
      }, 2000);
    } else {
      setState('failed');
      setAttempts(prev => prev + 1);
      setVerificationStatus(prev => ({ ...prev, identity: 'failed' }));
      toast({
        title: 'Verification Failed',
        description: 'Invalid OTP. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resendOTP = () => {
    setOtp(['', '', '', '', '', '']);
    setState('idle');
    sendOTP();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="bg-primary/5 border-b border-border">
          <StepIndicator currentStep="identity" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">Identity Verification</h1>
              <p className="text-muted-foreground">
                Verify your identity using Aadhaar-linked OTP
              </p>
            </div>

            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {/* Aadhaar Info Card */}
              <div className="bg-primary/5 rounded-lg p-4 mb-6 border border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Aadhaar Number</p>
                    <p className="font-mono font-semibold text-lg">{maskedAadhaar}</p>
                  </div>
                  <Shield className="h-10 w-10 text-primary/50" />
                </div>
              </div>

              {/* Why Verification Section */}
              <div className="bg-info/5 rounded-lg p-4 mb-6 border border-info/20">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Why is this required?</p>
                    <p className="text-muted-foreground">
                      Aadhaar verification ensures that you are the legitimate owner of this identity 
                      and prevents impersonation or unauthorized voter registration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              {state === 'idle' && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Smartphone className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground mb-2">
                      We'll send a 6-digit OTP to your registered mobile number
                    </p>
                    <p className="text-sm text-muted-foreground font-mono">{maskedPhone}</p>
                  </div>
                  <Button onClick={sendOTP} size="lg" className="w-full">
                    Send OTP
                  </Button>
                </div>
              )}

              {state === 'sending' && (
                <div className="text-center space-y-6 py-8">
                  <Loader2 className="h-16 w-16 text-primary mx-auto animate-spin" />
                  <p className="text-foreground">Sending OTP to your mobile...</p>
                </div>
              )}

              {(state === 'sent' || state === 'verifying' || state === 'failed') && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-foreground mb-1">Enter the 6-digit OTP sent to</p>
                    <p className="text-sm text-muted-foreground font-mono">{maskedPhone}</p>
                  </div>

                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-14 text-center text-2xl font-bold"
                        disabled={state === 'verifying'}
                      />
                    ))}
                  </div>

                  {state === 'failed' && (
                    <div className="flex items-center justify-center gap-2 text-destructive">
                      <XCircle className="h-5 w-5" />
                      <span className="text-sm">Invalid OTP. Attempts remaining: {3 - attempts}</span>
                    </div>
                  )}

                  <div className="flex justify-center">
                    {countdown > 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Resend OTP in {countdown}s
                      </p>
                    ) : (
                      <Button variant="ghost" onClick={resendOTP} className="text-sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Resend OTP
                      </Button>
                    )}
                  </div>

                  <Button 
                    onClick={verifyOTP} 
                    size="lg" 
                    className="w-full"
                    disabled={state === 'verifying' || otp.join('').length !== 6}
                  >
                    {state === 'verifying' ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                </div>
              )}

              {state === 'verified' && (
                <div className="text-center space-y-6 py-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
                    <CheckCircle className="h-12 w-12 text-success" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Identity Verified!</h3>
                    <p className="text-muted-foreground">
                      Your Aadhaar identity has been successfully verified. Proceeding to biometric verification...
                    </p>
                  </div>
                  <Loader2 className="h-6 w-6 text-primary mx-auto animate-spin" />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button variant="outline" onClick={() => navigate('/register')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              {state !== 'verified' && (
                <Button variant="ghost" onClick={() => navigate('/verify/biometric')}>
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
