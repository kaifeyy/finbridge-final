import { motion } from "framer-motion";
import { ArrowRight, Filter, Users, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import { MotionContainer, MotionItem } from "@/components/Motion";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen" data-testid="section-hero">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200"
            alt="Modern financial district skyline"
            className="w-full h-full object-cover object-center opacity-55 dark:opacity-45"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center py-0">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full">
            <MotionContainer className="text-center max-w-4xl mx-auto">
              <MotionItem>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight" style={{ font: '700 60px/60px "Times New Roman", serif' }}>
                  <div style={{ fontFamily: 'Times New Roman, serif' }}>
                    Bringing Wall Street to{" "}
                  </div>
                  <div className="inline font-bold" style={{ color: 'rgba(25, 95, 255, 1)' }}>
                    Every Street
                  </div>
                </h1>
              </MotionItem>

              <MotionItem>
                <div style={{ fontFeatureSettings: 'normal', maxWidth: '768px', font: 'italic 400 20px/28px "Times New Roman", serif' }} className="mx-auto mb-8 mt-auto pb-5 lg:mt-0 lg:pb-0">
                  Our mission is to bridge the gap between knowledge and capital markets by offering cutting-edge screening tools and a first-of-its-kind Student Managed Investment Fund, fostering financial literacy and confident investing.
                </div>
              </MotionItem>

              <MotionItem />
            </MotionContainer>
          </motion.div>

        </div>
      </section>


      {/* Features Section */}
      <section id="section-features" className="max-w-7xl mx-auto px-6 py-20" data-testid="section-features">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Tools for Smart Investing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make informed investment decisions in Pakistan's stock market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stock Screener */}
          <MotionItem className="bg-card rounded-xl p-8 border border-border hover-lift" whileHover={{ y: -4 }} data-testid="card-feature-screener">
            <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
              <Filter className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Stock Screener</h3>
            <p className="text-muted-foreground mb-4">
              Discover stocks with our advanced screening tool powered by 20+ performance and risk indicators. Designed for both beginners and experienced investors.
            </p>
            <Link href="/screener" className="text-primary font-semibold hover:underline inline-flex items-center" data-testid="link-explore-screener">
              <span className="font-serif lg:font-sans">Explore Screener </span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </MotionItem>

          {/* MAYS SMIF */}
          <MotionItem className="bg-card rounded-xl p-8 border border-border hover-lift" whileHover={{ y: -4 }} data-testid="card-feature-smif">
            <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
              <Users className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">MAYS SMIF</h3>
            <p className="text-muted-foreground mb-4">
              Pakistan's first Student Managed Investment Fund. A unique opportunity for students to learn by managing a real portfolio.
            </p>
            <Link href="/smif" className="text-primary font-semibold hover:underline inline-flex items-center" data-testid="link-join-smif">
              <span className="font-serif lg:font-sans">Join Now </span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </MotionItem>

          {/* Education */}
          <MotionItem className="bg-card rounded-xl p-8 border border-border hover-lift" whileHover={{ y: -4 }} data-testid="card-feature-learn">
            <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Learn Before Invest</h3>
            <p className="text-muted-foreground mb-4">
              Financial literacy is the foundation of smart investing. Access guides, courses, and insights to understand market concepts and strategies.
            </p>
            <Link href="/learn" className="text-primary font-semibold hover:underline inline-flex items-center" data-testid="link-start-learning">
              <span className="font-serif lg:font-sans">Start Learning </span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </MotionItem>
        </div>
      </section>
    </div>
  );
}
