import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Updatepassword = () => {
  const [oldpassword, setoldPassword] = useState('')
    const [newpassword, setnewPassword] = useState('')
    if(localStorage.length===0){
        window.location.href="/login"
    }
    const userid=useParams().userid;
    if(localStorage.length>0){
        
        const data=JSON.parse(localStorage.getItem('user')).id;
        if(data!==userid){
            localStorage.removeItem('user')
            window.location.href="/login";
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success("!!Wait..update under processing",{position:"top-center",autoClose:20000})
        const data=JSON.parse(localStorage.getItem('user'))
         const config={	
        headers: {
        'authorization': `Bearer ${data.token}`
    }}
        const signup = {userid, oldpassword, newpassword };
    
        axios.post('https://blog-backend-25r6.onrender.com/api/user/updatepassword', signup,config)
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data))
                toast.success('Password Change successfully',{position:"top-center",autoClose:8000})
              
                setoldPassword('')
                setnewPassword('')

            })
            .catch(err => {  
              const error = err.response.data.error
                 toast.error(error,{position:"top-center",autoClose:8000})
             })
    
    
    }
  return (
    <div>
    <Navbar/>
    <div className="flex justify-center content-center">
    <div className="w-96 p-6  m-8  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
<form  onSubmit = { handleSubmit }>
  <div className="mb-6">
    <label for="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Old password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange ={(e) => setoldPassword(e.target.value)} value = { oldpassword } required/>
  </div>
  <div className="mb-6">
    <label for="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">New password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange ={(e) => setnewPassword(e.target.value)} value = { newpassword } required/>
  </div>
  

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Password</button>
</form>

    </div>
    </div>
    <ToastContainer autoClose={20000}/>
    </div>
  
  )
}

export default Updatepassword