/**
 * ROBOT BRAIN - Command Definitions
 * All available commands for ESP32 robots
 */

export enum CommandCategory {
  SYSTEM = 0x01,
  MOTORS = 0x10,
  SERVOS = 0x20,
  GRIPPERS = 0x30,
  SEQUENCES = 0x40,
  VOICE = 0x50,
  SENSORS = 0x60,
  CONFIG = 0x70,
  DEBUG = 0x80,
  CUSTOM = 0x90,
}

export interface Command {
  id: number;
  name: string;
  category: CommandCategory;
  format: string;
  description: string;
  parameters?: CommandParameter[];
}

export interface CommandParameter {
  name: string;
  type: 'number' | 'string' | 'boolean';
  min?: number;
  max?: number;
  default?: any;
}

/**
 * Motor Commands
 */
export const MotorCommands: Command[] = [
  {
    id: 0x10,
    name: 'MOTOR_FORWARD',
    category: CommandCategory.MOTORS,
    format: 'MOTOR_FORWARD_%d',
    description: 'Move forward at speed %d (0-255)',
    parameters: [
      {name: 'speed', type: 'number', min: 0, max: 255, default: 128},
    ],
  },
  {
    id: 0x11,
    name: 'MOTOR_REVERSE',
    category: CommandCategory.MOTORS,
    format: 'MOTOR_REVERSE_%d',
    description: 'Move reverse at speed %d (0-255)',
    parameters: [
      {name: 'speed', type: 'number', min: 0, max: 255, default: 128},
    ],
  },
  {
    id: 0x12,
    name: 'MOTOR_LEFT',
    category: CommandCategory.MOTORS,
    format: 'MOTOR_LEFT_%d',
    description: 'Turn left at speed %d (0-255)',
    parameters: [
      {name: 'speed', type: 'number', min: 0, max: 255, default: 128},
    ],
  },
  {
    id: 0x13,
    name: 'MOTOR_RIGHT',
    category: CommandCategory.MOTORS,
    format: 'MOTOR_RIGHT_%d',
    description: 'Turn right at speed %d (0-255)',
    parameters: [
      {name: 'speed', type: 'number', min: 0, max: 255, default: 128},
    ],
  },
  {
    id: 0x14,
    name: 'MOTOR_STOP',
    category: CommandCategory.MOTORS,
    format: 'MOTOR_STOP',
    description: 'Stop all motors immediately',
  },
];

/**
 * Servo Commands
 */
export const ServoCommands: Command[] = [
  {
    id: 0x20,
    name: 'SERVO_SET',
    category: CommandCategory.SERVOS,
    format: 'SERVO_%d_%d',
    description: 'Set servo %d to angle %d (0-180)',
    parameters: [
      {name: 'servoId', type: 'number', min: 1, max: 16, default: 1},
      {name: 'angle', type: 'number', min: 0, max: 180, default: 90},
    ],
  },
  {
    id: 0x21,
    name: 'SERVO_ALL',
    category: CommandCategory.SERVOS,
    format: 'SERVO_ALL_%d',
    description: 'Set all servos to angle %d (0-180)',
    parameters: [
      {name: 'angle', type: 'number', min: 0, max: 180, default: 90},
    ],
  },
];

/**
 * Gripper Commands
 */
export const GripperCommands: Command[] = [
  {
    id: 0x30,
    name: 'GRIP_LEFT',
    category: CommandCategory.GRIPPERS,
    format: 'GRIP_LEFT_%d',
    description: 'Set left gripper to %d% (0-100)',
    parameters: [
      {name: 'position', type: 'number', min: 0, max: 100, default: 50},
    ],
  },
  {
    id: 0x31,
    name: 'GRIP_RIGHT',
    category: CommandCategory.GRIPPERS,
    format: 'GRIP_RIGHT_%d',
    description: 'Set right gripper to %d% (0-100)',
    parameters: [
      {name: 'position', type: 'number', min: 0, max: 100, default: 50},
    ],
  },
  {
    id: 0x32,
    name: 'GRIP_BOTH',
    category: CommandCategory.GRIPPERS,
    format: 'GRIP_BOTH_%d',
    description: 'Set both grippers to %d% (0-100)',
    parameters: [
      {name: 'position', type: 'number', min: 0, max: 100, default: 50},
    ],
  },
];

/**
 * System Commands
 */
export const SystemCommands: Command[] = [
  {
    id: 0x01,
    name: 'SYSTEM_STATUS',
    category: CommandCategory.SYSTEM,
    format: 'SYSTEM_STATUS',
    description: 'Request robot status',
  },
  {
    id: 0x02,
    name: 'SYSTEM_RESET',
    category: CommandCategory.SYSTEM,
    format: 'SYSTEM_RESET',
    description: 'Reset robot to default state',
  },
  {
    id: 0x03,
    name: 'SYSTEM_CALIBRATE',
    category: CommandCategory.SYSTEM,
    format: 'SYSTEM_CALIBRATE',
    description: 'Start calibration routine',
  },
];

/**
 * All Commands
 */
export const AllCommands: Command[] = [
  ...SystemCommands,
  ...MotorCommands,
  ...ServoCommands,
  ...GripperCommands,
];

/**
 * Find command by name
 */
export const findCommand = (name: string): Command | undefined => {
  return AllCommands.find(cmd => cmd.name === name);
};

/**
 * Format command string with parameters
 */
export const formatCommand = (
  command: Command,
  params: Record<string, any>,
): string => {
  let formatted = command.format;
  
  // Replace %d with numeric parameters
  Object.entries(params).forEach(([key, value]) => {
    const param = command.parameters?.find(p => p.name === key);
    if (param && param.type === 'number') {
      formatted = formatted.replace('%d', String(Math.round(value)));
    }
  });
  
  return formatted;
};


