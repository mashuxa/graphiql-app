import { NextPage } from "next";
import Link from "next/link";

import { routes } from "../constants";

const Home: NextPage = () => {
  return (
    <main
      className="flex flex-col grow justify-center items-center text-black"
      data-testid="root-main"
    >
      <div className="w-full bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          User is not signed in:
        </h2>
        <ul className="flex justify-center space-x-6 mb-6">
          <li>
            <Link href={routes.signIn} className="block border p-3">
              Sign In
            </Link>
          </li>
          <li>
            <Link href={routes.signOut} className="block border p-3">
              Sign Out
            </Link>
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          User is signed in: Welcome Back, Username!
        </h2>
        <ul className="flex justify-center space-x-6 mb-6">
          <li>
            <Link href={routes.restClient} className="block border p-3">
              REST Client
            </Link>
          </li>
          <li>
            <Link href={routes.graphiqlClient} className="block border p-3">
              GraphiQL Client
            </Link>
          </li>
          <li>
            <Link href={routes.history} className="block border p-3">
              History
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Home;
