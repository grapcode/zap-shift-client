import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaRegTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: riders = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['riders', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');

      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Rider status is set to  ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, 'approved');
  };
  const handleRejection = (rider) => {
    updateRiderStatus(rider, 'rejected');
  };

  return (
    <div>
      <h2 className="text-4xl">Riders pending approval: {riders.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th> {index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>
                  <p
                    className={`${
                      rider.status === 'approved'
                        ? 'text-green-700'
                        : 'text-red-500'
                    }
                    `}
                  >
                    {rider.status}
                  </p>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn btn-secondary text-black"
                  >
                    <FaUserCheck />
                  </button>

                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn btn-secondary text-black"
                  >
                    <IoPersonRemove />
                  </button>
                  <button className="btn btn-secondary text-black">
                    <FaRegTrashAlt />
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

export default ApproveRider;
