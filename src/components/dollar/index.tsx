'use client'

import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export function AnimatedDollar() {
  return (
    <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border-2 border-white/30 relative">
      <motion.div
        animate={{ 
          y: [0, -5, 0],
          rotateZ: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <DollarSign className="h-12 w-12" />
      </motion.div>
      <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        USDC
      </div>
    </div>
  );
}

export function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedBalance({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1 
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5,
        delay: 0.3
      }}
    >
      {children}
    </motion.h1>
  );
}

export function AnimatedButtons({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      className="flex gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: 0.5
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHero({ children, delay = 0.2 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100,
        delay
      }}
    >
      {children}
    </motion.div>
  );
}