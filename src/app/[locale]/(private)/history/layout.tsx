import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren<{ modal: React.ReactElement }>> = ({
  children,
  modal,
}) => {
  return (
    <div>
      {children}

      {modal}
    </div>
  );
};

export default Layout;
