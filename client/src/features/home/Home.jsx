import ProductSearchBar from "../../components/productSearchBar/ProductSearchBar";
import ProductCarousel from "../../components/productCarousel/ProductCarousel";
import './Home.css';

const Home = () => {
    return (
      <>
        <div className="home-body">
          <ProductSearchBar />
        </div>
        <div>
          <ProductCarousel />
        </div>
      </>
    );
};

export default Home;