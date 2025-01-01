import { View, Text } from "react-native";
import "../global.css";

export default function Profile() {
	return (
		<View className="flex-1 bg-white p-4">
			<View className="bg-gray-50 rounded-xl p-6">
				<View className="items-center">
					{/* Profile picture placeholder */}
					<View className="w-24 h-24 rounded-full bg-gray-200 mb-4" />

					<Text className="text-2xl font-bold text-gray-800 mb-2">
						Profile Screen
					</Text>
					<Text className="text-gray-500 text-center">
						Welcome to your profile!
					</Text>
				</View>

				<View className="mt-6 space-y-3">
					<View className="flex-row justify-between items-center p-3 bg-white rounded-lg">
						<Text className="text-gray-600">Username</Text>
						<Text className="font-semibold">@johndoe</Text>
					</View>

					<View className="flex-row justify-between items-center p-3 bg-white rounded-lg">
						<Text className="text-gray-600">Email</Text>
						<Text className="font-semibold">john@example.com</Text>
					</View>
				</View>
			</View>
		</View>
	);
}
