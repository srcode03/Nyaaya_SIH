import { React, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineFileSync,
} from "react-icons/ai";
import styles from "../styles/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const {id}=useParams()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [caseinfo,setcaseinfo]=useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/admin/appointments",{
      email:email,
      fname:fname,
      lname:lname,
      phoneno:phoneno,
      caseinfo:caseinfo,
      id:id,
    }).then(function(response){
      if(response.data.success===true)
      {
        navigate('/')
      }
      else{
        navigate(`/admin/profile/appointment/${id}`)
      }
    })
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50	 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Book Appointment
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* First Name */}
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="text"
                    autoComplete="fname"
                    required
                    value={fname}
                    onChange={(e) => setfName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Last Name */}
              <div>
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="text"
                    autoComplete="lname"
                    required
                    value={lname}
                    onChange={(e) => setlName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Phoneno */}
              <div>
                <label
                  htmlFor="phoneno"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phoneno:
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phoneno"
                    autoComplete="phoneno"
                    required
                    value={phoneno}
                    onChange={(e) => setphoneno(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Case Info */}
              <div class="form-group">
                <label for="exampleFormControlTextarea1">
                  Case Details:
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={caseinfo}
                  onChange={(e) => setcaseinfo(e.target.value)}
                ></textarea>
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
