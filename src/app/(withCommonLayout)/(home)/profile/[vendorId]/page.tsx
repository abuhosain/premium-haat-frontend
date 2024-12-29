"use client";

import { useUser } from "@/src/context/user.provider";
import { useAddFollowAndUnfollow } from "@/src/hooks/user.hook";
import { useGetVendorByVendorId } from "@/src/hooks/vendor.hook";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import ProductCard from "@/src/components/UI/Cared/ProductCard";

interface Params {
  vendorId: string;
}

const VendorProfilePage = ({ params }: { params: Promise<Params> }) => {
  const { vendorId } = use(params);
  const { user } = useUser();
  const {
    data: vendorData,
    isLoading,
    isError,
  } = useGetVendorByVendorId(vendorId);
  const { mutate: followUser } = useAddFollowAndUnfollow();
  const [isFollowing, setIsFollowing] = useState(false);

  const vendor = vendorData?.data;

  useEffect(() => {
    if (vendor && user) {
      const following = vendor.follow?.some((item : any) => item.userId === user.id);
      setIsFollowing(following || false);
    }
  }, [vendor, user]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading vendor profile</div>;
  if (!vendor) return <div>Vendor not found</div>;

  const handleFollowToggle = () => {
    followUser(
      { vendorId: vendor.id },
      {
        onSuccess: () => {
          setIsFollowing((prev) => !prev);
        },
      }
    );
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            {vendor.logo && (
              <Image
                src={vendor.logo}
                alt={`${vendor?.name} logo`}
                width={100}
                height={100}
                className="rounded-full"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">{vendor.name}</h1>
              <p className="text-gray-600">
                {vendor.followers?.length || 0} followers
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
              {vendor.description || "No description available."}
            </p>
          </div>

          <Button onClick={handleFollowToggle}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendor?.product?.map((product: any) => (
          <ProductCard key={`${product.id}`} product={product} />
        ))}
      </div>
    </div>
  );
};

export default VendorProfilePage;
