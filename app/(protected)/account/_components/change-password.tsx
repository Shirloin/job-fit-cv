import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserService } from "@/services/UserService";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useCurrentUser();

  const handleSubmit = async () => {
    try {
      const response = await UserService.changePassword(
        user.id,
        currentPassword,
        newPassword,
        confirmPassword
      );
      toast.success("Password Saved");
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <Card className="border mt-4">
        <CardContent className="p-4">
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            value={currentPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCurrentPassword(e.target.value);
            }}
            className="mb-4"
            placeholder=""
            id="current-password"
            type="password"
          />
          <Label htmlFor="new-password">New Password</Label>
          <Input
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNewPassword(e.target.value);
            }}
            className="mb-4"
            placeholder=""
            id="new-password"
            type="password"
          />
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(e.target.value);
            }}
            className="mb-4"
            placeholder=""
            id="confirm-password"
            type="password"
          />
          <Button onClick={handleSubmit}>Save</Button>
        </CardContent>
      </Card>
    </>
  );
}
