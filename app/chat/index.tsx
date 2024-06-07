import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import axios from 'axios';
import Voice from '@react-native-voice/voice';

interface PulsingCircleProps {
  size?: number;
  index?: number;
  opacity?: number;
}

const PulsingCircle = ({ size = 32, index = 0, opacity = 1 }: PulsingCircleProps) => {
  const pulse = useSharedValue<number>(0);
  const s = useSharedValue<number>(size);
  const o = useSharedValue<number>(opacity);

  useEffect(() => {
    pulse.value = withDelay(index * 100, withRepeat(withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }), -1, true));
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      width: s.value,
      height: s.value,
      opacity: o.value,
      transform: [{ scale: pulse.value }],
    };
  });

  return <Animated.View style={style} className={`absolute flex items-center justify-center bg-purple-500 rounded-full w-12 h-12`} />;
};

interface ChatMessage {
  sender: 'User' | 'Healthify';
  message: string;
}

export default function ChatScreen() {
  const router = useRouter();
  const circleSizes = [
    { size: 48, opacity: 0.1 },
    { size: 32, opacity: 0.5 },
    { size: 16, opacity: 1 },
  ];

  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setIsListening(true);
    };

    Voice.onSpeechEnd = () => {
      setIsListening(false);
    };

    Voice.onSpeechResults = async (e) => {
      const results = e.value;
      if (results && results.length > 0) {
        const prompt = results[0];
        if (prompt) {
          await stopRecording();
          handleSendMessage(prompt);
        }
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      if (Voice.start) {
        await Voice.start('en-US');
        setIsRecording(true);
      } else {
        console.error('Voice module is not initialized.');
      }
    } catch (err) {
      console.error('Error starting speech recognition:', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (Voice.stop) {
        await Voice.stop();
        setIsRecording(false);
      } else {
        console.error('Voice module is not initialized.');
      }
    } catch (err) {
      console.error('Error stopping speech recognition:', err);
    }
  };

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    setChatMessages((prevMessages) => [...prevMessages, { sender: 'User', message }]);

    try {
      const response = await axios.post(
        'https://chatgpt-api8.p.rapidapi.com/',
        [{ content: message, role: 'user' }],
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'ea57f141bcmsh6dfef13948a9c36p1a559ajsn217d32aeb7fc',
            'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com',
          },
        }
      );

      const result = response.data.text;
      if (result) {
        setChatMessages((prevMessages) => [...prevMessages, { sender: 'Healthify', message: result }]);
      } else {
        setChatMessages((prevMessages) => [...prevMessages, { sender: 'Healthify', message: 'Error: Invalid response.' }]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setChatMessages((prevMessages) => [...prevMessages, { sender: 'Healthify', message: 'Error fetching data. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (userInput.trim() !== '') {
      handleSendMessage(userInput);
      setUserInput('');
    }
  };

  return (
    <View className="flex p-8 px-4 pb-4 pt-16 absolute top-0 left-0 right-0 bottom-0 items-stretch">
      <StatusBar backgroundColor="rgba(168,85,247,1)" style="light" />
      <View className="flex flex-row mt-4 pr-4 px-3">
        <View>
          <View className="mr-auto relative">
            <Text className="text-4xl font-medium">Talk to</Text>
            <Text className="text-4xl font-medium text-[#FA14FF]">Healthify</Text>
            <View className="absolute bg-red-50 flex items-center justify-center -right-8">
              {circleSizes.map((circle, i) => {
                return <PulsingCircle {...circle} key={i} index={i} />;
              })}
            </View>
          </View>
          <Text className="text-lg leading-6 mt-2">Type to ask a question or press the microphone button to speak</Text>
        </View>

        <TouchableOpacity onPress={() => router.back()}>
          <View className="-ml-4 flex items-center justify-center rounded-full w-10 h-10 border border-black/25">
            <Feather name="arrow-left" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <Image resizeMode="cover" className="w-full h-3/5 mt-4" source={require('../../assets/images/mascot.png')} />

      <LinearGradient
        pointerEvents="none"
        start={{ x: 0.5, y: 0.1 }}
        colors={['transparent', 'rgba(168,85,247,0.2)', 'rgba(168,85,247,0.5)', 'rgba(168,85,247,1)', 'rgba(168,85,247,1)']}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      <View className="mt-auto flex justify-between">
        <ScrollView className="mb-2" showsVerticalScrollIndicator={false}>
          {chatMessages.map((message, index) => (
            <View key={index} className={`${message.sender === 'User' ? 'ml-auto items-end' : 'mr-auto items-start'} flex flex-row mb-2`}>
              <View className={`px-4 py-2 rounded-lg ${message.sender === 'User' ? 'bg-blue-200 text-black' : 'bg-green-300 text-black'}`}>
                <Text className="text-lg">{message.message}</Text>
              </View>
              {isLoading && message.sender === 'Healthify' && <ActivityIndicator size="small" color="#00ff00" style={{ marginLeft: 8 }} />}
              {isListening && message.sender === 'User' && <Feather name="mic" size={20} color="red" style={{ marginLeft: 8 }} />}
            </View>
          ))}
        </ScrollView>
        <View className="flex flex-row space-x-2">
          <TextInput
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type Message..."
            placeholderTextColor="white"
            className="text-base font-medium flex-1 text-white px-6 flex flex-row items-center justify-between bg-white/30 rounded-full h-12"
          />
          <TouchableOpacity onPress={handleSend} className="flex items-center justify-center bg-white rounded-full w-12 h-12">
            <Ionicons name="send" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} className="flex items-center justify-center bg-white rounded-full w-12 h-12">
            <Feather name={isRecording ? 'mic' : 'mic-off'} size={20} color={isRecording ? 'red' : 'black'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
