import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInGoogle, user, setUser, setLoading } = useAuth();

  const axiosSecure = useAxiosSecure();

  // 🔰 After successful signin, navigate to card id
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // ⚡ show password
  const [show, setShow] = useState(false);

  // 🎯  Forgot password
  const emailRef = useRef(null);

  // ♻️ ইউজার লগইন থাকলে তাকে আবার লগইন পেজে ঢুকতে দেবে না
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true }); // তাকে আগের পেজে (from) redirect করে দিবে
    }
  }, [user, navigate, from]);

  // ⚡ handle signin/login from
  const handleLogin = (data) => {
    console.log('form data', data);
    signInUser(data.email, data.password)
      .then((res) => {
        setLoading(false);
        toast.success('Sign up was successful.');
        setUser(res.user);
        navigate('/');
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 🎯 handle Forgot password
  const handleForgotPassword = () => {};

  //   💥 google signin

  const handleGoogleSignin = () => {
    signInGoogle()
      .then((res) => {
        setLoading(false);
        toast.success('google signin successful');
        setUser(res.user);
        navigate('/');

        // create user in the database
        const userInfo = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        };

        axiosSecure.post('/users', userInfo).then((res) => {
          console.log('user data has been stored', res.data);
          navigate('/');
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen ">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-3xl text-center pt-6 font-bold ">Welcome Back</h1>
          <p className="text-center">Please Login</p>
          {/* ⚡ form */}

          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                // 🎯 Forgot password email value: system-2
                ref={emailRef}
                className="input"
                {...register('email', { required: true })}
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
                  name="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    // pattern:
                    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  })}
                  className="input"
                  placeholder="Password"
                />
                {/* error validation */}
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
              {/* 🎯 Forgot password */}
              <div>
                <span
                  to="/forgot-password"
                  onClick={handleForgotPassword}
                  className="link link-hover"
                >
                  Forgot password?
                </span>
              </div>
              {/* login btn */}
              <button className="btn btn-primary border-0 text-white mt-4">
                Login
              </button>

              {/* or */}
              <div className="divider">or</div>

              {/* 💥 Google btn */}
              <button
                type="button"
                onClick={handleGoogleSignin}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <FcGoogle />
                Login with Google
              </button>
              <p className="text-sm text-black/60">
                Don't have account?{' '}
                <Link
                  to="/register"
                  className="text-secondary hover:text-primary font-medium underline "
                >
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
