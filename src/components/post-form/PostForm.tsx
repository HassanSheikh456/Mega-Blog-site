"use client";
import React, { useCallback, useEffect } from "react";
import { useForm, Control } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import Image from "next/image";

 type FormValues = {
  content: string;
};

type Post = {
  $id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  featuredImage?: string;
};

type Props = {
  post?: Post;
};
type FormData = {
  title: string;
  slug: string;
  content: string;
  status: string;
  image: FileList;
  featuredImage?: string;
};

const PostForm = ({ post }: Props) => {
  const { register, handleSubmit, getValues, setValue, watch, control } =
    useForm<FormData>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();

  const userData = useSelector<RootState, { $id: string } | null>(
    (state) => state.auth.userData,
  );

  const submit = async (data: FormData) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadfile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const udpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (udpost) {
        navigate(`/post/${udpost.$id}`);
      } else {
        if (!userData) return;

        const file = await appwriteService.uploadfile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          const dbPost = await appwriteService.createPost({
            title: data.title,
            slug: data.slug,
            content: data.content,
            status: data.status,
            featuredImage: fileId,
            userID: userData.$id,
          });
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    }
  };

  const slugTransform = useCallback((value: string) => {
    return value
      ?.trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title || ""), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e: React.InputEvent<HTMLInputElement>) => {
            setValue("slug", slugTransform(e.currentTarget.value));
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={(control as unknown) as Control<FormValues>}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <Image
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
