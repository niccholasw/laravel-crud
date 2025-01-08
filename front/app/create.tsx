import { View, Text, Pressable } from "react-native";
import "../global.css";

export default function Profile() {
	return (
		<View className="flex-1 bg-white p-4">
			<View className="bg-gray-50 rounded-xl p-6">
				<View className="items-center">
					<Text className="text-2xl font-bold text-gray-800 mb-2">
						CREATE FRIEND WISH
					</Text>
				</View>
			</View>
			<View className="mt-6 space-y-3">
				<Text>Display here the fields to be create a wish</Text>
			</View>
		</View>
	);
}
