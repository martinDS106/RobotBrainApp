/**
 * ROBOT BRAIN - Robot State Store
 * Zustand store for robot connection and status
 */

import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export interface RobotDevice {
  id: string;
  name: string;
  macAddress?: string;
  lastConnected?: Date;
  firmwareVersion?: string;
}

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface RobotStatus {
  battery: number; // 0-100
  temperature: number; // Celsius
  signalStrength: number; // 0-100
  isMoving: boolean;
  lastCommand?: string;
  lastCommandTime?: Date;
}

interface RobotStore {
  // Connection
  connectedDevice: RobotDevice | null;
  connectionState: ConnectionState;
  savedDevices: RobotDevice[];
  
  // Status
  status: RobotStatus | null;
  
  // Actions
  setConnectedDevice: (device: RobotDevice | null) => void;
  setConnectionState: (state: ConnectionState) => void;
  addSavedDevice: (device: RobotDevice) => void;
  removeSavedDevice: (deviceId: string) => void;
  updateStatus: (status: Partial<RobotStatus>) => void;
  reset: () => void;
}

const defaultStatus: RobotStatus = {
  battery: 100,
  temperature: 25,
  signalStrength: 100,
  isMoving: false,
};

export const useRobotStore = create<RobotStore>()(
  persist(
    (set) => ({
      connectedDevice: null,
      connectionState: 'disconnected',
      savedDevices: [],
      status: null,
      
      setConnectedDevice: (device) =>
        set({connectedDevice: device}),
      
      setConnectionState: (state) =>
        set({connectionState: state}),
      
      addSavedDevice: (device) =>
        set((state) => ({
          savedDevices: [
            ...state.savedDevices.filter((d) => d.id !== device.id),
            device,
          ],
        })),
      
      removeSavedDevice: (deviceId) =>
        set((state) => ({
          savedDevices: state.savedDevices.filter((d) => d.id !== deviceId),
        })),
      
      updateStatus: (status) =>
        set((state) => ({
          status: {
            ...defaultStatus,
            ...state.status,
            ...status,
          },
        })),
      
      reset: () =>
        set({
          connectedDevice: null,
          connectionState: 'disconnected',
          status: null,
        }),
    }),
    {
      name: 'robot-brain-storage',
      partialize: (state) => ({
        savedDevices: state.savedDevices,
      }),
    },
  ),
);


