import { NextPage } from "next";
import Button from "src/components/Button/Button";
import HeadersList from "src/components/HeadersList/HeadersList";
import SDLUrlInput from "src/components/SDLUrlInput/SDLUrlInput";
import SectionTitle from "src/components/SectionTitle/SectionTitle";
import UrlInput from "src/components/URLInput/URLInput";

const Graphiql: NextPage = () => {
  return (
    <div data-testid="graph-main">
      <h1 className="text-2xl pb-4">GraphiQL Client</h1>
      <div /*onSubmit={handleSubmit}*/>
        <form className="flex gap-x-1">
          <div className="flex flex-col gap-1">
            <div className="border">
              <UrlInput />
            </div>
            <div className="border">
              <SDLUrlInput defaultValue="test" />
            </div>
          </div>
          <div>
            <Button className="border-none bg-primary px-8 hover:text-secondary">
              SEND
            </Button>
          </div>
        </form>
        <SectionTitle>Headers:</SectionTitle>
        <HeadersList />
      </div>
    </div>
  );
};

export default Graphiql;
