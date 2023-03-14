import React,{useState,useRef}from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import {storage} from '../firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {v4} from "uuid"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Createpost = () => {
  
    const[description,setdescription]=useState("")
    const [filename,setfilename]=useState(null)
    const inputref=useRef(null)
    const handlesubmit=async (e)=>{
        e.preventDefault()
        if(localStorage.length>0){

        const date=JSON.parse(localStorage.getItem("user"))
        const config={	
          headers: {
          'authorization': `Bearer ${date.token}`
      }}
        const userid=date.id
        if(filename===null){
          toast.error("image will not be uploaded",{position:"top-center",autoClose:8000})
          return}
        else{
          toast.success("Wait..Post will be uploading!!",{position:"top-center",autoClose:20000})
          const imagerf=ref(storage,`postimages/${filename.name+v4()}`);
      uploadBytes(imagerf,filename).then((snapshot)=>{
       getDownloadURL(snapshot.ref).then((url)=>{
          const data={
            description,
            url,
            userid
          }
          axios.post("https://blog-backend-25r6.onrender.com/api/post/create",data,config).then((res)=>{
            if(res.status===200){
              setdescription("")
                   setfilename(null)
                inputref.current.value=""
                  console.log("post success")
                  window.location.href="/"
            }
          }).catch((err)=>{
            toast.error("post failed",{position:"top-center",autoClose:8000})
       })
      })
      })

        }
        // const data=new FormData()
        // data.append("description",description)
        // data.append("user_file",filename)
        // data.append("userid",userid)
        // const res=await axios.post("http://localhost:3330/api/post/create",data)

        // if(res.status===200){
        //     setdescription("")
        //     setfilename("")

        //     inputref.current.value=""
        //     console.log("post success")
        //     window.location.href="/";
        // }
        // else{
        //     console.log("post failed")
        // }
      
    }
  else{
    localStorage.removeItem('user')
    window.location.href = '/login'
  }}
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center content-center">
    <div className=" p-6  m-8  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
<form onSubmit={handlesubmit}>

  <div className="mb-6">

  <label for="message" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your thoughts!</label>
<textarea id="message" rows="4" className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setdescription(e.target.value)} value={description} required></textarea>

  </div>
 
  <div className="mb-6">
  <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white" for="file_input">Upload image</label>
<input className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e)=>setfilename(e.target.files[0])} ref={inputref} accept="image/png, image/jpg, image/jpeg" required/>
<p className="mt-1 text-lg text-gray-500 dark:text-gray-300" id="file_input_help">Only support .png .jpg and .jpeg image file.</p>


  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish Post</button>
 
</form>

    </div>
    </div>
    <ToastContainer autoClose={20000}/>
    </div>
  )
}

export default Createpost
