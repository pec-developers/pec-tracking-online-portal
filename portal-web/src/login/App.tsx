import { Button } from "@/shared/components/ui/button"
import { ThemeToggle } from "@/shared/components/theme-toggle"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-3xl font-bold">PECTOP - Login</h1>
      <div className="flex gap-2">
        <Button>Sign In</Button>
        <Button variant="outline">Register</Button>
        <Button variant="secondary">Help</Button>
      </div>
    </div>
  )
}

export default App
