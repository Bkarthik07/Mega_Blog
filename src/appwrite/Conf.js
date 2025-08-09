// import Config from "../conf/config"
import Config from "../conf/config";
import { Client,ID,Databases,Storage,Query } from "appwrite"


export class Service{
    client = new Client();
    
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(Config.appWriteUrl)
            .setProject(Config.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

async createPost({ title, slug, content, featuredimage, status, userid }) {
  try {
        console.log({ title, slug, content, featuredimage, status, userid }); // Add this line

    return await this.databases.createDocument(
      Config.appWriteDatabaseId,
      "6851a08b000a0604f37c",
      slug,
      {
        title,
        content,
        featuredimage,
        status,
        userid,
      }
    );
  } catch (error) {
    console.log("Error creating post:", error);
    return null; // explicitly return null so caller can handle it
  }
}


    async updatePost(slug,{title,content,featuredimage,status}){
        try {
            return await this.databases.updateDocument(
                Config.appWriteDatabaseId,
                "6851a08b000a0604f37c",
                slug,{
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost({slug}){
        try {
            await this.databases.deleteDocument(
                Config.appWriteDatabaseId,
                "6851a08b000a0604f37c",
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                Config.appWriteDatabaseId,
                "6851a08b000a0604f37c",
                slug
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                Config.appWriteDatabaseId,
                "6851a08b000a0604f37c",
                queries,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //file upload service;
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                Config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                Config.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId){
        // console.log(fileId);
        return this.bucket.getFileView(
            Config.appWriteBucketId,
            fileId
        )
    }


}

const AppWriteService = new Service()
export default AppWriteService;