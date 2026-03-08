/**
 * ROBOT BRAIN - LED Animation Library
 * All LED strip animations for the cyberpunk aesthetic
 */

import {Animated} from 'react-native';
import {CyberpunkColors} from '../theme/colors';

export type LEDColor = string | string[];
export type AnimationDirection = 'left' | 'right' | 'up' | 'down';

export interface LEDAnimationConfig {
  color: LEDColor;
  speed: number; // 1-10, where 1 is slowest
  intensity?: number; // 0-1, brightness
  loop?: boolean;
}

/**
 * BREATHE Animation
 * Fades in and out smoothly
 */
export const createBreatheAnimation = (
  animValue: Animated.Value,
  config: LEDAnimationConfig,
): Animated.CompositeAnimation => {
  const {speed = 5, loop = true} = config;
  const duration = 2000 / speed; // 2 seconds at speed 1
  
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]),
    {iterations: loop ? -1 : 1},
  );
};

/**
 * CHASE Animation
 * Lights move in one direction
 */
export const createChaseAnimation = (
  animValue: Animated.Value,
  config: LEDAnimationConfig & {direction: AnimationDirection},
): Animated.CompositeAnimation => {
  const {speed = 5, loop = true} = config;
  const duration = 1000 / speed;
  
  return Animated.loop(
    Animated.timing(animValue, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }),
    {iterations: loop ? -1 : 1},
  );
};

/**
 * PULSE Animation
 * Rapid brightness pulses
 */
export const createPulseAnimation = (
  animValue: Animated.Value,
  config: LEDAnimationConfig,
): Animated.CompositeAnimation => {
  const {speed = 5, loop = true} = config;
  const duration = 500 / speed; // 0.5 seconds at speed 1
  
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0.3,
        duration,
        useNativeDriver: true,
      }),
    ]),
    {iterations: loop ? -1 : 1},
  );
};

/**
 * RAINBOW Animation
 * Full spectrum color cycle
 */
export const createRainbowAnimation = (
  animValue: Animated.Value,
  config: Omit<LEDAnimationConfig, 'color'>,
): Animated.CompositeAnimation => {
  const {speed = 5, loop = true} = config;
  const duration = 3000 / speed; // 3 seconds for full cycle
  
  return Animated.loop(
    Animated.timing(animValue, {
      toValue: 1,
      duration,
      useNativeDriver: false, // Color animations need JS driver
    }),
    {iterations: loop ? -1 : 1},
  );
};

/**
 * STROBE Animation
 * Rapid flashing
 */
export const createStrobeAnimation = (
  animValue: Animated.Value,
  config: LEDAnimationConfig & {frequency?: number},
): Animated.CompositeAnimation => {
  const {speed = 5, frequency = 10, loop = true} = config;
  const duration = (1000 / frequency) / speed;
  
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]),
    {iterations: loop ? -1 : 1},
  );
};

/**
 * Get color for LED based on animation progress
 */
export const getLEDColor = (
  color: LEDColor,
  progress: number,
): string => {
  if (typeof color === 'string') {
    return color;
  }
  
  // Gradient: interpolate between colors
  const steps = color.length;
  const step = progress * (steps - 1);
  const index = Math.floor(step);
  const nextIndex = Math.min(index + 1, steps - 1);
  const t = step - index;
  
  // Simple interpolation (for complex gradients, use color library)
  return color[index] || color[0];
};

/**
 * Calculate LED brightness based on animation value
 */
export const getLEDBrightness = (
  animValue: number,
  intensity: number = 1,
): number => {
  return Math.max(0, Math.min(1, animValue * intensity));
};

/**
 * Predefined animation presets
 */
export const LEDPresets = {
  idle: {
    type: 'breathe' as const,
    color: CyberpunkColors.electricCyan,
    speed: 2,
    intensity: 0.5,
  },
  connecting: {
    type: 'chase' as const,
    color: CyberpunkColors.electricCyan,
    speed: 5,
    direction: 'left' as AnimationDirection,
  },
  active: {
    type: 'pulse' as const,
    color: CyberpunkColors.electricCyan,
    speed: 8,
    intensity: 1,
  },
  celebration: {
    type: 'rainbow' as const,
    color: CyberpunkColors.gradientRainbow,
    speed: 3,
  },
  error: {
    type: 'strobe' as const,
    color: CyberpunkColors.alertRed,
    speed: 10,
    frequency: 5,
  },
  recording: {
    type: 'pulse' as const,
    color: CyberpunkColors.amber,
    speed: 3,
    intensity: 0.8,
  },
} as const;


