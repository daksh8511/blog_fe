import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Eye,
  Heart,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/Interceptor";
import UserInfo from "../../../store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Card, CardContent } from "../../../components/ui/card";
import Texts from "../../../alltexts/Texts";
import { toast } from "sonner";

const PostMangment = () => {
  const [filter, setFilter] = useState<string>("all");
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const dropdownOptions = [
    { label: Texts.content_managager.All_Status, value: "all" },
    { label: Texts.content_managager.published, value: "publish" },
    { label: Texts.content_managager.drafts, value: "draft" },
  ];
  const navigate = useNavigate();
  const { userInfo } = UserInfo();

  const fetchAllPosts = async () => {
    try {
      const response = await api.get(`/get_all_by_id/${userInfo?.id}`);
      if (response?.data?.success) {
        setPosts(response?.data?.data || []);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  const stats = [
    {
      label: Texts.platform_overview?.total_posts,
      value: posts.length,
      icon: <FileText className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: Texts.content_managager.published,
      value: posts.filter((p) => p.status === "publish").length,
      icon: <CheckCircle2 className="text-emerald-500" />,
      bg: "bg-emerald-50",
    },
    {
      label: Texts.content_managager.drafts,
      value: posts.filter((p) => p.status === "draft").length,
      icon: <Clock className="text-amber-500" />,
      bg: "bg-amber-50",
    },
  ];

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredPosts.length && filteredPosts.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPosts.map((p) => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpenPopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/delete_blog/${deleteId}`);
      if (response?.data?.success) {
        toast.success(
          response?.data?.msg || Texts.content_managager.BlogDeleteSuccMsg,
        );
        fetchAllPosts();
      }
    } catch (error) {
      console.error("blog delete errro : ", error);
      toast.error("Something went wrong, blog are not delete");
    }
    setOpenPopup(false);
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {Texts?.content_managager?.content_managager_title}
          </h1>
          <p className="text-gray-500 mt-1">
            {Texts?.content_managager?.content_managager_subtitle}
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin/create")} // Adjust this path to your create route
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm w-full sm:w-auto"
        >
          <Pencil className="w-4 h-4 mr-2" />
          {Texts.createEditPost.createPost || "Create Story"}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select
            onValueChange={(value) => setFilter(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-[180px] bg-gray-50 border-none ring-0 focus:ring-0">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {dropdownOptions?.map((dropdowns) => (
                <SelectItem value={dropdowns?.value}>
                  {dropdowns?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedIds.size > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="animate-in zoom-in duration-200"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {Texts.content_managager.delete} ({selectedIds.size})
          </Button>
        )}
      </div>

      {/* Modern Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    filteredPosts.length > 0 &&
                    selectedIds.size === filteredPosts.length
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Post Title
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Category
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Created
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-700">
                Engagement
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-20 text-gray-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FileText size={40} className="opacity-20" />
                    <p>{Texts.content_managager.NoPostFoundMsg}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow
                  key={post.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(post.id)}
                      onCheckedChange={() => toggleSelect(post.id)}
                    />
                  </TableCell>

                  <TableCell className="font-medium text-gray-900 max-w-[250px] truncate">
                    {post.blog_title}
                  </TableCell>

                  <TableCell>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600">
                      {post.blog_category}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        post.status === "publish"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${post.status === "publish" ? "bg-emerald-500" : "bg-gray-400"}`}
                      />
                      {post.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                    {new Date(post.create_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye size={14} className="text-gray-400" />
                        <span className="text-xs font-medium">
                          {post.blog_views}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={14} className="text-gray-400" />
                        <span className="text-xs font-medium">
                          {post.likes}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-gray-400 hover:text-indigo-600"
                        onClick={() => navigate(`/admin/edit/${post.blogid}`)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-gray-400 hover:text-red-600"
                        onClick={() => handleDelete(post.blogid)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation */}
      <Dialog open={openPopup} onOpenChange={setOpenPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {Texts.content_managager.DeleteConfimTitle}
            </DialogTitle>
            <DialogDescription>
              {Texts.content_managager.DeleteConfirmDesciption}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 gap-2">
            <Button variant="outline" onClick={() => setOpenPopup(false)}>
              {Texts.content_managager.Cancel}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {Texts.content_managager.DeletePost}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostMangment;
