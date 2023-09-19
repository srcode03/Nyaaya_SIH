import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const ProductCard = (data) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;

  // const product_name = d.replace(/\s+/g, "-");
  console.log(data.val.name);
  return (
    <>
      <div class="card w-18">
        <img class="card-img-top w-6 h-24 rounded-lg border-2 border-black" src="data:image/jpeg;base64,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" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{data.val.name}</h5>
          <div class="pb-2">Role:{data.val.role}</div>
          <div class="pb-2">Speciality:{data.val.spec}</div>
          <div class="pb-2">Age:{data.val.age}</div>
          <div class="pb-2">Gender:{data.val.gender}</div>
          <div class="pb-2 text-extrabold">Experience:{data.val.experience}</div>
          <Link to={`/admin/profile/${data.val._id}`} class="btn btn-primary">
            View Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
