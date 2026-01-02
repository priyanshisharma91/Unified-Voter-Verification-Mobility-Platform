import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StepIndicator } from '@/components/StepIndicator';
import { useRegistration } from '@/context/RegistrationContext';
import { states, constituenciesByState, defaultConstituencies } from '@/data/states';
import { 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Home,
  Navigation
} from 'lucide-react';

export default function MobilityPage() {
  const navigate = useNavigate();
  const { voterData, setVoterData, setCurrentStep } = useRegistration();
  const [wantsToRelocate, setWantsToRelocate] = useState<boolean | null>(null);
  const [newState, setNewState] = useState('');
  const [newConstituency, setNewConstituency] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const currentStateName = states.find(s => s.value === voterData.state)?.label || voterData.state;
  const currentConstituencyName = (constituenciesByState[voterData.state] || defaultConstituencies)
    .find(c => c.value === voterData.constituency)?.label || voterData.constituency;

  const newConstituencies = newState 
    ? constituenciesByState[newState] || defaultConstituencies 
    : [];

  const handleConfirmNoChange = () => {
    setCurrentStep('success');
    navigate('/verify/success');
  };

  const handleConfirmRelocation = () => {
    if (!newState || !newConstituency) return;
    
    setVoterData(prev => ({
      ...prev,
      state: newState,
      constituency: newConstituency,
    }));
    setConfirmed(true);
    
    setTimeout(() => {
      setCurrentStep('success');
      navigate('/verify/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="bg-primary/5 border-b border-border">
          <StepIndicator currentStep="mobility" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">Voter Mobility</h1>
              <p className="text-muted-foreground">
                Update your constituency if you've relocated
              </p>
            </div>

            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {/* Current Location */}
              <div className="bg-primary/5 rounded-lg p-4 mb-6 border border-primary/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Registration</p>
                    <p className="font-semibold text-lg text-foreground">{currentConstituencyName}</p>
                    <p className="text-sm text-muted-foreground">{currentStateName}</p>
                  </div>
                </div>
              </div>

              {wantsToRelocate === null && (
                <div className="space-y-4">
                  <p className="text-center text-foreground mb-6">
                    Have you relocated to a different constituency?
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={() => setWantsToRelocate(false)}
                      className="h-auto py-4 flex-col gap-2"
                    >
                      <CheckCircle className="h-6 w-6 text-success" />
                      <span>No, Same Location</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={() => setWantsToRelocate(true)}
                      className="h-auto py-4 flex-col gap-2"
                    >
                      <Navigation className="h-6 w-6 text-primary" />
                      <span>Yes, I've Moved</span>
                    </Button>
                  </div>
                </div>
              )}

              {wantsToRelocate === false && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Great! No changes needed.
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Your registration will remain in {currentConstituencyName}, {currentStateName}.
                    </p>
                  </div>

                  <Button onClick={handleConfirmNoChange} size="lg" className="w-full">
                    Continue to Complete Registration
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    onClick={() => setWantsToRelocate(null)} 
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Change my answer
                  </Button>
                </div>
              )}

              {wantsToRelocate === true && !confirmed && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">New State / Union Territory</label>
                      <Select value={newState} onValueChange={(v) => { setNewState(v); setNewConstituency(''); }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select new state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">New Constituency</label>
                      <Select 
                        value={newConstituency} 
                        onValueChange={setNewConstituency}
                        disabled={!newState}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select new constituency" />
                        </SelectTrigger>
                        <SelectContent>
                          {newConstituencies.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-foreground mb-1">Important Notice</p>
                        <p className="text-muted-foreground">
                          By updating your constituency, your registration in{' '}
                          <span className="font-medium">{currentConstituencyName}</span> will be 
                          marked as inactive. You can only vote in your new constituency.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleConfirmRelocation} 
                    size="lg" 
                    className="w-full"
                    disabled={!newState || !newConstituency}
                  >
                    Confirm Constituency Change
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    onClick={() => setWantsToRelocate(null)} 
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Cancel and go back
                  </Button>
                </div>
              )}

              {confirmed && (
                <div className="text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Constituency Updated!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Your registration has been transferred. Proceeding to confirmation...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button variant="outline" onClick={() => navigate('/verify/duplicate')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
