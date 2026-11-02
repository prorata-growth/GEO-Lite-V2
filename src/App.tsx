import { useEffect, useLayoutEffect, useState } from 'react'

// ── v2: a full copy of the GEO flow, for visual reworking without touching v1
import V2GeoSearchScreen from './geo-v2/GeoSearchScreen'
import V2BrandTrackingScreen from './geo-v2/BrandTrackingScreen'
import V2TopicScreen, { type Audience } from './geo-v2/TopicScreen'
import V2GeoLoadingScreen from './geo-v2/GeoLoadingScreen'
import V2GeoReportPageV2 from './geo-v2/GeoReportPageV2'
import V2GeoFullReportScreen from './geo-v2/GeoFullReportScreen'
import V2EnterpriseScreen from './geo-v2/EnterpriseScreen'
import V2GeoCheckEmailScreen from './geo-v2/GeoCheckEmailScreen'
import V2GeoQualifyScreen from './geo-v2/GeoQualifyScreen'
import V2GeoAuthScreen from './geo-v2/GeoAuthScreen'
import V2GeoPlansScreen from './geo-v2/GeoPlansScreen'
import V2GeoSalesScreen from './geo-v2/GeoSalesScreen'
import V2GeoCheckoutScreen from './geo-v2/GeoCheckoutScreen'
import V2GeoPaymentCompleteScreen from './geo-v2/GeoPaymentCompleteScreen'
import V2GeoScopeScreen from './geo-v2/GeoScopeScreen'
import V2GeoSampleReportScreen from './geo-v2/GeoSampleReportScreen'
import { SAMPLE_BRANDS, sampleByName, type SampleBrand } from './geo-v2/sampleBrands'

/** The sample named in the hash, if the current route carries one. */
function sampleFromHash(): SampleBrand | null {
  const name = window.location.hash.split('/')[1]
  return name ? (sampleByName(decodeURIComponent(name)) ?? null) : null
}
import V2GeoOnboardingScreen from './geo-v2/GeoOnboardingScreen'
import V2GeoScanEmailScreen from './geo-v2/GeoScanEmailScreen'

function getView() {
  if (window.location.hash === '#v2-geoscreen') return 'v2-geoscreen'
  if (window.location.hash === '#v2-brandscreen') return 'v2-brandscreen'
  if (window.location.hash === '#v2-topicscreen') return 'v2-topicscreen'
  if (window.location.hash === '#v2-scanemail') return 'v2-scanemail'
  if (window.location.hash === '#v2-geoloading') return 'v2-geoloading'
  if (window.location.hash === '#v2-georeport') return 'v2-georeport'
  if (window.location.hash === '#v2-georeportfull') return 'v2-georeportfull'
  if (window.location.hash === '#v2-enterprise') return 'v2-enterprise'
  if (window.location.hash === '#v2-georeportshared') return 'v2-georeportshared'
  if (window.location.hash === '#v2-geocheckemail') return 'v2-geocheckemail'
  if (window.location.hash === '#v2-qualify') return 'v2-qualify'
  if (window.location.hash === '#v2-geodemo') return 'v2-geodemo'
  if (window.location.hash === '#v2-geologin') return 'v2-geologin'
  if (window.location.hash === '#v2-geoplans') return 'v2-geoplans'
  if (window.location.hash === '#v2-sales') return 'v2-sales'
  if (window.location.hash === '#v2-geoscope') return 'v2-geoscope'
  if (window.location.hash.startsWith('#v2-samplereport')) return 'v2-samplereport'
  if (window.location.hash.startsWith('#v2-sample')) return 'v2-sample'
  if (window.location.hash === '#v2-generating') return 'v2-generating'
  if (window.location.hash === '#v2-scopebrand') return 'v2-scopebrand'
  if (window.location.hash === '#v2-scopetopic') return 'v2-scopetopic'
  if (window.location.hash === '#v2-onboarding') return 'v2-onboarding'
  if (window.location.hash === '#v2-checkout') return 'v2-checkout'
  if (window.location.hash === '#v2-paid') return 'v2-paid'
  if (window.location.hash === '#v2-booked') return 'v2-booked'
  // No hash — i.e. the bare URL a hosted build is opened on — starts the revised
  // GEO Onboarding flow. The first cut is still at #geoscreen, the stall demo at
  // #stallhome.
  if (window.location.hash === '' || window.location.hash === '#') return 'v2-geoscreen'
  return 'flow'
}

