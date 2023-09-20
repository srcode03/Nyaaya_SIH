import React from 'react'
import { RxPerson } from "react-icons/rx";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { TbAddressBook } from "react-icons/tb";
import { useState,useEffect } from 'react';
import axios from "axios"
const LawyerProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem("token")
    navigate('/')
  }
  
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
    <div
      className="flex items-center cursor-pointer w-full mb-8"
      onClick={() => setActive(1)}
    >
      <RxPerson size={20} color={active === 1 ? "red" : ""} />
      <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Appointments
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8)}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <button
          onClick={handlelogout}
          className={`pl-3 ${
            active === 8 ? "text-[red]" : ""
          } 800px:block hidden`}

        >
          Log out
        </button>
      </div>

      </div>
  )
}

export default LawyerProfileSidebar