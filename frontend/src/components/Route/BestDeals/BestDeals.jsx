import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import Spinner from '../../Loader/Spinner.js'
const BestDeals = () => {
  const [val, setVal] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/getall")
      .then((response) => {
        setVal(response.data.people); // Update val using setVal
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(val);
  return (
    <>
      {val.length > 0 ? (
        <div>
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
              <h1>Popular Providers</h1>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
              {val &&
                val
                  .filter((i) => i.name) // Filter out items without a name
                  .map((i) => <ProductCard val={i} key={i._id} />)}
            </div>
          </div>
        </div>
      ) : (
        <Spinner/>
      )}
    </>
  );
};

export default BestDeals;
