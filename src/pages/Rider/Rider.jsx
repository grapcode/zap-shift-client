import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import riderImg from '../../assets/agent-pending.png'; // তোমার ইমেজ পাথ বসাও
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

export default function Rider() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const riderRegion = useWatch({ control, name: 'region' });

  const handleRiderApplication = (data) => {
    console.log('Rider submit:', data);
    // API call or further actions
    axiosSecure.post('/riders', data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:
            'Your application has been submitted. We will reach to you in 145 days',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 items-start">
      {/* LEFT: text + form */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Be a Rider</h2>
        <p className="text-gray-600 mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <h3 className="text-xl font-semibold mb-4">textl us about yourself</h3>

        <form
          onSubmit={handleSubmit(handleRiderApplication)}
          className="space-y-6"
        >
          {/* ❌ Rider & Receiver */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Rider */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Rider Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="label">Rider Name</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    defaultValue={user?.displayName}
                    className="input input-bordered w-full"
                    placeholder="rider Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      Rider name is required.
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">Rider Phone No</label>
                  <input
                    type="text"
                    {...register('phone', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="rider Phone No"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      Phone number is required.
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">Rider Email</label>
                  <input
                    type="text"
                    {...register('email', { required: true })}
                    defaultValue={user?.email}
                    className="input input-bordered w-full"
                    placeholder="Rider Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">Email is required.</p>
                  )}
                </div>

                {/* 💥 Rider Regions */}
                <div>
                  <label className="label">Rider Regions</label>
                  <select
                    {...register('region', { required: true })}
                    defaultValue="Pick a region"
                    className="select select-bordered w-full"
                  >
                    <option disabled={true}>Pick a region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="text-red-500 text-sm">Select a district.</p>
                  )}
                </div>

                {/* 💥Rider District */}
                <div>
                  <label className="label">Rider District</label>
                  <select
                    {...register('district', { required: true })}
                    defaultValue="Pick a District"
                    className="select select-bordered w-full"
                  >
                    <option value="">Pick a District</option>
                    {districtsByRegion(riderRegion).map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="text-red-500 text-sm">Select a district.</p>
                  )}
                </div>

                <div>
                  <label className="label">Rider Address</label>
                  <input
                    type="text"
                    {...register('address', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="Address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">Address is required.</p>
                  )}
                </div>
              </div>
            </div>

            {/* 🌳 More Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">More Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="label">Driving License</label>
                  <input
                    type="text"
                    {...register('license', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="Receiver Name"
                  />
                  {errors.license && (
                    <p className="text-red-500 text-sm">
                      Receiver name is required.
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">NID</label>
                  <input
                    type="text"
                    {...register('nid', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="NID Number"
                  />
                  {errors.nid && (
                    <p className="text-red-500 text-sm">Email is required.</p>
                  )}
                </div>

                <div>
                  <label className="label">Bike Info</label>
                  <input
                    type="text"
                    {...register('bike', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="bike info"
                  />
                  {errors.bike && (
                    <p className="text-red-500 text-sm">Address is required.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6 mb-3">
            * Pickup Time 4pm–7pm Approx
          </p>

          <button type="submit" className="btn bg-lime-500 text-white px-6">
            apply as a Rider
          </button>
        </form>
      </div>

      {/* RIGHT: image */}
      <div className="flex justify-center items-start">
        <img src={riderImg} className="w-80 md:w-96" alt="Rider" />
      </div>
    </div>
  );
}
