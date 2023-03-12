import React,{useState,useEffect} from 'react'
import { useParams,Link } from "react-router-dom";
import axios from 'axios'
import Postprofile from '../Components/Postprofile';
import Middle from '../Components/Middle';
import Friend from '../Components/Friend';

import Navbar from '../Components/Navbar';
const Userprofile = () => {
    const userid=useParams().userid;
    const postuserid=useParams().postuserid;
    if(localStorage.length>0){
    const data=JSON.parse(localStorage.getItem('user')).id;
    if(data!==userid){
        localStorage.removeItem('user')
        window.location.href="/login";
    }
    }
    const [user,setuser]=useState([]);
    const [posts,setposts]=useState([]);
    const [admin,setadmin]=useState([]);
    const [c,setc]=useState(0);
        useEffect(() => {
            if(localStorage.length>0){
                const data=JSON.parse(localStorage.getItem('user'));
                const config={	
                  headers: {
                  'authorization': `Bearer ${data.token}`
              }}
            axios.get("http://localhost:3330/api/user/"+userid,config)
            .then((res) => {
                setadmin(res.data)         
            }); 

            axios.get("http://localhost:3330/api/user/"+postuserid,config)
            .then((res) => {
                setuser(res.data)
               
                if(res.data.friends.includes(userid)){
                    setc(1)
                    
                }
               
                
            });
            axios.get("http://localhost:3330/api/post/getpost/"+postuserid,config)
            .then((res)=>{
              setposts(res.data)
            });
            
         
           
          }
          else{
            localStorage.removeItem('user')
            window.location.href = '/login'
          }
        
        
        
        },[c])
       const url=user.picturePath;
       const handlechange=async()=>{
        if(localStorage.length>0){
            const data=JSON.parse(localStorage.getItem('user'));
            const config={	
              headers: {
              'authorization': `Bearer ${data.token}`
          }}
        const res=await axios.patch("http://localhost:3330/api/user/updatefriend/"+postuserid+"/"+userid,config)
        console.log();
        setc(1-c);
        }
       }

    if(userid===postuserid){
        return (
            <div>
                <Navbar/>
            <div className='flex justify-center m-3 '> <img src={url} alt="tree" id="picture"/></div>
            <div className='flex justify-center text-2xl font-semibold  '>{user.firstname+" "+user.lastname}</div>
            <div className='flex justify-center text-2xl font-semibold '>{user.email}</div>
            <div className='flex justify-center m-3'>
                <Link to={"/updateprofile/"+userid}>
                <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">Change Profile Pic</button>
                </Link>
             
    <Link to={"/createpost"}>
    <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">
     Create a Post
</button>
</Link>
</div>
              <div className='flex justify-center m-3'>
              <button data-modal-target={userid} data-modal-toggle={userid}  type="button"  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">
                 Friends
               </button>
               <div id={userid} tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
    <div className="relative w-full h-full max-w-2xl md:h-auto">
    
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
           
            <img className="w-14 h-14 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={url} alt="Bordered avatar"/>
<h1 className='text-xl font-semibold mx-5 my-3'>{user.firstname+" "+user.lastname}</h1>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide={userid}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
   
          
            
            <div className='flex justify centre max-w-full'>
              <div className=' overflow-auto ... block w-full m-1 h-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
             <Friend  userid={userid}/>
              </div>
          
            </div>
        </div>
    </div>
    </div>
              </div>
{posts.length>0?<div className='flex justify-center'>
            <div className='m-2 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
            {posts.map((post)=>(<Postprofile key={userid} post={post} userid={userid} url={admin.picturePath} username={admin.firstname+" "+admin.lastname} />))}
            </div>
            </div>:<h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">!!Sorry No Post from your side...</h1>}
            </div>
          )
    }
    else{
        return(
            <div>
                <Navbar/>
                <div className='flex justify-center m-3 '> <img src={url} alt="tree" id="picture"/></div>
  <div className='flex justify-center text-2xl font-semibold '>{user.firstname+" "+user.lastname}</div>
  <div className='flex justify-center text-2xl font-semibold '>{user.email}</div>
  <div className='flex justify-center m-3'>
                <button type="button" onClick={handlechange} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">{c===0?"Follow":"UnFollow"}</button>
        
                </div>
                {posts.length>0?<div className='flex justify-center'>
            <div className='m-2 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
            {posts.map((post)=>(<Middle key={userid} post={post} userid={userid} url={admin.picturePath} username={admin.firstname+" "+admin.lastname}/>))}
            </div>
            </div>:<h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">!!Sorry No Post from your side...</h1> }
            </div>
            
        )
    }

 
}

export default Userprofile