import OpenAccount from "../components/common/OpenAccount";
import Education from "../components/home/education/Education";
import Hero from "../components/home/hero/Hero";
import Pricing from "../components/home/pricing/Index";
import Stats from "../components/home/stats/Index";
import Section from "../components/layout/section/Section";
import { useAuth } from "../context/Auth/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();
  return (
    <>
      <Section>
        <Hero />
      </Section>
      <Section>
        <Stats />
      </Section>
      <Section>
        <Pricing />
      </Section>
      <Section>
        <Education />
      </Section>
      {!currentUser && (
        <Section>
          <OpenAccount />
        </Section>
      )}
    </>
  );
}
