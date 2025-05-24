"use client"

import { PostForm, PostFormValues } from "@/components/flash-aid/post-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostCreationPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = async (values: PostFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to create post (${response.status})`);
            }

            const data = await response.json();
            console.log('Post created', data);

            router.push('/posts');
        } catch (error) {
            console.error('Error creating post:', error);
            setError(error instanceof Error ? error.message : 'Failed to create post');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <header className="mb-10 text-center">
                <div className="flex items-center justify-center mb-2">
                    <h1 className="text-5xl font-extrabold ml-3 text-foreground">
                        Create a Post
                    </h1>
                </div>
            </header>
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md max-w-md w-full">
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}
            <PostForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
    );
}