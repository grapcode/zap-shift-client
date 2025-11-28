import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef(); // step-1

  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ['parcels', 'pending-pickup'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending-pickup`
      );
      return res.data;
    },
  });

  //   todo: invalidate query after assigning a rider

  const { data: riders = [] } = useQuery({
    queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  // modal s-2
  const openRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          riderModalRef.current.close();
          parcelsRefetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Rider has been assigned`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  return (
    <div>
      <h3 className="text-3xl">Assign Riders: {parcels.length}</h3>

      {/* ❌ parcels -- Table start*/}

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>${parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openRiderModal(parcel)} // modal s-2
                    className="btn btn-secondary text-black"
                  >
                    Finder Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ❌ modal start*/}

      <dialog
        ref={riderModalRef} // step-1
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders: {riders.length}</h3>

          {/* ❌ riders -- Table start*/}
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>email</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {riders.map((rider, index) => (
                  <tr key={rider._id}>
                    <th>{index + 1}</th>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>

                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn btn-secondary text-black"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
