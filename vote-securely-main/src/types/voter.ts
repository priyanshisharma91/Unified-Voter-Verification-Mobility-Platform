export interface VoterData {
  fullName: string;
  dateOfBirth: string;
  aadhaarNumber: string;
  voterId?: string;
  state: string;
  constituency: string;
  email: string;
  phone: string;
  consentGiven: boolean;
}

export interface VerificationStatus {
  identity: 'pending' | 'verifying' | 'verified' | 'failed';
  biometric: 'pending' | 'verifying' | 'verified' | 'failed';
  duplicate: 'pending' | 'scanning' | 'clear' | 'flagged';
}

export interface DuplicateCheckResult {
  status: 'clear' | 'flagged';
  confidenceScore: number;
  reason?: string;
  matchedRecords?: number;
}

export interface VerificationResult {
  verificationId: string;
  timestamp: string;
  status: 'success' | 'pending_review';
  voterData: VoterData;
}

export interface FlaggedCase {
  id: string;
  voterName: string;
  aadhaarLast4: string;
  state: string;
  constituency: string;
  confidenceScore: number;
  reason: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected' | 'manual_review';
}

export type RegistrationStep = 
  | 'registration'
  | 'identity'
  | 'biometric'
  | 'duplicate'
  | 'mobility'
  | 'success';
