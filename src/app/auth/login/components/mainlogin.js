"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import MainLogo from '@/../public/assets/images/logo2.png'
import eyeClose from '@/../public/assets/icons/eyeClose.svg'
import eyeOpen from '@/../public/assets/icons/eyeOpen.svg'
import { useState } from "react";
import { toggleSessionExpired } from "@/common/store/slices/auth";

export default function MainLoginPage() {
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        "email" : "",
        "password" : "",
        "re_login" : true
    });
    const [error, setError] = useState('')
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(payload)
        signIn("user-login", {
            email: payload.email,
            password: payload.password,
            re_login: true,
            redirect: false,
        })
            .then((res) => {
            if (res.error) {
                if (res.error.startsWith("Cannot read properties of undefined")) {
                ErrorToast({ text: "Something went wrong" });
                return;
                }
                const errData = JSON.parse(res.error);
                if (errData?.message.password) {
                setError("Password is incorrect");
                } else if (errData?.message.email) {
                setError("Email is incorrect");
                }
                // if (errData?.message === 'user have active session') {
                //   open active session tab
                // }
                // if (errData?.message !== 'user have active session') {
                //   throw error
                // }
            } else {
                console.log(res)
                
                router.push('/admin/dashboard');
            }
            })
            .catch((err) => {
            if (err?.response?.data) {
                ErrorToast({ text: "Something went wrong" });
            } else {
                return null;
            }
            })
            .finally(() => {
            dispatch(toggleSessionExpired(false));

            });
    }
    const [showPassword, setShowPassword] = useState(false);
    return (
    <div className="">
        <div className="flex justify-center mt-[60px]">
            <div className="flex flex-col justify-between gap-8">
            
                <div className="flex justify-center">
                    <a href="admin-dashboard.html">
                        <Image
                            src={MainLogo}
                            alt='Dream Tech'
                        />
                    </a>
                </div>
                
                <div className="containers w-[490px] h-[450px]">
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col items-center">
                            <h3 className="text-[24px] font-[600]">Login</h3>
                            <p className="text-[16px] text-[#aeafb0] font-medium">Access to our dashboard</p>
                        </div>
                        
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3 flex flex-col gap-2">
                                <div><label className="label_text">Email Address</label></div>
                                <div>
                                    <input
                                    className="input_area"
                                    type="email"
                                    onChange={(e)=>{setPayload({...payload, email : e.target.value})}}/>
                                </div>
                            </div>
                            <div className="mb-9">
                                <div className="flex justify-between">
                                    <div className="mb-3">
                                        <label className="label_text">Password</label>
                                    </div>
                                    <div className="col-auto">
                                    <Link
                                        href="/auth/forgot-password"
                                        className="font-[500]"
                                    >
                                        Forgot password?
                                    </Link>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                    className="input_area"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    onChange={(e)=>{setPayload({...payload, password : e.target.value})}}/>
                                    <button className="absolute transform -translate-y-1/2 right-2 top-1/2" type="button" onClick={()=>{setShowPassword(!showPassword)}}>
                                        {showPassword ? (
                                        <Image
                                        src={eyeOpen}
                                        />)
                                        :
                                        (<Image
                                        src={eyeClose}
                                        />)}
                                    </button>
                                </div>
                            <span className="text-[red]">{error}</span>
                            </div>
                            <div className="mb-3">
                                {/* <Link href={"/admin/dashboard"}> */}
                                    <button className="flex justify-center primary-btn text-white" type="submit" >Login</button>
                                {/* </Link> */}
                            </div>
                            {/* <div className="flex justify-center">
                                <p className="font-[500]">Don't have an account yet? <a href="register.html">Register</a></p>
                            </div> */}
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
