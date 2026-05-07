import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/Interceptor";
import { Heart, MessageSquare, Send, Bookmark } from "lucide-react";
import UserInfo from "../../store";
import LoginModel from "../../components/LoginModel";

const Blog = () => {
  const params = useParams();
  const { userInfo } = UserInfo();

  // Content States
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  
  // Interaction States
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [saved, setSaved] = useState(false);
  
  // UI States
  const [showLoginModal, setShowLoginModal] = useState(false);

  // --- Auth Guard Helper ---
  const checkAuth = () => {
    if (!userInfo || !userInfo?.id) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  const GetSingleBlog = async () => {
    setLoading(true);
    try {
      const response = await api.get(`get_single_blog/${params?.id}`);
      const data = response?.data?.findBlog?.[0] || null;
      setBlog(data);
      setLikeCount(data?.likes || 0);
      setComments(data?.comments || []);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const isAlreadySaved = async () => {
    if (!userInfo?.id) return;
    try {
      const response = await api.get(`/find_save_blog/${params?.id}/${userInfo?.id}`);
      setSaved(response?.data?.success);
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      GetSingleBlog();
    }
  }, [params?.id]);

  useEffect(() => {
    if (userInfo?.id && params?.id) {
      isAlreadySaved();
    }
  }, [userInfo?.id, params?.id]);

  // --- Interaction Handlers ---

  const handleLike = async () => {
    if (!checkAuth()) return;
    try {
      // Optimistic Update
      const newLikedState = !liked;
      setLiked(newLikedState);
      setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

      // await api.post(`like_blog/${params?.id}`, { userId: userInfo.id });
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  const handleSave = async () => {
    if (!checkAuth()) return;

    try {
      if (saved) {
        // If already saved, remove it
        const response = await api.delete(`/remove_blog/${params?.id}/${userInfo?.id}`);
        if (response?.data?.success) setSaved(false);
      } else {
        // If not saved, save it
        const response = await api.post(`/save_blog`, { blogid: params?.id, userid: userInfo?.id });
        if (response?.data?.success) setSaved(true);
      }
    } catch (error) {
      console.error("Save action failed", error);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!checkAuth()) return;
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      user: userInfo?.name || "User",
      text: newComment,
      date: new Date().toISOString(),
    };

    try {
      // await api.post(`comment_blog/${params?.id}`, { text: newComment, userId: userInfo.id });
      setComments([commentObj, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Comment failed", error);
    }
  };

  // --- Content Renderer ---
  const getTextAlignClass = (align) => {
    switch (align) {
      case "center": return "text-center";
      case "right": return "text-right";
      default: return "text-left";
    }
  };

  const renderContent = (nodes) => {
    return nodes?.map((node, index) => {
      switch (node.type) {
        case "heading": {
          const level = node.attrs.level;
          const Tag = `h${level}`;
          const styles = { 1: "text-4xl font-bold my-4", 2: "text-3xl font-semibold my-3", 3: "text-2xl font-semibold my-2" };
          return (
            <Tag key={index} className={`${styles[level] || "text-xl"} ${getTextAlignClass(node.attrs?.textAlign)}`}>
              {renderContent(node.content)}
            </Tag>
          );
        }
        case "paragraph":
          return <p key={index} className={`my-4 ${getTextAlignClass(node.attrs?.textAlign)}`}>{renderContent(node.content)}</p>;
        case "text": {
          let text = node.text;
          if (node.marks) {
            node.marks.forEach((mark) => {
              if (mark.type === "bold") text = <strong key="b">{text}</strong>;
              if (mark.type === "italic") text = <em key="i">{text}</em>;
              if (mark.type === "code") text = <code key="c" className="bg-gray-100 px-1 rounded">{text}</code>;
            });
          }
          return <span key={index}>{text}</span>;
        }
        case "image":
          return <img key={index} src={node.attrs.src} alt={node.attrs.alt} className="my-6 rounded-xl w-full" />;
        default: return null;
      }
    });
  };

  if (loading) return <div className="flex justify-center items-center h-screen animate-pulse text-gray-400">Loading Article...</div>;

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-10">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
        {blog?.blog_title}
      </h1>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b">
        <span className="text-gray-400 text-sm">{new Date(blog?.create_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
        <div className="flex items-center gap-6">
          <button onClick={handleLike} className={`flex items-center gap-1.5 transition-all ${liked ? "text-red-500 scale-110" : "text-gray-500 hover:text-red-500"}`}>
            <Heart fill={liked ? "currentColor" : "none"} size={22} />
            <span className="font-semibold">{likeCount}</span>
          </button>
          <button onClick={handleSave} className={`flex items-center gap-1.5 transition-all ${saved ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}>
            <Bookmark fill={saved ? "currentColor" : "none"} size={22} />
            <span className="font-semibold">{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Cover */}
      {blog?.blog_cover_image && (
        <img src={blog?.blog_cover_image} className="w-full aspect-video object-cover rounded-3xl mb-10 shadow-lg" alt="Cover" />
      )}

      {/* Content */}
      <article className="prose prose-blue max-w-none mb-16">
        {renderContent(blog?.content?.content)}
      </article>

      {/* Comments */}
      <section className="border-t pt-12">
        <div className="flex items-center gap-2 mb-8">
          <MessageSquare className="text-gray-900" />
          <h3 className="text-2xl font-bold text-gray-900">Discussion ({comments.length})</h3>
        </div>

        <form onSubmit={handlePostComment} className="mb-10 group">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => !userInfo?.id && setShowLoginModal(true)}
            placeholder="What are your thoughts?"
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none min-h-[120px]"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-gray-900 text-white px-8 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-blue-600 disabled:opacity-30 transition-all"
            >
              Post Comment <Send size={16} />
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {comments?.map((comment) => (
            <div key={comment?.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900">{comment?.user}</span>
                <span className="text-xs text-gray-400 font-medium">{new Date(comment?.date).toDateString()}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{comment?.text}</p>
            </div>
          ))}
        </div>
      </section>

            
      {/* --- LOGIN MODAL --- */}
      {showLoginModal && (
        <LoginModel setShowLoginModal={setShowLoginModal} />
      )}
    </div>
  );
};

export default Blog;