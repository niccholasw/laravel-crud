import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import api from "../app/axios";
import { router } from "expo-router";

interface Wish {
	id: number;
	name: string;
	message: string | null;
	profile_picture: string;
}

const WishesList = () => {
	const [wishes, setWishes] = useState<Wish[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchWishes();
	}, []);

	const getProfilePicture = (uri: string) => {
		const imageUri = `http://10.0.2.2:8000/storage/${uri}`;
		console.log("Image URI:", imageUri);
		return imageUri;
	};

	const fetchWishes = async () => {
		try {
			const response = await api.get<Wish[]>("/wish");
			console.log("Wishes data:", response.data);
			setWishes(response.data);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await api.delete(`/wish/${id}`);
			setWishes((prevWishes) => prevWishes.filter((wish) => wish.id !== id));
		} catch (error) {
			console.error("Error deleting wish:", error);
		}
	};

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-gray-50">
				<Text className="text-lg text-gray-600">Loading wishes...</Text>
			</View>
		);
	}

	return (
		<FlatList<Wish>
			data={wishes}
			keyExtractor={(item) => item.id.toString()}
			contentContainerClassName="p-4 bg-gray-50"
			ItemSeparatorComponent={() => <View className="h-4" />}
			renderItem={({ item }) => (
				<View className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
					{/* picture / name displayed */}
					<View className="flex-row items-center p-4 border-b border-gray-100">
						<Image
							source={{ uri: getProfilePicture(item.profile_picture) }}
							style={{
								width: 56,
								height: 56,
								borderRadius: 28,
							}}
							className="bg-gray-100"
						/>
						<View className="ml-4 flex-1">
							<Text className="text-lg font-semibold text-gray-900 p-4">
								{item.name}
							</Text>
						</View>
					</View>

					{/* message displayed */}
					<View className="p-4">
						<Text className="text-gray-600 text-base leading-relaxed">
							{item.message}
						</Text>
					</View>

					{/* edit / delete buttons */}
					<View className="flex-row border-t border-gray-100">
						<Pressable
							onPress={() => router.push(`/${item.id}`)}
							className="flex-1 p-4 bg-gray-50 items-center border-r border-gray-100 active:bg-gray-100">
							<Text className="text-blue-500 font-semibold">Edit</Text>
						</Pressable>
						<Pressable
							onPress={() => handleDelete(item.id)}
							className="flex-1 p-4 bg-gray-50 items-center active:bg-gray-100">
							<Text className="text-red-500 font-semibold">Delete</Text>
						</Pressable>
					</View>
				</View>
			)}
			ListEmptyComponent={() => (
				<View className="flex-1 justify-center items-center p-8">
					<Text className="text-gray-500 text-lg text-center">
						No wishes found. Create your first wish!
					</Text>
				</View>
			)}
		/>
	);
};

export default WishesList;
