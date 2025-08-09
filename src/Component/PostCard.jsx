import React from "react";
import { Link } from "react-router-dom";
import AppWriteService from "../appwrite/Conf";
import parse from "html-react-parser";
function PostCard({ title, content, slug, author, date, image}) {
  const imageUrl = image ? AppWriteService.getFilePreview(image) : null;
//   console.log("Image file ID:", image);
// console.log("Preview URL:", imageUrl);
  return (
    <div className="bg-[#fff7ed] border border-[#f97316]/30 rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col">
      {/* Featured Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="rounded-md mb-4 h-48 object-cover w-full"
        />
      )}

      {/* Title */}
      <Link to={`/post/${slug}`}>
        <h2 className="text-xl font-bold text-[#f97316] hover:text-[#fb923c] transition mb-2">
          {title}
        </h2>
      </Link>

      {/* Meta Info */}
      <div className="text-sm text-[#7c2d12] mb-2">
        By <span className="font-semibold">{author}</span> •{" "}
        {new Date(date).toLocaleDateString()}
      </div>

      {/* Content Snippet */}
   <div className="text-[#7c2d12] text-sm line-clamp-3 mb-4">
        {parse(content)}
      </div>
      {/* Read More */}
      <Link
        to={`/post/${slug}`}
        className="mt-auto inline-block text-sm text-white bg-[#f97316] hover:bg-[#fb923c] px-4 py-2 rounded-lg transition"
      >
        Read More →
      </Link>
    </div>
  );
}

export default PostCard;
