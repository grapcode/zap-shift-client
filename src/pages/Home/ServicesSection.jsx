import React from 'react';
import { FaPhoneAlt, FaShieldAlt, FaMapMarkedAlt } from 'react-icons/fa';
import locationImg from '../../assets/location-merchant.png';
const ServicesSection = () => {
  const features = [
    {
      title: 'Live Parcel Tracking',
      desc: 'Track your parcel in real-time with our smart tracking system for a transparent delivery experience.',
      icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
    },
    {
      title: '100% Safe Delivery',
      desc: 'We ensure your product reaches the destination safely with multi-layer protection.',
      icon: <FaShieldAlt className="text-4xl text-primary" />,
    },
    {
      title: '24/7 Call Center Support',
      desc: 'Our active support team is always ready to assist you at any hour of the day.',
      icon: <FaPhoneAlt className="text-4xl text-primary" />,
    },
  ];

  return (
    <div className="space-y-24">
      {/* SECTION 1 */}
      <section className="grid  gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex bg-base-100 p-6 rounded-xl shadow hover:bg-secondary cursor-pointer items-start gap-5"
          >
            <div className="min-w-[90px] flex items-center justify-center bg-base-200 rounded-lg p-4">
              {item.icon}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 2 */}
      <section className="grid md:grid-cols-2 gap-10 items-center bg-primary p-10 rounded-3xl ">
        <div className="text-white">
          <h2 className="text-3xl font-bold leading-snug mb-4">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>

          <p className="text-gray-50 leading-relaxed mb-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex gap-4">
            <button className="btn btn-secondary text-primary">
              Become a Merchant
            </button>
            <button className="btn btn-outline">Contact Support</button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={locationImg}
            alt="Map Art"
            className="w-full max-w-md drop-shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;
