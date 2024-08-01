// src/infrastructure/services/fake-api.service.ts

import { EnvConfig } from "../config/env-config.interface";

const fakeUser = {
  id: "1",
  name: "Fake User",
  email: "fakeuser@example.com",
  password: "password123", // Not recommended for production
};

export class FakeApiService {
  private config: EnvConfig;

  constructor(config: EnvConfig) {
    this.config = config;
  }

  async login(email: string, password: string): Promise<string> {
    // Simulate API login
    if (email === fakeUser.email && password === fakeUser.password) {
        // Simulate successful login response with a token or URL
        console.log(Promise.resolve("fake-login-success-url"));
      return Promise.resolve("fake-login-success-url");
    } else {
        // Simulate login failure
      return Promise.reject(new Error("Invalid credentials"));
    }
  }

    
  // Additional methods for logout or fetching data can be added here
}
