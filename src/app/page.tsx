import { NextPage } from "next";

import Greeting from "src/components/Greeting/Greeting";

const Home: NextPage = () => {
  return (
    <div data-testid="root-main" className="w-full bg-white ">
      <Greeting />
    </div>
  );
};

export default Home;
