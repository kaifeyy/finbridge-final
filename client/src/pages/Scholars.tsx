import { useState } from "react";
import { MotionContainer, MotionItem } from "@/components/Motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, LineChart, ShieldCheck, Trophy, CheckCircle2, Briefcase, Target, BarChart3, Users } from "lucide-react";

export default function Scholars() {
  const [open, setOpen] = useState(false);

  const eligibility = [
    "Enrolled in a bachelor's degree in Finance, Accounting & Finance, or related field at a recognized university.",
    "Active participant of the Student-Managed Investment Fund (SMIF).",
    "Consistent performance in portfolio analysis, asset allocation, and risk management.",
    "Exhibits strong ethics, teamwork, and leadership within the fund.",
    "Maintains satisfactory academic standing and commitment to professional development.",
  ];

  const responsibilities = [
    "Conduct in-depth equity research and maintain financial models for assigned sectors.",
    "Participate in portfolio strategy discussions and contribute to decisions.",
    "Prepare investment reports and presentations for FinBridge leadership.",
    "Uphold responsible investing, transparency, and long-term value creation.",
  ];

  const awards = [
    "A financial scholarship recognizing academic and professional merit.",
    "Certificate of Distinction endorsed by FinBridge.",
    "Mentorship with experienced finance and investment professionals.",
    "Potential preference for internships or roles within FinBridge or affiliates.",
  ];

  return (
    <MotionContainer className="bg-background min-h-screen py-20" data-testid="page-scholars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <MotionItem>
          <div className="relative overflow-hidden rounded-xl gradient-card border border-border p-10 mb-12">
            <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-success/10 blur-2xl" />
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-sm font-medium"><GraduationCap size={16} /> Scholars</div>
            <h1 className="text-4xl font-bold text-foreground mb-3">FinBridge Scholars Program</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Advancing financial education and fostering young investment talent through a performance-based scholarship for exceptional SMIF participants.
            </p>
          </div>
        </MotionItem>

        {/* Overview & Objective */}
        <MotionItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="hover-lift">
              <CardHeader>
                <div className="mb-2 w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center"><GraduationCap size={18} /></div>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Recognizing analytical excellence, promoting ethical investing, and building a pipeline of future leaders for a transparent and progressive financial ecosystem in Pakistan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 leading-relaxed">
                  The program celebrates high-performing SMIF participants who demonstrate strong quantitative insight, rigorous analysis, and principled decision-making.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <div className="mb-2 w-10 h-10 rounded-full bg-success/10 text-success grid place-items-center"><Target size={18} /></div>
                <CardTitle>Program Objective</CardTitle>
                <CardDescription>
                  Bridging academic knowledge with practical experience to nurture analytical talent and future leaders in Pakistan’s capital markets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 leading-relaxed">
                  FinBridge connects classroom learning with real portfolio responsibility, equipping scholars to contribute meaningfully to the investment landscape.
                </p>
              </CardContent>
            </Card>
          </div>
        </MotionItem>

        {/* Eligibility, Responsibilities, Awards */}
        <MotionItem>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <Card className="hover-lift">
              <CardHeader>
                <div className="mb-2 w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center"><ShieldCheck size={18} /></div>
                <CardTitle>Eligibility Criteria</CardTitle>
                <CardDescription>What we look for in candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-foreground/90">
                  {eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 text-success" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <div className="mb-2 w-10 h-10 rounded-full bg-success/10 text-success grid place-items-center"><Briefcase size={18} /></div>
                <CardTitle>Key Responsibilities</CardTitle>
                <CardDescription>Role within SMIF</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-foreground/90">
                  {responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 text-primary" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <div className="mb-2 w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 grid place-items-center"><Trophy size={18} /></div>
                <CardTitle>Awards & Recognition</CardTitle>
                <CardDescription>What selected scholars receive</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-foreground/90">
                  {awards.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 text-success" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </MotionItem>

        {/* Scholar Tracks */}
        <MotionItem>
          <div className="bg-card rounded-xl p-8 border border-border mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Scholar Tracks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="relative overflow-hidden hover-lift">
                <div className="absolute -right-8 -top-8 w-28 h-28 bg-primary/10 rounded-full" />
                <CardHeader>
                  <div className="mb-2 w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center"><BarChart3 size={18} /></div>
                  <CardTitle>Equity Research</CardTitle>
                  <CardDescription>Modeling, sector analysis, and valuation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/90">
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-primary" />Financial modeling</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-primary" />Sector deep dives</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-primary" />Valuation frameworks</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover-lift">
                <div className="absolute -right-8 -top-8 w-28 h-28 bg-success/10 rounded-full" />
                <CardHeader>
                  <div className="mb-2 w-10 h-10 rounded-full bg-success/10 text-success grid place-items-center"><ShieldCheck size={18} /></div>
                  <CardTitle>Risk & Portfolio</CardTitle>
                  <CardDescription>Risk metrics and diversification</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/90">
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-success" />Drawdown & volatility</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-success" />Position sizing</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-success" />Performance attribution</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover-lift">
                <div className="absolute -right-8 -top-8 w-28 h-28 bg-secondary/30 rounded-full" />
                <CardHeader>
                  <div className="mb-2 w-10 h-10 rounded-full bg-secondary text-foreground grid place-items-center"><Users size={18} /></div>
                  <CardTitle>Market Intelligence</CardTitle>
                  <CardDescription>Trends, signals, and reporting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/90">
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-primary" />Macro & sector updates</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-primary" />Signal tracking</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-primary" />Executive reporting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </MotionItem>

        {/* CTA Apply */}
        <MotionItem>
          <div className="glass-dark rounded-xl p-12 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Apply as a FinBridge Scholar?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join a high-performance learning track with mentorship, research rigor, and real portfolio experience.
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover-lift text-lg" data-testid="button-apply-scholars">
                  Apply Now <ArrowRight className="inline ml-2" size={20} />
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Apply to FinBridge Scholars Program</DialogTitle>
                  <DialogDescription>Please fill out the form below and our team will reach out.</DialogDescription>
                </DialogHeader>

                <form onSubmit={(e) => { e.preventDefault(); setOpen(false); (e.target as HTMLFormElement).reset(); }}>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <Input name="name" placeholder="Full name" required />
                    <Input name="email" type="email" placeholder="Email address" required />
                    <Input name="university" placeholder="University / Affiliation" />
                    <Textarea name="message" placeholder="Tell us why you want to join" />
                  </div>

                  <DialogFooter>
                    <div className="flex w-full justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Submit</Button>
                    </div>
                  </DialogFooter>
                </form>

              </DialogContent>
            </Dialog>
          </div>
        </MotionItem>
      </div>
    </MotionContainer>
  );
}
