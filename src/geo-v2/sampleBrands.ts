import brandSephora from '../assets/identity-step/brand-sephora.png'
import brandRei from '../assets/identity-step/brand-rei.png'
import brandOlipop from '../assets/identity-step/brand-olipop.png'

/**
 * The brands the landing page offers as a shortcut into the flow.
 *
 * They used to be three chips with no click handler, sitting under a label
 * that said "Try a sample brand" — a promise the page could not keep. Two
 * things were missing: somewhere for a click to go, and a topic. A scan is a
 * brand *and* a topic, so a chip on its own only answers half the question;
 * the topic here is the half we answer on their behalf, and the confirm
 * screen is where we say so.
 *
 * None of them reaches a finished report, and that is deliberate rather than
 * unfinished. The prototype holds exactly one scan — Tread's — and everything
 * in it, down to the summary sentence, is built on that brand. So a sample
 * runs the real flow and stops at a placeholder, instead of dressing Tread's
 * numbers up as somebody else's. Giving these brands real reports is a content
 * job, one dataset each; the placeholder is what says so until someone does it.
 *
 * Tread itself is not a chip. It is already the worked example the main flow
 * walks through, so offering it here would be the same demo twice.
 *
 * Deliberately three different categories. Three brands from one category
 * would demonstrate depth nobody asked about; beauty, outdoor and drinks say
 * "this works for whoever you are", which is the question a visitor has.
 */
export type SampleBrand = {
  name: string
  /** The half of the scan the chip cannot answer. */
  topic: string
  logo: string
  /** Logos that need fitting rather than filling their circle. */
  contain?: boolean
  /** Four, matching the loading screen's cadence — it steps through them one
   *  at a time per engine. */
  prompts: string[]
  /**
   * Runs the scan straight off the chip, with no confirmation in between.
   *
   * One brand is wired this way on purpose, so the two shapes can be walked
   * back to back: Sephora goes chip → loading → report, the other two stop to
   * show what is about to run. The argument for confirming is that a chip only
   * answers the brand and we pick the topic; the argument against is that a
   * sample should cost one click. Easier to judge from the prototype than from
   * a description, so both are in it.
   */
  skipConfirm?: boolean
}

export const SAMPLE_BRANDS: SampleBrand[] = [
  {
    name: 'Sephora',
    topic: 'Everyday sunscreen',
    logo: brandSephora,
    skipConfirm: true,
    prompts: [
      'Best everyday sunscreen for face?',
      'Lightweight SPF 50 with no white cast',
      'Sephora vs Ulta for sunscreen',
      'Best sunscreen for sensitive skin reviews',
    ],
  },
  {
    name: 'REI',
    topic: 'Backpacking tents',
    logo: brandRei,
    prompts: [
      'Best backpacking tent for two people?',
      'Lightest three-season tent under 3 pounds',
      'REI vs Big Agnes backpacking tents',
      'Best value backpacking tent reviews',
    ],
  },
  {
    name: 'Olipop',
    topic: 'Prebiotic soda',
    logo: brandOlipop,
    contain: true,
    prompts: [
      'Best prebiotic soda brands?',
      'Healthiest soda alternative with low sugar',
      'Olipop vs Poppi which is better',
      'Prebiotic soda gut health reviews',
    ],
  },
]

export const sampleByName = (name: string): SampleBrand | undefined =>
  SAMPLE_BRANDS.find((b) => b.name === name)
