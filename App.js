//https://www.javatpoint.com/react-native-moving-between-screens
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Audio } from 'expo-av';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.baseText}>speachu</Text>
        <Button style={styles.baseText}
          title="practice!"
          onPress={() => this.props.navigation.push('Practice')}
        />
        <Button style={styles.baseText}
          title="assessment!"
          onPress={() => this.props.navigation.push('Assessment')}
        />
      </View>
    );
  }
}


let recording = new Audio.Recording();

function PracticeScreen() {
  const [count, setCount] = useState(0);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [RecordedURI, SetRecordedURI] = useState('');
  const [AudioPerm, SetAudioPerm] = useState(false);
  const [isRecording, SetisRecording] = useState(false);
  const [isPLaying, SetisPLaying] = useState(false);
  const Player = useRef(new Audio.Sound());
  const [PausedEh, SetPausedEh] = useState(false);
  
  const GetPermission = async () => {
    try {
      const getAudioPerm = await Audio.requestPermissionsAsync();
      SetAudioPerm(getAudioPerm.granted);
    } catch (error) {
      alert('Permissoins were not granted.');
    }
  };
  useEffect(() => {
    video.current.playAsync();
    setCount([
        'https://videos.pond5.com/woman-making-speech-front-audience-footage-010859040_main_xxl.mp4',
        'https://videos.pond5.com/4k-business-team-making-video-footage-069077019_main_xxl.mp4',
        'https://videos.pond5.com/pov-webcam-view-senior-caucasian-footage-136506995_main_xxl.mp4',
        'https://videos.pond5.com/pov-group-young-asian-employees-footage-148744186_main_xxl.mp4',
        'https://videos.pond5.com/large-group-multi-ethnic-students-footage-116183330_main_xxl.mp4'][Math.floor(Math.random() * 5)]);
    GetPermission();
}, []);

  const startRecording = async () => {
    if (AudioPerm === true) {
      if (isPLaying){
        alert('Please stop playing before recording.')
      } else {
        try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        SetisRecording(true);
      } catch (error) {
        console.log(error);
      }
      }
    } else {
      GetPermission();
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const result = recording.getURI();
      SetRecordedURI(result); // Here is the URI -> where the .m4a is stored on the device, this file is what wanted to be sent to is 
      recording = new Audio.Recording();
      SetisRecording(false);
    } catch (error) {
      console.log(error);
    }
  };

  const playSound = async () => {
    try {
      if (!PausedEh) {
        await Player.current.loadAsync({ uri: RecordedURI }, {}, true);
      }
      if (isRecording){
        alert('If you want to play the audio, stop recording first.')
      } else {
      SetisPLaying(true);
      await Player.current.playAsync();
      Player.current.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish === true) {
          SetisPLaying(false);
          SetPausedEh(false);
          stopSound();
          await Player.current.unloadAsync();
          }
        });
       } 
    } catch (error) {
      alert('There is nothing to play.');
    }
  };

  const stopSound = async () => {
    try {
      const checkLoading = await Player.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        await Player.current.stopAsync();
        if (!PausedEh) {
          await Player.current.unloadAsync();
        }
        SetisPLaying(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const pauseSound = async () => {
    try {
      const checkLoading = await Player.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        await Player.current.pauseAsync();
        SetisPLaying(false);
        SetPausedEh(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.baseText}>
      <Text>PRACTICE</Text>
      <Video ref={video} style={styles.video} source={{ uri: count, }} useNativeControls resizeMode="contain" isLooping />
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? () => stopRecording() : () => startRecording()}
      />
      <Button
        title={isPLaying ? 'Pause Sound' : 'Play Sound'}
        onPress={isPLaying ? () => pauseSound() : () => playSound()}
      />
      <Button title="Stop Sound" onPress={() => stopSound()} />
      <Text>Warning: starting a new recording will override past recordings</Text>
    </Text>
    </View>

  );
}


function AssessmentScreen() {
  const [count, setCount] = useState(0);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [RecordedURI, SetRecordedURI] = useState('');
  const [AudioPerm, SetAudioPerm] = useState(false);
  const [isRecording, SetisRecording] = useState(false);
  const [isPLaying, SetisPLaying] = useState(false);
  const Player = useRef(new Audio.Sound());
  const [PausedEh, SetPausedEh] = useState(false);
  
  const GetPermission = async () => {
    try {
      const getAudioPerm = await Audio.requestPermissionsAsync();
      SetAudioPerm(getAudioPerm.granted);
    } catch (error) {
      alert('Permissoins were not granted.');
    }
  };
  useEffect(() => {
    video.current.playAsync();
    setCount([
        'https://videos.pond5.com/woman-making-speech-front-audience-footage-010859040_main_xxl.mp4',
        'https://videos.pond5.com/4k-business-team-making-video-footage-069077019_main_xxl.mp4',
        'https://videos.pond5.com/pov-webcam-view-senior-caucasian-footage-136506995_main_xxl.mp4',
        'https://videos.pond5.com/pov-group-young-asian-employees-footage-148744186_main_xxl.mp4',
        'https://videos.pond5.com/large-group-multi-ethnic-students-footage-116183330_main_xxl.mp4'][Math.floor(Math.random() * 5)]);
    GetPermission();
}, []);

  const startRecording = async () => {
    if (AudioPerm === true) {
      if (isPLaying){
        alert('Please stop playing before recording.')
      } else {
        try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        SetisRecording(true);
      } catch (error) {
        console.log(error);
      }
      }
    } else {
      GetPermission();
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const result = recording.getURI();
      SetRecordedURI(result); // Here is the URI
      recording = new Audio.Recording();
      SetisRecording(false);
    } catch (error) {
      console.log(error);
    }
  };

  const playSound = async () => {
    try {
      if (!PausedEh) {
        await Player.current.loadAsync({ uri: RecordedURI }, {}, true);
      }
      if (isRecording){
        alert('If you want to play the audio, stop recording first.')
      } else {
      SetisPLaying(true);
      await Player.current.playAsync();
      Player.current.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish === true) {
          SetisPLaying(false);
          SetPausedEh(false);
          stopSound();
          await Player.current.unloadAsync();
          }
        });
       } 
    } catch (error) {
      alert('There is nothing to play.');
    }
  };

  const stopSound = async () => {
    try {
      const checkLoading = await Player.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        await Player.current.stopAsync();
        if (!PausedEh) {
          await Player.current.unloadAsync();
        }
        SetisPLaying(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const pauseSound = async () => {
    try {
      const checkLoading = await Player.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        await Player.current.pauseAsync();
        SetisPLaying(false);
        SetPausedEh(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.baseText}>
      <Text>ASSESSMENT</Text>
      <Video ref={video} style={styles.video} source={{ uri: count, }} useNativeControls resizeMode="contain" isLooping />
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? () => stopRecording() : () => startRecording()}
      />
      <Button
        title={isPLaying ? 'Pause Sound' : 'Play Sound'}
        onPress={isPLaying ? () => pauseSound() : () => playSound()}
      />
      <Button title="Stop Sound" onPress={() => stopSound()} />
      <Text>Warning: starting a new recording will override past recordings</Text>
    </Text>
    </View>

  );
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Assessment: AssessmentScreen,
    Practice: PracticeScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

let styles = StyleSheet.create({
  baseText: {
    fontFamily: "Inter"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
