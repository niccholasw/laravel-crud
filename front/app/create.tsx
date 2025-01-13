import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import api from "../app/axios";
import { router } from "expo-router";

interface FriendRequestData {
	name: string;
	message: string;
}

const FriendRequestForm = () => {
	const [formData, setFormData] = useState<FriendRequestData>({
		name: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		if (!formData.name.trim()) {
			Alert.alert("Error", "Please enter a name");
			return;
		}

		try {
			setIsLoading(true);
			const response = await api.post("/wish", formData);

			if (response.status === 200) {
				Alert.alert("Success", "Friend request sent successfully!");
				// Reset form
				setFormData({ name: "", message: "" });
			}
			router.push("/");
		} catch (error) {
			Alert.alert("Error", "Failed to send friend request. Please try again.");
			console.error("Error sending friend request:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View className="p-4 bg-white rounded-lg shadow-sm">
			<Text className="text-xl font-bold mb-4 text-gray-800">
				Send Friend Request
			</Text>

			<View className="space-y-4">
				<View>
					<Text className="text-sm font-medium text-gray-700 mb-1">
						Friend's Name
					</Text>
					<TextInput
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500"
						value={formData.name}
						onChangeText={(text) => setFormData({ ...formData, name: text })}
						placeholder="Enter friend's name"
						autoCapitalize="words"
					/>
				</View>

				<View>
					<Text className="text-sm font-medium text-gray-700 mb-1">
						Message (Optional)
					</Text>
					<TextInput
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500"
						value={formData.message}
						onChangeText={(text) => setFormData({ ...formData, message: text })}
						placeholder="Add a message..."
						multiline
						numberOfLines={3}
					/>
				</View>

				<TouchableOpacity
					className={`w-full py-3 rounded-md ${
						isLoading ? "bg-blue-300" : "bg-blue-500"
					}`}
					onPress={handleSubmit}
					disabled={isLoading}>
					<Text className="text-white text-center font-medium">
						{isLoading ? "Sending..." : "Send Friend Request"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default FriendRequestForm;
