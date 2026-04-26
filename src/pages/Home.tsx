import { useEffect, useState } from "react";
import React from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

type Post = {
  $id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
};

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents as unknown as Post[]);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
