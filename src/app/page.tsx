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
    <>
      <HeroSection />
      <IntroSection />
      <MandalartExplainSection />
      <TodoEditorSection />
      <ProgressSection />
      <CalendarSection />
      <TeamPlanningSection />
      <CTASection />
    </>
  );
};

export default HomePage;
