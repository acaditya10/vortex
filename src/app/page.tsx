import Hero from "@/components/Hero";
import CustomCursor from "@/components/CustomCursor";
import GridBackground from "@/components/GridBackground";
import SystemExhibits from "@/components/SystemExhibits";
import TerminalClose from "@/components/TerminalClose";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <GridBackground />
      <Hero />
      <SystemExhibits />
      <TerminalClose />
    </>
  );
}
