


import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import { registerUser } from '../Services/AuthServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Logged in user
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const register = async (formData) => {
  try {
    const res = await fetch(`http://localhost:3000/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify({ email: formData.email, role: formData.role }));
      localStorage.setItem('token', data.token);

      setUser({ email: formData.email, role: formData.role });
      setToken(data.token);

      // ✅ FIX: Return the response so handleSubmit gets it
      return data;

      // Optionally:
      // window.location.href = data.verificationurl;
    } else {
      throw new Error(data.message || 'Registration failed');
    }
  } catch (err) {
  console.log("Error : ",err);
  
    throw err;
  }
};


  

    const login = async (formData) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
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
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
    
          <AuthContext.Provider value={{ user, token, register, login, logout }}>
              {children}
          </AuthContext.Provider>
        
     
    );
};
