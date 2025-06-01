
export enum SocialPlatform {
  TWITTER = 'Twitter',
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram',
  LINKEDIN = 'LinkedIn',
}

export interface MetricDataPoint {
  date: string; // e.g., 'Jan', 'Feb', 'Mar' or '2023-01-01'
  value: number;
}

export interface EngagementDataPoint {
  name: string; // e.g., 'Likes', 'Comments', 'Shares' or Post Type
  value: number;
}

export interface Post {
  id: string;
  platform: SocialPlatform;
  content: string;
  author: string;
  avatarUrl: string;
  likes: number;
  comments: number;
  shares: number;
  date: string; // e.g., '3 hours ago', 'Yesterday'
  imageUrl?: string;
}

export interface OverallStats {
  followers: number;
  following: number;
  posts: number;
  engagementRate: number; // Percentage
  reach: number;
  impressions: number;
}

export interface PlatformData {
  overallStats: OverallStats;
  followerTrend: MetricDataPoint[];
  engagementBreakdown: EngagementDataPoint[]; // e.g., by type of interaction or post type
  recentPosts: Post[];
}

export interface MockDatabase {
  [key: string]: PlatformData; // Keyed by SocialPlatform enum values
}
