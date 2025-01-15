"use client";

import { useBlockVendor, useUnBlockVendor } from "@/src/hooks/admin.hook"; 
import Image from "next/image";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  logo : string;
  email: string;
  isBlocked: boolean; // Status for block/unblock
}

interface VendroTableProps {
  user: User;
  isLoading: boolean;
  onUpdate: (updatedUser: User) => void;
}

const VendroTable = ({ user, isLoading, onUpdate }: VendroTableProps) => {
  const { mutate: blockUser, isPending: isBlocking } = useBlockVendor();
  const { mutate: unblockUser, isPending: isUnblocking } = useUnBlockVendor();

  const { id, name, email,logo, isBlocked } = user; // Destructure user properties

  // Handle Block/Unblock User
  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    const action = isBlocked ? "unblock" : "block"; // Define action based on the current status
    if (confirm(`Are you sure you want to ${action} this Vendor?`)) {
      try {
        if (isBlocked) {
          await unblockUser(id); // Call the unblock function from the hook
        } else {
          await blockUser(id); // Call the block function from the hook
        }
        toast.success(`Vendor ${action}ed successfully!`); // Show success message

        // Update user state optimistically
        const updatedUser = { ...user, isBlocked: !isBlocked };
        onUpdate(updatedUser); // Call the parent callback to update the user status in the UI
      } catch (error) {
        toast.error(`Failed to ${action} the Vendor.`); // Handle error case
      }
    }
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white border border-gray-300 rounded-md table-auto">
        {/* Table Header */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-4 px-6 text-center font-bold">Image</th>
            <th className="py-4 px-6 text-center font-bold">Name</th>
            <th className="py-4 px-6 text-center font-bold">Email</th>
            <th className="py-4 px-6 text-center font-bold">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-4 px-6 text-center text-gray-800">
                <Image alt="logo" height={100} src={logo} width={100} />
            </td>
            <td className="py-4 px-6 text-center text-gray-800">{name}</td>
            <td className="py-4 px-6 text-center text-gray-800">{email}</td>
            <td className="py-4 px-6 text-center">
              <div className="flex justify-center space-x-4">
                <button
                  className={`${
                    isBlocked ? "bg-green-500" : "bg-yellow-500"
                  } text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out hover:opacity-90 ${
                    isBlocking || isUnblocking
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={isBlocking || isUnblocking} // Disable button while blocking/unblocking
                  onClick={() => handleBlockToggle(id, isBlocked)}
                >
                  {isBlocking || isUnblocking
                    ? "Processing..."
                    : isBlocked
                      ? "Unblock"
                      : "Block"}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Show loading state if data is being fetched */}
      {isLoading && (
        <p className="mt-4 text-center text-gray-500">Loading user data...</p>
      )}
    </div>
  );
};

export default VendroTable;
