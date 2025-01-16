import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	Image,
} from "react-native";
import api from "./axios";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

interface FriendRequestData {
	name: string;
	message: string;
	profile_picture: string;
}

const FriendRequestForm = () => {
	const [formData, setFormData] = useState<FriendRequestData>({
		name: "",
		message: "",
		profile_picture: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState<string | null>(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled && result.assets) {
			const selectedImage = result.assets[0];
			setImage(selectedImage.uri); // For preview
			setFormData({ ...formData, profile_picture: selectedImage.uri });
		}
	};

	const handleSubmit = async () => {
		if (!formData.name.trim()) {
			Alert.alert("Error", "Please enter a name");
			return;
		}

		try {
			setIsLoading(true);

			const data = new FormData();
			data.append("name", formData.name);
			data.append("message", formData.message);

			if (formData.profile_picture) {
				const uriParts = formData.profile_picture.split(".");
				const fileType = uriParts[uriParts.length - 1];

				data.append("profile_picture", {
					uri: formData.profile_picture,
					name: `profile_picture.${fileType}`,
					type: `image/${fileType}`,
				});
			}

			const response = await api.post("/wish", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 200) {
				Alert.alert("Success", "Friend request sent successfully!");
				setFormData({ name: "", message: "", profile_picture: "" });
				setImage(null); // Reset image preview
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
						Message
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
				<View>
					<Text className="text-sm font-medium text-gray-700 mb-2">
						Profile Picture
					</Text>
					<TouchableOpacity
						className="w-full py-2 bg-blue-500 rounded-md"
						onPress={pickImage}>
						<Text className="text-center text-white font-medium">
							Pick an Image
						</Text>
					</TouchableOpacity>
					{image && (
						<Image
							source={{ uri: image }}
							className="w-full h-40 mt-4 rounded-md"
						/>
					)}
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
