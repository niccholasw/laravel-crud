import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import "../global.css";

export default function Home() {
	const router = useRouter();
	return (
		<View className="flex-1 bg-white p-4">
			<View className="bg-gray-50 rounded-xl p-6">
				<View className="items-center">
					{/* Welcome Icon/Logo placeholder */}
					<View className="w-24 h-24 rounded-full bg-blue-200 mb-4 items-center justify-center">
						<Text className="text-4xl">🏠</Text>
					</View>
					<Text className="text-2xl font-bold text-gray-800 mb-2">
						Welcome Home
					</Text>
					<Text className="text-gray-500 text-center mb-6">
						Explore our app features and services
					</Text>
				</View>

				<View className="space-y-3">
					<Pressable
						onPress={() => router.push("/profile")}
						className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm">
						<View>
							<Text className="text-lg font-semibold text-gray-800">
								Your Profile
							</Text>
							<Text className="text-gray-500">
								View and edit your information
							</Text>
						</View>
						<Text className="text-blue-500">→</Text>
					</Pressable>

					<View className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm">
						<View>
							<Text className="text-lg font-semibold text-gray-800">
								Quick Stats
							</Text>
							<Text className="text-gray-500">View your activity</Text>
						</View>
						<View className="bg-green-100 px-3 py-1 rounded-full">
							<Text className="text-green-700">Active</Text>
						</View>
					</View>

					<View className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm">
						<View>
							<Text className="text-lg font-semibold text-gray-800">
								Messages
							</Text>
							<Text className="text-gray-500">Check your inbox</Text>
						</View>
						<View className="bg-blue-100 px-2 py-1 rounded-full">
							<Text className="text-blue-700">3 New</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
