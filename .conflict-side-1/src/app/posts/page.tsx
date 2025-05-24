"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    body: string;
    latitude: number | null;
    longitude: number | null;
    userId: number | null;
    createdAt: number | null;
}

export default function PostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Fetch posts from the API
        fetch('/api/posts')
            .then(res => res.json())
            .then((data: Post[]) => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <header className="mb-10 text-center">
                <div className="flex items-center justify-center mb-2">
                    <h1 className="text-5xl font-extrabold ml-3 text-foreground">
                        Posts
                    </h1>
                </div>
            </header>
            <Button onClick={() => router.push('/posts/create')}>Create New Post</Button>

            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}
