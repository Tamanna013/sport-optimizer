export interface PlayerStats {
  battingAccuracy: number;
  bowlingSpeed: number;
  fieldingEfficiency: number;
  recentPerformance: {
    date: string;
    score: number;
  }[];
}

export interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder';
  stats: PlayerStats;
  rank: number;
}

export interface VideoAnalysis {
  id: string;
  url: string;
  insights: {
    batAngle: number;
    footPosition: string;
    timing: number;
  };
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  tutorialUrl?: string;
}
