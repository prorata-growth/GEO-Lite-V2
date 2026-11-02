import brandStamp from '../assets/geo-v2/enterprise/brand-stamp.png'
import mark0 from '../assets/geo-v2/enterprise/mark-0.png'
import mark1 from '../assets/geo-v2/enterprise/mark-1.png'
import mark2 from '../assets/geo-v2/enterprise/mark-2.png'
import mark3 from '../assets/geo-v2/enterprise/mark-3.png'
import mark4 from '../assets/geo-v2/enterprise/mark-4.png'
import track from '../assets/geo-v2/enterprise/track.svg'
import arc from '../assets/geo-v2/enterprise/arc.svg'

/**
 * The Brewlune workspace shown beside the Enterprise hero — Figma 131:8243.
 *
 * A scaled replica built out of real elements rather than a flat screenshot,
 * which is what lets it follow the theme: every surface, border, text and
 * chart colour here is a semantic token, so the whole thing inverts in dark
 * mode for free. The odd sub-pixel numbers (0.444px borders, 7.11px type) are
 * the Figma frame's own scale-down and are kept verbatim so it matches.
 *
 * The two edge fades were the one exception — Figma exported their far stop as
 * a literal `rgba(250,250,250,0)`, a fixed light-mode white that would have
 * stayed light on a dark page. They now run from `--background-surface-page`
 * to `transparent`, so they dissolve into whichever page they sit on.
 *
 * Decorative: `aria-hidden`, and nothing inside is focusable.
 */
