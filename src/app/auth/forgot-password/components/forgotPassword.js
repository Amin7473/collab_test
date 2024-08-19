"use client";
import Image from "next/image";
import Link from "next/link";
import MainLogo from '@/../public/assets/images/logo2.png'
import eyeClose from '@/../public/assets/icons/eyeClose.svg'
import eyeOpen from '@/../public/assets/icons/eyeOpen.svg'
import { useState } from "react";

export default function MainLoginPage() {
    
    return (
    <div className="">
        <div className="flex justify-center mt-[100px]">
            <div className="flex flex-col justify-between gap-8">
            
                <div className="flex justify-center">
                    <a href="admin-dashboard.html">
                        <Image
                            src={MainLogo}
                            alt='Dream Tech'
                        />
                    </a>
                </div>
                
                <div className="containers w-[490px] h-[350px]">
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col items-center">
                            <h3 className="text-[24px] font-[600]">Forgot Password?</h3>
                            <p className="text-[16px] text-[#aeafb0] font-medium">Enter your email to get a password reset link</p>
                        </div>
                        
                        <form action="admin-dashboard.html">
                            <div className="mb-5 flex flex-col gap-2">
                                <div><label className="label_text">Email Address</label></div>
                                <div>
                                    <input className="input_area" value="aminudeen@aptagrim.com" type="email"/>
                                </div>
                            </div>
                            <div className="mb-5">
                                <button className="flex justify-center primary-btn text-white" type="submit">Reset Password</button>
                            </div>
                            <div className="flex justify-center">
                                <p className="font-[500]">Remember your password? &nbsp;
                                <Link href="/auth/login" >
                                Login
                                </Link></p>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
