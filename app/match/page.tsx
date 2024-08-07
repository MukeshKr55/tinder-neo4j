import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getMatches } from "../neo4j.action";

const page = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      `/api/auth/login?post_login_redirect_url=http://localhost:3000/callback`
    );
  }

  const user = await getUser();
  if (!user) {
    return redirect(
      `/api/auth/login?post_login_redirect_url=http://localhost:3000/callback`
    );
  }

  const matches = await getMatches(user.id);
  return (
    <div>
      {matches.map((usr) => (
        <Card key={usr.applicationId}>
          <CardHeader>
            <CardTitle>
              {usr.firstname} {usr.lastname}
            </CardTitle>
            <CardDescription>{usr.email}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default page;
