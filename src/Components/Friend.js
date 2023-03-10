import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Friendlist from './Friendlist'
const Friend = ({userid}) => {
    const [friends,setfriends] = useState([])
    const [c,setc] = useState(0)
   
    useEffect(() => {
        axios.get("http://localhost:3330/api/user/friends/"+userid)
        .then((res)=> {
            setfriends(res.data)
        
        })
        .catch(err => {
            console.log(err)
        })
    },[c])
      const handlechange = async(friendid) => {
        const res=await axios.patch("http://localhost:3330/api/user/updatefriend/"+userid+"/"+friendid)
        setc(1-c);
      }

  return (
    <div className='block max-w-full p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-auto max-h-60'>
        <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Friends list:</h2>
        <div className=''> 
        {friends.length>0?friends.map((friend) => (<Friendlist key={friend._id} friend={friend} handlechange={handlechange} userid={userid}/>)):<h1 className='flex justify-center text-xl  font-semibold m-2'>!!Oops No Friends...</h1> }
        </div>
     
    </div>
  )
}

export default Friend
