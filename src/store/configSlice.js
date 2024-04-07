import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    posts: [
        {
            slug: "",
            title: "",
            content: "",
            status: "",
            userId: "",
        }
    ],
}

const configSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPost: (state, action)=>{
            const {slug, title, content, status, userId} = action.payload
            const post = {
                slug: slug,
                title: title,
                content: content,
                status: status,
                userId: userId,
            }
            state.posts.push(post);
        },

        deletePost: (state, action)=>{
            state.posts = state.posts.filter((post)=> (post.slug !== action.payload))
        },

        updatePost: (state, action)=>{
            const {slug, title, content, status} = action.payload
            state.posts = state.posts
            .map((post)=> 
            (post.slug === slug) ?
            {...post,
            title: title,  
            content: content, 
            status: status} :  post)
        }
        
    }
})

export const {createPost, deletePost, updatePost} = configSlice.actions

export default configSlice.reducer