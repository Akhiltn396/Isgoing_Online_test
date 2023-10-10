import React, { useState } from "react";
import "./Trending.scss";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addProduct, removeProducts } from "../../redux/cartSlice";

const Trending = () => {
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery({
    queryKey: ["getProduct"],
    queryFn: () =>
      axios
        .get(`https://fakestoreapi.com/products`)
        .then((res) => {
          return res.data;
        })
        .catch((errorData) => {
          console.log("error" + errorData);
        }),
  });

  // const handleDec =(id) =>{

  //     console.log("id",id);
  //     console.log(data);
  //     if(data.id == id){
  //         setQuantity((prev)=>prev-1)
  //         }
  // }
  // const handleInc =(id) =>{
  //     if(data.id == id){
  //         setQuantity((prev)=>prev+1)
  //         }
  // }

  const handleClick = (product) => {

    console.log(product);
    setQuantity((prev) => prev + 1);

    console.log(product.id);
    const sheetData = {
      productId: product.id,
      productTitle: product.title,
      productDesc: product.description,
      productPrice: product.price,
    };

    axios
      .post(
        "https://sheet.best/api/sheets/f4612540-7136-4ebe-9a87-73202a779338",
        sheetData
      )
      .then((res) => {
        console.log("res",res);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(addProduct({ product, quantity }));
  };

  return (
    <div className="trending">
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Trending Products
      </h2>
      <div className="container">
        {isLoading
          ? "loading"
          : error
          ? "error"
          : data.slice(0, 5).map((d) => (
              <div>
                <Link style={{ textDecoration: "none" }}>
                  <div className="destination">
                    <div>
                      <img src={d.image} />
                    </div>
                    <div className="dest">
                      <p className="">{d?.description?.substring(0, 100)}...</p>
                    </div>
                    <div className="price">
                      <h3>{d.price}</h3>

                      <p>{d.rating.rate}</p>
                    </div>
                    {/* <div className="quantity">
                       <RemoveIcon onClick={()=>handleDec(d.id)}/>
                        {quantity}
                       <AddIcon onClick={handleInc(d.id)}/>

                    </div> */}
                    <div>
                      <button onClick={() => handleClick(d)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Trending;
