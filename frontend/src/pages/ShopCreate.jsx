import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ShopCreate from "../components/Shop/ShopCreate";

const ShopCreatePage = () => {
  const navigate = useNavigate();

  return (
    <div>
        <ShopCreate/>
    </div>
  )
}

export default ShopCreatePage