import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppWriteService from "../appwrite/Conf";
import { Button, Container } from "../Component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

const isAuthor = post?.userid && userData?.$id && post.userid.trim() === userData.$id.trim();
  console.log("Post.jsx userData:", userData); // Debug log
  console.log(post?.userid);
  console.log(userData?.$id) // Debug log

useEffect(() => {
  console.log("Post.jsx slug param:", slug); // Debug log
  if (slug && typeof slug === "string" && slug !== "undefined") {
    AppWriteService.getPost(slug).then((post) => {
      if (post) setPost(post);
      else navigate("/");
    });
  } else {
    navigate("/");
  }
}, [slug, navigate]);

  const deletePost = () => {
    AppWriteService.deletePost({ slug: post.$id }).then((status) => {
      if (status) {
        AppWriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 sm:py-10 bg-[#fff7ed] min-h-screen">
      <Container>
        {/* Image + Edit/Delete Buttons */}
        <div className="relative mb-6 rounded-2xl overflow-hidden border border-[#f97316]/30 shadow-sm">
          {post.featuredimage && (
            <img
              src={AppWriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="w-full h-48 sm:h-64 md:h-[400px] object-cover object-center transition-all duration-300"
            />
          )}

          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm">Edit</Button>
              </Link>
              <Button
                onClick={deletePost}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#7c2d12] leading-tight">{post.title}</h1>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-[#7c2d12] prose-headings:text-[#f97316] prose-a:text-[#fb923c]">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-[#fff7ed]">
      <p className="text-[#7c2d12] text-lg">Loading...</p>
    </div>
  );
}

export default Post;
