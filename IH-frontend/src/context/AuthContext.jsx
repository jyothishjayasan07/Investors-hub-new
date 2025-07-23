


import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";// ✅ Correct

import { useNavigate } from 'react-router-dom';


import { toast } from 'react-toastify';
// import { registerUser } from '../Services/AuthServices';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  console.log(context)

  if (!context) {
    throw new Error("useauth must be the used within the authprovider")
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged in user
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // 🟡 New
    const navigate = useNavigate(); // 👈 for redirect

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');


    if (storedUser && storedToken) {
       const decodedToken = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;
       if (decodedToken.exp < currentTime) {
        // 🔴 Token expired
        toast.error("Session expired. Please login again.");
        logout(); // clear everything
        navigate('/login'); // redirect to login
      } else {
        // ✅ Token still valid
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    }

    
    setLoading(false); // ✅ Done loading

    console.log(user);
    
  }, [navigate]);

// ✅ Keep this in AuthContext (as-is)
const register = async (formData) => {
  
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    localStorage.setItem('user', JSON.stringify({ email: formData.email, role: formData.role }));
    localStorage.setItem('token', data.token);

    setUser({ email: formData.email, role: formData.role });
    setToken(data.token);

    return data;
    
  } catch (err) {
    console.error('❌ Registration Error:', err.message);
    throw err;
  }
};






 const login = async (formData) => {
  try {
    const res = await fetch('http://localhost:3000/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      setUser(data.user);
      setToken(data.token);

      return { data, status: res.status };
    } else {
      const error = new Error(data.message || 'Login failed');
      error.status = res.status;
      throw error;
    }

  } catch (err) {
    console.error("Login request failed:", err);
    throw err; // important!
  }
};


  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (

    <AuthContext.Provider value={{ user, token, register, login, logout ,loading}}>
      {children}
    </AuthContext.Provider>


  );
};
