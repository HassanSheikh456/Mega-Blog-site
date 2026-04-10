import React from "react";
import appwriteServices from "../appwrite/config";
import { Link } from "react-router-dom";
import Image from "next/image";

type cardProps = {
  $id: string;
  title: string;
  featuredImage: string;
};

const PostCard = ({ $id, title, featuredImage }: cardProps) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <Image alt={title} src={appwriteServices.getFilePreview(featuredImage)}
          className="rounded-xl" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
