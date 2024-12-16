// import ProductCard from "@/src/components/UI/Cared/ProductCard";
// import { getAllProduts } from "@/src/services/Products";
// import Image from "next/image";
// import Link from "next/link";

import ProductHome from "@/src/components/UI/Home/products";

// export default async function Home() {
//   // Fetch products asynchronously
//   const { data } = await getAllProduts();
//   console.log(data?.data);

//   // Error handling if data fetching fails
//   if (!data?.data) {
//     return (
//       <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
//         <p className="text-red-500">
//           Failed to load products. Please try again later.
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
//       <h1 className="text-2xl font-semibold mb-6">Our Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
//         {data.data.map((product : any) => (
//          <ProductCard product={product} key={product?.id} />
//         ))}
//       </div>
//     </section>
//   );
// }

export default async function Home() {
  return (
    <ProductHome  />
  );
}
