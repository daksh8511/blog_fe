import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import CodeBlock from "@tiptap/extension-code-block";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: true,
        orderedList: true,
        listItem: true,
      }),
    ],
    content: "<p>Hello World!</p>",
  });

  if (!editor) return null;

  return (
    <>
      <Button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </Button>

      <Button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </Button>

      <Button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor?.chain().focus().toggleBulletList().run();
        }}
      >
        • List
      </Button>
      <Button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.chain().focus().toggleCodeBlock().run();
        }}
      >
        Set code block
      </Button>

      <EditorContent
        editor={editor}
        style={{
          minHeight: "150px",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      />
    </>
  );
};

export default Tiptap;
