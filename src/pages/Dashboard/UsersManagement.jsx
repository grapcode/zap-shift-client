import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUserShield, FaUserSlash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { FaSearch } from 'react-icons/fa';

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchTExt] = useState('');

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: 'admin' };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.displayName} User Marked as Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: 'user' };
    // must ask for confirmation before proceed

    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.displayName} Removed from Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="p-3">
      <h2 className="text-3xl "> Management Users: {users.length}</h2>

      {/* search bar */}
      <label className="input my-5">
        <FaSearch />
        <input
          onChange={(e) => setSearchTExt(e.target.value)}
          type="search"
          className="grow"
          placeholder="Search users"
        />
      </label>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}

          <thead>
            <tr>
              <th>
                <label>No</label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Admin Action</th>
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-error btn-sm"
                    >
                      <FaUserSlash className="text-lg" />
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-success btn-sm"
                    >
                      <FaUserShield className="text-lg" />
                      Make Admin
                    </button>
                  )}
                </td>
                <th>action</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
