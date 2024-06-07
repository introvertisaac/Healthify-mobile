import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, Text, View, TouchableOpacity, Pressable, TextInput } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <>
      <StatusBar backgroundColor="#FA14FF" style="light" />
      <Image className="w-screen h-14" source={require('../../assets/images/african-print.jpg')} />
      <View className="flex p-8 pt-8">
        <TouchableOpacity onPress={() => {
          router.back()
        }}>
          <View className="flex items-center justify-center rounded-full w-10 h-10 border border-black/25">
            <Feather name="arrow-left" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <Text className="mt-6 text-3xl font-medium text-black">Sign up to join <Text className="text-[#FA14FF]">Healthify</Text></Text>


        <View className="mt-4">
          <TouchableOpacity className="mt-4 border border-gray-300 rounded-md p-3 flex items-center justify-center">
            <Text className="font-medium text-black">Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <View className="flex flex-row items-center">
            <View className="h-px bg-gray-300 flex-1" />
            <Text className="text-gray-400 mx-3 font-medium uppercase">OR</Text>
            <View className="h-px bg-gray-300 flex-1" />
          </View>
        </View>

        <View>
          <View className="mt-4">
            <Text className="text-lg font-medium text-black">Email</Text>
            <TextInput
              placeholder="example@email.com"
              className="mt-2 border border-gray-300 p-2 pl-4 rounded-md" />
          </View>

          <View className="mt-4">
            <Text className="text-lg font-medium text-black">Password</Text>
            <View className="relative flex flex-row items-center">
              <TextInput
                secureTextEntry={showPassword}
                placeholder="Your password"
                className="flex-1 mt-2 border border-gray-300 p-2 pl-4 rounded-md" />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-0 transform translate-y-1 flex items-center justify-center w-10 h-10">
                <Feather name={!showPassword ? "eye-off" : "eye"} size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity><Text className="mt-3 text-[#FA14FF] font-medium">Forgot Password?</Text></TouchableOpacity>

          <TouchableOpacity className="mt-4 bg-[#FA14FF] rounded-md p-3 flex items-center justify-center">
            <Text className="font-medium text-white">Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity><Text className="mt-3 text-gray-400 font-medium">Already have an account? <Link href="../login" className="text-[#FA14FF]"> Log in</Link></Text></TouchableOpacity>
        </View>



        <Text className="mt-8 text-gray-400">Healthify uses cookies for analytics, personalized content and ads. By using Healthify's services you agree to the use of this cookies. <Text className="font-medium text-[#FA14FF]">Learn more</Text></Text>
      </View>
    </>
  );
}

