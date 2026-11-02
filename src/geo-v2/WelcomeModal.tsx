import { useState } from 'react'
import { Button, Modal } from 'design-system'

/**
 * The first thing on the paid path after the magic link.
 *
 * Clicking a link in an email is a context break — a different tab, maybe a
 * different device, minutes later — so the screen underneath opens by asking
 * "Which best describes you?" with nothing to say the sign-in worked. A line
 * on the page said it, but got lost between the eyebrow and the headline.
 *
 * Three lines and a button: the greeting, the account, the way out. The flow's
 * shape (two questions, then payment) is already carried by the step eyebrow
 * and the final button's own label, so repeating it here would make a dialog
 * out of something the screens say for themselves.
 *
 * Shown once per arrival rather than on every visit to the screen: it is a
 * greeting, and a greeting repeated is an obstacle.
 */
export default function WelcomeModal({ email, onStart }: { email: string; onStart?: () => void }) {
  const [open, setOpen] = useState(true)

  const close = () => {
    setOpen(false)
    onStart?.()
  }

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) close()
      }}
      size="small"
      title="Welcome to Gist GEO"
      // No close X. Radix focuses the first tabbable element on open, and in
      // Modal's markup that is the header's X — so the greeting opened with a
      // focus ring around the dismiss button, pointing at the way out before
      // the way forward. With the X gone, focus lands on Get started instead,
      // and Escape and a click outside still close it.
      dismissible={false}
      footer={
        <Button type="primary" size="large" data-welcome="start" onClick={close}>
          Get started
        </Button>
      }
    >
      <p style={{ color: 'var(--content-secondary)', lineHeight: 1.6 }}>
        You&rsquo;re signed in as <span style={{ color: 'var(--content-default)' }}>{email}</span>.
      </p>
    </Modal>
  )
}
