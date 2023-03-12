import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Friendlist from './Friendlist'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Friend = ({userid}) => {
    const [friends,setfriends] = useState([])
    const [c,setc] = useState(0)
   
    useEffect(() => {
      if(localStorage.length>0){
        const user=JSON.parse(localStorage.getItem('user'));
        const config={	
          headers: {
          'authorization': `Bearer ${user.token}`
      }}
        axios.get("https://blog-backend-25r6.onrender.com/api/user/friends/"+userid,config)
        .then((res)=> {
            setfriends(res.data)
        
        })
        .catch(err => {
            console.log(err)
        })
      }
    },[c])
      const handlechange = async(friendid) => {
        if(localStorage.length>0){
        const user=JSON.parse(localStorage.getItem('user'));
        const config={	
          headers: {
          'authorization': `Bearer ${user.token}`
      }}
        const res=await axios.patch("https://blog-backend-25r6.onrender.com/api/user/updatefriend/"+userid+"/"+friendid,config)
        setc(1-c);
      }
      else{
        toast.error("Please Login First",{position:"top-center",autoClose:8000})
      }
    }

  return (
    <div className='block max-w-full p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-auto max-h-96'>
        <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Friends list:</h2>
        <div className=''> 
        {friends.length>0?friends.map((friend) => (<Friendlist key={friend._id} friend={friend} handlechange={handlechange} userid={userid}/>)):<h1 className='flex justify-center text-xl  font-semibold m-2'>!!Oops No Friends...</h1> }
        </div>
        <ToastContainer autoClose={8000}/>
    </div>
  )
}

export default Friend
