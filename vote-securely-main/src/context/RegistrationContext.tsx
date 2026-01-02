import React, { createContext, useContext, useState, ReactNode } from 'react';
import { VoterData, VerificationStatus, RegistrationStep, DuplicateCheckResult, VerificationResult } from '@/types/voter';

interface RegistrationContextType {
  voterData: VoterData;
  setVoterData: React.Dispatch<React.SetStateAction<VoterData>>;
  verificationStatus: VerificationStatus;
  setVerificationStatus: React.Dispatch<React.SetStateAction<VerificationStatus>>;
  currentStep: RegistrationStep;
  setCurrentStep: React.Dispatch<React.SetStateAction<RegistrationStep>>;
  duplicateResult: DuplicateCheckResult | null;
  setDuplicateResult: React.Dispatch<React.SetStateAction<DuplicateCheckResult | null>>;
  verificationResult: VerificationResult | null;
  setVerificationResult: React.Dispatch<React.SetStateAction<VerificationResult | null>>;
  resetRegistration: () => void;
}

const initialVoterData: VoterData = {
  fullName: '',
  dateOfBirth: '',
  aadhaarNumber: '',
  voterId: '',
  state: '',
  constituency: '',
  email: '',
  phone: '',
  consentGiven: false,
};

const initialVerificationStatus: VerificationStatus = {
  identity: 'pending',
  biometric: 'pending',
  duplicate: 'pending',
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [voterData, setVoterData] = useState<VoterData>(initialVoterData);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(initialVerificationStatus);
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('registration');
  const [duplicateResult, setDuplicateResult] = useState<DuplicateCheckResult | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const resetRegistration = () => {
    setVoterData(initialVoterData);
    setVerificationStatus(initialVerificationStatus);
    setCurrentStep('registration');
    setDuplicateResult(null);
    setVerificationResult(null);
  };

  return (
    <RegistrationContext.Provider
      value={{
        voterData,
        setVoterData,
        verificationStatus,
        setVerificationStatus,
        currentStep,
        setCurrentStep,
        duplicateResult,
        setDuplicateResult,
        verificationResult,
        setVerificationResult,
        resetRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
