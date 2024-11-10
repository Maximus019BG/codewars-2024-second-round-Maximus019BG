import React from 'react';
import RegisterForm from "@/app/_components/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {



    return (
        <div className="h-full w-full flex items-center justify-center bg-darkGray">
            <div className="bg-darkGray p-8 rounded border-2 border-yellow shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Register</h2>
                <RegisterForm/>
                <p className="mt-6">Have account <Link className="font-bold text-yellow hover:text-amber-500" href="/log-in">Log-in</Link></p>
            </div>
        </div>
    );
}
export default RegisterPage;