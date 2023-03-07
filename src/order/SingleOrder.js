import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleOrder = () => {
  const { orderId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const req = async () => {
    try {
      const { data } = await axios.get("http://kzico.runflare.run/order/", {
        headers: {
          authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      });
      setLoading(false);
      setData(data);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    req();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center h-screen items-center">
          <span className="loader2">Loading</span>
        </div>
      ) : error ? (
        <div className="flex justify-center h-screen items-center">
          <span className="text-6xl bg-red-100 text-red-800 text-xs text-5xl font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 text-5xl">
            {error}
          </span>
        </div>
      ) : (
        <div>
          {data.map((item) => {
            if (item._id === orderId) {
              return (
                <div
                  key={item._id}
                  className="bg-orange-400 w-11/12 mt-8 mb-16 mx-auto rounded-xl"
                >
                  {item.orderItems.map((i) => {
                    return (
                      <div
                        key={i._id}
                        className="flex py-6 border-b border-black  xl:flex-row lg:flex-col md:flex-col sm:flex-col"
                      >
                        <div>
                          <img
                            src={i.product.image}
                            className="w-52  p-6"
                          ></img>
                        </div>
                        <div>
                          <p className="mt-6 px-6 text-lg font-normal">
                            Name: {i.product.name}
                          </p>
                          <p className="px-6 text-lg font-normal">
                            Brand: {i.product.brand}
                          </p>
                          <p className="px-6 text-lg font-normal">
                            Color: {i.product.color}
                          </p>
                          <p className="px-6 text-lg font-normal">
                            Category: {i.product.category}
                          </p>
                          <p className="px-6 text-lg font-normal">
                            Description: {i.product.description}
                          </p>
                          <p className="px-6 text-lg font-normal">
                            Price: {i.product.price}$
                          </p>
                          <p className="px-6 text-lg font-normal">
                            Quantity: {i.qty}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-center mx-auto my-6 ">
                    <h3> Shipping and payment info </h3>
                  </div>
                  <div className="flex p-6 justify-between items-center xl:flex-row lg:flex-col md:flex-col sm:flex-col">
                    <div className="xl:ml-6 xl:text-left lg:text-center md:text-center sm:text-center">
                      <p className="my-4 text-lg font-normal">
                        City: {item.shippingAddress.city}
                      </p>
                      <p className="my-4 text-lg font-normal">
                        Address: {item.shippingAddress.address}
                      </p>
                      <p className="my-4 text-lg font-normal">
                        Phone: {item.shippingAddress.phone}
                      </p>
                      <p className="my-4 text-lg font-normal">
                        Postal code: {item.shippingAddress.postalCode}
                      </p>
                    </div>
                    <div className="xl:mr-6 xl:text-left lg:text-center md:text-center sm:text-center">
                      <p className="my-4 text-lg font-normal">
                        Payment method: {item.paymentMethod}
                      </p>
                      <p className="my-4 text-lg font-normal">
                        Shipping price: {item.shippingPrice}$
                      </p>
                      <p className="my-4 text-lg font-normal">
                        Total price: {item.totalPrice}$
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default SingleOrder;