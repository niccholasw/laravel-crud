import axios from "axios";

// You can set the base URL of your Laravel backend here
const api = axios.create({
	baseURL: "http://localhost:8000/api", // Adjust this URL to your Laravel API
	headers: {
		"Content-Type": "application/json",
		// If you use a token-based authentication, add Authorization header here
		// 'Authorization': `Bearer ${token}`,
	},
});

export default api;
