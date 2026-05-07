import LandingPageBlog from "./Components/LandingPageBlog";
import { Badge } from "../../components/ui/badge";
import TrendingNow from "./Components/TrendingNow";
import Categories from "./Components/Categories";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import api from "../../utils/Interceptor";
import { Spinner } from "../../components/ui/spinner";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [topTrendingBlog, setTopTrendingBlog] = useState([]);
  const [trendingBlogs, setTrendingPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const fetchBlogs = async () => {
  setLoading(true);

  try {
    const response = await api.get("/get_home_blogs");

    if (response?.data?.success) {
      const blogsData = response?.data?.getBlogs || [];

      const sortedBlogs = [...blogsData].sort(
        (a, b) => b.blog_views - a.blog_views
      );

      const topBlog = sortedBlogs[0];
      setTopTrendingBlog(topBlog);

      const remainingBlogs = sortedBlogs.slice(1);

      setTrendingPosts(remainingBlogs);
    }
  } catch (error) {
    console.error("Error : ", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <LandingPageBlog data={topTrendingBlog} />

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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {trendingBlogs.map((blog) => {
                return (
                  <div key={blog?.blogid} className="mb-4" onClick={() => navigate(`/blog/${blog?.blogid}`)}>
                    <Card className="relative mx-auto w-full max-w-sm pt-0">
                      <div className="absolute inset-0 z-30 aspect-video" />
                      <img
                        src={blog?.blog_cover_image}
                        alt="Event cover"
                        className="relative z-20 aspect-video w-full"
                      />
                      <CardHeader>
                        <Badge className="capitalize">{blog?.blog_category}</Badge>
                        <CardTitle className="my-2 line-clamp-2 text-ellipsis">{blog?.blog_title}</CardTitle>
                        <CardDescription>{blog?.blog_short_description}</CardDescription>
                        <div className="flex justify-between mt-5">
                          <h4>{blog?.user?.name || "John Doe"}</h4>
                          <h4 className="text-gray-500">
                            {blog?.user?.reading_duration || '5 min'}
                          </h4>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                );
              })}
          </div>

          {/* <div>
            {latestThinking
              ?.filter((blogs) => blogs?.id === 3)
              .map((blog) => {
                return (
                  <div className="flex gap-2 items-center bg-gray-50 rounded-2xl">
                    <div className="w-[50%] rounded-tl-2xl rounded-bl-2xl">
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
          </div> */}
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
