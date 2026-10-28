import Exhibit from './Exhibit';
import Agitator from './Agitator';
import { PROJECTS } from '@/lib/work';

export default function SystemExhibits() {
  return (
    <section id="work" className="relative z-10 bg-[var(--bg)]">
      {PROJECTS.map((project, i) => (
        <div key={project.slug}>
          <Exhibit
            index={project.index}
            name={project.name}
            hook={project.hook}
            quote={project.quote}
            quoteAuthor={project.quoteAuthor}
            quoteRole={project.quoteRole}
            metaLine={project.metaLine}
            href={project.href}
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            reversed={project.reversed}
            caseStudyHref={`/work/${project.slug}`}
          />
          {i === 0 && <Agitator />}
        </div>
      ))}

      {/* Cross-link to contact */}
      <div className="border-t border-white/5 bg-[var(--bg)] px-6 py-12 sm:px-10 lg:pl-[7vw] lg:pr-[7vw]">
        <a
          href="#contact"
          data-cursor-hover
          className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg-muted)]"
        >
          WANT SOMETHING LIKE THIS? START A BUILD →
        </a>
      </div>
    </section>
  );
}
