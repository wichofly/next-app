interface ProductPageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ sortOrder?: string }>;
}

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { slug } = await params;
  const { sortOrder } = await searchParams;

  return (
    <div>
      ProductPage {slug?.join('/')} - Sort Order: {sortOrder}
    </div>
  );
};

export default ProductPage;
