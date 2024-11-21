
const PageFile = () => {

    // Handle form visibility
 
  return (
    <div className="w-full bg-[#FFFFFF] py-[50px] tablet:py-[80px] laptop:py-[100px]">
      <div className="relative px-4 tablet:px-6 laptop:px-8 desktop:px-0 max-w-[1152px] mx-auto text-left mb-8">
        <div className="relative w-full laptop:max-w-[1021px]">
          {/* <p className="text-[#757575] font-medium mb-6 tablet:mb-10">ABOUT US</p> */}
          <h2 className="text-24 laptop:text-48 font-semibold mb-4 text-[#1c1c1c]">
            We are a bunch of indie hackers building products. We built this
            tool directory to help you write, edit and learn new words.
          </h2>
         
          <p className="text-[#484848] text-16 tablet:text-24 tablet:leading-9 text-left mb-6 tablet:mb-10">
            These tools were built by our parent company, <a className="underline" href="https://pixelgumstudio.com">Pixelgum Studio.</a> Pixelgum Studio is a design and development studio that partners
            with founders to build products and offer design support. We have
            created tools like the <a className="underline" href="https://pitchdeck.design">Pitch Deck Design</a> platform, which helps
            founders find inspiration, create pitch decks, and purchase
            templates. Also, we publish the <a className="underline" href="https://indieniche.substack.com/">Indieniche Newsletter,</a> a weekly
            publication that features founder stories, tools, and growth hacks
            to support the entrepreneurial community. There is the <a className="underline" href="https://pixelfounder.substack.com/">Pixelfounder Newsletter,</a> a design focused publication that helps designers and creatives by sharing insights to help sharpen their design skills. And lastly, <a className="underline" href="https://landingvault.com/">Landingvault</a> a directory of the best landing pages to fuel your inspiration for your next design project. 
          </p>
          <p className="text-20 tablet:text-32 text-left font-semibold">
            For sponsorships
          </p>
          <p className="text-[#484848] text-16 tablet:text-24 tablet:leading-9 text-left mb-6 tablet:mb-10">
            As we grow, we are always welcome to sponsorships and
            collaborations. To reach us,<br/> please write to <a className="underline" href="mailto:pixelgumstudio@gmail.com">
              Pixelgumstudio@gmail.com
            </a>
          </p>
        </div>
      </div>
    
    </div>
  );
};

export default PageFile;
