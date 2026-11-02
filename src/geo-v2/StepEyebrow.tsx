/**
 * "Step 1 of 2", above the headline on the two setup screens.
 *
 * Only the paid path passes it. Someone on the free path is answering two
 * questions and then getting a scan, and can stop whenever they like — there
 * is nothing to count down to. Someone who came from the pricing page is
 * answering the same two questions *before* paying, with no idea how many
 * there are or that checkout is at the end, which is the disorientation this
 * is for. Counting the steps is what a welcome modal would have been trying
 * to say, minus the click.
 */
export default function StepEyebrow({ n, of }: { n: number; of: number }) {
  return (
    <span
      data-step={`${n}/${of}`}
      style={{
        color: 'var(--content-secondary)',
        fontSize: 'var(--text-accent-tight-300-font-size)',
        fontWeight: 500,
        letterSpacing: '0.5px',
        lineHeight: 1.4,
        textTransform: 'uppercase',
      }}
    >
      Step {n} of {of}
    </span>
  )
}
