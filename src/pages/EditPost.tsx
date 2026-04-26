import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";

type Post = {
  $id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  featuredImage?: string;
};

const EditPost = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post as unknown as Post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
};

export default EditPost;
