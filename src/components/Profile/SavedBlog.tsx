import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "date-fns";

const SavedBlog = ({ savedBlogs }) => {
    const navigate = useNavigate()
  return savedBlogs.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-semibold">No saved blogs</h2>

      <p className="text-muted-foreground mt-2 max-w-md">
        Blogs you save will appear here for quick access later.
      </p>

      <Button className="mt-6 rounded-full" onClick={() => navigate("/")}>
        Explore Blogs
      </Button>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedBlogs?.map((blog: any) => (
        <div
          key={blog?.blogid}
          className="group cursor-pointer space-y-3"
          onClick={() => navigate(`/blog/${blog?.blogid}`)}
        >
          <div className="aspect-video bg-muted rounded-xl overflow-hidden border border-border">
            <img
              src={blog?.blog_cover_image}
              alt={blog?.blog_title}
              className="
                w-full h-full object-cover
                transform-gpu
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-110
              "
            />
          </div>

          <div className="space-y-1">
            <h3 className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {blog?.blog_title}
            </h3>

            <div className="text-xs text-muted-foreground">
              {blog?.blog_views} views •{" "}
              {formatDistanceToNow(new Date(blog?.create_at), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedBlog;
