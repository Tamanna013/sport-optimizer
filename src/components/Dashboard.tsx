"use client";
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AnimatedCard } from './shared/AnimatedCard';
import { PlayerStats } from '../types';

interface DashboardProps {
  playerStats?: PlayerStats;
}

const defaultStats: PlayerStats = {
  battingAccuracy: 0,
  bowlingSpeed: 0,
  fieldingEfficiency: 0,
  recentPerformance: [
    { date: 'Jan', score: 0 },
    { date: 'Feb', score: 0 },
    { date: 'Mar', score: 0 },
    { date: 'Apr', score: 0 },
  ]
};

export const Dashboard = ({ playerStats = defaultStats }: DashboardProps) => {
  const performance = playerStats?.recentPerformance || defaultStats.recentPerformance;
  const accuracy = playerStats?.battingAccuracy ?? defaultStats.battingAccuracy;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <AnimatedCard delay={0.1}>
        <h3 className="text-xl font-bold mb-4">Batting Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={performance}>
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ fill: '#8884d8' }}
            />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </AnimatedCard>

      <AnimatedCard delay={0.2}>
        <motion.div
          className="radial-progress-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-blue-100 stroke-current"
                strokeWidth="10"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blue-500 stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                style={{
                  strokeDasharray: `${2 * Math.PI * 40}`,
                  strokeDashoffset: `${2 * Math.PI * 40 * (1 - accuracy / 100)}`,
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{accuracy}%</span>
            </div>
          </div>
        </motion.div>
      </AnimatedCard>

      {/* Quick Links */}
      <AnimatedCard delay={0.3}>
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="space-y-4">
          {['Video Analysis', 'Performance Review', 'Training Schedule'].map((action, index) => (
            <motion.button
              key={action}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {action}
            </motion.button>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};
