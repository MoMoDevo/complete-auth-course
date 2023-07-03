import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
 import User from "@/models/user";
 
import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/connetctoSb";

 










const handler = NextAuth({
  providers: [
    CredentialsProvider({
      
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await connectToDB();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });
          const verifiedUser=await user.isEmailVerified===false
          if(verifiedUser){
            throw new Error("please verify ur email by the lik that uve recived");


          }

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );


            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),

    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token  
      return session;
    },
  },
  pages: {
    error: "/login",
  },

});

export { handler as GET, handler as POST };


























 {/*
export const authOptions={

    providers:[
         
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })



    ],
    pages:{
        signIn:"/signin"
    },
    callbacks:{
        async signIn({user,account,profile,email,credentials}){
            if(account.type=== "oauth"){
                return await signInwithOauth({account,profile})
            }
            await connectTodb()
           
            console.log(account,profile,user)
           
            return true;
        },
        async jwt({token,trigger,session}){
            console.log(session)
         
            return token
        },
        async session({session,token}){
            return session
        }
        }
    
    
 
    
        
    
    
    

}

const handler=NextAuth(authOptions)
export {handler as GET,handler as POST}


async function signInwithOauth({account,profile}){
    const user=await User.findOne({email:profile.email})
    if(user){
        return true
    }
    const newUser=new User({
        name:profile.name,
        email:profile.email,
        password:profile.password,
        provider:account.provider
    })
    await newUser.save()
    return true
}
 





callbacks:{
    async signIn({user,account,profile,email,credentials}){
        if(account.type==="0auth"){
            return await signInwithOauth({account,profile})
        }
        console.log(account,profile)
       
        return true;
    },
    async jwt({token,trigger,session}){
         
        return token
    },
    async session({
        session,token}){
        return session
    }
}




async function signInwithOauth({account,profile}){
    const user=await User.findOne({email:profile.email})
    if(user){
        return true
    }
    const newUser=new User({
        name:profile.name,
        email:profile.email,
        password:profile.password,
        provider:profile.provider
    })
    await newUser.save()
    return true
}
*/}