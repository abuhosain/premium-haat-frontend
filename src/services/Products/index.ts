import envConfig from "@/src/config/env.confg";

export const getAllProduts = async () => {
  const res = await fetch(`${envConfig.baseApi}/product`);
  return res.json();
};
