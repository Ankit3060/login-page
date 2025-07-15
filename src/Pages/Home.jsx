import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Home() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You are not authenticated, Please log in.");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
          {
            withCredentials: true,
            headers: {
              // "x-api-key": import.meta.env.VITE_API_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    
    fetchUser();
  }, []);

  return (
    <>
      <div className="px-6 py-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          {`Welcome to AuXiVault! ${user?.firstName || 'Guest'}`}
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel nisl a metus tincidunt suscipit. Integer
            non magna sed libero congue gravida in sed metus. Aenean ac magna vel lacus placerat tincidunt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Why Choose Us?</h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut lacinia augue. Sed at sapien at libero tristique
            facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Get Started</h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra, justo at malesuada pulvinar, velit ligula
            viverra sapien, sit amet lacinia erat augue nec libero. Morbi eget augue a metus volutpat feugiat.
          </p>
        </section>
      </div>
    </>
  )
}

export default Home