"use client";
import { useState } from 'react';
import { Hero } from '../components/Hero';
import { Dashboard } from '../components/Dashboard';
import { VideoAnalysis } from '../components/VideoAnalysis';
import { PerformanceInsights } from '../components/PerformanceInsights';
import { Recommendations } from '../components/Recommendations';
import { Leaderboard } from '../components/Leaderboard';
import { ProfileManagement } from '../components/ProfileManagement';
import { RealTimeFeedback } from '../components/RealTimeFeedback';
import { CricketStrategy } from '../components/CricketStrategy';
import { PlayerProfile, PlayerStats, Recommendation } from '../types';

// Sample data
const samplePlayerStats: PlayerStats = {
  battingAccuracy: 78,
  bowlingSpeed: 135,
  fieldingEfficiency: 82,
  recentPerformance: [
    { date: 'Jan', score: 45 },
    { date: 'Feb', score: 52 },
    { date: 'Mar', score: 38 },
    { date: 'Apr', score: 65 },
    { date: 'May', score: 72 },
  ]
};

const sampleProfile: PlayerProfile = {
  id: '1',
  name: 'Virat Kohli',
  avatar: 'https://placehold.co/200x200/3B82F6/FFFFFF/png?text=VK',
  role: 'Batsman',
  stats: samplePlayerStats,
  rank: 3
};

const samplePlayers: PlayerProfile[] = [
  sampleProfile,
  {
    id: '2',
    name: 'Jasprit Bumrah',
    avatar: 'https://placehold.co/200x200/10B981/FFFFFF/png?text=JB',
    role: 'Bowler',
    stats: {
      battingAccuracy: 35,
      bowlingSpeed: 145,
      fieldingEfficiency: 75,
      recentPerformance: [
        { date: 'Jan', score: 2 },
        { date: 'Feb', score: 5 },
        { date: 'Mar', score: 0 },
        { date: 'Apr', score: 8 },
        { date: 'May', score: 12 },
      ]
    },
    rank: 1
  },
  {
    id: '3',
    name: 'Ravindra Jadeja',
    avatar: 'https://placehold.co/200x200/EC4899/FFFFFF/png?text=RJ',
    role: 'All-rounder',
    stats: {
      battingAccuracy: 65,
      bowlingSpeed: 125,
      fieldingEfficiency: 95,
      recentPerformance: [
        { date: 'Jan', score: 35 },
        { date: 'Feb', score: 42 },
        { date: 'Mar', score: 28 },
        { date: 'Apr', score: 55 },
        { date: 'May', score: 48 },
      ]
    },
    rank: 2
  },
  {
    id: '4',
    name: 'Rohit Sharma',
    avatar: 'https://placehold.co/200x200/8B5CF6/FFFFFF/png?text=RS',
    role: 'Batsman',
    stats: {
      battingAccuracy: 82,
      bowlingSpeed: 110,
      fieldingEfficiency: 78,
      recentPerformance: [
        { date: 'Jan', score: 55 },
        { date: 'Feb', score: 72 },
        { date: 'Mar', score: 48 },
        { date: 'Apr', score: 85 },
        { date: 'May', score: 62 },
      ]
    },
    rank: 4
  },
];

const sampleRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Improve your backlift',
    description: 'Work on raising your bat higher for better cover drives. This will help you generate more power and control in your shots.',
    priority: 'high',
    tutorialUrl: '#'
  },
  {
    id: '2',
    title: 'Increase wrist rotation',
    description: 'Practice wrist exercises to enhance spin bowling technique. Focus on the snap at the point of release.',
    priority: 'medium',
    tutorialUrl: '#'
  },
  {
    id: '3',
    title: 'Footwork drills',
    description: 'Improve your positioning against fast bowlers with these specialized drills.',
    priority: 'low',
    tutorialUrl: '#'
  }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">Sports Optimizer</div>
            <div className="hidden md:flex space-x-4">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'video', label: 'Video Analysis' },
                { id: 'performance', label: 'Performance' },
                { id: 'strategy', label: 'Strategy' },
                { id: 'profile', label: 'Profile' }
              ].map((item) => (
                <button
                  key={item.id}
                  className={`px-3 py-2 rounded-md ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-16">
        {activeSection === 'hero' && <Hero />}
        
        {activeSection === 'dashboard' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
              <Dashboard playerStats={samplePlayerStats} />
            </div>
          </section>
        )}
        
        {activeSection === 'video' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold mb-8">Video Analysis</h1>
              <VideoAnalysis />
            </div>
          </section>
        )}
        
        {activeSection === 'performance' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold mb-8">Performance Insights</h1>
              <PerformanceInsights playerStats={samplePlayerStats} />
              <div className="mt-12">
                <Recommendations recommendations={sampleRecommendations} />
              </div>
              <div className="mt-12">
                <Leaderboard players={samplePlayers} />
              </div>
            </div>
          </section>
        )}
        
        {activeSection === 'strategy' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold mb-8">Cricket Strategy</h1>
              <CricketStrategy />
              <div className="mt-12">
                <RealTimeFeedback />
              </div>
            </div>
          </section>
        )}
        
        {activeSection === 'profile' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold mb-8">Player Profile</h1>
              <ProfileManagement profile={sampleProfile} />
            </div>
          </section>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-lg font-bold mb-4 md:mb-0">Sports Optimizer</div>
            <div className="text-sm text-gray-400">© 2023 Sports Optimizer. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
