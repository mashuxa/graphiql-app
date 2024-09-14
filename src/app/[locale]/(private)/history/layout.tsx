import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren<{ modal: React.ReactElement }>> = ({
  children,
  modal,
}) => {
  return (
    <div className="p-3.5">
      <h1 className="text-2xl pb-4">History</h1>
      {children}

      {modal}
    </div>
  );
};

export default Layout;
