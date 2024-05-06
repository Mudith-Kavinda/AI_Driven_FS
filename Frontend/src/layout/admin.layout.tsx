import React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminMainLayout() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      return;
    }

    if (user?.publicMetadata?.role != "admin") {
      return navigate("/");
    }
  }, [isLoaded, isSignedIn, user, navigate]);

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
