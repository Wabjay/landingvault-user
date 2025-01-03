import { useState, ChangeEvent } from "react";
import axios from "axios";
import { store } from "@/store";
import Image from "next/image";
import LoadImage from "@/components/LoadImage";
import Confirm, { Note } from "./Confirm";
interface SubscribeProps {
  setConfirmation?: (status: boolean) => void;
}

const Subscribe = ({ setConfirmation = () => {} }: SubscribeProps) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [notification, setNotification] = useState<Note>({status:"", message:""});

  const { setSubscribe, subscribe } = store();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setEmail(value);
    setError(!emailRegex.test(value));
  };
 
  const showNotification =(status:string,message:string )=>{
    setNotification({status: status, message: message})
    setConfirm(true);
    setTimeout(() => setConfirm(false), 3000);
  }
  const handleSubmit = async (): Promise<void> => {
    if (error || !email) return;
    try {
      await axios.post(
        "/api/subscribe",
        { email: email },
        { headers: { "Content-Type": "application/json" } }
      );
      setSubscribe(false);
      setEmail("");
    setConfirmation(true);
      showNotification("success", 'Your subscription was successful')

    } catch (error) {
      console.error("Error submitting form:", error);
      showNotification("error", 'There was an error subscribing')
    }
  };

  const close = (): void => {
    setEmail("");
    setError(false);
    setSubscribe(false);
  };

  return (
    subscribe && (
      <div
        className="w-[100vw] h-[100vh] flex items-baseline justify-center bg-overlay fixed top-0 left-0 z-20"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-[90%] max-w-[480px] mt-[5%] flex flex-col gap-6 pb-6  overflow-hidden rounded-[12px] bg-white border-[rgb(232,232,234)] border">
          <div className="absolute z-50 flex justify-end w-full p-4">
            <Image
              src="/cancel.svg"
              alt="Close"
              width={20}
              height={20}
              className="w-8 h-8 cursor-pointer bg-white rounded-full"
              onClick={close}
            />
          </div>

          <LoadImage
            alt="pop-image2"
            src="/pop-image2.png"
            style="w-full h-auto bg-grey-10 py-6"
            height={undefined}
          />

          <div className="w-full text-left px-6">
            <p className="text-20 text-grey-900 font-semibold tablet:text-24 mb-2">
              Subscribe to our weekly Suggestions
            </p>
            <p className="text-14 text-grey-600">
              Stay ahead of trends, get a weekly roundup of the top websites in
              your inbox every Monday.
            </p>
          </div>

          <div className="text-left flex flex-col px-6">
            <label
              htmlFor="email"
              className="text-14 text-grey-900 font-medium mb-2"
            >
              Email address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`bg-white rounded-lg border text-grey-900 outline-none h-11 px-3 py-2 shadow-shareLinks ${
                error
                  ? "border-[#E03C00]"
                  : focused
                  ? "border-blue-400 shadow-buttonFocus bg-white hover:bg-white"
                  : "border-grey-50 hover:bg-grey-10 hover:border-grey-50"
              }`}
              aria-invalid={error}
              aria-describedby="email-error"
            />
            {error && (
              <p
                id="email-error"
                className="mt-[8px] text-[#E03C00] text-[10px]"
                aria-live="assertive"
              >
                Invalid email address
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-400 rounded-lg cursor-pointer border-blue-400 hover:bg-blue-500 hover:border-blue-400 shadow-shareLinks inline-flex items-center justify-center py-3 px-6 mt-4 mx-6 text-white text-14 font-medium focus:outline-none capitalize"
            aria-label="Submit your email"
          >
            Subscribe
          </button>
          <p className="text-center text-14 text-grey-600 capitalize">
            No spam, just design
          </p>
        </div>

        {confirm && <Confirm status={notification.status} message={notification.message}/>}
      </div>

    )
  );
};

export default Subscribe;
