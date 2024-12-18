import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type {  SignupType } from "@arkoroy/common-authenticate/dist";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SignupAuth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  const [passwordType , setPasswordType] = useState('password');

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      console.log(jwt);
      localStorage.setItem("jwt", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up, please check the inputs");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#C7B8EA] to-[#8B6EA9]">
      <div className="relative bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-[rgba(255,255,255,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-3xl p-8 w-full max-w-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#6E4A8B] drop-shadow-lg">
            {type === "signup" ? "Sign Up" : "Sign In"}
          </h1>
          <p className="mt-2 text-gray-200">
            {type === "signup" ? "Already have an account? " : "Don't have an account? "}
            <Link
              to={type === "signup" ? "/signin" : "/signup"}
              className="text-[#A78EA9] hover:text-[#8B6EA9] font-semibold transition-colors duration-300"
            >
              {type === "signup" ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>

        {/* Input Section */}
        <div className="mt-6">
        {type === "signup" &&
          <LabelledInput
            label="User Name"
            placeholder="Enter your name"
            onChange={(e) =>
              setPostInputs((c: SignupType) => ({ ...c, name: e.target.value }))
            }
          />
        }
          <LabelledInput
            label="Email"
            placeholder="Enter your email"
            type="email"
            onChange={(e) =>
              setPostInputs((c: SignupType) => ({ ...c, email: e.target.value }))
            }
          />
          <LabelledInput
            label="Password"
            placeholder="Enter your password"
            type={passwordType}
            onChange={(e) =>
              setPostInputs((c: SignupType) => ({ ...c, password: e.target.value }))
            }
          suffix={
            <i
              className={`fas ${passwordType === 'password' ? 'fa-eye-slash' : 'fa-eye'} text-[var(--text-color)]`}
              onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')}
            />
          }
          />

          {/* Submit Button */}
          <button type="submit"
            onClick={sendRequest}
            className="w-full mt-6 bg-[#A78EA9] text-white font-semibold py-3 rounded-full shadow-lg hover:bg-[#8B6EA9] hover:shadow-2xl transition-all duration-300"
          >
            {type === "signup" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputTypes {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  suffix?: React.ReactNode;
}

function LabelledInput({ label, placeholder, onChange, type, suffix }: LabelledInputTypes) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full bg-[rgba(255,255,255,0.6)] placeholder:text-[#8B6EA9] text-gray-700 text-sm border border-transparent focus:border-[#A78EA9] rounded-lg px-4 py-2 transition duration-300 shadow-md focus:shadow-lg focus:outline-none"
          placeholder={placeholder}
          type={type || "text"}
          onChange={onChange}
        />
        {suffix && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}
