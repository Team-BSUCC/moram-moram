import AnimatedSection from '@/components/landing/animated-section';
import HeroSection from '@/components/landing/hero-section';
import IntroSection from '@/components/landing/intro-sercion';
import MandalartExplainSection from '@/components/landing/mandalart-explain-section';
import TodoEditorSection from '@/components/landing/todo-editor-section';
import ProgressSection from '@/components/landing/progress-section';
import CalendarSection from '@/components/landing/calendar-section';
import TeamPlanningSection from '@/components/landing/team-planning-section';
import CTASection from '@/components/landing/cta-section';

const HomePage = async () => {
  return (
    <div className='scroll-snap-y h-screen w-[100dvw] snap-mandatory scroll-smooth'>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <IntroSection />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <MandalartExplainSection />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <TodoEditorSection />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <ProgressSection />
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <CalendarSection />
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <TeamPlanningSection />
      </AnimatedSection>

      <AnimatedSection delay={0.7}>
        <CTASection />
      </AnimatedSection>
    </div>
  );
};

export default HomePage;
