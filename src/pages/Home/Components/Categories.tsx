import { Badge } from "../../../components/ui/badge";

const Categories = () => {
  const categories = [
    "Design",
    "Artificial Intelligent",
    "Interior Design",
    "Philosophy",
    "Science",
    "Culture",
    "Habit",
  ];
  return (
    <div className="bg-gray-50 px-5 py-5 rounded-2xl mt-4">
        <h2 className="mb-3">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Badge className="cursor-pointer" key={category}>{category}</Badge>
        ))}
      </div>
    </div>
  );
};

export default Categories;
