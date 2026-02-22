import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  React.useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
    <div>
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark: hover:bg-gray-600 transition-colors duration-200"
        aria-label="Change theme"
      >
        {isDark ? <BiSun /> : <BiMoon />}
      </button>
    </div>
  );
}
