const Blog = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 leading-tight">
        The Future of Web Development in 2026
      </h1>

      {/* Meta Info */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
        <p>
          By <span className="font-medium text-gray-700">John Doe</span>
        </p>
        <div className="flex items-center gap-3">
          <p>6 min read</p>
          -
          <p className="text-gray-500">April 24, 2026</p>
        </div>
      </div>

      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        alt="Blog Cover"
        className="w-full h-64 object-cover rounded-xl mb-8"
      />

      {/* Content */}
      <div className="space-y-5 text-gray-700 leading-relaxed text-[16px]">
        <p>
          Web development is evolving at an incredible pace. In 2026, we are
          seeing a shift toward <b>AI-driven development</b> and more
          <i>component-based architectures</i> than ever before.
        </p>

        <p>
          Developers are no longer just writing code — they are building
          intelligent systems that adapt and scale automatically. Tools like
          <b> React Server Components</b> and modern frameworks are changing how
          we think about UI rendering.
        </p>

        <p>
          One of the biggest trends is the rise of <i>full-stack simplicity</i>.
          Instead of managing multiple complex layers, developers now prefer
          unified frameworks that handle everything seamlessly.
        </p>

        <p>
          <b>Performance optimization</b> is also becoming critical. Users
          expect instant loading experiences, and even a few milliseconds delay
          can impact engagement.
        </p>

        <p>
          In conclusion, the future belongs to developers who can combine
          <i> creativity, performance, and AI integration</i> into a single
          workflow.
        </p>
      </div>
    </div>
  );
};

export default Blog;
