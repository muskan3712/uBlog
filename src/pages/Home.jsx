import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {PostCard} from '../components'
import {useSelector} from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus  = useSelector(state => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    console.log(posts)
  
    if (posts.length === 0 && !authStatus) {
        return (
            <div className="w-full py-8 text-center bg-[#202225]">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-white">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
            </div>
        )
    }
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

export default Home