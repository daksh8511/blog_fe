import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useFormik } from "formik";
import * as yup from 'yup'
import api from "../../utils/Interceptor";
import { toast } from "sonner";
import UserInfo from "../../store";

const Signin = () => {
  const navigate = useNavigate();
  const {setInfo} = UserInfo()

  const formik = useFormik({
    initialValues : {
      email : '',
      password : ''
    },
    validationSchema : yup.object({
      email : yup.string().required('Email are required'),
      password : yup.string().required('Password are required')
    }),
    onSubmit : (value) => handleLogin(value)
  })

  const handleLogin = async (value) => {
    try {
      const response = await api.post('/signin', value)

      if(response.data.success){
        localStorage.setItem('token', response?.data?.token)
        setInfo(response?.data)
        toast.success('Login successfully')
        navigate('/')
        return
      }
      toast.error('Uesr not found')
    } catch (error) {
      console.error("Error : ",error)
    }
  }
  return (
    <Card className="w-full max-w-lg m-auto lg:mt-100">
      <h2 className="font-semibold text-center text-2xl my-3">Lumina</h2>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik?.handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={formik?.handleChange}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgotpassword"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required name="password"  onChange={formik?.handleChange} />
            </div>
          </div>
            <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Signin
        </Button>
      </CardFooter>
        </form>
      </CardContent>
    
    </Card>
  );
};

export default Signin;