/** The address the flow shows when nobody has actually signed up this session
 *  — the same one the checkout and payment screens print. */
const DEMO_EMAIL = 'axlrose@gnr.com'

function App() {
  const [view, setView] = useState(getView)
  /** Survives hash changes because App never unmounts across them. Deep links
   *  into the middle of the paid path skip sign-up, so screens that name the
   *  account fall back to the same stand-in address the rest of the flow
   *  uses rather than showing a gap. */
  const [authEmail, setAuthEmail] = useState('')
  /** Whether a report has actually been generated this session — a booking made
   *  from the landing page has nothing to go "back" to. */
  const [hasReport, setHasReport] = useState(false)
  /** Which door they came through, since sign-up is the same screen for all
   *  three and only the destination differs:
   *
   *    'direct'    cold from pricing. A new user, so they answer the same two
   *                half-split screens the free path uses, then pay.
   *    'upgrade'   from a free scan. Those answers already exist, so they pay
   *                first and confirm them after.
   *    'platform'  from the report's Gist GEO Pro block. Nothing is being
   *                bought — sign-up lands in the product itself.
   */
  const [signupEntry, setSignupEntry] = useState<'direct' | 'upgrade' | 'platform'>('direct')
  /** Which of Brand / Publisher / Creator / Agency the first step answered.
   *  Carried so the topic screen can say the scan back in their terms — the
   *  question used to be asked and then dropped. */
  const [audience, setAudience] = useState<Audience>('Brand')
  /**
   * The sample the landing chip picked. Carries its own topic and prompts, so
   * the loading screen queries that category rather than marathon shoes.
   *
   * Seeded from the hash, because React state does not survive a refresh and
   * the sample screens were coming back with an empty brand. The name rides in
   * the hash (`#v2-sample/Olipop`) so reloading, or opening the link cold,
   * lands on the same review.
   */
  const [sample, setSample] = useState<SampleBrand | null>(() => sampleFromHash())
  /** The brand the paid report is for. Known from the free scan on the upgrade
   *  path; asked for on the direct one. */
  const [scopeBrand, setScopeBrand] = useState('')
  /** The topic picked on the topic screen, so the scan can name it back.
   *  Lives here because `App` never unmounts across hash changes. */
  const [topic, setTopic] = useState('Marathon shoes')

  /**
   * Every screen starts at its own top.
   *
   * `App` never unmounts across hash changes, so the window keeps whatever
   * scroll the last screen had. Landing on a taller screen therefore opened
   * it part-scrolled: from the bottom of the report, the nav's "Pricing" put
   * the plans page at y=852 with its headline 693px above the fold and the
   * bar itself off screen. Shorter destinations hid it, because the browser
   * clamps to their maximum — so the bug only appeared on the screens with
   * the most above the fold to miss.
   *
   * A layout effect, so it happens before paint and no one sees the new
   * screen at the old screen's offset.
   *
   * The trade-off is the back button: returning to a long report starts at
   * its top rather than where it was left. Restoring per-route positions is
   * the better behaviour and more machinery than a prototype needs — but it
   * is a deliberate trade, not an oversight.
   */
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  useEffect(() => {
    function onHashChange() {
      setView(getView())
      // A sample route names its brand in the hash, so arriving at one by any
      // route other than the chip — a pasted link, the back button — still
      // knows which sample it is reviewing.
      const fromHash = sampleFromHash()
      if (fromHash) {
        setSample(fromHash)
        setTopic(fromHash.topic)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (view === 'v2-geoscreen')
    return (
      <V2GeoSearchScreen
        onContinue={() => {
          // Clears any sample still in state: the loading screen routes on it,
          // so a leftover would send a real scan to the placeholder report.
          setSample(null)
          window.location.hash = '#v2-brandscreen'
        }}
        // A sample skips the two questions because the chip answered one and
        // we answer the other — but it does not skip the confirmation. Landing
        // straight on a report nobody asked a question for gives the reader no
        // way to know what produced it, and the scan is brand *and* topic.
        onSample={(picked) => {
          setSample(picked)
          setTopic(picked.topic)
          // One sample skips the confirmation and runs on the click, so the
          // two shapes can be compared side by side — see `skipConfirm`.
          window.location.hash = picked.skipConfirm
            ? '#v2-geoloading'
            : `#v2-sample/${encodeURIComponent(picked.name)}`
        }}
      />
    )
  if (view === 'v2-sample')
    return (
      <V2GeoScopeScreen
        variant="sample"
        brand={sample?.name ?? ''}
        brandLogo={sample?.logo}
        topic={sample?.topic ?? topic}
        // One row, holding the topic we picked for them. The free scan's five
        // shoe topics would be nonsense under a soda brand, and the custom
        // field below is still there if they want a different one.
        topics={sample ? [{ key: 'sample', label: sample.topic }] : undefined}
        // Changing the brand here stays inside the samples — anything else
        // would let someone pick a brand with no scan behind it.
        samples={SAMPLE_BRANDS}
        // No email step on this path. The whole point of a sample is that it
        // costs nothing to look at; gating it on an address turns the cheapest
        // thing on the page into the most expensive. The ask still happens
        // when someone runs their own.
        onContinue={({ brand, topic: t }) => {
          const next = sampleByName(brand) ?? (sample ? { ...sample, name: brand, topic: t } : null)
          setSample(next)
          setTopic(t)
          window.location.hash = '#v2-geoloading'
        }}
      />
    )
  // A sample runs the real scan and stops here: every brand but Tread has a
  // topic and prompts but no dataset, and showing Tread's numbers under
  // someone else's name is the one thing this must not do.
  if (view === 'v2-samplereport')
    return (
      <V2GeoSampleReportScreen
        brand={sample?.name ?? 'This brand'}
      />
    )
  if (view === 'v2-brandscreen')
    return (
      <V2BrandTrackingScreen
        step={{ n: 1, of: 2 }}
        onContinue={(a) => {
          setAudience(a)
          window.location.hash = '#v2-topicscreen'
        }}
      />
    )
  if (view === 'v2-topicscreen')
    return (
      <V2TopicScreen
        step={{ n: 2, of: 2 }}
        audience={audience}
        // Straight to the scan. The plans page used to sit here, but asking
        // someone to choose a tier before they've seen a single number is a
        // paywall in front of the thing that does the selling — the report's
        // own Unlock is where that decision belongs now.
        onContinue={(t) => {
          setTopic(t)
          // Straight into the scan. The address used to be asked for here,
          // before anything had been produced — so the ask arrived while the
          // reader still had nothing in hand. It now sits after the run,
          // gating the reveal rather than the work.
          window.location.hash = '#v2-geoloading'
        }}
      />
    )
  if (view === 'v2-geoplans')
    return (
      <V2GeoPlansScreen
        onSnapshot={() => (window.location.hash = '#v2-brandscreen')}
        // Cold start: nothing has been scanned, so sign-up is followed by the
        // scope screen and only then payment.
        onFullReport={() => {
          setSignupEntry('direct')
          setScopeBrand('')
          window.location.hash = '#v2-geologin'
        }}
        // straight to the slot picker: that screen is the sales screen, so
        // sending them through the lead form first was a detour
        onSales={() => (window.location.hash = '#v2-sales')}
        onEnterprise={() => (window.location.hash = '#v2-qualify')}
      />
    )
  if (view === 'v2-scanemail')
    return (
      <V2GeoScanEmailScreen
        onContinue={(email) => {
          setAuthEmail(email)
          window.location.hash = '#v2-georeport'
        }}
      />
    )
  // Only the free scan runs through here now — the paid run says it is
  // generating and mails the result instead.
  if (view === 'v2-geoloading')
    return (
      <V2GeoLoadingScreen
        topic={topic}
        prompts={sample?.prompts}
        // The disc in the sequence shows the brand being scanned. A sample run
        // is somebody else's brand, so it carries their mark; everything else
        // is Tread, which is the component's default.
        {...(sample ? { brandName: sample.name, brandLogo: sample.logo, brandContain: sample.contain } : null)}
        onDone={() =>
          (window.location.hash = sample
            ? // A sample asks for nothing — it is somebody else's brand, and
              // gating a demonstration on an address buys an address nobody
              // meant to give.
              `#v2-samplereport/${encodeURIComponent(sample.name)}`
            : '#v2-scanemail')
        }
      />
    )
  if (view === 'v2-georeport' || view === 'v2-georeportfull') {
    if (!hasReport) setHasReport(true)
  }
  // The report the flow lands on: the centred layout with the rail floating
  // beside it as its own card. `#v2-georeport-floating` still resolves here so
  // older links keep working.
  //
  // The full-width table-first layout it replaced is the same component with
  // `floating` off, kept at `#v2-georeport-v2` for comparison.
  // Each report route gets its own key: without one React reuses the same
  // instance across hash changes, and an example modal opened on one carries
  // over — open, and locking the page's scroll — onto the next.
  if (view === 'v2-georeport' || view === 'v2-georeport-floating')
    return (
      <V2GeoReportPageV2
        key="report"
        floating
        onUnlock={() => {
          // upgrading a scan that already knows the brand and topic
          setSignupEntry('upgrade')
          setScopeBrand('Tread')
          window.location.hash = '#v2-geologin'
        }}
        // The route into the product itself, which the free report had no way
        // of offering before. It signs up first — the product needs an account
        // — and the magic link lands in onboarding rather than in checkout.
        onPlatform={() => {
          setSignupEntry('platform')
          window.location.hash = '#v2-geologin'
        }}
      />
    )
  // The full-width layout, off the flow but kept reachable side by side.
  if (view === 'v2-georeportshared')
    return (
      <V2GeoReportPageV2
        key="report-shared"
        shared
        // Same layout as the report its recipient would get if they ran one,
        // and for a stronger reason: the rail carries "Run your own", which is
        // the only thing this page is trying to achieve. Stacked underneath,
        // it sat below the full length of somebody else's report.
        floating
        onPlatform={() => {
          setSignupEntry('platform')
          window.location.hash = '#v2-geologin'
        }}
        onRunOwn={() => (window.location.hash = '#v2-geoscreen')}
      />
    )
  // what payment actually delivers — a different artifact, still to be designed
  if (view === 'v2-georeportfull')
    return (
      <V2GeoFullReportScreen onStartTrial={() => (window.location.hash = '#v2-onboarding')} />
    )
  // where the nav's Enterprise link lands
  if (view === 'v2-enterprise')
    return (
      <V2EnterpriseScreen
        // "Contact sales" is the scoping conversation, not a demo — it goes
        // through qualification like the plans page's Enterprise tier does.
        onContactSales={() => (window.location.hash = '#v2-qualify')}
        onDemo={() => (window.location.hash = '#v2-geodemo')}
      />
    )
  // the snapshot with its gated blocks resolved; kept for comparison, not routed to
  if (view === 'v2-geodemo')
    return <V2GeoAuthScreen variant="demo" onContinue={() => (window.location.hash = '#v2-sales')} />
  if (view === 'v2-geologin')
    return (
      <V2GeoAuthScreen
        variant="login"
        onContinue={(email) => {
          setAuthEmail(email)
          window.location.hash = '#v2-geocheckemail'
        }}
      />
    )
  if (view === 'v2-geocheckemail')
    return (
      <V2GeoCheckEmailScreen
        email={authEmail}
        // stands in for clicking the link in the mail
        onOpenLink={() =>
          (window.location.hash =
            signupEntry === 'platform'
              ? '#v2-onboarding'
              : signupEntry === 'direct'
                ? '#v2-scopebrand'
                : '#v2-checkout')
        }
        onChangeEmail={() => (window.location.hash = '#v2-geologin')}
      />
    )
  // enterprise scopes before it books; a demo goes straight to the slots
  if (view === 'v2-qualify')
    return <V2GeoQualifyScreen onContinue={() => (window.location.hash = '#v2-sales')} />
  if (view === 'v2-sales') return <V2GeoSalesScreen onConfirm={() => (window.location.hash = '#v2-booked')} />
  // The paid path's own run through the free flow's two screens — same
  // components, different destination: checkout rather than a free scan.
  // Custom topics are unlocked here because by this point there is an account.
  if (view === 'v2-scopebrand')
    return (
      <V2BrandTrackingScreen
        step={{ n: 1, of: 2 }}
        navAction="signout"
        // they got here by clicking a link in their mail — say the link worked.
        // Swap `welcome` for `signedInAs` to compare the dialog with the line.
        welcome={authEmail || DEMO_EMAIL}
        onContinue={(a) => {
          setAudience(a)
          setScopeBrand('Tread')
          window.location.hash = '#v2-scopetopic'
        }}
      />
    )
  if (view === 'v2-scopetopic')
    return (
      <V2TopicScreen
        allowCustom
        navAction="signout"
        audience={audience}
        step={{ n: 2, of: 2 }}
        // this path pays next, so the button says so
        continueLabel="Continue to payment"
        onContinue={(t) => {
          setTopic(t)
          window.location.hash = '#v2-checkout'
        }}
      />
    )
  // Where the trial lands: a marked placeholder, since product onboarding is
  // its own surface outside this prototype.
  if (view === 'v2-onboarding')
    return <V2GeoOnboardingScreen onBack={() => (window.location.hash = '#v2-georeportfull')} />
  // The upgrade path's confirmation, after payment — see GeoScopeScreen.
  if (view === 'v2-geoscope')
    return (
      <V2GeoScopeScreen
        brand={scopeBrand}
        topic={topic}
        onContinue={({ brand, topic: t }) => {
          setScopeBrand(brand)
          setTopic(t)
          // Not the free scan's loading screen: that one narrates a run that
          // finishes in a couple of minutes, and a full report does not. This
          // says it is generating and that the mail is coming.
          window.location.hash = '#v2-generating'
        }}
      />
    )
  if (view === 'v2-checkout')
    return <V2GeoCheckoutScreen onPaid={() => (window.location.hash = '#v2-paid')} />
  if (view === 'v2-generating')
    return (
      <V2GeoPaymentCompleteScreen
        variant="generating"
        onViewReport={() => (window.location.hash = '#v2-georeportfull')}
      />
    )
  if (view === 'v2-paid')
    return (
      <V2GeoPaymentCompleteScreen
        // The receipt always comes first. On the upgrade path there is still a
        // brand and topic to confirm, so it hands over instead of pretending a
        // report is already being generated.
        variant={signupEntry === 'upgrade' ? 'scope' : 'paid'}
        onConfirmScope={() => (window.location.hash = '#v2-geoscope')}
        onViewReport={() => (window.location.hash = '#v2-georeportfull')}
      />
    )
  if (view === 'v2-booked')
    return (
      <V2GeoPaymentCompleteScreen
        variant="booked"
        // only offered when there is in fact a report to go back to
        onHome={hasReport ? () => (window.location.hash = '#v2-georeport') : undefined}
      />
    )

  /* Anything unrecognised lands on the start of the flow. Same shape as the
     `v2-geoscreen` branch above — the entry screen is the fallback, so a bad
     or stale hash is a soft landing rather than a blank page. */
  return (
    <V2GeoSearchScreen
      onContinue={() => {
        setSample(null)
        window.location.hash = '#v2-brandscreen'
      }}
      onSample={(picked) => {
        setSample(picked)
        setTopic(picked.topic)
        window.location.hash = picked.skipConfirm
          ? '#v2-geoloading'
          : `#v2-sample/${encodeURIComponent(picked.name)}`
      }}
    />
  )
}

export default App
