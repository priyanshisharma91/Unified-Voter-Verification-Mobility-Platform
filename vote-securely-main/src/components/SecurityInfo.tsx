import { Shield, Lock, FileText, Database } from 'lucide-react';

export function SecurityInfo() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Data Encrypted',
      description: 'All data is encrypted in transit and at rest using AES-256 encryption.',
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'No raw biometric data is stored. Only encrypted hashes are retained.',
    },
    {
      icon: FileText,
      title: 'Tamper-Proof Logs',
      description: 'All actions are logged in an immutable audit trail for transparency.',
    },
    {
      icon: Database,
      title: 'Decentralized Storage',
      description: 'Data is distributed across secure government infrastructure.',
    },
  ];

  return (
    <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5" />
        Security & Privacy Measures
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityFeatures.map((feature) => (
          <div key={feature.title} className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <feature.icon className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
