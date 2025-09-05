declare module "#auth-utils" {
  interface User {
    email: string;
    name: string;
    admin: boolean;
  }

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};
