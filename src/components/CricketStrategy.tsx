"use client";
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { AnimatedCard } from './shared/AnimatedCard';

interface FieldPosition {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  role: string;
}

interface Strategy {
  name: string;
  description: string;
  fieldPositions: FieldPosition[];
  bowlingTips: string[];
}

export const CricketStrategy = () => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [activeStrategy, setActiveStrategy] = useState<'attacking' | 'defensive' | 'balanced'>('balanced');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showStrategyTips, setShowStrategyTips] = useState(false);
  
  // Predefined strategies
  const strategies: Record<'attacking' | 'defensive' | 'balanced', Strategy> = {
    attacking: {
      name: "Aggressive Field",
      description: "Designed to take wickets with close catchers and attacking positions",
      fieldPositions: [
        { id: '1', label: 'WK', x: 50, y: 85, color: '#EC4899', role: 'Wicket Keeper' },
        { id: '2', label: 'SL', x: 25, y: 70, color: '#EC4899', role: 'Slip' },
        { id: '3', label: 'P', x: 50, y: 15, color: '#EC4899', role: 'Bowler' },
        { id: '4', label: 'FS', x: 20, y: 40, color: '#EC4899', role: 'First Slip' },
        { id: '5', label: 'SS', x: 80, y: 40, color: '#EC4899', role: 'Second Slip' },
        { id: '6', label: 'G', x: 35, y: 30, color: '#EC4899', role: 'Gully' },
        { id: '7', label: 'C', x: 50, y: 35, color: '#EC4899', role: 'Cover' },
        { id: '8', label: 'M', x: 65, y: 30, color: '#EC4899', role: 'Mid-off' },
        { id: '9', label: 'E', x: 80, y: 60, color: '#EC4899', role: 'Extra Cover' },
        { id: '10', label: 'L', x: 20, y: 60, color: '#EC4899', role: 'Leg Slip' },
        { id: '11', label: 'S', x: 35, y: 50, color: '#EC4899', role: 'Short Leg' },
      ],
      bowlingTips: [
        "Bowl fuller lengths to induce drives",
        "Use yorkers as surprise deliveries",
        "Vary pace to create catching opportunities",
        "Target the stumps more frequently"
      ]
    },
    defensive: {
      name: "Defensive Field",
      description: "Focused on containing runs with spread field and boundary protection",
      fieldPositions: [
        { id: '1', label: 'WK', x: 50, y: 85, color: '#10B981', role: 'Wicket Keeper' },
        { id: '2', label: 'SL', x: 30, y: 70, color: '#10B981', role: 'Slip' },
        { id: '3', label: 'P', x: 50, y: 15, color: '#10B981', role: 'Bowler' },
        { id: '4', label: 'DP', x: 15, y: 25, color: '#10B981', role: 'Deep Point' },
        { id: '5', label: 'DM', x: 85, y: 25, color: '#10B981', role: 'Deep Mid-wicket' },
        { id: '6', label: 'LO', x: 15, y: 60, color: '#10B981', role: 'Long-on' },
        { id: '7', label: 'LF', x: 85, y: 60, color: '#10B981', role: 'Long-off' },
        { id: '8', label: 'TS', x: 50, y: 40, color: '#10B981', role: 'Third Man' },
        { id: '9', label: 'FG', x: 30, y: 40, color: '#10B981', role: 'Fine Leg' },
        { id: '10', label: 'MS', x: 70, y: 40, color: '#10B981', role: 'Mid-on' },
        { id: '11', label: 'C', x: 50, y: 60, color: '#10B981', role: 'Cover' },
      ],
      bowlingTips: [
        "Bowl to your field settings",
        "Target areas outside off stump",
        "Use slower balls to induce mistimed shots",
        "Bowl back of a length to restrict scoring"
      ]
    },
    balanced: {
      name: "Balanced Field",
      description: "Versatile setup that can adapt to both attacking and defensive needs",
      fieldPositions: [
        { id: '1', label: 'WK', x: 50, y: 85, color: '#3B82F6', role: 'Wicket Keeper' },
        { id: '2', label: 'SL', x: 30, y: 70, color: '#3B82F6', role: 'Slip' },
        { id: '3', label: 'P', x: 50, y: 15, color: '#3B82F6', role: 'Bowler' },
        { id: '4', label: 'FS', x: 20, y: 40, color: '#3B82F6', role: 'First Slip' },
        { id: '5', label: 'SS', x: 80, y: 40, color: '#3B82F6', role: 'Second Slip' },
        { id: '6', label: 'M', x: 50, y: 50, color: '#3B82F6', role: 'Mid-off' },
        { id: '7', label: 'C', x: 50, y: 35, color: '#3B82F6', role: 'Cover' },
        { id: '8', label: 'E', x: 70, y: 60, color: '#3B82F6', role: 'Extra Cover' },
        { id: '9', label: 'G', x: 30, y: 30, color: '#3B82F6', role: 'Gully' },
        { id: '10', label: 'L', x: 20, y: 60, color: '#3B82F6', role: 'Leg Slip' },
        { id: '11', label: 'S', x: 80, y: 60, color: '#3B82F6', role: 'Short Leg' },
      ],
      bowlingTips: [
        "Mix up your lengths and lines",
        "Use the crease wisely to change angles",
        "Bowl to the batter's weaknesses",
        "Communicate with your captain about field changes"
      ]
    }
  };

  const [fieldPositions, setFieldPositions] = useState<FieldPosition[]>(strategies.balanced.fieldPositions);

  const handleStrategyChange = (strategy: 'attacking' | 'defensive' | 'balanced') => {
    setActiveStrategy(strategy);
    setFieldPositions(strategies[strategy].fieldPositions);
    setSelectedPlayer(null);
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    if (!fieldRef.current) return;
    
    const rect = fieldRef.current.getBoundingClientRect();
    const relativeX = ((x - rect.left) / rect.width) * 100;
    const relativeY = ((y - rect.top) / rect.height) * 100;
    
    // Ensure positions stay within bounds
    const boundedX = Math.max(5, Math.min(95, relativeX));
    const boundedY = Math.max(5, Math.min(95, relativeY));
    
    setFieldPositions(positions => 
      positions.map(pos => 
        pos.id === id ? { ...pos, x: boundedX, y: boundedY } : pos
      )
    );
  };

  return (
    <div className="p-6">
      <AnimatedCard>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Cricket Strategy Planner</h2>
            
            <div className="flex space-x-2">
              {(['attacking', 'balanced', 'defensive'] as const).map((strategy) => (
                <motion.button
                  key={strategy}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    activeStrategy === strategy 
                      ? `bg-${strategy === 'attacking' ? 'pink' : strategy === 'defensive' ? 'green' : 'blue'}-500 text-white` 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStrategyChange(strategy)}
                >
                  {strategy}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cricket Field */}
            <div className="lg:col-span-2">
              <div 
                ref={fieldRef}
                className="relative w-full aspect-[4/3] bg-gradient-to-b from-green-700 to-green-600 rounded-xl overflow-hidden border-4 border-white/10"
              >
                {/* Cricket pitch */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-3/4 bg-yellow-100/80 rounded-sm">
                  {/* Crease lines */}
                  <div className="absolute top-[10%] w-full h-[2px] bg-white"></div>
                  <div className="absolute bottom-[10%] w-full h-[2px] bg-white"></div>
                </div>
                
                {/* Boundary circle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-2 border-white/40 rounded-full"></div>
                
                {/* 30-yard circle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border-2 border-dashed border-white/40 rounded-full"></div>
                
                {/* Field positions */}
                {fieldPositions.map((position) => (
                  <motion.div
                    key={position.id}
                    className={`absolute cursor-move ${selectedPlayer === position.id ? 'ring-2 ring-white' : ''}`}
                    style={{ 
                      left: `${position.x}%`, 
                      top: `${position.y}%`,
                      backgroundColor: position.color,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      boxShadow: selectedPlayer === position.id ? '0 0 0 4px rgba(255,255,255,0.5)' : 'none'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    drag
                    dragConstraints={fieldRef}
                    onDragEnd={(_, info) => {
                      handleDragEnd(
                        position.id, 
                        info.point.x, 
                        info.point.y
                      );
                    }}
                    onClick={() => setSelectedPlayer(position.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs -translate-x-1/2 -translate-y-1/2"
                  >
                    {position.label}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 text-center text-sm text-white/70">
                Drag players to adjust field positions
              </div>
            </div>
            
            {/* Strategy Info */}
            <div className="space-y-6">
              <motion.div
                className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={activeStrategy} // Re-animate when strategy changes
              >
                <h3 className="text-xl font-bold mb-2">{strategies[activeStrategy].name}</h3>
                <p className="text-white/80 mb-4">{strategies[activeStrategy].description}</p>
                
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Bowling Strategy</h4>
                  <motion.button
                    className="text-sm text-blue-400 flex items-center"
                    onClick={() => setShowStrategyTips(!showStrategyTips)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showStrategyTips ? 'Hide Tips' : 'Show Tips'}
                    <svg 
                      className={`w-4 h-4 ml-1 transform transition-transform ${showStrategyTips ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: showStrategyTips ? 'auto' : 0,
                    opacity: showStrategyTips ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-2 space-y-2">
                    {strategies[activeStrategy].bowlingTips.map((tip, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2"></span>
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
              
              {/* Selected Player Info */}
              {selectedPlayer && (
                <motion.div
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <h3 className="font-bold mb-2">Selected Position</h3>
                  
                  {(() => {
                    const player = fieldPositions.find(p => p.id === selectedPlayer);
                    if (!player) return null;
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                            style={{ backgroundColor: player.color }}
                          >
                            {player.label}
                          </div>
                          <div>
                            <div className="font-medium">{player.role}</div>
                            <div className="text-sm text-white/70">Position: {player.x.toFixed(1)}%, {player.y.toFixed(1)}%</div>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <button 
                            className="text-sm text-red-400 hover:text-red-300"
                            onClick={() => setSelectedPlayer(null)}
                          >
                            Clear selection
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
              
              {/* Opponent Analysis */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-bold mb-3">Opponent Weaknesses</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Outside Edge</span>
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Short Ball</span>
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-amber-500"
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Spin</span>
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: '40%' }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Strategy Presets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              className="bg-gradient-to-br from-pink-500/20 to-pink-700/20 p-4 rounded-xl border border-pink-500/30 cursor-pointer"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(236,72,153,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStrategyChange('attacking')}
            >
              <h3 className="font-bold text-pink-400 mb-1">Attacking</h3>
              <p className="text-sm text-white/70">Aggressive field with close catchers</p>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 p-4 rounded-xl border border-blue-500/30 cursor-pointer"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(59,130,246,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStrategyChange('balanced')}
            >
              <h3 className="font-bold text-blue-400 mb-1">Balanced</h3>
              <p className="text-sm text-white/70">Versatile field for all situations</p>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-green-700/20 p-4 rounded-xl border border-green-500/30 cursor-pointer"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(16,185,129,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStrategyChange('defensive')}
            >
              <h3 className="font-bold text-green-400 mb-1">Defensive</h3>
              <p className="text-sm text-white/70">Spread field to contain runs</p>
            </motion.div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};
