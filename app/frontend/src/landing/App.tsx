import { Button } from "@/shared/components/ui/button"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { GraduationCap, Users, BookOpen, ShieldCheck, ArrowRight } from "lucide-react"

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL

const portals = [
    {
        title: "Student Portal",
        description: "Access your academic records, attendance, and course materials.",
        icon: GraduationCap,
        color: "from-blue-500 to-indigo-600",
    },
    {
        title: "Parent Portal",
        description: "Track your ward's progress, attendance, and communicate with faculty.",
        icon: Users,
        color: "from-emerald-500 to-teal-600",
    },
    {
        title: "Faculty Portal",
        description: "Manage courses, mark attendance, and publish grades.",
        icon: BookOpen,
        color: "from-amber-500 to-orange-600",
    },
]

function App() {
    return (
        <div className="min-h-svh bg-background text-foreground">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-7 w-7 text-primary" />
                        <span className="text-xl font-bold tracking-tight">PECTOP</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Button asChild>
                            <a href={LOGIN_URL}>Sign In</a>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
                <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4" />
                        PEC Tracking Online Portal
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                        Your Academic Journey,{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Simplified
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                        A unified platform for students, parents, and faculty to track
                        academic progress, attendance, and stay connected — all in one place.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-4">
                        <Button size="lg" asChild>
                            <a href={LOGIN_URL}>
                                Get Started <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Portal Cards — informational only, all link to login */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        One Login, Three Portals
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        Sign in once and you'll be redirected to the right portal based on your role.
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {portals.map((portal) => (
                        <div
                            key={portal.title}
                            className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div
                                className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${portal.color} p-3 text-white shadow-md`}
                            >
                                <portal.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold">{portal.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {portal.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t">
                <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} PECTOP — PEC Tracking Online Portal. All
                    rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default App
