// import React, { createContext, useContext, useEffect, useState } from 'react';

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// interface ApplicatonContextInterface {
//     theme: string;
//     toggleTheme: () => void;
// }

// export const ApplicationContext = createContext(null);

//  const UseAppContext = ({children}:{children:React.ReactNode}) => {

//      const [theme, setTheme] = useState(localStorage?.getItem('theme') === 'dark' ? 'dark' : 'light');
//     const element = document.documentElement;

//     // useEffect(()=>{

//     //     switch(theme) {
//     //     case "dark":
//     //     element.classList.add("dark");
//     //     localStorage.setItem("theme","dark");
//     //     break;

//     //     case "light":
//     //     element.classList.remove("dark");
//     //     localStorage.setItem("theme","light");
//     //     break;
//     //     default:
//     //     localStorage.removeItem("theme");
//     //     break;
//     //      }
//     //     },[theme]);

//     useEffect(() => {
//         if (theme === "dark") {
//             element.classList.add("dark");
//             localStorage.setItem("theme", "dark");
//         } else {
//             element.classList.remove("dark");
//             localStorage.setItem("theme", "light");
//         }
//     }, [theme]);

//         const toggleTheme = () => {
//             setTheme(prevTheme => (prevTheme !== "dark" ? "light" : "dark"));
//         };

//     return (
//         <ApplicationContext.Provider value={{theme, toggleTheme}}>
//             {children}
//             </ApplicationContext.Provider>
//     )
// }

// export default UseAppContext;

// Define the context interface
interface ApplicationContextType {
  increment: number;
  setIncrement: React.Dispatch<React.SetStateAction<number>>;
  theme: string;
  toggleTheme: () => void;
}

export const ApplicationContext = createContext<ApplicationContextType>({
  increment: 0,
  setIncrement: () => {},
  theme: "light",
  toggleTheme: () => {},
});

const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [increment, setIncrement] = useState(0);

  // const cookieStoredTheme = Cookies

  //direct assignment may cause hydration failure and in private browser mode ther's no localStorage access
  // const [theme,setTheme] = useState(localStorage?.getItem("theme")==="dark"?'dark':'light');
  // Initialize theme with lazy initializer

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        // const storedTheme = localStorage.getItem('theme');
        const storedTheme = Cookies.get("theme");
        // return storedTheme || 'light';
        return storedTheme === "dark" ? "dark" : "light";
      } catch (error) {
        console.warn("Error reading theme from localStorage:", error);
        return "light";
      }
    }
    return "light";
  });

  const getPreferredTheme = () => {
    // Detects system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      return setTheme("light");
    } else if (theme === "light") {
      return setTheme("dark");
    } else {
      return setTheme("light");
    }
  };

  useEffect(() => {
    try {
      const element = document.documentElement;
      Cookies.set("theme", theme);
      if (theme === "dark") {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    } catch (error) {
      console.warn("error setting theme in localStorage:", error);
    }
  }, [theme]);

  return (
    <ApplicationContext.Provider
      value={{ increment, setIncrement, theme, toggleTheme }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default AppContext;
