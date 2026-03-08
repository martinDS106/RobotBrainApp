/**
 * ROBOT BRAIN - Typography System
 * Futuristic fonts with glow and glitch effects
 */

import {StyleSheet} from 'react-native';
import {CyberpunkColors} from './colors';

export const Typography = {
  // Font Families
  primary: 'Orbitron-Regular', // Primary - Headers, labels
  secondary: 'RobotoMono-Regular', // Secondary - Commands, data
  
  // Font Sizes
  sizes: {
    h1: 36,
    h2: 28,
    h3: 24,
    h4: 20,
    body: 16,
    label: 14,
    small: 12,
    tiny: 10,
  },
  
  // Text Styles
  styles: StyleSheet.create({
    h1: {
      fontSize: 36,
      fontWeight: '700',
      color: CyberpunkColors.textPrimary,
      fontFamily: 'Orbitron-Regular',
      textShadowColor: CyberpunkColors.electricCyan,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: 10,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600',
      color: CyberpunkColors.textPrimary,
      fontFamily: 'Orbitron-Regular',
      textShadowColor: CyberpunkColors.electricCyan,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: 8,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      color: CyberpunkColors.textPrimary,
      fontFamily: 'Orbitron-Regular',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      color: CyberpunkColors.textPrimary,
      fontFamily: 'RobotoMono-Regular',
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: CyberpunkColors.textSecondary,
      fontFamily: 'RobotoMono-Regular',
    },
    code: {
      fontSize: 14,
      fontWeight: '400',
      color: CyberpunkColors.electricCyan,
      fontFamily: 'RobotoMono-Regular',
      backgroundColor: 'rgba(0, 255, 255, 0.1)',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
    },
  }),
  
  // Glow Effects
  glow: {
    cyan: {
      textShadowColor: CyberpunkColors.electricCyan,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: 10,
    },
    magenta: {
      textShadowColor: CyberpunkColors.neonMagenta,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: 10,
    },
    amber: {
      textShadowColor: CyberpunkColors.amber,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: 10,
    },
  },
} as const;


