"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import useDebounce from "@/src/hooks/debounce.hook";
import { IProduct } from "@/src/types";
import envConfig from "@/src/config/env.confg";
import axios from "axios";
import Container from "../../Container";
import ProductCard from "../Cared/ProductCard";
import { useGetAllCateogry } from "@/src/hooks/category.hooks";

const axiosClient = axios.create({
  baseURL: envConfig.baseApi,
  headers: { "Content-Type": "application/json" },
});

export default function ProductHome() {
    const { data: Category } = useGetAllCateogry();
    const { register, watch } = useForm();
    const searchTerm = useDebounce(watch("search"), 500);
  
    const [items, setItems] = useState<IProduct[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedSort, setSelectedSort] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
  
    const fetchData = async () => {
      if (loading) return;
      setLoading(true);
  
      let queryParams = `page=${page}&limit=4`;
      if (searchTerm) queryParams += `&searchTerm=${searchTerm}`;
      if (categoryFilter) queryParams += `&category=${categoryFilter}`;
      if (minPrice !== null) queryParams += `&minPrice=${minPrice}`;
      if (maxPrice !== null) queryParams += `&maxPrice=${maxPrice}`;
      if (selectedSort) queryParams += `&sort=${selectedSort}`;
  
      try {
        const response = await axiosClient.get(`/product?${queryParams}`);
        const FeedData = response?.data?.data;
        if (page === 1) {
          setItems(FeedData?.data);
        } else {
          setItems((prevItems) => [...prevItems, ...FeedData?.data]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Reset page and items when filters change
    useEffect(() => {
      setPage(1);
      setItems([]);
    }, [searchTerm, selectedSort, categoryFilter, minPrice, maxPrice]);
  
    // Fetch data when page or filters change
    useEffect(() => {
      fetchData();
    }, [page, searchTerm, selectedSort, categoryFilter, minPrice, maxPrice]);
  
    const handleInfiniteScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 1
      ) {
        if (!loading) setPage((prev) => prev + 1);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleInfiniteScroll);
      return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []);
  
    return (
      <Container>
        {/* Header */}
        <div className="mb-8 p-6 bg-white shadow-lg rounded-lg sticky top-0 z-20 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <form>
              <Input
                {...register("search")}
                aria-label="Search"
                placeholder="Search Product..."
                size="md"
                startContent={
                  <SearchIcon className="flex-shrink-0 pointer-events-none" />
                }
              />
            </form>
            <div className="flex items-center">
              <select onChange={(e) => setSelectedSort(e.target.value)}>
                <option value="">Sort by</option>
                <option value="-createdAt">Recent</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
              <select onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">Category</option>
                {Category?.data?.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Min Price"
                onChange={(e) =>
                  setMinPrice(e.target.value ? parseFloat(e.target.value) : null)
                }
              />
              <input
                type="number"
                placeholder="Max Price"
                onChange={(e) =>
                  setMaxPrice(e.target.value ? parseFloat(e.target.value) : null)
                }
              />
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </div>
          {loading && <div className="text-center">Loading...</div>}
        </main>
      </Container>
    );
  }
  
