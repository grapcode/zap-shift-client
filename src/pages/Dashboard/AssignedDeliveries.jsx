import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
  const { user } = useAuth(); // firebase auth user

  const axiosSecure = useAxiosSecure(); // url →  http://localhost:3000

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user?.email, 'driver_assigned'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    let message = `parcel status is updated with ${status
      .split('_')
      .join(' ')}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl">Parcels Pending Pickup: {parcels.length}</h2>

      {/* ❌ parcels -- Table start*/}

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Confirm</th>

              <th>Pickup District </th>
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td className="space-x-3">
                  {parcel.deliveryStatus === 'driver_assigned' ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, 'rider_arriving')
                        }
                        className="btn btn-secondary text-black"
                      >
                        Accept
                      </button>
                      <button className="btn btn-active text-black">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>

                <td>{parcel.senderDistrict}</td>
                <td className="space-x-3">
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')
                    }
                    className="btn btn-secondary text-black"
                  >
                    Mark as Picked Up
                  </button>
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, 'parcel_delivered')
                    }
                    className="btn btn-secondary text-black"
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
