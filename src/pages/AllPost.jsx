import React, {useState, useEffect} from 'react'
import { PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    }, [])
 
  return (
    <div className='w-full bg-[#202225] py-10 '>

            <div className='flex flex-wrap justify-center'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-3'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
    </div>
  )
}

export default AllPosts