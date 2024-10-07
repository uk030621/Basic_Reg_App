// app/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
      <div >
            <h1 className="flex justify-center pt-2 text-xl font-bold">Thursday Club Xmas Dinner Registration</h1>
            <h1 className="flex justify-center pt-2 text-sm text-slate-700"> 
              <span className="font-bold mr-1">Venue:</span> 
              TBA 
              <span className="font-bold ml-3 mr-1">Date:</span> 
              TBA 
              <span className="font-bold ml-3 mr-1">Time:</span> 
              TBA
              </h1>

              <Link 
              className="flex justify-center pt-2 text-sm text-slate-500"
              href="https://vercel.live/link/thursday-club-blog.vercel.app?via=project-dashboard-alias-list&p=1">Back to Blog</Link>
          
        <div className="p-5 flex justify-center gap-4">
          <div className="inline-block">
              <h1 className="font-bold p-1 text-sm">Attendee Registration</h1>
              <form onSubmit={handleSubmit}>
                  <input
                      className="p-2 rounded-md border border-green-400 text-sm"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required // Ensure this field is required
                  />
                  <button className="ml-4 bg-green-400 p-2 font-thin rounded-md text-sm" type="submit">Submit</button> 
              </form>
            </div>
          <div className="inline-block">
            <h2 className="font-bold p-1 text-sm">Attendee List</h2>
            <ul className="text-sm px-1">
                {users.map((user, index) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
          </div>
        </div>
        </div>
    );
}
