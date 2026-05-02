import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/Interceptor";

const Blog = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);

  const GetSingleBlog = async () => {
    setLoading(true);
    try {
      const response = await api.get(`get_single_blog/${params?.id}`);
      setBlog(response?.data?.findBlog?.[0] || null);
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetSingleBlog();
  }, []);

  // ✅ alignment helper
  const getTextAlignClass = (align) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      case "left":
        return "text-left";
      default:
        return "";
    }
  };

  // ✅ renderer
  const renderContent = (nodes) => {
    return nodes?.map((node, index) => {
      switch (node.type) {
       case "heading": {
  const level = node.attrs.level;

  const headingStyles = {
    1: "text-4xl font-bold my-4",
    2: "text-3xl font-semibold my-3",
    3: "text-2xl font-semibold my-2",
    4: "text-xl font-medium my-2",
  };

  const Tag = `h${level}`;

  return (
    <Tag
      key={index}
      className={`${headingStyles[level] || "text-lg"} ${getTextAlignClass(
        node.attrs?.textAlign
      )}`}
    >
      {renderContent(node.content)}
    </Tag>
  );
}

        case "paragraph":
          return (
            <p
              key={index}
              className={`my-2 ${getTextAlignClass(
                node.attrs?.textAlign
              )}`}
            >
              {renderContent(node.content)}
            </p>
          );

        case "text": {
          let text = node.text;

          if (node.marks) {
            node.marks.forEach((mark) => {
              if (mark.type === "bold") text = <b>{text}</b>;
              if (mark.type === "italic") text = <i>{text}</i>;
              if (mark.type === "underline") text = <u>{text}</u>;
              if (mark.type === "strike") text = <s>{text}</s>;
              if (mark.type === "code") text = <code>{text}</code>;

              if (mark.type === "link") {
                text = (
                  <a
                    href={mark.attrs.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {text}
                  </a>
                );
              }

              if (mark.type === "highlight") {
                text = (
                  <span className="bg-yellow-200 px-1 rounded">
                    {text}
                  </span>
                );
              }

              if (mark.type === "superscript") {
                text = <sup>{text}</sup>;
              }

              if (mark.type === "subscript") {
                text = <sub>{text}</sub>;
              }
            });
          }

          return <span key={index}>{text}</span>;
        }

        case "bulletList":
          return (
            <ul key={index} className="list-disc ml-6">
              {renderContent(node.content)}
            </ul>
          );

        case "orderedList":
          return (
            <ol key={index} className="list-decimal ml-6">
              {renderContent(node.content)}
            </ol>
          );

        case "listItem":
          return <li key={index}>{renderContent(node.content)}</li>;

        case "taskList":
          return (
            <ul key={index} className="ml-6">
              {renderContent(node.content)}
            </ul>
          );

        case "taskItem":
          return (
            <li key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={node.attrs.checked}
                readOnly
              />
              {renderContent(node.content)}
            </li>
          );

        case "blockquote":
          return (
            <blockquote
              key={index}
              className="border-l-4 pl-4 italic my-3"
            >
              {renderContent(node.content)}
            </blockquote>
          );

        case "codeBlock":
          return (
            <pre
              key={index}
              className="bg-gray-100 p-3 rounded my-3 overflow-x-auto"
            >
              <code>{node.content?.[0]?.text}</code>
            </pre>
          );

        case "image":
          return (
            <img
              key={index}
              src={node.attrs.src}
              alt={node.attrs.alt}
              className="my-4 rounded-lg"
            />
          );

        case "horizontalRule":
          return <hr key={index} className="my-4" />;

        default:
          return null;
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 leading-tight">
        {blog?.blog_title}
      </h1>

      {/* Meta */}
      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <p>Views: {blog?.blog_views}</p>
        <p>{new Date(blog?.create_at).toDateString()}</p>
      </div>

      {/* Cover */}
      <img
        src={blog?.blog_cover_image}
        className="w-full h-64 object-cover rounded-xl mb-8"
      />

      {/* Content */}
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {renderContent(blog?.content?.content)}
      </div>
    </div>
  );
};

export default Blog;