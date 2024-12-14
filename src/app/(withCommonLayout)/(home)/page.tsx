import { getAllProduts } from "@/src/services/Products";

export default async function Home() {
  const data = await getAllProduts();
  console.log(data);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      Home
    </section>
  );
}
