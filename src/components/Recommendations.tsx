"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedCard } from './shared/AnimatedCard';

interface RecommendationsProps {
  recommendations?: Recommendation[];
}

const defaultRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Improve your backlift',
    description: 'Work on raising your bat higher for better cover drives.',
    priority: 'high',
    tutorialUrl: '#'
  },
  {
    id: '2',
    title: 'Increase wrist rotation',
    description: 'Practice wrist exercises to enhance spin bowling technique.',
    priority: 'medium',
    tutorialUrl: '#'
  },
  {
    id: '3',
    title: 'Footwork drills',
    description: 'Improve your positioning against fast bowlers.',
    priority: 'low',
    tutorialUrl: '#'
  }
];

export const Recommendations = ({ recommendations = defaultRecommendations }: RecommendationsProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const safeRecommendations = Array.isArray(recommendations) ? recommendations : defaultRecommendations;
  
  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-amber-500',
    low: 'bg-green-500'
  };

  return (
    <div className="p-6">
      <AnimatedCard>
        <h2 className="text-2xl font-bold mb-6">Personalized Recommendations</h2>
        
        <div className="space-y-4">
          {safeRecommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div 
                className="p-4 cursor-pointer flex justify-between items-center"
                onClick={() => setExpandedId(expandedId === recommendation.id ? null : recommendation.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${priorityColors[recommendation.priority]}`}></div>
                  <h3 className="font-medium">{recommendation.title}</h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === recommendation.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </div>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedId === recommendation.id ? 'auto' : 0,
                  opacity: expandedId === recommendation.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 border-t border-white/10">
                  <p className="text-sm mb-4">{recommendation.description}</p>
                  
                  {recommendation.tutorialUrl && (
                    <motion.a
                      href={recommendation.tutorialUrl}
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Watch Tutorial</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 rounded-full p-1 mt-1">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-blue-400">Pro Tip</h4>
              <p className="text-sm">Complete these recommendations in order of priority for the most effective improvement in your game.</p>
            </div>
          </div>
        </motion.div>
      </AnimatedCard>
    </div>
  );
};
