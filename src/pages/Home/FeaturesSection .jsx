import React from 'react';
import {
  FaSearchLocation,
  FaClipboardList,
  FaTruck,
  FaCheckCircle,
} from 'react-icons/fa';
import { MdOutlineDeliveryDining, MdSecurity } from 'react-icons/md';
import { GiShakingHands } from 'react-icons/gi';
import { AiFillSafetyCertificate } from 'react-icons/ai';

const FeaturesSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-16">
      {/* 🔷 HOW IT WORKS */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <FaSearchLocation className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Step 1: Locate
            </h3>
            <p className="text-center">
              Find the nearest parcel point and choose your service.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <FaClipboardList className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Step 2: Submit
            </h3>
            <p className="text-center">
              Fill in parcel details and confirm your request.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <FaTruck className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Step 3: Delivery
            </h3>
            <p className="text-center">
              Your parcel is picked up and safely delivered.
            </p>
          </div>

          {/* Card 4 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <FaCheckCircle className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Step 4: Complete
            </h3>
            <p className="text-center">
              Track your parcel until successful delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 🔷 OUR SERVICES */}
      <section className="bg-primary p-15 rounded-3xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-white ">
          Our Services
        </h2>
        <p className="text-white text-center mb-6">
          We provide fast, secure, and reliable services for all your parcel
          needs. From delivery to real-time tracking, every step is handled with
          care. Experience convenience and trust with our professional
          solutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <MdOutlineDeliveryDining className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Fast Delivery
            </h3>
            <p className="text-center">Quick and reliable parcel services.</p>
          </div>

          {/* Service Card 2 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <MdSecurity className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Secure Packaging
            </h3>
            <p className="text-center">We ensure your parcel is protected.</p>
          </div>

          {/* Service Card 3 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <GiShakingHands className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Trusted Support
            </h3>
            <p className="text-center">
              Our team is available 24/7 for assistance.
            </p>
          </div>

          {/* Service Card 4 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <AiFillSafetyCertificate className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Parcel Insurance
            </h3>
            <p className="text-center">
              We offer coverage for sensitive parcels.
            </p>
          </div>

          {/* Service Card 5 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <FaTruck className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Nationwide Delivery
            </h3>
            <p className="text-center">Delivery anywhere in the country.</p>
          </div>

          {/* Service Card 6 */}
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition hover:bg-secondary cursor-pointer">
            <FaClipboardList className="text-5xl mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-lg text-center mb-2">
              Easy Tracking
            </h3>
            <p className="text-center">Track your parcels in real-time.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
