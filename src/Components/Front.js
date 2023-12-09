import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Middle from './Middle'
import Friend from './Friend'
import { FadeLoader } from "react-spinners";

const Front = () => {
const [user,setuser]=useState([])
const [posts,setposts]=useState([])

const data=JSON.parse(localStorage.getItem("user"))
const userid=data.id


  useEffect(() => {

   if(localStorage.length>0){
   
    const config={	
        headers: {
        'authorization': `Bearer ${data.token}`
    }}
   axios
     .get("https://blog-backend-25r6.onrender.com/api/user/" + userid, config)
     .then((res) => {
       setuser(res.data);
     });
   
    axios
      .get("https://blog-backend-25r6.onrender.com/api/post/getallpost", config)
      .then((res) => {
        setposts(res.data);
      });
  }
  },[])
  
  


  if(user.length === 0){
    return (
      <div  className ="grid grid-cols-3 gap-x-2.5 h-96 ">
 
      </div>
    )
  }
  else{
     const url=user.picturePath;
     const username=user.firstname+" "+user.lastname;
  return (
    <div className="md:max-xl:grid md:max-xl:grid-cols-2  xl:grid xl:grid-cols-3 ">
      <div className="border-2 max-md:hidden md:visible ">
        <div className="sticky top-24 ">
          <Link to={"/profile" + "/" + userid + "/" + userid}>
            <div className="flex justify-center m-3 ">
              {" "}
              <img src={url} alt="tree" id="picture" />
            </div>
            <div className="flex justify-center text-2xl font-semibold  ">
              {user.firstname + " " + user.lastname}
            </div>
            <div className="flex justify-center text-2xl font-semibold ">
              {user.email}
            </div>
          </Link>
          <div className="flex justify-center m-3">
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

      <div className="">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Middle
              key={post._id}
              post={post}
              userid={user._id}
              url={url}
              username={username}
            />
          ))
        ) : (
          <div className="flex  justify-center content-center">
            <FadeLoader loading={true} color="blue" />
          </div>
        )}
      </div>

      <div className="max-xl:hidden xl:visible">
        <div className="sticky top-24 ">
          <div>
            <Friend userid={user._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Front