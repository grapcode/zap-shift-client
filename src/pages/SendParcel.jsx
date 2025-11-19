import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // custom hook for http://localhost:3000/

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log('SendParcel submit:', data);
    // এখানে API কল বা পরবর্তী স্টেপ করো
    const isDocument = data.parcelType === 'document';
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log('cost', cost);

    Swal.fire({
      title: 'Agree with the Cost?',
      text: `You will be charged ${cost}tk`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'I agree!',
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database
        axiosSecure.post('/parcels', data).then((res) => {
          console.log('after saving parcel', res.data);
        });
        // Swal.fire({
        //   title: 'Deleted!',
        //   text: 'Your file has been deleted.',
        //   icon: 'success',
        // });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-1">Send A Parcel</h2>
      <p className="text-gray-600 mb-6">Enter your parcel details</p>

      {/* Document / Not-Document */}
      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="radio radio-primary"
            value="document"
            {...register('parcelType', { required: true })}
            defaultChecked
          />
          <span>Document</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="radio radio-primary"
            value="non-document"
            {...register('parcelType', { required: true })}
          />
          <span>Not-Document</span>
        </label>

        {errors.parcelType && (
          <p className="text-red-500 text-sm">Please select document type.</p>
        )}
      </div>

      <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Parcel Name */}
          <div>
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register('parcelName', { required: true })}
              className="input input-bordered w-full"
              placeholder="Parcel Name"
            />
            {errors.parcelName && (
              <p className="text-red-500 text-sm">Parcel name is required.</p>
            )}
          </div>

          {/* Parcel Weight */}
          <div>
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              step="0.01"
              {...register('parcelWeight', { required: true, min: 0.01 })}
              className="input input-bordered w-full"
              placeholder="Parcel Weight (KG)"
            />
            {errors.parcelWeight?.type === 'required' && (
              <p className="text-red-500 text-sm">Parcel weight is required.</p>
            )}
            {errors.parcelWeight?.type === 'min' && (
              <p className="text-red-500 text-sm">Enter a valid weight.</p>
            )}
          </div>
        </div>

        {/* ❌ Sender & Receiver */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Sender */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sender Details</h3>

            <div className="space-y-4">
              <div>
                <label className="label">Sender Name</label>
                <input
                  type="text"
                  {...register('senderName', { required: true })}
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full"
                  placeholder="Sender Name"
                />
                {errors.senderName && (
                  <p className="text-red-500 text-sm">
                    Sender name is required.
                  </p>
                )}
              </div>

              <div>
                <label className="label">Sender Phone No</label>
                <input
                  type="tel"
                  {...register('senderPhone', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Sender Phone No"
                />
                {errors.senderPhone && (
                  <p className="text-red-500 text-sm">
                    Phone number is required.
                  </p>
                )}
              </div>

              <div>
                <label className="label">Sender Email</label>
                <input
                  type="tel"
                  {...register('senderEmail', { required: true })}
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                  placeholder="Sender Email"
                />
                {errors.senderEmail && (
                  <p className="text-red-500 text-sm">Email is required.</p>
                )}
              </div>

              {/* 💥 Sender Regions */}
              <div>
                <label className="label">Sender Regions</label>
                <select
                  {...register('senderRegion', { required: true })}
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
                {errors.senderRegion && (
                  <p className="text-red-500 text-sm">Select a district.</p>
                )}
              </div>

              {/* 💥Sender District */}
              <div>
                <label className="label">Sender District</label>
                <select
                  {...register('senderDistrict', { required: true })}
                  defaultValue="Pick a District"
                  className="select select-bordered w-full"
                >
                  <option value="">Pick a District</option>
                  {districtsByRegion(senderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <p className="text-red-500 text-sm">Select a district.</p>
                )}
              </div>

              <div>
                <label className="label">Sender Address</label>
                <input
                  type="text"
                  {...register('senderAddress', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Address"
                />
                {errors.senderAddress && (
                  <p className="text-red-500 text-sm">Address is required.</p>
                )}
              </div>

              <div>
                <label className="label">Pickup Instruction</label>
                <textarea
                  {...register('pickupInstruction')}
                  className="textarea textarea-bordered w-full"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>
          </div>

          {/* 🌳 Receiver */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Receiver Details</h3>

            <div className="space-y-4">
              <div>
                <label className="label">Receiver Name</label>
                <input
                  type="text"
                  {...register('receiverName', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Name"
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm">
                    Receiver name is required.
                  </p>
                )}
              </div>

              <div>
                <label className="label">Receiver Contact No</label>
                <input
                  type="tel"
                  {...register('receiverContact', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Contact No"
                />
                {errors.receiverContact && (
                  <p className="text-red-500 text-sm">
                    Contact number is required.
                  </p>
                )}
              </div>

              <div>
                <label className="label">Receiver Email</label>
                <input
                  type="tel"
                  {...register('receiverEmail', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Email"
                />
                {errors.receiverEmail && (
                  <p className="text-red-500 text-sm">Email is required.</p>
                )}
              </div>

              {/* 💥 Receiver Regions */}
              <div>
                <label className="label">Receiver Regions</label>
                <select
                  {...register('receiverRegion', { required: true })}
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
                {errors.receiverRegion && (
                  <p className="text-red-500 text-sm">Select a district.</p>
                )}
              </div>

              {/* 💥Receiver District */}
              <div>
                <label className="label">Receiver District</label>
                <select
                  {...register('receiverDistrict', { required: true })}
                  defaultValue="Pick a District"
                  className="select select-bordered w-full"
                >
                  <option value="">Pick a District</option>
                  {districtsByRegion(receiverRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <p className="text-red-500 text-sm">Select a district.</p>
                )}
              </div>

              <div>
                <label className="label">Receiver Address</label>
                <input
                  type="text"
                  {...register('receiverAddress', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Address"
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 text-sm">Address is required.</p>
                )}
              </div>

              <div>
                <label className="label">Delivery Instruction</label>
                <textarea
                  {...register('deliveryInstruction')}
                  className="textarea textarea-bordered w-full"
                  placeholder="Delivery Instruction"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6 mb-3">
          * Pickup Time 4pm–7pm Approx
        </p>

        <button type="submit" className="btn bg-lime-500 text-white px-6">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
