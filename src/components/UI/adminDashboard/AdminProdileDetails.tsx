"use client"; // This line indicates that this component will be rendered on the client side
import React from "react";
import { Avatar } from "@nextui-org/react";
import { IUser } from "@/src/types";
function AdminProfileDetails({ user }: { user: IUser }) {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Profile Overview */}
      <div className="flex items-center mb-8">
        <Avatar
          alt={user?.name || "Unknown User"}
          className="mr-6"
          size="lg"
          src={user?.img || "/default-avatar.png"} // Fallback if no profile picture
        />
        <div>
          <h1 className="text-3xl font-bold">{user?.name || "Unnamed User"}</h1>
        </div>
      </div>

      {/* Static Section - Static text for extra information */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">About</h3>
        <p className="text-gray-700">
          You passionate about sharing knowledge and loves to contribute to the
          community. Stay tuned for more posts and insights!
        </p>
      </div>
    </div>
  );
}

export default AdminProfileDetails;
