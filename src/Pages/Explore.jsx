import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import '../css/explore.css';

function Explore() {
  const { setCurrentPage, setShowTitlePage, setSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Explore');
    setSearchButton(false);
  }, [setCurrentPage, setShowTitlePage, setSearchButton]);

  return (
    <div>
      <Header />
      <div className="content-explore">
        <Link
          to="/explore/foods"
          data-testid="explore-food"
          className="explore-btn"
        >
          Explore Foods
        </Link>
        <Link
          to="/explore/drinks"
          data-testid="explore-drinks"
          className="explore-btn"
        >
          Explore Drinks
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
