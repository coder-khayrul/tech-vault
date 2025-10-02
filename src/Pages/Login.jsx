import React, { use, useState } from 'react';
import { motion } from "motion/react"
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { useForm } from "react-hook-form"

const Login = () => {

  const { loginWithEmailPass, signInWithGoogle, setUser } = use(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    loginWithEmailPass(email, password)
      .then(result => {
        setUser(result.user)
        navigate(location?.state || "/")
      })
      .catch(error => setError(error.message))
  }


 const handleSignInWithGoogle = () => {
  setError("");
  signInWithGoogle()
    .then(result => {
      setUser(result.user);
      navigate(location?.state || "/");
    })
    .catch(error => setError(error.message));
};


  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Sign Up Form with Glassmorphism */}
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md z-10 border border-white/20">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">Wellcome Back</h2>
        <p className="text-center text-gray-500 mb-6">Join the community today!</p>
        <button className="w-full bg-gray-100/50 backdrop-blur-sm text-gray-700 p-3 rounded-lg flex items-center justify-center mb-4 hover:bg-gray-200/50 transition" onClick={handleSignInWithGoogle}>
          <span className="mr-2">
            <FcGoogle size={23} />
          </span> Use Google account
        </button>
        <div className="text-center text-gray-400 my-4">or</div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="pozingis.laimonas@gmail.com"
              {...register("email", { required: true })}
              className="w-full mt-1 p-3 border border-gray-300/50 bg-white/20 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="********"
              {...register("password")}
              className="w-full mt-1 p-3 border border-gray-300/50 bg-white/20 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <span className='text-red-500 inline-block mb-3'>{error}</span>
          <button
            type="submit"
            className="w-full bg-indigo-600/80 text-white p-3 rounded-lg hover:bg-indigo-700/80 transition backdrop-blur-sm"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Havn't any account? <Link to={"/register"} className="text-indigo-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;