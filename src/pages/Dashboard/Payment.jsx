import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import MyLoading from '../../components/my-components/MyLoading';

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  console.log(parcel);

  // apy
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div>
      <h2>
        Please Pay ${parcel.cost} For: {parcel?.parcelName}
      </h2>
      <button onClick={handlePayment} className="btn btn-secondary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
