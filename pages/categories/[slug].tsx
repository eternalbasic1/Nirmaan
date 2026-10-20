import type { GetStaticPaths, GetStaticProps } from "next";
import { categories } from "@/mockData";
import { Catalog } from "@/components/Catalog";
export default function Category({ category }: { category: string }) {
  return <Catalog key={category} initialCategory={category} />;
}
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: categories.map((c) => ({ params: { slug: c.id } })),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) =>
  categories.some((c) => c.id === params?.slug)
    ? { props: { category: params!.slug } }
    : { notFound: true };
