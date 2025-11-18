import React from 'react';
import Banner from './Banner';
import FeaturesSection from './FeaturesSection ';
import Brands from './Brands';
import Reviews from './Reviews';
import FAQSection from './FAQSection';
import ServicesSection from './ServicesSection';

const reviewsPromise = fetch('/reviews.json').then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturesSection />
      <Brands />
      <ServicesSection />
      <Reviews reviewsPromise={reviewsPromise} />
      <FAQSection />
    </div>
  );
};

export default Home;
