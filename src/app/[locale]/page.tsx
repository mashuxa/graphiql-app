import { NextPage } from "next";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import AboutEn from "src/components/About/AboutEn";
import AboutRu from "src/components/About/AboutRu";
import Greeting from "src/components/Greeting/Greeting";
import { Locale } from "src/i18n.config";

const Home: NextPage<{ params: Params }> = ({ params }) => {
  return (
    <div data-testid="root-main" className="w-full bg-white ">
      <Greeting />
      {params.locale === Locale.EN ? <AboutEn /> : <AboutRu />}
    </div>
  );
};

export default Home;
