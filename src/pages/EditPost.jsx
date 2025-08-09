import React, { useEffect, useState } from 'react';
import AppWriteService from '../appwrite/Conf';
import { Container, PostForm } from '../Component';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      AppWriteService.getPost(slug).then((postData) => {
        if (postData) {
          setPost(postData);
        } else {
          navigate('/');
        }
      });
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-10 bg-[#fff7ed] min-h-screen">
      <Container>
        <h2 className="text-2xl font-bold text-[#7c2d12] mb-6 text-center">Edit Post</h2>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-[#fff7ed]">
      <p className="text-[#7c2d12] text-lg">Loading post...</p>
    </div>
  );
}

export default EditPost;
