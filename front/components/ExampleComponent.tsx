// src/components/ExampleComponent.js
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import api from "../app/axios"; // Import the Axios instance

const ExampleComponent = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		// Fetch data when the component mounts
		api
			.get("/example") // Make a GET request to /example endpoint
			.then((response) => {
				setData(response.data); // Save the response data in state
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<View>
			{data ? <Text>{JSON.stringify(data)}</Text> : <Text>Loading...</Text>}
			<Button title="Reload" onPress={() => setData(null)} />
		</View>
	);
};

export default ExampleComponent;
