import React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminMainLayout() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded) {
      if (user?.publicMetadata.role != "admin") {
        navigate("/sign-in");
      }
    }
  }, [isLoaded, user, navigate]);

  if (!isLoaded) return null;

  return (
    <div>
      <div className="flex justify-end gap-x-4 items-center py-4">
        <Link to="/admin/jobs">Job Posts</Link>
        <Button asChild>
          <Link to="/admin/job/create">Post A Job</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminMainLayout;
