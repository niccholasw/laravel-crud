import { View, Text, Pressable } from "react-native";
import "../global.css";
import { router } from "expo-router";

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
				<Text>Wishes will be stacked below here</Text>
			</View>

			<Pressable
				onPress={() => router.push("/profile")}
				className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm">
				<View>
					<Text className="text-lg font-semibold text-gray-800">
						Edit this wish
					</Text>
				</View>
				<Text className="text-blue-500">→</Text>
			</Pressable>
		</View>
	);
}
