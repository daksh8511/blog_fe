import { Button } from "../../../components/ui/button";
import landingphoto from "../../../../public/landingpost.jpg";

const LandingPageBlog = () => {
  return (
    <div className="block lg:flex items-center">
      <div className="w-full lg:w-[60%]">
        <img src={landingphoto} alt="" className="w-full h-auto object-cover" />
      </div>
      <div className="w-full lg:w-[40%] p-10">
        <h4 className="uppercase mb-4">featured insights</h4>
        <h2 className="capitalize text-5xl mb-4">the future of minimalist design</h2>
        <p className="capitalize mb-4">
          Exploring how functional density and intentional subtraction are
          reshaping the modern professional workspace.
        </p>
        <Button className="px-6 h-[40px]" variant={'default'}>Read Article</Button>
      </div>
    </div>
  );
};

export default LandingPageBlog;
