import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
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
import AboutUser from "./AboutUser";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { setInfo } = UserInfo();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      about_us: '',
      interest_category: []
    },
    validationSchema: yup.object({
      name: yup.string().required(BlogText.SignUpPage?.NameValidation),
      email: yup.string().email("Invalid email").required(BlogText.SignUpPage?.EmailValidation),
      password: yup.string().required(BlogText.SignUpPage?.PasswordValidation).min(6),
    }),
    onSubmit: () => CheckUserExist(),
  });

  const CheckUserExist = async () => {
    setLoading(true);
    try {
      const response = await api.post('/check_user', { email: formik.values.email });
      
      if (response.data.success) {
        setStep(2); // Proceed to AboutUser
      } else {
        toast.error(response.data.msg || "User already registered");
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Error checking user status");
    } finally {
      setLoading(false);
    }
  };

  const FinalSignUp = async () => {
    setLoading(true);
    try {
      const response = await api.post("/create", formik.values);
      if (response?.data?.success) {
        localStorage.setItem("token", response.data.token);
        setInfo(response.data);
        toast.success("Account created successfully!");
        navigate("/dashboard"); 
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg m-auto lg:mt-20">
      <h2 className="font-semibold text-center text-2xl my-3">Lumina</h2>
      <CardContent>
        {step === 1 ? (
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs">{formik.errors.name}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min 6 characters"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Spinner className="h-4 w-4" /> : "Next"}
            </Button>
          </form>
        ) : (
          <AboutUser
            formik={formik} 
            loading={loading} 
            onSubmit={FinalSignUp} 
            onBack={() => setStep(1)} 
          />
        )}
      </CardContent>
    </Card>
  );
};
export default Signup;
