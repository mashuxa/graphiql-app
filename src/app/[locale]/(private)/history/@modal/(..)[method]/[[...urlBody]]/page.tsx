"use server";

import { NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Rest from "src/app/[locale]/(private)/[method]/[[...urlBody]]/page";
import Graphiql from "src/app/[locale]/(private)/GRAPHQL/[[...urlBody]]/page";
import ModalWrapper from "src/components/ModalWrapper/ModalWrapper";

const ModalRest: NextPage<{
  params: Params;
  searchParams: Record<string, string>;
}> = async ({ params }) => {
  const method: string = params.method;

  return (
    <ModalWrapper>
      {method.includes("GRAPHQL") ? <Graphiql /> : <Rest params={params} />}
    </ModalWrapper>
  );
};

export default ModalRest;