export default function EnterpriseDashboard() {
  return (
    <div aria-hidden className="pointer-events-none select-none">
      <div className="bg-[var(--background-surface-page)] border-[var(--border-default)] border-l-[0.444px] border-solid border-t-[0.444px] content-stretch flex gap-[8px] h-[455.111px] items-start overflow-clip relative rounded-[7.111px] shrink-0 w-[640px]">
                  <div className="bg-[var(--background-surface-raised)] border-[0.444px] border-[var(--border-default)] border-solid content-stretch flex flex-col gap-[4.444px] h-full items-center p-[7.111px] relative shrink-0">
                    <div className="border-[0.444px] border-[var(--border-default)] border-solid content-stretch flex gap-[5.333px] items-center p-[3.556px] relative rounded-[3.556px] shrink-0 w-[82.222px]">
                      <div className="relative rounded-[9.778px] shrink-0 size-[19.556px]" data-name="stamp 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9.778px] size-full" src={brandStamp} />
                      </div>
                      <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.4] relative shrink-0 text-[8px] text-[color:var(--content-default)] whitespace-nowrap">
                        BrewLune
                      </p>
                    </div>
                    <div className="border-[0.444px] border-[var(--border-default)] border-solid h-[0.444px] relative shrink-0 w-full" />
                    <div className="bg-[var(--background-action-secondary-default)] h-[16.444px] relative rounded-[2.222px] shrink-0 w-full" />
                    <div className="bg-[var(--background-action-secondary-default)] h-[16.444px] relative rounded-[2.222px] shrink-0 w-full" />
                    <div className="bg-[var(--background-action-secondary-default)] h-[16.444px] relative rounded-[2.222px] shrink-0 w-full" />
                    <div className="bg-[var(--background-action-secondary-default)] h-[16.444px] relative rounded-[2.222px] shrink-0 w-full" />
                    <div className="bg-[var(--background-action-secondary-default)] h-[16.444px] relative rounded-[2.222px] shrink-0 w-[49.333px]" />
                  </div>
                  <div className="content-stretch flex flex-col gap-[11px] items-start py-[16px] relative shrink-0 w-[660.222px]">
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Tab Bar">
                      <div className="border-[var(--content-default)] border-b-[0.889px] border-solid content-stretch flex items-start justify-center pb-[3.556px] relative shrink-0" data-name="Tab Item — Brand information">
                        <div className="content-stretch flex gap-[var(--spacing-gap-200)] items-center justify-center px-[var(--spacing-padding-300)] py-[var(--spacing-padding-100)] relative rounded-[var(--border-radius-md)] shrink-0">
                          <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family-default)] justify-center leading-[0] not-italic relative shrink-0 text-[color:var(--content-default)] text-[length:7.11px] text-center whitespace-nowrap">
                            <p className="leading-[1.4]">Overview</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-start justify-center pb-[3.556px] relative shrink-0" data-name="Tab Item — Value propositions">
                        <div className="content-stretch flex gap-[var(--spacing-gap-200)] items-center justify-center px-[var(--spacing-padding-300)] py-[var(--spacing-padding-100)] relative shrink-0">
                          <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family-default)] justify-center leading-[0] not-italic relative shrink-0 text-[color:var(--content-secondary)] text-[length:7.11px] text-center whitespace-nowrap">
                            <p className="leading-[1.4]">Deepdive</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-start justify-center pb-[3.556px] relative shrink-0" data-name="Tab Item — Topics">
                        <div className="content-stretch flex gap-[var(--spacing-gap-200)] items-center justify-center px-[var(--spacing-padding-300)] py-[var(--spacing-padding-100)] relative shrink-0">
                          <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family-default)] justify-center leading-[0] not-italic relative shrink-0 text-[color:var(--content-secondary)] text-[length:7.11px] text-center whitespace-nowrap">
                            <p className="leading-[1.4]">Topics</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-start justify-center pb-[3.556px] relative shrink-0" data-name="Tab Item — Target profiles">
                        <div className="content-stretch flex gap-[var(--spacing-gap-200)] items-center justify-center px-[var(--spacing-padding-300)] py-[var(--spacing-padding-100)] relative shrink-0">
                          <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font-family-default)] justify-center leading-[0] not-italic relative shrink-0 text-[color:var(--content-secondary)] text-[length:7.11px] text-center whitespace-nowrap">
                            <p className="leading-[1.4]">Queries</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[7.925px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[7.925px] items-start overflow-clip relative shrink-0 w-full" data-name="Stat tiles">
                        <div className="bg-[var(--background-surface-sunken)] content-stretch flex flex-[1_0_0] flex-col gap-[1.981px] items-start min-w-px overflow-clip p-[7.925px] relative rounded-[3.963px]" data-name="Stat / MENTION RATE">
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] tracking-[0.4458px] w-full">
                            MENTION RATE
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-none not-italic relative shrink-0 text-[13.869px] text-[color:var(--content-default)] w-full">
                            19
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] w-full">
                            of 40 answers
                          </p>
                          <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.477px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-full" data-name="Bar">
                            <div className="bg-[var(--chart-single-bar)] flex-[48_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                            <div className="flex-[52_0_0] h-full min-w-px relative" data-name="Rest" />
                          </div>
                        </div>
                        <div className="bg-[var(--background-surface-sunken)] content-stretch flex flex-[1_0_0] flex-col gap-[1.981px] items-start min-w-px overflow-clip p-[7.925px] relative rounded-[3.963px]" data-name="Stat / SHARE OF VOICE">
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] tracking-[0.4458px] w-full">
                            SHARE OF VOICE
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-none not-italic relative shrink-0 text-[13.869px] text-[color:var(--content-default)] w-full">
                            18%
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] w-full">
                            3rd of 5 brands
                          </p>
                          <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.477px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-full" data-name="Bar">
                            <div className="bg-[var(--chart-single-bar)] flex-[18_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                            <div className="flex-[82_0_0] h-full min-w-px relative" data-name="Rest" />
                          </div>
                        </div>
                        <div className="bg-[var(--background-surface-sunken)] content-stretch flex flex-[1_0_0] flex-col gap-[1.981px] items-start min-w-px overflow-clip p-[7.925px] relative rounded-[3.963px]" data-name="Stat / POSITIVE SENTIMENT">
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] tracking-[0.4458px] w-full">
                            POSITIVE SENTIMENT
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-none not-italic relative shrink-0 text-[13.869px] text-[color:var(--content-status-success)] w-full">
                            62%
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] w-full">
                            of 74 sentences
                          </p>
                          <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.477px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-full" data-name="Bar">
                            <div className="bg-[var(--content-status-success)] flex-[62_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                            <div className="flex-[38_0_0] h-full min-w-px relative" data-name="Rest" />
                          </div>
                        </div>
                        <div className="bg-[var(--background-surface-sunken)] content-stretch flex flex-[1_0_0] flex-col gap-[1.981px] items-start min-w-px overflow-clip p-[7.925px] relative rounded-[3.963px]" data-name="Stat / READABLE PAGES">
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] tracking-[0.4458px] w-full">
                            READABLE PAGES
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-none not-italic relative shrink-0 text-[13.869px] text-[color:var(--content-status-warning)] w-full">
                            18
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] w-full">
                            of 24 crawled
                          </p>
                          <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.477px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-full" data-name="Bar">
                            <div className="bg-[var(--content-status-warning)] flex-[75_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                            <div className="flex-[25_0_0] h-full min-w-px relative" data-name="Rest" />
                          </div>
                        </div>
                      </div>
                      <div className="gap-x-[7.925253391265869px] gap-y-[7.925253391265869px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__138.95px_194.20px] relative shrink-0 w-full">
                        <div className="bg-[var(--background-surface-raised)] border-[0.495px] border-[var(--border-default)] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip p-[9.907px] relative rounded-[3.963px] row-1 self-stretch shrink-0" data-name="Card / Share of voice">
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.3] not-italic relative shrink-0 text-[8.916px] text-[color:var(--content-default)] w-full">
                            Share of voice
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] w-full">
                            Every mention of every tracked brand within one engine, divided by the total. Columns total 100%.
                          </p>
                          <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-col items-start overflow-clip pt-[7.925px] relative shrink-0 w-full" data-name="table">
                            <div className="bg-[var(--background-surface-raised)] border-[var(--border-default)] border-b-[0.495px] border-solid content-stretch flex items-start overflow-clip pb-[3.963px] relative shrink-0 w-full" data-name="head">
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-[1_0_0] items-start min-w-px overflow-clip px-[3.963px] relative" data-name="head/Brand">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] whitespace-nowrap">
                                  Brand
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex items-start justify-end overflow-clip px-[3.963px] relative shrink-0 w-[38.636px]" data-name="head/All">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] whitespace-nowrap">
                                  All
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex items-start justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="head/ChatGPT">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] whitespace-nowrap">
                                  ChatGPT
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex items-start justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="head/Claude">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] whitespace-nowrap">
                                  Claude
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex items-start justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="head/Perplexity">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] whitespace-nowrap">
                                  Perplexity
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex items-start justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="head/AI Overviews">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] whitespace-nowrap">
                                  AI Overviews
                                </p>
                              </div>
                            </div>
                            <div className="border-[var(--border-default)] border-b-[0.495px] border-dashed content-stretch flex h-[15.851px] items-center overflow-clip relative shrink-0 w-full" data-name="Row / Blue Bottle">
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-[1_0_0] gap-[5.944px] h-full items-center min-w-px overflow-clip px-[3.963px] relative" data-name="Brand Cell">
                                <div className="relative rounded-[1.981px] shrink-0 size-[9.907px]" data-name="Mark">
                                  <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[1.981px] size-full" src={mark0} />
                                </div>
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  Blue Bottle
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end px-[3.963px] relative shrink-0 w-[38.636px]" data-name="All">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  31%
                                </p>
                                <div className="absolute bg-[var(--chart-grid-gridline)] bottom-[1.98px] content-stretch flex h-[1.486px] items-start left-[3.96px] overflow-clip right-[3.96px] rounded-[0.991px]" data-name="Magnitude">
                                  <div className="bg-[var(--chart-categorical-1)] flex-[31_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                  <div className="flex-[4_0_0] h-full min-w-px relative" data-name="Rest" />
                                </div>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 0">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  28%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 1">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  30%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 2">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  30%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 3">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  35%
                                </p>
                              </div>
                            </div>
                            <div className="border-[var(--border-default)] border-b-[0.495px] border-dashed content-stretch flex h-[15.851px] items-center overflow-clip relative shrink-0 w-full" data-name="Row / Intelligentsia">
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-[1_0_0] gap-[5.944px] h-full items-center min-w-px overflow-clip px-[3.963px] relative" data-name="Brand Cell">
                                <div className="relative rounded-[1.981px] shrink-0 size-[9.907px]" data-name="Mark">
                                  <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[1.981px] size-full" src={mark1} />
                                </div>
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  Intelligentsia
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end px-[3.963px] relative shrink-0 w-[38.636px]" data-name="All">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  24%
                                </p>
                                <div className="absolute bg-[var(--chart-grid-gridline)] bottom-[1.98px] content-stretch flex h-[1.486px] items-start left-[3.96px] overflow-clip right-[3.96px] rounded-[0.991px]" data-name="Magnitude">
                                  <div className="bg-[var(--chart-categorical-2)] flex-[24_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                  <div className="flex-[11_0_0] h-full min-w-px relative" data-name="Rest" />
                                </div>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 0">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  25%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 1">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  24%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 2">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  25%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 3">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  22%
                                </p>
                              </div>
                            </div>
                            <div className="bg-[var(--background-interactive-selected)] border-[var(--border-default)] border-b-[0.495px] border-dashed content-stretch flex h-[15.851px] items-center overflow-clip relative shrink-0 w-full" data-name="Row / Brewlune">
                              <div className="content-stretch flex flex-[1_0_0] gap-[5.944px] h-full items-center min-w-px overflow-clip px-[3.963px] relative" data-name="Brand Cell">
                                <div className="relative rounded-[1.981px] shrink-0 size-[9.907px]" data-name="Mark">
                                  <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[1.981px] size-full" src={mark2} />
                                </div>
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  Brewlune
                                </p>
                                <div className="bg-[var(--content-default)] content-stretch flex items-start overflow-clip px-[1.981px] relative rounded-[1.981px] shrink-0" data-name="Own Tag">
                                  <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[4.953px] text-[color:var(--content-inverse)] whitespace-nowrap">
                                    You
                                  </p>
                                </div>
                              </div>
                              <div className="content-stretch flex h-full items-center justify-end px-[3.963px] relative shrink-0 w-[38.636px]" data-name="All">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  18%
                                </p>
                                <div className="absolute bg-[var(--chart-grid-gridline)] bottom-[1.98px] content-stretch flex h-[1.486px] items-start left-[3.96px] overflow-clip right-[3.96px] rounded-[0.991px]" data-name="Magnitude">
                                  <div className="bg-[var(--content-default)] flex-[18_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                  <div className="flex-[17_0_0] h-full min-w-px relative" data-name="Rest" />
                                </div>
                              </div>
                              <div className="content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 0">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  21%
                                </p>
                              </div>
                              <div className="content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 1">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  19%
                                </p>
                              </div>
                              <div className="content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 2">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  17%
                                </p>
                              </div>
                              <div className="content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 3">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  15%
                                </p>
                              </div>
                            </div>
                            <div className="border-[var(--border-default)] border-b-[0.495px] border-dashed content-stretch flex h-[15.851px] items-center overflow-clip relative shrink-0 w-full" data-name="Row / Counter Culture">
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-[1_0_0] gap-[5.944px] h-full items-center min-w-px overflow-clip px-[3.963px] relative" data-name="Brand Cell">
                                <div className="relative rounded-[1.981px] shrink-0 size-[9.907px]" data-name="Mark">
                                  <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[1.981px] size-full" src={mark3} />
                                </div>
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  Counter Culture
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end px-[3.963px] relative shrink-0 w-[38.636px]" data-name="All">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  15%
                                </p>
                                <div className="absolute bg-[var(--chart-grid-gridline)] bottom-[1.98px] content-stretch flex h-[1.486px] items-start left-[3.96px] overflow-clip right-[3.96px] rounded-[0.991px]" data-name="Magnitude">
                                  <div className="bg-[var(--chart-categorical-5)] flex-[15_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                  <div className="flex-[20_0_0] h-full min-w-px relative" data-name="Rest" />
                                </div>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 0">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  15%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 1">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  15%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 2">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  16%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 3">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  15%
                                </p>
                              </div>
                            </div>
                            <div className="content-stretch flex h-[15.851px] items-center overflow-clip relative shrink-0 w-full" data-name="Row / Herkimer">
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-[1_0_0] gap-[5.944px] h-full items-center min-w-px overflow-clip px-[3.963px] relative" data-name="Brand Cell">
                                <div className="relative rounded-[1.981px] shrink-0 size-[9.907px]" data-name="Mark">
                                  <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[1.981px] size-full" src={mark4} />
                                </div>
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  Herkimer
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end px-[3.963px] relative shrink-0 w-[38.636px]" data-name="All">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  12%
                                </p>
                                <div className="absolute bg-[var(--chart-grid-gridline)] bottom-[1.98px] content-stretch flex h-[1.486px] items-start left-[3.96px] overflow-clip right-[3.96px] rounded-[0.991px]" data-name="Magnitude">
                                  <div className="bg-[var(--chart-categorical-6)] flex-[12_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                  <div className="flex-[23_0_0] h-full min-w-px relative" data-name="Rest" />
                                </div>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 0">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  11%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 1">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  12%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 2">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  12%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex h-full items-center justify-end overflow-clip px-[3.963px] relative shrink-0 w-[37.645px]" data-name="engine 3">
                                <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                  13%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[var(--background-surface-raised)] border-[0.495px] border-[var(--border-default)] border-solid col-2 content-stretch flex flex-col gap-[15.851px] items-start justify-self-stretch overflow-clip p-[9.907px] relative rounded-[3.963px] row-1 self-stretch shrink-0" data-name="Card / Page reachability">
                          <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic relative shrink-0 w-full">
                            <p className="font-[family-name:var(--font-family-default)] font-medium leading-[1.3] relative shrink-0 text-[8.916px] text-[color:var(--content-default)] w-full">
                              Page reachability
                            </p>
                            <p className="font-[family-name:var(--font-family-default)] font-normal leading-[1.45] relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] w-full">
                              One tile per crawled page. These results describe the site itself, so they are the same for all four engines.
                            </p>
                          </div>
                          <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-col items-start overflow-clip pt-[7.925px] relative shrink-0 w-full" data-name="body">
                            <div className="bg-[var(--background-surface-raised)] content-stretch flex gap-[11.888px] items-center overflow-clip relative shrink-0 w-full" data-name="row">
                              <div className="relative shrink-0 size-[35.664px]" data-name="Progress Ring">
                                <div className="absolute left-0 size-[35.664px] top-0" data-name="Track">
                                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={track} />
                                </div>
                                <div className="absolute left-0 size-[35.664px] top-0" data-name="Arc">
                                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={arc} />
                                </div>
                                <p className="[word-break:break-word] absolute font-[family-name:var(--font-family-default)] font-medium leading-[1.45] left-[13.13px] not-italic text-[4.953px] text-[color:var(--content-default)] top-[14.12px] whitespace-nowrap">
                                  75%
                                </p>
                              </div>
                              <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-[1_0_0] flex-col gap-[7.925px] items-start min-w-px overflow-clip relative" data-name="right">
                                <div className="bg-[var(--background-surface-raised)] content-start flex flex-wrap gap-[1.9813133478164673px_1.981px] items-start overflow-clip relative shrink-0 w-full" data-name="Tile Grid">
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-status-error)] border-[0.495px] border-[var(--border-status-error)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Blocked" />
                                  <div className="bg-[var(--background-status-error)] border-[0.495px] border-[var(--border-status-error)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Blocked" />
                                  <div className="bg-[var(--background-status-error)] border-[0.495px] border-[var(--border-status-error)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Blocked" />
                                  <div className="bg-[var(--background-status-error)] border-[0.495px] border-[var(--border-status-error)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Blocked" />
                                  <div className="bg-[var(--background-status-error)] border-[0.495px] border-[var(--border-status-error)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Blocked" />
                                  <div className="bg-[var(--background-status-error)] border-[0.495px] border-[var(--border-status-error)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Blocked" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                  <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid h-[12.879px] relative rounded-[1.981px] shrink-0 w-[19.729px]" data-name="Tile / Reachable" />
                                </div>
                                <div className="bg-[var(--background-surface-raised)] content-stretch flex gap-[11.888px] items-start overflow-clip relative shrink-0 w-full" data-name="legend">
                                  <div className="bg-[var(--background-surface-raised)] content-stretch flex gap-[3.963px] items-center overflow-clip relative shrink-0" data-name="item">
                                    <div className="bg-[var(--background-surface-sunken)] border-[0.495px] border-[var(--border-default)] border-solid relative rounded-[0.991px] shrink-0 size-[5.944px]" data-name="swatch" />
                                    <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                      18
                                    </p>
                                    <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] whitespace-nowrap">
                                      reachable
                                    </p>
                                  </div>
                                  <div className="bg-[var(--background-surface-raised)] content-stretch flex gap-[3.963px] items-center overflow-clip relative shrink-0" data-name="item">
                                    <div className="bg-[var(--background-status-error)] border-[0.495px] border-[var(--border-status-error)] border-solid relative rounded-[0.991px] shrink-0 size-[5.944px]" data-name="swatch" />
                                    <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] whitespace-nowrap">
                                      6
                                    </p>
                                    <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] whitespace-nowrap">
                                      blocked by robots.txt
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[var(--background-surface-raised)] border-[0.495px] border-[var(--border-default)] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch overflow-clip p-[9.907px] relative rounded-[3.963px] row-2 self-stretch shrink-0" data-name="Card / Sentiment by engine">
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.3] not-italic relative shrink-0 text-[8.916px] text-[color:var(--content-default)] w-full">
                            Sentiment by engine
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] w-full">
                            Each sentence naming the brand is classified once. Wording only, not how often it is recommended.
                          </p>
                          <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-[1_0_0] flex-col gap-[5.944px] items-start min-h-px overflow-clip pt-[7.925px] relative w-full" data-name="body">
                            <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-col gap-[1.981px] items-start overflow-clip relative shrink-0 w-full" data-name="Row / All engines">
                              <div className="[word-break:break-word] bg-[var(--background-surface-raised)] content-stretch flex font-[family-name:var(--font-family-default)] font-medium items-start justify-between leading-[1.45] not-italic overflow-clip relative shrink-0 text-[5.944px] text-[color:var(--content-default)] w-full whitespace-nowrap" data-name="head">
                                <p className="relative shrink-0">
                                  All engines
                                </p>
                                <p className="relative shrink-0">
                                  62% favourable
                                </p>
                              </div>
                              <div className="content-stretch flex h-[6.935px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-full" data-name="Stacked Bar">
                                <div className="bg-[var(--content-status-success)] flex-[62_0_0] h-full min-w-px relative" data-name="Favourable" />
                                <div className="bg-[var(--chart-grid-crosshair)] flex-[28_0_0] h-full min-w-px relative" data-name="Neutral" />
                                <div className="bg-[var(--content-status-error)] flex-[10_0_0] h-full min-w-px relative" data-name="Unfavourable" />
                              </div>
                            </div>
                            <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-col gap-[1.981px] items-start overflow-clip relative shrink-0 w-full" data-name="Row / ChatGPT">
                              <div className="[word-break:break-word] bg-[var(--background-surface-raised)] content-stretch flex items-start justify-between leading-[1.45] not-italic overflow-clip relative shrink-0 text-[5.944px] w-full whitespace-nowrap" data-name="head">
                                <p className="font-[family-name:var(--font-family-default)] font-normal relative shrink-0 text-[color:var(--content-secondary)]">
                                  ChatGPT
                                </p>
                                <p className="font-[family-name:var(--font-family-default)] font-medium relative shrink-0 text-[color:var(--content-default)]">
                                  65%
                                </p>
                              </div>
                              <div className="content-stretch flex h-[4.953px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-full" data-name="Stacked Bar">
                                <div className="bg-[var(--content-status-success)] flex-[65_0_0] h-full min-w-px relative" data-name="Favourable" />
                                <div className="bg-[var(--chart-grid-crosshair)] flex-[27_0_0] h-full min-w-px relative" data-name="Neutral" />
                                <div className="bg-[var(--content-status-error)] flex-[8_0_0] h-full min-w-px relative" data-name="Unfavourable" />
                              </div>
                            </div>
                            <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-col gap-[1.981px] items-start overflow-clip relative shrink-0 w-full" data-name="Row / Claude">
                              <div className="[word-break:break-word] bg-[var(--background-surface-raised)] content-stretch flex items-start justify-between leading-[1.45] not-italic overflow-clip relative shrink-0 text-[5.944px] w-full whitespace-nowrap" data-name="head">
                                <p className="font-[family-name:var(--font-family-default)] font-normal relative shrink-0 text-[color:var(--content-secondary)]">
                                  Claude
                                </p>
                                <p className="font-[family-name:var(--font-family-default)] font-medium relative shrink-0 text-[color:var(--content-default)]">
                                  68%
                                </p>
                              </div>
                              <div className="content-stretch flex h-[4.953px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-full" data-name="Stacked Bar">
                                <div className="bg-[var(--content-status-success)] flex-[68_0_0] h-full min-w-px relative" data-name="Favourable" />
                                <div className="bg-[var(--chart-grid-crosshair)] flex-[26_0_0] h-full min-w-px relative" data-name="Neutral" />
                                <div className="bg-[var(--content-status-error)] flex-[6_0_0] h-full min-w-px relative" data-name="Unfavourable" />
                              </div>
                            </div>
                            <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-col gap-[1.981px] items-start overflow-clip relative shrink-0 w-full" data-name="Row / Perplexity">
                              <div className="[word-break:break-word] bg-[var(--background-surface-raised)] content-stretch flex items-start justify-between leading-[1.45] not-italic overflow-clip relative shrink-0 text-[5.944px] w-full whitespace-nowrap" data-name="head">
                                <p className="font-[family-name:var(--font-family-default)] font-normal relative shrink-0 text-[color:var(--content-secondary)]">
                                  Perplexity
                                </p>
                                <p className="font-[family-name:var(--font-family-default)] font-medium relative shrink-0 text-[color:var(--content-default)]">
                                  58%
                                </p>
                              </div>
                              <div className="content-stretch flex h-[4.953px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-full" data-name="Stacked Bar">
                                <div className="bg-[var(--content-status-success)] flex-[58_0_0] h-full min-w-px relative" data-name="Favourable" />
                                <div className="bg-[var(--chart-grid-crosshair)] flex-[24_0_0] h-full min-w-px relative" data-name="Neutral" />
                                <div className="bg-[var(--content-status-error)] flex-[18_0_0] h-full min-w-px relative" data-name="Unfavourable" />
                              </div>
                            </div>
                            <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-col gap-[1.981px] items-start overflow-clip relative shrink-0 w-full" data-name="Row / AI Overviews">
                              <div className="[word-break:break-word] bg-[var(--background-surface-raised)] content-stretch flex items-start justify-between leading-[1.45] not-italic overflow-clip relative shrink-0 text-[5.944px] w-full whitespace-nowrap" data-name="head">
                                <p className="font-[family-name:var(--font-family-default)] font-normal relative shrink-0 text-[color:var(--content-secondary)]">
                                  AI Overviews
                                </p>
                                <p className="font-[family-name:var(--font-family-default)] font-medium relative shrink-0 text-[color:var(--content-default)]">
                                  55%
                                </p>
                              </div>
                              <div className="content-stretch flex h-[4.953px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-full" data-name="Stacked Bar">
                                <div className="bg-[var(--content-status-success)] flex-[55_0_0] h-full min-w-px relative" data-name="Favourable" />
                                <div className="bg-[var(--chart-grid-crosshair)] flex-[29_0_0] h-full min-w-px relative" data-name="Neutral" />
                                <div className="bg-[var(--content-status-error)] flex-[16_0_0] h-full min-w-px relative" data-name="Unfavourable" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[var(--background-surface-raised)] border-[0.495px] border-[var(--border-default)] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch overflow-clip p-[9.907px] relative rounded-[3.963px] row-2 self-stretch shrink-0" data-name="Card / Checks">
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.3] not-italic relative shrink-0 text-[8.916px] text-[color:var(--content-default)] w-full">
                            Checks
                          </p>
                          <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-secondary)] w-full">
                            Each check is pass or fail against a fixed rule, run on every crawled page.
                          </p>
                          <div className="bg-[var(--background-surface-raised)] content-stretch flex flex-col gap-[1.981px] items-start overflow-clip pt-[7.925px] relative shrink-0 w-full" data-name="body">
                            <div className="[word-break:break-word] bg-[var(--background-surface-raised)] border-[var(--border-default)] border-b-[0.495px] border-solid content-stretch flex font-[family-name:var(--font-family-default)] font-normal items-start leading-[1.45] not-italic overflow-clip pb-[3.963px] relative shrink-0 text-[4.953px] text-[color:var(--content-secondary)] w-full" data-name="head">
                              <p className="flex-[1_0_0] min-w-px relative">
                                Check
                              </p>
                              <p className="relative shrink-0 w-[59.439px]">
                                Pass rate
                              </p>
                              <p className="relative shrink-0 text-right w-[45.57px]">
                                Result
                              </p>
                            </div>
                            <div className="content-stretch flex items-center overflow-clip py-[1.981px] relative shrink-0 w-full" data-name="Check / Reachable by AI crawlers">
                              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] min-w-px not-italic relative text-[5.944px] text-[color:var(--content-default)]">
                                Reachable by AI crawlers
                              </p>
                              <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.972px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-[59.439px]" data-name="Pass rate">
                                <div className="bg-[var(--content-status-warning)] flex-[18_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                <div className="flex-[6_0_0] h-full min-w-px relative" data-name="Rest" />
                              </div>
                              <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] text-right w-[45.57px]">
                                18 of 24
                              </p>
                            </div>
                            <div className="bg-[var(--background-surface-sunken)] content-stretch flex items-center overflow-clip py-[1.981px] relative shrink-0 w-full" data-name="Check / Product page carries structured data">
                              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] min-w-px not-italic relative text-[5.944px] text-[color:var(--content-default)]">
                                Product page carries structured data
                              </p>
                              <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.972px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-[59.439px]" data-name="Pass rate">
                                <div className="flex-[9_0_0] h-full min-w-px relative" data-name="Rest" />
                              </div>
                              <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-status-error)] text-right w-[45.57px]">
                                0 of 9
                              </p>
                            </div>
                            <div className="content-stretch flex items-center overflow-clip py-[1.981px] relative shrink-0 w-full" data-name="Check / Answer appears in the first paragraph">
                              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] min-w-px not-italic relative text-[5.944px] text-[color:var(--content-default)]">
                                Answer appears in the first paragraph
                              </p>
                              <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.972px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-[59.439px]" data-name="Pass rate">
                                <div className="bg-[var(--content-status-warning)] flex-[7_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                <div className="flex-[17_0_0] h-full min-w-px relative" data-name="Rest" />
                              </div>
                              <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] text-right w-[45.57px]">
                                7 of 24
                              </p>
                            </div>
                            <div className="bg-[var(--background-surface-sunken)] content-stretch flex items-center overflow-clip py-[1.981px] relative shrink-0 w-full" data-name="Check / Editorial page names an author">
                              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] min-w-px not-italic relative text-[5.944px] text-[color:var(--content-default)]">
                                Editorial page names an author
                              </p>
                              <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.972px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-[59.439px]" data-name="Pass rate">
                                <div className="flex-[11_0_0] h-full min-w-px relative" data-name="Rest" />
                              </div>
                              <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-status-error)] text-right w-[45.57px]">
                                0 of 11
                              </p>
                            </div>
                            <div className="content-stretch flex items-center overflow-clip py-[1.981px] relative shrink-0 w-full" data-name="Check / Comparison or alternatives page exists">
                              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] min-w-px not-italic relative text-[5.944px] text-[color:var(--content-default)]">
                                Comparison or alternatives page exists
                              </p>
                              <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.972px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-[59.439px]" data-name="Pass rate">
                                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Rest" />
                              </div>
                              <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-status-error)] text-right w-[45.57px]">
                                0 of 1
                              </p>
                            </div>
                            <div className="bg-[var(--background-surface-sunken)] content-stretch flex items-center overflow-clip py-[1.981px] relative shrink-0 w-full" data-name="Check / FAQ entry is phrased as a question">
                              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] min-w-px not-italic relative text-[5.944px] text-[color:var(--content-default)]">
                                FAQ entry is phrased as a question
                              </p>
                              <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.972px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-[59.439px]" data-name="Pass rate">
                                <div className="bg-[var(--content-status-warning)] flex-[4_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                <div className="flex-[10_0_0] h-full min-w-px relative" data-name="Rest" />
                              </div>
                              <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] text-right w-[45.57px]">
                                4 of 14
                              </p>
                            </div>
                            <div className="content-stretch flex items-center overflow-clip py-[1.981px] relative shrink-0 w-full" data-name="Check / Price visible without JavaScript">
                              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] min-w-px not-italic relative text-[5.944px] text-[color:var(--content-default)]">
                                Price visible without JavaScript
                              </p>
                              <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.972px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-[59.439px]" data-name="Pass rate">
                                <div className="bg-[var(--content-status-success)] flex-[9_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                <div className="h-full relative shrink-0 w-[4.953px]" data-name="Rest" />
                              </div>
                              <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] text-right w-[45.57px]">
                                9 of 9
                              </p>
                            </div>
                            <div className="bg-[var(--background-surface-sunken)] content-stretch flex items-center overflow-clip py-[1.981px] relative shrink-0 w-full" data-name="Check / Title matches how people ask">
                              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] min-w-px not-italic relative text-[5.944px] text-[color:var(--content-default)]">
                                Title matches how people ask
                              </p>
                              <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.972px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-[59.439px]" data-name="Pass rate">
                                <div className="bg-[var(--content-status-warning)] flex-[16_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                <div className="flex-[8_0_0] h-full min-w-px relative" data-name="Rest" />
                              </div>
                              <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] text-right w-[45.57px]">
                                16 of 24
                              </p>
                            </div>
                            <div className="content-stretch flex items-center overflow-clip py-[1.981px] relative shrink-0 w-full" data-name="Check / Updated in the last 12 months">
                              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font-family-default)] font-normal leading-[1.45] min-w-px not-italic relative text-[5.944px] text-[color:var(--content-default)]">
                                Updated in the last 12 months
                              </p>
                              <div className="bg-[var(--chart-grid-gridline)] content-stretch flex h-[2.972px] items-start overflow-clip relative rounded-[0.991px] shrink-0 w-[59.439px]" data-name="Pass rate">
                                <div className="bg-[var(--content-status-warning)] flex-[21_0_0] h-full min-w-px relative rounded-[0.991px]" data-name="Fill" />
                                <div className="flex-[3_0_0] h-full min-w-px relative" data-name="Rest" />
                              </div>
                              <p className="[word-break:break-word] font-[family-name:var(--font-family-default)] font-medium leading-[1.45] not-italic relative shrink-0 text-[5.944px] text-[color:var(--content-default)] text-right w-[45.57px]">
                                21 of 24
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex h-[455px] items-center justify-center right-0 top-[-0.44px] w-[402px]">
                    <div className="-rotate-90 flex-none">
                      <div className="h-[402px] relative w-[455px]" style={{ backgroundImage: 'linear-gradient(to top, var(--background-surface-page) 0%, transparent 42.877%)' }} />
                    </div>
                  </div>
                  <div className="-translate-x-1/2 absolute bottom-0 h-[365.778px] left-[calc(50%-0.22px)] w-[640px]" style={{ backgroundImage: 'linear-gradient(to top, var(--background-surface-page) 0%, transparent 42.877%)' }} />
                </div>
    </div>
  )
}
