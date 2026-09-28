import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {},
});

/**
 * Reads the saved preference from localStorage, falls back to dark.
 * Also syncs the `dark` class on <html> immediately (before React paints)
 * to avoid a flash-of-wrong-theme.
 */
function getInitialTheme() {
    if (typeof window === "undefined") return true;

    const stored = window.localStorage.getItem("periodic-theme");
    if (stored === "light") return false;
    if (stored === "dark") return true;

    // default → dark
    return true;
}

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(getInitialTheme);

    // Sync <html> class + localStorage whenever isDark changes
    useEffect(() => {
        const root = document.documentElement;
        window.localStorage.setItem("periodic-theme", isDark ? "dark" : "light");

        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDark]);

    const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
