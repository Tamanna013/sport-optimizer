"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AnimatedCard } from './shared/AnimatedCard';

export const RealTimeFeedback = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    bowlingSpeed: 0,
    footPlacement: 0,
    bodyAlignment: 0,
    wristPosition: 0,
  });
  const [alerts, setAlerts] = useState<{id: string, message: string, type: 'warning' | 'info' | 'success'}[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isRecording) return;
    
    const interval = setInterval(() => {
      setFeedbackData({
        bowlingSpeed: Math.floor(120 + Math.random() * 20),
        footPlacement: Math.floor(60 + Math.random() * 40),
        bodyAlignment: Math.floor(70 + Math.random() * 30),
        wristPosition: Math.floor(50 + Math.random() * 50),
      });
      
      setElapsedTime(prev => prev + 1);
      
      // Randomly add alerts
      if (Math.random() > 0.8) {
        const alertTypes = [
          { message: 'Foot placement needs adjustment', type: 'warning' },
          { message: 'Great wrist position!', type: 'success' },
          { message: 'Watch your follow-through', type: 'info' },
        ];
        
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        setAlerts(prev => [
          { id: Date.now().toString(), message: randomAlert.message, type: randomAlert.type as any },
          ...prev.slice(0, 4)
        ]);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setElapsedTime(0);
      setAlerts([]);
    }
    setIsRecording(!isRecording);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6">
      <AnimatedCard>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Real-time Feedback</h2>
          
          <div className="flex items-center space-x-4">
            <div className="text-lg font-mono">{formatTime(elapsedTime)}</div>
            
            <motion.button
              className={`px-4 py-2 rounded-lg font-medium ${
                isRecording ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
            >
              {isRecording ? 'Stop' : 'Start'} Recording
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Live Metrics */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-4">Live Metrics</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Bowling Speed</span>
                  <span className="font-mono">{feedbackData.bowlingSpeed} km/h</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    animate={{ width: `${(feedbackData.bowlingSpeed / 150) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>Foot Placement</span>
                  <span className="font-mono">{feedbackData.footPlacement}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    animate={{ width: `${feedbackData.footPlacement}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>Body Alignment</span>
                  <span className="font-mono">{feedbackData.bodyAlignment}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-purple-500"
                    animate={{ width: `${feedbackData.bodyAlignment}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>Wrist Position</span>
                  <span className="font-mono">{feedbackData.wristPosition}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500"
                    animate={{ width: `${feedbackData.wristPosition}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Posture Visualization */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex items-center justify-center">
            <div className="relative w-48 h-64">
              {/* Simple stick figure visualization */}
              <motion.svg
                viewBox="0 0 100 140"
                className="w-full h-full"
                animate={{
                  rotate: isRecording ? [0, 5, 0, -5, 0] : 0
                }}
                transition={{
                  duration: 2,
                  repeat: isRecording ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {/* Head */}
                <circle cx="50" cy="20" r="10" fill="rgba(255,255,255,0.7)" />
                
                {/* Body */}
                <line x1="50" y1="30" x2="50" y2="70" stroke="rgba(255,255,255,0.7)" strokeWidth="4" />
                
                {/* Arms */}
                <motion.line
                  x1="50" y1="45" x2="30" y2="60"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="4"
                  animate={{
                    x2: isRecording ? [30, 20, 30] : 30,
                    y2: isRecording ? [60, 50, 60] : 60
                  }}
                  transition={{
                    duration: 1,
                    repeat: isRecording ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                />
                <motion.line
                  x1="50" y1="45" x2="70" y2="60"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="4"
                  animate={{
                    x2: isRecording ? [70, 80, 70] : 70,
                    y2: isRecording ? [60, 50, 60] : 60
                  }}
                  transition={{
                    duration: 1,
                    repeat: isRecording ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Legs */}
                <motion.line
                  x1="50" y1="70" x2="30" y2="100"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="4"
                  animate={{
                    x2: isRecording ? [30, 40, 30] : 30
                  }}
                  transition={{
                    duration: 1,
                    repeat: isRecording ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                />
                <motion.line
                  x1="50" y1="70" x2="70" y2="100"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="4"
                  animate={{
                    x2: isRecording ? [70, 60, 70] : 70
                  }}
                  transition={{
                    duration: 1,
                    repeat: isRecording ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Highlight problem areas conditionally */}
                {feedbackData.footPlacement < 70 && (
                  <motion.circle
                    cx="30" cy="100" r="5"
                    fill="rgba(255,0,0,0.5)"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
                
                {feedbackData.wristPosition < 60 && (
                  <motion.circle
                    cx="30" cy="60" r="5"
                    fill="rgba(255,0,0,0.5)"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.svg>
              
              {/* Feedback indicators */}
              {isRecording && (
                <>
                  <motion.div
                    className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 animate-ping opacity-75" />
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Alerts and Feedback */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-medium mb-4">Real-time Alerts</h3>
          
          <div className="space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  className={`p-3 rounded-lg ${
                    alert.type === 'warning' ? 'bg-amber-500/20 border-l-4 border-amber-500' :
                    alert.type === 'success' ? 'bg-green-500/20 border-l-4 border-green-500' :
                    'bg-blue-500/20 border-l-4 border-blue-500'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {alert.message}
                </motion.div>
              ))
            ) : (
              <div className="text-center text-white/50 py-4">
                {isRecording ? 'Monitoring your technique...' : 'Start recording to see feedback'}
              </div>
            )}
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};
