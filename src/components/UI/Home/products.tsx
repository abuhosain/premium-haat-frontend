"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input, Spinner } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import useDebounce from "@/src/hooks/debounce.hook";
import { IProduct } from "@/src/types";
import envConfig from "@/src/config/env.confg";
import axios from "axios";
import Container from "../../Container";
import ProductCard from "../Cared/ProductCard";
import { useGetAllCateogry } from "@/src/hooks/category.hooks";

// Create a new Axios instance for client-side requests
const axiosClient = axios.create({
  baseURL: envConfig.baseApi, // base url
  headers: {
    "Content-Type": "application/json",
  },
});

export default function ProductHome() {
  const { data: Category, isLoading, isError } = useGetAllCateogry();
  const { register, watch } = useForm();
  const searchTerm = useDebounce(watch("search"), 500);
  const [items, setItems] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let queryParams = "";
      if (searchTerm) {
        queryParams += `searchTerm=${searchTerm}`;
      }
      if (categoryFilter) {
        queryParams += `${queryParams ? "&" : ""}category=${categoryFilter}`;
      }
      if (minPrice !== null) {
        queryParams += `${queryParams ? "&" : ""}minPrice=${minPrice}`;
      }
      if (maxPrice !== null) {
        queryParams += `${queryParams ? "&" : ""}maxPrice=${maxPrice}`;
      }
      if (selectedSort) {
        queryParams += `${queryParams ? "&" : ""}sort=${selectedSort}`;
      }

      const response = await axiosClient.get(`/product?${queryParams}`);

      const FeedData = response?.data?.data;
      if (FeedData?.data) {
        setItems((prevItems) => [...prevItems, ...FeedData?.data]);

        if (FeedData.length === 0) {
          setHasMore(false);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        console.error("Error: No data found in response");
        setHasMore(false); // Stop fetching if no data is found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset and fetch new data when filters change
  useEffect(() => {
    setItems([]); // Reset items
    setPage(1); // Reset page
    setHasMore(true); // Reset hasMore flag
    fetchData();
  }, [searchTerm, selectedSort, categoryFilter, minPrice, maxPrice]);

  return (
    <Container>
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg sticky top-0 z-20 border border-gray-200 dark:bg-black dark:border-gray-700 dark:text-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center z-100 mt-4">
          {/* Search Bar */}
          <form>
            <Input
              {...register("search")}
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              placeholder="Search Product..."
              size="md"
              startContent={
                <SearchIcon className="flex-shrink-0 pointer-events-none text-base" />
              }
              type="text"
            />
          </form>

          {/* Filters */}
          <div className="flex items-center w-full sm:w-auto mt-4 sm:mt-0">
            <div className="sm:ml-4">
              <select
                onChange={(e) => setSelectedSort(e.target.value)}
                className="border rounded-md p-2"
              >
                <option value="">Sort by</option>
                <option value="-createdAt">Recent Product</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>

            <div className="sm:ml-4">
              <label htmlFor="categoryFilter" className="sr-only">
                Select Category
              </label>
              <select
                id="categoryFilter"
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border rounded-md p-2"
                defaultValue="" // To ensure it starts with the placeholder as the default
              >
                <option value="">Category</option>
                {/* Dynamically render categories */}
                {Category?.data?.map((category: any) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:ml-4">
              <input
                type="number"
                placeholder="Min Price"
                className="border rounded-md p-2"
                onChange={(e) =>
                  setMinPrice(
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
              />
              <input
                type="number"
                placeholder="Max Price"
                className="border rounded-md p-2 ml-2"
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full">
        <div className="flex justify-center">
          <div className="">
            <div className="">
              <InfiniteScroll
                dataLength={items?.length}
                endMessage={
                  <p className="text-2xl text-center font-bold text-gray-700 dark:text-gray-300 mb-2">
                    No more Products!
                  </p>
                }
                hasMore={hasMore}
                loader={<Spinner />}
                next={fetchData}
                style={{ overflow: "inherit", width: "100%" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
                  {items?.map((product: IProduct, index) => (
                    <ProductCard
                      key={`${product?.id}-${index}`}
                      product={product}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}
