import React from 'react';
import { useForm } from 'react-hook-form';
import riderImg from '../../assets/agent-pending.png'; // তোমার ইমেজ পাথ বসাও

export default function Rider() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Rider submit:', data);
    // API call or further actions
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

        <h3 className="text-xl font-semibold mb-4">Tell us about yourself</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required.</p>
              )}
            </div>

            <div>
              <label className="label">Your age</label>
              <input
                type="number"
                {...register('age', { required: true, min: 16 })}
                className="input input-bordered w-full"
                placeholder="Your age"
              />
              {errors.age?.type === 'required' && (
                <p className="text-red-500 text-sm">Age is required.</p>
              )}
              {errors.age?.type === 'min' && (
                <p className="text-red-500 text-sm">Minimum age is 16.</p>
              )}
            </div>

            <div>
              <label className="label">Your Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required.</p>
              )}
            </div>

            <div>
              <label className="label">Your District</label>
              <select
                {...register('district', { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your District</option>
                <option>Dhaka</option>
                <option>Chattogram</option>
                <option>Comilla</option>
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm">Select a district.</p>
              )}
            </div>

            <div>
              <label className="label">NID No</label>
              <input
                type="text"
                {...register('nid', { required: true })}
                className="input input-bordered w-full"
                placeholder="NID"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm">NID is required.</p>
              )}
            </div>

            <div>
              <label className="label">Contact</label>
              <input
                type="tel"
                {...register('contact', { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">Contact is required.</p>
              )}
            </div>
          </div>

          <div>
            <label className="label">Which wire-house you want to work?</label>
            <select
              {...register('warehouse', { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select wire-house</option>
              <option>Warehouse A</option>
              <option>Warehouse B</option>
            </select>
            {errors.warehouse && (
              <p className="text-red-500 text-sm">Please select a warehouse.</p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-lime-500 text-white mt-4 w-full"
          >
            Submit
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
