"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedCard } from './shared/AnimatedCard';

export const VideoAnalysis = () => {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="p-6">
      <AnimatedCard>
        <div className="space-y-6">
          {/* Upload Area */}
          <motion.div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            whileHover={{ scale: 1.01 }}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
          >
            <input
              type="file"
              className="hidden"
              accept="video/*"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <motion.div
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
                animate={{ scale: dragActive ? 1.1 : 1 }}
              >
                {/* Upload Icon */}
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </motion.div>
              <span className="text-lg font-medium">
                Drop your video here or click to upload
              </span>
            </label>
          </motion.div>

          {/* Video Player */}
          <div className="aspect-video bg-black/10 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No video selected
            </div>
          </div>

          {/* Insights Panel */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {['Bat Angle', 'Foot Position', 'Body Balance'].map((metric, index) => (
              <motion.div
                key={metric}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-lg backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-medium text-lg mb-2">{metric}</h3>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedCard>
    </div>
  );
};
