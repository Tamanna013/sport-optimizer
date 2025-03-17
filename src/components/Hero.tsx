"use client";
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

export const Hero = () => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-pink-500 to-red-600">
      {/* Dark overlay for contrast, opacity adjusted for readability */}
      <div className="absolute inset-0 bg-black opacity-40" />
      
      {/* Cricket field pattern overlay with very low opacity */}
      <div className="absolute inset-0 bg-[url('/cricket-pattern.svg')] opacity-10 animate-pulse" />
      
      <div className="relative z-10 text-center px-6 md:px-12">
        <animated.div style={props}>
          {/* Title with added shadow for contrast */}
          <motion.h1
            className="text-7xl md:text-8xl font-extrabold text-white mb-6 font-geist-sans drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sports Optimizer
          </motion.h1>
          
          {/* Subtitle with improved readability */}
          <motion.p
            className="text-lg md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Unlock your cricket potential with AI-driven insights, personalized coaching, and real-time performance feedback.
          </motion.p>
          
          {/* Action Button with hover effects */}
          <motion.button
            className="px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
        </animated.div>
      </div>
      
      {/* Floating Cricket Element */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-24 h-24 bg-white/20 rounded-full backdrop-blur-lg" />
      </motion.div>

      {/* Another floating element */}
      <motion.div
        className="absolute bottom-1/4 left-1/4"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-24 h-24 bg-white/20 rounded-full backdrop-blur-lg" />
      </motion.div>
    </div>
  );
};
