/**
 * ROBOT BRAIN - Bluetooth Communication Protocol
 * ESP32 message encoding/decoding
 */

// Protocol Constants
export const PROTOCOL = {
  STX: 0x02, // Start of Text
  ETX: 0x03, // End of Text
  ACK: 0x06, // Acknowledgment
  NACK: 0x15, // Negative Acknowledgment
} as const;

export interface RobotMessage {
  commandId: number;
  payload: number[];
  checksum?: number;
}

/**
 * Calculate checksum (XOR of all bytes)
 */
export const calculateChecksum = (data: number[]): number => {
  return data.reduce((acc, byte) => acc ^ byte, 0);
};

/**
 * Encode command to protocol format
 * Format: [STX][LENGTH][COMMAND_ID][PAYLOAD...][CHECKSUM][ETX]
 */
export const encodeCommand = (
  commandId: number,
  payload: number[] = [],
): string => {
  const length = 3 + payload.length; // STX + LEN + CMD + PAYLOAD + CHK + ETX
  const message = [PROTOCOL.STX, length, commandId, ...payload];
  const checksum = calculateChecksum(message.slice(1)); // Exclude STX from checksum
  message.push(checksum, PROTOCOL.ETX);
  
  // Convert to base64 for BLE transmission
  const buffer = Buffer.from(message);
  return buffer.toString('base64');
};

/**
 * Decode message from protocol format
 */
export const decodeMessage = (base64Data: string): RobotMessage | null => {
  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const data = Array.from(buffer);
    
    // Verify STX and ETX
    if (data[0] !== PROTOCOL.STX || data[data.length - 1] !== PROTOCOL.ETX) {
      return null;
    }
    
    const length = data[1];
    const commandId = data[2];
    const payload = data.slice(3, length - 1); // Exclude checksum
    const receivedChecksum = data[length - 1];
    
    // Verify checksum
    const calculatedChecksum = calculateChecksum(data.slice(1, length - 1));
    if (receivedChecksum !== calculatedChecksum) {
      return null;
    }
    
    return {
      commandId,
      payload,
      checksum: receivedChecksum,
    };
  } catch (error) {
    console.error('Failed to decode message:', error);
    return null;
  }
};

/**
 * Encode command string to protocol
 * Example: "MOTOR_FORWARD_255" -> encoded bytes
 */
export const encodeCommandString = (commandString: string): string => {
  // For now, simple encoding - in production, use command mapping
  const commandBytes = Buffer.from(commandString, 'utf-8');
  const payload = Array.from(commandBytes);
  
  // Use custom command category
  return encodeCommand(0x90, payload);
};


