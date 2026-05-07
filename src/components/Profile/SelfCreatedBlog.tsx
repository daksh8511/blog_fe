import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const SelfCreatedBlog = ({ blogs }) => {
    const navigate = useNavigate()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="group cursor-pointer space-y-3" onClick={() => navigate(`/blog/${blog?.blogid}`)}>
          {/* Thumbnail Aspect Ratio */}
          <div className="aspect-video bg-muted rounded-xl overflow-hidden border border-border group-hover:opacity-80 transition-opacity flex items-center justify-center text-muted-foreground">
            <img src={blog?.blog_cover_image} alt="" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">
              {blog.blog_title}
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

export default SelfCreatedBlog;
