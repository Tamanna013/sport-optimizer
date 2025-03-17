"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedCard } from './shared/AnimatedCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Legend 
} from 'recharts';

interface PlayerStats {
  recentPerformance: { date: string; score: number }[];
}

interface PerformanceInsightsProps {
  playerStats: PlayerStats;
}

export const PerformanceInsights = ({ playerStats }: PerformanceInsightsProps) => {
  const [activeTab, setActiveTab] = useState<'batting' | 'bowling' | 'fielding'>('batting');
  
  const radarData = [
    { subject: 'Timing', A: 85, fullMark: 100 },
    { subject: 'Footwork', A: 70, fullMark: 100 },
    { subject: 'Balance', A: 80, fullMark: 100 },
    { subject: 'Power', A: 90, fullMark: 100 },
    { subject: 'Placement', A: 75, fullMark: 100 },
  ];

  const strengthsAndWeaknesses = {
    batting: {
      strengths: ['Cover drive execution', 'Pull shot timing'],
      weaknesses: ['Playing against spin', 'Footwork on bouncy pitches']
    },
    bowling: {
      strengths: ['Yorker accuracy', 'Swing control'],
      weaknesses: ['Slower ball variations', 'Length consistency']
    },
    fielding: {
      strengths: ['Ground fielding', 'Direct hits'],
      weaknesses: ['High catches', 'Throwing accuracy']
    }
  };

  return (
    <div className="p-6">
      <AnimatedCard>
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-6">
            {(['batting', 'bowling', 'fielding'] as const).map((tab) => (
              <motion.button
                key={tab}
                className={`px-4 py-2 rounded-lg capitalize ${
                  activeTab === tab 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4 capitalize">{activeTab} Skills Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid stroke="#e0e0e0" />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Strengths and Weaknesses */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">Strengths & Areas to Improve</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-400 mb-2">Strengths</h4>
                  <ul className="space-y-2">
                    {strengthsAndWeaknesses[activeTab].strengths.map((strength, index) => (
                      <motion.li
                        key={strength}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        {strength}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-amber-400 mb-2">Areas to Improve</h4>
                  <ul className="space-y-2">
                    {strengthsAndWeaknesses[activeTab].weaknesses.map((weakness, index) => (
                      <motion.li
                        key={weakness}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                        {weakness}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Performance Trend */}
          {playerStats?.recentPerformance && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={playerStats.recentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="score" 
                    fill="url(#colorGradient)" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>
      </AnimatedCard>
    </div>
  );
};
