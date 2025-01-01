import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "Home" }} />
			<Stack.Screen name="profile" options={{ title: "Profile" }} />
		</Stack>
	);
}