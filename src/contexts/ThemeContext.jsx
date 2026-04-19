import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return true;

        const storedTheme = window.localStorage.getItem("periodic-theme");
        if (storedTheme === "dark") return true;
        if (storedTheme === "light") return false;

        // Keep dark mode on by default
        return true;
    });

    useEffect(() => {
        window.localStorage.setItem("periodic-theme", isDark ? "dark" : "light");
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
