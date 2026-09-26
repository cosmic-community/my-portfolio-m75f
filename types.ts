export interface CosmicMediaObject {
  url: string;
  imgix_url: string;
}

export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export type ProjectType = 'Client Work' | 'Personal Project' | 'YouTube Tutorial';

export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    name?: string;
    icon?: string;
    category?: string;
    proficiency?: string;
  };
}

export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    short_description?: string;
    details?: string;
    featured_image?: CosmicMediaObject;
    screenshots?: CosmicMediaObject[];
    tech_stack?: Skill[];
    live_url?: string;
    github_url?: string;
    youtube_url?: string;
    project_type?: ProjectType | string;
    featured?: boolean;
  };
}

export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    company?: string;
    role?: string;
    company_logo?: CosmicMediaObject;
    employment_type?: string;
    start_date?: string;
    end_date?: string;
    current_position?: boolean;
    description?: string;
  };
}

export interface ContactInfo extends CosmicObject {
  type: 'contact-info';
  metadata: {
    full_name?: string;
    headline?: string;
    bio?: string;
    profile_photo?: CosmicMediaObject;
    email?: string;
    youtube_channel?: string;
    github?: string;
    linkedin?: string;
    available_for_freelance?: boolean;
  };
}