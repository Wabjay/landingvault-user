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

// Enum for form field names
enum FieldName {
  Name = "name",
  Email = "email",
  WebsiteUrl = "websiteUrl",
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

  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);

  const { setPromoteProduct, promoteProduct } = store();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const urlPattern =
    /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[\w\-]*)*$/i;

  const validateField = (name: FieldName, value: string): boolean => {
    if (value.length > 5) {
      if (name === FieldName.Name) return value.trim() !== "";
      if (name === FieldName.Email) return emailRegex.test(value);
      if (name === FieldName.WebsiteUrl) return urlPattern.test(value);
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as { name: FieldName; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleFocus = (field: keyof FormData) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
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
              className="w-fit h-8"
            />
            <Image
              src="/cancel.svg"
              alt="Close"
              width={20}
              height={20}
              className="w-8 h-8 cursor-pointer"
              onClick={close}
            />
          </div>

          <div className="w-full">
            <p className="text-left text-20 text-grey-900 font-bold tablet:text-32 mb-2">
              Promote your product
            </p>
            <p className="text-14 text-grey-600 mb-6">
              Anyone or any organization can promote their products on our page.
              Just fill in the following details.
            </p>
          </div>

          {Object.values(FieldName).map((field) => (
            <div className="text-left flex flex-col" key={field}>
              <label
                htmlFor={field}
                className="text-14 text-grey-900 font-medium mb-2"
              >
                {field === FieldName.Name
                  ? "Name"
                  : field === FieldName.Email
                  ? "Email address"
                  : "Product URL"}
              </label>
              <input
                type="text"
                name={field}
                placeholder={
                  field === FieldName.Name
                    ? "Enter your name"
                    : field === FieldName.Email
                    ? "Enter your email address"
                    : "Enter product URL"
                }
                onFocus={() => handleFocus(field)}
                onBlur={handleBlur}
                className={`bg-white rounded-lg border text-grey-900 outline-none h-11 px-3 py-2 shadow-shareLinks ${
                  errors[field]
                    ? "border-[#E03C00]"
                    : focusedField === field
                    ? "border-blue-400 shadow-buttonFocus bg-white hover:bg-white"
                    : "border-grey-50 hover:bg-grey-10 hover:border-grey-50"
                }`}
                value={formData[field]}
                onChange={handleChange}
                aria-invalid={errors[field]}
              />
              {errors[field] && (
                <p className="mt-[8px] text-[#E03C00] text-[10px]">
                  {field === FieldName.Name
                    ? "Please enter your name"
                    : field === FieldName.Email
                    ? "Invalid email address"
                    : "Invalid URL"}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-blue-400 rounded-lg cursor-pointer border-blue-400 hover:bg-blue-500 hover:border-blue-400 shadow-shareLinks inline-flex items-center justify-center py-3 px-6 text-white text-14 font-medium focus:outline-none"
            aria-label="Submit your website"
          >
            Send Proposal
          </button>
          <p className="text-center text-14 text-grey-600">
            Once the proposal is sent, we will contact you <br />
            automatically.
          </p>
        </div>
      </div>
    )
  );
};

export default PromoteProduct;
