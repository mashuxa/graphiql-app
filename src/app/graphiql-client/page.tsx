import { NextPage } from "next";

const GraphiqlClient: NextPage = () => {
  return (
    <main
      className="flex flex-col grow justify-center items-center text-black"
      data-testid="graph-main"
    >
      GraphiQL Client
    </main>
  );
};

export default GraphiqlClient;
