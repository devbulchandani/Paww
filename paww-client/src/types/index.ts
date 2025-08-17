// API Types
export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'REGISTRANT' | 'ADOPTER' | 'BOTH';
  city: string;
}

export interface Address {
  street?: string;
  locality?: string;
  city: string;
  state: string;
  pincode?: string;
}

export interface Dog {
  id: string;
  name: string;
  description?: string;
  age?: number;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  imageUrl?: string;
  address: Address;
  vaccinatedStatus: boolean;
  registrantName?: string;
  registrantPhone?: string;
}

// Form Types
export interface LoginForm {
  phone: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  phone: string;
  password: string;
  role: 'REGISTRANT' | 'ADOPTER' | 'BOTH';
  city: string;
}

export interface DogRegistrationForm {
  name: string;
  description?: string;
  age?: number;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  address: Address;
  vaccinatedStatus: boolean;
  image?: File;
}

export interface DogSearchParams {
  gender?: 'MALE' | 'FEMALE' | 'UNKNOWN';
  vaccinated?: boolean;
  maxAge?: number;
  state?: string;
  city?: string;
  locality?: string;
  street?: string;
  pincode?: string;
}

// API Response Types
export interface AuthResponse {
  token: string;
  userId: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    timestamp: string;
    path: string;
  };
}