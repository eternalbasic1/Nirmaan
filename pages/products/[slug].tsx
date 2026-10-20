import type { GetStaticPaths, GetStaticProps } from "next";
import { products } from "@/mockData";
import type { Product } from "@/lib/types";
import ProductDetail from "../ProductDetail";
export default function ProductPage({ product }: { product: Product }) {
  return <ProductDetail product={product} />;
}
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: products.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => p.slug === params?.slug);
  return product ? { props: { product } } : { notFound: true };
};
