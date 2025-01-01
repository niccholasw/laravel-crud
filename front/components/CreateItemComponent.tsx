// src/components/CreateItemComponent.js
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import api from "../app/axios"; // Import the Axios instance

const CreateItemComponent = () => {
	const [name, setName] = useState("");

	const createItem = () => {
		api
			.post("/items", { name }) // POST request to /items with the name data
			.then((response) => {
				console.log("Item created:", response.data);
			})
			.catch((error) => {
				console.error("Error creating item:", error);
			});
	};

	return (
		<View>
			<TextInput
				placeholder="Enter item name"
				value={name}
				onChangeText={setName}
			/>
			<Button title="Create Item" onPress={createItem} />
		</View>
	);
};

export default CreateItemComponent;
