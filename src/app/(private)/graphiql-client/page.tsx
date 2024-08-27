import { NextPage } from "next";
import GraphiQLClient from "src/components/GraphiQl/GraphiQLClient/GraphiQLClient";

const Graphiql: NextPage = () => {
  return (
    <div data-testid="graph-main">
      <GraphiQLClient />
    </div>
  );
};

export default Graphiql;
