import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: "#ffffff",
				},
				headerShadowVisible: true,
				headerTintColor: "#000000",
				headerTitleStyle: {
					fontWeight: "bold",
				},
				// Ensure header is shown
				headerShown: true,
				// Add consistent padding
				contentStyle: {
					backgroundColor: "#f5f5f5",
				},
			}}>
			<Stack.Screen
				name="index"
				options={{
					title: "Wishes",
					headerTitleStyle: {
						fontSize: 20,
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="edit"
				options={{
					title: "Edit Wish",
					// Explicitly show back button
					headerBackVisible: true,
					headerBackTitle: "Back",
				}}
			/>
			<Stack.Screen
				name="friendRequestForm"
				options={{
					title: "Create Wish",
					// Explicitly show back button
					headerBackVisible: true,
					headerBackTitle: "Back",
					// Add presentation style
					presentation: "card",
				}}
			/>
		</Stack>
	);
}
