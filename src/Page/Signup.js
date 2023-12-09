import React,{useRef}from 'react'
import {useState} from 'react'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import {storage} from '../firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {v4} from "uuid"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const [firstname,setfirstname]=useState("");
  const [lastname,setlastname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [filename,setfilename]=useState(null);
  const inputref=useRef(null);
 const handlesubmit=async(e)=>{
 
    e.preventDefault();
    if(filename===null){
      toast.error("image will not be uploaded",{position:"top-center",autoClose:8000})
      return}
    else{
      toast.success("!!Wait...Sign in under process",{position:"top-center",autoClose:40000})
      const imagerf=ref(storage,`images/${filename.name+v4()}`);
      uploadBytes(imagerf,filename).then((snapshot)=>{
       getDownloadURL(snapshot.ref).then((url)=>{
          const data={
            firstname,
            lastname,
            email,
            password,
            url
          }
         axios
           .post("https://blog-backend-25r6.onrender.com/api/user/signup", data)
           .then((res) => {
             if (res.status === 200) {
               toast.success("Sign in", {
                 position: "top-center",
                 autoClose: 8000,
               });
               localStorage.setItem("user", JSON.stringify(res.data));
               setfirstname("");
               setlastname("");
               setemail("");
               setpassword("");
               setfilename(null);
               inputref.current.value = null;
               window.location.reload();
               console.log("signup success");
             }
           })
           .catch((err) => {
             const error = err.response.data.error;
             toast.error(error, { position: "top-center", autoClose: 8000 });
           });
      })
      })

    }}
 
  return (
    <div>
      <Navbar />
      <div className="flex justify-center content-center">
        <div className=" p-6  m-8  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handlesubmit}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6">
                <label
                  for="text"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  onChange={(e) => {
                    setfirstname(e.target.value);
                  }}
                  value={firstname}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="text"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="surname"
                  onChange={(e) => setlastname(e.target.value)}
                  value={lastname}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                for="email"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-6">
              <label
                for="password"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="mb-6">
              <label
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Upload image
              </label>
              <input
                class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={(e) => setfilename(e.target.files[0])}
                ref={inputref}
                accept="image/png, image/jpg, image/jpeg"
                required
              />
              <p
                class="mt-1 text-lg text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                Only support .png .jpg and .jpeg image file.
              </p>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Signup
            </button>
            <h2 className="text-xl mt-6 font-bold text-blue-600">
              (Try for see demo of website please log into it:-
              email:rudra20@gmail.com, password:Rudra@321)
            </h2>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={40000} />
    </div>
  );
}

export default Signup