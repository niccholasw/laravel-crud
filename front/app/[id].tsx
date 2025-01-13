import { useRouter, useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from "react-native";
import api from "../app/axios";

export default function Edit() {
	const router = useRouter();
	const { id } = useGlobalSearchParams(); // Get the ID of the wish to edit
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	// Fetch the existing data for the wish
	useEffect(() => {
		if (id) {
			fetchWish();
		}
	}, [id]);

	const fetchWish = async () => {
		try {
			const response = await api.get(`/wish/${id}`);
			const { name, message } = response.data;
			setName(name);
			setMessage(message || ""); // Default to an empty string if message is null
		} catch (error) {
			Alert.alert("Error", "Failed to fetch the wish. Please try again.");
			console.error("Error fetching wish:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSave = async () => {
		if (!name.trim()) {
			Alert.alert("Error", "Name cannot be empty.");
			return;
		}

		try {
			setSaving(true);
			const response = await api.put(`/wish/${id}`, { name, message });
			if (response.status === 200) {
				Alert.alert("Success", "Wish updated successfully!");
				router.back(); // Navigate back to the previous screen
			}
		} catch (error) {
			Alert.alert("Error", "Failed to update the wish. Please try again.");
			console.error("Error updating wish:", error);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#007BFF" />
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 p-4 bg-white">
			<Text className="text-2xl font-bold text-gray-800 mb-4">Edit Wish</Text>

			<View className="space-y-4">
				<View>
					<Text className="text-sm font-medium text-gray-700 mb-1">Name</Text>
					<TextInput
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500"
						value={name}
						onChangeText={setName}
						placeholder="Enter a name"
						autoCapitalize="words"
					/>
				</View>

				<View>
					<Text className="text-sm font-medium text-gray-700 mb-1">
						Message
					</Text>
					<TextInput
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500"
						value={message}
						onChangeText={setMessage}
						placeholder="Enter a message (optional)"
						multiline
						numberOfLines={3}
					/>
				</View>

				<TouchableOpacity
					className={`w-full py-3 rounded-md ${
						saving ? "bg-blue-300" : "bg-blue-500"
					}`}
					onPress={handleSave}
					disabled={saving}>
					<Text className="text-white text-center font-medium">
						{saving ? "Saving..." : "Save Changes"}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="w-full py-3 rounded-md bg-red-500"
					onPress={() => router.back()}>
					<Text className="text-white text-center font-medium">Cancel</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
