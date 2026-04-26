import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { RootState } from "../store/store";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import Image from "next/image";
import { Button } from "../components/index";
import parse from "html-react-parser";

type Post = {
  $id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  userId: string;
  featuredImage?: string;
};

const Post = () => {
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  const userData = useSelector<RootState, { $id: string } | null>(
    (state) => state.auth.userData,
  );
  const isAuther = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post as unknown as Post);
        else navigate("/");
      });
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post?.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post?.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-lg p-2">
          <Image
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-lg"
          />
          {isAuther && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="mr-3" bgColor="bg-blue-500">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
};

export default Post;
