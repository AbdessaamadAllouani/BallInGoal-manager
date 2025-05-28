import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAuth } from "../../hook/useUser";
import "./AdminPage.css";
import Header from "../includes/Header";
import ProductAdd from "./ProductAdd";
import ProductShow from "./ProductShow";
import ProductEdit from "./ProductEdet";
import NewsAdd from "./NewsAdd";
import NewsShow from "./NewsShow";

const AdminPage = () => {
  const [isVisible, setIsVisible] = useState({
    produits: false,
    nouvelles: false,
    utilisateurs: false,
    sponsors: false,
  });
  const [voir, setVoir] = useState({
    produits: false,
    nouvelles: false,
    utilisateurs: false,
    sponsors: false,
  });
  const [add, setAdd] = useState({
    produits: false,
    nouvelles: false,
    utilisateurs: false,
    sponsors: false,
  });

  const [edit, setEdit] = useState({
    produits: false,
    nouvelles: false,
    utilisateurs: false,
    sponsors: false,
  });

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  return (
    <div className="adminPage">
      <Header />
      <div className="adminPage__container">
        <div className="dasheboard-btns">
          <button
            className="btn-produits"
            onClick={() =>
              setIsVisible({
                nouvelles: false,
                utilisateurs: false,
                sponsors: false,
                produits: !isVisible.produits,
              })
            }
          >
            les produits
          </button>
          {isVisible.produits && (
            <div className="btns-produits">
              <button
                onClick={() => {
                  setVoir({
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                    produits: !voir.produits,
                  });
                  setAdd({
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                    produits: false,
                  });
                setEdit({
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                    produits: false,
                });

                }}
              >
                voir{" "}
              </button>
              <button
                onClick={() => {
                  setAdd({
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                    produits: !add.produits,
                  });
                  setVoir({
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                    produits: false,
                  });
                  setEdit({
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                    produits: false,
                  });
                }}
              >
                ajouter
              </button>
            </div>
          )}
          <button
            className="btn-nouvelles"
            onClick={() =>
              setIsVisible({
                produits: false,
                utilisateurs: false,
                sponsors: false,
                nouvelles: !isVisible.nouvelles,
              })
            }
          >
            les nouvelles
          </button>
          {isVisible.nouvelles && (
            <div className="btns-nouvelles">
              <button
                onClick={() => {
                  setVoir({
                    produits: false,
                    utilisateurs: false,
                    sponsors: false,
                    nouvelles: !voir.nouvelles,
                  });
                  setAdd({
                    produits: false,
                    utilisateurs: false,
                    sponsors: false,
                    nouvelles: false,
                  });
                  setEdit({
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                    produits: false,
                  });
                }}
              >
                voir
              </button>
              <button
                onClick={() => {
                  setAdd({
                    produits: false,
                    utilisateurs: false,
                    sponsors: false,
                    nouvelles: !add.nouvelles,
                  });
                  setVoir({
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                    produits: false,
                  });
                    setEdit({
                        nouvelles: false,
                        utilisateurs: false,
                        sponsors: false,
                        produits: false,
                    });
                }}
              >
                ajouter
              </button>
            </div>
          )}
          <button
            className="btn-utilisateurs"
            onClick={() =>
              setIsVisible({
                produits: false,
                nouvelles: false,
                sponsors: false,
                utilisateurs: !isVisible.utilisateurs,
              })
            }
          >
            les utilisateurs
          </button>
          {isVisible.utilisateurs && (
            <div className="btns-utilisateurs">
              <button
                onClick={() => {
                  setVoir({
                    produits: false,
                    nouvelles: false,
                    sponsors: false,
                    utilisateurs: !voir.utilisateurs,
                  });
                  setAdd({
                    produits: false,
                    nouvelles: false,
                    sponsors: false,
                    utilisateurs: false,
                  });
                    setEdit({
                        nouvelles: false,
                        utilisateurs: false,
                        sponsors: false,
                        produits: false,
                    });
                }}
              >
                voir{" "}
              </button>
              <button
                onClick={() => {
                  setAdd({
                    produits: false,
                    nouvelles: false,
                    utilisateurs: !add.utilisateurs,
                    sponsors: false,
                  });
                  setVoir({
                    produits: false,
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                  });
                  setEdit({
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                    produits: false,
                  });
                }}
              >
                ajouter
              </button>
            </div>
          )}
          <button
            className="btn-sponsors"
            onClick={() =>
              setIsVisible({
                produits: false,
                nouvelles: false,
                utilisateurs: false,
                sponsors: !isVisible.sponsors,
              })
            }
          >
            les sponsors
          </button>
          {isVisible.sponsors && (
            <div className="btns-sponsors">
              <button
                onClick={() => {
                  setVoir({
                    produits: false,
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: !voir.sponsors,
                  });
                  setAdd({
                    produits: false,
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                  });
                    setEdit({
                        nouvelles: false,
                        utilisateurs: false,
                        sponsors: false,
                        produits: false,
                    });
                }}
              >
                voir{" "}
              </button>
              <button
                onClick={() => {
                  setAdd({
                    produits: false,
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: !add.sponsors,
                  });
                  setVoir({
                    produits: false,
                    nouvelles: false,
                    utilisateurs: false,
                    sponsors: false,
                  });
                    setEdit({
                        nouvelles: false,
                        utilisateurs: false,
                        sponsors: false,
                        produits: false,
                    });
                }}
                
              >
                ajouter
              </button>
            </div>
          )}
        </div>
        <div className="dasheboard-content">
          {voir.produits && (
            <ProductShow
              setAdd={setAdd}
              setVoir={setVoir}
              setEdit={setEdit}
              setProduct={setProduct}
            />
          )}
          {add.produits && <ProductAdd />}
          {edit.produits && <ProductEdit product={product} />}
          {add.nouvelles && <NewsAdd/>}
          {voir.nouvelles && <NewsShow/>}
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
