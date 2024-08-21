"use client";

import { FC } from "react";

const toggleLanguage = (): void => {
  console.log("LanguageToggle clicked");
};

const LanguageToggle: FC = () => {
  return <button onClick={toggleLanguage}>EN/RU</button>;
};

export default LanguageToggle;
