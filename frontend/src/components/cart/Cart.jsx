import React, {useState} from 'react'
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart, data }) => {

  const cartData = [
    {
        name: "Advocate Sunil Kumar Bakshi, Practice areas: Personal/Family Cases",
        description: "Advocate Sunil Kumar Bakshi has been practicing and handling cases independently with a result oriented approach, both professionally and ethically and has now acquired excellent professional experience in providing legal consultancy and advisory services..",
        price: 30000,
    },
  ]
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
         <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between sh">
         <div>
            <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
                </div>
                {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  1 item
                </h5>
              </div>

               {/* cart Single Items */}
               <br />
              <div className="w-full border-t">
                {cartData &&
                  cartData.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                    />
                  ))}
                </div>

                <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (Rs.{30000})
                  </h1>
                </div>
              </Link>
            </div>
    

         </div>
    </div>
    </div>
  )
}

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.price;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
      <img
          src="https://lawrato.com/expert_images/thumb/webp/advocate-sunil-kumar-bakshi.webp"
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            Rs.{data.price}
          </h4>
          </div>
          <RxCross1
          className="cursor-pointer"
        />

        </div>
        </div>
  )
}


export default Cart