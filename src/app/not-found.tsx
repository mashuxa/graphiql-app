"use client";

import Error from "next/error";

import { ReactElement } from "react";

export default function NotFound(): ReactElement {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
