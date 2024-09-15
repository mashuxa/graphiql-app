import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Getman: Fast and Simple",
  description:
    "Learn about Getman, an advanced tool designed for working with GraphQL and REST APIs, built by talented developers from RS School. Explore its features, technology stack, and the team behind the project, including contributors with expertise in front-end development, QA engineering, and more.",
  keywords:
    "Getman, API tool, GraphQL, REST API, developer tool, RS School, front-end, QA, web development, Next.js, React, TypeScript, Tailwind CSS, Firebase",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default RootLayout;
