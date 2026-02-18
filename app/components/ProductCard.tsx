import AddToCart from './AddToCart';

const ProductCard = () => {
  return (
    <div className="p-5 my-5 bg-sky-400 text-white text-xl rounded-lg hover:bg-sky-500 transition-colors">
      <AddToCart />
    </div>
  );
};

export default ProductCard;
