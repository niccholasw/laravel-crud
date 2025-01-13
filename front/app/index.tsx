import { View, Text, Pressable } from "react-native";
import "../global.css";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // For the icon
import WishesList from "../components/Wishes";
import React from "react";

export default function Profile() {
	return (
		<View className="flex-1 bg-gray-100 p-5">
			{/* Header Section */}
			<View className="bg-white rounded-2xl shadow-lg p-6 mb-8">
				<View className="items-center mb-4">
					<Text className="text-3xl font-bold text-gray-800">
						Friend Wishes
					</Text>
					<Text className="text-sm text-gray-500 mt-2">
						View and manage all your sent wishes
					</Text>
				</View>
			</View>

			{/* Sent Wishes Section */}
			<View className="mb-6">
				<Text className="text-2xl font-semibold text-gray-800">
					Sent Wishes
				</Text>
			</View>

			{/* Create Wish Button */}
			<Pressable
				onPress={() => router.push("/create")}
				className="flex-row items-center justify-center bg-blue-500 p-4 rounded-xl shadow-md">
				<MaterialIcons name="add-circle" size={24} color="white" />
				<Text className="ml-2 text-white font-semibold text-lg">
					Create Wish
				</Text>
			</Pressable>

			{/* List of Wishes */}
			<View className="mt-6">
				<WishesList></WishesList>
			</View>
		</View>
	);
}
