import {Client, Databases, Storage} from 'appwrite'
import conf from '../conf/conf'

export class Service{
    client = new Client()
    databases
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createPost({title, slug, content, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite service :: createPost :: error: ", error)
        }
    }

    async updatePost(slug, {title, content, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite service :: updatePost :: error: ", error)
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }catch(error){
            console.log("appwrite service :: deleltePost :: error: ", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await  this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite service :: getPost :: error: ", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
}

const service = new Service()

export default service