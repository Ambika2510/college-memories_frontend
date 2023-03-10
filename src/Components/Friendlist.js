import React from 'react'
 import {Link} from 'react-router-dom'           
const Friendlist = ({friend,handlechange,userid}) => {
    const url=friend.picturePath;
    const id=friend._id;
 const urlprofile="/profile"+"/"+id+"/"+userid;
 
  return (
    <div className='flex justify-between m-2 w-full'>
      <Link to={urlprofile} className='flex'>
      <img className="w-14 mx-2.5 h-14 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={url} alt="bordered avatar"></img>
      <h1 className='text-xl mx-2.5 font-semibold  my-3'>{friend.firstname+" "+friend.lastname}</h1>
      </Link>
      
      <button type="button" onClick={()=>{handlechange(id)}} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-3">Unfollow</button>
      
    </div>
  )
}

export default Friendlist
