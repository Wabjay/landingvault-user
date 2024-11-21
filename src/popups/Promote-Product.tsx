import { useState, ChangeEvent } from "react";
import axios from "@/lib/axios";
import { store } from "@/store";
import Image from "next/image";

// Define types for form data and error states
interface FormData {
  name: string;
  email: string;
  websiteUrl: string;
}

interface Errors {
  name: boolean;
  email: boolean;
  websiteUrl: boolean;
}

const PromoteProduct = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    websiteUrl: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    websiteUrl: false,
  });

  const { setPromoteProduct, promoteProduct } = store();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[\w\-]*)*$/i;


  const validateField = (name: string, value: string): boolean => {
    if(value.length > 5){
    if (name === "name") return value.trim() !== "";
    if (name === "email") return emailRegex.test(value);
    if (name === "websiteUrl") return urlPattern.test(value);
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
      websiteUrl: !urlPattern.test(formData.websiteUrl),
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

  const close = () => {
    // Reset form data and errors
    setFormData({
      name: "",
      email: "",
      websiteUrl: "",
    });
  
    setErrors({
      name: false,
      email: false,
      websiteUrl: false,
    });
  
    setPromoteProduct(false);
  };
  return (
    promoteProduct && (
      <div className="w-[100vw] h-[100vh] flex items-baseline justify-center bg-overlay fixed top-0 left-0 z-20">
        <div className="w-[90%] max-w-[480px] mt-[5%] flex flex-col gap-6 p-6 rounded-[12px] bg-white border-[rgb(232,232,234)] border">
          <div className="flex justify-between w-full">
            <Image
              src="/Fav-Logo.png"
              alt="Logo"
              width={27}
              height={32}
              className="p-[6px] w-fit h-8"
            />
            <Image
              src="/cancel.svg"
              alt="Close"
              width={20}
              height={20}
              className="p-[6px] w-8 h-8"
              onClick={close}
            />
          </div>

          <div className="w-full">
            <p className="text-left text-20 font-bold tablet:text-32">Promote your product</p>
            <p className="text-14 text-grey-600">
              Anyone or any organization can promote their products on our page. Just fill in the following details.
            </p>
          </div>

          {["name", "email", "websiteUrl"].map((field) => (
            <div className="text-left flex flex-col" key={field}>
              <label
                htmlFor={field}
                className="text-14 text-grey-900 font-medium mb-2"
              >
                {field === "name" ? "Name" : field === "email" ? "Email address" : "Product URL"}
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
                <p className="mt-[8px] text-[#E03C00] text-[10px]">
                  {field === "name"
                    ? "Please enter your name"
                    : field === "email"
                    ? "Invalid email address"
                    : "Invalid URL"}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-blue-200 rounded-lg cursor-pointer border-blue-400 hover:bg-blue-100 hover:border-blue-100 shadow-shareLinks inline-flex items-center justify-center py-3 px-6 text-white text-sm leading-5 font-medium focus:outline-none"
            aria-label="Submit your website"
          >
           Send Proposal
          </button>
          <p className="text-center text-14 text-grey-600">
          Once the proposal is sent, we will contact you <br/> 
          automatically.
            </p>
        </div>
      </div>
    )
  );
};

export default PromoteProduct;
