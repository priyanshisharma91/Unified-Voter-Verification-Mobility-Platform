import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FlaggedCase } from '@/types/voter';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye,
  Search,
  Filter,
  Shield,
  Clock,
  User,
  MapPin,
  ChevronRight,
  FileSearch,
  BarChart3,
  Users,
  AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockFlaggedCases: FlaggedCase[] = [
  {
    id: 'CASE-001',
    voterName: 'Rajesh Kumar',
    aadhaarLast4: '4521',
    state: 'Maharashtra',
    constituency: 'Mumbai North',
    confidenceScore: 87,
    reason: 'Partial name match found in Gujarat voter database',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'pending',
  },
  {
    id: 'CASE-002',
    voterName: 'Priya Sharma',
    aadhaarLast4: '7834',
    state: 'Delhi',
    constituency: 'New Delhi',
    confidenceScore: 72,
    reason: 'Similar biometric hash detected in Uttar Pradesh records',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'pending',
  },
  {
    id: 'CASE-003',
    voterName: 'Amit Patel',
    aadhaarLast4: '9123',
    state: 'Gujarat',
    constituency: 'Ahmedabad East',
    confidenceScore: 65,
    reason: 'Address overlap with existing registration',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    status: 'manual_review',
  },
  {
    id: 'CASE-004',
    voterName: 'Sunita Devi',
    aadhaarLast4: '2456',
    state: 'Bihar',
    constituency: 'Patna',
    confidenceScore: 91,
    reason: 'Exact name and DOB match in Jharkhand database',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: 'approved',
  },
  {
    id: 'CASE-005',
    voterName: 'Mohammed Khan',
    aadhaarLast4: '6789',
    state: 'Uttar Pradesh',
    constituency: 'Lucknow',
    confidenceScore: 78,
    reason: 'Possible duplicate based on phone number',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    status: 'rejected',
  },
];

export default function AdminDashboard() {
  const [cases, setCases] = useState<FlaggedCase[]>(mockFlaggedCases);
  const [selectedCase, setSelectedCase] = useState<FlaggedCase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const stats = {
    total: cases.length,
    pending: cases.filter(c => c.status === 'pending').length,
    approved: cases.filter(c => c.status === 'approved').length,
    rejected: cases.filter(c => c.status === 'rejected').length,
  };

  const handleAction = (caseId: string, action: 'approved' | 'rejected' | 'manual_review') => {
    setCases(prev => prev.map(c => 
      c.id === caseId ? { ...c, status: action } : c
    ));
    setSelectedCase(null);
  };

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.voterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: FlaggedCase['status']) => {
    const config = {
      pending: { color: 'bg-warning/10 text-warning border-warning/20', icon: Clock },
      approved: { color: 'bg-success/10 text-success border-success/20', icon: CheckCircle },
      rejected: { color: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
      manual_review: { color: 'bg-info/10 text-info border-info/20', icon: Eye },
    };
    const { color, icon: Icon } = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${color}`}>
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn userName="Election Officer" />
      
      <main className="flex-1">
        <div className="bg-primary/5 border-b border-border py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Review flagged cases and manage voter verifications</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Cases', value: stats.total, icon: FileSearch, color: 'text-primary' },
              { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'text-warning' },
              { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'text-success' },
              { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-destructive' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color} opacity-50`} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Case List */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or case ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    {['all', 'pending', 'manual_review', 'approved', 'rejected'].map((status) => (
                      <Button
                        key={status}
                        variant={filterStatus === status ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterStatus(status)}
                        className="capitalize"
                      >
                        {status === 'all' ? 'All' : status.replace('_', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredCases.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCase(c)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all
                        ${selectedCase?.id === c.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/30 hover:bg-muted/50'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                            {getStatusBadge(c.status)}
                          </div>
                          <p className="font-semibold text-foreground">{c.voterName}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {c.constituency}, {c.state}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${c.confidenceScore >= 80 ? 'text-destructive' : 'text-warning'}`}>
                            {c.confidenceScore}%
                          </div>
                          <p className="text-xs text-muted-foreground">Confidence</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredCases.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No cases found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="lg:col-span-1">
              {selectedCase ? (
                <div className="glass-card p-6 sticky top-4 animate-fade-in">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileSearch className="h-5 w-5 text-primary" />
                    Case Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Case ID</p>
                      <p className="font-mono">{selectedCase.id}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Voter Name</p>
                      <p className="font-semibold">{selectedCase.voterName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Aadhaar (Last 4)</p>
                      <p className="font-mono">XXXX XXXX {selectedCase.aadhaarLast4}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{selectedCase.constituency}, {selectedCase.state}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Flagged On</p>
                      <p>{formatDate(selectedCase.timestamp)}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <span className="font-medium text-sm">AI Confidence: {selectedCase.confidenceScore}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedCase.reason}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                      {getStatusBadge(selectedCase.status)}
                    </div>

                    {selectedCase.status === 'pending' && (
                      <div className="space-y-2 pt-4 border-t border-border">
                        <Button 
                          className="w-full" 
                          variant="success"
                          onClick={() => handleAction(selectedCase.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Registration
                        </Button>
                        <Button 
                          className="w-full" 
                          variant="destructive"
                          onClick={() => handleAction(selectedCase.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Registration
                        </Button>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => handleAction(selectedCase.id, 'manual_review')}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Send for Manual Review
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Audit Trail Info */}
                  <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>All actions are logged in the immutable audit trail</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-6 text-center">
                  <Eye className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Select a case to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
