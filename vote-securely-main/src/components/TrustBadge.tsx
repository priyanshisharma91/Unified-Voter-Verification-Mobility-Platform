import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

interface TrustBadgeProps {
  variant: 'secure' | 'encrypted' | 'privacy' | 'verified';
  size?: 'sm' | 'md';
}

const badgeConfig = {
  secure: {
    icon: Shield,
    text: 'Secure Platform',
    description: 'Government-grade security',
  },
  encrypted: {
    icon: Lock,
    text: 'End-to-End Encrypted',
    description: 'Your data is protected',
  },
  privacy: {
    icon: Eye,
    text: 'Privacy First',
    description: 'No raw biometric data stored',
  },
  verified: {
    icon: CheckCircle,
    text: 'Verified',
    description: 'Identity confirmed',
  },
};

export function TrustBadge({ variant, size = 'md' }: TrustBadgeProps) {
  const config = badgeConfig[variant];
  const Icon = config.icon;

  return (
    <div className={`trust-badge ${size === 'sm' ? 'text-xs px-2 py-1' : ''}`}>
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      <span>{config.text}</span>
    </div>
  );
}

export function TrustIndicators() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <TrustBadge variant="secure" />
      <TrustBadge variant="encrypted" />
      <TrustBadge variant="privacy" />
    </div>
  );
}
