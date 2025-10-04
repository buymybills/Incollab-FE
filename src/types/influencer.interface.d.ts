export interface City {
  id: number;
  name: string;
  state: string;
  tier: number;
}

export interface Niche {
  id: number;
  name: string;
}

export interface CollaborationCosts {
  instagram?: {
    reel?: string;
    story?: string;
    post?: string;
  };
  facebook?: {
    post?: string;
    story?: string;
  };
  youtube?: {
    video?: string;
    shorts?: string;
  };
  linkedin?: {
    post?: string;
    article?: string;
  };
  twitter?: {
    post?: string;
    thread?: string;
  };
}

export interface Influencer {
  id: number;
  name: string;
  username: string;
  profileImage: string;
  bio: string;
  city: City;
  collaborationCosts: CollaborationCosts;
  createdAt: string;
  facebookUrl: string;
  gender: string;
  instagramUrl: string;
  linkedinUrl: string;
  niches: Niche[];
  profileHeadline: string;
  twitterUrl: string;
  youtubeUrl: string;
  isVerified?: boolean;
}
