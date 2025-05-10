
import axios from "axios";
import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setuser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async ()=> {
        try {
            const responce = await axios.get("http://127.0.0.1:8000/api/user",
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
                )
            setuser(responce.data);
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    fetchUser();
  }, []);

  return user;
}
