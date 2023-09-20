import Reac, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineMessage,
    AiOutlineShoppingCart,
  } from "react-icons/ai";
import { Navigate, useNavigate } from 'react-router-dom';

const ProductDetailsCard = ({ setOpen, data }) => {
    const navigate=useNavigate()
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(false);

    const handleMessageSubmit = () => {};
  const handleonclick=(e)=>{
      e.preventDefault()
      const username=localStorage.getItem("username")
      const obj={"adminname":data.name,"price":data.price,"username":username};
      const storedJsonString=localStorage.getItem("appointment")
      localStorage.removeItem("appointment")
      let retrievedArray = [];
      if (storedJsonString) {
          retrievedArray = JSON.parse(storedJsonString);
      }
      retrievedArray.push(obj);
      const updatedJsonString = JSON.stringify(retrievedArray);
      localStorage.setItem('appointment', updatedJsonString);
      navigate('/')
  }
  return (
    <div className="bg-[#fff]">
    {data ? (
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
        <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
        <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

         <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={data.image_Url[0].url} alt="" className="w-[300px] h-[400px]" />

                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[6px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
            </div>

            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.discountPrice}`}>
                    {"Hearing Fees: ₹" + data.price}
                    <br/> {"Retainer Fees: ₹" + data.price}
                  </h4>
                </div>

                <div>
                      <h3 className={`${styles.shop_name}`}>
                        {"Location: " + data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px] text-[#947b31]">Ratings: {data.shop.ratings}</h5>
                    </div>
                    
                <h5 className="text-[16px] text-[red] mt-5">Service provided: {data.total_sell} users</h5>
                <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer absolute right-2"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer absolute right-3 bottom-10"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
            
                >
                  <button onClick={handleonclick} className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </button>
                </div>
            </div>
            </div>
            </div>
            </div>
            ) : null}

    </div>
  
  )
    }

export default ProductDetailsCard