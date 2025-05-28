import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";
const ProductShow = ({ setVoir, setAdd, setEdit, setProduct }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

//   console.log(x());
//   const x = () => {
//     const y = () => {
//       return 1;
//     };
//     console.log(y());
//     const y = () => {
//       return 0;
//     };
//   };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      +product.price === +searchTerm ||
      +product.stock === +searchTerm ||
      +product.id === +searchTerm
      // || product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-show">
      <h1 style={{ display: "inline", width: "fit-content" }}>
        Product List
      </h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, description, price, stock, or ID"
        style={{
          display: "inline",
          width: "400px",
            height: "30px",
          margin: "0 0 20px 0",
          padding: "5px",
        }}
      />

      {message && <p className="message">{message}</p>}
      <div className="products">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="div-img">
              <img
                src={`http://localhost:8000/storage/${product.image}`}
                alt=""
              />
            </div>
            <hr style={{ margin: "6px 0 0" }} />
            <p>{product.name}</p>
            <p>{product.description}</p>
            <h3>{product.price + "$   stock: " + product.stock}</h3>
            <div className="product-actions">
              <button
                onClick={() => {
                  setEdit({
                    produits: true,
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                  });
                  setAdd({
                    produits: false,
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                  });
                  setVoir({
                    produits: false,
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                  });
                  setProduct({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    stock: product.stock,
                  });
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductShow;
