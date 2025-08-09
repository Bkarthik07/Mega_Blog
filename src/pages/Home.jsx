import React, { useEffect, useState } from 'react';
import AppWriteService from '../appwrite/Conf';
import { Container, PostCard } from '../Component';

const skeletonColors = {
  base: "bg-[#fdead9]",      // light tan (card border)
  accent1: "bg-[#ffedd5]",   // lighter tan for image skeleton
  accent2: "bg-[#ff7300]",   // orange accent
  accent3: "bg-[#fdead9]",   // light tan
};

function SkeletonPostCard() {
  return (
    <div className={`rounded-lg shadow-md p-4 animate-pulse ${skeletonColors.base}`}>
      <div className={`h-40 w-full rounded-md mb-4 ${skeletonColors.accent1}`}></div>
      <div className={`h-6 w-3/4 rounded ${skeletonColors.accent2} mb-2`}></div>
      <div className={`h-4 w-1/2 rounded ${skeletonColors.accent3} mb-4`}></div>
      <div className="flex items-center space-x-2">
        <div className={`h-8 w-8 rounded-full ${skeletonColors.accent1}`}></div>
        <div className={`h-4 w-20 rounded ${skeletonColors.accent3}`}></div>
      </div>
    </div>
  );
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AppWriteService.getPosts().then((response) => {
      if (response && response.documents) {
        setPosts(response.documents);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="py-10 bg-[#fff7ed] min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold text-[#7c2d12] mb-6 text-center">Latest Posts</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonPostCard key={idx} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-[#a16207]">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.$id}
                slug={post.$id}
                title={post.title}
                content={post.content}
                image={post.featuredimage}
                author={post.userid || post.name || "Unknown"}
                date={post.$createdAt}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
