import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
  return (
    <div>
      <h2 className="text-4xl"> Payment is cancelled. Please try again</h2>
      <Link to="/dashboard/my-parcels">
        <button className="btn btn-secondary text-black">Try again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
