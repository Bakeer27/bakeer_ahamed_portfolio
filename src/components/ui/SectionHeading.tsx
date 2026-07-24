interface SectionHeadingProps {
  eyebrow: string;
  word: string;
  className?: string;
}

/**
 * Chapter anchor: numbered mono eyebrow + one bold display word.
 * Each major section opens with this — the site's scroll rhythm.
 */
export default function SectionHeading({ eyebrow, word, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p data-reveal className="type-label-gold gsap-reveal mb-4">
        {eyebrow}
      </p>
      <h2 data-reveal className="type-display-lg gsap-reveal">
        {word}
      </h2>
    </div>
  );
}
