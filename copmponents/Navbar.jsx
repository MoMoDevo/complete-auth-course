"use client"
import { useSession } from "next-auth/react"

const Navbar = () => {
  const {data:session}=useSession()
  console.log(session)
  return (
    <div style={{display:"flex",justifyContent:"space-between",gap:"38px",position:"fixed",height:"60px",padding:"4px 10px"}}>
      <p> name: {session?.user?.name}   </p>
      <p>email: {session?.user?.email}   </p>
      <p>  role:{session?.user?._doc.role}</p>

     
      
     
    </div>
  )
}

export default Navbar