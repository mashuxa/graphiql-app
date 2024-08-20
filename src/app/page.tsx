import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="min-h-screen flex-col justify-between p-24 flex  items-center ">
      <Link href="https://rs.school/react/" className="" target="_blank">
        <Image
          className=""
          src="/rss-logo.svg"
          alt="RSS Logo"
          width={180}
          height={37}
          priority
        />
      </Link>
    </main>
  );
};

export default Home;
