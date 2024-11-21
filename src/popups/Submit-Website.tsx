import { useState, ChangeEvent } from "react";
import axios from "@/lib/axios";
import { store } from "@/store";
import Image from "next/image";

interface FormData {
  name: string;
  url: string;
  about: string;
}

interface Errors {
  name: boolean;
  url: boolean;
  about: boolean;
}

const SubmitWebsite = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    url: "",
    about: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: false,
    url: false,
    about: false,
  });
  const { setSubmitWebsite, submitWebsite } = store();


  const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[\w\-]*)*$/i;


  const validateField = (name: string, value: string): boolean => {
    if(value.length > 5){
    if (name === "name") return value.trim() !== "";
    if (name === "url") return urlPattern.test(value);
    if (name === "about") return  value.trim() !== "";
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
      url: !urlPattern.test(formData.url),
      about: formData.about === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateInputs()) return;

    try {
      await axios.post(
        "auth/login",
        { email: formData.url },
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
    url: "",
    about: "",
    });
  
    setErrors({
      name: false,
      url: false,
      about: false,
    });
  
    setSubmitWebsite(false);
  };

  return (
    submitWebsite && (
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
            <p className="text-left text-20 font-bold tablet:text-32">Submit your website</p>
          </div>
<div className="w-full max-w-[460px] mx-auto flex flex-col gap-6">
          {["name", "url"].map((field) => (
            <div className="text-left flex flex-col" key={field}>
              <label
                htmlFor={field}
                className="text-14 text-grey-900 font-medium mb-2"
              >
                {field === "name" ? "Website Name" :  "Website URL"}
              </label>
              <input
                type="text"
                name={field}
                placeholder={
                  field === "name"
                    ? "Enter your website name"
                    : "https://www.landingvault.com/"
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
                    ? "Please enter website name"
                    :"Invalid website URL"}
                </p>
              )}
            </div>
          ))}
 <div className="text-left flex flex-col">
              <label
                htmlFor="about"
                className="text-14 text-grey-900 font-medium mb-2"
              >
                About Website
              </label>
              <textarea
              name="about"
              placeholder="Tell us about your website"
              value={formData.about}
              onChange={handleChange}
              className={`bg-white text-14 mb-4 rounded-lg border text-grey-900 outline-none h-24 px-3 py-2 shadow-shareLinks ${
                errors.about ? "border-[#E03C00]" : "border-grey-50"
              }`}
              aria-invalid={errors.about}
            />
            {errors.about && (
              <p className="mt-[-8px] text-[#E03C00] text-[10px]">
                Please Tell us about your website
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
    )
  );
};

export default SubmitWebsite;
