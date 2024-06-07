import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const HealthifyChatFAB = () => {
  return <Link push href="../chat" asChild>
    <TouchableOpacity className="absolute items-center justify-center bottom-4 right-4 w-16 h-16 rounded-full bg-purple-400">
      <Image
        resizeMode="contain"
        className="w-14 h-14 rounded-full"
        source={require("../../assets/images/mascot.png")}
      />
    </TouchableOpacity>
  </Link>
}

const TopSection = () => {
  return <View className="px-6 flex flex-row items-center justify-between">
    <View className="flex flex-row items-center">
      <Image
        className="w-12 h-12 rounded-full mr-4"
        source={{ uri: "https://images.unsplash.com/photo-1533674639815-52f8aea1b132?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
      />
      <View className="flex justify-center">
        <Text className="text-white text-lg font-medium">Linda Akinyi</Text>
        <Text className="text-gray-500 text-sm font-medium">Welcome back</Text>
      </View>
    </View>
    <TouchableOpacity className="flex items-center justify-center rounded-full p-2 border border-white/25">
      <Feather name="menu" size={20} color="white" />
    </TouchableOpacity>
  </View>
}

const NearbyDoctorsSection = () => {
  const ProfileImages = [
    'https://images.unsplash.com/photo-1573496527892-904f897eb744?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1613115016363-a9dbcf4b9e93?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1630631729332-d564de91400f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1643297654416-05795d62e39c?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]
  return <View className="flex mt-8">
    <View className="px-6 flex flex-row justify-between items-center">
      <Text className="text-white text-lg">Nearby Consultants</Text>
      <TouchableOpacity><Text className="text-white text-sm">More</Text></TouchableOpacity>
    </View>
    <ScrollView className="mt-4" horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row pl-6">
        {ProfileImages.map((image, i) => {
          return <Link
            key={i}
            asChild
            className="mr-4"
            href="../doctorprofile">
            <TouchableOpacity
              className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-white">
              {/* <View className="bg-red-50 w-16 h-16 rounded-full" /> */}
              <Image
                className="w-16 h-16 rounded-full"
                source={{ uri: image }}
              />
            </TouchableOpacity>
          </Link>
        })}
      </View>
    </ScrollView>
  </View>
}

const VideoConsultationSection = () => {
  return <View className="relative mt-6 mx-6 h-1/3 bg-purple-500 rounded-3xl py-6">
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="absolute top-0 left-0 bottom-0 right-0 rounded-3xl"
      colors={["#A770EF", "#CF8BF3", "#FDB99B"]}
    />
    <View className="px-6">
      <Text className="text-white text-4xl">Need a virtual consultation?</Text>
      <Text className="text-white text-sm mt-2">
        Meet with qualified Consultants and have a virtual consultation today
      </Text>
    </View>
    <TouchableOpacity className="mx-3 mt-4 px-4 flex flex-row items-center justify-between bg-white rounded-full h-12">
      <Text className="text-lg font-medium text-[#EB00FF] leading-6">Start new video chat</Text>
      <View className="bg-[#EB00FF] flex items-center justify-center rounded-full w-8 h-8">
        <Feather name="arrow-right" size={20} color="white" />
      </View>
    </TouchableOpacity>
  </View>
}

const FeedSection = () => {
  return <View className="flex mt-6">
    <View className="px-6 flex flex-row justify-between items-center">
      <Text className="text-white text-lg">Your Feed</Text>
      <TouchableOpacity><Text className="text-white text-sm">More</Text></TouchableOpacity>
    </View>
    <TouchableOpacity className="mt-4 mx-6 relative h-36 rounded-xl bg-red-50">
      <Image
        className="absolute top-0 left-0 right-0 bottom-0 rounded-xl"
        source={{
          uri: "https://h6etacfy2f.execute-api.us-east-1.amazonaws.com/default/images-resizer?path=prod/Iwaria/1920x1920/1668641398734.1118.jpeg"
        }} />
      <LinearGradient
        start={{ x: 0.5, y: 0.1 }}
        colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
        className="rounded-xl absolute top-0 left-0 right-0 bottom-0" />
      <View className="flex justify-end pb-3 px-3 mt-auto">
        <Text className="text-white text-lg font-medium">Did you know?</Text>
        <Text className="text-white text-sm mt-2">
          Your data is under your control as a citizen and as a basic Human Right. Talk to Healthify to learn More
        </Text>
      </View>
    </TouchableOpacity>
  </View>
}

export default function Home() {
  return (
    <View className="flex flex-1 bg-[#1F0945] pt-16 items-stretch">
      <StatusBar style="light" />
      <TopSection />
      <NearbyDoctorsSection />
      <VideoConsultationSection />
      <FeedSection />
      <HealthifyChatFAB />
    </View>
  );
}
