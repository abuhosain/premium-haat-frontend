"use client";

import {
  useBlockUser,
  useDeleteUser,
  useUnBlockUser,
} from "@/src/hooks/admin.hook";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "BLOCKED"; // Enum-like typing for status
  role: "ADMIN" | "CUSTOMER" | "VENDOR"; // Updated role options
}

interface UserTableProps {
  user: User;
  isLoading: boolean;
  onDelete: (id: string) => void;
  onUpdate: (updatedUser: User) => void; // Callback for updating user status
}

const UserTable = ({ user, isLoading, onDelete, onUpdate }: UserTableProps) => {
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: blockUser, isPending: isBlocking } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblocking } = useUnBlockUser();

  const { id, email, status, role } = user; // Destructure user properties

  // Handle Delete User
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id); // Call the delete function from the hook
        toast.success("User deleted successfully!"); // Show success message
        onDelete(id); // Call the parent callback to remove the user from the UI
      } catch (error) {
        console.error(error); // Log the error
        toast.error("Failed to delete the user."); // Handle error case
      }
    }
  };

  // Handle Block/Unblock User
  const handleBlockToggle = async (id: string, currentStatus: "ACTIVE" | "BLOCKED") => {
    const action = currentStatus === "ACTIVE" ? "Suspned" : "Unsuspend"; // Determine action
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        if (currentStatus === "ACTIVE") {
          await blockUser(id); // Call the block function
        } else {
          await unblockUser(id); // Call the unblock function
        }
        toast.success(`User ${action}ed successfully!`); // Show success message

        // Optimistic update: Update user state in the parent component
        const updatedUser: User = {
          ...user,
          status: currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE", // Toggle status
        };
        onUpdate(updatedUser); // Call the parent callback to update the user status in the UI
      } catch (error) {
        console.error(error); // Log the error
        toast.error(`Failed to ${action} the user.`); // Handle error case
      }
    }
  };

  // Get role color based on role
  const getRoleColor = (role: "ADMIN" | "CUSTOMER" | "VENDOR") => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500";  
      case "CUSTOMER":
        return "bg-blue-500"; 
      case "VENDOR":
        return "bg-green-500";  
      default:
        return "bg-gray-500";  
    }
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full border border-gray-300 rounded-md table-auto">
        {/* Table Header */}
        <thead className="bg-blue-600 text-white dark:bg-gray-800 dark:text-gray-100">
          <tr>
            <th className="py-4 px-6 text-center font-bold">Email</th>
            <th className="py-4 px-6 text-center font-bold">Role</th>
            <th className="py-4 px-6 text-center font-bold">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <td className="py-4 px-6 text-center text-gray-800 dark:text-gray-200">{email}</td>

            {/* Display user role with a badge */}
            <td className="py-4 px-6 text-center">
              <span
                className={`px-3 py-1 rounded-full text-white font-semibold ${getRoleColor(role)}`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalize the role */}
              </span>
            </td>

            {/* Actions Column */}
            <td className="py-4 px-6 text-center">
              <div className="flex justify-center space-x-4">
                <button
                  className={`${
                    status === "ACTIVE" ? "bg-yellow-500" : "bg-green-500"
                  } text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out hover:opacity-90 dark:bg-yellow-400 dark:hover:bg-green-500 ${isBlocking || isUnblocking ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isBlocking || isUnblocking} // Disable button while blocking/unblocking
                  onClick={() => handleBlockToggle(id, status)}
                >
                  {isBlocking || isUnblocking
                    ? "Processing..."
                    : status === "ACTIVE"
                    ? "Suspend"
                    : "Unsuspend"}
                </button>

                <button
                  className={`bg-red-500 text-white px-3 py-1 rounded-md transition hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isDeleting} // Disable button while deleting
                  onClick={() => handleDelete(id)}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Show loading state if data is being fetched */}
      {isLoading && (
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400">Loading user data...</p>
      )}
    </div>
  );
};

export default UserTable;
