import { NextPage } from "next";

const GraphiqlClient: NextPage = () => {
  return (
    <main
      className="flex flex-col grow justify-center items-center p-8"
      data-testid="graph-main"
    >
      GraphiQL Client
    </main>
  );
};

export default GraphiqlClient;
