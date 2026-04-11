export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface ContactChannel {
  readonly icon: string;
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

export interface PersonalInfo {
  readonly name: string;
  readonly role: string;
  readonly bio: readonly string[];
  readonly socialLinks: readonly SocialLink[];
  readonly stats: readonly Stat[];
  readonly contactChannels: readonly ContactChannel[];
}
