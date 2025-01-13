import { View, Text, Pressable } from "react-native";
import "../global.css";
import { router } from "expo-router";
import Wishes from "../components/Wishes";

export default function Profile() {
	return (
		<View className="flex-1 bg-white p-4">
			<View className="bg-gray-50 rounded-xl p-6">
				<View className="items-center">
					<Text className="text-2xl font-bold text-gray-800 mb-2">
						Friend wishes
					</Text>
				</View>
			</View>
			<View className="mt-6 space-y-3">
				<Text className="text- font-bold text-gray-800">Sent wishes</Text>
			</View>
			<Pressable onPress={() => router.push("/create")}>
				<Text>Create wish</Text>
			</Pressable>
			<Wishes></Wishes>
		</View>
	);
}
