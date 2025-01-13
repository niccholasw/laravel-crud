import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import api from "../app/axios";
import { router } from "expo-router";

interface Wish {
	id: number;
	name: string;
	message: string;
}

const WishesList = () => {
	const [wishes, setWishes] = useState<Wish[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await api.get<Wish[]>("/wish");
			console.log("Wishes data:", response.data); // Add this to verify data
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
			<View className="flex-1 justify-center items-center">
				<Text className="text-lg">Loading...</Text>
			</View>
		);
	}

	return (
		<FlatList<Wish>
			data={wishes}
			keyExtractor={(item) => item.id.toString()}
			contentContainerClassName="p-4"
			ItemSeparatorComponent={() => <View className="h-4" />}
			renderItem={({ item }) => (
				<View className="bg-white rounded-lg shadow-md overflow-hidden">
					{/* Wish Content */}
					<View className="p-4">
						<Text className="text-lg font-semibold mb-2">{item.name}</Text>
						<Text className="text-gray-600">{item.message}</Text>
					</View>

					{/* Action Buttons */}
					<View className="flex-row border-t border-gray-100">
						<Pressable
							onPress={() => router.push(`/${item.id}`)}
							className="flex-1 p-3 bg-gray-50 items-center border-r border-gray-100">
							<Text className="text-blue-500 font-medium">Edit</Text>
						</Pressable>

						<Pressable
							onPress={() => handleDelete(item.id)}
							className="flex-1 p-3 bg-gray-50 items-center">
							<Text className="text-red-500 font-medium">Delete</Text>
						</Pressable>
					</View>
				</View>
			)}
			ListEmptyComponent={() => (
				<View className="flex-1 justify-center items-center p-4">
					<Text className="text-gray-500 text-lg">No wishes found</Text>
				</View>
			)}
		/>
	);
};

export default WishesList;
