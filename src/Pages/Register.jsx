import React, { use } from 'react';
import { IoMdAlert } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import Container from '../Components/ui/Container';
import { useForm } from 'react-hook-form';

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

    const handleSignUpForm = (e) => {
        e.preventDefault();
        // const form = e.target;
        // const formData = new FormData(form);
        // const userData = Object.fromEntries(formData.entries());
        // const email = userData.email;
        // const password = userData.password
        // const name = userData.name;
        // const photoURL = userData.photoURL;

        const pattarn = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/
        if (pattarn.test(password)) {
            // signUpWithEmailPass(email, password)
            //     .then(result => {
            //         updateUserProfile({
            //             displayName: name, photoURL: photoURL
            //         })
            //         setUser(result.user)
            //         navigate(location?.state || "/")
            //     })
            //     .catch(error =>
            //         Swal.fire({
            //             icon: "error",
            //             title: "Oops...",
            //             text: `${error.message}`,
            //             background: "#091D1C",
            //             color: "#fff",
            //             buttonsStyling: false,

            //         })
            //     )
        } else {
            console.warn("Need Valid Password")
        }

    }

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
                            <div className='flex items-center justify-center flex-col gap-3  pb-15  '>
                                <h1 className="text-[30px] md:text-[45px] font-bold leading-tight mb-3 text-center text-white">Together, We Make a Difference! <span className='text-indigo-400'>Join Now</span></h1>
                                <p className='text-[16px] font-normal text-indigo-200   flex items-center gap-2'>
                                    <IoMdAlert className=' text-rev' size={25} />
                                    Enter the information you entered whlie registering</p>
                            </div>
                            <div className="w-full lg:w-8/12 p-5 md:p-8 rounded-2xl bg-indigo-400">
                                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label className="block text-third">Full Name</label>
                                        <input type="text" name="name" placeholder="Enter your name"
                                            {...register("name", { required: true })}
                                            className="w-full px-4 py-4 rounded-lg bg-main-dark text-txt2 focus:text-white placeholder:text-txt2  focus:placeholder:text-white mt-2 border border-main focus:bg-main focus:outline-none duration-700" required />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-third">Photo URL</label>
                                        <input type="text" name="photoURL" placeholder="Enter photo URL"
                                            {...register("photoURL", { required: true })}
                                            className="w-full px-4 py-4 rounded-lg bg-main-dark text-txt2 focus:text-white placeholder:text-txt2  focus:placeholder:text-white mt-2 border border-main focus:bg-main focus:outline-none duration-700" required />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-third">Email Address</label>
                                        <input type="email" name="email" placeholder="Enter Email Address"
                                            {...register("email", { required: true })}
                                            className="w-full px-4 py-4 rounded-lg bg-main-dark text-txt2 focus:text-white placeholder:text-txt2  focus:placeholder:text-white mt-2 border border-main focus:bg-main focus:outline-none duration-700" required />
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-third">Password</label>
                                        <input type="password"
                                            {...register("password", { pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/, required: true })}
                                            aria-invalid={errors.password ? "true" : "false"}

                                            name="password"
                                            placeholder="Enter Password"
                                            className="w-full px-4 py-4 rounded-lg bg-main-dark text-txt2 focus:text-white placeholder:text-txt2  focus:placeholder:text-white mt-2 border border-main focus:bg-main focus:outline-none duration-700" required />
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
                                <p className="mt-8 text-txt2">Already have account? <Link to={"/login"} className="text-two hover:underline font-semibold">Login now</Link></p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Register;