import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
      <Card className="w-full max-w-lg m-auto lg:mt-100">
  <h2 className="font-semibold text-center text-2xl my-3">
    Reset Password
  </h2>

  <p className="text-center text-sm text-muted-foreground px-6">
    Enter your email and set a new password for your account.
  </p>

  <CardContent className="mt-6">
    <div className="flex flex-col gap-6">

      {/* Email */}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>

      {/* New Password */}
      <div className="grid gap-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter new password"
          required
        />
      </div>

    </div>
  </CardContent>

  <CardFooter className="flex-col gap-3">
    <Button className="w-full">
      Update Password
    </Button>

    <p className="text-sm text-muted-foreground">
      Remember your password?{" "}
      <span
        onClick={() => navigate("/signin")}
        className="text-blue-600 cursor-pointer hover:underline"
      >
        Sign in
      </span>
    </p>
  </CardFooter>
</Card>
  );
};

export default ForgotPassword;