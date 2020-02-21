import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import { INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, INTERRUPTION_MODE_IOS_DO_NOT_MIX } from 'expo-av/build/Audio';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [error, setError] = useState('');
  const [soundObject, setSoundObject] = useState(null);
  
  const createSoundObject = () => {
    if (soundObject === null) setSoundObject(new Audio.Sound());
  }

  createSoundObject();

  const playAudio = async () => {
    try {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true, interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX });
      await soundObject.loadAsync({ uri: 'http://live-bauerdk.sharp-stream.com/100fm_live.mp3' }, { shouldPlay: true })
    } catch(error) {
      setError(error.message);
      clearMessageAfterDelay(1000);
    }
  }

  const stopAudio = async () => {
    try {
      await soundObject.unloadAsync();
    } catch (error) {
      setError(error.message);
      clearMessageAfterDelay(1000);
    }
  }

  const clearMessageAfterDelay = (delayInMs) => {
    if (!error) return;
    setTimeout(() => {
      setError('');
    }, delayInMs);
  }

  return (
    <View style={styles.container}>
      <MaterialIcons name="speaker" size={64} color="green" />
        <Text style={{fontSize: 64}}>
          <MaterialIcons name="speaker" size={64} color="yellow" />
            Lås mig!
          <MaterialIcons name="speaker" size={64} color="red" />
        </Text>
      <MaterialIcons name="speaker" size={64} color="blue" />
      <Button onPress={() => playAudio()} title={'Play!'}>
      </Button>
      <Button onPress={() => stopAudio()} title={'Stop.'}>
      </Button>
      <Text style={{color: 'red'}}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
