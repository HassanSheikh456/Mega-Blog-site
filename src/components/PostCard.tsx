import React from "react";
import appwriteServices from "../appwrite/config";
import { Link } from "react-router-dom";
import Image from "next/image";


type Post = {
  $id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
};

type CardProps = {
  post: Post;
};




const PostCard = ({post }: CardProps) => {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <Image
            alt={post.title}
            src={appwriteServices.getFilePreview(post.featuredImage)}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
