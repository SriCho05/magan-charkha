
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [isDark, setIsDark] = React.useState(theme === "dark")

  React.useEffect(() => {
    setIsDark(theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    setIsDark(!isDark)
    // Add a slight delay to allow the animation to start before the theme class changes.
    setTimeout(() => {
        setTheme(newTheme)
    }, 150)
  }


  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
        <Sun className={`h-[1.2rem] w-[1.2rem] transform transition-all duration-500 ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
        <Moon className={`absolute h-[1.2rem] w-[1.2rem] transform transition-all duration-500 ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
        <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
