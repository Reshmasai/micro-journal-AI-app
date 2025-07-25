# Micro-Journal App

A mobile journaling app built with React Native + Expo + Supabase. Users can write journal entries and see a mock AI-based mood tag.

## Features

- Supabase Auth (email/password)
- Create journal entries with sentiment tagging
- View past entries with mood & timestamp
- Add Expo push notifications to remind user to journal

## Tech Stack

- React Native (Expo SDK 50+)
- Supabase (Auth & Postgres)
- Day.js for formatting
- Mock Sentiment Analyzer

## Local Setup Instructions

### 1. Clone the repo

```bash
git clone 
cd micro-journal-AI-app
```

### 2.  Install Dependencies
```bash
yarn install
```
### 3.  Install required Expo packages
```bash
npx expo install expo-router expo-image-picker expo-notifications react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated
```w
### 4. Start expo project
```bash
npx expo start
```

### Tech Decisions
Feature                Choice                   Reason                                 
---------------------- ------------------------ ---------------------------------------
**Expo SDK**           SDK 53                   Modern + simple setup                  
**Expo Router**        Navigation               Simplifies screen routing              
**Supabase**           Auth + DB                Instant backend with RLS               
**Sentiment Tagging**  Mock or Edge Function    Placeholder, secure option available   
**Push Notifications** Expo Notifications       Easy cross-platform local notifications

## Run the App on Web
### 1. Install required web dependencies:
```bash
npm install react-dom@19.0.0 react-native-web@^0.20.0 @expo/metro-runtime@~5.0.4
```
### 2. Start Expo in web mode:
```bash
npx expo start --web
```

Note: Push notifications works in mobile

## View the App on a Mobile Device
### 1. Install the Expo Go App on your phone
### 2. Start the project on your computer
```bash
npx expo start --tunnel
```
### 3. Scan the QR code using Expo Go
1. Open the Expo Go app on your phone
2. Use the built-in QR code scanner
3. Scan the QR code shown in your terminal or browser