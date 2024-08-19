"use client";
import Image from "next/image";
import Link from "next/link";
import MainLogo from '@/../public/assets/images/logo2.png'
import eyeClose from '@/../public/assets/icons/eyeClose.svg'
import eyeOpen from '@/../public/assets/icons/eyeOpen.svg'
import { useState } from "react";

export default function MainLoginPage() {
    
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
                        
                        <form action="">
                            <div className="mb-3 flex flex-col gap-2">
                                <div><label className="label_text">Email Address</label></div>
                                <div>
                                    <input className="input_area" type="email" value="aminudeen@aptagrim.com"/>
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
                                <div>
                                    <input className="input_area" type={showPassword ? "text" : "password"} value="Abcd.1234" id="password"/>
                                    <button className="absolute right-[36rem] top-[29rem]" type="button" onClick={()=>{setShowPassword(!showPassword)}}>
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
                            </div>
                            <div className="mb-3">
                                <Link href={"/admin/dashboard"}>
                                    <button className="flex justify-center primary-btn text-white" type="submit">Login</button>
                                </Link>
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
