import Section from "../components/layout/section/Section";
import FAQs from "../components/support/FAQs/FAQ";
import Hero from "../components/support/hero/Hero";

export default function Support() {
  return (
    <>
      <Section className="bg-gray-100 dark:bg-[#0b1220]">
        <Hero />
      </Section>
      <Section className="bg-white dark:bg-[#070d17]">
        <FAQs />
      </Section>
    </>
  );
}
