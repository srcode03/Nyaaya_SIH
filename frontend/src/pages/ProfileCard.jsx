import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
const ProfileCard = (data) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div class="card w-80">
        <div class="card-body">
          <h5 class="card-title">Appointment</h5>
          <div class="pb-2">First Name:{data.val.firstname}</div>
          <div class="pb-2">Last Name:{data.val.lastname}</div>
          <div class="pb-2">Phone no:{data.val.phoneno}</div>
          <div class="pb-2">Case Details:{data.val.caseinfo}</div>
          
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
