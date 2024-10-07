// app/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "postcss";

export default function HomePage() {
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    //const [errorMessage, setErrorMessage] = useState(null); // State to show error message

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        /*if (!name) {
          setErrorMessage('Name is required'); // Client-side validation
          return;
      }*/

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                setName('');
                //alert("User added!");
                fetchUsers(); // Refresh user list after adding
            } else {
                alert("Error adding user");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="bg-inherit p-5 h-screen">
            <h1 className="flex justify-center pt-2 text-xl font-bold">Thursday Club</h1>
            <h1 className="flex justify-center pt-2 text-xl font-bold">Event Registration</h1>
            <h1 className="flex justify-center pt-2 text-sm"> 
              <span className="font-bold mr-1">Venue:</span> 
              TBA 
              <span className="font-bold ml-3 mr-1">Date:</span> 
              TBA 
              <span className="font-bold ml-3 mr-1">Time:</span> 
              TBA
              </h1>

              <Link 
              className="flex justify-center pt-2 text-sm"
              href="https://thursday-club-blog.vercel.app/">Back to Blog</Link>
          
        
        
            <div className="flex justify-center">
              <h1 className="font-bold p-1 text-sm pt-5">Attendee Registration</h1>
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        className="p-2 rounded-md border border-green-400 text-1rem mb-4 text-slate-900"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required // Ensure this field is required
                    />
                    <button className="bg-green-400 p-2 text-slate-900 tracking-normal font-bold rounded-md text-sm" type="submit">
                        Submit
                    </button>   
                </form>
            </div>

          
            <div className="flex justify-center" >
                <h2 className="font-bold p-1 text-sm pt-5">Attendee List</h2>
            </div>
            <div className="flex justify-center">
                <ul className="text-sm px-1">
                    {users.map((user, index) => (
                        <li key={index}>{user.name}</li>
                    ))}
                </ul> 
            </div>
        </div>
        
    );
}
