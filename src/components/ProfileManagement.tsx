"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedCard } from './shared/AnimatedCard';
import { PlayerProfile } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfileManagementProps {
  profile: PlayerProfile | null | undefined;
}

export const ProfileManagement = ({ profile }: ProfileManagementProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'goals'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<PlayerProfile | null | undefined>(profile);
  
  const goals = [
    { id: '1', title: 'Improve batting average', target: 'From 35 to 45', progress: 60, deadline: '2023-12-31' },
    { id: '2', title: 'Increase bowling speed', target: 'From 130 to 140 km/h', progress: 40, deadline: '2023-11-15' },
    { id: '3', title: 'Perfect cover drive', target: '100 practice shots daily', progress: 75, deadline: '2023-10-30' },
  ];

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <AnimatedCard>
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Profile Sidebar */}
          <motion.div
            className="md:w-1/3 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20">
                {isEditing ? (
                  <div className="w-full h-full bg-blue-500/20 flex items-center justify-center cursor-pointer">
                    <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  profile?.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt={profile.name || 'Player Avatar'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      No Avatar
                    </div>
                  )
                )}
              </div>
              
              <motion.button
                className="absolute bottom-0 right-1/3 bg-blue-500 rounded-full p-2 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(!isEditing)}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isEditing ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  )}
                </svg>
              </motion.button>
            </div>
            
            <div className="text-center mb-6">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile?.name || ''}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="bg-white/10 border border-white/20 rounded px-3 py-2 text-center text-xl font-bold w-full mb-2"
                />
              ) : (
                <h2 className="text-2xl font-bold">{profile?.name || 'Player Name'}</h2>
              )}
              
              {isEditing ? (
                <select
                  value={editedProfile?.role || 'Batsman'}
                  onChange={(e) => setEditedProfile({...editedProfile, role: e.target.value as any})}
                  className="bg-white/10 border border-white/20 rounded px-3 py-1 text-center w-full"
                >
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                </select>
              ) : (
                <p className="text-white/70">{profile?.role || 'Role'}</p>
              )}
              
              <div className="mt-2 inline-block px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                Rank #{profile?.rank || 'N/A'}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm uppercase text-white/50 mb-1">Batting Accuracy</h3>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${profile?.stats?.battingAccuracy || 0}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="text-right text-sm mt-1">{profile?.stats?.battingAccuracy || 0}%</div>
              </div>
              
              <div>
                <h3 className="text-sm uppercase text-white/50 mb-1">Bowling Speed</h3>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(profile?.stats?.bowlingSpeed || 0) / 150 * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <div className="text-right text-sm mt-1">{profile?.stats?.bowlingSpeed || 0} km/h</div>
              </div>
              
              <div>
                <h3 className="text-sm uppercase text-white/50 mb-1">Fielding Efficiency</h3>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${profile?.stats?.fieldingEfficiency || 0}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
                <div className="text-right text-sm mt-1">{profile?.stats?.fieldingEfficiency || 0}%</div>
              </div>
            </div>
            
            {isEditing && (
              <motion.button
                className="w-full mt-6 py-2 bg-blue-500 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveProfile}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Save Profile
              </motion.button>
            )}
          </motion.div>
          
          {/* Main Content */}
          <motion.div
            className="md:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Tabs */}
            <div className="flex space-x-2 mb-6 border-b border-white/10 pb-2">
              {(['overview', 'history', 'goals'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-4 py-2 rounded-t-lg capitalize ${
                    activeTab === tab 
                      ? 'bg-white/10 border-b-2 border-blue-500' 
                      : 'hover:bg-white/5'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4">Overview</h3>
                  {/* Add Overview Content Here */}
                </motion.div>
              )}
              
              {activeTab === 'history' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4">Performance History</h3>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={profile?.performanceHistory || []}>
                        <Line type="monotone" dataKey="score" stroke="#8884d8" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'goals' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4">Goals</h3>
                  <div>
                    {goals?.length > 0 ? (
                      goals.map((goal) => (
                        <div key={goal.id} className="mb-4">
                          <h4 className="text-md font-semibold">{goal.title}</h4>
                          <div className="text-white/70 text-sm">{goal.target}</div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-blue-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${goal.progress}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                          <div className="text-right text-sm mt-1">{goal.progress}%</div>
                        </div>
                      ))
                    ) : (
                      <div>No goals data available.</div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </AnimatedCard>
    </div>
  );
};
