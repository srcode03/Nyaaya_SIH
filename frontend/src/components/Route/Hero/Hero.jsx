import React from "react";
import { Link } from "react-router-dom";
import background from "../../../Assets/bg2.png"
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{ backgroundImage:`url(${background})`
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`animate-pulse flex space-x-4 text-[35px] leading-[1.2] 800px:text-[60px] text-[#1c1919] font-[600] capitalize`}
        >
         Discover the perfect <br /> Legal Service Provider < br/> for your needs 
        </h1>
        <p className="pt-5 text-[18px] font-[Poppins] font-[400] text-[#000000ba]">
          Nyaya: Law Simplified, where justice is just a click away
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Show Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;