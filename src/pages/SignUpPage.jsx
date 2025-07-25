import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { EyeOff, Eye, Mail, MessageSquare, Lock, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

function SignUpPage() {

    const [showPasword, setPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const { signup, isSignedUp } = useAuthStore();

    const validationForm = () => {
        if (!formData.fullname.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validationForm();

        if (success === true) signup(formData);
    }


    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12  rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold  mt-2'>Create Your Account</h1>
                            <p className='text-base-content/60'>Get Started With Your Free Account</p>

                        </div>
                    </div>


                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-full">
                                <User className="size-5 text-base-content/40 ml-1" />
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Name"
                                    value={formData.fullname}
                                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                />
                            </label>

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="input input-bordered flex items-center gap-2 w-full">
                                <Mail className="size-5 text-base-content/40" />

                                <input
                                    type="email"
                                    className="grow"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>

                            <div className="input input-bordered flex items-center gap-2 w-full">
                                <Lock className="size-5 text-red-400" />

                                <input
                                    type={showPasword ? "text" : "password"}
                                    className="grow"
                                    placeholder="*********"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                <button
                                    type='button'
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                    onClick={() => setPassword(!showPasword)}
                                >
                                    {showPasword ?
                                        (<EyeOff className='size-5 text-base-content/40' />) :
                                        (<Eye className='size-5 text-base-content/40' />)

                                    }

                                </button>
                            </div>
                        </div>

                        <button type="submit" className='btn btn-primary w-full' disabled={isSignedUp}>
                            {isSignedUp ?
                                (<>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading..
                                </>) :
                                ("Create Account")
                            }
                        </button>

                    </form>

                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already have an Account?{""}
                            <Link to="/login" className='link link-primary'>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
            <AuthImagePattern
                title="Kartik"
                subtitle="do"
            />

        </div>
    )
}

export default SignUpPage
