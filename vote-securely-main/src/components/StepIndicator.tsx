import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RegistrationStep } from '@/types/voter';

const steps: { key: RegistrationStep; label: string }[] = [
  { key: 'registration', label: 'Registration' },
  { key: 'identity', label: 'Identity' },
  { key: 'biometric', label: 'Biometric' },
  { key: 'duplicate', label: 'AI Check' },
  { key: 'mobility', label: 'Mobility' },
  { key: 'success', label: 'Complete' },
];

interface StepIndicatorProps {
  currentStep: RegistrationStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                    isCompleted && 'bg-success text-success-foreground',
                    isCurrent && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                    !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                <span
                  className={cn(
                    'text-xs mt-2 font-medium hidden sm:block',
                    isCurrent ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 rounded-full transition-all duration-300',
                    index < currentIndex ? 'bg-success' : 'bg-muted'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
