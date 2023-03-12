import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Postprofile from "../Components/Postprofile";
import Middle from "../Components/Middle";
import Friend from "../Components/Friend";

import Navbar from "../Components/Navbar";
const Userprofile = () => {
  const userid = useParams().userid;
  const postuserid = useParams().postuserid;
  if (localStorage.length > 0) {
    const data = JSON.parse(localStorage.getItem("user")).id;
    if (data !== userid) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }
  const [user, setuser] = useState([]);
  const [posts, setposts] = useState([]);
  const [admin, setadmin] = useState([]);
  const [c, setc] = useState(0);
  const [d,setd]=useState(0);
  useEffect(() => {
    if (localStorage.length > 0) {
      const data = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      };
      axios
        .get("https://blog-backend-25r6.onrender.com/api/user/" + userid, config)
        .then((res) => {
          setadmin(res.data);
        });

      axios
        .get("https://blog-backend-25r6.onrender.com/api/user/" + postuserid, config)
        .then((res) => {
          setuser(res.data);

          if (res.data.friends.includes(userid)) {
            setc(1);
          }
        });
      axios
        .get("https://blog-backend-25r6.onrender.com/api/post/getpost/" + postuserid, config)
        .then((res) => {
          setposts(res.data);
        });
    } else {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }, [c]);
  const url = user.picturePath;
  const handlechange = async () => {
    if (localStorage.length > 0) {
      const data = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      };
      const res = await axios.patch(
        "https://blog-backend-25r6.onrender.com/api/user/updatefriend/" +
          postuserid +
          "/" +
          userid,
        config
      );
      console.log();
      setc(1 - c);
    }
  };
  const handled=()=>{
    setd(1-d);
  }

  if (userid === postuserid) {
    return (
      <div>
        <Navbar />
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
        <div className="flex justify-center m-3">
          <Link to={"/updateprofile/" + userid}>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2"
            >
              Change Profile Pic
            </button>
          </Link>

          <Link to={"/createpost"}>
            <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">
              Create a Post
            </button>
          </Link>
        </div>
        <div className="flex justify-center m-3">
          <button
            type="button" onClick={handled}
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2"
          >
            Friends
          </button>

          </div>
          {d!==0?<div className="flex justify-center w-full  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
           <div className="w-full lg:w-1/2">
            <Friend userid={userid}/>
            </div>
              
              
            </div>:<div></div>}
        {posts.length > 0 ? (
          <div className="flex justify-center">
            <div className="m-2 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
              {posts.map((post) => (
                <Postprofile
                  key={userid}
                  post={post}
                  userid={userid}
                  url={admin.picturePath}
                  username={admin.firstname + " " + admin.lastname}
                />
              ))}
            </div>
          </div>
        ) : (
          <h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            !!Sorry No Post from your side...
          </h1>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center m-3 ">
          {" "}
          <img src={url} alt="tree" id="picture" />
        </div>
        <div className="flex justify-center text-2xl font-semibold ">
          {user.firstname + " " + user.lastname}
        </div>
        <div className="flex justify-center text-2xl font-semibold ">
          {user.email}
        </div>
        <div className="flex justify-center m-3">
          <button
            type="button"
            onClick={handlechange}
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2"
          >
            {c === 0 ? "Follow" : "UnFollow"}
          </button>
        </div>
        {posts.length > 0 ? (
          <div className="flex justify-center">
            <div className="m-2 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
              {posts.map((post) => (
                <Middle
                  key={userid}
                  post={post}
                  userid={userid}
                  url={admin.picturePath}
                  username={admin.firstname + " " + admin.lastname}
                />
              ))}
            </div>
          </div>
        ) : (
          <h1 className="m-6 text-center text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            !!Sorry No Post from your side...
          </h1>
        )}
      </div>
    );
  }
};

export default Userprofile;
