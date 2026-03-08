# 🤖 ROBOT BRAIN - Cyberpunk Robot Controller

Premium mobile application for controlling ESP32-powered robots with a stunning cyberpunk aesthetic.

## 🎨 Features

- **360° Holographic Joystick** - Intuitive robot driving with LED ring feedback
- **Tactile Command God** - Independent control of arms, grippers, and head
- **Voice AI Integration** - Talk to your robot with holographic voice orb
- **Command Mapping** - Program any button to send any command
- **Sequence Recording** - Teach your robot complex routines
- **LED Framework** - Beautiful animated lighting throughout
- **Real-time Telemetry** - See battery, torque, and connection status
- **Cyberpunk Aesthetic** - Neon colors, glassmorphism, holographic effects

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- React Native 0.76+
- Android Studio (for Android development)
- ESP32 robot with BLE support

### Installation

```bash
cd "D:\Bt controller\RobotBrain"
npm install
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android (in another terminal)
npm run android
```

## 📁 Project Structure

```
src/
├── screens/          # App screens
│   └── MainController/  # Main control interface
├── components/      # Reusable components
├── services/        # Bluetooth, Voice, etc.
├── store/           # Zustand state management
├── theme/           # Cyberpunk colors & typography
├── utils/           # Utilities (LED animations, protocol)
└── constants/       # Command definitions
```

## 🎨 Design System

### Colors
- **Electric Cyan**: `#00FFFF` - Primary accent
- **Neon Magenta**: `#FF00FF` - Secondary accent
- **Amber**: `#FFBF00` - Tertiary accent
- **Deep Charcoal**: `#0A0A0F` - Background

### Typography
- **Primary Font**: Orbitron (Headers, labels)
- **Secondary Font**: Roboto Mono (Commands, data)

## 🔌 Bluetooth Protocol

The app uses a custom protocol for ESP32 communication:
- Format: `[STX][LENGTH][COMMAND_ID][PAYLOAD][CHECKSUM][ETX]`
- Commands encoded in base64 for BLE transmission
- Automatic checksum validation

## 📝 Development Status

### ✅ Completed
- Project setup
- Cyberpunk theme system
- LED animation framework
- Command definitions
- Bluetooth protocol encoding
- Main controller screen (basic layout)
- State management (Zustand)

### 🚧 In Progress
- Holographic joystick implementation
- Tactile sliders
- Voice orb component
- Bluetooth service integration

### 📋 Planned
- Sequence recording
- Code Lab (command mapping)
- Voice AI integration
- Settings screen
- Advanced LED animations

## 🤝 Contributing

This is a work in progress. Contributions welcome!

## 📄 License

MIT

---

**Built with ❤️ and cyberpunk vibes**
