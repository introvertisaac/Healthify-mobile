import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';


type WeekDays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

type Availability = {
  [K in WeekDays]: {
    available: boolean;
    start_time: string;
    end_time: string;
  };
};

const availability: any = {
  "Monday": {
    available: true,
    start_time: "6:00am",
    end_time: "7:00pm",
  },
  "Tuesday": {
    available: true,
    start_time: "6:00am",
    end_time: "7:00pm",
  },
  "Wednesday": {
    available: true,
    start_time: "6:00am",
    end_time: "7:00pm",
  },
  "Thursday": {
    available: true,
    start_time: "6:00am",
    end_time: "7:00pm",
  },
  "Friday": {
    available: true,
    start_time: "6:00am",
    end_time: "7:00pm",
  },
  "Saturday": {
    available: true,
    start_time: "6:00am",
    end_time: "7:00pm",
  },
  "Sunday": {
    available: true,
    start_time: "6:00am",
    end_time: "7:00pm",
  }
}

const AvailabilityList = props => {
  return (
    <View className="w-full">
      {Object.keys(availability).map((day, i) => {
        const startTime = availability[day].startTime;
        const endTime = availability[day].endTime;
        return (
          <View
            key={day}
            className={`items-center justify-between py-2  ${i % 2 ? 'border-l border-r bg-white border-slate-200' : 'border border-purple-200 bg-purple-50'}`}>
            <Text
              className={`text-base text-slate-500`}>
              {day}
              {/* {_.capitalize(day)} */}
            </Text>
            <Text
              className={`text-xs text-slate-500`}>
              7.00 am to 4:00 pm
              {/* {getAvailabilityTime(startTime, endTime)} */}
            </Text>
          </View>
        );
      })}
    </View>
  );
};


const GradientSVG = () => (
  <Svg
    width={1060}
    height={670}
    fill="none"
  >
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M422.439 13.959c257.81 0 637.561-86.506 637.561 171.183C1060 497.853 735.295 670 422.439 670 171.237 670 0 436.227 0 185.142 0 7.211 244.424 13.959 422.439 13.959Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={530}
        x2={784.5}
        y1={0}
        y2={621.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.019} stopColor="#EB00FF" />
        <Stop offset={1} stopColor="#FF00A8" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default function DoctorProfile() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="pb-8 flex relative bg-white flex-1">
        <TouchableOpacity
          className="z-10 absolute top-10 left-6"
          onPress={() => {
            router.back()
          }}>
          <View className="flex items-center justify-center rounded-full w-10 h-10 bg-white shadow-2xl">
            <Feather name="arrow-left" size={20} color="black" />
          </View>
        </TouchableOpacity>

        <View className="absolute -translate-x-72 -translate-y-72 scale-50">
          <GradientSVG />
        </View>
        <View className="w-screen flex items-center justify-center mt-36">
          <TouchableOpacity
            className="relative flex items-center justify-center w-28 h-28 mt-2 rounded-full border-8 border-white">
            <Image
              className="absolute w-full h-full rounded-full"
              source={{ uri: 'https://images.unsplash.com/photo-1573496527892-904f897eb744?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            />
          </TouchableOpacity>

          <Text className="mt-3 text-2xl font-medium">Margaret Wangari</Text>
          <View className="mt-3">
            <View className="max-h-6 rounded-lg bg-purple-50 flex items-center justify-center">
              <Text className="text-purple-800 font-medium text-sm px-3">Paralegal</Text>
            </View>
          </View>

          <Text className="mt-3 text-center text-base mx-6">
            I'm passionate about Data Protection and Privacy Law, With a background in Data anonymization
          </Text>

          <View className="flex flex-row items-stretch w-screen px-6 space-x-3">
            <TouchableOpacity className="flex-1 mt-4 bg-[#FA14FF] rounded-md p-3 flex items-center justify-center">
              <Text className="font-medium text-white">Book</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 mt-4 border border-gray-300 rounded-md p-3 flex items-center justify-center">
              <Text className="font-medium text-black">Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View className="flex flex-row items-stretch w-screen px-6 space-x-3"> </View> */}
        <View className="px-6 mt-6">

          <Text className="font-medium text-gray-800 text-lg mb-3">Available hours</Text>
          <AvailabilityList />
        </View>
      </View>
    </ScrollView>
  );
}
