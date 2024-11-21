"use client"
import { useState, ChangeEvent } from "react";
import axios from "@/lib/axios";

// Define types for form data and error states
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Errors {
  name: boolean;
  email: boolean;
  message: boolean;
}

const PageFile = () => {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    message: false,
  });


  const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const validateField = (name: string, value: string): boolean => {
    if(value.length > 5){
    if (name === "name") return value.trim() !== "";
    if (name === "email") return emailRegex.test(value);
    if (name === "message") return  value.trim() !== "";
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the current field and update errors
    setErrors((prev) => ({
      ...prev,
      [name]: !validateField(name, value),
    }));
    
  };

  const validateInputs = (): boolean => {
    const newErrors: Errors = {
      name: formData.name === "",
      email: !emailRegex.test(formData.email),
      message: formData.message === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateInputs()) return;

    try {
      await axios.post(
        "auth/login",
        { email: formData.email },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
 
  return (
    <div className="w-full bg-[#FFFFFF] py-[50px] tablet:py-[80px] laptop:py-[100px]">
      <div className="relative px-4 tablet:px-6 laptop:px-8 desktop:px-0 max-w-[1152px] mx-auto text-left mb-8">
      <div className="w-[90%] max-w-[660px] mx-auto flex flex-col gap-12 p-6 bg-white ">

          <div className="w-full">
            <p className="text-center text-20 font-bold tablet:text-32 laptop:text-48">How can we help?</p>
            <p className="text-16 tablet:text-24 text-center text-grey-600">
            Get in touch with our support teams for demos, onboarding support, or listing questions.
            </p>
          </div>
<div className="w-full max-w-[460px] mx-auto flex flex-col gap-6">
          {["name", "email"].map((field) => (
            <div className="text-left flex flex-col" key={field}>
              <label
                htmlFor={field}
                className="text-14 text-grey-900 font-medium mb-2"
              >
                {field === "name" ? "Full Name" :  "Email address"}
              </label>
              <input
                type="text"
                name={field}
                placeholder={
                  field === "name"
                    ? "Enter your name"
                    : field === "email"
                    ? "Enter your email address"
                    : "Enter product URL"
                }
                className={`bg-white rounded-lg border text-grey-900 outline-none h-11 px-3 py-2 shadow-shareLinks ${
                  errors[field as keyof Errors] ? "border-[#E03C00]" : "border-grey-50"
                }`}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                aria-invalid={errors[field as keyof Errors]}
              />
              {errors[field as keyof Errors] && (
                <p className="mt-[-8px] text-[#E03C00] text-[10px]">
                  {field === "name"
                    ? "Please enter your name"
                    : field === "email"
                    ? "Invalid email address"
                    : "Invalid URL"}
                </p>
              )}
            </div>
          ))}
 <div className="text-left flex flex-col">
              <label
                htmlFor="message"
                className="text-14 text-grey-900 font-medium mb-2"
              >
                Message
              </label>
              <textarea
              name="message"
              placeholder="I am interested in Landingvault for my website. can you help me with..."
              value={formData.message}
              onChange={handleChange}
              className={`bg-white text-14 rounded-lg border text-grey-900 outline-none h-24 px-3 py-2 shadow-shareLinks ${
                errors.message ? "border-[#E03C00]" : "border-grey-50"
              }`}
              aria-invalid={errors.message}
            />
            {errors.message && (
              <p className="mt-[-8px] text-[#E03C00] text-[10px]">
                Please enter a message
              </p>
            )}
            </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-200 rounded-lg cursor-pointer border-blue-400 hover:bg-blue-100 hover:border-blue-100 shadow-shareLinks inline-flex items-center justify-center py-3 px-6 text-white text-sm leading-5 font-medium focus:outline-none"
            aria-label="Submit your website"
          >
           Send Message
          </button>
        </div>
        </div>
      </div>
    
    </div>
  );
};

export default PageFile;
