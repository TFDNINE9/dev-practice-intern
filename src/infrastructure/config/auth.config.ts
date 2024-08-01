// src/infrastructure/config/auth.config.ts

import { EnvConfig } from "./env-config.interface";
import { FakeApiService } from "../services/fake-api.services";

// Example environment configuration, this would usually be sourced from environment variables
const envConfig: EnvConfig = {
  API_URL: "https://fake-api.example.com",
  JWT_SECRET: "your-jwt-secret",
};

// Initialize and export the service with the configuration
export const authUseCases = new FakeApiService(envConfig);
