import React, { use } from 'react';
import { IoMdAlert } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import Container from '../Components/ui/Container';
import { useForm } from 'react-hook-form';
import SectionHeader from '../Components/SectionHeader';

const Register = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const photoURL = data.photoURL
        signUpWithEmailPass(email, password)
            .then(result => {
                updateUserProfile({
                    displayName: name, photoURL: photoURL
                })
                setUser(result.user)
                navigate(location?.state || "/")
            })
            .catch(error =>
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                    background: "#091D1C",
                    color: "#fff",
                    buttonsStyling: false,

                })
            )
    }
    const navigate = useNavigate()
    const location = useLocation()
    const { signUpWithEmailPass, setUser, updateUserProfile, signInWithGoogle } = use(AuthContext)
    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                setUser(result.user)
                navigate(location?.state || "/")
            })
            .catch(error => console.warn(error.message))
    }


        // const pattarn = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/
  

    return (
        <>
            <Helmet>
                <title>Register | KindForces</title>
            </Helmet>
            <section className='py-20 bg-indigo-950'>
                <Container>
                    <div className="flex flex-col md:flex-row items-center  rounded-2xl relative">
                        <div className=" w-full   px-6 lg:px-16 xl:px-12
                   flex flex-col items-center justify-center">
                            <SectionHeader title={"Sign Up to |Launch & Discove"} 
                            description={"Get access to submit your own tools, upvote projects you love, and become part of the growing tech community."}
                            type={"dark"}/>
                            <div className="w-full lg:w-8/12 p-5 md:p-8 rounded-2xl bg-indigo-900">
                                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label className="block text-white">Full Name</label>
                                        <input type="text" name="name" placeholder="Enter your name"
                                            {...register("name", { required: true })}
                                            className="w-full px-4 py-4 rounded-lg bg-main-dark text-indigo-300  focus:text-white placeholder:text-indigo-300  focus:placeholder:text-indigo-300 mt-2 border border-indigo-400 focus:outline-none duration-700" required />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-white">Photo URL</label>
                                        <input type="text" name="photoURL" placeholder="Enter photo URL"
                                            {...register("photoURL", { required: true })}
                                            className="w-full px-4 py-4 rounded-lg bg-main-dark text-indigo-300  focus:text-white placeholder:text-indigo-300  focus:placeholder:text-indigo-300 mt-2 border border-indigo-400 focus:outline-none duration-700" required />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-white">Email Address</label>
                                        <input type="email" name="email" placeholder="Enter Email Address"
                                            {...register("email", { required: true })}
                                            className="w-full px-4 py-4 rounded-lg bg-main-dark text-indigo-300  focus:text-white placeholder:text-indigo-300  focus:placeholder:text-indigo-300 mt-2 border border-indigo-400 focus:outline-none duration-700" required />
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-white">Password</label>
                                        <input type="password"
                                            {...register("password", { pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/, required: true })}
                                            aria-invalid={errors.password ? "true" : "false"}

                                            name="password"
                                            placeholder="Enter Password"
                                            className="w-full px-4 py-4 rounded-lg bg-main-dark text-indigo-300  focus:text-white placeholder:text-indigo-300  focus:placeholder:text-indigo-300 mt-2 border border-indigo-400 focus:outline-none duration-700" required />
                                        {errors.password?.type === "pattern" && (
                                            <p role="alert" className="text-red-500 text-sm mt-2">
                                                Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters long
                                            </p>
                                        )}
                                    </div>
                                    <button type="submit" className="w-full block bg-indigo-400 border border-indigo-950 hover:bg-indigo-950 focus:bg-indigo-950 text-white hover:text-indigo-400 font-semibold rounded-lg duration-700 cursor-pointer
              px-4 py-4 mt-6">Register</button>
                                </form>
                                <hr className="my-6 border-slate-400 w-full" />
                                <button onClick={handleSignInWithGoogle} type="button" className="w-full block bg-indigo-950 hover:bg-indigo-900 focus:bg-indigo-900 text-white font-semibold rounded-lg px-4 py-4   cursor-pointer duration-700">
                                    <div className="flex items-center justify-center ">
                                        <FcGoogle size={25} />
                                        <span className="ml-4">
                                            Log in
                                            with
                                            Google</span>
                                    </div>
                                </button>
                                <p className="mt-8 text-white">Already have account? <Link to={"/login"} className="text-indigo-300 hover:underline font-semibold">Login now</Link></p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Register;