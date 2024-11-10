import React from 'react';
import LoginForm from "@/app/_components/LoginForm";
import Link from "next/link";

const LoginPage =()=> {
  return (
      <div className="h-full w-full flex items-center justify-center bg-darkGray">
          <div className="bg-darkGray p-8 rounded border-2 border-yellow shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
              <LoginForm/>
              <p className="mt-6">Don&apos;t have account <Link  className="font-bold text-yellow hover:text-amber-500" href="/register">Register</Link></p>
          </div>
      </div>
  );
}
export default LoginPage;