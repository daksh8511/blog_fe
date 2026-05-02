import { useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Button } from "../../tiptap-ui-primitive/button";
import { Spacer } from "../../tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "../../tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "../../tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "../../tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "../../tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "../../tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "../../tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "../../tiptap-ui/blockquote-button";
import { CodeBlockButton } from "../../tiptap-ui/code-block-button";
import { SeparatorButton } from "../../tiptap-ui/separator-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "../../tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "../../tiptap-ui/link-popover";
import { MarkButton } from "../../tiptap-ui/mark-button";
import { TextAlignButton } from "../../tiptap-ui/text-align-button";
import { UndoRedoButton } from "../../tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "../../tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "../../tiptap-icons/highlighter-icon";
import { LinkIcon } from "../../tiptap-icons/link-icon";
import { ImagePlus, X, Loader2 } from "lucide-react";

// --- Hooks ---
import { useIsBreakpoint } from "../../../hooks/use-is-breakpoint";
import { useWindowSize } from "../../../hooks/use-window-size";
import { useCursorVisibility } from "../../../hooks/use-cursor-visibility";

// --- Components ---
import { ThemeToggle } from "../../tiptap-templates/simple/theme-toggle";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "../../../lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import content from "../../tiptap-templates/simple/data/content.json";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/Interceptor";
import UserInfo from "../../../store";
import { toast } from "sonner";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import Texts from "../../../alltexts/Texts";

const CATEGORIES = ["Technology", "Design", "Lifestyle", "Business", "Health", "Other"];

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator className="mx-1" />

      <ToolbarGroup>
        <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
        <ListDropdownMenu
          modal={false}
          types={["bulletList", "orderedList", "taskList"]}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator className="mx-1" />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        <SeparatorButton />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator className="mx-1" />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator className="mx-1" />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator className="mx-1" />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
        <ToolbarGroup>
          <ThemeToggle />
        </ToolbarGroup>
      </ToolbarGroup>

      <Spacer />
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor() {
  const { id } = useParams();
  const { userInfo } = UserInfo();
  const navigate = useNavigate();
  const isMobile = useIsBreakpoint();
  
  // --- Enhanced State ---
  const [storyTitle, setStoryTitle] = useState("");
  const [category, setCategory] = useState("other");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main",
  );
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [titleError] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "on",
        autocorrect: "on",
        autocapitalize: "on",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content,
  });

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

 useEffect(() => {
  if (!id || !editor) return;

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/get_single_blog/${id}`);

      if (res?.data?.success) {
        const blog = res?.data?.findBlog?.[0];
        if (!blog) return;

        setStoryTitle(blog.blog_title || "");
        setCategory(blog.blog_category || "");
        setCoverImage(blog.blog_cover_image || null);
        editor.commands.setContent(blog.content);
      }
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    }
  };

  fetchBlog();
}, [id, editor]);

  // Handle Cover Upload
  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingCover(true);
      try {
        const url = await handleImageUpload(file);
        setCoverImage(url);
        toast.success("Cover image uploaded");
      } catch (error) {
        toast.error("Upload failed");
      } finally {
        setIsUploadingCover(false);
      }
    }
  };

  const handleCreateEditBlog = async (status: string) => {
    const editorContent = editor?.getJSON();
    const blogData = {
      authorid: userInfo?.id,
      content: editorContent,
      status,
      blog_title: storyTitle.trim(),
      blog_category: category,
      blog_cover_image: coverImage || ""
    };

    if (id) {
      const editBlogPatch = await api.patch(`/edit/${id}`, blogData);
      if (editBlogPatch?.data?.success) {
        toast.success("Story successfully updated");
        navigate("/admin/stories");
      } else {
        toast.error("Update failed");
      }
      return;
    }

    const CreatePost = await api.post("/upload_blog", blogData);
    if (CreatePost?.data?.success) {
      toast.success(Texts.createEditPost.BlogSuccessToast);
      navigate("/admin/stories");
    }
  };

  return (
    <div className="simple-editor-wrapper bg-white dark:bg-black min-h-screen">
      <EditorContext.Provider value={{ editor }}>
        
        {/* Header Actions */}
        <div className="sticky top-0 z-50 bg-white dark:bg-black border-b dark:border-gray-800">
          <div className="flex justify-between items-center max-w-4xl mx-auto p-4">
             <Button
                 variant="ghost"
                 onClick={() => navigate("/admin/stories")}
                 className="cursor-pointer"
             >
                 Cancel
             </Button>
             <div className="flex gap-3">
                <Button
                    disabled={!storyTitle.trim()}
                    variant="ghost"
                    onClick={() => handleCreateEditBlog("draft")}
                    className="cursor-pointer"
                >
                    {Texts.createEditPost.saveAsDraft}
                </Button>
                <Button
                    disabled={!storyTitle.trim() || !category || !coverImage || editor?.isEmpty}
                    onClick={() => handleCreateEditBlog("publish")}
                    className="!bg-[#2b7fff] !text-white rounded-full px-6"
                >
                    {id ? Texts.createEditPost.updatePost : "Publish"}
                </Button>
             </div>
          </div>

          {/* Toolbar */}
          <Toolbar
            ref={toolbarRef}
            className="border-t dark:border-gray-800"
            style={isMobile ? { bottom: `calc(100% - ${height - rect.y}px)` } : {}}
          >
            {mobileView === "main" ? (
              <MainToolbarContent
                onHighlighterClick={() => setMobileView("highlighter")}
                onLinkClick={() => setMobileView("link")}
                isMobile={isMobile}
              />
            ) : (
              <MobileToolbarContent
                type={mobileView === "highlighter" ? "highlighter" : "link"}
                onBack={() => setMobileView("main")}
              />
            )}
          </Toolbar>
        </div>

        {/* Content Area */}
        <div className=" px-4 py-8 space-y-6">
          
          {/* Cover Image Upload UI */}
          <div className="relative group w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-center transition-all hover:border-gray-300">
            {coverImage ? (
              <>
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setCoverImage(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center cursor-pointer space-y-2">
                {isUploadingCover ? (
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                ) : (
                    <>
                        <ImagePlus size={40} className="text-gray-300" />
                        <span className="text-sm text-gray-400 font-medium">Add a cover image</span>
                    </>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleCoverChange} />
              </label>
            )}
          </div>

          {/* Topic Category Select */}
          <div className="w-fit">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-none bg-transparent shadow-none p-0 text-blue-600 font-medium h-auto focus:ring-0">
                <SelectValue placeholder="Add a topic..." />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <Input
            value={storyTitle}
            placeholder="New story title"
            onChange={(e) => setStoryTitle(e.target.value)}
            className={`!text-5xl !font-bold !h-auto !py-2 border-none rounded-none focus-visible:ring-0 px-0 placeholder:text-gray-200 dark:placeholder:text-gray-800 ${
                titleError ? "border-red-500" : ""
            }`}
          />

          {/* Editor Body */}
          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content prose prose-lg dark:prose-invert max-w-none"
          />
        </div>
      </EditorContext.Provider>

      <style>{`
        .simple-editor-content .tiptap {
            outline: none !important;
            min-height: 400px;
        }
        .simple-editor-content .tiptap p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
        }
      `}</style>
    </div>
  );
}