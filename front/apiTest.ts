// apiTest.ts
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

interface TestResponse {
	message?: string;
	token?: string;
	[key: string]: any;
}

// Create test instance without any complex setup
const testApi: AxiosInstance = axios.create({
	baseURL: "http://10.0.2.2:8000/api",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

const testConnection = async (): Promise<boolean> => {
	try {
		console.log("🔍 Starting API connection test...");

		// Test 1: Basic connectivity
		console.log("\nTest 1: Testing basic connectivity...");
		const basicResponse = await testApi.get<TestResponse>("/test");
		console.log("✅ Basic connectivity successful:", basicResponse.data);

		// Test 2: CSRF endpoint
		console.log("\nTest 2: Testing CSRF endpoint...");
		const csrfResponse = await testApi.get<TestResponse>("/csrf-token");
		console.log("✅ CSRF endpoint response:", csrfResponse.data);

		// Test 3: CORS headers
		console.log("\nTest 3: Checking CORS headers...");
		const corsResponse = await testApi.options("/");
		console.log("✅ CORS headers:", corsResponse.headers);

		return true;
	} catch (error) {
		console.log("\n❌ === API Test Error === ❌");

		const axiosError = error as AxiosError;

		console.log("Error type:", axiosError.name);
		console.log("Error message:", axiosError.message);

		if (axiosError.response) {
			// Server responded with error
			console.log("\nServer Response:", {
				status: axiosError.response.status,
				statusText: axiosError.response.statusText,
				headers: axiosError.response.headers,
				data: axiosError.response.data,
			});
		} else if (axiosError.request) {
			// Request made but no response
			console.log("\nNo response received from server");
			console.log("Request details:", {
				method: axiosError.config?.method,
				url: axiosError.config?.url,
			});
		} else {
			// Error in request setup
			console.log("\nError setting up request:", axiosError.message);
		}

		if (axiosError.config) {
			console.log("\nRequest Config:", {
				url: axiosError.config.url,
				method: axiosError.config.method,
				baseURL: axiosError.config.baseURL,
				timeout: axiosError.config.timeout,
				headers: axiosError.config.headers,
			});
		}

		return false;
	}
};

// Simple test endpoints
const quickTest = {
	testGet: async () => {
		try {
			const response = await testApi.get<TestResponse>("/test");
			console.log("GET Test successful:", response.data);
			return response.data;
		} catch (error) {
			console.error("GET Test failed:", error);
			throw error;
		}
	},

	testCsrf: async () => {
		try {
			const response = await testApi.get<TestResponse>("/csrf-token");
			console.log("CSRF Test successful:", response.data);
			return response.data;
		} catch (error) {
			console.error("CSRF Test failed:", error);
			throw error;
		}
	},
};

export { testConnection, testApi, quickTest };
