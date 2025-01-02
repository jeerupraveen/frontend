'use client';
import ForgotPassword from "@/pages/authentication/forgetpassword/ForgetPassword";
import OTPValidation from "@/pages/authentication/forgetpassword/OTPvalidation";
import ResetPassword from "@/pages/authentication/forgetpassword/ResetPassword";
import SignIn from "@/pages/authentication/signin/Signin";
import SignUp from "@/pages/authentication/signup/Signup";
import Link from "next/link";
import * as React from "react";

export default function Home() {
  return (
    <>
    <Link href="/pages/authentication/forgetpassword/">hello</Link>
    </>
  );
}
