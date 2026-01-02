import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRegistration } from '@/context/RegistrationContext';
import { states, constituenciesByState, defaultConstituencies } from '@/data/states';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText,
  Shield,
  History,
  HelpCircle,
  ChevronRight,
  User,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function DashboardPage() {
  const { voterData, verificationResult } = useRegistration();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'help'>('overview');

  const stateName = states.find(s => s.value === voterData.state)?.label || 'Maharashtra';
  const constituencyName = (constituenciesByState[voterData.state] || defaultConstituencies)
    .find(c => c.value === voterData.constituency)?.label || 'Mumbai North';

  const verificationHistory = [
    {
      event: 'Registration Completed',
      timestamp: verificationResult?.timestamp || new Date().toISOString(),
      status: 'success',
    },
    {
      event: 'AI Duplicate Check Passed',
      timestamp: new Date(Date.now() - 60000).toISOString(),
      status: 'success',
    },
    {
      event: 'Biometric Verification Completed',
      timestamp: new Date(Date.now() - 120000).toISOString(),
      status: 'success',
    },
    {
      event: 'Identity (OTP) Verified',
      timestamp: new Date(Date.now() - 180000).toISOString(),
      status: 'success',
    },
    {
      event: 'Registration Form Submitted',
      timestamp: new Date(Date.now() - 240000).toISOString(),
      status: 'success',
    },
  ];

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn userName={voterData.fullName || 'Demo User'} />
      
      <main className="flex-1">
        <div className="bg-primary/5 border-b border-border py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Voter Dashboard</h1>
                <p className="text-muted-foreground">Manage your voter registration and view history</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-medium text-success">Verified Voter</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-border">
            {[
              { key: 'overview', label: 'Overview', icon: User },
              { key: 'history', label: 'Verification History', icon: History },
              { key: 'help', label: 'Help & Support', icon: HelpCircle },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab.key 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              {/* Main Info Card */}
              <div className="lg:col-span-2 glass-card p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Registration Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{voterData.fullName || 'Demo User'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{voterData.dateOfBirth || '01/01/1990'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Aadhaar Number</p>
                        <p className="font-medium font-mono">XXXX XXXX {voterData.aadhaarNumber?.slice(-4) || '1234'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Mobile Number</p>
                        <p className="font-medium">{voterData.phone || '9876543210'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{voterData.email || 'user@example.com'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Constituency</p>
                        <p className="font-medium">{constituencyName}</p>
                        <p className="text-sm text-muted-foreground">{stateName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Link to="/register">
                    <Button variant="outline">
                      Update Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Status Card */}
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Registration Status</h3>
                  <div className="space-y-3">
                    {['Identity Verified', 'Biometric Verified', 'Duplicate Check Passed', 'Registration Active'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Verification ID</h3>
                  <p className="font-mono text-sm bg-muted p-3 rounded-lg break-all">
                    {verificationResult?.verificationId || 'VVP-DEMO-123456'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Verified on {formatDate(verificationResult?.timestamp || new Date().toISOString())}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="max-w-2xl animate-fade-in">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Audit Log
                </h2>
                
                <div className="space-y-1">
                  {verificationHistory.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{item.event}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(item.timestamp)}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">
                          Success
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-info/5 border border-info/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      All verification events are logged in a tamper-proof audit trail. This log is read-only 
                      and cannot be modified by anyone, ensuring complete transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="max-w-2xl animate-fade-in">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Help & Support
                </h2>
                
                <div className="space-y-4">
                  {[
                    { title: 'How do I update my constituency?', desc: 'Go to Overview and click "Update Details" to change your registered constituency.' },
                    { title: 'When will I receive my Voter ID card?', desc: 'Physical Voter ID cards are dispatched within 15 working days of successful registration.' },
                    { title: 'What if my verification failed?', desc: 'You can retry verification or visit your nearest election office for manual verification.' },
                    { title: 'How is my data protected?', desc: 'All data is encrypted end-to-end and no raw biometric data is stored in the system.' },
                  ].map((faq, i) => (
                    <div key={i} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                      <h4 className="font-medium text-foreground flex items-center justify-between">
                        {faq.title}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{faq.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Need more help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our 24/7 support helpline or visit your nearest election office.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      1800-XXX-XXXX
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Find Election Office
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
