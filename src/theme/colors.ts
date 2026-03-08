/**
 * ROBOT BRAIN - Cyberpunk Color Palette
 * Colors inspired by Cyberpunk 2077, Tron Legacy, Blade Runner 2049
 */

export const CyberpunkColors = {
  // Primary Colors
  electricCyan: '#00FFFF',
  neonMagenta: '#FF00FF',
  amber: '#FFBF00',
  
  // Background Colors
  deepCharcoal: '#0A0A0F',
  darkSurface: '#1A1A2E',
  darkerSurface: '#16213E',
  
  // Glass Effects
  glassWhite: 'rgba(255, 255, 255, 0.1)',
  glassCyan: 'rgba(0, 255, 255, 0.2)',
  glassMagenta: 'rgba(255, 0, 255, 0.2)',
  
  // Status Colors
  alertRed: '#FF3333',
  successGreen: '#33FF33',
  infoBlue: '#3333FF',
  warningYellow: '#FFAA00',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.5)',
  textDisabled: 'rgba(255, 255, 255, 0.3)',
  
  // Border Colors
  borderPrimary: 'rgba(255, 255, 255, 0.1)',
  borderGlow: 'rgba(0, 255, 255, 0.3)',
  
  // LED Colors
  ledCyan: '#00FFFF',
  ledMagenta: '#FF00FF',
  ledAmber: '#FFBF00',
  ledGreen: '#00FF00',
  ledRed: '#FF0000',
  ledBlue: '#0080FF',
  
  // Gradients
  gradientCyan: ['#00FFFF', '#0080FF'],
  gradientMagenta: ['#FF00FF', '#8000FF'],
  gradientAmber: ['#FFBF00', '#FF8000'],
  gradientRainbow: ['#FF0000', '#FF8000', '#FFFF00', '#00FF00', '#0080FF', '#8000FF', '#FF00FF'],
  
  // Panel Backgrounds
  panelBackground: 'rgba(26, 26, 46, 0.7)',
  panelBorder: 'rgba(255, 255, 255, 0.1)',
  
  // Shadows
  shadowGlow: 'rgba(0, 255, 255, 0.5)',
  shadowDark: 'rgba(0, 0, 0, 0.4)',
} as const;

export type CyberpunkColor = typeof CyberpunkColors[keyof typeof CyberpunkColors];


