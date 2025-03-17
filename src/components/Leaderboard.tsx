"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedCard } from './shared/AnimatedCard';
import { PlayerProfile } from '../types';

interface LeaderboardProps {
  players?: PlayerProfile[];
}

const defaultPlayers: PlayerProfile[] = [];

export const Leaderboard = ({ players = defaultPlayers }: LeaderboardProps) => {
  const [filter, setFilter] = useState<'all' | 'batting' | 'bowling' | 'fielding'>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'name'>('rank');
  
  const filteredPlayers = Array.isArray(players) 
    ? [...players].sort((a, b) => {
        if (sortBy === 'rank') return a.rank - b.rank;
        return a.name.localeCompare(b.name);
      })
    : [];

  return (
    <div className="p-6">
      <AnimatedCard>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Leaderboard</h2>
          
          <div className="flex space-x-2">
            <select
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm backdrop-blur-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">All Skills</option>
              <option value="batting">Batting</option>
              <option value="bowling">Bowling</option>
              <option value="fielding">Fielding</option>
            </select>
            
            <select
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm backdrop-blur-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="rank">Sort by Rank</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredPlayers.length > 0 ? (
            <>
              {/* Top 3 Players Highlight */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {filteredPlayers.slice(0, 3).map((player, index) => (
                  <motion.div
                    key={player.id}
                    className={`relative p-6 rounded-xl overflow-hidden ${
                      index === 0 
                        ? 'bg-gradient-to-br from-yellow-300/20 to-yellow-600/20 border border-yellow-500/30' 
                        : index === 1 
                          ? 'bg-gradient-to-br from-gray-300/20 to-gray-500/20 border border-gray-400/30' 
                          : 'bg-gradient-to-br from-amber-700/20 to-amber-900/20 border border-amber-800/30'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute top-2 right-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-800'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 overflow-hidden">
                        <img 
                          src={player.avatar} 
                          alt={player.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg">{player.name}</h3>
                        <p className="text-sm opacity-80">{player.role}</p>
                        
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="text-xs px-2 py-0.5 rounded-full bg-white/10">
                            {filter === 'all' || filter === 'batting' 
                              ? `Batting: ${player.stats.battingAccuracy}%` 
                              : filter === 'bowling' 
                                ? `Bowling: ${player.stats.bowlingSpeed} km/h`
                                : `Fielding: ${player.stats.fieldingEfficiency}%`
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Rest of the Players */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left">Rank</th>
                      <th className="px-4 py-3 text-left">Player</th>
                      <th className="px-4 py-3 text-left">Role</th>
                      <th className="px-4 py-3 text-left">Stats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlayers.slice(3).map((player, index) => (
                      <motion.tr
                        key={player.id}
                        className="border-b border-white/5 hover:bg-white/5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                      >
                        <td className="px-4 py-3">{player.rank}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden">
                              <img 
                                src={player.avatar} 
                                alt={player.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span>{player.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{player.role}</td>
                        <td className="px-4 py-3">
                          {filter === 'all' || filter === 'batting' 
                            ? `Batting: ${player.stats.battingAccuracy}%` 
                            : filter === 'bowling' 
                              ? `Bowling: ${player.stats.bowlingSpeed} km/h`
                              : `Fielding: ${player.stats.fieldingEfficiency}%`
                          }
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-medium mb-2">No players available</h3>
                <p className="text-white/60">Player data will appear here once available</p>
              </motion.div>
            </div>
          )}
        </div>
      </AnimatedCard>
    </div>
  );
};
