"use client";

import { LoginForm, LoginFormValues } from "@/components/flash-aid/login-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to create user (${response.status})`
        );
      }

      const data = await response.json();
      console.log("User created", data);

      router.push("/");
    } catch (error) {
      console.error("Error creating user:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create user"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center mb-2">
          <h1 className="text-5xl font-extrabold ml-3 text-foreground">
            Log in or Sign up
          </h1>
        </div>
      </header>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md max-w-md w-full">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
      <LoginForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
}
