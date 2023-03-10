import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Middle from './Middle'
import Right from './Right'
import Friend from './Friend'

const Front = () => {
const [user,setuser]=useState([])
const [posts,setposts]=useState([])




  useEffect(() => {
   
   axios.get("http://localhost:3330/api/user/6408dcecf6ef6c6d81ee9916")
    .then((res) => {
        setuser(res.data)
    });
   
    axios.get("http://localhost:3330/api/post/getallpost")
    .then((res)=>{
      setposts(res.data)
    });

  },[])
  
  


  if(user.length === 0){
    return (
      <div  className ="grid grid-cols-3 gap-x-2.5 h-96 ">
  <div className="border 2 border-red-500 ">
  
  
  
  
  
  </div>
  <div className="border-2 border-red-500">
      
  
  </div>
  
  
  <div className="border 2 border-red-500">
   
      </div>
      </div>
    )
  }
  else{
     const url=user.picturePath;
     const username=user.firstname+" "+user.lastname;
  return (
    <div  className ="grid grid-cols-3 ">
<div className='border-2'>

  <div className="sticky top-20">
  <div className='flex justify-center m-3 '> <img src={url} alt="tree" id="picture"/></div>
  <div className='flex justify-center text-2xl font-semibold font-serif '>{user.firstname+" "+user.lastname}</div>
  <div className='flex justify-center text-2xl font-semibold font-serif'>{user.email}</div>
  <div className='flex justify-center m-3'>
    <Link to={"/createpost"}>
    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg font-semibold">
     Create a Post
    
  </span>
</button>
</Link>
</div>

</div>


</div>
<div className=''>
    {posts.map((post)=>(<Middle key={post._id} post={post} userid={user._id} url={url} username={username}/>))}

</div>


<div >
  <div className='flex justify-center m-3'>
                            <Right/>
  </div>
   <div>
    <Friend userid={user._id}/>
    </div>

    </div>
    
    </div>
  )
}
}

export default Front