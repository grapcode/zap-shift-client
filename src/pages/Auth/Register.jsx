import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, setUser, updateUserProfile } = useAuth();

  // 🔰 After successful signup, navigate to login page
  const navigate = useNavigate();

  // ⚡ show password
  const [show, setShow] = useState(false);

  // ⚡ handle signup btn
  const handleRegistration = (data) => {
    // console.log('after register', data, data.photo[0]);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        toast.success('Account created successfully!', user);
        setUser(null);
        navigate('/login');

        // 1. store the image in form data
        const formData = new FormData();
        formData.append('image', profileImg);

        // 2. send the photo to store and get the  url
        const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(imageAPI_URL, formData).then((res) => {
          console.log('after image upload', res.data.data.url);

          // 3. update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          // 4. updateUserProfile to firebase
          updateUserProfile(userProfile)
            .then(() => {
              console.log('user profile updated done');
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="hero  min-h-screen ">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-3xl text-center pt-6 font-bold ">
            Create Your Account
          </h1>
          {/* ⚡ form */}
          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="card-body"
          >
            <fieldset className="fieldset">
              {/*⚡ name */}
              <label className="label">Name</label>
              <input
                type="text"
                // name="name"
                {...register('name', { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name?.type === 'required' && (
                <p className="text-red-500">Name is required.</p>
              )}

              {/* ⚡ photo field */}
              <label className="label">Photo</label>
              <input
                type="file"
                {...register('photo')}
                className="file-input"
                placeholder="Your Photo"
              />
              {errors.photo?.type === 'required' && (
                <p className="text-red-500">Photo is required.</p>
              )}

              {/* ⚡ email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === 'required' && (
                <p className="text-red-500">Email is required.</p>
              )}

              {/* ⚡ password */}
              <div className="space-y-2 relative">
                <label className="label">Password</label>
                <input
                  type={show ? 'text' : 'password'}
                  className="input"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    // pattern:
                    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  })}
                  placeholder="Password"
                />
                {errors.password?.type === 'required' && (
                  <p className="text-red-500">Password is required.</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="text-red-500">
                    Password must be 6 characters or longer
                  </p>
                )}
                {errors.password?.type === 'pattern' && (
                  <p className="text-red-500">
                    Password must be at least 8 characters and include
                    uppercase, lowercase, number, and special character.
                  </p>
                )}
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-8 bottom-5 cursor-pointer z-50"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <button className="btn btn-primary border-0 text-white mt-4">
                Register
              </button>
              <p className="text-sm text-black/60">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-secondary hover:text-primary font-medium underline"
                >
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
