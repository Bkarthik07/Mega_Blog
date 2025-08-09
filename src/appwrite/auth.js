// import { use } from "react";
import Config from "../conf/config";
import { Client, Account, ID } from "appwrite";
import { Databases, Storage } from "appwrite";


// const client = new Client()
//     .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(), 
//     'email@example.com', 
//     'password'
// );

export class AuthService{
    client = new Client();
    account;


    constructor(){
        this.client
            .setEndpoint(Config.appWriteUrl)
            .setProject(Config.appWriteProjectId)
            // .setSelfSigned(true); // Use this for local development only

        this.account = new Account(this.client);
    }

    async createAccount({email, password}) {
        const user = await this.account.create(ID.unique(), email, password);
        if (user) {
            //call another method
            return this.login({email,password});
        } else {
            return user;
        }
    }
    async login({email,password}){
        return await this.account.createEmailPasswordSession(email,password);
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    async logout(){
        try {
             await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
    }

}

const authService = new AuthService();

export default authService;