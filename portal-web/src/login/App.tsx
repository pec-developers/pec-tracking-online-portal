import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { ShieldCheck, GraduationCap, Users, BookOpen, ArrowLeft } from "lucide-react"

const LANDING_URL = import.meta.env.VITE_LANDING_URL

const roles = [
  {
    id: "student",
    title: "Student",
    icon: GraduationCap,
    href: import.meta.env.VITE_STUDENT_URL,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "parent",
    title: "Parent",
    icon: Users,
    href: import.meta.env.VITE_PARENT_URL,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "faculty",
    title: "Faculty",
    icon: BookOpen,
    href: import.meta.env.VITE_FACULTY_URL,
    color: "from-amber-500 to-orange-600",
  },
]

function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return
    const role = roles.find((r) => r.id === selectedRole)
    if (role) {
      window.location.href = role.href
    }
  }

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Header */}
      <nav className="flex h-16 items-center justify-between border-b px-6">
        <a href={LANDING_URL} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">PECTOP</span>
        </a>
        <ThemeToggle />
      </nav>

      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-lg">
          <div className="mb-6 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
            <h1 className="mt-3 text-2xl font-bold">Welcome Back</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in and select your role to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@pec.edu"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
              />
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-sm transition-all hover:shadow-md ${selectedRole === role.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                        : "hover:bg-accent"
                      }`}
                  >
                    <div
                      className={`rounded-md bg-gradient-to-br ${role.color} p-1.5 text-white`}
                    >
                      <role.icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{role.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!selectedRole}>
              Sign In
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default App
