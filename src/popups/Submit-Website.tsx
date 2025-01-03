import { useState, ChangeEvent } from "react";
import axios from "axios";
import { store } from "@/store";
import Image from "next/image";
import Confirm, { Note } from "./Confirm";

// Define types for form data and error states
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

// Enum for field names
enum FieldName {
  Name = "name",
  Url = "url",
  About = "about",
}

const SubmitWebsite = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    url: "",
    about: "",
  });
  const [confirm, setConfirm] = useState<boolean>(false);

  const [errors, setErrors] = useState<Errors>({
    name: false,
    url: false,
    about: false,
  });

  const [typingState, setTypingState] = useState<{ [key in FieldName]: boolean }>({
    name: false,
    url: false,
    about: false,
  });
  const [notification, setNotification] = useState<Note>({status:"", message:""});

  const { setSubmitWebsite, submitWebsite } = store();

  const urlPattern =
    /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[\w\-]*)*$/i;

  const validateField = (name: FieldName, value: string): boolean => {
    if (value.length > 5) {
      if (name === FieldName.Name) return value.trim() !== "";
      if (name === FieldName.Url) return urlPattern.test(value);
      if (name === FieldName.About) return value.trim() !== "";
    }
    return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target as { name: FieldName; value: string };
    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the current field and update errors
    setErrors((prev) => ({
      ...prev,
      [name]: !validateField(name, value),
    }));
  };

  const handleFocus = (field: FieldName) => {
    setTypingState((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field: FieldName) => {
    setTypingState((prev) => ({
      ...prev,
      [field]: false,
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

  const showNotification =(status:string,message:string )=>{
    setNotification({status: status, message: message})
    setConfirm(true);
    setTimeout(() => setConfirm(false), 3000);
  }

  const handleSubmit = async (): Promise<void> => {
    if (!validateInputs()) return;

    const payload = {
      name: formData.name,
      url: formData.url,
      about: formData.about
    }
    
    try {
      await axios.post(
        "/api/submit",payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setSubmitWebsite(false);
      showNotification("success", 'Your website has been submitted successfully')
      setFormData(
        { 
          name: "",
          url: "",
          about: "",}
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      showNotification("error", 'There was an error submitting your website')
    }
  };

  const close = () => {
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
    <>
    {submitWebsite && (
      <div className="w-[100vw] h-[100vh] flex items-baseline justify-center bg-overlay fixed top-0 left-0 z-20">
        <div className="w-[90%] max-w-[480px] mt-[5%] flex flex-col gap-6 p-6 rounded-[12px] bg-white border-[rgb(232,232,234)] border">
          <div className="flex justify-between w-full mb-4">
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
            <p className="text-left text-20 text-grey-900 font-bold tablet:text-32">
              Submit your website
            </p>
          </div>
          <div className="w-full max-w-[460px] mx-auto flex flex-col gap-6">
            {Object.values(FieldName).map((field) => (
              <div className="text-left flex flex-col" key={field}>
                <label
                  htmlFor={field}
                  className="text-14 text-grey-900 font-medium mb-2"
                >
                  {field === FieldName.Name
                    ? "Website Name"
                    : field === FieldName.Url
                    ? "Website URL"
                    : "About Website"}
                </label>
                {field === FieldName.About ? (
                  <textarea
                    name={field}
                    placeholder="Tell us about your website"
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(field)}
                    onBlur={() => handleBlur(field)}
                    className={`bg-white text-14 rounded-lg border text-grey-900 outline-none h-24 px-3 py-2 shadow-shareLinks ${
                      errors[field as keyof Errors]
                      ? "border-[#E03C00]" :  typingState[field as keyof typeof typingState] 
                      ? "border-blue-400 shadow-buttonFocus bg-white hover:bg-white"
                      : "border-grey-50 hover:bg-grey-10 hover:border-grey-50"
                    }`}
                    aria-invalid={errors[field as keyof Errors]}
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    placeholder={
                      field === FieldName.Name
                        ? "Enter your website name"
                        : "https://www.landingvault.com/"
                    }
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(field)}
                    onBlur={() => handleBlur(field)}
                    className={`bg-white rounded-lg border text-grey-900 outline-none h-11 px-3 py-2 shadow-shareLinks ${
                      errors[field as keyof Errors]
                        ? "border-[#E03C00]" :  typingState[field as keyof typeof typingState] 
                        ? "border-blue-400 shadow-buttonFocus bg-white hover:bg-white"
                        : "border-grey-50 hover:bg-grey-10 hover:border-grey-50"
                    }`}
                    aria-invalid={errors[field as keyof Errors]}
                  />
                )}
                {errors[field as keyof Errors] && (
                  <p className="mt-[8px] text-[#E03C00] text-[10px]">
                    {field === FieldName.Name
                      ? "Please enter website name"
                      : field === FieldName.Url
                      ? "Invalid website URL"
                      : "Please tell us about your website"}
                  </p>
                )}
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="bg-blue-400 rounded-lg cursor-pointer border-blue-400 hover:bg-blue-200 hover:border-blue-400 shadow-shareLinks inline-flex items-center justify-center mt-4 py-3 px-6 text-white text-14 font-medium focus:outline-none"
              aria-label="Submit your website"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )}
{confirm && <Confirm status={notification.status} message={notification.message}/>}
</>
  );
};

export default SubmitWebsite;
