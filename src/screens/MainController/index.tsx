/**
 * ROBOT BRAIN - Main Controller Screen
 * The primary control interface with holographic joystick, sliders, and voice orb
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {CyberpunkColors} from '../../theme/colors';
import {Typography} from '../../theme/typography';
import {useRobotStore} from '../../store/useRobotStore';

const MainControllerScreen: React.FC = () => {
  const {connectedDevice, connectionState, status} = useRobotStore();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={CyberpunkColors.deepCharcoal} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        
        {/* Top Status Bar */}
        <View style={styles.statusBar}>
          <Text style={[Typography.styles.h3, styles.title]}>
            ROBOT BRAIN v2.0
          </Text>
          <View style={styles.statusRow}>
            <Text style={Typography.styles.label}>
              BT: {connectedDevice?.name || 'DISCONNECTED'}
            </Text>
            <Text style={Typography.styles.label}>
              🔋 {status?.battery || 0}%
            </Text>
            <Text style={Typography.styles.label}>
              🌡️ {status?.temperature || 0}°C
            </Text>
          </View>
        </View>

        {/* Voice Orb Placeholder */}
        <View style={styles.voiceOrbContainer}>
          <View style={styles.voiceOrb}>
            <Text style={Typography.styles.body}>VOICE ORB</Text>
            <Text style={[Typography.styles.label, styles.listeningText]}>
              I'M LISTENING...
            </Text>
          </View>
        </View>

        {/* Lightning Bar */}
        <View style={styles.lightningBar}>
          <Text style={styles.lightningText}>⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡</Text>
        </View>

        {/* 360° Joystick Placeholder */}
        <View style={styles.joystickContainer}>
          <Text style={[Typography.styles.h4, styles.sectionTitle]}>
            360° PRECISION DRIVE
          </Text>
          <View style={styles.joystick}>
            <Text style={Typography.styles.body}>JOYSTICK</Text>
          </View>
        </View>

        {/* Tactile Sliders Placeholder */}
        <View style={styles.slidersContainer}>
          <Text style={[Typography.styles.h4, styles.sectionTitle]}>
            TACTILE COMMAND GOD
          </Text>
          <View style={styles.slidersRow}>
            <View style={styles.slider}>
              <Text style={Typography.styles.label}>GRIP L</Text>
            </View>
            <View style={styles.slider}>
              <Text style={Typography.styles.label}>LIFT L</Text>
            </View>
            <View style={styles.slider}>
              <Text style={Typography.styles.label}>GRIP R</Text>
            </View>
            <View style={styles.slider}>
              <Text style={Typography.styles.label}>LIFT R</Text>
            </View>
          </View>
        </View>

        {/* Quick Commands Placeholder */}
        <View style={styles.quickCommandsContainer}>
          <Text style={[Typography.styles.h4, styles.sectionTitle]}>
            QUICK COMMAND MATRIX
          </Text>
          <View style={styles.commandsGrid}>
            {['COMBAT', 'DANCE', 'PICK', 'SCAN', 'HOME', 'SLEEP'].map(
              (cmd) => (
                <View key={cmd} style={styles.commandButton}>
                  <Text style={Typography.styles.label}>{cmd}</Text>
                </View>
              ),
            )}
          </View>
        </View>

        {/* Bottom LED Ground Effect */}
        <View style={styles.groundEffect}>
          <Text style={styles.groundText}>
            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CyberpunkColors.deepCharcoal,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  statusBar: {
    backgroundColor: CyberpunkColors.panelBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: CyberpunkColors.borderPrimary,
  },
  title: {
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  voiceOrbContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  voiceOrb: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: CyberpunkColors.panelBackground,
    borderWidth: 2,
    borderColor: CyberpunkColors.electricCyan,
    justifyContent: 'center',
    alignItems: 'center',
    ...CyberpunkColors.shadowGlow,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 20,
    shadowOpacity: 0.5,
  },
  listeningText: {
    marginTop: 8,
    color: CyberpunkColors.electricCyan,
  },
  lightningBar: {
    alignItems: 'center',
    marginVertical: 16,
  },
  lightningText: {
    fontSize: 20,
    color: CyberpunkColors.electricCyan,
  },
  joystickContainer: {
    marginVertical: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  joystick: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: CyberpunkColors.panelBackground,
    borderWidth: 2,
    borderColor: CyberpunkColors.neonMagenta,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  slidersContainer: {
    marginVertical: 24,
  },
  slidersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  slider: {
    width: 60,
    height: 200,
    backgroundColor: CyberpunkColors.panelBackground,
    borderWidth: 1,
    borderColor: CyberpunkColors.borderPrimary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickCommandsContainer: {
    marginVertical: 24,
  },
  commandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  commandButton: {
    width: 100,
    height: 100,
    backgroundColor: CyberpunkColors.panelBackground,
    borderWidth: 1,
    borderColor: CyberpunkColors.borderPrimary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  groundEffect: {
    marginTop: 32,
    marginBottom: 16,
  },
  groundText: {
    fontSize: 10,
    color: CyberpunkColors.electricCyan,
    textAlign: 'center',
    opacity: 0.5,
  },
});

export default MainControllerScreen;


