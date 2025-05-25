"use client"

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

interface User {
    id: number;
    name: string;
}

export default function PostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<{ [key: number]: User }>({});

    useEffect(() => {
        // Fetch posts from the API
        fetch('/api/posts')
            .then(res => res.json())
            .then((data: Post[]) => {
                setPosts(data);
                
                // Get unique user IDs
                const userIds = [...new Set(data.map(post => post.userId).filter(Boolean))];
                
                // Fetch user data for each unique user ID
                Promise.all(
                    userIds.map(userId => 
                        fetch(`/api/users/${userId}`)
                            .then(res => res.json())
                            .catch(() => ({ id: userId, name: 'Unknown User' }))
                    )
                ).then(userData => {
                    const userMap = userData.reduce((acc, user) => {
                        acc[user.id] = user;
                        return acc;
                    }, {} as { [key: number]: User });
                    setUsers(userMap);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="w-full max-w-3xl min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <header className="mb-10 text-center">
                <div className="flex items-center justify-center mb-2">
                    <h1 className="text-5xl font-extrabold ml-3 text-foreground">
                        Posts
                    </h1>
                </div>
            </header>
            <Button className="w-full mb-4" onClick={() => router.push('/posts/create')}>Create New Post</Button>

            <ul className="w-full space-y-4">
                {posts.map(post => (
                    <li key={post.id}>
                        <Card className="w-full shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold">
                                    {post.title}
                                </CardTitle>
                                <CardDescription>
                                    {post.body}
                                </CardDescription>
                                <div className="flex items-center">
                                    {post.latitude && post.longitude ? (
                                        <p className="text-sm text-muted-foreground">
                                            Location: {post.latitude}, {post.longitude}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            Location: Not specified
                                        </p>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    By: {post.userId ? users[post.userId]?.name || 'Loading...' : 'Anonymous'}
                                </p>
                            </CardHeader>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
}
