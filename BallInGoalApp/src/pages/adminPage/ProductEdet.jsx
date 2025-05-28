import React from "react";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import "./AdminPage.css";

const ProductEdit = ({product}) => {
    const [newProduct, setNewProduct] = useState({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        // category: product.category,
        stock: product.stock,
    });
    console.log(newProduct);
    const [message, setMessage] = useState(null);
    const textareaRef = useRef(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", newProduct.name);
        console.log(newProduct.name);

        formData.append("description", newProduct.description);
        formData.append("price", parseFloat(newProduct.price))
        if (newProduct.image instanceof File) {
          formData.append("image", newProduct.image); // الصورة من input
        }
          
        // formData.append("category", product.category);
        formData.append("stock", parseInt(newProduct.stock));
    
        try {
        const response = await axios.post(
            `http://localhost:8000/api/products/${product.id}`,
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
        // setNewProduct({
        //     id: product.id,
        //     name: "",
        //     description: "",
        //     price: "",
        //     image: null,
        //     category: "",
        //     stock: "",
        // });
        } catch (error) {
        console.error("Error adding product:", error);
        }
    };

    const handleChange = (e) => {
        setNewProduct({ ...product, description: e.target.value });
        autoResize();
    };

    const autoResize = () => {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };

    return (
      <div className="product-add">
        <h1>Edit Product</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...product, name: e.target.value })
            }
          />
          <textarea
            ref={textareaRef}
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...product, price: e.target.value })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewProduct({ ...product, image: e.target.files[0] })
            }
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...product, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...product, stock: e.target.value })
            }
          />
          <button type="submit">Update Product</button>
        </form>
      </div>
    );
}
export default ProductEdit;