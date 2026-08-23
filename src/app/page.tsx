import Hero from "@/components/Hero";
import CustomCursor from "@/components/CustomCursor";
import GridBackground from "@/components/GridBackground";
import SystemExhibits from "@/components/SystemExhibits";
import Capabilities from "@/components/Capabilities";
import Protocol from "@/components/Protocol";
import Operator from "@/components/Operator";
import Answers from "@/components/Answers";
import TerminalClose from "@/components/TerminalClose";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <GridBackground />
      <Hero />
      <SystemExhibits />
      <Capabilities />
      <Protocol />
      <Operator />
      <Answers />
      <TerminalClose />
    </>
  );
}
