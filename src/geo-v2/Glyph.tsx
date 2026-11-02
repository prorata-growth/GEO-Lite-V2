/**
 * The handful of monochrome icons the flow draws as chrome rather than
 * artwork. They ship as `.svg` files with a baked-in `#0A0A0A`, which an
 * `<img>` can't recolour — so the ink inverts with the theme only if the
 * path is inline and takes `currentColor`.
 *
 * Artwork icons (brand marks, the engine discs, anything inside the animated
 * mock-UI cards) deliberately stay as `<img>` with their own fixed colours.
 */

type GlyphProps = {
  size?: number
  className?: string
  style?: React.CSSProperties
}

function svgProps({ size = 20, className, style }: GlyphProps, box: number) {
  return {
    viewBox: `0 0 ${box} ${box}`,
    width: size,
    height: size,
    fill: 'none' as const,
    'aria-hidden': true,
    className,
    style: { display: 'block', flex: 'none', ...style },
  }
}

export function ChevronDown(p: GlyphProps) {
  return (
    <svg {...svgProps(p, 24)}>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Leaves the page — the report's only outbound mark, on cited sources. */
export function ArrowUpRight(p: GlyphProps) {
  return (
    <svg {...svgProps(p, 24)}>
      <path
        d="M8 16L16 8M16 8H9M16 8V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Lock(p: GlyphProps) {
  return (
    <svg {...svgProps(p, 20)}>
      <path
        d="M16.25 6.25H13.75V4.375C13.75 3.38044 13.3549 2.42661 12.6517 1.72335C11.9484 1.02009 10.9946 0.625 10 0.625C9.00544 0.625 8.05161 1.02009 7.34835 1.72335C6.64509 2.42661 6.25 3.38044 6.25 4.375V6.25H3.75C3.41848 6.25 3.10054 6.3817 2.86612 6.61612C2.6317 6.85054 2.5 7.16848 2.5 7.5V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V7.5C17.5 7.16848 17.3683 6.85054 17.1339 6.61612C16.8995 6.3817 16.5815 6.25 16.25 6.25ZM10 12.8125C9.81458 12.8125 9.63332 12.7575 9.47915 12.6545C9.32498 12.5515 9.20482 12.4051 9.13386 12.2338C9.06291 12.0625 9.04434 11.874 9.08051 11.6921C9.11669 11.5102 9.20598 11.3432 9.33709 11.2121C9.4682 11.081 9.63525 10.9917 9.8171 10.9555C9.99896 10.9193 10.1875 10.9379 10.3588 11.0089C10.5301 11.0798 10.6765 11.2 10.7795 11.3542C10.8825 11.5083 10.9375 11.6896 10.9375 11.875C10.9375 12.1236 10.8387 12.3621 10.6629 12.5379C10.4871 12.7137 10.2486 12.8125 10 12.8125ZM12.5 6.25H7.5V4.375C7.5 3.71196 7.76339 3.07607 8.23223 2.60723C8.70107 2.13839 9.33696 1.875 10 1.875C10.663 1.875 11.2989 2.13839 11.7678 2.60723C12.2366 3.07607 12.5 3.71196 12.5 4.375V6.25Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Filled when the row is chosen; the hollow state is the same disc at 10%. */
export function CheckCircle({ on = true, ...p }: GlyphProps & { on?: boolean }) {
  return (
    <svg {...svgProps(p, 24)}>
      {on ? (
        <path
          d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97981 4.96452 3.73013 6.48726 2.99217 8.26884C2.25422 10.0504 2.06114 12.0108 2.43734 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46927 20.2579 8.20655 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1217 15.6557 10.039 15.6004 9.96937 15.5306L7.71937 13.2806C7.57864 13.1399 7.49958 12.949 7.49958 12.75C7.49958 12.551 7.57864 12.3601 7.71937 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44902 11.9996 8.63989 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.2891 9.14969 15.3718 9.09442 15.4628 9.0567C15.5539 9.01899 15.6515 8.99958 15.75 8.99958C15.8485 8.99958 15.9461 9.01899 16.0372 9.0567C16.1282 9.09442 16.2109 9.14969 16.2806 9.21937C16.3503 9.28906 16.4056 9.37178 16.4433 9.46283C16.481 9.55387 16.5004 9.65145 16.5004 9.75C16.5004 9.84855 16.481 9.94613 16.4433 10.0372C16.4056 10.1282 16.3503 10.2109 16.2806 10.2806Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97981 4.96452 3.73013 6.48726 2.99217 8.26884C2.25422 10.0504 2.06114 12.0108 2.43734 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46927 20.2579 8.20655 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25Z"
          fill="currentColor"
          fillOpacity="0.1"
        />
      )}
    </svg>
  )
}

/** The 20px filled disc with a knocked-out tick — the modal's feature list.
 *  Distinct from CheckCircle above, which is the 24px outline pair. */
export function CheckDisc(p: GlyphProps) {
  return (
    <svg {...svgProps(p, 20)}>
      <path
        d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.48599 3.24431C4.14984 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71761 10.009 2.03112 11.5851C2.34462 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.41489 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13414 13.0003 9.06521 13.0464 8.98934 13.0779C8.91346 13.1093 8.83213 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51066 13.0779C8.43479 13.0464 8.36586 13.0003 8.30781 12.9422L6.43281 11.0672C6.31554 10.9499 6.24965 10.7909 6.24965 10.625C6.24965 10.4591 6.31554 10.3001 6.43281 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04085 9.99965 7.19991 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7503 8.04288 13.7503 8.125C13.7503 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Close(p: GlyphProps) {
  return (
    <svg {...svgProps(p, 32)}>
      <path d="M25 7L7 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 25L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * A single-colour SVG asset painted as a mask, so it takes `currentColor`
 * instead of the ink baked into the file.
 *
 * The flow's Phosphor exports are all `fill="#020912"`, which an `<img>`
 * can't recolour — they vanish on a dark ground. Masking is the cheap fix for
 * a whole batch of them at once: one helper rather than nine inlined paths.
 */
export function MaskIcon({
  src,
  size = 20,
  className,
  style,
}: GlyphProps & { src: string }) {
  // Quoted: Vite inlines small assets as `data:` URIs whose payload contains
  // parentheses, which end an unquoted url() token early and get the whole
  // declaration thrown away.
  const mask = `url("${src}") center / contain no-repeat`
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: 'block',
        flex: 'none',
        width: size,
        height: size,
        backgroundColor: 'currentColor',
        mask,
        WebkitMask: mask,
        ...style,
      }}
    />
  )
}
