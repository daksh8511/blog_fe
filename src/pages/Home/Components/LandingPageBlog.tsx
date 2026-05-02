import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPageBlog = ({data}) => {
  const navigate = useNavigate()
  return (
    <div className="block lg:flex items-center" onClick={() => navigate(`blog/${data?.blogid}`)}>
      <div className="w-full lg:w-[60%]">
        <img src={data?.blog_cover_image} alt="" className="w-full h-auto object-cover" />
      </div>
      <div className="w-full lg:w-[40%] p-10">
        <h4 className="uppercase mb-4">{data?.blog_category}</h4>
        <h2 className="capitalize text-5xl mb-4">{data?.blog_title}</h2>
        <p className="capitalize mb-4">
          Exploring how functional density and intentional subtraction are
          reshaping the modern professional workspace.
        </p>
        <Button className="px-6 h-[40px]" variant={'default'}>Read story</Button>
      </div>
    </div>
  );
};

export default LandingPageBlog;
