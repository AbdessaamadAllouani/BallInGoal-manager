import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AdminPage.css";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "",
    stock: "",
  });
  const [message, setMessage] = useState(null);
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", product.image);
    // formData.append("category", product.category);
    formData.append("stock", product.stock);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      // Reset the form after successful submission
      setProduct({
        name: "",
        description: "",
        price: 0.0,
        image: null,
        category: "",
        stock: 0,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, description: e.target.value });
    autoResize();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = textarea.scrollHeight + "px"; // Set to fit content
    }
  };

  useEffect(() => {
    autoResize();
  }, [product.description]);

  return (
    <div className="product-add">
      <h2>Ajouter nouveau Produit</h2>
      {message && <p className="message"> {message} </p>}
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label>Name:</label> */}
          <input
            type="text"
            placeholder="Enter product name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </div>
        <div>
          {/* <label>Description:</label> */}
          <textarea
            placeholder="Enter product description"
            value={product.description}
            onChange={(e) => handleChange(e)}
            ref={textareaRef}
            required
            style={{}}
          ></textarea>
        </div>
        <div>
          {/* <label>Price:</label> */}
          <input
            placeholder="Enter product price"
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) })
            }
            required
          />
        </div>
        <div>
          {/* <label>Image:</label> */}
          <input
            placeholder="Enter product image"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProduct({ ...product, image: e.target.files[0] })
            }
            required
          />
        </div>
        <div>
          {/* <label>Category:</label> */}
          <input
            placeholder="Enter product category"
            type="text"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            required
          />
        </div>
        <div>
          {/* <label>Stock:</label> */}
          <input
            placeholder="Enter product stock"
            type="number"
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: parseInt(e.target.value) })
            }
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};
export default ProductAdd;
