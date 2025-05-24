"use client"

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
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Fetch posts from the API
        fetch('/api/posts')
            .then(res => res.json())
            .then((data: Post[]) => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <button>Create New Post</button>

            <h2>All Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}
