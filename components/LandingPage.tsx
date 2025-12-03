import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart3, Users, TrendingUp, Shield, Zap, Globe } from "lucide-react"
import Link from "next/link"


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-8 text-accent" />
              <span className="text-xl font-semibold text-foreground">
                DashMetrics
              </span>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
            Transform Your Data Into{" "}
            <span className="text-accent">Actionable Insights</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty max-w-2xl mx-auto">
            The complete analytics dashboard for modern teams. Visualize
            metrics, track performance, and make data-driven decisions with
            confidence.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[160px]"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[160px] bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground text-balance">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Powerful features designed to help you work smarter, not harder
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <BarChart3 className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              Real-time Analytics
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Monitor your metrics in real-time with customizable dashboards and
              instant updates.
            </p>
          </Card>

          <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Users className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              Team Collaboration
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Work together seamlessly with shared dashboards and role-based
              access control.
            </p>
          </Card>

          <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <TrendingUp className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              Advanced Reporting
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Generate comprehensive reports with powerful filtering and export
              capabilities.
            </p>
          </Card>

          <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Shield className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              Enterprise Security
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Bank-level encryption and compliance with SOC 2, GDPR, and
              industry standards.
            </p>
          </Card>

          <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Zap className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              Lightning Fast
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Optimized performance ensures your data loads instantly, no matter
              the volume.
            </p>
          </Card>

          <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Globe className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              Global Scale
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Deploy anywhere with edge computing and multi-region support
              worldwide.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-primary text-primary-foreground p-12 text-center">
          <h2 className="text-3xl font-bold text-balance">
            Ready to transform your workflow?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 text-pretty max-w-2xl mx-auto">
            Join thousands of teams already using DashMetrics to make better
            decisions faster.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="min-w-[160px]">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[160px] border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="size-6 text-accent" />
                <span className="font-semibold text-foreground">
                  DashMetrics
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Analytics made simple for teams of all sizes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 DashMetrics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
