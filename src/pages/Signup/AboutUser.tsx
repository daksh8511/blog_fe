import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Spinner } from "../../components/ui/spinner";

const categories = ["Technology", "Lifestyle", "Finance", "Education", "Health"];

const AboutUser = ({ formik, loading, onSubmit, onBack }) => {
  
  const toggleInterest = (category: string) => {
    const current = formik.values.interest_category;
    const next = current.includes(category)
      ? current.filter((i: string) => i !== category)
      : [...current, category];
    formik.setFieldValue("interest_category", next);
  };

  return (
    <div className="flex flex-col gap-6">
   <div className="grid gap-2">
  <div className="flex justify-between items-center">
    <Label htmlFor="about_us">Tell us about yourself (Optional)</Label>
    <span className={`text-xs ${formik.values.about_us.length >= 500 ? 'text-red-500 font-bold' : 'text-muted-foreground'}`}>
      {formik.values.about_us.length} / 500
    </span>
  </div>
  
  <Textarea
    id="about_us"
    name="about_us"
    placeholder="Share a bit about who you are..."
    value={formik.values.about_us}
    onChange={formik.handleChange}
    maxLength={500}
    className={formik.values.about_us.length >= 500 ? "border-red-500 focus-visible:ring-red-500" : ""}
  />
  
  {formik.values.about_us.length >= 500 && (
    <p className="text-[10px] text-red-500 text-right">Character limit reached</p>
  )}
</div>

      <div className="grid gap-2">
        <Label>Interests (Optional)</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={formik.values.interest_category.includes(cat) ? "default" : "outline"}
              className="cursor-pointer px-3 py-1"
              onClick={() => toggleInterest(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <Button onClick={onSubmit} className="w-full" disabled={loading}>
          {loading ? <Spinner className="h-4 w-4 mr-2" /> : "Complete Signup"}
        </Button>
        <Button variant="ghost" onClick={onBack} disabled={loading}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default AboutUser