import { React, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineFileSync,
} from "react-icons/ai";
import styles from "../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [role, setrole] = useState("");
  const [city, setcity] = useState("");
  const [spec, setspec] = useState("");
  const [experience, setexperience] = useState("");
  const [language, setlanguage] = useState("");
  const [fees, setfees] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/admin/signup", {
        name: name,
        email: email,
        password: password,
        age: age,
        gender: gender,
        phoneno: phoneno,
        role: role,
        city: city,
        casespec: spec,
        experience: experience,
        language: language,
        fees: fees,
        reviews: [],
        cases_won: 0,
        cases_lost: 0,
        withCredentials: true,
      })
      .then(function (response) {
        if (response.data.success === true) {
          localStorage.setItem("token",response.data.token);
          navigate("/admin/me");
        } else {
          navigate("/admin/signup");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleRadioChange = (event) => {
    setgender(event.target.value);
  };
  const handleroleChange = (event) => {
    setrole(event.target.value);
  };
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50	 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
              {/* Password  */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
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
              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="Lawyer"
                      value="Lawyer"
                      checked={role === "Lawyer"}
                      onChange={handleroleChange}
                    />
                    <label className="form-check-label" htmlFor="Lawyer">
                      Lawyer
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="Mediator"
                      value="Mediator"
                      checked={role === "Mediator"}
                      onChange={handleroleChange}
                    />
                    <label className="form-check-label" htmlFor="Mediator">
                      Mediator
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="Notary"
                      value="Notary"
                      checked={role === "Notary"}
                      onChange={handleroleChange}
                    />
                    <label className="form-check-label" htmlFor="Mediator">
                      Notary
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="DocumentWriter"
                      value="DocumentWriter"
                      checked={role === "DocumentWriter"}
                      onChange={handleroleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="DocumentWriter"
                    >
                      DocumentWriter
                    </label>
                  </div>
                </div>
              </div>
              {/* Specialization */}
              <div>
                <label
                  htmlFor="spec"
                  className="block text-sm font-medium text-gray-700"
                >
                  Specialization
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="spec"
                    autoComplete="spec"
                    required
                    value={spec}
                    onChange={(e) => setspec(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="experience"
                    autoComplete="experience"
                    required
                    value={experience}
                    onChange={(e) => setexperience(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Fees */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fees
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="fees"
                    autoComplete="fees"
                    required
                    value={fees}
                    onChange={(e) => setfees(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Age  */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="age"
                    autoComplete="age"
                    required
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="city"
                    autoComplete="city"
                    required
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Language */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="language"
                    autoComplete="language"
                    required
                    value={language}
                    onChange={(e) => setlanguage(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Gender */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={gender === "male"}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={gender === "female"}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="others"
                      value="others"
                      checked={gender === "others"}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="others">
                      Others
                    </label>
                  </div>
                </div>
              </div>

              {/* Certification */}
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <AiOutlineFileSync className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span>Upload Certification</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link to="/admin/login" className="text-blue-600 pl-2">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
