import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface ShimmerButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'terracotta' | 'sage';
  className?: string;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  variant = 'terracotta',
  className,
  ...props
}) => {
  const bgColors =
    variant === 'terracotta'
      ? 'bg-[#1E3A5F] hover:bg-[#152944] text-white'
      : 'bg-[#395D89] hover:bg-[#2D4B70] text-white';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold tracking-[0.14em] uppercase shadow-sm transition-colors cursor-pointer select-none',
        bgColors,
        className
      )}
      {...props}
    >
      {/* 21st.dev / Magic UI Shimmer Light Ray */}
      <span
        className="absolute inset-0 block h-full w-full pointer-events-none transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite_ease-in-out]"
        aria-hidden="true"
      />
      
      {/* Button Children */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </motion.button>
  );
};
