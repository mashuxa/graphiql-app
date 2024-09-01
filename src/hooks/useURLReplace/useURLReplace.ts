import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { HttpMethod } from "src/types";

type UseRestRedirectReturnType = RouteParams & {
  replace: (replacingParams: RouteParams) => void;
};
type RouteParams = { method?: HttpMethod; url?: string; body?: string };

const useRestUrlReplace = (): UseRestRedirectReturnType => {
  const params = useParams<RouteParams>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const replace = useCallback(
    (replacingParams: RouteParams): void => {
      const newParams = {
        ...params,
        ...replacingParams,
      };
      const { method, url, body } = newParams;
      const newUrl = `/${[pathname.split("/")[1], method, encodeURIComponent(url || ""), body].join("/")}?${searchParams}`;

      window.history.pushState(window.history.state, "", newUrl);
    },
    [searchParams, params, pathname],
  );
  const { method, url, body } = params;

  return {
    replace,
    method: method,
    url: decodeURIComponent(url || ""),
    body: body,
  };
};

export default useRestUrlReplace;
