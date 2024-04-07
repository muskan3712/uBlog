import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-[#202225] ">
    <div className=" m-10 p-4 rounded-lg shadow-sm shadow-gray-700">
      <div className="flex items-center flex-col">
        <h1 className="text-2xl text-white font-bold p-8">{post.title}</h1>
      <h3 className="text-white p-8">
      {post.content}
      </h3>
      </div>
      {isAuthor && (
  <div className="w-full flex justify-center">
    <Link to={`/edit-post/${post.$id}`} className="">
      <Button bgColor="bg-green-500" className="py-3 px-10 h-full mr-6">
        Edit
      </Button>
    </Link>
    <Button bgColor="bg-red-500" onClick={deletePost}
    className="py-3 px-10">
      Delete
    </Button>
  </div>
)}
</div>
    </div>
  ) : null;
}




      