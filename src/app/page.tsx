import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { Differentials } from "@/components/sections/Differentials";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StitchDivider } from "@/components/ui/StitchDivider";

/**
 * A página.
 *
 * O fio condutor: entre uma seção e outra, um pesponto atravessa a tela
 * e conduz o visitante para a próxima parte — a mesma linha que o
 * bastidor do Hero começou a bordar.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <StitchDivider />
      <Services />
      <StitchDivider knot={false} />
      <Portfolio />
      <About />
      <Differentials />
      <Process />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
