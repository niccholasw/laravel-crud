import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import api from "../app/axios";
import { router } from "expo-router";

// Define the User interface
interface Wish {
	id: number;
	name: string;
	message: string;
}

const UserList = () => {
	const [wishes, setWishes] = useState<Wish[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await api.get<Wish[]>("/wish");
			setWishes(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching users:", error);
			setLoading(false);
		}
	};

	if (loading) {
		return <Text className="text-center">Loading...</Text>;
	}

	return (
		<View className="flex-1 p-4">
			<FlatList<Wish>
				data={wishes}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<>
						<Text></Text>
						<View className="p-4 my-2 bg-white rounded-lg shadow-md">
							<Text>Name: {item.name}</Text>
							<Text>Message: {item.message}</Text>
						</View>
						<Pressable
							onPress={() => router.push("/edit")}
							className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm">
							<View>
								<Text className="text-lg font-semibold text-gray-800">
									Edit this wish
								</Text>
							</View>
							<Text className="text-blue-500">→</Text>
						</Pressable>
					</>
				)}
			/>
		</View>
	);
};

export default UserList;
