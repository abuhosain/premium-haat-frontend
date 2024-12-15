/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { useDeleteProduct } from "@/src/hooks/product.hooks";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

interface ProductTableProps {
  products: any;
  setProducts: React.Dispatch<React.SetStateAction<any[]>>; // Pass the setProducts function
  isLoading: boolean;
}

const ProductTable = ({
  products,
  setProducts,
  isLoading,
}: ProductTableProps) => {
  const { mutate: deleteProduct } = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<string | null>(null); // Handle deleting state for each recipe

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        setDeletingId(id);
        await deleteProduct(id);
        toast.success("Recipe deleted successfully!");

        setProducts((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== id)
        );
      } catch (error) {
        toast.error("Failed to delete the recipe.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Image
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Title
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Description
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="py-4 text-center" colSpan={4}>
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" />
                </div>
              </td>
            </tr>
          ) : products.length > 0 ? (
            products.map((product: any) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">
                  <img
                    alt={product?.title}
                    className="w-16 h-16 object-cover rounded-md"
                    src={product?.img || "/placeholder.png"}
                  />
                </td>
                <td className="py-2 px-4">{product.title}</td>
                <td className="py-2 px-4">{product.description}</td>
                <td className="py-2 px-4 mt-3 flex space-x-2">
                  <Link href={`/vendor/product/${product?.id}`}>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                      Update
                    </button>
                  </Link>
                  <button
                    className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
                      deletingId === product._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={deletingId === product._id} // Disable only the button for the recipe being deleted
                    onClick={() => handleDelete(product._id)}
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 text-center" colSpan={4}>
                No recipes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
