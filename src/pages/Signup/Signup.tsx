import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useFormik } from "formik";
import * as yup from "yup";
import BlogText from "../../BlogText";
import api from "../../utils/Interceptor";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../../components/ui/spinner";
import UserInfo from "../../store";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setInfo } = UserInfo();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(BlogText.SignUpPage?.NameValidation),
      email: yup.string().required(BlogText.SignUpPage?.EmailValidation),
      password: yup
        .string()
        .required(BlogText.SignUpPage?.PasswordValidation)
        .min(6),
    }),
    onSubmit: (value) => CreateUser(value),
  });

  const CreateUser = async (value) => {
    setLoading(true);

    try {
      const response = await api.post("/create", value);

      if (response?.data?.success) {
        const { token } = response.data;

        localStorage.setItem("token", token);

        setInfo(response.data);

        toast.success("User created successfully");
        navigate("/");
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      toast.error("Server error. Try again");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg m-auto lg:mt-100">
      <h2 className="font-semibold text-center text-2xl my-3">Lumina</h2>

      <CardContent>
        <form onSubmit={formik?.handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                onChange={formik?.handleChange}
                value={formik?.values?.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={formik?.values?.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={6}
                value={formik?.values?.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
          </div>
          <CardFooter className="flex-col bg-transparent gap-3 mt-5">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Creating...
                </div>
              ) : (
                "Signup"
              )}
            </Button>

            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
