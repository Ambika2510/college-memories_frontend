import React,{useRef}from 'react'
import {useState} from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios'
import Navbar from './Navbar'
import {storage} from '../firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {v4} from "uuid"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Updateprofile = () => {
    const userid=useParams().userid;;
  const [filename,setfilename]=useState(null);
  const inputref=useRef(null);
  const handlesubmit=async(e)=>{
 
    e.preventDefault();
    if(localStorage.length>0){
      const user=JSON.parse(localStorage.getItem('user'));
      const config={	
        headers: {
        'authorization': `Bearer ${user.token}`
    }}
    if(filename===null){
      toast.error("image will not be uploaded",{position:"top-center",autoClose:8000})
      return}
    else{
      toast.success("Wait..Update Under processing!!",{position:"top-center",autoClose:8000})
      const imagerf=ref(storage,`images/${filename.name+v4()}`);
      uploadBytes(imagerf,filename).then((snapshot)=>{
       getDownloadURL(snapshot.ref).then((url)=>{
          const data={
            url
          }
         axios.patch("https://blog-backend-25r6.onrender.com/api/user/updateprofile/"+userid,data,config).then((res)=>{
            if(res.status===200){
              setfilename(null);
              inputref.current.value = null;
              window.location.href="/";
              console.log("updateprofile success")
            }
          }).catch((err)=>{
                console.log(err)
       })
      })
      })

    }}
  else{
    toast.error("Login to continue",{position:"top-center",autoClose:8000})
    window.location.href="/login";
  }}
  return (
    <div>
    <Navbar/>
    <div className="flex justify-center content-center">
    <div className=" p-6  m-8  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
<form onSubmit={handlesubmit}>
  

 
  <div className="mb-6">
  <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white" for="file_input">Upload image</label>
<input class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e)=>setfilename(e.target.files[0])} ref={inputref} accept="image/png, image/jpg, image/jpeg" required/>
<p class="mt-1 text-lg text-gray-500 dark:text-gray-300" id="file_input_help">Only support .png .jpg and .jpeg image file.</p>

  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
</form>

    </div>
    </div>
    <ToastContainer autoClose={8000}/>
    </div>
  )
}

export default Updateprofile
