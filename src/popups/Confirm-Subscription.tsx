
import LoadImage from "@/components/LoadImage";

interface SubscribeProps {
  setConfirm?: (status: boolean) => void;
  confirm: boolean;
}
const ConfirmSubscription = ({confirm, setConfirm = () => {} }: SubscribeProps) => {
  
  const close = (): void => {
    setConfirm(false);
  };

  return (
    confirm && (
      <div className="w-[100vw] h-[100vh] flex items-baseline justify-center bg-overlay fixed top-0 left-0 z-20">
        <div className="w-[90%] max-w-[480px] mt-[5%] flex flex-col gap-6  py-6 rounded-[12px] bg-white border-[rgb(232,232,234)] border">
            <LoadImage alt="pop-image2" src="/pop-image2.png" style={"w-full h-auto"} />
          <div className="w-full text-center px-6 ">
            <p className="text-20 text-grey-900 font-semibold tablet:text-24 mb-2">
            We have got this
            </p>
            <p className="text-14 text-grey-600 mb-6">
            Thanks for joining , your support means a lot. Catch you in 
 the inbox soon.
            </p>
          </div>

          

          <button
            onClick={close}
            className="bg-blue-400 rounded-lg cursor-pointer border-blue-400 hover:bg-blue-500 hover:border-blue-400 shadow-shareLinks inline-flex items-center justify-center py-3 px-6 mx-6 text-white text-14 font-medium focus:outline-none"
            aria-label="Submit your website"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default ConfirmSubscription;
