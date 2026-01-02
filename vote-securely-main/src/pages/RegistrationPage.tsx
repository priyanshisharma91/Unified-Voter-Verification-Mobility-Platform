import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StepIndicator } from '@/components/StepIndicator';
import { SecurityInfo } from '@/components/SecurityInfo';
import { useRegistration } from '@/context/RegistrationContext';
import { states, constituenciesByState, defaultConstituencies } from '@/data/states';
import { ArrowRight, User, Calendar, CreditCard, MapPin, Phone, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { voterData, setVoterData, setCurrentStep } = useRegistration();
  const [selectedState, setSelectedState] = useState(voterData.state);

  const constituencies = selectedState 
    ? constituenciesByState[selectedState] || defaultConstituencies 
    : [];

  const handleInputChange = (field: string, value: string | boolean) => {
    setVoterData(prev => ({ ...prev, [field]: value }));
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    handleInputChange('state', value);
    handleInputChange('constituency', '');
  };

  const formatAadhaar = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    handleInputChange('aadhaarNumber', formatted);
  };

  const validateForm = () => {
    if (!voterData.fullName.trim()) {
      toast({ title: 'Error', description: 'Please enter your full name', variant: 'destructive' });
      return false;
    }
    if (!voterData.dateOfBirth) {
      toast({ title: 'Error', description: 'Please enter your date of birth', variant: 'destructive' });
      return false;
    }
    if (voterData.aadhaarNumber.replace(/\s/g, '').length !== 12) {
      toast({ title: 'Error', description: 'Please enter a valid 12-digit Aadhaar number', variant: 'destructive' });
      return false;
    }
    if (!voterData.state) {
      toast({ title: 'Error', description: 'Please select your state', variant: 'destructive' });
      return false;
    }
    if (!voterData.constituency) {
      toast({ title: 'Error', description: 'Please select your constituency', variant: 'destructive' });
      return false;
    }
    if (!voterData.phone.trim() || voterData.phone.length < 10) {
      toast({ title: 'Error', description: 'Please enter a valid phone number', variant: 'destructive' });
      return false;
    }
    if (!voterData.consentGiven) {
      toast({ title: 'Error', description: 'Please accept the privacy policy and terms', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep('identity');
      navigate('/verify/identity');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="bg-primary/5 border-b border-border">
          <StepIndicator currentStep="registration" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">Voter Registration</h1>
              <p className="text-muted-foreground">
                Fill in your details to begin the verification process
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="glass-card p-6 space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name (as per Aadhaar)</Label>
                    <Input
                      id="fullName"
                      value={voterData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dob" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date of Birth
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        value={voterData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="aadhaar" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Aadhaar Number
                      </Label>
                      <Input
                        id="aadhaar"
                        value={voterData.aadhaarNumber}
                        onChange={handleAadhaarChange}
                        placeholder="XXXX XXXX XXXX"
                        className="mt-1.5 font-mono"
                        maxLength={14}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="voterId">Voter ID (Optional)</Label>
                    <Input
                      id="voterId"
                      value={voterData.voterId}
                      onChange={(e) => handleInputChange('voterId', e.target.value)}
                      placeholder="Enter existing Voter ID if available"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Constituency Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>State / Union Territory</Label>
                    <Select value={selectedState} onValueChange={handleStateChange}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select state" />
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
                    <Label>Constituency</Label>
                    <Select 
                      value={voterData.constituency} 
                      onValueChange={(value) => handleInputChange('constituency', value)}
                      disabled={!selectedState}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select constituency" />
                      </SelectTrigger>
                      <SelectContent>
                        {constituencies.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={voterData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile number"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email (Optional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={voterData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <SecurityInfo />
              </div>

              <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={voterData.consentGiven}
                    onCheckedChange={(checked) => handleInputChange('consentGiven', checked === true)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                    I confirm that the information provided is accurate. I consent to the verification of my identity through Aadhaar and biometric systems. I understand that my data will be processed in accordance with the{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a> and{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                  </Label>
                </div>
              </div>

              <div className="flex justify-end animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button type="submit" size="lg" className="group">
                  Proceed to Identity Verification
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
