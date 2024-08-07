import { getUserById, getUserWithNoConnection } from "@/app/neo4j.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import HomepageClientComponent from "./components/Home";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      `/api/auth/login?post_login_redirect_url=http://localhost:3000/callback`
    );
  }

  const user = await getUser();
  if (!user) {
    return redirect(`/api/auth/login`);
  }

  const userWithNoConnection = await getUserWithNoConnection(user.id);
  const currentUser = await getUserById(user.id);

  return (
    <main>
      <HomepageClientComponent
        currentUser={currentUser}
        users={userWithNoConnection}
      />
    </main>
  );
}
