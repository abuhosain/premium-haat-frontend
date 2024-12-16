"use client";
 
import VendorTable from "@/src/components/UI/adminDashboard/VendorTable";
import {  useGetAllVendor } from "@/src/hooks/admin.hook";

import { useEffect, useState } from "react";

export default function ManageUsers() {
  const { data, isLoading } = useGetAllVendor(); // Fetching data through the hook

  // State to hold all users
  const [users, setUsers] = useState(data?.data || []);

  // Effect to update the users state when data changes
  useEffect(() => {
    if (data && data.data) {
      setUsers(data.data);
    }
  }, [data]);


  // Handle updating user status (block/unblock)
  const handleUpdate = (updatedUser: any) => {
    setUsers((prevUsers : any) =>
      prevUsers.map((user : any) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Vendors</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        users.map((user : any) => (
          <VendorTable
            key={user.id} // Key for unique identification
            isLoading={isLoading}
            user={user}    // Send each individual user to UserTable
            onUpdate={handleUpdate} // Callback for updating user status
          />
        ))
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
}
