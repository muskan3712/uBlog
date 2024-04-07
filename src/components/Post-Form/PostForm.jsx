import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select} from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log("data", data);

    if (post) {
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const dbPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="w-full text-white bg-[#202225]  p-5">
      <form
        onSubmit={handleSubmit(submit)}
        className=" flex flex-wrap gap-5 justify-center"
      >
        <div className="flex flex-col max-w-[400px]">
          <Input
            label="title: "
            type
            placeholder="Enter title"
            {...register("title", {
              required: true,
            })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <label htmlFor="yourTextareaName" className="mb-2 text-lg font-semibold">Your Message</label>
        <textarea
          id="yourTextareaName"
          {...register("content", { required: true })}
          className="w-full h-[300px] border text-black border-gray-300 p-2 rounded-md"
          placeholder="Type your message here..."
        ></textarea>
        </div>

        <div className="flex flex-col w-[400px]">
          <Select
            options={["active", "inactive"]}
            label="Status: "
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-600 hover:bg-green-300" : undefined}
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
