"use client"

 import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
 //params only shows when were logged in and its used to display the errors or customise them! and we use searchparams to acces them!
 
const SignIn = () => {
  const {data:session}=useSession()
  console.log(session)
 const router=useRouter()

 





  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };
  
  return (
    <div className='flex flex-col w-4/5 shadow-xl bg-red-100 h-full m-auto items-center mt-7'>
        <form  className='flex flex-col w-3/5 shadow-xl bg-slate-500 m-auto items-center gap-4 border-collapse border mt-7 pt-6' onSubmit={handleSubmit}>
            <input type="email"  placeholder='email'  />
            <input type="password"  placeholder='password'/>
            <button type="submit">login</button>
       
        </form>

        <button type='submit' onClick={() => {
          signIn("google");
        }}>SignIn with google</button>
        
    
       
    </div>
  )
}

export default SignIn