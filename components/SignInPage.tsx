import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Sign In Successful!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md flex flex-col gap-4"
      >
        <div className="flex justify-center">
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
        </div>

        <h2 className="text-center text-2xl font-bold">Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />
        <button
          type="submit"
          className="w-full rounded bg-primary p-3 text-white hover:opacity-90 transition"
        >
          Sign In
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
