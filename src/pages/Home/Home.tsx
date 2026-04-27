import LandingPageBlog from "./Components/LandingPageBlog";
import { Badge } from "../../components/ui/badge";
import TrendingNow from "./Components/TrendingNow";
import Categories from "./Components/Categories";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import cate1 from "../../../public/cate1.jpg";
import cate2 from "../../../public/cate2.jpg";
import cate3 from "../../../public/cate3.jpg";

const Home = () => {
  const [latestThinking] = useState([
    {
      id: 1,
      title: "Digital Sobriety in the Age of Noise",
      image: cate1,
      topic_related: "TECH",
      description:
        "How high-performers are leveraging silence as a competitive advantage in global markets.",
      user: {
        avatar: "",
        name: "Marcus thomas",
        reading_duration: "8 min",
      },
    },
    {
      id: 2,
      title: "The Architecture of Intellectual Rigor",
      topic_related: "CULTURE",
      image: cate2,
      description:
        "Revisiting the philosophical foundations of European urbanism and its impact on modern",
      user: {
        avatar: "",
        name: "Elena vance",
        reading_duration: "12 min",
      },
    },
    {
      id: 3,
      title: "Ethics in Generative Aesthetics",
      topic_related: "DESIGN",
      image: cate3,
      description:
        "A deep dive into the moral implications of AI-driven creative workflows and the future of human authorship.",
      user: {
        avatar: "",
        name: "Dr. Julian Gray",
        reading_duration: "15 min",
      },
    },
  ]);
  return (
    <div>
      <LandingPageBlog />

      <div className="block lg:flex justify-between my-10">
        {/* left side */}
        <div className="w-full lg:w-[60%] px-10 lg:p-0">
          <div className="flex items-center justify-between">
            <h2 className="capitalize font-semibold text-3xl">
              latest thinking
            </h2>

            <div className="flex gap-2">
              {["New", "Popular"].map((badged) => {
                return <Badge>{badged}</Badge>;
              })}
            </div>
          </div>
          <div className="block lg:flex gap-4 mt-5">
            {latestThinking
              ?.filter((blogs) => blogs.id !== 3)
              .map((blog) => {
                return (
                  <div className="mb-4">
                    <Card className="relative mx-auto w-full max-w-sm pt-0">
                      <div className="absolute inset-0 z-30 aspect-video" />
                      <img
                        src={blog?.image}
                        alt="Event cover"
                        className="relative z-20 aspect-video w-full"
                      />
                      <CardHeader>
                        <Badge>{blog?.topic_related}</Badge>
                        <CardTitle className="my-2">{blog?.title}</CardTitle>
                        <CardDescription>{blog?.description}</CardDescription>
                        <div className="flex justify-between mt-5">
                          <h4>{blog?.user?.name}</h4>
                          <h4 className="text-gray-500">
                            {blog?.user?.reading_duration}
                          </h4>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                );
              })}
          </div>

          <div>
            {latestThinking
              ?.filter((blogs) => blogs?.id === 3)
              .map((blog) => {
                return (
                  <div className="flex gap-2 items-center bg-gray-50 rounded-2xl">
                    <div  className="w-[50%] rounded-tl-2xl rounded-bl-2xl">
                      <img
                        src={blog?.image}
                        className="w-full rounded-tl-2xl rounded-bl-2xl"
                      />
                    </div>
                    <div className="pr-3 w-[50%]">
                      <Badge className="mb-2">{blog?.topic_related}</Badge>
                      <h2 className="text-2xl mb-3">{blog?.title}</h2>
                      <p className="mb-3">{blog?.description}</p>
                      <div className="flex justify-between items-center">
                        <h5 className="text-gray-500 text-sm">
                          {blog?.user?.name}
                        </h5>
                        <h5 className="text-gray-500 text-sm">
                          {blog?.user?.reading_duration} read
                        </h5>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* right side */}
        <div className="lg:w-[40%] w-full px-5">
          <TrendingNow />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Home;
