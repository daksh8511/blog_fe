import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useParams } from "react-router-dom";
import UserInfo from "../../store";
import EditProfile from "../../components/EditProfile";

const Profile = () => {
  const params = useParams();
  const { userInfo } = UserInfo();
  
  const isSelfProfile = userInfo?.id === Number(params?.id);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    about_us: userInfo?.about_us || ""
  });

  const handleSave = () => {
    // Logic to save data to your store or API
    console.log("Saving data:", formData);
    // setOpen(false); 
  };
  const blogs = [
    { id: 1, title: "Building Scalable Apps with Next.js 14", date: "2 days ago", views: "1.2K views" },
    { id: 2, title: "Why I switched to Tailwind CSS", date: "1 week ago", views: "850 views" },
    { id: 3, title: "Modern State Management in 2024", date: "2 weeks ago", views: "3.4K views" },
  ]

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="h-32 w-32 md:h-40 md:w-40">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{isSelfProfile ? userInfo?.name : "Unknown"}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm text-muted-foreground mt-1">
            <span className="font-medium text-foreground">@{isSelfProfile ? userInfo?.name : "Unknown"}</span>
            <span>•</span>
            <span>{userInfo?.followers} followers</span>
            <span>•</span>
            <span>48 blogs</span>
          </div>
          <p className="mt-3 text-muted-foreground max-w-xl line-clamp-2">
            {isSelfProfile ? userInfo?.about_us : "Professional UI designer and frontend developer."}
          </p>
          
          <div className="mt-4 flex justify-center md:justify-start gap-3">
            {isSelfProfile ? (
            <EditProfile formData={formData} setFormData={setFormData} handleSave={handleSave} />
            ) : (
              <Button 
                variant={isFollowing ? "secondary" : "default"} 
                className="rounded-full px-8"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
            <Button variant="outline" className="rounded-full">Share</Button>
          </div>
        </div>
      </header>

      {/* BOTTOM SECTION: Navigation & Content */}
      <Tabs defaultValue="blogs" className="w-full">
        {/* Navigation Bar */}
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 space-x-8">
          <TabsTrigger 
            value="blogs" 
            className="rounded-none border-t-0 border-x-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-1 font-semibold"
          >
            Blogs
          </TabsTrigger>
          <TabsTrigger 
            value="about" 
            className="rounded-none border-t-0 border-x-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-1 font-semibold"
          >
            About
          </TabsTrigger>
        </TabsList>

        {/* Blogs Content */}
        <TabsContent value="blogs" className="py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="group cursor-pointer space-y-3">
                {/* Thumbnail Aspect Ratio */}
                <div className="aspect-video bg-muted rounded-xl overflow-hidden border border-border group-hover:opacity-80 transition-opacity flex items-center justify-center text-muted-foreground">
                  Thumbnail
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <div className="text-xs text-muted-foreground">
                    {blog.views} • {blog.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* About Us Content */}
        <TabsContent value="about" className="py-8 max-w-2xl">
          <div className="space-y-6">
            <section className="space-y-2">
              <h3 className="text-lg font-bold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hello! I'm a developer passionate about building beautiful interfaces. 
                This blog is where I document my learning and share tutorials 
                on how to use shadcn/ui and Tailwind CSS effectively.
              </p>
            </section>
            
            <section className="space-y-2">
              <h3 className="text-lg font-bold">Details</h3>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Location:</span> United States</p>
                <p><span className="text-muted-foreground">Joined:</span> January 2023</p>
                <p><span className="text-muted-foreground">Email:</span> business@example.com</p>
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default Profile