import React,{useState,useEffect} from 'react'
import { useParams,Link } from "react-router-dom";
import axios from 'axios'
import Postprofile from '../Components/Postprofile';
import Middle from '../Components/Middle';

import Navbar from '../Components/Navbar';
const Userprofile = () => {
    const userid=useParams().userid;
    const postuserid=useParams().postuserid;
    const [user,setuser]=useState([]);
    const [posts,setposts]=useState([]);
    const [c,setc]=useState(0);
        useEffect(() => {
            
            axios.get("http://localhost:3330/api/user/"+postuserid)
            .then((res) => {
                setuser(res.data)
                // console.log(res.data)
                if(res.data.friends.includes(userid)){
                    setc(1)
                    
                }
               
                
            });
            axios.get("http://localhost:3330/api/post/getpost/"+postuserid)
            .then((res)=>{
              setposts(res.data)
            });

        },[c])
       const url=user.picturePath;
       const handlechange=async()=>{
        const res=await axios.patch("http://localhost:3330/api/user/updatefriend/"+postuserid+"/"+userid)
        console.log();
        setc(1-c);
        // console.log(user.friends.length)
        // console.log(c);
       }

    if(userid===postuserid){
        return (
            <div>
                <Navbar/>
            <div className='flex justify-center m-3 '> <img src={url} alt="tree" id="picture"/></div>
            <div className='flex justify-center text-2xl font-semibold font-serif '>{user.firstname+" "+user.lastname}</div>
            <div className='flex justify-center text-2xl font-semibold font-serif'>{user.email}</div>
            <div className='flex justify-center m-3'>
                <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">Update Profile</button>
             
    <Link to={"/createpost"}>
    <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">
     Create a Post
</button>
</Link>
</div>
            <div className='flex justify-center'>
            <div className='m-2 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
            {posts.map((post)=>(<Postprofile key={post._id} post={post} userid={userid} />))}
            </div>
            </div>
            </div>
          )
    }
    else{
        

        return(
           
   
            <div>
                <Navbar/>
                <div className='flex justify-center m-3 '> <img src={url} alt="tree" id="picture"/></div>
  <div className='flex justify-center text-2xl font-semibold font-serif '>{user.firstname+" "+user.lastname}</div>
  <div className='flex justify-center text-2xl font-semibold font-serif'>{user.email}</div>
  <div className='flex justify-center m-3'>
                <button type="button" onClick={handlechange} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">{c===0?"Follow":"UnFollow"}</button>
                </div>
                 <div className='flex justify-center'>
            <div className='m-2 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
            {posts.map((post)=>(<Middle key={post._id} post={post} userid={userid} />))}
            </div>
            </div> 
            </div>
            
        )
    }

 
}

export default Userprofile