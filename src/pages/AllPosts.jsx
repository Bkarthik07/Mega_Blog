import React, { useEffect, useState } from 'react';
import AppWriteService from '../appwrite/Conf';
import { PostCard, Container } from '../Component';
import authService from "../appwrite/auth";
import { Query } from 'appwrite';
// Updated color palette
const skeletonColors = {
  base: "bg-[#fdead9]",      // light tan (card border)
  accent1: "bg-[#ffedd5]",   // lighter tan for image skeleton
  accent2: "bg-[#ff7300]",   // orange accent
  accent3: "bg-[#fdead9]",   // light tan
};

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      // Get logged-in user
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) return;

      // Fetch posts by this user only
      const res = await AppWriteService.getPosts([
        Query.equal("userid", currentUser.$id)
      ]);

      if (!res?.documents?.length) return;

      const docs = res.documents.map((post) => {
        const image = post.featuredimage;
     

        return {
          slug: post.$id,
          title: post.title,
          content: post.content,
          image,
          author: currentUser.name || currentUser.email || "Unknown",
          date: post.$createdAt
        };
      });

      setPosts(docs);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, []);

  return (
    <div className="w-full py-10 min-h-screen" style={{ background: "#FFF7ED" }}>
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center tracking-tight" style={{ color: "#7C2D12" }}>
          All Posts
        </h2>
        {posts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-2 md:px-0">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                {...post}
                cardStyle={{
                  border: "1.5px solid #FDEAD9",
                  background: "#fff",
                  color: "#7C2D12"
                }}
                accentColor="#FF7300"
                authorColor="#5B2C16"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-2 md:px-0">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse flex flex-col rounded-lg shadow p-4"
                style={{
                  background: "#fff",
                  border: "1.5px solid #FDEAD9"
                }}
              >
                <div className={`h-40 ${skeletonColors.accent1} rounded mb-4`}></div>
                <div className={`h-6 ${skeletonColors.accent2} rounded w-3/4 mb-2`}></div>
                <div className={`h-4 ${skeletonColors.accent3} rounded w-1/2 mb-2`}></div>
                <div className={`h-4 ${skeletonColors.base} rounded w-1/3`}></div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
