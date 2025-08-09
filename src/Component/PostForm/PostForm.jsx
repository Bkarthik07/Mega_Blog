import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import AppWriteService from "../../appwrite/Conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log("userData from Redux:", userData);
  const submit = async (data) => {
    try {
      let file = null;

      if (data.image?.[0]) {
        file = await AppWriteService.uploadFile(data.image[0]);
      }

      if (post) {
        if (file && post.featuredimage) {
          await AppWriteService.deleteFile(post.featuredimage);
        }

        const updatedPost = await AppWriteService.updatePost(post.$id, {
          ...data,
          featuredimage: file ? file.$id : post.featuredimage,
        });

        if (updatedPost?.$id) {
          navigate(`/post/${updatedPost.$id}`);
        } else {
          setError("Failed to update post.");
        }
      } else {
        const fileId = file?.$id || null;

        const newPost = await AppWriteService.createPost({
          ...data,
          featuredimage: fileId,
          userid: userData.$id,
        });

        if (newPost?.$id) {
          navigate(`/post/${newPost.$id}`);
        } else {
          setError("Post creation failed.");
        }
      }
    } catch (err) {
      setError("Something went wrong. " + err.message);
    }
  };

  const slugTransform = useCallback((value) => {
    return value
      ?.trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const transformed = slugTransform(value.title);
        setValue("slug", transformed, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <section className="min-h-screen bg-[#fff7ed] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-[#f97316]/30">
        <h1 className="text-3xl font-bold text-center text-[#7c2d12] mb-6">
          {post ? "Edit Post" : "Create New Post"}
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <Input
            label="Post Title"
            placeholder="Enter title"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug (auto-generated)"
            placeholder="auto-generated-slug"
            readOnly
            {...register("slug", { required: true })}
          />

          <Input
            label="Upload Featured Image"
            type="file"
            accept="image/*"
            {...register("image", { required: !post })}
          />

          {post?.featuredimage && (
            <div className="w-full">
              <img
                src={AppWriteService.getFilePreview(post.featuredimage)}
                alt="Preview"
                className="rounded-lg w-full h-auto"
              />
            </div>
          )}

          <Select
            label="Status"
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            {...register("status", { required: true })}
          />

          <RTE
            name="content"
            label="Content"
            control={control}
            defaultValue={getValues("content")}
          />

          <div className="pt-4">
            <Button type="submit" className="w-full">
              {post ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PostForm;
