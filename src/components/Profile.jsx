import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="max-w-xl w-full p-6 rounded-2xl shadow-lg animate-in fade-in duration-700">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-semibold text-center">
            {user.name}
          </CardTitle>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </CardHeader>

        <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Phone:</strong> {user.phone}
          </div>
          <div>
            <strong>Website:</strong> {user.website}
          </div>
          <div>
            <strong>Company:</strong> {user.company.name}
          </div>
          <div>
            <strong>Address:</strong>{" "}
            {`${user.address.suite}, ${user.address.street}, ${user.address.city}`}
          </div>
        </CardContent>

        <div className="mt-6 text-center">
          <Button
            onClick={() => navigate("/comments")}
            className="rounded-full"
          >
            ← Go to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
