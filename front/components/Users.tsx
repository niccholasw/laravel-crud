import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../app/axios";

// Define the User interface
interface User {
	id: number;
	name: string;
	email: string;
}

const UserList = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await api.get<User[]>("/users");
			setUsers(response.data);
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
			<FlatList<User>
				data={users}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View className="p-4 my-2 bg-white rounded-lg shadow-md">
						<Text>Name: {item.name}</Text>
						<Text>Email: {item.email}</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default UserList;
