import { useState } from "react";
import { Pencil, Trash2, Eye, Heart, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

// Dummy Data
const initialPosts = [
  {
    id: "1",
    title: "Getting Started with React 19",
    category: "Frontend",
    status: "publish",
    date: "2026-04-25",
    views: 1250,
    likes: 340,
  },
  {
    id: "2",
    title: "Why TailwindCSS v4 is a Game Changer",
    category: "Styling",
    status: "publish",
    date: "2026-04-20",
    views: 890,
    likes: 215,
  },
  {
    id: "3",
    title: "Understanding TypeScript Generics",
    category: "TypeScript",
    status: "draft",
    date: "2026-04-27",
    views: 0,
    likes: 0,
  },
  {
    id: "4",
    title: "10 Tips for Better UX Design",
    category: "Design",
    status: "publish",
    date: "2026-04-15",
    views: 2100,
    likes: 580,
  },
  {
    id: "5",
    title: "Server Components Explained",
    category: "Backend",
    status: "draft",
    date: "2026-04-26",
    views: 0,
    likes: 0,
  },
];

const PostMangment = () => {
  const [filter, setFilter] = useState<"all" | "publish" | "draft">("all");
  const [posts, setPosts] = useState(initialPosts);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Derived state for filtering
  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  // Handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredPosts.length && filteredPosts.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPosts.map((p) => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpenPopup(true);
  };

  const confirmDelete = () => {
    if (!deleteId) return;

    setPosts(posts.filter((p) => p.id !== deleteId));

    const newSelected = new Set(selectedIds);
    newSelected.delete(deleteId);
    setSelectedIds(newSelected);

    setDeleteId(null);
    setOpenPopup(false);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Post Management
        </h2>
        <p className="text-muted-foreground font-medium">
          Manage your blog posts, drafts, and categories.
        </p>
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center p-1 bg-muted/50 rounded-lg border">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
            className="rounded-md"
          >
            All Posts
          </Button>
          <Button
            variant={filter === "publish" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("publish")}
            className="rounded-md"
          >
            Published
          </Button>
          <Button
            variant={filter === "draft" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("draft")}
            className="rounded-md"
          >
            Drafts
          </Button>
        </div>

        {selectedIds.size > 0 && (
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Delete Selected ({selectedIds.size})
          </Button>
        )}
      </div>

      {/* Table Container */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[50px] text-center">
                <Checkbox
                  checked={
                    filteredPosts.length > 0 &&
                    selectedIds.size === filteredPosts.length
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Post Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Likes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  No posts found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow
                  key={post.id}
                  data-state={selectedIds.has(post.id) ? "selected" : undefined}
                  className="group"
                >
                  <TableCell className="text-center">
                    <Checkbox
                      checked={selectedIds.has(post.id)}
                      onCheckedChange={() => toggleSelect(post.id)}
                      aria-label={`Select ${post.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground max-w-[250px] truncate">
                    {post.title}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        post.status === "publish"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {post.status === "publish" ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5 text-muted-foreground text-sm font-medium">
                      <Eye className="w-3.5 h-3.5" />
                      {post.views.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5 text-muted-foreground text-sm font-medium">
                      <Heart className="w-3.5 h-3.5" />
                      {post.likes.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 ">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-blue-600"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-red-600"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {openPopup && (
          <Dialog open={openPopup} onOpenChange={setOpenPopup}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this post? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={confirmDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default PostMangment;
