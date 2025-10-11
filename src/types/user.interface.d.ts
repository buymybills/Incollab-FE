// Nested interfaces for complex objects
interface Country {
    id?: string | number;
    name?: string;
    code?: string;
  }
  
  interface City {
    id?: string | number;
    name?: string;
    state?: string;
  }
  
  interface Location {
    country?: Country;
    city?: City;
  }
  
  interface Contact {
    whatsappNumber?: string | null;
    isWhatsappVerified?: boolean;
  }
  
  interface Verification {
    isPhoneVerified?: boolean;
    isProfileCompleted?: boolean;
    isWhatsappVerified?: boolean;
  }

  interface verificationStatus{
    description?: string;
    message?: string;
    status?: string;
  }
  
  interface ProfileCompletion {
    isCompleted?: boolean;
    completionPercentage?: number;
    missingFields?: string[];
    nextSteps?: string[];
  }
  
  interface SocialLinks {
    [key: string]: string | undefined;
    instagram?: string;
    youtube?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  }
  
  interface InstagramCosts {
    reel?: number;
    story?: number;
    post?: number;
  }

  interface FacebookCosts {
    post?: number;
    story?: number;
  }

  interface YoutubeCosts {
    longVideo?: number;
    short?: number;
  }

  interface LinkedinCosts {
    post?: number;
    article?: number;
  }

  interface TwitterCosts {
    post?: number;
    thread?: number;
  }
  
  interface CollaborationCosts {
    instagram?: InstagramCosts;
    facebook?: FacebookCosts;
    youtube?: YoutubeCosts;
    linkedin?: LinkedinCosts;
    twitter?: TwitterCosts;
  }
  
  interface Niche {
    id?: number;
    name?: string;
    icon?: string;
    description?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }

  interface CompanyType {
    id?: number;
    name?: string;
    description?: string;
  }

  interface CompanyInfo {
    legalEntityName?: string;
    companyType?: CompanyType | string | null;
    foundedYear?: number | string | null;
    headquarterCountry?: Country | null;
    headquarterCountryId?: string | null;
    headquarterCity?: City | null;
    headquarterCityId?: string | null;
    gstNumber?: string | null;
    panNumber?: string | null;
    website?: string | null;
    websiteUrl?: string | null;
    activeRegions?: string[] | string | null;
  }

  interface ContactInfo {
    pocName?: string;
    pocDesignation?: string;
    pocEmailId?: string;
    pocContactNumber?: string;
    brandEmailId?: string | null;
  }

  interface ProfileMedia {
    profileImage?: string | null;
    profileBanner?: string | null;
  }

  interface Documents {
    incorporationCertificate?: string | null;
    gstCertificate?: string | null;
    panCard?: string | null;
  }

  interface Metrics {
    followers?: number;
    following?: number;
    posts?: number;
    campaigns?: number;
  }

  // Main User interface
  export interface User {
    id?: number;
    name?: string;
    username?: string;
    bio?: string;
    profileImage?: string;
    profileBanner?: string;
    profileHeadline?: string;
    phone?: string;
    email?: string;
    token?: string; // Keep token if needed for authentication
    location?: Location;
    contact?: Contact;
    verification?: Verification;
    profileCompletion?: ProfileCompletion;
    socialLinks?: SocialLinks;
    collaborationCosts?: CollaborationCosts;
    niches?: Niche[];
    createdAt?: string;
    updatedAt?: string;
    // Brand-specific fields
    brandName?: string;
    brandBio?: string;
    companyInfo?: CompanyInfo;
    contactInfo?: ContactInfo;
    profileMedia?: ProfileMedia;
    documents?: Documents;
    metrics?: Metrics;
    isActive?: boolean;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    verificationStatus?: verificationStatus;
    customNiches?: string[];
  }