import { Leaf, Brain } from "lucide-react";
import { MotionContainer, MotionItem } from "@/components/Motion";

const teamMembers = [
  {
    title: 'Chairman & CEO',
    description: 'Provides overall vision and direction, combining entrepreneurial drive with strategic leadership for long-term value creation.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg',
  },
  {
    title: 'Chief Investment Officer',
    description: 'Leads investment strategy, overseeing portfolio design, market research, and asset allocation with data-driven insights.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg',
  },
  {
    title: 'Chief Technology Officer',
    description: 'Drives technological innovation, building advanced infrastructure for our stock screener platform.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg',
  },
  {
    title: 'Chief Risk Officer',
    description: 'Manages risk across all investment areas, balancing opportunity with caution through rigorous analysis.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg',
  },
  {
    title: 'Chief Compliance Officer',
    description: 'Ensures operations meet highest ethics standards and regulatory requirements, strengthening trust.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg',
  },
  {
    title: 'Head of Sales & Client Relations',
    description: 'Leads outreach, partnerships, and client engagement, building relationships that power our growth.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg',
  },
];

export default function About() {
  return (
    <MotionContainer className="bg-muted min-h-screen py-20" data-testid="page-about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">About <span style={{ fontFamily: 'Times New Roman, serif' }}>FINBRIDGE</span></h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging the gap between knowledge and capital markets
          </p>
        </div>

        {/* Philosophy */}
        <MotionItem className="bg-card rounded-xl p-8 border border-border mb-12 hover-lift transition-transform duration-200">
          <div className="flex items-start">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundImage: 'linear-gradient(135deg, rgb(54, 143, 231) 0%, rgb(25, 117, 210) 100%)' }}>
              <Brain className="text-white" size={28} />
            </div>

            <div style={{ marginLeft: 16 }}>
              <div className="text-2xl font-semibold text-foreground mb-4">Our Philosophy</div>
              <div className="text-lg text-muted-foreground" style={{ lineHeight: '1.8' }}>
                We believe investing should be transparent, accessible, and rooted in sound principles. Our philosophy centers on empowering individuals through knowledge and data-driven tools, enabling smarter and more confident decisions. By combining modern screening methods with long-term strategies, we help investors navigate markets with clarity and purpose.
              </div>
            </div>
          </div>
        </MotionItem>

        {/* ESG Commitment */}
        <MotionItem className="bg-card rounded-xl p-8 border border-border mb-12 hover-lift transition-transform duration-200">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Leaf className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Our Commitment to ESG</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We recognize that true investment success goes beyond financial returns. That's why we prioritize Environmental, Social, and Governance (ESG) principles, focusing on companies that are not only profitable but also responsible. Our commitment is to direct capital toward businesses that create sustainable value, foster innovation, and contribute positively to society and the environment.
              </p>
            </div>
          </div>
        </MotionItem>

        {/* Team */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <MotionItem key={index} className="bg-card rounded-xl p-6 border border-border hover-lift" data-testid={`card-team-${index}`}>
                <img
                  src={member.image}
                  alt={member.title}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-bold text-foreground text-center mb-2">{member.title}</h4>
                <p className="text-sm text-muted-foreground text-center">{member.description}</p>
              </MotionItem>
            ))}
          </div>
        </div>
      </div>
    </MotionContainer>
  );
}
