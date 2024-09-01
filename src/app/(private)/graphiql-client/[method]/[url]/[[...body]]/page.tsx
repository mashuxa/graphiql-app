import { NextPage } from "next";
import Button from "src/components/Button/Button";
import UrlInput from "src/components/URLInput/URLInput";

const Graphiql: NextPage = () => {
  return (
    <div data-testid="graph-main">
      <h1 className="text-2xl pb-4">Rest Client</h1>
      <form /*onSubmit={handleSubmit}*/>
        <div className="flex border">
          <UrlInput />
          <Button className="border-none bg-primary px-8 hover:text-secondary">
            SEND
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Graphiql;
