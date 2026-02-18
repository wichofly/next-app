interface ProductPageProps {
  params: Promise<{ slug?: string[] }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  return <div>ProductPage {slug?.join('/')}</div>;
};

export default ProductPage;
