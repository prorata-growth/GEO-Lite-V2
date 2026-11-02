"use client";
import { ArrowDown as e, ArrowLeft as t, ArrowRight as n, ArrowSquareOut as r, ArrowUp as i, ArrowsCounterClockwise as a, ArrowsDownUp as o, ArrowsInSimple as s, ArrowsOutSimple as c, Bell as l, CalendarBlank as u, CaretDoubleLeft as d, CaretDoubleRight as f, CaretDown as p, CaretLeft as m, CaretRight as h, CaretUp as g, CaretUpDown as _, ChartBar as v, Check as y, CheckCircle as b, Circle as x, CircleDashed as S, Desktop as C, DotsThree as w, Info as T, ListChecks as E, MagnifyingGlass as D, Minus as O, MinusCircle as k, Moon as A, Plus as j, SidebarSimple as M, Sun as ee, WarningCircle as te, WarningOctagon as N, X as ne } from "@phosphor-icons/react";
import { Fragment as P, jsx as F, jsxs as I } from "react/jsx-runtime";
import { Children as L, Fragment as re, cloneElement as ie, createContext as R, createElement as ae, forwardRef as oe, isValidElement as z, useCallback as se, useContext as ce, useEffect as B, useId as le, useImperativeHandle as ue, useLayoutEffect as V, useMemo as de, useRef as H, useState as U, useSyncExternalStore as W } from "react";
import { AnimatePresence as fe, LayoutGroup as pe, animate as G, cancelFrame as me, frame as he, motion as K, motionValue as ge, useAnimate as q, useInView as _e, useIsPresent as ve, useMotionValue as J, useMotionValueEvent as ye, usePresence as be, useReducedMotion as Y, useSpring as xe, useTransform as Se } from "motion/react";
import { Slot as Ce, Slottable as we } from "@radix-ui/react-slot";
import * as Te from "@radix-ui/react-popover";
import * as Ee from "@radix-ui/react-tooltip";
import { createPortal as De } from "react-dom";
import { Command as Oe, defaultFilter as ke } from "cmdk";
import * as Ae from "@radix-ui/react-dialog";
var je = {
	alert: "_alert_1574c_1",
	icon: "_icon_1574c_12",
	text: "_text_1574c_23",
	title: "_title_1574c_31",
	description: "_description_1574c_39",
	close: "_close_1574c_46",
	info: "_info_1574c_67",
	warning: "_warning_1574c_71",
	error: "_error_1574c_75",
	success: "_success_1574c_79",
	small: "_small_1574c_92"
}, Me = {
	info: /* @__PURE__ */ F(T, { weight: "fill" }),
	warning: /* @__PURE__ */ F(te, { weight: "fill" }),
	error: /* @__PURE__ */ F(N, { weight: "fill" }),
	success: /* @__PURE__ */ F(b, { weight: "fill" })
};
function Ne({ status: e = "info", title: t, children: n, icon: r, onDismiss: i, size: a = "default", className: o }) {
	let s = [
		je.alert,
		je[e],
		a === "small" && je.small,
		o
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("div", {
		className: s,
		role: "alert",
		children: [
			/* @__PURE__ */ F("span", {
				className: je.icon,
				children: r ?? Me[e]
			}),
			/* @__PURE__ */ I("div", {
				className: je.text,
				children: [t && /* @__PURE__ */ F("div", {
					className: je.title,
					children: t
				}), /* @__PURE__ */ F("div", {
					className: je.description,
					children: n
				})]
			}),
			i && /* @__PURE__ */ F("button", {
				type: "button",
				className: je.close,
				onClick: i,
				"aria-label": "Dismiss",
				children: /* @__PURE__ */ F(ne, { weight: "bold" })
			})
		]
	});
}
//#endregion
//#region src/internal/AccordionContext.ts
var Pe = R(null), Fe = { accordion: "_accordion_106l7_3" }, Ie = (e) => e == null ? [] : Array.isArray(e) ? e : [e];
function Le(e) {
	let { children: t, className: n } = e, r = e.value !== void 0, [i, a] = U(() => Ie(e.defaultValue)), o = r ? Ie(e.value) : i, s = H(null), c = se((t) => {
		let n = o.includes(t), i = e.type === "single" ? n ? [] : [t] : n ? o.filter((e) => e !== t) : [...o, t];
		r || a(i), e.type === "single" ? e.onValueChange?.(i[0] ?? null) : e.onValueChange?.(i);
	}, [
		o,
		r,
		e.type,
		e.onValueChange
	]), l = de(() => ({
		isOpen: (e) => o.includes(e),
		toggle: c
	}), [o, c]);
	return /* @__PURE__ */ F(Pe.Provider, {
		value: l,
		children: /* @__PURE__ */ F("div", {
			ref: s,
			className: [Fe.accordion, n].filter(Boolean).join(" "),
			onKeyDown: (e) => {
				if (![
					"ArrowDown",
					"ArrowUp",
					"Home",
					"End"
				].includes(e.key)) return;
				let t = Array.from(s.current?.querySelectorAll("[data-accordion-trigger]:not(:disabled)") ?? []), n = t.indexOf(document.activeElement);
				if (n === -1) return;
				e.preventDefault();
				let r = t.length - 1;
				t[e.key === "Home" ? 0 : e.key === "End" ? r : e.key === "ArrowDown" ? n === r ? 0 : n + 1 : n === 0 ? r : n - 1]?.focus();
			},
			children: t
		})
	});
}
//#endregion
//#region src/internal/Collapse.tsx
var Re = [
	.16,
	1,
	.3,
	1
], ze = { duration: 0 };
function Be(e) {
	return e ? ze : {
		duration: .32,
		ease: Re
	};
}
function Ve({ open: e, children: t }) {
	let n = Y(), r = H(null), i = {
		height: "auto",
		opacity: 1,
		transition: n ? ze : {
			height: {
				duration: .32,
				ease: Re
			},
			opacity: {
				duration: .22,
				delay: .06,
				ease: Re
			}
		}
	}, a = {
		height: 0,
		opacity: 0,
		overflow: "hidden",
		transition: n ? ze : {
			height: {
				duration: .24,
				ease: Re
			},
			opacity: {
				duration: .12,
				ease: Re
			}
		}
	};
	return /* @__PURE__ */ F(fe, {
		initial: !1,
		children: e && /* @__PURE__ */ F(K.div, {
			ref: r,
			initial: a,
			animate: i,
			exit: a,
			onAnimationComplete: () => {
				r.current && (r.current.style.overflow = "visible");
			},
			children: t
		}, "body")
	});
}
var He = {
	item: "_item_1g79h_6",
	heading: "_heading_1g79h_10",
	trigger: "_trigger_1g79h_15",
	text: "_text_1g79h_43",
	description: "_description_1g79h_50",
	leading: "_leading_1g79h_60",
	trailing: "_trailing_1g79h_61",
	hasLeading: "_hasLeading_1g79h_89",
	body: "_body_1g79h_89",
	chevron: "_chevron_1g79h_95",
	chevronIcon: "_chevronIcon_1g79h_106",
	disabled: "_disabled_1g79h_137",
	hug: "_hug_1g79h_162"
};
//#endregion
//#region src/components/AccordionItem/AccordionItem.tsx
function Ue({ value: e, title: t, description: n, leading: r, trailing: i, children: a, disabled: o = !1, headingLevel: s = 3, hug: c = !1, open: l, defaultOpen: u = !1, onOpenChange: d, className: f }) {
	let m = le(), h = `${m}-trigger`, g = `${m}-body`, _ = e ?? m, v = ce(Pe), y = Y(), [b, x] = U(u), S = v ? v.isOpen(_) : l ?? b;
	return /* @__PURE__ */ I("div", {
		className: [
			He.item,
			o ? He.disabled : "",
			r ? He.hasLeading : "",
			c ? He.hug : "",
			f
		].filter(Boolean).join(" "),
		children: [ae(`h${s}`, { className: He.heading }, /* @__PURE__ */ I("button", {
			type: "button",
			id: h,
			"data-accordion-trigger": "",
			className: He.trigger,
			"aria-expanded": S,
			"aria-controls": S ? g : void 0,
			disabled: o,
			onClick: () => {
				o || (v ? v.toggle(_) : l === void 0 && x(!S), d?.(!S));
			},
			children: [
				r && /* @__PURE__ */ F("span", {
					className: He.leading,
					"aria-hidden": "true",
					children: r
				}),
				/* @__PURE__ */ I("span", {
					className: He.text,
					children: [/* @__PURE__ */ F("span", { children: t }), n && /* @__PURE__ */ F("span", {
						className: He.description,
						children: n
					})]
				}),
				i && /* @__PURE__ */ F("span", {
					className: He.trailing,
					children: i
				}),
				/* @__PURE__ */ F(K.span, {
					className: He.chevron,
					"aria-hidden": "true",
					initial: !1,
					animate: { rotate: S ? 180 : 0 },
					transition: Be(y),
					children: /* @__PURE__ */ F(p, {
						weight: "bold",
						className: He.chevronIcon
					})
				})
			]
		})), /* @__PURE__ */ F(Ve, {
			open: S,
			children: /* @__PURE__ */ F("div", {
				id: g,
				role: "region",
				"aria-labelledby": h,
				className: He.body,
				children: a
			})
		})]
	});
}
var We = {
	avatar: "_avatar_13mes_1",
	withImage: "_withImage_13mes_17",
	image: "_image_13mes_21",
	initials: "_initials_13mes_29",
	text100: "_text100_13mes_33",
	text200: "_text200_13mes_41",
	text300: "_text300_13mes_49",
	hue1: "_hue1_13mes_57",
	hue2: "_hue2_13mes_58",
	hue3: "_hue3_13mes_59",
	hue4: "_hue4_13mes_60",
	hue5: "_hue5_13mes_61"
};
//#endregion
//#region src/components/Avatar/Avatar.tsx
function Ge(e) {
	let t = e.split("@")[0].trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "" : ((Array.from(t[0])[0] ?? "") + (t.length > 1 ? Array.from(t[t.length - 1])[0] ?? "" : "")).toUpperCase();
}
function Ke(e) {
	let t = 2166136261;
	for (let n of e.trim().toLowerCase()) t ^= n.codePointAt(0) ?? 0, t = Math.imul(t, 16777619);
	return t ^= t >>> 16, t = Math.imul(t, 2246822507), t ^= t >>> 13, t = Math.imul(t, 3266489909), t ^= t >>> 16, (t >>> 0) % 5 + 1;
}
function qe({ src: e, name: t, alt: n = "", size: r = 24, className: i, style: a }) {
	let o = !e && t ? Ge(t) : "", s = r < 20 ? Array.from(o)[0] ?? "" : o, c = r <= 26 ? We.text100 : r <= 34 ? We.text200 : We.text300, l = [
		We.avatar,
		e && We.withImage,
		s && We.initials,
		s && We[`hue${Ke(t)}`],
		s && c,
		i
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("span", {
		className: l,
		style: {
			width: r,
			height: r,
			...a
		},
		role: s && n ? "img" : void 0,
		"aria-label": s && n ? n : void 0,
		children: [e && /* @__PURE__ */ F("img", {
			className: We.image,
			src: e,
			alt: n
		}), s && /* @__PURE__ */ F("span", {
			"aria-hidden": "true",
			children: s
		})]
	});
}
var Je = {
	group: "_group_1p0jt_1",
	overflow: "_overflow_1p0jt_9"
};
//#endregion
//#region src/components/AvatarGroup/AvatarGroup.tsx
function Ye({ avatars: e, size: t = 30, max: n, className: r }) {
	let i = n ? e.slice(0, n) : e, a = n ? Math.max(e.length - n, 0) : 0, o = [Je.group, r].filter(Boolean).join(" "), s = i.some((e) => !e.src && e.name) && t < 32 ? -t / 6 : -t / 3;
	return /* @__PURE__ */ I("div", {
		className: o,
		children: [i.map((e, n) => /* @__PURE__ */ F(qe, {
			...e,
			size: t,
			style: n > 0 ? { marginLeft: s } : void 0
		}, n)), a > 0 && /* @__PURE__ */ I("span", {
			className: Je.overflow,
			style: {
				width: t,
				height: t,
				marginLeft: i.length > 0 ? s : void 0
			},
			children: ["+", a]
		})]
	});
}
var Xe = {
	spinner: "_spinner_1p7k2_4",
	xs: "_xs_1p7k2_11",
	sm: "_sm_1p7k2_16",
	md: "_md_1p7k2_21",
	lg: "_lg_1p7k2_26",
	spokes: "_spokes_1p7k2_33",
	spoke: "_spoke_1p7k2_33",
	"spoke-fade": "_spoke-fade_1p7k2_1",
	svg: "_svg_1p7k2_64",
	fade: "_fade_1p7k2_69",
	spin: "_spin_1p7k2_4",
	dash: "_dash_1p7k2_75",
	dashArc: "_dashArc_1p7k2_79",
	"dash-grow": "_dash-grow_1p7k2_1",
	breathe: "_breathe_1p7k2_1",
	srOnly: "_srOnly_1p7k2_137"
}, Ze = Array.from({ length: 12 }, (e, t) => t), Qe = (e) => Math.round((1 - .85 * ((12 - e) / 12 % 1)) * 100) / 100;
function $e() {
	return /* @__PURE__ */ F("span", {
		className: Xe.spokes,
		"aria-hidden": "true",
		children: Ze.map((e) => /* @__PURE__ */ F("span", {
			className: Xe.spoke,
			style: {
				"--i": e,
				"--rest": Qe(e)
			}
		}, e))
	});
}
function et() {
	let e = le().replace(/:/g, "");
	return /* @__PURE__ */ I("svg", {
		className: Xe.svg,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ I("defs", { children: [/* @__PURE__ */ I("linearGradient", {
			id: `${e}-lead`,
			x1: "50%",
			x2: "50%",
			y1: "5.271%",
			y2: "91.793%",
			children: [/* @__PURE__ */ F("stop", {
				offset: "0%",
				stopColor: "currentColor"
			}), /* @__PURE__ */ F("stop", {
				offset: "100%",
				stopColor: "currentColor",
				stopOpacity: "0.55"
			})]
		}), /* @__PURE__ */ I("linearGradient", {
			id: `${e}-trail`,
			x1: "50%",
			x2: "50%",
			y1: "15.24%",
			y2: "87.15%",
			children: [/* @__PURE__ */ F("stop", {
				offset: "0%",
				stopColor: "currentColor",
				stopOpacity: "0"
			}), /* @__PURE__ */ F("stop", {
				offset: "100%",
				stopColor: "currentColor",
				stopOpacity: "0.55"
			})]
		})] }), /* @__PURE__ */ I("g", {
			transform: "translate(1.5 1.625)",
			children: [/* @__PURE__ */ F("path", {
				d: "M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021",
				fill: `url(#${e}-lead)`
			}), /* @__PURE__ */ F("path", {
				d: "M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118",
				fill: `url(#${e}-trail)`
			})]
		})]
	});
}
function tt() {
	return /* @__PURE__ */ I("svg", {
		className: Xe.svg,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ F("circle", {
			cx: "12",
			cy: "12",
			r: "9.5",
			opacity: "0.1",
			strokeWidth: "2",
			strokeLinecap: "round"
		}), /* @__PURE__ */ F("circle", {
			className: Xe.dashArc,
			cx: "12",
			cy: "12",
			r: "9.5",
			strokeWidth: "2",
			strokeLinecap: "round"
		})]
	});
}
function nt({ variant: e = "classic", size: t = "md", label: n, className: r }) {
	let i = F(e === "fade" ? et : e === "dash" ? tt : $e, {}), a = [
		Xe.spinner,
		Xe[t],
		Xe[e],
		r
	].filter(Boolean).join(" ");
	return n ? /* @__PURE__ */ I("span", {
		className: a,
		"data-variant": e,
		role: "status",
		children: [i, /* @__PURE__ */ F("span", {
			className: Xe.srOnly,
			children: n
		})]
	}) : /* @__PURE__ */ F("span", {
		className: a,
		"data-variant": e,
		"aria-hidden": "true",
		children: i
	});
}
var rt = {
	button: "_button_r68lq_1",
	fullWidth: "_fullWidth_r68lq_17",
	loading: "_loading_r68lq_65",
	spinner: "_spinner_r68lq_79",
	ghost: "_ghost_r68lq_101 _ghost_1lal8_3",
	primary: "_primary_r68lq_107 _primary_1lal8_3",
	secondary: "_secondary_r68lq_111 _secondary_1lal8_3",
	tertiary: "_tertiary_r68lq_115 _tertiary_1lal8_3",
	danger: "_danger_r68lq_123 _danger_1lal8_3",
	accent: "_accent_r68lq_127 _accent_1lal8_64",
	xsmall: "_xsmall_r68lq_138",
	small: "_small_r68lq_149",
	medium: "_medium_r68lq_159",
	large: "_large_r68lq_169",
	icon: "_icon_r68lq_179"
};
//#endregion
//#region src/components/Button/Button.tsx
function it({ type: e = "primary", size: t = "medium", leadingIcon: n, trailingIcon: r, htmlType: i = "button", loading: a = !1, href: o, target: s, rel: c, asChild: l = !1, fullWidth: u = !1, onClick: d, className: f, children: p, ...m }) {
	let h = [
		rt.button,
		rt[e],
		rt[t],
		a && rt.loading,
		u && rt.fullWidth,
		f
	].filter(Boolean).join(" "), g = /* @__PURE__ */ I(P, { children: [
		n && /* @__PURE__ */ F("span", {
			className: rt.icon,
			children: n
		}),
		p,
		r && /* @__PURE__ */ F("span", {
			className: rt.icon,
			children: r
		}),
		a && /* @__PURE__ */ F("span", {
			className: rt.spinner,
			children: /* @__PURE__ */ F(nt, { size: t === "xsmall" ? "sm" : "md" })
		})
	] });
	if (l) {
		let { disabled: e, ...i } = m, o = e || a;
		return /* @__PURE__ */ I(Ce, {
			className: h,
			"aria-busy": a || void 0,
			"aria-disabled": e || void 0,
			tabIndex: e ? -1 : void 0,
			onClick: (e) => {
				o ? e.preventDefault() : d?.(e);
			},
			...i,
			children: [
				n && /* @__PURE__ */ F("span", {
					className: rt.icon,
					children: n
				}),
				/* @__PURE__ */ F(we, { children: p }),
				r && /* @__PURE__ */ F("span", {
					className: rt.icon,
					children: r
				}),
				a && /* @__PURE__ */ F("span", {
					className: rt.spinner,
					children: /* @__PURE__ */ F(nt, { size: t === "xsmall" ? "sm" : "md" })
				})
			]
		});
	}
	if (o !== void 0) {
		let { disabled: e, ...t } = m, n = e || a;
		return /* @__PURE__ */ F("a", {
			href: e ? void 0 : o,
			target: s,
			rel: c,
			className: h,
			"aria-busy": a || void 0,
			"aria-disabled": e || void 0,
			tabIndex: e ? -1 : void 0,
			onClick: (e) => {
				n ? e.preventDefault() : d?.(e);
			},
			...t,
			children: g
		});
	}
	return /* @__PURE__ */ F("button", {
		type: i,
		className: h,
		"aria-busy": a || void 0,
		onClick: a ? (e) => e.preventDefault() : d,
		...m,
		children: g
	});
}
//#endregion
//#region src/internal/AnimatedPopoverContent.tsx
function at({ open: e, children: t, align: n = "start", ...r }) {
	let i = Y(), a = H(null), [o, s] = U(n);
	V(() => {
		if (!e) {
			s(n);
			return;
		}
		let t = a.current?.parentElement;
		if (!t || n === "center" || !t.id) return;
		let r = document.querySelector(`[aria-controls="${CSS.escape(t.id)}"]`);
		if (!r) return;
		let i = r.getBoundingClientRect(), o = a.current.offsetWidth, c = document.documentElement.clientWidth;
		s(n === "start" ? i.left + o > c && i.right - o >= 0 ? "end" : "start" : i.right - o < 0 && i.left + o <= c ? "start" : "end");
	}, [e, n]);
	let c = i ? 0 : r.side === "top" ? 4 : -4, l = i ? 1 : .96, u = i ? 0 : .15;
	return /* @__PURE__ */ F(Te.Portal, {
		forceMount: !0,
		children: /* @__PURE__ */ F(fe, { children: e && /* @__PURE__ */ F(Te.Content, {
			forceMount: !0,
			align: o,
			...r,
			children: /* @__PURE__ */ F(K.div, {
				ref: a,
				initial: {
					opacity: 0,
					scale: l,
					y: c
				},
				animate: {
					opacity: 1,
					scale: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					scale: l,
					y: c
				},
				transition: {
					duration: u,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				children: t
			})
		}) })
	});
}
//#endregion
//#region src/internal/menuContext.ts
var ot = R(null), st = {
	menu: "_menu_u24p1_1",
	scrolls: "_scrolls_u24p1_23"
};
//#endregion
//#region src/components/Menu/Menu.tsx
function ct({ children: e, className: t, ref: n, ...r }) {
	let i = H(null), [a, o] = U(!1);
	V(() => {
		let e = i.current;
		if (!e) return;
		let t = () => o(e.scrollHeight > e.clientHeight + 1);
		t();
		let n = new ResizeObserver(t);
		n.observe(e);
		for (let t of Array.from(e.children)) n.observe(t);
		return () => n.disconnect();
	});
	let s = se((e) => {
		i.current = e, typeof n == "function" ? n(e) : n && (n.current = e);
	}, [n]), c = [
		st.menu,
		a && st.scrolls,
		t
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("div", {
		ref: s,
		role: "menu",
		className: c,
		...r,
		children: e
	});
}
var lt = {
	content: "_content_gg94x_3",
	menu: "_menu_gg94x_10"
};
//#endregion
//#region src/components/MenuPopover/MenuPopover.tsx
function ut({ trigger: e, children: t, open: n, defaultOpen: r = !1, onOpenChange: i, side: a = "bottom", align: o = "start", matchTriggerWidth: s = !1, closeOnSelect: c = !0, initialFocus: l = "first", className: u, menuClassName: d }) {
	let f = H(null), [p, m] = U(r), h = n ?? p, g = (e) => {
		n === void 0 && m(e), i?.(e);
	}, _ = (e) => {
		if (!c) return;
		let t = e.target.closest("[role=\"menuitem\"]");
		t && !t.disabled && !t.hasAttribute("data-keeps-open") && g(!1);
	}, v = H(null), y = {
		select: () => c && g(!1),
		escapeGuard: v
	};
	return /* @__PURE__ */ I(Te.Root, {
		open: h,
		onOpenChange: g,
		children: [/* @__PURE__ */ F(Te.Trigger, {
			asChild: !0,
			children: e
		}), /* @__PURE__ */ F(at, {
			open: h,
			side: a,
			align: o,
			sideOffset: 8,
			className: [lt.content, u].filter(Boolean).join(" "),
			style: s ? { width: "var(--radix-popover-trigger-width)" } : void 0,
			onEscapeKeyDown: (e) => {
				v.current?.() && e.preventDefault();
			},
			onOpenAutoFocus: l === "menu" ? (e) => {
				e.preventDefault(), f.current?.focus({ preventScroll: !0 });
			} : void 0,
			children: /* @__PURE__ */ F(ot.Provider, {
				value: y,
				children: /* @__PURE__ */ F(ct, {
					ref: f,
					tabIndex: l === "menu" ? -1 : void 0,
					className: [lt.menu, d].filter(Boolean).join(" "),
					onClick: _,
					style: s ? {
						width: "100%",
						boxSizing: "border-box"
					} : void 0,
					children: t
				})
			})
		})]
	});
}
var dt = {
	bar: "_bar_1ihx5_4",
	count: "_count_1ihx5_16",
	actions: "_actions_1ihx5_28",
	clear: "_clear_1ihx5_32",
	srOnly: "_srOnly_1ihx5_36"
}, ft = R(void 0);
function pt({ count: e, onClear: t, clearLabel: n = "Clear selection", children: r, className: i }) {
	let a = ce(ft), o = e ?? a?.count ?? 0, s = e ?? a?.settled ?? 0;
	return /* @__PURE__ */ I("div", {
		className: [dt.bar, i].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ I("span", {
				className: dt.count,
				"aria-hidden": "true",
				children: [o, " selected"]
			}),
			/* @__PURE__ */ I("span", {
				className: dt.srOnly,
				"aria-live": "polite",
				children: [s, " selected"]
			}),
			/* @__PURE__ */ F("div", {
				className: dt.actions,
				children: r
			}),
			/* @__PURE__ */ F("span", {
				className: dt.clear,
				children: /* @__PURE__ */ F(it, {
					type: "tertiary",
					size: "small",
					onClick: t,
					children: n
				})
			})
		]
	});
}
function mt({ label: e, children: t, closeOnSelect: n = !0, open: r, onOpenChange: i }) {
	return /* @__PURE__ */ F(ut, {
		trigger: /* @__PURE__ */ F(it, {
			type: "secondary",
			size: "small",
			trailingIcon: /* @__PURE__ */ F(p, {}),
			children: e
		}),
		align: "start",
		closeOnSelect: n,
		open: r,
		onOpenChange: i,
		children: t
	});
}
var ht = {
	content: "_content_unvt2_1",
	"tooltip-in": "_tooltip-in_unvt2_1",
	"tooltip-out": "_tooltip-out_unvt2_1",
	arrow: "_arrow_unvt2_52"
};
//#endregion
//#region src/components/Tooltip/Tooltip.tsx
function gt({ content: e, children: t, side: n = "top", sideOffset: r = 8, showArrow: i = !0, delayDuration: a = 300, open: o, defaultOpen: s, onOpenChange: c, ...l }) {
	return /* @__PURE__ */ F(Ee.Provider, {
		delayDuration: a,
		children: /* @__PURE__ */ I(Ee.Root, {
			open: o,
			defaultOpen: s,
			onOpenChange: c,
			children: [/* @__PURE__ */ F(Ee.Trigger, {
				asChild: !0,
				...l,
				children: t
			}), /* @__PURE__ */ F(Ee.Portal, { children: /* @__PURE__ */ I(Ee.Content, {
				className: ht.content,
				side: n,
				sideOffset: r,
				children: [e, i && /* @__PURE__ */ F(Ee.Arrow, {
					className: ht.arrow,
					width: 14,
					height: 6
				})]
			}) })]
		})
	});
}
var _t = {
	button: "_button_17llv_2",
	content: "_content_17llv_36",
	example: "_example_17llv_43"
};
//#endregion
//#region src/components/InfoTip/InfoTip.tsx
function vt({ label: e, text: t, example: n, side: r, className: i }) {
	return /* @__PURE__ */ F(gt, {
		side: r,
		content: /* @__PURE__ */ I("span", {
			className: _t.content,
			children: [/* @__PURE__ */ F("span", { children: t }), n && /* @__PURE__ */ F("span", {
				className: _t.example,
				children: n
			})]
		}),
		children: /* @__PURE__ */ F("button", {
			type: "button",
			"aria-label": `What is ${e}?`,
			className: [_t.button, i].filter(Boolean).join(" "),
			onClick: (e) => e.stopPropagation(),
			children: /* @__PURE__ */ F(T, { "aria-hidden": "true" })
		})
	});
}
var yt = {
	grid: "_grid_1qc8w_3",
	dot: "_dot_1qc8w_11",
	filled: "_filled_1qc8w_18"
};
//#endregion
//#region src/components/DotGrid/DotGrid.tsx
function bt({ total: e, filled: t, columns: n = 25, size: r = 10, className: i, ...a }) {
	return /* @__PURE__ */ F("div", {
		role: "img",
		"aria-label": a["aria-label"],
		className: [yt.grid, i].filter(Boolean).join(" "),
		style: {
			"--dot-columns": n,
			"--dot-size": `${r}px`
		},
		children: Array.from({ length: e }, (e, n) => /* @__PURE__ */ F("span", { className: [yt.dot, n < t && yt.filled].filter(Boolean).join(" ") }, n))
	});
}
var xt = {
	wrap: "_wrap_zlzfv_3",
	list: "_list_zlzfv_7",
	row: "_row_zlzfv_13",
	key: "_key_zlzfv_26",
	value: "_value_zlzfv_35",
	spread: "_spread_zlzfv_46",
	columns: "_columns_zlzfv_55",
	stacked: "_stacked_zlzfv_62",
	ruled: "_ruled_zlzfv_80",
	fields: "_fields_zlzfv_102",
	textRow: "_textRow_zlzfv_126"
};
//#endregion
//#region src/components/KeyValueList/KeyValueList.tsx
function St({ items: e, layout: t = "spread", keyWidth: n = 240, rules: r, fields: i = !1, className: a, ...o }) {
	let s = r ?? t !== "stacked";
	return /* @__PURE__ */ F("div", {
		className: [xt.wrap, a].filter(Boolean).join(" "),
		children: /* @__PURE__ */ F("dl", {
			"aria-label": o["aria-label"],
			className: [
				xt.list,
				xt[t],
				s && xt.ruled,
				i && xt.fields
			].filter(Boolean).join(" "),
			style: t === "columns" ? { "--kv-key-width": `${n}px` } : void 0,
			children: e.map((e, t) => /* @__PURE__ */ I("div", {
				className: [xt.row, e.text && xt.textRow].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ F("dt", {
					className: xt.key,
					children: e.key
				}), /* @__PURE__ */ F("dd", {
					className: xt.value,
					children: e.value
				})]
			}, t))
		})
	});
}
var Ct = {
	text: "_text_pc8dp_3",
	tip: "_tip_pc8dp_11"
};
//#endregion
//#region src/components/TruncatedText/TruncatedText.tsx
function wt({ text: e, maxWidth: t, tooltipMaxWidth: n = 360, className: r }) {
	let i = H(null), [a, o] = U(!1), s = () => !!i.current && i.current.scrollWidth > i.current.clientWidth + 1;
	return /* @__PURE__ */ F(gt, {
		content: /* @__PURE__ */ F("span", {
			className: Ct.tip,
			style: { maxWidth: n },
			children: e
		}),
		open: a,
		onOpenChange: (e) => o(e && s()),
		children: /* @__PURE__ */ F("span", {
			ref: i,
			className: [Ct.text, r].filter(Boolean).join(" "),
			style: t === void 0 ? void 0 : { maxWidth: t },
			children: e
		})
	});
}
var Tt = {
	layer: "_layer_1wrjz_4",
	rail: "_rail_1wrjz_11",
	vertical: "_vertical_1wrjz_19",
	horizontal: "_horizontal_1wrjz_23",
	on: "_on_1wrjz_27",
	thumb: "_thumb_1wrjz_32",
	dragging: "_dragging_1wrjz_56"
}, Et = "data-overlay-scrollbars", Dt = 900, Ot = 600, kt = 28, At = 8, jt = /* @__PURE__ */ new Set([
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"PageUp",
	"PageDown",
	"Home",
	"End",
	" "
]), Mt = "input", Nt = "textarea, [contenteditable]:not([contenteditable=\"false\"])", Pt = null;
function Ft() {
	if (typeof document > "u") return () => {};
	if (Pt) return Pt;
	let e = /* @__PURE__ */ new Map(), t = null, n = 0, r = 0, i = /* @__PURE__ */ new Set(), a = () => document.scrollingElement ?? document.documentElement, o = (e) => e === a() || e === document.body, s = (e) => o(e) ? a() : e, c = (e) => {
		if (o(e)) return {
			top: 0,
			left: 0
		};
		let t = e.getBoundingClientRect();
		return {
			top: t.top,
			left: t.left
		};
	}, l = document.createElement("div");
	l.className = Tt.layer, l.setAttribute("aria-hidden", "true"), document.body.appendChild(l), document.documentElement.setAttribute(Et, "");
	function u(e, n) {
		let r = document.createElement("div");
		r.className = `${Tt.rail} ${e === "v" ? Tt.vertical : Tt.horizontal}`;
		let i = document.createElement("div");
		i.className = Tt.thumb, r.appendChild(i), i.addEventListener("pointerdown", (a) => {
			a.preventDefault(), i.setPointerCapture?.(a.pointerId);
			let o = s(n), c = e === "v" ? r.clientHeight : r.clientWidth, l = e === "v" ? i.offsetHeight : i.offsetWidth, u = e === "v" ? o.scrollHeight - o.clientHeight : o.scrollWidth - o.clientWidth;
			t = {
				el: n,
				axis: e,
				start: e === "v" ? a.clientY : a.clientX,
				startScroll: e === "v" ? o.scrollTop : o.scrollLeft,
				ratio: u / Math.max(1, c - l)
			}, r.classList.add(Tt.dragging);
		}), i.addEventListener("pointermove", (r) => {
			if (!t || t.el !== n || t.axis !== e) return;
			let i = s(n), a = ((e === "v" ? r.clientY : r.clientX) - t.start) * t.ratio;
			e === "v" ? i.scrollTop = t.startScroll + a : i.scrollLeft = t.startScroll + a;
		});
		let a = () => {
			t = null, r.classList.remove(Tt.dragging), p(n);
		};
		return i.addEventListener("pointerup", a), i.addEventListener("pointercancel", a), l.appendChild(r), {
			rail: r,
			thumb: i
		};
	}
	function d(e) {
		let t = e.getBoundingClientRect(), n = {
			tr: 0,
			br: 0,
			bl: 0
		}, r = e;
		for (let e = 0; r && e < 6; e++, r = r.parentElement) {
			let e = getComputedStyle(r), i = r.getBoundingClientRect(), a = Math.abs(i.right - t.right) < 3, o = Math.abs(i.top - t.top) < 3, s = Math.abs(i.bottom - t.bottom) < 3, c = Math.abs(i.left - t.left) < 3, l = (t) => parseFloat(e.getPropertyValue(t)) || 0;
			!n.tr && a && o && (n.tr = Math.max(0, l("border-top-right-radius") - l("border-right-width"))), !n.br && a && s && (n.br = Math.max(0, l("border-bottom-right-radius") - l("border-right-width"))), !n.bl && c && s && (n.bl = Math.max(0, l("border-bottom-left-radius") - l("border-left-width")));
		}
		return n;
	}
	function f(e, t) {
		let n = s(e), r = c(e), i = o(e), a = n.scrollHeight > n.clientHeight + 1, l = n.scrollWidth > n.clientWidth + 1 && !e.matches(Nt), f = i ? {
			tr: 0,
			br: 0,
			bl: 0
		} : d(e), p = i ? 0 : n.clientLeft, m = i ? 0 : n.clientTop;
		if (a) {
			t.v ??= u("v", e);
			let a = i ? window.innerHeight : n.clientHeight, o = Math.max(kt, n.clientHeight / n.scrollHeight * a), s = n.scrollTop / Math.max(1, n.scrollHeight - n.clientHeight) * (a - o);
			Object.assign(t.v.rail.style, {
				top: `${r.top + m}px`,
				left: `${r.left + p + (i ? window.innerWidth : n.clientWidth) - At}px`,
				height: `${a}px`,
				borderTopRightRadius: `${f.tr}px`,
				borderBottomRightRadius: `${f.br}px`
			}), Object.assign(t.v.thumb.style, {
				height: `${o}px`,
				transform: `translateY(${s}px)`
			});
		}
		if (l) {
			t.h ??= u("h", e);
			let a = i ? window.innerWidth : n.clientWidth, o = Math.max(kt, n.clientWidth / n.scrollWidth * a), s = n.scrollLeft / Math.max(1, n.scrollWidth - n.clientWidth) * (a - o);
			Object.assign(t.h.rail.style, {
				left: `${r.left + p}px`,
				top: `${r.top + m + (i ? window.innerHeight : n.clientHeight) - At}px`,
				width: `${a}px`,
				borderBottomLeftRadius: `${f.bl}px`,
				borderBottomRightRadius: `${f.br}px`
			}), Object.assign(t.h.thumb.style, {
				width: `${o}px`,
				transform: `translateX(${s}px)`
			});
		}
		return {
			vy: a,
			hx: l
		};
	}
	function p(n) {
		let r = e.get(n) ?? {};
		e.set(n, r);
		let { vy: i, hx: a } = f(n, r);
		r.v?.rail.classList.toggle(Tt.on, i), r.h?.rail.classList.toggle(Tt.on, a), window.clearTimeout(r.timer), r.timer = window.setTimeout(() => {
			t?.el !== n && (r.v?.rail.classList.remove(Tt.on), r.h?.rail.classList.remove(Tt.on));
		}, Dt);
	}
	let m = () => {
		n = performance.now();
	}, h = (e) => {
		jt.has(e.key) && m();
	}, g = (o) => {
		let s = o.target === document ? a() : o.target;
		!(s instanceof Element) || s.matches(Mt) || ((performance.now() - n < Ot || t) && i.add(s), cancelAnimationFrame(r), r = requestAnimationFrame(() => {
			i.forEach((e) => p(e)), e.forEach((t, n) => {
				if (!n.isConnected) {
					t.v?.rail.remove(), t.h?.rail.remove(), window.clearTimeout(t.timer), e.delete(n);
					return;
				}
				let r = t.v?.rail.classList.contains(Tt.on) || t.h?.rail.classList.contains(Tt.on);
				!i.has(n) && r && f(n, t);
			}), i.clear();
		}));
	}, _ = {
		capture: !0,
		passive: !0
	};
	return document.addEventListener("wheel", m, _), document.addEventListener("touchmove", m, _), document.addEventListener("keydown", h, { capture: !0 }), document.addEventListener("scroll", g, _), Pt = () => {
		document.removeEventListener("wheel", m, _), document.removeEventListener("touchmove", m, _), document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("scroll", g, _), cancelAnimationFrame(r), e.forEach((e) => window.clearTimeout(e.timer)), e.clear(), l.remove(), document.documentElement.removeAttribute(Et), Pt = null;
	}, Pt;
}
//#endregion
//#region src/engines/index.ts
var It = {
	ChatGPT: "data:image/png;base64,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",
	Perplexity: "data:image/png;base64,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",
	"Google AI Overviews": "data:image/png;base64,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",
	Claude: "data:image/png;base64,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",
	Gemini: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAIAAADdvvtQAAA4D0lEQVR42u2915YkR5Yttvcxc/eISFESotGD5szcy/vAxf//EfKJ5KzpabQASleKEO5mZ/PBzD08MrMANKYKKGSGN1av0lUZceLILbjrHZ/gkfQLfheF+/SIxH17br5DhuNzfP4bzzGAjs8xgI7PMYCOzzGAjs8xgI7P8TkG0PE5BtDx+d088RP9ufwFOzTh9p7q+Bwz0PE5BtDxOT7HADo+xwA6PscAOj7HADo+x+cYQMfnGEDH5xhAxwfHTfS9f/hBXCc/8MMav83xv2MAPbDHJZJGGms8uDLqkcZgkOCiDqNDBOHUGEDER7rO8BhA+F1ix0kSBCCNYWEkDMysv2iWbTh+T4CPHQJxLGEPNoYkuUoG8oPsJE6BIUCcJwqCPgaVjj3Qg+17KMAlAObzKiJJgsQblUXzwDs20Q8+gAwS5O71e5i3ww7/wADrY/E6BtADDyDSRnKkCJAQIQgSJBG63d7U3KMPkfCOAYQHtB+jAC+dMSkSkAteypcZRsQcAUKCuO+Fjhno+FAwEZBgJAiXspSziwhA4EGGsf38pWMAHR8AAgWKIEoAAUP2nFyBCOOATs2K1zGAjs+sGxYkiWYiJCS3Pg0pJZOFEN1AljDSjd55rGT2EGraMYDu2vpK2R1wMAgsw1WfMTiyy4iQYQGRtQECoNI9c8xHPB5TH3YDRLokd5eAMoGZBvkueRKc4ys3Vq3x6CUcr/EPvfeRCMQQIQw5mQkGBcTW+pQvN6nPssgQMMs5TpMF2viAwWH6nE4Z/BnPMYA+3gRGGkjVS4UAF1LGkJQypYMTJwGWBXX93dQDuMMfA+jHDt/uTiJacNWT+maHlA0MKXNIcD/8LeXwUc4c+wA6lrAHmoDgOZOwEOSg4I7NTn1mBvvkfVJyOEADYRApmEAnRIkQx+8dA+ghZqBSj2gWJLqQHNtdHjJcHJJvBw2+DzdO+UbT/5WegrrvEXQMoA+00u4AzQggO4akvk9DUnZLWf2AIe/vXqxBB8nlgk/N9XEP9DBTkEMCIRISckI/qE8+5HqZ7xOGAd5Mi2ca4CrlDoKpLoNkxx7o4Y3xAAnWzobE4NgNyJkuuOiwNPjQu3zcAYlAgb/aR8SxHjPQ7/qDZVYupIZhQN/DYXVMJ1L2oc+erVYxI8CKGnpgn8ljAN2Nhw4kAQdI5EHDAFgoAWRm7jllzw7nOLaRJbZ4hHPcizH84Kr5Yf7NfHCa/2LS5KILDHB5dphFp8tFi549q8CjkYAGRDCqNNLAQ4qieB/zh+MQgfoBatd0xzq4YpWFshM0ghgG7Ia863PvDWGhgcgsrne62iis2LRwQq7aPMGlJNFo98y54bMLoNt+GvwYK8CJfzMlId0AWpB78g1BzjKSxhUQLRhd2Gyw2fi2322H3CyWbRvkyM71oHdXvljYKjIJqXcIIVBw1yAxsDUa/CMsgn61XdJPnsNuv2Xx4dFK66tATgnDAQNJUZpuipaEXcIu+eDZZxexwtQQMGRsB2wS2gCFAC+h5TDRSn0rmc2OGeheRZMEsh5JJ+A8SO5PpEYiZWx77YYhpSSBNAdyBgXSYBpyXm+4aBgXiKG0QAIQYgAJl+T3vqu2B0g4ZV0bO+TT0ZyacjjLC5OFXZ+2u2EYHF5vXjkj5zpz9UPebPJuBzmCwSgJBIKFyCAXJPIYQPeTcaoZpwI27nAgwA2gE8l9l/J2yNkBBgtBojvcAcFICX0atn3KDhpgcEGgMZDm5axxbKJ/hzZv2MMDedvHbj9/jadOssxiIzNHgjuGjD5pSMoCGEArAWSAjZ+7nPIw5JSie8lfEfSCin0gy+h4LyHNPw7mqt0zZJgBw2ZHdReGhD6hT8gZAkVTmdG8tE4ASDM50qC+xzAgBNLICR/9MPZB8d4lnxtt6yF2sKz5WImlEzdQMsgAlkVgBrYD1jsNSUl0jeDUCerhhBkZZDakvN6mtguLrmyO6FmiyNIX2f3ORRH319WTNxOPgCKLIFLkfqcx7hNZVpDZcb3J15u8y8oyl0EsWcuISlOtfySHnK43u6bpzMKiJUl3CaIFivB7noce4BjvRhHUoYiYQHfIESIgbLb5apOGstgRyx3VxgXlCHuFOQbP156axpbLwAAAaXAAbQxW5GGOJex+bH9mfNOi30KWuBEFg4qeCyikrE2fN72LdLdCESzZidxzxyQ5g8s0DNtd7pNnBJtAZiMgn8cAug9SY7U/EgSX02g0wDx7chEwQyR2jus13q3z9TYnB0MASZhE+Bg9JTJE0CxYJCjsUn53OVjk+coWXchSyk4pkJptgzSSN0iGYADd/bc6HH0Uj6WHsAfSTdZfASuDLmWHOwUygAFZuNr4+8vcp/LiBDIAVie26VBbj+4GGmOENUPW9Wa4uvZ+AAPNLGdMh5E58WoWTLgHW8b4EArYDR1MMyOR5SnL3cjAQBEpYzdg0/tucCkAwZ02+wM0n80JEFnKLmSamB27QeudzBgMlWBI0GwKGjOb8pC73wPIvT2cE0aZwVBBF8EdKSODMJPBgd2AzRZX67zeDklB1jhMqk0TvCwevSCmC+zHxeRIQoYNzu3Or9e63iBnxFAbIrKwDmfr7zEb/Wr165iBPlozNB4y5DIADAEBIoaE6y0u11pv8zY5aAqE6ICVrqVGYF0VCsiCO9wNiDRmeT/4Zpdj4KKlRTAjZ1kZxlQz0FTIfk5Tcgygz6d+jbxjljfTAbNotXg5rrd4f42LTdokz4pFEai2KZWhoYnEQ8Br9EgiLcqCkLLnXZ+aaP0QsmAF0uEOyMd5vpLnf5kr6DGAfq3A8VnfzAm7qlqL3GVgYIQZBsd6h/fXuLjK610e3GRBsFLuzFEvHaocHTeJlMOJDMoQDQiUYsrSMNgudVtrG3YRIdBQ1BZz6XvGDAQz/v4r2P2EtOLHVHrInOhAaGEBAvoBV2tcXKWrzbAd5Ixm0VljcP/HaLzKai8svl8SlB7JLUvc9pEIssdnse0YaOUP8ezzTui4B/o84fSaZFfuhiSzKteBkrhLuNzo8ipdr/vtkLNaC5Hl2q4x85Q72XTGFyBDQTyPiNiKVBToGAZfa2MZi2a5bNoQYMZolsGc87iSYZV7/Z0XsvgAQKwHuoUSGIxkFvOAq7W/v9xdXA3rnWcFMILmJSBmstCA154IZlYP8u4F5QERrrLbNjCASD6sd8P1mosItdY1gWZkHePnS8VjAH1OIVNkVSkbLxVTyuBsEWQGoyVgSFhv/Opqd70ZUg60BUN0FcwhaOPtFQf3Wal01JBmvjylQQ4WQhMQKDjyZjtcRRCdhRCsnFGMREF9lG58BunXj2Do9bk6r8TPMAx+BMujQ2Dq2JhMlFGgvDu5KvWEwhAcAV5yCAwBMGx7rK91edWv12kYIAbSRGQhC4Gw6a8jXftloFfvA9hYtkqEViiJBSGIlLje7QiXUQ26kqsqEgmEHA66w3EDg6LxXDtLTvpc3Xvibyu6Nu9eWD6iGM+dB7E0uyWNb+pMjXecr6lAC2RWykUJITCGyPKpdniGA6GBC9eXePNm9+79btvDFcXoGZAnWFX2LYdXQqQzTNY8grkEyMi9zJ1QGR5ZTgQGZzcM6jNyCGjMI9oIi8gZnkENZpkUPZeUxKrqalWjCsVtqgjASvOGTh8knNk/AW/5hfeyzzUDEZPgaQmlSblSB59OHhifgBXdM43vEtxJNk350sxni+PSgfQ9NgOu1livteuRcpA1QCOEIq/BGyVl1NmcStgs7jXqA03xxdGbxYCFXJsUmy0Q4R26pmhSAQqSA25WmqjxCwbopnHGK/oNN+Jibw6kYwm7CRys2vAav1OykT7QDdz2xsnuOaWuiaGNAHKPIRW1ZwQDA9xxeaW373W5ybte7gEwIAIBDNNf4A4b/zUFBDSzNrj1L+CNtDqO/yGCSlnrDQDKYUDXIQRQISXBRaudGmvbRZKFM+Iu+c9ViOGxBxoXfTZPATemcfE293yeEEoZGSQCAUIuQlGBoQGIPmO7w5uL4eWb3a5Xn5DcnBGKkBVPMJsEo24TpnnX5uB2f8t6MCk4/X5Int09ADEaQkQTQYI0IEruYxtVNfEhkiq3MnkxfuHBJ2Ws7JzJEv9GoRU/JyoFIB7kZ918BfZV5U7gs0SKBinlRHdmJ42hBSP6AVcbvL/Eq7fDu6ttVpCCQIRI7OGnHBsgzcJSugGw3rfwnOGtawenfSssKHvOOUNuhhiiBWiBxoqGDN2L6KsXuxYzhQrc5jisOVX+N7pqFtQ+91YL/O3kzT+vEnbHp4xFLOwnXxvVfslg0Ty7D0NGA7MQaQ36jMsNXr/3V2/791f9biidU6AFmxsWEAywcYEI/lOQHdUsxTps+bhEgJCyb3eDGSVLmasWbUQgq08LTMiC4KDVikZOkjI+vSDTjcYRSmOm31QcP34+2vAOFFnT0kFoTOg8VA+7VbbGZKWyMqZZcKeDNGM0GDYDLq/w5p2/ert9e7kdegltVgBbQ6QMXucrjjLP7tOsw4MKeTCzcJafNPM7IDgumgFjsEDBh+Tr9S4NYRiiTgOXsAgzGyHW9Qt0VcA/AaNPNXw8647fkPPnNEWfuOWOnxVwsP6nUalJM6bXoRfO4Xlqnr8IthZlAIxObAe8u8SrN7vXbzcX18N2B4aW1mUFIABWFHrLpGazf4NLZrrDOHf8W0dMTxWXmgQWpbGKSaTMAmmA5zR4GtIwuLeBCxO1xLKFldQZQlHpFHJl75uTgozO2+JHI+GDh+6/dtxE3+55dLvETQFke5+ckkGsAkkJFzZbvL3yF2/6l2+uL652QwpCG2IHNnlsUmb3ij36tVYkR7E0OEAkco8NOYwtfhCExHLbN5d5yuzzeuNEcCEQTQAL9xWFFeSFewbOtBk05p+baVG/7WYxfkb+JuNCllPKKa6BGjctmrfRs93z4V4mqSaSzQ6v3/mL1+uXb68vNkNKUWgZOlcDBR9j0gzT5rDeTn3fKWtq73kzVsrabXbdqldSHhZdl+ClGTKxEUJybnt3ISeLZNfCDK0hlu6GBtXfUC4fmpEa51/+tFDkgdzaQ22iCdn03o2HcJa+SOOWqFQsaT+GMYwvrQF0MWXQlJ3vL/Hi9e4fL67eXW9dkbFDWIiNspUdHVUmIYAI4+rAS9DaXnJ82s1MetAjPYN3YuNVOEAG0YrLqnvp6AKNVACYs9Yp5cTYtC60AWZArOxFkQCDGVkos1OIcGKFHDPQbUa7l8/7OMeU9T7HrQog5ZSMjE2DEAo3a8hQBhAEFh5OaHG54avXevlq8+LN1furNHgj6wJbsBGCDl/2XK5aGE0x4A6Mgr0/tjbkj5Ir5CqU6NIjWVEVGue67A5gt8uvXm82i/DorLGGsUHJPtkDKmwS5oAqOmAyAKYd2OuMMCM+5CmsSlTSUbMOabQpL6CIhLkYzNiULYi8uJjCrOxN4MJuoxcv8d3fdq9ev7/eJbFlWDpj8giaGad+d4oAhwwSnHRV6dWIApa+6xiuUVjxBkGH+wudVM8QnFYBxT2htFuCRZpnXW7W/S4wmDWBgW1TfgOF4ICcNvX4Y9W2aqMw4aqF4x6ovKFBhQycXRlOJ4rUJWtmsnaxNIaUmLKnDIkxxNggBLgLhlfv8P/9Z//qXb683q3XTGrYdMYFGfN0NpuxmmVwyeUZxRUjU07Sqt784ZZuryN00FDr4NZRtTvKfMeMarxaWhlNW2dmASFYu3Dz601y+a5vVyssV2gjoxlkniEShuBjBhr5kaXXdjnkZsXW46em3E8wyX9WASQV3BYrnGf8cSvUKtKAkDKGhGLaxQA2QESfsVlz1+Ov3+/+/N3l5Roi3BtrWsZObApyAgLjtBcYhVokUc5MZJXutRAxdFMz5sbgNe+KasfPu0exuhua7yWEDBhD01BKm13fD2nbD7vUZjSnJ2iNJGTgqCkzvhg1doUiEDFF5wcAmNpfV+55D1TmHxJmgYgW9lO1EMo5aNcjZzAgthX9l4X1BpeXeP06vX27e/1+s97mwVtYpBnCAgwCckb2utMpc1NVas2iFS/40eyrDPUSvAxZ3Ne7u5PN7I7xYwZAc8mrPTTESRfdkeXeb3HtDqUclwu2kSEgzv/wqZBV9CMs1kb9tyIpfk6LRBEKNAarphNVyFBwsSyLhwwRTVPu1ugz3l/hzVu8fjW8fPn25dv3Q2q75bPYLpJDZg6j4Llslkfgjo9DulDjhpCzAsHKDnw+zZfsZ+MdwfeZRrqhuDBvRViLVr3vVT37/eG0mD2XMI0NGcC8HVK6XO92YbnsVst22aGLaGbZS6MIdqhlkjJWoYfDv/4WTk/3e4wvLUaVe5JYUkDlro9jSGhkETBsMzcbvL/Ay9f+8k3/7t364rJfbyzEztAJMblLONDtrWT3Pf6rgnyqX0Gx9zaUsWmc4/dGlofOTh+aomdrxsnOeSbRMUGexprigplZjEZJKSUf0rDr027QMGhYtqdLWgcbIYocS1gG6RB8OrmImG7RvxpU6HPaRNNAOKhcho7Sj1C2P4GzYRaurvHmAm/e5tdv/PXb/uJ6u+sH1zIsziy0m0z37O4EzEIwmsHCOJf7fqNSkcllvgtw7iXITCOougaLuxsnoClHRarDneGHLq83ChAmT4QiWWX0inQ1oXHAlTEISENizkFuTWAMiC1CqKcPH5esWRoBH/z1N0KfVQARCFWTSXUsLzjPMtZk4f0aF5d48w4/vBpevd1cXu3WWw2Z4CI0J03bZKpP1Xag0D8D9x4ocqSkYAiB+0JSylqxtrQpFrLNEdj12EF3kuJ4q9MEcr71xlGqESZMqOkpjRWgKlHE7TVkt1KDGCxYwdENWUPqU0K/axZtXCxsIXYtQizDfLnjFNKZNN1yfl2kYvysLmAUHAf7eZdSRj/Qgc0Of/1+8+LV5uJab96n63XukyU2QGfsspqUYEbQaKJQvlmhxnVjImU3sYIP6+mUBR5ho7h8LRXVNaF+X3vchINWMR+3IN7zSjcZXqp8Z7r9inNknMTsnuUGBrM6cULuWa7Nuu83w7ILu74dhjgsQtMwRMSAQASDFXlhvzv3TCiiexdAvGN4cSGX3jDIIkXkgZdrvH4zvHm/fXeRfnh1cXHVD9m2OQgLxqVx4WiSm2cgIwa0LY2gTSR2l5c7CYuQFFE9l8vJrFQuKwYrqpXIrAzQmvA4I8ikcBLdnD/DFX4ME95YB9QEOeEcA206eHlFlZCIIZhLKe+2w+DAkPJmazFa01rX2bKxxZLRRtn0u7zuiDuWEZ9hAPFW1OtHHEMK+m9iB2vaCI+ddBZTj81Ol5d4+Rp//37z/YvX7y42uxSA1tEgLkK7tNgGNYUaU6HvgmenuRkkc4g5U8pl1waGolzoYhGtG4FomqPKhDCq4dUti+q9FTXaymll2gWP2Wc8uUrgRI6eKTtAxpKAXBNCjGAgYaGCWL0goxgs0swaKMDpgyPtfNcPNMTGFm0cll1S6FrEkby0N6y/Yx11AGr8aHlg1/tHuEMkTLl+BDIL8krBM5KUVSJdFgb35BAMRf4LKrcKi2wIARfX+Nvf8N13Vz98f3Fxhd3Q0hrQtoN5NpopmIVggRhbldIhByqarPI1GFgzUdlFGhDGVXKda6z07ipCZFW6lQhWNHsRbNxpUhDLrzcqjO8YiVBEf1nx1HvKsw4Np+rnxfdjP8cdAecYoroAAM2sWjKgqAaDQi7VOQbFaDS0EU8ft6crAgilNypCSHXVWMVBlUaAg6yIhpagszmG6GYLdTPOHJ/GrWfqUqcXkT77FJCaRRZYvn4gSGAZtXJAzrjc4N373es365cvhpc/hNev88V73/akxeXyvFuMH/+aaSAHoxs14tFl8rJFpo/jEq18uMvyVxlFOGwyFbNaaryitMrPymrgzwnO+6o1ZZex8bl1ZJ2hjPZ/0VSnCmCxHLaKzifL4rLwwcpbDs9lRSgjqULJRiy92pDz4AC0M+TcX12xbeJiaV2HJjKMlJK6fwdic7CQ1g1MEX/TEsaI2YeqpKIRe+BwR643S+SR9yAiJWwS1lvtevWDbwe+eqM//+Xyu7++urzcBVu1iydh+ayJGAZc7dI2x8KJ0QTXGXtZTSSxKmpZ/gV1G1lQohPXQjO218E/W15JXbNy6zOWI8ctjuaK94LqLXjGkB0lWjXvZCf+6v5n9jWO3AN6vOZBK2A0H5lGRN0fBtIYCcQIA95frN96Wi3ak5N2seSiQxMQQ0muNCCyLjJUISgzgpvmY+JvUMJGBWVKchv1cwymcQWcUrmzIw3oE1LG4Nj2eH+Jl6/x8tX6zdt3F+ttQpu1XPcYsoMMsYmhAUPpDi1ajJQGyGEknUYyBhkZMVKqzBQoMBGyCnow0sK+iNQMVN5Ks5IfnSYSZs5a2OoTZqiJEq+BpYqV7CaWwlFKGw5+scal39RtlzRJKIx76xETXemooyVexYA4SsjQAWbuN0fTx7BcnJWhZPRAN2QzhYi2seWiXSzb5SI2hIZMz+WqaGblREMD9VuXMFV5k5zhcCGbFKgoMQ3Ivdzt+jp//8O79xe77Qbrje9y2A1hvYkXV3Z52a83PniX48LaReyapgliyPIhe2zQdEbmPq/Xu23TWAgmZqvqu9nVEpGYmogCdyhpvjZAHO3AOEJgx+P4Hgdfv5Jsk4HPTWJwOT3YjI5PwFnu8+WMdpMJlG+fV7Vnck/4agmE02Z/W5iZwNBiWXDUN7BUOwF0lydAXRNCjPLec045uSfAY8R2u1tsm3UbG0NwGRSCxRhijCGEEGiyYPzvEMjif/8EIZaTgbsKlbL4kWQpZHFIErDZ5u9/uHjx8vLqKl9c5F2Ojs696bO5s1ksl91Z5qJHgCGXOAQtmNU/wbd9SmmgtYzleFWLTQEX1qMF6s2rrIEcDLBQueWcAYFKbdB+t1NJjfKK19CePmO3XOVv8MP2B1jszX808kq453vsfzHpE5t/whdOhO5xd1pBtkL5YB6IMFRqD0XCfUhJQiBDjCESojwJeUi9Xw/ra2+jnXddE03KFUpUyfeFnP3LBYf/uyWs9qvBixebsuAUonmAQkpMO6WBu50uLtPb97t373YXl8O2tz6Fzc4vL7fXm92QkW2RtNrmdoCF2C67GDsI2O3SZrcG/eSkW5002fucB5qsQoUtMpam3BhHEcJRRKoMU4Aoq0VHpTE2yspIzRGiVStg5YDSACsC5EYCRTIGMJa5DAWmxIpUHS/8pIVxR02ZGY2FIDRXRZxNFzXTlX/GPv7GPbnbiEUcMa1mCOWSSlBloZ1z7qncBmsjg4F0woFMeqAB3jbhybKLMUCKMZiFEFjWXXuzPRuhB7ohLPkpS9hkOyIYIBphNITggWCICEYLaBd89Kz5sm/W69M+uwsp4fIqv3w7vH69e381XO+4S/FyY28uh/X6uu+x8sVydbJcxhBW7jmGRm6evOLN6YVNrvHILqpOrNqXjVzHI7ryKI1aXApZUyVlRYh+1FSsf2DtSfYJZlK304GR79i+6xBoJtbDl0r7N26gx6GNs0XjwYGWY9vOuTZxlWSYJPYEl4oHjAM5BgtkMNWMRwuBTWzaNiy60LWKxmbcSJhNkucT/Rq/WHfv40xh7uUcGOr2AqOTQPl8B5EMDdoVVqdCsFLitzv7+rq5uFhdX+N66xcbe32pV+/w5tXu4mLX97u1D123XDTR0Cbnbp2BYGbl811YnY4KEJ7uUpwN2AWcUcjCucKLssHySGAP01RmtRkteab8DWNHfRBG01w2NUtlIVkzlWucqPiT47FmZ/m5FuMEHoIjGGKc/ZwKGjELDkOE09CE2ARa8NYQDBbURrQxtG3TdVy0MMB7yOsAMReKKPeeXxxAH2GR6ESSyqQMIhSJJ/pI0yneoUZahnLKGchQEXSiAeMR6vU1Xl5iyH59hX/8bfjLX95+/8P1boMYF11zHuJJHWhLnIQRcRN8mpkm9dP9dsqqmykp0Ek3+rS7MyHUVWIopcomdK0VnL6MZvtXXFYHt5Jqi21UPbqF0mbNll+hCH7oph7SvOGYWEF7kJqN/wYCkkWEZnQElnIda52mJrCL1sRAIAQsWjtd2qJD0yAajPRpDTnO/3OQ9kSKshvjwj8zhX2MAALzRH5hnW9RynOZQE1ZSimDYLCyG3OazKyONZ6gpG7w2Dt2PTZrXL7fvn69fflCL34Ib97y6mrIWcvVadN2uVA+SwAZGOrsVVJ9sP2axwzBRBOt8FSdUCGCGWWyUCe1ELhfJZcAkoFU+fEitArBCAu1BwqzNoiGiHH+m1r1CAuYFMV/OoBY/7/04CUcGWR0C24VMTQoDQCaGFdde3YalwsGKhBNY4sGTbPn9Sof8L95V6bZB9A0ZPz6ATSZTNokh+AO5FpoCFceht6ChSbWTgPIYgYlTzn3ydvYtU27zTZkNBGtIQlv3+Gvf8Gf/9L/8OLy4iKtN8gKCJEWaY2FIMZRi2BEvLtCYIgYtVYFilGxbntlldsg0gIK8disXu73h4gCmQ1zKRUW9E5lk8Uxx7I06WMATZcKs0Js1Z6zoRmiaNrgTyikgqAvZ5dyBkaCEpHMcqiJFiGwjWHZNatlu1px2SFaDf2APUYbkhVByAgSnmdQpNvaAtgrSfzaATTfIRz+3TeA3l7xYhU3R2hP+hYlJMCNjRDcR+FcQz/g3XtdXOHFK/1f//ffX7y6Yly4N2LHsBQ7IZapuHAz0qCm5XLJsrPOLodoMhsLmVSMc41mCIGM4/s+LXiMYBAMk1OKzQNozEDlCzSoBCDL0a8eJEpUquKHDgOIYyZTrt/Nnt2z5LGxto3BLOXU92uob4IbkhFNbJarxcnJ8nQVVwvEWJeK0yXV9klFnK3MJxzv3WL+PzuAbsNC4kfTZ74RQGUHJs625KEgRidJOBUOckUj0kUpRYPRk2xwEhYNq4VWLR+f49E5H509/eHl2d9/SP/44f3F1XsNy6Z52i4egfCMYQCAxYKA73ZulEXSAgF3d3kwhhgoF9yL60UZY0rrPONejSF+SCZWtX3aLwHHvl3lUmM4sAZziJO1r914O0b4gACaIcZ6xAsmQyY8MHdBwdi1IZrFGJdde7JsV6u4WKBpCvgD4920vuo2qgQSlWEyLlj5KVBB8WO6UnwAiVLyzPRy+4jOmoZkAaaydmGAjyJvlMTBGNkSaBAf4fmT1bf/gv/6W378GN+/CBcX2uyu0y47WiJCbddat0A/+HbTD/BGsWlJEl68CUKA0cpdqdgVHiyGp5vDHgd/qFFZh/Kb6pXUTBRrWts4QIdzhJzqQH21vP2FwBrIGEbOjgZldyEGxta6tlkurGtCt2hWi7ho0cSpWO9JQvX4vm/BVYPrEHz7OeKBqMkP8MeS3Q12AG/bdDtNsbDCg4CS0j0EaxgQIhpgcJyd4H/9j/DVV89evX72939s//zduxcv3lxfA7bsFmcxLpXN3JsgJ4ONb7rK0giexy5arHxpsjIwyNFbd2Rk8CAD1RXzyF2dfyHTgsd9Go5H0OJ8o6196p0tFSV3oYi5JHkvJIM1Tbtq46rDamFt2ywWtujQxNHqJU8UH3HselhJG5gdjoVP6WIfP6bEGPc9xDh6zBYi427DdAfg3DDKS5WmgjSKSq5BKbsXxqEB1sTQBi6f4vwE52eLs7Onf3u0ePHy+v1Fv929XF+2TbMKTdt1kQxOZeWyGzQEimlwK46CGvNNRc1wln0qJG6iQEwVp4aUVxkh3nAjO+D37Gmok4zQHIcvwQxNS7l7Ggb0wRToZA7MbcRJy/PTZtlZG9k27BpEwhzZlbJ7dlJmBiOpG72xDrT4PqE9x8cMoEneyMeW0yFTjQorxC8UsN8eYD5LRykrBQ8M5SgQGerBp+7v4E0MEofsLjXGL57Y6ar98nn7/T/av3737m8/vLu4XOehB06NS7OqgSoZSkDKKgyHdIi1WrrXApzrSQOgQ4YMBO1xHXU/5PORWyXybVyJTVuovbfdBxT6ys/GSE9K3st3IaJpQts1bdMuu3Cyas9OwiLSSukFlJFcGfLsQra6jhrxY3c1pWX58OnIGvHj6GPeUunXqDw3mSwVemBlxlG3kiplXlKw+QiXCZGjfEuQBuQQzKGU3LNgYdli1eH8BI8Wy9M2n53q5ev+zTu73gzb60FA03WhW0ZjcqWcyCYEq0ek0a4Ak6NgCXbayDXkSFfbpxkbdXcPlYf3ZoSakTiKwN2BDsN0ji03TEFZngepD/SuCacnzclJt1rErrNFx0WLxmZGrZLLCcQAMNTjHeu55E6lf8k0R0Lxs8xAh9Lp0mFdKy9VfcHKrelg66niJ4kYiLbwfEsrYZz7jdLE1A+i2hCaJsJohAPB8OSU8Y8nXzztXr7Ff/yXvvv75atXrza7YeFnZ+0i0JLnnDKJpukEZN/Dvqp5CquIjNxFSQYvaBlqvLnOlBBx+BFHUQCyktgKqULOmnWJfXrWXI8le/aclLeBvmjsZNmdnS0fn8dlxyZWxgVHNFn5XYUjSxs3Psq5UvNtFkSzNmHcbH4iYsbHwgOVr2HCiXICjPpNGTHd1rErYWUhMNAz8ihaYqJJhbruKua2pThmjgKEpAUhNujObbdqF4taMdMw+LtL0lC8mbPkYKxwbc81bnggwigfOwknCJOzFLJbRajiGUc6lvYoQx04A5UwKb2PF5jAmPtI95SVdiFosVicrdrz03h62qwW6FoUuIFnZRdE9/q7CrS78AjlyrlMBWacenoCzIcAW34yslj8SOnHZzHOgwxUTWtJ6I5PgeYi85Vk42UjV+nMci+In0TzGAJJ9+x5kIwWQ4iBJiIE5KRVi3/5A0LouvbLv/5j9e5iO/QbWgabtmllMSWMYKzpprb3BC/yrOM1FBPdysYTunhTZq6q+XJOmlFJQ6rrpjqiKhcIeLnVOuWmgcpd2z5+tHpyHk9XaFuYFY6OJChnAKVSzdt5zxo3TdXSY4agvVvrjp9zE60PLTk1B26Td/kTcHxjBkf2woiAlRuCymgWIJCR8JyzERYsmOWslNzTkBjNAonWaAt0Syw7nZ2Ek+X5f/x5+OHFZRr6ZnHetiFlrneJRGxiFrxunDEC3gWZyzXq3pVlFME9Mno8hZRlI60g11wocmR7xVZVkmSl2LKwkZkJV8lrnmC5a+38tH32KD57gq6FHErwoZA3iqWLhWgF8lAnfh9RoARjCPt5z+6EyFOfkO8cP448ZtEY+YDFzhzK+SNfiY08GJtPERwX1SMtqxx5Cp6KJjlrz616DKLw5IRnCywjzU+R0pt3G+Udhs5z8JSFEAK6DmbIGX3vIZhFg+A5k9GMojK8aBRCN+yYDqb38fxZdERQoKkV1tICht1ADbkJaKMFM/oA9BEeLZ+uwldfrR6dtasWbUBQLYfF8KwSb4r8zASB3ye6CrCu8KUbpmiHTfUhIeOAFzbn0/+McZ+fIIBw28Diw2eXD/yTCMRJ6bIs6/ZaARNPsVC7kDXKecQy5Y9VAzKBrpDQNvzmKfTvi8ae/Pkv4YeXu6uLt9mWTVwqxAIjFJSScqqiLvKQk5pgRusxODIR8wSE0MHaatwlyjhJJzgrTqnyI0uiTQ65astFB1PQsGiw7OzZk8U3Xy5XHYZeSswVPlA5LZMlb3bdiIi9Artw5yfTbll9EP+06+zP8d34WLewn4mp1c/3nMNdq+ybtj1zJDslKJiHkPOglGK05psv0MYu2JNheLV5ceXyrlmGBZNju0WfspSa2ARW+pEXuSmvec0r5rs2ZLwhDzWKrewZrLVcmDHImAbIECMCg1HZe+RNYL9scXrSPD7rzs9aI5QRbohAaK4brJ9DuLnVJuuuD+nHl36J986yWZWPI5ohtvgiIiMqPG5W3cvXw3V/wXxCLvo+7YbcRBqt8GXL0mSg55xGgdXp3rHfe1btMmH68UIVtX0/W1cvObnIdskYiJw87YS+6Xh2snj8ePHkPJ4szADPe4T1YfQU+Q8cPVN/tcfclUQL1jQmYNcD1LPniMvF+dPF//sf6//nP99sN5kxK3sX2rZtYmR2SQgBFulSnwaLFmhFN85m6x+f5AgrH69wUkZ2nAhambjHDaKUPHuG74LSoo2Pz7pnTxdPHsfTFdpQ/ygajqa7+Bx0XuXMObE1i4Rj2HgG2xN+8RSLJWCL3XDy179t1tuL1rqmXTZdcMOuz57FEGMMnnLyHGSUjeVrtj/kftQZDcDLtGg+sit8BEoHozDkYZfVN+aLVXz66OTL5+2zJzhbIY5LwvFAphsa+L8Lg/n7Z/tNn8AwRNPAXHTC0DX4+gsL/+fZog3/+V/r7eDkQMWyt3UpyYNsAr2qSMHINB1lqnRBrVwFM+R12V7YcftBEvDITO2Uro1p2S2enC+/fN4+f4rTFZoI5YqRnQxexpwG3PSX4zGAfjWZPBLBJaQsQ9vKheTe7zgkni7t5E+ROM0p/OPF5t3769wn61ZGc0NKSUYYLLZFpgEz/0od6uuMP2IlgEz7m3zZXAe4py10HTmsFs3Tx8svny2ePcHpStGoXBCaEwPWb8kt/gbWOw89gMrZPYbgnoec6G6xQEtlzsYaiwbDN1/bsFumlC8u32+2m4Zu3YrGnH3oFdvYxFa50samZFCl5ytF0A5Ok6PwjqtykDMR5J62gdvTk/Ds6eqL58vnT3GyRGDlAxZ9sb3ItGa71d9F9bqnJQwkgxGu7Cn3mcbYxGXbEqHPWG9w2upPf7TLy5PLq+2LN5d93ribrAPo2Ur/U/Qry2llf/IrPLy6+S26H76fvslQTeNY5FoMw6LRk7P2+dPu+VM7W6GJhUpaDMLKCt4LcnYcuFzVT5y/uZHKQxzjBWWXlaMjQ/0oZ8kTSOYQYQE4W+LbP4bN9jzl9P3rdd976CzGJWRyph5Fcc5HAtoInhYdCAVDtFfpNDtworJKPXZD7qLOTuLjs3iyQMOqhlTI0ZBydjOvqlZ75VZN+tTA595N368AYrH8y4IHWhMi2MiVUhpykhRit+psyHThi+cY8uJqc/b++np7fW1hERYr0voBKaNhBZTVwX1kaU2Te7H0EWxyOxwhqjKCyMCwbPnorD07aU8W7EIFQVd0GJGSu2ebuizemW+IYwn71AXrcJB3yAtgzL2abRlia9UuRRk5QYaTJf74B6x3i8vNaf/d5WbYcDixdtkYklcXulyk5CkZQihsLQHM7iItmohcgPFUtNIyOQFXL+2ePll9+83J40fNydKaWIHMXnh0BtJDUIGjjjL2M/O9gooXPvNW+p5loBH/yMIII90KEi2MNAnPaA3JkHrFqD/8IV6sn1yu89+/733YxtjJzYfi3ltP3qwwj/GqW0/hgssi68+NElXKQ0JqLZ8s4tPHJ0+edKcLtA2KU8IeebdfY+MmX5RzgbzPfRAz3LtTxuz4WijwleIynpXQtWijtuvd0OdHp/y3bxd/+ubs/KQN6pmSBuQensZ3dVzzlUVRKmAKUkJKTihUycOCX3XljQ+XXZu+fH7y5Em7XKht6vYIDoOiKQSYSZK7C7rt6ft7qV/3r4kmMPJd3aCg4vqlvdhluU3QHdoELU+tsWf41z+dXVzGv/7tcrPtzWMbCDFn2CidJ5m7V9I6jRZUqThgKJCyBIDKwraJw/lZ99VXzbOnXC3UGEa1vwyIVV1Ok22Gw+5GgOkYQL9dL62JczUXay4el8nBdLJqRUvuwezbb2y3XQ1bfPfdVtlOutVWyBkKezlMl5gFkmES6B2zGmES0qDQN006Xy2+eH7y/LmdrGCquMSccvZsoy7rqDvN2RnsE1H/jgH0zyp+Yo5u2/tlT8CZPCTEfNItt56vh4Hszlf6t2959f7k8s32/eW1Wctsk2DzCJfOFGr4FKUzo2dkRzAZ5GmbsXt0Yl99efL1l8uzExDIWSMuNxf5BNXlddVyJGxv4fR7i5571wOJkjlK0xwmsp9bhfmpevgWZ0KHJw3ZB4fz8Rn+7U/412+702VK/avs17T6hlfSjxdSjTwzJQKIhA9Ig6BEZPkusH90uvjD193zZ2gCcs7Zk5BhMqMFMtCh7DnLSTMGVLba/j+Od1x+CIJ3zECfsgeyytcYO1cdAPcgyILJfJd2knVNLKIhbdQfvuD235fv31+9/vNLj2bxJHtRR/S9yXfBLhYutCElB3KwFM2D5dXCnjw5ef60OV3Ks5S9KcT4ol6l8YGKyuPIfOJtb8PfSza6Z1MY6h1TQaDP2tCSfkQ5ssVAsu93cCy7dtlRjpSwWuDbb8Ifv26XnQfLDs/y7Dl79rI3xCSIhZyQEyR59jxkKK+Wy2dPHz97tjhdMRCek9GrZQIZQgihaH5WfH09u/M2GJM49kC/aQc9wjsP5ODLss6LIIckOC1aBDLgAzLZBpye4Ns/Lv766vl/vMBF2tKW7p7h1b+1eHE6JCRBjiYEwT0lNPnRo7N/+ebki6doInJWYApmVbyxMHDKHslG46e7DFEOaC7UMQP96nvpSsOaTEorylQsSstOIKWUs7p21TRNdu22A9wjq9jKV18u/tf//qwNKW/XTf3BihwbZVFdyinlYdCixaojvPfUn6/0x6/x7BzKw27XNzHEaO7urpRySsndqxCgTT7U/Dm0g2MA/do17FBs/gajgnISIYQGsJyljBjUBMjhCeen9q9/XPzp69VpyL6+jAlR0d2SNCAlSx6RTaIM8CGn7WWDzZdP2j9+GR6fig4NBSbGStMQNYlnjOrBo7uBfsaXcixhv7J374EWkQ76a0pACA2AnB1JAJsYxnMFozEGPT3l//Hvz969fv1f371rlydmMXnOlmRDCGosJimCDbm93uXduy8eD//z26//9ZtFS/VbBDZtE/LQE7TiU39A7Nb8ds+fMKv73DfS9xEP9MGP9aQFP3sjOQ1nk2eOGuOjBZ6fN+9OmiEzZ8AqwAcQmd3cPRbEx3JhTx61j09DV5iBQABMZb/8+9gmH0vYL1o3Yi72tP+5AvTpOn3xvHv+/DGRU3IryukyFzxXy1P3HIOePD796stnJycmQI4mwgwSikL1vX8tH2QA/bhzg0jD6Rm//rr74vnKrPc8cBIdzNAAetFHGIz+6Hz19R/OnjwNIcC9eAnMO7FjAD2wCJJgwHKJ58/x/JnaNssTlJGlTCXk5HJIWd43EY8eh+df4OwMwSCvyhDSQ3nBjgF0dxg1Dc7O8OiRlgs3S/KUsyvDE3MqqShTfdvZ+bk9OlfbAHC5P7SX6hhAdweQGboOp6c8f9R0nUu9p6xEeYBTWZDHqNPTeH4WFos6xQlDPVVIDyQJHQPogzbCZlit7Nnzk/OzxtQjZWYGmcncM+knJ83zZ83Z6aRAL5oXgKuq9ZTd+zboGEB3zfqjIM9iga+/tCePQzQv9NPAGGnIuTE9frR4/kU4PYOk5MmYYxSQIL+9Yz4G0IOKIQdc8q7DF8/x6JEHqwa50SwwIA9GPzttnj/n6Qk8Y+h3tNS2RuSiEPJ7RIcdA+hjPW7siRQjHj3G+ZliyEEexEgYCE9N8NOT8PgcixZy5JxIN+OopfpA4uf3v4m+3azyvy86S9Eyksz80crOzrhorTFdr689++lqYU379JG++QNixDCgCaAFIqXUF5CG9HsBxf8kU+rgRb79ah8z0N3XkEASTuUY8ORR8/zparmInnb9egPvF23z9En3xbPCD0SM6hojPKVeus+T/B4SdwygH6eXGRBMUO6lJ0/ab/+0Wi5DG6Nh2G0uY8ynp03boCveOfLKuODec+ked9HzFHUMoLteHSENGe4G5AGPz/H1VwgYiEymfnfVBJ2uwqJDUxle7vVjOdq3zgQP79mLc6PAHQPobqHPvk9wtBaR0QYsu5TTtXwbQw6WFx1PluxaRI7OYF58MYo//QN64jFi7tT4gCMgxBCDVf2NpvEmKDbsuvjoUViuioAZrEh2uBHROElV743n7/cwdgygO/pEwtqwbEJDIEYQ6Lrmqy+eX11dDqk/O+2ePwvnp6PznLscQTZSTs1lxfN1Dhi5f93PsYR9cI43WtN2kA1DLkbPp6f2P/7t7PGjkIZdE/XkMU9P4T455QIwYxEGsnIVw3ET/YC7INKYB9+u+zwMgp8u8K//G85O+s16ndJuufLlChA8J8iLMVXxT4bvEZGHUpnHAHpAkCAqofznnpRyBzx5im7pKfVC38TchqJE5sYCPoxQmccKiezA3fI+3ZhvfFHHALqrzDuGjRNcLptolhMcaAKiDfA1fB2Dt0A0BAuBsdrxwNzp7jkLRSOY9xaqcGyif+JxyMyaNgrMuRp4nzT5yWl/tkydKVTpwjLIj56MChNVmbyHuETp5qcifnYKYz9658Kn91FziYZmGfKQt1u1q7AkkJEzvnwc/uef2q++bE+i0YFUnN73LbNoDAwgiPw7bKQ/BEKZ//iN9+SYgT7wUgZ4QnYngxXLceLpmf3LV+2zZ91pRwOY9yHs89ea08t8hHM81E10Si6gWAXm5DkrBpyfdV88PX/2+GTZhQluyNuUoYcDqT9moA8WMncAZoFgzklCx+b8/FHOzcnJMsbG/Uc8LIgHMMAfA+inu4FinKvRF77rutNTdl0DMOcf6cUeSvQcA+jDpd1K6Lh7NR4oLs8xkqyeGPwxpdhjCXvgARTo2XNWCaZqqAnRRBv3aYc+tze/QYfuPzn1GEB3ZZAi/QwvwmRm9UyKSvdhCAgBOd8VN78TYajjFParRZMXOShBZmhijDGEYLdxw3OZ82MP9NDn+KJCR2MVOANyTjS2XTQzVeuDWbvzkLLOMQP9PFQQUYqXpJxzSsmMbWchIueU0lB1F+mgP9gX6piB8MFr2DjMlzHezMp+SKKQwePHDwC46/2zvYX9HBbYJ/Tu/anw+ukA+khT2EdSOeOnOJYdM9CH3jSbmcDdGT3TNz4QJbJjCTs+vNuH6dcDBxwD6PeNTfxn6usDkNQ8BtAv7hj0i377Ec5xfH650DmOe6Dj85vNO8cSdg+yyK2pimX1bHec3DVXs9Phn3Bkph6fH8sxN3rnEUzP36sJ4TGAfuUY4qxl5kMrYcceCP/cSvjnrAcfUA/9mWWgm2uU24eLn8PV+wjnDv3Yj4j/zLJR9+zG/HsqYcIviZ9P8Jbplw5ZOmaghwwl+5V/47EHOj44AsqOz/E5BtDxOQbQ8TkG0PE5BtDxOT4//vz/+mBpMVzWr4AAAAAASUVORK5CYII="
}, Lt = {
	region: "_region_ade0p_5",
	toast: "_toast_ade0p_14",
	rise: "_rise_ade0p_1",
	withAction: "_withAction_ade0p_46",
	action: "_action_ade0p_56"
}, Rt = 0, zt = /* @__PURE__ */ new Set();
function Bt(e, t = {}) {
	let n = {
		id: ++Rt,
		text: e,
		duration: t.duration ?? (t.action ? 6e3 : 2600),
		action: t.action
	};
	zt.forEach((e) => e(n));
}
function Vt({ className: e }) {
	let [t, n] = U(null);
	B(() => {
		let e = (e) => n(e);
		return zt.add(e), () => {
			zt.delete(e);
		};
	}, []);
	let [r, i] = U({
		hover: !1,
		focus: !1
	}), a = H(0);
	B(() => {
		t && (a.current = t.duration), i({
			hover: !1,
			focus: !1
		});
	}, [t]);
	let o = r.hover || r.focus;
	return B(() => {
		if (!t || o) return;
		let e = performance.now(), r = window.setTimeout(() => n((e) => e?.id === t.id ? null : e), a.current);
		return () => {
			window.clearTimeout(r), a.current = Math.max(0, a.current - (performance.now() - e));
		};
	}, [t, o]), typeof document > "u" ? null : De(/* @__PURE__ */ F("div", {
		role: "status",
		"aria-live": "polite",
		className: [Lt.region, e].filter(Boolean).join(" "),
		children: t && /* @__PURE__ */ I("div", {
			className: [Lt.toast, t.action && Lt.withAction].filter(Boolean).join(" "),
			onPointerEnter: () => i((e) => ({
				...e,
				hover: !0
			})),
			onPointerLeave: () => i((e) => ({
				...e,
				hover: !1
			})),
			onFocus: () => i((e) => ({
				...e,
				focus: !0
			})),
			onBlur: (e) => {
				e.currentTarget.contains(e.relatedTarget) || i((e) => ({
					...e,
					focus: !1
				}));
			},
			children: [/* @__PURE__ */ F("span", { children: t.text }), t.action && /* @__PURE__ */ F("button", {
				type: "button",
				className: Lt.action,
				onClick: () => {
					t.action?.onClick(), n((e) => e?.id === t.id ? null : e);
				},
				children: t.action.label
			})]
		}, t.id)
	}), document.body);
}
var Ht = {
	wrap: "_wrap_1g403_3",
	banner: "_banner_1g403_9",
	message: "_message_1g403_18",
	leading: "_leading_1g403_25",
	text: "_text_1g403_30",
	action: "_action_1g403_40",
	accent: "_accent_1g403_55",
	inset: "_inset_1g403_78"
};
//#endregion
//#region src/components/Banner/Banner.tsx
function Ut({ leading: e, children: t, action: n, tone: r = "default", inset: i = !1, className: a }) {
	return /* @__PURE__ */ F("div", {
		className: [
			Ht.wrap,
			r === "accent" && Ht.accent,
			i && Ht.inset,
			a
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ I("div", {
			className: Ht.banner,
			children: [/* @__PURE__ */ I("div", {
				className: Ht.message,
				children: [e && /* @__PURE__ */ F("span", {
					className: Ht.leading,
					children: e
				}), /* @__PURE__ */ F("span", {
					className: Ht.text,
					children: t
				})]
			}), n && /* @__PURE__ */ F("div", {
				className: Ht.action,
				children: n
			})]
		})
	});
}
var Wt = {
	track: "_track_149c8_3",
	fill: "_fill_149c8_11",
	neutral: "_neutral_149c8_28",
	success: "_success_149c8_32",
	warning: "_warning_149c8_39",
	error: "_error_149c8_43"
};
//#endregion
//#region src/components/ProgressBar/ProgressBar.tsx
function Gt({ value: e, max: t = 100, status: n = "neutral", className: r, "aria-label": i }) {
	let a = t > 0 ? Math.min(100, Math.max(0, e / t * 100)) : 0;
	return /* @__PURE__ */ F("div", {
		className: [Wt.track, r].filter(Boolean).join(" "),
		role: "progressbar",
		"aria-valuenow": e,
		"aria-valuemin": 0,
		"aria-valuemax": t,
		"aria-label": i,
		children: /* @__PURE__ */ F("div", {
			className: [Wt.fill, Wt[n]].filter(Boolean).join(" "),
			style: { width: `${a}%` }
		})
	});
}
var Kt = {
	strip: "_strip_1g6ev_5",
	start: "_start_1g6ev_17",
	labelGroup: "_labelGroup_1g6ev_25",
	leading: "_leading_1g6ev_31",
	label: "_label_1g6ev_25",
	bar: "_bar_1g6ev_51",
	small: "_small_1g6ev_55",
	end: "_end_1g6ev_64",
	meta: "_meta_1g6ev_71",
	rule: "_rule_1g6ev_92"
};
//#endregion
//#region src/components/Strip/Strip.tsx
function qt({ label: e, leading: t, progress: n, children: r, meta: i, action: a, trailing: o, className: s }) {
	return /* @__PURE__ */ I("div", {
		className: [Kt.strip, s].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ I("span", {
			className: Kt.start,
			children: [
				/* @__PURE__ */ I("span", {
					className: Kt.labelGroup,
					children: [t && /* @__PURE__ */ F("span", {
						className: Kt.leading,
						children: t
					}), /* @__PURE__ */ F("span", {
						className: Kt.label,
						children: e
					})]
				}),
				n && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
					className: Kt.bar,
					children: /* @__PURE__ */ F(Gt, {
						value: n.value,
						max: n.max,
						status: "success",
						"aria-label": n["aria-label"]
					})
				}), /* @__PURE__ */ I("span", {
					className: Kt.small,
					children: [
						n.value,
						" of ",
						n.max
					]
				})] }),
				r && /* @__PURE__ */ F("span", {
					className: Kt.small,
					children: r
				})
			]
		}), (i || a || o) && /* @__PURE__ */ I("span", {
			className: Kt.end,
			children: [
				i && /* @__PURE__ */ F("span", {
					className: [Kt.small, Kt.meta].join(" "),
					children: i
				}),
				a,
				o && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
					"aria-hidden": "true",
					className: Kt.rule
				}), o] })
			]
		})]
	});
}
var Jt = {
	band: "_band_1jrpt_4",
	text: "_text_1jrpt_15"
};
//#endregion
//#region src/components/SummaryBand/SummaryBand.tsx
function Yt({ children: e, action: t, className: n }) {
	return /* @__PURE__ */ I("div", {
		className: [Jt.band, n].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ F("p", {
			className: Jt.text,
			children: e
		}), t]
	});
}
var Xt = {
	card: "_card_1mqfy_1",
	object: "_object_1mqfy_15",
	tile: "_tile_1mqfy_21",
	inset: "_inset_1mqfy_31",
	compact: "_compact_1mqfy_38",
	noPadding: "_noPadding_1mqfy_43",
	noGap: "_noGap_1mqfy_47",
	clickable: "_clickable_1mqfy_56"
};
//#endregion
//#region src/components/Card/Card.tsx
function Zt({ className: e, children: t, variant: n = "default", size: r = "default", surface: i = "default", padding: a, gap: o, ...s }) {
	let c = "href" in s && !!s.href, l = !c && "clickable" in s && s.clickable, u = [
		Xt.card,
		n !== "default" && Xt[n],
		r === "compact" && Xt.compact,
		i === "inset" && Xt.inset,
		a === "none" && Xt.noPadding,
		o === "none" && Xt.noGap,
		c || l ? Xt.clickable : "",
		e
	].filter(Boolean).join(" "), d = t;
	if (c) return /* @__PURE__ */ F("a", {
		className: u,
		...s,
		children: d
	});
	let { clickable: f, onClick: p, onKeyDown: m, ...h } = s;
	return /* @__PURE__ */ F("div", {
		className: u,
		onClick: p,
		onKeyDown: l ? (e) => {
			m?.(e), (e.key === "Enter" || e.key === " ") && p && (e.preventDefault(), p(e));
		} : m,
		role: l ? "button" : void 0,
		tabIndex: l ? 0 : void 0,
		...h,
		children: d
	});
}
var Qt = {
	card: "_card_591sy_5",
	icon: "_icon_591sy_40",
	title: "_title_591sy_64",
	description: "_description_591sy_73"
};
//#endregion
//#region src/components/CreateCard/CreateCard.tsx
function $t(e) {
	let { title: t, description: n, icon: r, className: i } = e, a = [Qt.card, i].filter(Boolean).join(" "), o = /* @__PURE__ */ I(P, { children: [
		/* @__PURE__ */ F("span", {
			className: Qt.icon,
			"aria-hidden": "true",
			children: r ?? /* @__PURE__ */ F(j, {})
		}),
		/* @__PURE__ */ F("span", {
			className: Qt.title,
			children: t
		}),
		n && /* @__PURE__ */ F("span", {
			className: Qt.description,
			children: n
		})
	] });
	if (e.href !== void 0) {
		let { title: t, description: n, icon: r, className: i, ...s } = e;
		return /* @__PURE__ */ F("a", {
			className: a,
			...s,
			children: o
		});
	}
	let { title: s, description: c, icon: l, className: u, href: d, ...f } = e;
	return /* @__PURE__ */ F("button", {
		type: "button",
		className: a,
		...f,
		children: o
	});
}
var en = {
	list: "_list_17tmg_5",
	boxed: "_boxed_17tmg_12",
	inset: "_inset_17tmg_25",
	separator: "_separator_17tmg_29",
	interactive: "_interactive_17tmg_44",
	action: "_action_17tmg_46",
	row: "_row_17tmg_51",
	"row-flush": "_row-flush_17tmg_63",
	"row-inset": "_row-inset_17tmg_67",
	line: "_line_17tmg_74",
	main: "_main_17tmg_81",
	leading: "_leading_17tmg_88",
	text: "_text_17tmg_94",
	roomy: "_roomy_17tmg_103",
	title: "_title_17tmg_112",
	muted: "_muted_17tmg_130",
	meta: "_meta_17tmg_134",
	end: "_end_17tmg_168",
	extra: "_extra_17tmg_169",
	chevron: "_chevron_17tmg_187",
	current: "_current_17tmg_200"
}, tn = R("flush");
function nn({ variant: e = "flush", density: t = "default", children: n, className: r, ...i }) {
	let a = L.toArray(n).filter(z);
	return /* @__PURE__ */ F(tn.Provider, {
		value: e === "boxed" ? "flush" : e,
		children: /* @__PURE__ */ F("div", {
			role: "list",
			className: [
				en.list,
				en[e],
				t === "roomy" && en.roomy,
				r
			].filter(Boolean).join(" "),
			...i,
			children: a.flatMap((e, t) => t === 0 ? [e] : [/* @__PURE__ */ F("div", {
				className: en.separator,
				"aria-hidden": "true"
			}, `sep-${t}`), e])
		})
	});
}
function rn({ title: e, meta: t, leading: n, trailing: r, href: i, onClick: a, muted: o = !1, current: s = !1, children: c, className: l }) {
	let u = ce(tn), d = i !== void 0 || a !== void 0, f = [
		en.row,
		en[`row-${u}`],
		d && en.interactive,
		o && en.muted,
		s && en.current,
		l
	].filter(Boolean).join(" "), p = d ? i === void 0 ? /* @__PURE__ */ F("button", {
		type: "button",
		className: [en.title, en.action].join(" "),
		onClick: a,
		"aria-current": s || void 0,
		children: e
	}) : /* @__PURE__ */ F("a", {
		className: [en.title, en.action].join(" "),
		href: i,
		onClick: a,
		"aria-current": s || void 0,
		children: e
	}) : /* @__PURE__ */ F("span", {
		className: en.title,
		children: e
	});
	return /* @__PURE__ */ I("div", {
		role: "listitem",
		className: f,
		"aria-current": s && !d || void 0,
		children: [/* @__PURE__ */ I("div", {
			className: en.line,
			children: [/* @__PURE__ */ I("div", {
				className: en.main,
				children: [n && /* @__PURE__ */ F("span", {
					className: en.leading,
					children: n
				}), /* @__PURE__ */ I("span", {
					className: en.text,
					children: [p, t && /* @__PURE__ */ F("span", {
						className: en.meta,
						children: t
					})]
				})]
			}), (r || d) && /* @__PURE__ */ I("div", {
				className: en.end,
				children: [r, d && /* @__PURE__ */ F(h, {
					className: en.chevron,
					"aria-hidden": "true"
				})]
			})]
		}), c && /* @__PURE__ */ F("div", {
			className: en.extra,
			children: c
		})]
	});
}
var an = {
	list: "_list_k4gij_2",
	item: "_item_k4gij_15",
	value: "_value_k4gij_29",
	icon: "_icon_k4gij_35",
	positive: "_positive_k4gij_46",
	divided: "_divided_k4gij_52",
	spaced: "_spaced_k4gij_62",
	srOnly: "_srOnly_k4gij_66"
};
//#endregion
//#region src/components/PropertyList/PropertyList.tsx
function on({ items: e, spacing: t = "divided", className: n }) {
	return /* @__PURE__ */ F("span", {
		role: "list",
		className: [
			an.list,
			an[t],
			n
		].filter(Boolean).join(" "),
		children: e.map((e, t) => /* @__PURE__ */ I("span", {
			role: "listitem",
			className: [an.item, e.tone === "positive" && an.positive].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ F("span", {
				className: an.icon,
				"aria-hidden": "true",
				children: e.icon
			}), /* @__PURE__ */ I("span", {
				className: an.value,
				children: [/* @__PURE__ */ I("span", {
					className: an.srOnly,
					children: [e.label, ": "]
				}), e.value]
			})]
		}, t))
	});
}
var sn = {
	wrap: "_wrap_hiif7_3",
	strip: "_strip_hiif7_7",
	fact: "_fact_hiif7_16",
	label: "_label_hiif7_28",
	value: "_value_hiif7_37"
};
//#endregion
//#region src/components/FactStrip/FactStrip.tsx
function cn({ label: e, facts: t, className: n }) {
	return /* @__PURE__ */ F("div", {
		className: [sn.wrap, n].filter(Boolean).join(" "),
		children: /* @__PURE__ */ F("dl", {
			className: sn.strip,
			"aria-label": e,
			style: { "--fact-columns": t.length },
			children: t.map((e) => /* @__PURE__ */ I("div", {
				className: sn.fact,
				children: [/* @__PURE__ */ F("dt", {
					className: sn.label,
					children: e.label
				}), /* @__PURE__ */ F("dd", {
					className: sn.value,
					children: e.value
				})]
			}, e.label))
		})
	});
}
var ln = {
	row: "_row_1fwzc_3",
	bleed: "_bleed_1fwzc_33",
	chevron: "_chevron_1fwzc_50"
};
//#endregion
//#region src/components/OpenableRow/OpenableRow.tsx
function un({ children: e, bleed: t = !0, className: n, ...r }) {
	let i = [
		ln.row,
		t && ln.bleed,
		n
	].filter(Boolean).join(" ");
	return "href" in r && r.href !== void 0 ? /* @__PURE__ */ F("a", {
		className: i,
		...r,
		children: e
	}) : /* @__PURE__ */ F("button", {
		type: "button",
		className: i,
		...r,
		children: e
	});
}
function dn({ className: e }) {
	return /* @__PURE__ */ F(h, {
		"aria-hidden": "true",
		className: [ln.chevron, e].filter(Boolean).join(" ")
	});
}
var fn = {
	row: "_row_9g85b_2",
	leading: "_leading_9g85b_30",
	label: "_label_9g85b_35",
	icon: "_icon_9g85b_43",
	srOnly: "_srOnly_9g85b_50"
};
//#endregion
//#region src/components/LinkRow/LinkRow.tsx
function pn({ href: e, children: t, leading: n, className: i, ...a }) {
	return /* @__PURE__ */ I("a", {
		href: e,
		target: "_blank",
		rel: "noreferrer",
		className: [fn.row, i].filter(Boolean).join(" "),
		...a,
		children: [
			n && /* @__PURE__ */ F("span", {
				className: fn.leading,
				children: n
			}),
			/* @__PURE__ */ I("span", {
				className: fn.label,
				children: [t, /* @__PURE__ */ F("span", {
					className: fn.srOnly,
					children: " (opens in a new tab)"
				})]
			}),
			/* @__PURE__ */ F(r, {
				"aria-hidden": "true",
				className: fn.icon
			})
		]
	});
}
var mn = {
	chip: "_chip_ppux1_2",
	label: "_label_ppux1_22",
	divider: "_divider_ppux1_27",
	value: "_value_ppux1_34",
	tooltipText: "_tooltipText_ppux1_41"
};
//#endregion
//#region src/components/ValueChip/ValueChip.tsx
function hn({ label: e, value: t, className: n }) {
	let r = H(null), [i, a] = U(!1), o = () => !!r.current && r.current.scrollWidth > r.current.clientWidth + 1;
	return /* @__PURE__ */ I("span", {
		className: [mn.chip, n].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ F("span", {
				className: mn.label,
				children: e
			}),
			/* @__PURE__ */ F("span", {
				className: mn.divider,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ F(gt, {
				content: /* @__PURE__ */ F("span", {
					className: mn.tooltipText,
					children: t
				}),
				open: i,
				onOpenChange: (e) => a(e && o()),
				children: /* @__PURE__ */ F("span", {
					ref: r,
					className: mn.value,
					children: t
				})
			})
		]
	});
}
var gn = {
	widget: "_widget_12i5g_3",
	header: "_header_12i5g_7",
	titles: "_titles_12i5g_16",
	title: "_title_12i5g_16",
	sentence: "_sentence_12i5g_37",
	meta: "_meta_12i5g_45",
	action: "_action_12i5g_54",
	body: "_body_12i5g_61",
	footer: "_footer_12i5g_69",
	opens: "_opens_12i5g_84",
	open: "_open_12i5g_84",
	chevron: "_chevron_12i5g_122",
	compact: "_compact_12i5g_168"
};
//#endregion
//#region src/components/Widget/Widget.tsx
function _n({ title: e, meta: t, action: n, footer: r, href: i, onOpen: a, headingLevel: o = 3, titleStyle: s = "label", density: c = "default", children: l, className: u }) {
	let d = i !== void 0 || a !== void 0, f = le(), p = `h${o}`;
	return /* @__PURE__ */ I(Zt, {
		padding: "none",
		gap: "none",
		role: "region",
		"aria-labelledby": f,
		className: [
			gn.widget,
			c === "compact" && gn.compact,
			u
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ I("div", {
				className: [gn.header, d && gn.opens].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ I("div", {
					className: gn.titles,
					children: [/* @__PURE__ */ F(p, {
						id: f,
						className: [gn.title, s === "sentence" && gn.sentence].filter(Boolean).join(" "),
						children: d ? i === void 0 ? /* @__PURE__ */ F("button", {
							type: "button",
							className: gn.open,
							onClick: a,
							children: e
						}) : /* @__PURE__ */ F("a", {
							className: gn.open,
							href: i,
							onClick: a,
							children: e
						}) : e
					}), t && /* @__PURE__ */ I("span", {
						className: gn.meta,
						children: [/* @__PURE__ */ F("span", {
							"aria-hidden": "true",
							children: "· "
						}), t]
					})]
				}), (n || d) && /* @__PURE__ */ I("div", {
					className: gn.action,
					children: [n, d && /* @__PURE__ */ F(h, {
						className: gn.chevron,
						"aria-hidden": "true"
					})]
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: gn.body,
				children: l
			}),
			r && /* @__PURE__ */ F("div", {
				className: gn.footer,
				children: r
			})
		]
	});
}
var vn = {
	delta: "_delta_186fp_5",
	icon: "_icon_186fp_18",
	up: "_up_186fp_25",
	down: "_down_186fp_29",
	flat: "_flat_186fp_33",
	small: "_small_186fp_38"
}, yn = {
	up: i,
	down: e,
	flat: O
}, bn = {
	up: "increased by",
	down: "decreased by",
	flat: "no change:"
};
function xn({ direction: e, value: t, size: n = "medium", "aria-label": r, className: i }) {
	let a = yn[e];
	return /* @__PURE__ */ I("span", {
		className: [
			vn.delta,
			vn[e],
			n === "small" && vn.small,
			i
		].filter(Boolean).join(" "),
		role: "img",
		"aria-label": r ?? `${bn[e]} ${t}`,
		children: [/* @__PURE__ */ F(a, {
			weight: "bold",
			className: vn.icon,
			"aria-hidden": "true"
		}), /* @__PURE__ */ F("span", {
			"aria-hidden": "true",
			children: t
		})]
	});
}
var Sn = {
	card: "_card_w46j3_4",
	header: "_header_w46j3_9",
	body: "_body_w46j3_26",
	main: "_main_w46j3_33",
	hasAside: "_hasAside_w46j3_46",
	valueRow: "_valueRow_w46j3_51",
	value: "_value_w46j3_51",
	success: "_success_w46j3_69",
	error: "_error_w46j3_73",
	line: "_line_w46j3_77",
	rule: "_rule_w46j3_86",
	aside: "_aside_w46j3_93",
	suffix: "_suffix_w46j3_103",
	plain: "_plain_w46j3_117"
};
//#endregion
//#region src/components/StatCard/StatCard.tsx
function Cn({ label: e, info: t, value: n, valueSuffix: r, delta: i, tone: a, line: o, aside: s, variant: c = "default", className: l }) {
	let u = le();
	return /* @__PURE__ */ I(Zt, {
		padding: "none",
		gap: "none",
		role: "group",
		"aria-labelledby": u,
		className: [
			Sn.card,
			c === "plain" && Sn.plain,
			l
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ I("div", {
			className: Sn.header,
			children: [/* @__PURE__ */ F("span", {
				id: u,
				children: e
			}), t]
		}), /* @__PURE__ */ I("div", {
			className: [Sn.body, s && Sn.hasAside].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ I("div", {
				className: Sn.main,
				children: [/* @__PURE__ */ I("div", {
					className: Sn.valueRow,
					children: [/* @__PURE__ */ I("span", {
						className: [Sn.value, a && Sn[a]].filter(Boolean).join(" "),
						children: [n, r !== void 0 && /* @__PURE__ */ F("span", {
							className: Sn.suffix,
							children: r
						})]
					}), i && /* @__PURE__ */ F(xn, { ...i })]
				}), o && /* @__PURE__ */ F("span", {
					className: Sn.line,
					children: o
				})]
			}), s && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
				className: Sn.rule,
				"aria-hidden": "true"
			}), /* @__PURE__ */ F("div", {
				className: Sn.aside,
				children: s
			})] })]
		})]
	});
}
var wn = {
	list: "_list_19fiz_6",
	item: "_item_19fiz_15",
	row: "_row_19fiz_19",
	hasTip: "_hasTip_19fiz_26",
	leading: "_leading_19fiz_36",
	track: "_track_19fiz_48",
	fill: "_fill_19fiz_57",
	muted: "_muted_19fiz_64",
	value: "_value_19fiz_68",
	srOnly: "_srOnly_19fiz_85",
	table: "_table_19fiz_100",
	head: "_head_19fiz_112",
	tableRow: "_tableRow_19fiz_113",
	headValue: "_headValue_19fiz_131",
	headed: "_headed_19fiz_141",
	nameCell: "_nameCell_19fiz_150",
	name: "_name_19fiz_150",
	open: "_open_19fiz_159",
	nameText: "_nameText_19fiz_178",
	trailing: "_trailing_19fiz_188",
	you: "_you_19fiz_203",
	rank: "_rank_19fiz_204",
	tableTrack: "_tableTrack_19fiz_226",
	tableFill: "_tableFill_19fiz_233",
	outer: "_outer_19fiz_243",
	blue: "_blue_19fiz_247",
	tint: "_tint_19fiz_251",
	grey: "_grey_19fiz_255",
	valueCell: "_valueCell_19fiz_259",
	count: "_count_19fiz_268",
	shown: "_shown_19fiz_277",
	delta: "_delta_19fiz_282"
};
//#endregion
//#region src/components/BarList/BarList.tsx
function Tn({ rows: e, max: t = 100, highlight: n, formatValue: r = (e) => `${e}%`, className: i, showLabels: a, head: o, barSize: s, tone: c = "highlight", ...l }) {
	if (a || o) return /* @__PURE__ */ F(Dn, {
		rows: e,
		max: t,
		highlight: n,
		formatValue: r,
		className: i,
		head: o,
		barSize: s ?? 6,
		tone: c,
		"aria-label": l["aria-label"]
	});
	let u = (e) => Array.isArray(n) ? n.includes(e) : e === n;
	return /* @__PURE__ */ F("ul", {
		className: [wn.list, i].filter(Boolean).join(" "),
		"aria-label": l["aria-label"],
		children: e.map((e) => {
			let i = n !== void 0 && !u(e.key), a = `${Math.max(0, Math.min(100, e.value / t * 100))}%`, o = /* @__PURE__ */ I("div", {
				className: [
					wn.row,
					i && wn.muted,
					e.tip !== void 0 && wn.hasTip
				].filter(Boolean).join(" "),
				tabIndex: e.tip === void 0 ? void 0 : 0,
				children: [
					e.leading && /* @__PURE__ */ F("span", {
						className: wn.leading,
						"aria-hidden": "true",
						children: e.leading
					}),
					/* @__PURE__ */ I("span", {
						className: wn.srOnly,
						children: [e.label, ": "]
					}),
					/* @__PURE__ */ F("span", {
						className: wn.track,
						"aria-hidden": "true",
						style: s ? { height: s } : void 0,
						children: /* @__PURE__ */ F("span", {
							className: wn.fill,
							style: { width: a }
						})
					}),
					/* @__PURE__ */ F("span", {
						className: wn.value,
						children: r(e.value)
					})
				]
			});
			return /* @__PURE__ */ F("li", {
				className: wn.item,
				children: e.tip === void 0 ? o : /* @__PURE__ */ F(gt, {
					content: e.tip,
					side: "top",
					children: o
				})
			}, e.key);
		})
	});
}
var En = (e, t) => `${Math.max(0, Math.min(100, e / t * 100))}%`;
function Dn({ rows: e, max: t, highlight: n, formatValue: r, className: i, head: a, barSize: o, tone: s, ...c }) {
	let l = (e) => Array.isArray(n) ? n.includes(e) : e === n;
	return /* @__PURE__ */ I("div", {
		role: "list",
		"aria-label": c["aria-label"],
		className: [
			wn.table,
			a && wn.headed,
			i
		].filter(Boolean).join(" "),
		children: [a && /* @__PURE__ */ I("div", {
			className: wn.head,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ F("span", { children: a[0] }),
				/* @__PURE__ */ F("span", { children: a[1] }),
				/* @__PURE__ */ F("span", {
					className: wn.headValue,
					children: a[2]
				})
			]
		}), e.map((e) => {
			let i = n === void 0 || l(e.key), a = i && s !== "neutral", c = e.display ?? r(e.value), u = `${e.label}: ${e.count !== void 0 && typeof e.count != "object" ? `${e.count}, ` : ""}${typeof c == "string" ? c : r(e.value)}`, d = /* @__PURE__ */ I(P, { children: [e.leading && /* @__PURE__ */ F("span", {
				className: wn.leading,
				"aria-hidden": "true",
				children: e.leading
			}), /* @__PURE__ */ F("span", {
				className: wn.nameText,
				children: e.label
			})] });
			return /* @__PURE__ */ I("div", {
				role: "listitem",
				"aria-label": u,
				className: [
					wn.tableRow,
					a ? wn.blue : s === "tint" ? wn.tint : wn.grey,
					i && n !== void 0 && wn.you
				].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ I("span", {
						className: wn.nameCell,
						children: [
							e.rank !== void 0 && /* @__PURE__ */ I("span", {
								className: wn.rank,
								children: ["#", e.rank]
							}),
							e.onOpen ? /* @__PURE__ */ F("button", {
								type: "button",
								className: wn.open,
								onClick: e.onOpen,
								children: d
							}) : /* @__PURE__ */ F("span", {
								className: wn.name,
								children: d
							}),
							e.trailing !== void 0 && /* @__PURE__ */ F("span", {
								className: wn.trailing,
								children: e.trailing
							})
						]
					}),
					/* @__PURE__ */ I("span", {
						className: wn.tableTrack,
						"aria-hidden": "true",
						style: { height: o },
						children: [e.inner !== void 0 && /* @__PURE__ */ F("span", {
							className: [wn.tableFill, wn.outer].join(" "),
							style: { width: En(e.value, t) }
						}), /* @__PURE__ */ F("span", {
							className: wn.tableFill,
							style: { width: En(e.inner ?? e.value, t) }
						})]
					}),
					/* @__PURE__ */ I("span", {
						className: wn.valueCell,
						children: [
							e.count !== void 0 && /* @__PURE__ */ F("span", {
								className: wn.count,
								children: e.count
							}),
							/* @__PURE__ */ F("span", {
								className: wn.shown,
								children: c
							}),
							e.delta !== void 0 && /* @__PURE__ */ F("span", {
								className: wn.delta,
								children: e.delta !== 0 && /* @__PURE__ */ F(xn, {
									size: "small",
									direction: e.delta > 0 ? "up" : "down",
									value: `${Math.abs(e.delta)} ${Math.abs(e.delta) === 1 ? "pt" : "pts"}`
								})
							})
						]
					})
				]
			}, e.key);
		})]
	});
}
var On = {
	header: "_header_1w3yh_1",
	textStack: "_textStack_1w3yh_8",
	title: "_title_1w3yh_14",
	description: "_description_1w3yh_23"
};
//#endregion
//#region src/components/CardHeader/CardHeader.tsx
function kn({ title: e, description: t, trailingAction: n, className: r }) {
	return /* @__PURE__ */ I("div", {
		className: [On.header, r].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ I("div", {
			className: On.textStack,
			children: [/* @__PURE__ */ F("div", {
				className: On.title,
				children: e
			}), t && /* @__PURE__ */ F("div", {
				className: On.description,
				children: t
			})]
		}), n]
	});
}
var An = {
	indicator: "_indicator_yztbi_1",
	filled: "_filled_yztbi_14",
	icon: "_icon_yztbi_19",
	small: "_small_yztbi_27"
};
//#endregion
//#region src/components/CheckboxIndicator/CheckboxIndicator.tsx
function jn({ checked: e = !1, indeterminate: t = !1, size: n = "medium", className: r, ...i }) {
	let a = e || t, o = [
		An.indicator,
		n === "small" && An.small,
		a && An.filled,
		r
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("span", {
		className: o,
		...i,
		children: t ? /* @__PURE__ */ F(O, {
			weight: "bold",
			className: An.icon
		}) : e ? /* @__PURE__ */ F(y, {
			weight: "bold",
			className: An.icon
		}) : null
	});
}
var Mn = {
	cell: "_cell_u94zq_1",
	alignRight: "_alignRight_u94zq_25",
	text: "_text_u94zq_39",
	tag: "_tag_u94zq_40",
	title: "_title_u94zq_41",
	dotText: "_dotText_u94zq_45",
	content: "_content_u94zq_49",
	checkboxLabel: "_checkboxLabel_u94zq_63",
	hiddenInput: "_hiddenInput_u94zq_70",
	dot: "_dot_u94zq_45",
	icon: "_icon_u94zq_101",
	button: "_button_u94zq_102",
	actions: "_actions_u94zq_106",
	titleButton: "_titleButton_u94zq_114",
	titleActive: "_titleActive_u94zq_130",
	sortIcon: "_sortIcon_u94zq_135",
	percentage: "_percentage_u94zq_148"
};
//#endregion
//#region src/components/Cell/Cell.tsx
function Nn({ type: e, width: t, align: n, label: r, checked: i = !1, onChange: a, checkboxSize: o = "medium", tag: s, dotColor: c, actions: l, active: u = !1, sortDirection: d, button: f, percentage: m, className: h, style: _, role: v, ...y }) {
	let b = n ?? (e === "number" || e === "number-percentage" ? "right" : "left"), x = v ?? (e === "title" ? "columnheader" : "cell"), S = Mn[Pn(e)], C = [
		Mn.cell,
		S,
		b === "right" && Mn.alignRight,
		h
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("div", {
		role: x,
		className: C,
		style: {
			...t === void 0 ? void 0 : {
				width: t,
				flex: "none"
			},
			..._
		},
		...y,
		children: [
			e === "checkbox" && /* @__PURE__ */ I("label", {
				className: Mn.checkboxLabel,
				children: [
					/* @__PURE__ */ F("input", {
						type: "checkbox",
						className: Mn.hiddenInput,
						checked: i,
						onChange: (e) => a?.(e.target.checked)
					}),
					/* @__PURE__ */ F(jn, {
						checked: i,
						size: o
					}),
					r !== void 0 && /* @__PURE__ */ F("span", {
						className: Mn.content,
						children: r
					})
				]
			}),
			(e === "text" || e === "number") && /* @__PURE__ */ F("span", {
				className: Mn.content,
				children: r
			}),
			e === "tag" && s,
			e === "dot-text" && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
				className: Mn.dot,
				style: c ? { background: c } : void 0
			}), /* @__PURE__ */ F("span", {
				className: Mn.content,
				children: r
			})] }),
			e === "icon" && /* @__PURE__ */ F("span", {
				className: Mn.actions,
				children: l
			}),
			e === "title" && /* @__PURE__ */ I("button", {
				type: "button",
				className: [Mn.titleButton, u && Mn.titleActive].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ F("span", {
					className: Mn.content,
					children: r
				}), u && d && /* @__PURE__ */ F("span", {
					className: Mn.sortIcon,
					children: F(d === "asc" ? g : p, { weight: "bold" })
				})]
			}),
			e === "button" && f,
			e === "number-percentage" && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
				className: Mn.content,
				children: r
			}), /* @__PURE__ */ I("span", {
				className: Mn.percentage,
				children: [
					"(",
					m,
					")"
				]
			})] })
		]
	});
}
function Pn(e) {
	return e.replace(/-([a-z])/g, (e, t) => t.toUpperCase());
}
var Fn = {
	slot: "_slot_162kb_1",
	placeholder: "_placeholder_162kb_11"
};
//#endregion
//#region src/components/ChartSlot/ChartSlot.tsx
function In({ children: e, className: t }) {
	return /* @__PURE__ */ F("div", {
		className: [Fn.slot, t].filter(Boolean).join(" "),
		children: e ?? /* @__PURE__ */ F("span", {
			className: Fn.placeholder,
			children: "Chart slot"
		})
	});
}
var Ln = {
	checkbox: "_checkbox_1kzve_1",
	input: "_input_1kzve_13",
	indicatorSlot: "_indicatorSlot_1kzve_18",
	indicatorSlotFilled: "_indicatorSlotFilled_1kzve_18",
	indicatorWrapper: "_indicatorWrapper_1kzve_26",
	small: "_small_1kzve_65"
};
//#endregion
//#region src/components/Checkbox/Checkbox.tsx
function Rn({ label: e, indeterminate: t = !1, size: n = "medium", className: r, checked: i, ...a }) {
	let o = H(null);
	B(() => {
		o.current && (o.current.indeterminate = t);
	}, [t]);
	let s = [
		Ln.checkbox,
		n === "small" && Ln.small,
		r
	].filter(Boolean).join(" "), c = i || t, l = [Ln.indicatorSlot, c && Ln.indicatorSlotFilled].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("label", {
		className: s,
		children: [/* @__PURE__ */ I("span", {
			className: Ln.indicatorWrapper,
			children: [/* @__PURE__ */ F("input", {
				ref: o,
				type: "checkbox",
				className: Ln.input,
				checked: i,
				...a
			}), /* @__PURE__ */ F(jn, {
				checked: i,
				indeterminate: t,
				size: n,
				className: l
			})]
		}), e]
	});
}
var zn = {
	row: "_row_92ptc_6",
	content: "_content_92ptc_50",
	icon: "_icon_92ptc_66",
	label: "_label_92ptc_80",
	small: "_small_92ptc_100",
	menu: "_menu_92ptc_122"
};
//#endregion
//#region src/components/CheckboxOption/CheckboxOption.tsx
function Bn({ checked: e = !1, indeterminate: t = !1, disabled: n = !1, label: r, leadingIcon: i, onCheckedChange: a, size: o = "medium", className: s, style: c }) {
	return /* @__PURE__ */ I("button", {
		type: "button",
		role: "menuitemcheckbox",
		"aria-checked": t ? "mixed" : e,
		disabled: n,
		className: [
			zn.row,
			o !== "medium" && zn[o],
			s
		].filter(Boolean).join(" "),
		style: c,
		onClick: () => a?.(!e),
		children: [/* @__PURE__ */ F(jn, {
			checked: e,
			indeterminate: t,
			size: o === "small" ? "small" : "medium"
		}), /* @__PURE__ */ I("span", {
			className: zn.content,
			children: [i && /* @__PURE__ */ F("span", {
				className: zn.icon,
				children: i
			}), /* @__PURE__ */ F("span", {
				className: zn.label,
				children: r
			})]
		})]
	});
}
var Vn = {
	card: "_card_12taw_6",
	head: "_head_12taw_18",
	header: "_header_12taw_25",
	tile: "_tile_12taw_32",
	tileIcon: "_tileIcon_12taw_45",
	titles: "_titles_12taw_50",
	title: "_title_12taw_50",
	compact: "_compact_12taw_69",
	meta: "_meta_12taw_82",
	count: "_count_12taw_91",
	progress: "_progress_12taw_107",
	progressFill: "_progressFill_12taw_112",
	rule: "_rule_12taw_118",
	list: "_list_12taw_129"
};
//#endregion
//#region src/components/Checklist/Checklist.tsx
function Hn({ title: e, completed: t, total: n, children: r, size: i = "default", className: a }) {
	let o = t !== void 0 && n !== void 0 && n > 0, s = Y(), c = H(!1);
	return B(() => {
		c.current = !0;
	}, []), /* @__PURE__ */ I("div", {
		className: [
			Vn.card,
			i === "compact" && Vn.compact,
			a
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ I("div", {
			className: Vn.head,
			children: [/* @__PURE__ */ I("div", {
				className: Vn.header,
				children: [i !== "compact" && /* @__PURE__ */ F("div", {
					className: Vn.tile,
					"aria-hidden": "true",
					children: /* @__PURE__ */ F(E, { className: Vn.tileIcon })
				}), /* @__PURE__ */ I("div", {
					className: Vn.titles,
					children: [/* @__PURE__ */ F("h3", {
						className: Vn.title,
						children: e
					}), o && /* @__PURE__ */ F("div", {
						className: Vn.meta,
						children: /* @__PURE__ */ I(K.span, {
							className: Vn.count,
							initial: c.current && !s ? {
								opacity: 0,
								y: 4
							} : !1,
							animate: {
								opacity: 1,
								y: 0
							},
							transition: s ? { duration: 0 } : {
								duration: .28,
								ease: [
									.16,
									1,
									.3,
									1
								]
							},
							children: [
								t,
								" of ",
								n,
								" completed"
							]
						}, t)
					})]
				})]
			}), o ? /* @__PURE__ */ F("div", {
				className: Vn.progress,
				role: "progressbar",
				"aria-valuenow": t,
				"aria-valuemin": 0,
				"aria-valuemax": n,
				"aria-label": `${t} of ${n} completed`,
				children: /* @__PURE__ */ F("div", {
					className: Vn.progressFill,
					style: { width: `${Math.min(100, Math.max(0, t / n * 100))}%` }
				})
			}) : /* @__PURE__ */ F("div", {
				className: Vn.rule,
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ F("ul", {
			className: Vn.list,
			children: r
		})]
	});
}
var Un = {
	item: "_item_14frd_12",
	row: "_row_14frd_21",
	interactive: "_interactive_14frd_40",
	glyph: "_glyph_14frd_66",
	chevron: "_chevron_14frd_67",
	glyphIcon: "_glyphIcon_14frd_79",
	todo: "_todo_14frd_84",
	done: "_done_14frd_88",
	skipped: "_skipped_14frd_92",
	text: "_text_14frd_96",
	title: "_title_14frd_103",
	titleText: "_titleText_14frd_115",
	description: "_description_14frd_129",
	chevronIcon: "_chevronIcon_14frd_145",
	body: "_body_14frd_170",
	actions: "_actions_14frd_187",
	srOnly: "_srOnly_14frd_193"
}, Wn = {
	todo: "To do",
	done: "Done",
	skipped: "Skipped"
};
function Gn({ status: e = "todo", title: t, description: n, children: r, open: i, defaultOpen: a = !1, onOpenChange: o, className: s }) {
	let c = le(), l = Y(), [u, d] = U(a), f = r != null && r !== !1, m = i ?? u, h = H(!1);
	B(() => {
		h.current = !0;
	}, []);
	let g = () => {
		i === void 0 && d(!m), o?.(!m);
	}, _ = e === "done" ? /* @__PURE__ */ F(b, {
		weight: "fill",
		className: Un.glyphIcon
	}) : F(e === "skipped" ? k : S, { className: Un.glyphIcon }), v = /* @__PURE__ */ I(P, { children: [
		/* @__PURE__ */ F(K.span, {
			className: Un.glyph,
			"aria-hidden": "true",
			initial: h.current && !l ? {
				scale: .4,
				opacity: 0
			} : !1,
			animate: {
				scale: 1,
				opacity: 1
			},
			transition: l ? ze : {
				type: "spring",
				stiffness: 420,
				damping: 22
			},
			children: _
		}, e),
		/* @__PURE__ */ I("span", {
			className: Un.text,
			children: [/* @__PURE__ */ I("span", {
				className: Un.title,
				children: [/* @__PURE__ */ I("span", {
					className: Un.srOnly,
					children: [Wn[e], ": "]
				}), /* @__PURE__ */ F("span", {
					className: Un.titleText,
					children: t
				})]
			}), n && /* @__PURE__ */ F("span", {
				className: Un.description,
				children: n
			})]
		}),
		f && /* @__PURE__ */ F(K.span, {
			className: Un.chevron,
			"aria-hidden": "true",
			initial: !1,
			animate: { rotate: m ? 180 : 0 },
			transition: Be(l),
			children: /* @__PURE__ */ F(p, {
				weight: "bold",
				className: Un.chevronIcon
			})
		})
	] });
	return /* @__PURE__ */ I("li", {
		className: [
			Un.item,
			Un[e],
			s
		].filter(Boolean).join(" "),
		children: [f ? /* @__PURE__ */ F("button", {
			type: "button",
			className: [Un.row, Un.interactive].join(" "),
			"aria-expanded": m,
			"aria-controls": m ? c : void 0,
			onClick: g,
			children: v
		}) : /* @__PURE__ */ F("div", {
			className: Un.row,
			children: v
		}), /* @__PURE__ */ F(Ve, {
			open: f && m,
			children: /* @__PURE__ */ F("div", {
				id: c,
				className: Un.body,
				children: r
			})
		})]
	});
}
function Kn({ children: e }) {
	return /* @__PURE__ */ F("div", {
		className: Un.actions,
		children: e
	});
}
var qn = {
	pill: "_pill_1d4d1_6",
	on: "_on_1d4d1_44",
	check: "_check_1d4d1_57",
	pills: "_pills_1d4d1_63"
};
//#endregion
//#region src/components/SelectPill/SelectPill.tsx
function Jn({ children: e, selected: t, onClick: n, disabled: r, className: i }) {
	return /* @__PURE__ */ I("button", {
		type: "button",
		onClick: n,
		disabled: r,
		"aria-pressed": t === void 0 ? void 0 : t,
		className: [
			qn.pill,
			t && qn.on,
			i
		].filter(Boolean).join(" "),
		children: [e, t && /* @__PURE__ */ F(b, {
			weight: "fill",
			"aria-hidden": "true",
			className: qn.check
		})]
	});
}
function Yn({ options: e, value: t, onChange: n, multi: r, className: i, ...a }) {
	let o = (e) => Array.isArray(t) ? t.includes(e) : t === e;
	return /* @__PURE__ */ F("div", {
		role: r ? "group" : "radiogroup",
		"aria-label": a["aria-label"],
		className: [qn.pills, i].filter(Boolean).join(" "),
		children: e.map((e) => /* @__PURE__ */ F(Jn, {
			selected: o(e.value),
			onClick: () => n(e.value),
			children: e.label
		}, e.value))
	});
}
var Xn = {
	chip: "_chip_15wvr_6",
	selected: "_selected_15wvr_25"
};
//#endregion
//#region src/components/ChoiceChip/ChoiceChip.tsx
function Zn({ label: e, selected: t = !1, onSelect: n, disabled: r = !1, className: i }) {
	return /* @__PURE__ */ F("button", {
		type: "button",
		role: "radio",
		"aria-checked": t,
		disabled: r,
		className: [
			Xn.chip,
			t && Xn.selected,
			i
		].filter(Boolean).join(" "),
		onClick: n,
		children: e
	});
}
var Qn = {
	plan: "_plan_1o9nj_3",
	head: "_head_1o9nj_7",
	price: "_price_1o9nj_8",
	includes: "_includes_1o9nj_9",
	name: "_name_1o9nj_16",
	small: "_small_1o9nj_26",
	amountRow: "_amountRow_1o9nj_36",
	amount: "_amount_1o9nj_36",
	period: "_period_1o9nj_53",
	action: "_action_1o9nj_63",
	bottom: "_bottom_1o9nj_70",
	items: "_items_1o9nj_84",
	item: "_item_1o9nj_84",
	check: "_check_1o9nj_106",
	itemText: "_itemText_1o9nj_114",
	footer: "_footer_1o9nj_121",
	group: "_group_1o9nj_128"
};
//#endregion
//#region src/components/PlanCard/PlanCard.tsx
function $n({ name: e, description: t, price: n, period: r, priceNote: i, action: a, lead: o, items: s, footer: c, className: l }) {
	return /* @__PURE__ */ I(Zt, {
		variant: "object",
		className: [Qn.plan, l].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ I("div", {
				className: Qn.head,
				children: [/* @__PURE__ */ F("h3", {
					className: Qn.name,
					children: e
				}), t && /* @__PURE__ */ F("p", {
					className: Qn.small,
					children: t
				})]
			}),
			/* @__PURE__ */ I("div", {
				className: Qn.price,
				children: [/* @__PURE__ */ I("span", {
					className: Qn.amountRow,
					children: [/* @__PURE__ */ F("span", {
						className: Qn.amount,
						children: n
					}), r && /* @__PURE__ */ F("span", {
						className: Qn.period,
						children: r
					})]
				}), i && /* @__PURE__ */ F("span", {
					className: Qn.small,
					children: i
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: Qn.action,
				children: a
			}),
			/* @__PURE__ */ I("div", {
				className: Qn.bottom,
				children: [/* @__PURE__ */ I("div", {
					className: Qn.includes,
					children: [o && /* @__PURE__ */ F("p", {
						className: Qn.small,
						children: o
					}), /* @__PURE__ */ F("ul", {
						className: Qn.items,
						children: s.map((e, t) => /* @__PURE__ */ I("li", {
							className: Qn.item,
							children: [/* @__PURE__ */ F(y, {
								"aria-hidden": "true",
								className: Qn.check
							}), /* @__PURE__ */ I("span", {
								className: Qn.itemText,
								children: [e.text, e.note && /* @__PURE__ */ F("span", {
									className: Qn.small,
									children: e.note
								})]
							})]
						}, t))
					})]
				}), c && /* @__PURE__ */ F("div", {
					className: Qn.footer,
					children: c
				})]
			})
		]
	});
}
function er({ children: e, className: t }) {
	return /* @__PURE__ */ F("div", {
		className: [Qn.group, t].filter(Boolean).join(" "),
		children: e
	});
}
var tr = {
	card: "_card_11buc_5",
	small: "_small_11buc_32",
	label: "_label_11buc_36",
	description: "_description_11buc_44",
	radioIcon: "_radioIcon_11buc_52",
	leading: "_leading_11buc_57",
	selected: "_selected_11buc_67",
	indicator: "_indicator_11buc_85",
	text: "_text_11buc_103",
	hollow: "_hollow_11buc_152"
};
//#endregion
//#region src/components/OptionCard/OptionCard.tsx
function nr({ type: e = "radio", selected: t = !1, disabled: n = !1, label: r, description: i, size: a = "medium", leading: o, onSelectedChange: s, className: c }) {
	let l = [
		tr.card,
		a === "small" && tr.small,
		t && tr.selected,
		c
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("button", {
		type: "button",
		role: e,
		"aria-checked": t,
		disabled: n,
		className: l,
		onClick: () => s?.(e === "radio" || !t),
		children: [
			o && /* @__PURE__ */ F("span", {
				className: tr.leading,
				children: o
			}),
			/* @__PURE__ */ I("span", {
				className: tr.text,
				children: [/* @__PURE__ */ F("span", {
					className: tr.label,
					children: r
				}), i && /* @__PURE__ */ F("span", {
					className: tr.description,
					children: i
				})]
			}),
			/* @__PURE__ */ F("span", {
				className: tr.indicator,
				children: e === "checkbox" ? /* @__PURE__ */ F(jn, {
					checked: t,
					size: a === "small" ? "small" : void 0
				}) : t ? /* @__PURE__ */ F(b, {
					weight: "fill",
					className: tr.radioIcon
				}) : /* @__PURE__ */ F(x, {
					weight: "fill",
					className: [tr.radioIcon, tr.hollow].join(" ")
				})
			})
		]
	});
}
var X = {
	command: "_command_6at5b_1",
	panelCommand: "_panelCommand_6at5b_8",
	trigger: "_trigger_6at5b_21",
	button: "_button_6at5b_41",
	disabled: "_disabled_6at5b_48",
	input: "_input_6at5b_65",
	value: "_value_6at5b_85",
	placeholder: "_placeholder_6at5b_95",
	caret: "_caret_6at5b_99",
	content: "_content_6at5b_108",
	searchField: "_searchField_6at5b_128",
	searchIcon: "_searchIcon_6at5b_144",
	searchInput: "_searchInput_6at5b_151",
	list: "_list_6at5b_172",
	item: "_item_6at5b_186",
	leadingIcon: "_leadingIcon_6at5b_220",
	triggerIcon: "_triggerIcon_6at5b_233",
	label: "_label_6at5b_242",
	trailingIcon: "_trailingIcon_6at5b_250",
	selectedIcon: "_selectedIcon_6at5b_260",
	empty: "_empty_6at5b_267",
	loading: "_loading_6at5b_268"
}, rr = {
	addRow: "_addRow_1ax3r_8",
	meta: "_meta_1ax3r_16",
	checkSlot: "_checkSlot_1ax3r_29",
	hint: "_hint_1ax3r_37"
}, ir = { header: "_header_1mdis_3" };
//#endregion
//#region src/components/MenuHeader/MenuHeader.tsx
function ar({ children: e, id: t, className: n }) {
	return /* @__PURE__ */ F("div", {
		id: t,
		role: "presentation",
		className: [ir.header, n].filter(Boolean).join(" "),
		children: e
	});
}
//#endregion
//#region src/components/Combobox/Combobox.tsx
var or = "gist-add-your-own", sr = (e, t, n) => e.startsWith(or) ? 1e-4 : ke(e, t, n);
function cr({ options: e, value: t, onChange: n, editable: r = !1, placeholder: i = "Select an option", searchPlaceholder: a = "Search...", emptyMessage: o = "No results found", loading: s = !1, disabled: c = !1, className: l, "aria-label": u, triggerLeadingIcon: d, trailingAction: f, onInputChange: m, openOnTypeOnly: h = !1, onCreate: _, createLabel: v = "Add your own", createPlaceholder: b, hint: x, recent: S, recentLabel: C = "Recently used" }) {
	let [w, T] = U(!1), [E, O] = U(""), [k, A] = U(""), M = H(!1), ee = H(null), [te, N] = U(!1), ne = H(null), L = e.find((e) => e.value === t);
	function re(t) {
		let i = e.find((e) => e.value === t);
		n?.(t), T(!1), r && O(i ? i.label : "");
	}
	let ie = (r ? E : k).trim(), R = ie ? e.find((e) => e.label.toLowerCase() === ie.toLowerCase()) : void 0, ae = !!_ && !!ie && !R && !s, oe = !ie && S ? S.map((t) => e.find((e) => e.value === t)).filter((e) => !!e) : [], z = oe.length > 0 ? oe : void 0;
	function se(e) {
		_?.(e), T(!1), A(""), r && O(e);
	}
	function ce(e) {
		(e.key === "ArrowDown" || e.key === "ArrowUp") && (M.current = !0), !(e.key !== "Enter" || !_ || !ie || M.current) && (e.preventDefault(), e.stopPropagation(), R ? re(R.value) : se(ie));
	}
	let B = s ? /* @__PURE__ */ F("div", {
		className: X.loading,
		children: "Loading…"
	}) : /* @__PURE__ */ I(P, { children: [
		!ae && /* @__PURE__ */ F(Oe.Empty, {
			className: X.empty,
			children: o
		}),
		z && /* @__PURE__ */ F(ar, { children: C }),
		(z ?? e).map((e) => /* @__PURE__ */ I(Oe.Item, {
			value: e.label,
			disabled: e.disabled,
			onSelect: () => re(e.value),
			className: X.item,
			children: [
				e.leadingIcon && /* @__PURE__ */ F("span", {
					className: X.leadingIcon,
					children: e.leadingIcon
				}),
				/* @__PURE__ */ F("span", {
					className: X.label,
					children: e.label
				}),
				e.meta !== void 0 && e.meta !== null && /* @__PURE__ */ F("span", {
					className: rr.meta,
					children: e.meta
				}),
				e.value === t ? /* @__PURE__ */ F(y, {
					weight: "bold",
					className: X.selectedIcon
				}) : e.meta !== void 0 && e.meta !== null && /* @__PURE__ */ F("span", {
					className: rr.checkSlot,
					"aria-hidden": "true"
				}),
				e.trailingIcon && /* @__PURE__ */ F("span", {
					className: X.trailingIcon,
					onClick: (t) => {
						t.stopPropagation(), e.onTrailingIconClick?.();
					},
					children: e.trailingIcon
				})
			]
		}, e.value)),
		_ && !r && !ie && !s && /* @__PURE__ */ I(Oe.Item, {
			forceMount: !0,
			value: or,
			onSelect: () => {
				N(!0), ee.current?.focus();
			},
			className: X.item,
			children: [/* @__PURE__ */ F("span", {
				className: X.leadingIcon,
				children: /* @__PURE__ */ F(j, {})
			}), /* @__PURE__ */ F("span", {
				className: X.label,
				children: v
			})]
		}),
		ae && /* @__PURE__ */ I(Oe.Item, {
			forceMount: !0,
			value: `${or} ${ie}`,
			onSelect: () => se(ie),
			className: [X.item, rr.addRow].join(" "),
			children: [/* @__PURE__ */ F("span", {
				className: X.leadingIcon,
				children: /* @__PURE__ */ F(j, {})
			}), /* @__PURE__ */ I("span", {
				className: X.label,
				children: [
					"Add “",
					ie,
					"”"
				]
			})]
		})
	] });
	return r ? /* @__PURE__ */ F(Te.Root, {
		open: w,
		onOpenChange: T,
		children: /* @__PURE__ */ I(Oe, {
			className: [X.command, l].filter(Boolean).join(" "),
			shouldFilter: !0,
			filter: sr,
			children: [/* @__PURE__ */ F(Te.Anchor, {
				asChild: !0,
				children: /* @__PURE__ */ I("div", {
					ref: ne,
					className: [X.trigger, c && X.disabled].filter(Boolean).join(" "),
					children: [
						(L?.leadingIcon ?? d) && /* @__PURE__ */ F("span", {
							className: `${X.leadingIcon} ${X.triggerIcon}`,
							children: L?.leadingIcon ?? d
						}),
						/* @__PURE__ */ F(Oe.Input, {
							value: E,
							onKeyDown: ce,
							onValueChange: (e) => {
								M.current = !1, O(e), m?.(e), T(!0);
							},
							onFocus: () => {
								t && E === L?.label && O(""), h || T(!0);
							},
							placeholder: i,
							disabled: c,
							"aria-label": u,
							className: X.input
						}),
						f ?? F(w ? g : p, { className: X.caret })
					]
				})
			}), /* @__PURE__ */ F(at, {
				open: w,
				align: "start",
				className: X.content,
				sideOffset: 4,
				onOpenAutoFocus: (e) => e.preventDefault(),
				onInteractOutside: (e) => {
					ne.current?.contains(e.target) && e.preventDefault();
				},
				style: { minWidth: "var(--radix-popover-trigger-width)" },
				children: /* @__PURE__ */ F(Oe.List, {
					className: X.list,
					children: B
				})
			})]
		})
	}) : /* @__PURE__ */ I(Te.Root, {
		open: w,
		onOpenChange: (e) => {
			T(e), A(""), N(!1);
		},
		children: [/* @__PURE__ */ F(Te.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ I("button", {
				type: "button",
				className: [
					X.trigger,
					X.button,
					l
				].filter(Boolean).join(" "),
				disabled: c,
				"aria-label": u,
				children: [
					(L?.leadingIcon ?? d) && /* @__PURE__ */ F("span", {
						className: `${X.leadingIcon} ${X.triggerIcon}`,
						children: L?.leadingIcon ?? d
					}),
					/* @__PURE__ */ F("span", {
						className: [X.value, !L && X.placeholder].filter(Boolean).join(" "),
						children: L ? L.label : i
					}),
					f ?? F(w ? g : p, { className: X.caret })
				]
			})
		}), /* @__PURE__ */ F(at, {
			open: w,
			align: "start",
			className: X.content,
			sideOffset: 4,
			style: { minWidth: "var(--radix-popover-trigger-width)" },
			onOpenAutoFocus: (e) => e.preventDefault(),
			children: /* @__PURE__ */ I(Oe, {
				className: [X.command, X.panelCommand].join(" "),
				shouldFilter: !0,
				filter: sr,
				children: [
					/* @__PURE__ */ I("div", {
						className: X.searchField,
						children: [/* @__PURE__ */ F(D, {
							className: X.searchIcon,
							"aria-hidden": "true"
						}), /* @__PURE__ */ F(Oe.Input, {
							value: k,
							onValueChange: (e) => {
								M.current = !1, A(e);
							},
							ref: ee,
							onKeyDown: ce,
							placeholder: te ? b ?? a : a,
							className: X.searchInput
						})]
					}),
					x && /* @__PURE__ */ F("p", {
						className: rr.hint,
						children: x
					}),
					/* @__PURE__ */ F(Oe.List, {
						className: X.list,
						children: B
					})
				]
			})
		})]
	});
}
var lr = {
	chip: "_chip_115x8_9",
	selected: "_selected_115x8_22",
	day: "_day_115x8_30",
	date: "_date_115x8_41"
};
//#endregion
//#region src/components/DateChip/DateChip.tsx
function ur({ day: e, date: t, selected: n = !1, onSelect: r, disabled: i = !1, className: a }) {
	return /* @__PURE__ */ I("button", {
		type: "button",
		role: "radio",
		"aria-checked": n,
		disabled: i,
		className: [
			lr.chip,
			n && lr.selected,
			a
		].filter(Boolean).join(" "),
		onClick: r,
		children: [/* @__PURE__ */ F("span", {
			className: lr.day,
			children: e
		}), /* @__PURE__ */ F("span", {
			className: lr.date,
			children: t
		})]
	});
}
var dr = {
	skeleton: "_skeleton_oeru1_4",
	pulse: "_pulse_oeru1_1",
	line: "_line_oeru1_10",
	block: "_block_oeru1_16"
};
//#endregion
//#region src/components/Skeleton/Skeleton.tsx
function fr({ shape: e = "line", width: t, height: n, className: r }) {
	let i = t !== void 0 || n !== void 0 ? {
		width: t,
		height: n
	} : void 0;
	return /* @__PURE__ */ F("span", {
		className: [
			dr.skeleton,
			dr[e],
			r
		].filter(Boolean).join(" "),
		style: i,
		"aria-hidden": "true"
	});
}
var pr = {
	tag: "_tag_1jei9_1",
	default: "_default_1jei9_13",
	success: "_success_1jei9_18",
	warning: "_warning_1jei9_23",
	error: "_error_1jei9_28",
	info: "_info_1jei9_41",
	you: "_you_1jei9_48",
	small: "_small_1jei9_55",
	medium: "_medium_1jei9_64",
	large: "_large_1jei9_73",
	pill: "_pill_1jei9_84",
	leadingIcon: "_leadingIcon_1jei9_88",
	trailingIcon: "_trailingIcon_1jei9_89"
};
//#endregion
//#region src/components/Tag/Tag.tsx
function mr({ type: e = "default", size: t = "medium", shape: n = "default", leadingIcon: r, trailingIcon: i, className: a, children: o, ...s }) {
	let c = [
		pr.tag,
		pr[e],
		pr[t],
		n === "pill" && pr.pill,
		a
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("span", {
		className: c,
		...s,
		children: [
			r && /* @__PURE__ */ F("span", {
				className: pr.leadingIcon,
				children: r
			}),
			o,
			i && /* @__PURE__ */ F("span", {
				className: pr.trailingIcon,
				children: i
			})
		]
	});
}
var Z = {
	table: "_table_1oflw_10",
	inner: "_inner_1oflw_33",
	scrollX: "_scrollX_1oflw_37",
	scroller: "_scroller_1oflw_37",
	quiet: "_quiet_1oflw_47",
	withSelect: "_withSelect_1oflw_47",
	scrollBody: "_scrollBody_1oflw_55",
	head: "_head_1oflw_69",
	default: "_default_1oflw_75",
	compact: "_compact_1oflw_125",
	comfortable: "_comfortable_1oflw_129",
	row: "_row_1oflw_133",
	header: "_header_1oflw_146",
	body: "_body_1oflw_155",
	cell: "_cell_1oflw_159",
	activatable: "_activatable_1oflw_186",
	number: "_number_1oflw_204",
	headerLabel: "_headerLabel_1oflw_225",
	headerTitle: "_headerTitle_1oflw_232",
	headerButton: "_headerButton_1oflw_239",
	sortButton: "_sortButton_1oflw_252",
	sortOn: "_sortOn_1oflw_257",
	columnLines: "_columnLines_1oflw_276",
	"align-start": "_align-start_1oflw_284",
	"align-center": "_align-center_1oflw_289",
	"align-end": "_align-end_1oflw_294",
	small: "_small_1oflw_194",
	line: "_line_1oflw_314",
	inlineValue: "_inlineValue_1oflw_333",
	inlineRule: "_inlineRule_1oflw_340",
	inlineSub: "_inlineSub_1oflw_348",
	bar: "_bar_1oflw_364",
	fill: "_fill_1oflw_371",
	barTrack: "_barTrack_1oflw_388",
	barFill: "_barFill_1oflw_397",
	barYou: "_barYou_1oflw_404",
	barValue: "_barValue_1oflw_408",
	stack: "_stack_1oflw_416",
	twoLine: "_twoLine_1oflw_426",
	sub: "_sub_1oflw_432",
	leading: "_leading_1oflw_441",
	trailing: "_trailing_1oflw_447",
	hasActions: "_hasActions_1oflw_461",
	actions: "_actions_1oflw_465",
	tags: "_tags_1oflw_497",
	firstTag: "_firstTag_1oflw_504",
	more: "_more_1oflw_517",
	addReveal: "_addReveal_1oflw_530",
	addClip: "_addClip_1oflw_540",
	truncate: "_truncate_1oflw_560",
	tooltipText: "_tooltipText_1oflw_571",
	muted: "_muted_1oflw_576",
	emphasis: "_emphasis_1oflw_195",
	tint: "_tint_1oflw_592",
	frozen: "_frozen_1oflw_596",
	action: "_action_1oflw_465",
	current: "_current_1oflw_618",
	select: "_select_1oflw_664",
	checkbox: "_checkbox_1oflw_669",
	srOnly: "_srOnly_1oflw_691",
	scrolledX: "_scrolledX_1oflw_778",
	frozenEdge: "_frozenEdge_1oflw_778",
	withBar: "_withBar_1oflw_788",
	withBarFill: "_withBarFill_1oflw_795",
	barRegion: "_barRegion_1oflw_804",
	barOpen: "_barOpen_1oflw_815",
	barInner: "_barInner_1oflw_821",
	meta: "_meta_1oflw_827",
	stackLabel: "_stackLabel_1oflw_828",
	statusCell: "_statusCell_1oflw_833",
	statusError: "_statusError_1oflw_849",
	mobileStack: "_mobileStack_1oflw_860",
	primaryCell: "_primaryCell_1oflw_891",
	hasMeta: "_hasMeta_1oflw_899"
}, hr = R({
	columns: [],
	info: [],
	selectInfo: {}
}), gr = R({}), _r = R({}), vr = 52, yr = (e) => e?.width === "fill" ? Math.max(1, Math.round(e.grow ?? 1)) : 1;
function br(e) {
	if (e.width !== "fill") return `${e.width}px`;
	let t = yr(e), n = `minmax(${(e.min ?? 0) / t}px, 1fr)`;
	return t === 1 ? n : `repeat(${t}, ${n})`;
}
function xr(e) {
	return e?.align ?? (e?.type === "number" ? "end" : "start");
}
function Sr(...e) {
	return e.filter(Boolean).join(" ");
}
function Cr(e, t, n) {
	let r = e.map((e) => ({ column: e })), i = {};
	if (t <= 0) return {
		info: r,
		selectInfo: i
	};
	let a = 0;
	n && (i.left = 0, a = vr);
	for (let n = 0; n < Math.min(t, e.length); n++) {
		r[n].left = a;
		let i = e[n].width;
		if (i === "fill" && n < t - 1) break;
		a += i === "fill" ? 0 : i;
	}
	let o = r.filter((e) => e.left !== void 0).at(-1) ?? (n ? i : void 0);
	return o && (o.edge = !0), {
		info: r,
		selectInfo: i
	};
}
function wr(e) {
	return e.left === void 0 ? void 0 : { left: e.left };
}
function Tr(e) {
	return Sr(e.left !== void 0 && Z.frozen, e.edge && Z.frozenEdge);
}
function Er({ "aria-label": e, columns: t, variant: n = "default", columnLines: r = !0, density: i, selection: a, bulkBar: o, minWidth: s, frozenColumns: c = 0, scrollBody: l = !1, mobile: u = "stack", status: d, statusContent: f, loadingRows: p = 5, sort: m, onSortChange: h, children: g, className: _ }) {
	let v = [a ? `${vr}px` : null, ...t.map(br)].filter(Boolean).join(" "), { info: y, selectInfo: b } = Cr(t, c, !!a), x = a ? a.keys.filter((e) => !a.disabledKeys?.includes(e)) : [], S = a ? x.filter((e) => a.selected.includes(e)) : [], C = x.length > 0 && S.length === x.length, w = S.length > 0 && !C, T = () => {
		if (!a) return;
		let e = a.selected.filter((e) => !x.includes(e));
		a.onSelectedChange(C ? e : [...e, ...x]);
	}, E = a?.selected.length ?? 0, [D, O] = U(!1), [k, A] = U(E > 0);
	B(() => {
		D || A(E > 0);
	}, [E, D]);
	let j = H(E);
	E && (j.current = E);
	let M = H(E);
	D || (M.current = E || j.current);
	let ee = H(null);
	V(() => {
		let e = ee.current;
		if (!e) return;
		let t = () => {
			if (!e.isConnected) return;
			let t = /* @__PURE__ */ new Map();
			e.querySelectorAll("[data-inline-col]").forEach((e) => {
				let n = e.dataset.inlineCol ?? "";
				t.set(n, [...t.get(n) ?? [], e]);
			}), t.forEach((e) => {
				let t = Math.max(...e.map((e) => e.firstElementChild?.offsetWidth ?? 0));
				e.forEach((e) => {
					e.style.minWidth = `${Math.ceil(t)}px`;
				});
			});
		};
		t(), document.fonts?.ready.then(t);
	});
	let te = H(null), N = H(!1), [ne, P] = U(!1), L = a && a.dragToSelect !== !1 ? (e, t) => {
		if (e.button !== 0) return;
		let n = x, r = n.indexOf(t);
		if (r < 0) return;
		e.preventDefault(), N.current = !0;
		let i = !a.selected.includes(t), o = a.selected, s = ee.current, c = r, l = e.clientX, u = e.clientY, d = 0, f = (e) => {
			let t = new Set(o);
			for (let a of n.slice(Math.min(r, e), Math.max(r, e) + 1)) i ? t.add(a) : t.delete(a);
			a.onSelectedChange([...t]);
		}, p = () => {
			let e = l, t = u;
			if (s) {
				let n = s.getBoundingClientRect(), r = n.top + (te.current?.offsetHeight ?? 0);
				e = Math.min(Math.max(l, n.left + 1), n.right - 1), t = Math.min(Math.max(u, r + 1), n.bottom - 1);
			}
			let r = document.elementFromPoint(e, t)?.closest("[data-row-key]");
			if (!r || !s?.contains(r)) return;
			let i = n.indexOf(r.dataset.rowKey);
			i >= 0 && i !== c && (c = i, f(i));
		}, m = () => {
			if (s && s.scrollHeight > s.clientHeight) {
				let e = s.getBoundingClientRect(), t = e.top + (te.current?.offsetHeight ?? 0);
				u > e.bottom - 40 ? s.scrollTop += 10 : u < t + 40 && (s.scrollTop -= 10), p();
			}
			d = requestAnimationFrame(m);
		}, h = (e) => {
			l = e.clientX, u = e.clientY, p();
		}, g = () => {
			cancelAnimationFrame(d), document.removeEventListener("pointermove", h), document.removeEventListener("pointerup", g), document.removeEventListener("pointercancel", g), document.body.style.userSelect = "", O(!1), setTimeout(() => {
				N.current = !1;
			}, 0);
		};
		document.body.style.userSelect = "none", O(!0), f(r), document.addEventListener("pointermove", h), document.addEventListener("pointerup", g), document.addEventListener("pointercancel", g), d = requestAnimationFrame(m);
	} : void 0, re = i ?? (n === "quiet" ? "comfortable" : "compact"), ie = /* @__PURE__ */ F("div", {
		role: "table",
		"aria-label": e,
		"data-variant": n,
		className: Sr(Z.table, Z[n], n === "default" && r && Z.columnLines, Z[re], u === "stack" && Z.mobileStack, a && Z.withSelect, l && Z.scrollBody, s !== void 0 && Z.scrollX, ne && Z.scrolledX, _),
		style: {
			"--dt-columns": v,
			"--dt-min-width": s ? `${s}px` : void 0
		},
		children: /* @__PURE__ */ F("div", {
			role: "presentation",
			className: Z.scroller,
			ref: ee,
			onScroll: c > 0 ? (e) => P(e.currentTarget.scrollLeft > 0) : void 0,
			children: /* @__PURE__ */ I("div", {
				role: "presentation",
				className: Z.inner,
				children: [/* @__PURE__ */ F("div", {
					role: "rowgroup",
					className: Z.head,
					ref: te,
					children: /* @__PURE__ */ I("div", {
						role: "row",
						className: Sr(Z.row, Z.header),
						children: [a && /* @__PURE__ */ F("div", {
							role: "columnheader",
							className: Sr(Z.cell, Z.select, Tr(b)),
							style: wr(b),
							children: x.length > 0 && /* @__PURE__ */ I("label", {
								className: Z.checkbox,
								children: [/* @__PURE__ */ F("input", {
									type: "checkbox",
									className: Z.srOnly,
									"aria-label": "Select all rows",
									checked: C,
									ref: (e) => {
										e && (e.indeterminate = w);
									},
									onChange: T
								}), /* @__PURE__ */ F(jn, {
									size: "small",
									checked: C,
									indeterminate: w
								})]
							})
						}), t.map((e, t) => /* @__PURE__ */ F("div", {
							role: "columnheader",
							"aria-sort": e.sortable ? m?.key === e.key ? m.direction : "none" : void 0,
							className: Sr(Z.cell, Z[`align-${xr(e)}`], Tr(y[t])),
							style: yr(e) > 1 ? {
								...wr(y[t]),
								gridColumn: `span ${yr(e)}`
							} : wr(y[t]),
							children: e.info !== void 0 || e.sortable ? /* @__PURE__ */ F(Ar, {
								column: e,
								sort: m,
								onSortChange: h
							}) : /* @__PURE__ */ F("span", {
								className: Z.headerLabel,
								children: e.header
							})
						}, e.key))]
					})
				}), /* @__PURE__ */ F("div", {
					role: "rowgroup",
					className: Z.body,
					children: d === "loading" ? Array.from({ length: p }, (e, n) => /* @__PURE__ */ I("div", {
						role: "row",
						className: Sr(Z.row, Z.loadingRow),
						"aria-busy": "true",
						children: [a && /* @__PURE__ */ F("div", {
							role: "cell",
							className: Sr(Z.cell, Z.select, Tr(b)),
							style: wr(b)
						}), t.map((e, t) => /* @__PURE__ */ F("div", {
							role: "cell",
							className: Sr(Z.cell, Z[`align-${xr(e)}`], Tr(y[t])),
							style: yr(e) > 1 ? {
								...wr(y[t]),
								gridColumn: `span ${yr(e)}`
							} : wr(y[t]),
							children: e.header !== void 0 && e.header !== null && /* @__PURE__ */ F(fr, { width: t === 0 ? "80%" : "60%" })
						}, e.key))]
					}, n)) : d ? /* @__PURE__ */ F("div", {
						role: "row",
						className: Sr(Z.row, Z.statusRow, d === "error" && Z.statusError),
						children: /* @__PURE__ */ F("div", {
							role: "cell",
							className: Z.statusCell,
							children: f
						})
					}) : g
				})]
			})
		})
	});
	return /* @__PURE__ */ F(hr.Provider, {
		value: {
			columns: t,
			info: y,
			selectInfo: b,
			selection: a,
			startDrag: L,
			pressedRef: N
		},
		children: o === void 0 ? ie : /* @__PURE__ */ I("div", {
			className: Sr(Z.withBar, l && Z.withBarFill),
			children: [/* @__PURE__ */ F("div", {
				className: Sr(Z.barRegion, k && Z.barOpen),
				inert: !k,
				"aria-hidden": !k,
				children: /* @__PURE__ */ F("div", {
					className: Z.barInner,
					children: /* @__PURE__ */ F(ft.Provider, {
						value: {
							count: E || j.current,
							settled: M.current
						},
						children: o
					})
				})
			}), ie]
		})
	});
}
var Dr = "a, button, input, select, textarea, label, [role=\"button\"], [role=\"menuitem\"], [tabindex]";
function Or({ rowKey: e, label: t, onActivate: n, href: r, muted: i, emphasis: a, current: o, meta: s, children: c, className: l }) {
	let { info: u, selectInfo: d, selection: f, startDrag: p, pressedRef: m } = ce(hr), h = H(null), g = r !== void 0 || n !== void 0, _ = L.toArray(c), v = Math.max(0, _.findIndex((e) => typeof e == "object" && !!e && "props" in e && e.props.primary)), y = [];
	_.reduce((e, t) => {
		y.push(e);
		let n = typeof t == "object" && t && "props" in t ? t.props.span : void 0;
		return e + Math.max(1, n ?? 1);
	}, 0);
	let b = (e) => {
		let t = Math.max(1, typeof _[e] == "object" && _[e] !== null && "props" in _[e] ? _[e].props.span ?? 1 : 1), n = 0;
		for (let r = y[e]; r < y[e] + t; r++) n += yr(u[r]?.column);
		return n;
	}, x = f?.selected.includes(e) ?? !1, S = f && !f.disabledKeys?.includes(e), C = () => {
		f && f.onSelectedChange(x ? f.selected.filter((t) => t !== e) : [...f.selected, e]);
	};
	return /* @__PURE__ */ I("div", {
		ref: h,
		role: "row",
		"aria-selected": f ? x : void 0,
		"aria-current": o || void 0,
		"data-row-key": e,
		onClick: (e) => {
			if (!g) return;
			let t = e.target;
			h.current?.contains(t) && (t.closest(Dr) || h.current?.querySelector(`.${Z.action}`)?.click());
		},
		className: Sr(Z.row, g && Z.activatable, i && Z.muted, a && Z.emphasis, a === "tint" && Z.tint, o && Z.current, s !== void 0 && Z.hasMeta, l),
		children: [
			f && /* @__PURE__ */ F("div", {
				role: "cell",
				className: Sr(Z.cell, Z.select, Tr(d)),
				style: wr(d),
				children: S && /* @__PURE__ */ I("label", {
					className: Z.checkbox,
					onPointerDown: p && ((t) => p(t, e)),
					onClick: p && ((e) => e.detail > 0 && e.preventDefault()),
					children: [/* @__PURE__ */ F("input", {
						type: "checkbox",
						className: Z.srOnly,
						"aria-label": `Select “${t ?? e}”`,
						checked: x,
						onChange: () => {
							m?.current || C();
						}
					}), /* @__PURE__ */ F(jn, {
						size: "small",
						checked: x
					})]
				})
			}),
			_.map((e, t) => /* @__PURE__ */ F(gr.Provider, {
				value: {
					...u[y[t]] ?? {},
					tracks: b(t)
				},
				children: /* @__PURE__ */ F(_r.Provider, {
					value: t === v ? {
						primary: !0,
						activate: g ? {
							href: r,
							onActivate: n
						} : void 0
					} : {},
					children: e
				})
			}, t)),
			s !== void 0 && /* @__PURE__ */ F("div", {
				role: "cell",
				className: Z.meta,
				children: s
			})
		]
	});
}
function kr(e, t) {
	return e.sortLabels ? e.sortLabels[t] : e.type === "number" ? t === "ascending" ? "Sort lowest first" : "Sort highest first" : t === "ascending" ? "Sort A to Z" : "Sort Z to A";
}
function Ar({ column: t, sort: n, onSortChange: r }) {
	let a = typeof t.header == "string" ? t.header : t.key, s = n?.key === t.key, c = () => ({
		key: t.key,
		direction: s ? n.direction === "ascending" ? "descending" : "ascending" : t.type === "number" ? "descending" : "ascending"
	});
	return /* @__PURE__ */ I("span", {
		className: Z.headerTitle,
		children: [
			/* @__PURE__ */ F("span", {
				className: Z.headerLabel,
				children: t.header
			}),
			t.info !== void 0 && /* @__PURE__ */ F(gt, {
				content: /* @__PURE__ */ F("span", {
					className: Z.tooltipText,
					children: t.info
				}),
				children: /* @__PURE__ */ F("button", {
					type: "button",
					className: Z.headerButton,
					"aria-label": `About ${a}`,
					children: /* @__PURE__ */ F(T, {
						size: 14,
						"aria-hidden": !0
					})
				})
			}),
			t.sortable && /* @__PURE__ */ F(gt, {
				content: /* @__PURE__ */ F("span", {
					className: Z.tooltipText,
					children: kr(t, c().direction)
				}),
				children: /* @__PURE__ */ F("button", {
					type: "button",
					className: Sr(Z.headerButton, Z.sortButton, s && Z.sortOn),
					"aria-label": `Sort by ${a}`,
					onClick: () => r?.(c()),
					children: s ? n.direction === "ascending" ? /* @__PURE__ */ F(i, {
						size: 12,
						"aria-hidden": !0
					}) : /* @__PURE__ */ F(e, {
						size: 12,
						"aria-hidden": !0
					}) : /* @__PURE__ */ F(o, {
						size: 12,
						"aria-hidden": !0
					})
				})
			})
		]
	});
}
function jr({ truncate: e, tooltip: t, leading: n, sub: r, subPlacement: i = "below", trailing: a, span: o, actions: s, children: c, fill: l, className: u }) {
	let d = ce(gr), f = d.column, { primary: p, activate: m } = ce(_r), h = xr(f), g = H(null), [_, v] = U(!1), y = () => !!g.current && g.current.scrollWidth > g.current.clientWidth + 1, b = e ? t ?? (typeof c == "string" ? c : void 0) : void 0, x = c;
	if (e) {
		let e = /* @__PURE__ */ F("span", {
			ref: g,
			className: Z.truncate,
			children: c
		});
		x = b === void 0 ? e : /* @__PURE__ */ F(gt, {
			content: /* @__PURE__ */ F("span", {
				className: Z.tooltipText,
				children: b
			}),
			open: _,
			onOpenChange: (e) => v(e && y()),
			children: e
		});
	}
	if (m) {
		let e = b === void 0 ? {} : {
			onFocus: () => v(y()),
			onBlur: () => v(!1)
		};
		x = m.href === void 0 ? /* @__PURE__ */ F("button", {
			type: "button",
			className: Z.action,
			onClick: m.onActivate,
			...e,
			children: x
		}) : /* @__PURE__ */ F("a", {
			className: Z.action,
			href: m.href,
			onClick: m.onActivate,
			...e,
			children: x
		});
	}
	let S = d.tracks ?? (o && o > 1 ? o : 1), C = {
		...wr(d),
		...S > 1 ? { gridColumn: `span ${S}` } : {}
	};
	return /* @__PURE__ */ I("div", {
		role: "cell",
		className: Sr(Z.cell, Z[`align-${h}`], f?.type === "number" && Z.number, f?.size === "small" && Z.small, r !== void 0 && i === "below" && Z.twoLine, p && Z.primaryCell, s !== void 0 && Z.hasActions, l && Z.fill, Tr(d), u),
		style: Object.keys(C).length ? C : void 0,
		children: [
			!p && f?.header !== void 0 && f.header !== null && /* @__PURE__ */ F("span", {
				className: Z.stackLabel,
				"aria-hidden": "true",
				children: f.header
			}),
			n && /* @__PURE__ */ F("span", {
				className: Z.leading,
				children: n
			}),
			r !== void 0 && i === "inline" ? /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ I("span", {
				className: Z.line,
				children: [
					/* @__PURE__ */ F("span", {
						className: Z.inlineValue,
						"data-inline-col": f?.key ?? "",
						children: /* @__PURE__ */ F("span", { children: x })
					}),
					/* @__PURE__ */ F("span", {
						className: Z.inlineRule,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ F("span", {
						className: Z.inlineSub,
						children: r
					})
				]
			}), a && /* @__PURE__ */ F("span", {
				className: Z.trailing,
				children: a
			})] }) : r === void 0 ? /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
				className: Z.line,
				children: x
			}), a && /* @__PURE__ */ F("span", {
				className: Z.trailing,
				children: a
			})] }) : /* @__PURE__ */ I("span", {
				className: Z.stack,
				children: [/* @__PURE__ */ I("span", {
					className: Z.line,
					children: [x, a && /* @__PURE__ */ F("span", {
						className: Z.trailing,
						children: a
					})]
				}), /* @__PURE__ */ F("span", {
					className: Z.sub,
					children: r
				})]
			}),
			s !== void 0 && /* @__PURE__ */ F("span", {
				className: Z.actions,
				children: s
			})
		]
	});
}
function Mr({ value: e, max: t = 1, highlight: n, format: r = (e) => e.toFixed(2), width: i = 300 }) {
	let a = t > 0 ? Math.max(0, Math.min(1, e / t)) * 100 : 0;
	return /* @__PURE__ */ I("span", {
		className: Z.bar,
		style: { maxWidth: i },
		children: [/* @__PURE__ */ F("span", {
			className: Z.barTrack,
			"aria-hidden": "true",
			children: /* @__PURE__ */ F("span", {
				className: Sr(Z.barFill, n && Z.barYou),
				style: { width: `${a}%` }
			})
		}), /* @__PURE__ */ F("span", {
			className: Z.barValue,
			children: r(e)
		})]
	});
}
function Nr({ items: e, leading: t, add: n }) {
	let r = H(null), [i, a] = U(!1), [o, ...s] = e, c = () => {
		let e = r.current?.querySelector("*") ?? r.current;
		return !!e && e.scrollWidth > e.clientWidth + 1;
	};
	return /* @__PURE__ */ I("span", {
		className: Z.tags,
		children: [
			t && /* @__PURE__ */ F("span", {
				className: Z.leading,
				children: t
			}),
			o && /* @__PURE__ */ F(gt, {
				content: o.label,
				open: i,
				onOpenChange: (e) => a(e && c()),
				children: /* @__PURE__ */ F("span", {
					ref: r,
					className: Z.firstTag,
					children: o.content ?? /* @__PURE__ */ F(mr, {
						size: "medium",
						children: o.label
					})
				})
			}),
			s.length > 0 && /* @__PURE__ */ F(gt, {
				content: s.map((e) => e.label).join(", "),
				children: /* @__PURE__ */ F("span", {
					className: Z.more,
					tabIndex: 0,
					children: /* @__PURE__ */ I(mr, {
						size: "medium",
						children: ["+", s.length]
					})
				})
			}),
			n !== void 0 && /* @__PURE__ */ F("span", {
				className: Z.addReveal,
				children: /* @__PURE__ */ F("span", {
					className: Z.addClip,
					children: n
				})
			})
		]
	});
}
var Pr = {
	divider: "_divider_11cwr_1",
	subtle: "_subtle_11cwr_8"
};
//#endregion
//#region src/components/Divider/Divider.tsx
function Fr({ tone: e = "default" }) {
	return /* @__PURE__ */ F("hr", { className: [Pr.divider, e === "subtle" && Pr.subtle].filter(Boolean).join(" ") });
}
var Ir = {
	emptyState: "_emptyState_14uwz_7",
	icon: "_icon_14uwz_19",
	title: "_title_14uwz_31",
	description: "_description_14uwz_40",
	action: "_action_14uwz_52"
};
//#endregion
//#region src/components/EmptyState/EmptyState.tsx
function Lr({ title: e, description: t, icon: n, action: r, className: i }) {
	return /* @__PURE__ */ I("div", {
		className: [Ir.emptyState, i].filter(Boolean).join(" "),
		children: [
			n && /* @__PURE__ */ F("span", {
				className: Ir.icon,
				children: n
			}),
			e && /* @__PURE__ */ F("p", {
				className: Ir.title,
				children: e
			}),
			t && /* @__PURE__ */ F("p", {
				className: Ir.description,
				children: t
			}),
			r && /* @__PURE__ */ F("div", {
				className: Ir.action,
				children: r
			})
		]
	});
}
var Rr = {
	field: "_field_a1631_1",
	input: "_input_a1631_24",
	secondary: "_secondary_a1631_35",
	warning: "_warning_a1631_41",
	error: "_error_a1631_47",
	withMessage: "_withMessage_a1631_52",
	message: "_message_a1631_59",
	messageError: "_messageError_a1631_68",
	messageWarning: "_messageWarning_a1631_72",
	icon: "_icon_a1631_106",
	primary: "_primary_a1631_122",
	tertiary: "_tertiary_a1631_136",
	small: "_small_a1631_146",
	medium: "_medium_a1631_161",
	large: "_large_a1631_167",
	expanded: "_expanded_a1631_173",
	multiline: "_multiline_a1631_174"
};
//#endregion
//#region src/components/Input/Input.tsx
function zr({ type: e = "primary", size: t = "medium", leadingIcon: n, trailingIcon: r, warning: i = !1, error: a = !1, message: o, htmlType: s, multiline: c = !1, className: l, ...u }) {
	let d = le(), f = c || t === "expanded", p = [
		Rr.field,
		Rr[e],
		Rr[t],
		c && Rr.multiline,
		i && Rr.warning,
		a && Rr.error,
		l
	].filter(Boolean).join(" "), m = [u["aria-describedby"], o ? d : void 0].filter(Boolean).join(" ") || void 0, h = {
		...u,
		"aria-describedby": m,
		"aria-invalid": a || u["aria-invalid"] || void 0
	}, g = /* @__PURE__ */ I("span", {
		className: p,
		children: [
			n && /* @__PURE__ */ F("span", {
				className: Rr.icon,
				children: n
			}),
			f ? /* @__PURE__ */ F("textarea", {
				className: Rr.input,
				...h
			}) : /* @__PURE__ */ F("input", {
				type: s,
				className: Rr.input,
				...h
			}),
			r && /* @__PURE__ */ F("span", {
				className: Rr.icon,
				children: r
			})
		]
	});
	return o ? /* @__PURE__ */ I("span", {
		className: Rr.withMessage,
		children: [g, /* @__PURE__ */ F("span", {
			id: d,
			role: a ? "alert" : void 0,
			className: [Rr.message, a ? Rr.messageError : i ? Rr.messageWarning : void 0].filter(Boolean).join(" "),
			children: o
		})]
	}) : g;
}
var Br = {
	menuItem: "_menuItem_aoma1_1",
	selected: "_selected_aoma1_26",
	danger: "_danger_aoma1_34",
	small: "_small_aoma1_43",
	medium: "_medium_aoma1_56",
	large: "_large_aoma1_64",
	icon: "_icon_aoma1_72",
	meta: "_meta_aoma1_110",
	label: "_label_aoma1_123",
	wrap: "_wrap_aoma1_133",
	text: "_text_aoma1_161",
	description: "_description_aoma1_172",
	field: "_field_aoma1_200",
	input: "_input_aoma1_218",
	addQuery: "_addQuery_aoma1_239",
	stack: "_stack_aoma1_248",
	sizer: "_sizer_aoma1_259",
	addActions: "_addActions_aoma1_283",
	addAction: "_addAction_aoma1_283",
	addActionsSizer: "_addActionsSizer_aoma1_301"
};
//#endregion
//#region src/components/MenuItem/MenuItem.tsx
function Vr({ label: e, size: t = "medium", leadingIcon: n, trailingIcon: r, meta: i, wrap: a = !1, description: o, selected: s = !1, tone: c = "default", className: l, ...u }) {
	let d = le(), f = [
		Br.menuItem,
		Br[t],
		(a || o) && Br.wrap,
		s && Br.selected,
		c === "danger" && Br.danger,
		l
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("button", {
		type: "button",
		role: "menuitem",
		className: f,
		"aria-labelledby": o ? `${d}-label` : void 0,
		"aria-describedby": o ? `${d}-description` : void 0,
		"aria-current": s || void 0,
		...u,
		children: [
			n && /* @__PURE__ */ F("span", {
				className: Br.icon,
				children: n
			}),
			o ? /* @__PURE__ */ I("span", {
				className: Br.text,
				children: [/* @__PURE__ */ F("span", {
					id: `${d}-label`,
					className: Br.label,
					children: e
				}), /* @__PURE__ */ F("span", {
					id: `${d}-description`,
					className: Br.description,
					children: o
				})]
			}) : /* @__PURE__ */ F("span", {
				className: Br.label,
				children: e
			}),
			i != null && /* @__PURE__ */ F("span", {
				className: Br.meta,
				children: i
			}),
			r && /* @__PURE__ */ F("span", {
				className: Br.icon,
				children: r
			})
		]
	});
}
var Hr = {
	button: "_button_m44py_1",
	ghost: "_ghost_m44py_38 _ghost_1lal8_3",
	primary: "_primary_m44py_44 _primary_1lal8_3",
	secondary: "_secondary_m44py_48 _secondary_1lal8_3",
	tertiary: "_tertiary_m44py_52 _tertiary_1lal8_3",
	danger: "_danger_m44py_60 _danger_1lal8_3",
	round: "_round_m44py_66",
	square: "_square_m44py_70",
	small: "_small_m44py_76",
	icon: "_icon_m44py_80",
	medium: "_medium_m44py_85",
	large: "_large_m44py_94"
};
//#endregion
//#region src/components/IconButton/IconButton.tsx
function Ur({ type: e = "primary", size: t = "medium", shape: n = "round", icon: r, htmlType: i = "button", className: a, ...o }) {
	let s = [
		Hr.button,
		Hr[e],
		Hr[t],
		Hr[n],
		a
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("button", {
		type: i,
		className: s,
		...o,
		children: /* @__PURE__ */ F("span", {
			className: Hr.icon,
			children: r
		})
	});
}
//#endregion
//#region src/components/MenuItem/MenuAddItem.tsx
function Wr({ onCreate: e, label: t = "Add your own", placeholder: n, query: r, size: i = "medium" }) {
	let a = ce(ot), o = le(), s = H(null), [c, l] = U(!1), [u, d] = U(""), f = r?.trim() ?? "", p = (e) => {
		l(!1), d(""), e && requestAnimationFrame(() => document.getElementById(o)?.focus());
	}, m = () => {
		let t = u.trim();
		t && (e(t), p(!1), a?.select());
	};
	if (V(() => {
		c && s.current?.focus();
	}, [c]), B(() => {
		if (!(!c || !a)) return a.escapeGuard.current = () => (p(!0), !0), () => {
			a.escapeGuard.current = null;
		};
	}), f) return /* @__PURE__ */ F(Vr, {
		className: Br.addQuery,
		size: i,
		label: `Add “${f}”`,
		leadingIcon: /* @__PURE__ */ F(j, {}),
		onClick: () => e(f)
	});
	let h = /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
		className: Br.sizer,
		"aria-hidden": "true",
		children: t
	}), /* @__PURE__ */ F("span", {
		className: Br.sizer,
		"aria-hidden": "true",
		children: n ?? t
	})] });
	return c ? /* @__PURE__ */ I("div", {
		className: [
			Br.menuItem,
			Br[i],
			Br.field
		].join(" "),
		role: "presentation",
		onClick: () => s.current?.focus(),
		children: [
			/* @__PURE__ */ F("span", {
				className: Br.icon,
				children: /* @__PURE__ */ F(j, {})
			}),
			/* @__PURE__ */ I("span", {
				className: Br.stack,
				children: [h, /* @__PURE__ */ F("input", {
					ref: s,
					className: Br.input,
					"aria-label": t,
					placeholder: n ?? t,
					value: u,
					onChange: (e) => d(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" ? (e.preventDefault(), m()) : e.key === "Escape" && !a && p(!0), e.key !== "Tab" && e.key !== "Escape" && e.stopPropagation();
					},
					onBlur: () => {
						u.trim() || p(!1);
					}
				})]
			}),
			u.trim() ? /* @__PURE__ */ I("span", {
				className: Br.addActions,
				children: [/* @__PURE__ */ F(Ur, {
					type: "ghost",
					size: "small",
					shape: "round",
					className: Br.addAction,
					icon: /* @__PURE__ */ F(ne, {}),
					"aria-label": "Discard",
					onClick: () => p(!0)
				}), /* @__PURE__ */ F(Ur, {
					type: "tertiary",
					size: "small",
					shape: "round",
					className: Br.addAction,
					icon: /* @__PURE__ */ F(y, {}),
					"aria-label": `Add “${u.trim()}”`,
					onClick: m
				})]
			}) : /* @__PURE__ */ F("span", {
				className: [Br.addActions, Br.addActionsSizer].join(" "),
				"aria-hidden": "true"
			})
		]
	}) : /* @__PURE__ */ I("button", {
		type: "button",
		role: "menuitem",
		id: o,
		className: [Br.menuItem, Br[i]].join(" "),
		"data-keeps-open": "",
		onClick: () => l(!0),
		children: [
			/* @__PURE__ */ F("span", {
				className: Br.icon,
				children: /* @__PURE__ */ F(j, {})
			}),
			/* @__PURE__ */ I("span", {
				className: Br.stack,
				children: [h, /* @__PURE__ */ F("span", {
					className: Br.label,
					children: t
				})]
			}),
			/* @__PURE__ */ F("span", {
				className: [Br.addActions, Br.addActionsSizer].join(" "),
				"aria-hidden": "true"
			})
		]
	});
}
var Gr = {
	trigger: "_trigger_1ps3u_4",
	compact: "_compact_1ps3u_39",
	caret: "_caret_1ps3u_48",
	accent: "_accent_1ps3u_57",
	leadingIcon: "_leadingIcon_1ps3u_96",
	value: "_value_1ps3u_109",
	triggerLongOption: "_triggerLongOption_1ps3u_113",
	label: "_label_1ps3u_135",
	labelDivider: "_labelDivider_1ps3u_140",
	menu: "_menu_1ps3u_147",
	menuLongOption: "_menuLongOption_1ps3u_157",
	longRow: "_longRow_1ps3u_166",
	menuItemCompact: "_menuItemCompact_1ps3u_178",
	menuCompact: "_menuCompact_1ps3u_186",
	pinned: "_pinned_1ps3u_200",
	find: "_find_1ps3u_218",
	empty: "_empty_1ps3u_228",
	group: "_group_1ps3u_239"
};
//#endregion
//#region src/components/FilterDropdown/FilterDropdown.tsx
function Kr({ options: e, size: t = "default", tone: n = "default", leadingIcon: r, disabled: i = !1, className: a, "aria-label": o, label: s, longOptions: c = !1, maxWidth: l, multiple: u = !1, value: d, onChange: f, placeholder: m = "Select an option", values: h = [], onValuesChange: _, allLabel: v = "All", searchable: b = !1, searchPlaceholder: x = "Search", emptyMessage: S = "No matches" }) {
	let [C, w] = U(!1), [T, E] = U(""), O = (!!s || c) && !u, k = H(null), A = H(null), [j, M] = U(!1);
	function ee(e) {
		e && M(!1), E(""), w(e);
	}
	let te = T.trim().toLowerCase(), N = te ? e.filter((e) => e.label.toLowerCase().includes(te)) : e;
	V(() => {
		let e = k.current;
		!C || !e || (e.style.scrollPaddingTop = A.current ? `${A.current.offsetHeight}px` : "");
	});
	function ne(e) {
		if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
		let t = Array.from(k.current?.querySelectorAll("input, button:not(:disabled)") ?? []), n = t.indexOf(document.activeElement), r = e.key === "ArrowDown" ? Math.min(t.length - 1, n + 1) : Math.max(0, n - 1);
		t[r] && r !== n && (e.preventDefault(), t[r].focus());
	}
	let L = u ? qr(e, h, v, !!s) : e.find((e) => e.value === d)?.label ?? m;
	function ie(e) {
		f?.(e), w(!1);
	}
	let R = h.length === 0 || e.every((e) => h.includes(e.value)), ae = R && j, oe = (e) => ae || !R && h.includes(e);
	function z(t) {
		let n = ae ? e.map((e) => e.value) : h, r = R && !ae ? [t] : n.includes(t) ? n.filter((e) => e !== t) : [...n, t], i = e.every((e) => r.includes(e.value));
		M(i), _?.(r.length === 0 || i ? [] : r);
	}
	function se() {
		M(!1), R || _?.([]);
	}
	let ce = {
		width: 16,
		height: 16
	}, B = t === "compact", ue = e.some((e) => e.count !== void 0), de = {
		"--checkbox-option-scale": .8,
		"--checkbox-option-font-family": B ? "var(--text-dense-font-family)" : "var(--text-default-comfy-300-font-family)",
		"--checkbox-option-font-weight": B ? "var(--text-dense-font-weight)" : "var(--text-default-comfy-300-font-weight)",
		"--checkbox-option-font-size": B ? "var(--text-dense-font-size)" : "var(--text-default-comfy-300-font-size)",
		"--checkbox-option-line-height": B ? "var(--text-dense-line-height)" : "var(--text-default-comfy-300-line-height)",
		...B && { gap: "var(--spacing-gap-100)" }
	}, W = {
		...de,
		"--checkbox-option-content-indent": "var(--spacing-gap-050)"
	}, fe = (e) => /* @__PURE__ */ F(P, { children: O ? e.map((e, t) => /* @__PURE__ */ I(re, { children: [t > 0 && /* @__PURE__ */ F(Fr, {}), /* @__PURE__ */ F(Vr, {
		role: "menuitemradio",
		"aria-checked": e.value === d,
		wrap: !0,
		className: Gr.longRow,
		label: e.label,
		leadingIcon: e.leadingIcon && /* @__PURE__ */ F("span", {
			style: ce,
			children: e.leadingIcon
		}),
		trailingIcon: e.value === d ? /* @__PURE__ */ F(y, {
			weight: "bold",
			style: ce
		}) : void 0,
		disabled: e.disabled,
		onClick: () => ie(e.value)
	})] }, e.value)) : u ? /* @__PURE__ */ F(P, { children: e.map((e) => /* @__PURE__ */ F(Bn, {
		checked: oe(e.value),
		label: e.label,
		leadingIcon: e.leadingIcon,
		disabled: e.disabled,
		onCheckedChange: () => z(e.value),
		style: de
	}, e.value)) }) : e.map((e) => /* @__PURE__ */ F(Vr, {
		role: "menuitemradio",
		"aria-checked": e.value === d,
		className: Gr.menuItemCompact,
		label: e.label,
		leadingIcon: e.leadingIcon && /* @__PURE__ */ F("span", {
			style: ce,
			children: e.leadingIcon
		}),
		meta: e.count,
		trailingIcon: e.value === d ? /* @__PURE__ */ F(y, {
			weight: "bold",
			style: ce
		}) : ue ? /* @__PURE__ */ F("span", {}) : void 0,
		disabled: e.disabled,
		onClick: () => ie(e.value)
	}, e.value)) }), pe = le(), G = e.some((e) => e.group) ? N.reduce((e, t) => {
		let n = e[e.length - 1], r = t.group ? e.find((e) => e.group === t.group) : n && n.group === void 0 ? n : void 0;
		return r ? r.list.push(t) : e.push({
			group: t.group,
			list: [t]
		}), e;
	}, []) : null;
	return /* @__PURE__ */ I(Te.Root, {
		open: C,
		onOpenChange: ee,
		children: [/* @__PURE__ */ F(Te.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ I("button", {
				type: "button",
				className: [
					Gr.trigger,
					B && Gr.compact,
					n === "accent" && Gr.accent,
					O && Gr.triggerLongOption,
					a
				].filter(Boolean).join(" "),
				style: !u && l !== void 0 ? { maxWidth: l } : void 0,
				disabled: i,
				"aria-label": o,
				children: [
					r && /* @__PURE__ */ F("span", {
						className: Gr.leadingIcon,
						children: r
					}),
					s && /* @__PURE__ */ F("span", {
						className: Gr.label,
						children: s
					}),
					s && /* @__PURE__ */ F("span", {
						className: Gr.labelDivider,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ F("span", {
						className: Gr.value,
						children: L
					}),
					F(C ? g : p, {
						weight: B ? "bold" : "regular",
						className: Gr.caret
					})
				]
			})
		}), /* @__PURE__ */ F(at, {
			open: C,
			align: "start",
			sideOffset: 4,
			style: {
				minWidth: "var(--radix-popover-trigger-width)",
				zIndex: 200
			},
			onEscapeKeyDown: (e) => {
				T && (e.preventDefault(), E(""));
			},
			children: /* @__PURE__ */ I(ct, {
				ref: k,
				className: [
					Gr.menu,
					O && Gr.menuLongOption,
					B && Gr.menuCompact
				].filter(Boolean).join(" "),
				onKeyDown: ne,
				children: [
					(b || u && !te) && /* @__PURE__ */ I("div", {
						ref: A,
						className: Gr.pinned,
						children: [b && /* @__PURE__ */ F(zr, {
							size: "small",
							htmlType: "search",
							className: Gr.find,
							leadingIcon: /* @__PURE__ */ F(D, {}),
							placeholder: x,
							"aria-label": x,
							value: T,
							onChange: (e) => E(e.target.value)
						}), u && !te && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F(Bn, {
							checked: R,
							label: v,
							onCheckedChange: se,
							style: e.some((e) => e.leadingIcon) ? W : de
						}), /* @__PURE__ */ F(Fr, {})] })]
					}),
					N.length === 0 && /* @__PURE__ */ F("div", {
						className: Gr.empty,
						children: S
					}),
					G ? G.map(({ group: e, list: t }, n) => e === void 0 ? /* @__PURE__ */ F(re, { children: fe(t) }, `plain-${n}`) : /* @__PURE__ */ I("div", {
						role: "group",
						"aria-labelledby": `${pe}-${n}`,
						className: Gr.group,
						children: [/* @__PURE__ */ F(ar, {
							id: `${pe}-${n}`,
							children: e
						}), fe(t)]
					}, e)) : fe(N)
				]
			})
		})]
	});
}
function qr(e, t, n, r) {
	return t.length === 0 || t.length === e.length ? n : t.length === 1 ? e.find((e) => e.value === t[0])?.label ?? n : r ? `${t.length}` : `${t.length} selected`;
}
var Jr = {
	toggle: "_toggle_wjy24_1",
	input: "_input_wjy24_14",
	small: "_small_wjy24_19",
	medium: "_medium_wjy24_26",
	large: "_large_wjy24_32",
	track: "_track_wjy24_8",
	thumb: "_thumb_wjy24_74"
};
//#endregion
//#region src/components/Toggle/Toggle.tsx
function Yr({ size: e = "large", className: t, ...n }) {
	let r = [
		Jr.toggle,
		Jr[e],
		t
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("label", {
		className: r,
		children: [/* @__PURE__ */ F("input", {
			type: "checkbox",
			role: "switch",
			className: Jr.input,
			...n
		}), /* @__PURE__ */ F("span", {
			className: Jr.track,
			children: /* @__PURE__ */ F("span", { className: Jr.thumb })
		})]
	});
}
var Xr = {
	pill: "_pill_eqrre_6",
	label: "_label_eqrre_22",
	compact: "_compact_eqrre_40",
	accent: "_accent_eqrre_54",
	"accent-wash": "_accent-wash_eqrre_1",
	info: "_info_eqrre_143"
};
//#endregion
//#region src/components/FilterToggle/FilterToggle.tsx
function Zr({ label: e, tone: t = "default", size: n = "default", info: r, className: i, onChange: a, ...o }) {
	let s = le(), [c, l] = U(!1);
	return /* @__PURE__ */ I("span", {
		className: [
			Xr.pill,
			t === "accent" && Xr.accent,
			n === "compact" && Xr.compact,
			i
		].filter(Boolean).join(" "),
		"data-armed": c || void 0,
		children: [
			/* @__PURE__ */ F(Yr, {
				size: "small",
				"aria-labelledby": s,
				onChange: (e) => {
					l(!0), a?.(e);
				},
				...o
			}),
			/* @__PURE__ */ F("span", {
				id: s,
				className: Xr.label,
				children: e
			}),
			r && /* @__PURE__ */ F(gt, {
				content: r,
				children: /* @__PURE__ */ F("button", {
					type: "button",
					className: Xr.info,
					"aria-label": `About ${e}`,
					children: /* @__PURE__ */ F(T, { "aria-hidden": "true" })
				})
			})
		]
	});
}
var Qr = {
	trigger: "_trigger_14x4g_1",
	active: "_active_14x4g_18",
	icon: "_icon_14x4g_28"
};
//#endregion
//#region src/components/RowMenuTrigger/RowMenuTrigger.tsx
function $r({ active: e = !1, className: t, ...n }) {
	let r = [
		Qr.trigger,
		e && Qr.active,
		t
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("button", {
		type: "button",
		"aria-expanded": e,
		className: r,
		...n,
		children: /* @__PURE__ */ F(w, {
			weight: "bold",
			className: Qr.icon
		})
	});
}
var ei = {
	list: "_list_99s53_3",
	item: "_item_99s53_10",
	selected: "_selected_99s53_19",
	button: "_button_99s53_24",
	label: "_label_99s53_61",
	count: "_count_99s53_68",
	actions: "_actions_99s53_79",
	layout: "_layout_99s53_88",
	grid: "_grid_99s53_93",
	fill: "_fill_99s53_109"
};
//#endregion
//#region src/components/GroupList/GroupList.tsx
function ti({ "aria-label": e, items: t, value: n, onChange: r, className: i }) {
	return /* @__PURE__ */ F("nav", {
		"aria-label": e,
		className: [ei.list, i].filter(Boolean).join(" "),
		children: t.map((e) => {
			let t = e.key === n;
			return /* @__PURE__ */ I("div", {
				className: [ei.item, t && ei.selected].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ I("button", {
					type: "button",
					className: ei.button,
					"aria-current": t ? "true" : void 0,
					onClick: () => r(e.key),
					children: [/* @__PURE__ */ F("span", {
						className: ei.label,
						children: e.label
					}), e.count !== void 0 && /* @__PURE__ */ F("span", {
						className: ei.count,
						children: e.count
					})]
				}), t && e.menu !== void 0 && /* @__PURE__ */ F("span", {
					className: ei.actions,
					children: /* @__PURE__ */ F(ut, {
						align: "start",
						trigger: /* @__PURE__ */ F($r, { "aria-label": `Actions for ${e.label}` }),
						children: e.menu
					})
				})]
			}, e.key);
		})
	});
}
function ni({ children: e, fill: t, className: n }) {
	return /* @__PURE__ */ F("div", {
		className: [
			ei.layout,
			t && ei.fill,
			n
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ F("div", {
			className: ei.grid,
			children: e
		})
	});
}
var ri = {
	heading: "_heading_17ngc_1",
	small: "_small_17ngc_7",
	medium: "_medium_17ngc_15",
	large: "_large_17ngc_23"
};
//#endregion
//#region src/components/InputHeading/InputHeading.tsx
function ii({ size: e = "small", className: t, children: n, ...r }) {
	let i = [
		ri.heading,
		ri[e],
		t
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("label", {
		className: i,
		...r,
		children: n
	});
}
var ai = {
	toggle: "_toggle_46zcp_1",
	track: "_track_46zcp_21",
	highlight: "_highlight_46zcp_39",
	highlightDark: "_highlightDark_46zcp_56",
	iconSlot: "_iconSlot_46zcp_60",
	iconActive: "_iconActive_46zcp_75",
	icon: "_icon_46zcp_60",
	"icon-settle": "_icon-settle_46zcp_1",
	three: "_three_46zcp_125",
	at0: "_at0_46zcp_130",
	at1: "_at1_46zcp_134",
	at2: "_at2_46zcp_138"
}, oi = [
	{
		mode: "light",
		label: "Light",
		Icon: ee
	},
	{
		mode: "dark",
		label: "Dark",
		Icon: A
	},
	{
		mode: "system",
		label: "Match my device",
		Icon: C
	}
], si = (...e) => e.filter(Boolean).join(" ");
function ci({ mode: e, onChange: t, className: n, "aria-label": r = "Color theme", ...i }) {
	let a = H([]), o = Math.max(0, oi.findIndex((t) => t.mode === e)), s = (e) => {
		let n = (e + oi.length) % oi.length;
		t?.(oi[n].mode), a.current[n]?.focus();
	};
	return /* @__PURE__ */ F("div", {
		role: "radiogroup",
		"aria-label": r,
		className: si(ai.toggle, ai.three, n),
		onKeyDown: (e) => {
			let t = {
				ArrowRight: 1,
				ArrowDown: 1,
				ArrowLeft: -1,
				ArrowUp: -1
			}[e.key];
			if (t !== void 0) s(o + t);
			else if (e.key === "Home") s(0);
			else if (e.key === "End") s(oi.length - 1);
			else return;
			e.preventDefault();
		},
		...i,
		children: /* @__PURE__ */ I("span", {
			className: ai.track,
			children: [/* @__PURE__ */ F("span", { className: si(ai.highlight, ai[`at${o}`]) }), oi.map(({ mode: e, label: n, Icon: r }, i) => /* @__PURE__ */ F(gt, {
				content: n,
				children: /* @__PURE__ */ F("button", {
					ref: (e) => {
						a.current[i] = e;
					},
					type: "button",
					role: "radio",
					"aria-checked": i === o,
					"aria-label": n,
					tabIndex: i === o ? 0 : -1,
					className: ai.iconSlot,
					onClick: () => t?.(e),
					children: /* @__PURE__ */ F(r, {
						weight: "fill",
						"aria-hidden": !0,
						className: si(ai.icon, i === o && ai.iconActive)
					})
				})
			}, e))]
		})
	});
}
function li(e) {
	if (e.includeSystem) {
		let { includeSystem: t, ...n } = e;
		return /* @__PURE__ */ F(ci, { ...n });
	}
	let { includeSystem: t, ...n } = e;
	return /* @__PURE__ */ F(ui, { ...n });
}
function ui({ mode: e, onChange: t, className: n, "aria-label": r = "Toggle color theme", ...i }) {
	let a = [ai.toggle, n].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("button", {
		type: "button",
		role: "switch",
		"aria-checked": e === "dark",
		"aria-label": r,
		className: a,
		onClick: () => t?.(e === "light" ? "dark" : "light"),
		...i,
		children: /* @__PURE__ */ I("span", {
			className: ai.track,
			children: [
				/* @__PURE__ */ F("span", { className: [ai.highlight, e === "dark" && ai.highlightDark].filter(Boolean).join(" ") }),
				/* @__PURE__ */ F("span", {
					className: ai.iconSlot,
					children: /* @__PURE__ */ F(ee, {
						weight: "fill",
						className: [ai.icon, e === "light" && ai.iconActive].filter(Boolean).join(" ")
					})
				}),
				/* @__PURE__ */ F("span", {
					className: ai.iconSlot,
					children: /* @__PURE__ */ F(A, {
						weight: "fill",
						className: [ai.icon, e === "dark" && ai.iconActive].filter(Boolean).join(" ")
					})
				})
			]
		})
	});
}
//#endregion
//#region src/internal/AnimatedDialogContent.tsx
function di({ open: e, children: t, overlayClassName: n, className: r, ...i }) {
	let a = Y(), o = a ? 0 : 8, s = a ? 1 : .98, c = a ? 0 : .2;
	return /* @__PURE__ */ F(Ae.Portal, {
		forceMount: !0,
		children: /* @__PURE__ */ F(fe, { children: e && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F(Ae.Overlay, {
			forceMount: !0,
			style: {
				position: "fixed",
				inset: 0,
				zIndex: 101
			},
			children: /* @__PURE__ */ F(K.div, {
				className: n,
				style: {
					width: "100%",
					height: "100%"
				},
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: c }
			})
		}), /* @__PURE__ */ F(Ae.Content, {
			forceMount: !0,
			className: r,
			...i,
			children: /* @__PURE__ */ F(K.div, {
				initial: {
					opacity: 0,
					scale: s,
					y: o
				},
				animate: {
					opacity: 1,
					scale: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					scale: s,
					y: o
				},
				transition: {
					duration: c,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				children: t
			})
		})] }) })
	});
}
var fi = {
	overlay: "_overlay_1bpkt_3",
	content: "_content_1bpkt_7",
	small: "_small_1bpkt_22",
	medium: "_medium_1bpkt_27",
	large: "_large_1bpkt_32",
	surface: "_surface_1bpkt_37",
	header: "_header_1bpkt_55",
	title: "_title_1bpkt_63",
	description: "_description_1bpkt_73",
	preview: "_preview_1bpkt_88",
	body: "_body_1bpkt_84",
	footer: "_footer_1bpkt_112"
};
//#endregion
//#region src/components/Modal/Modal.tsx
function pi({ open: e, onOpenChange: t, size: n = "medium", title: r, description: i, preview: a, children: o, footer: s, dismissible: c = !0, closeOnOutsideClick: l = !0, closeOnEscape: u = !0, className: d }) {
	return /* @__PURE__ */ F(Ae.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ F(di, {
			open: e,
			overlayClassName: fi.overlay,
			className: [
				fi.content,
				fi[n],
				d
			].filter(Boolean).join(" "),
			onPointerDownOutside: (e) => {
				l || e.preventDefault();
			},
			onEscapeKeyDown: (e) => {
				u || e.preventDefault();
			},
			...i ? {} : { "aria-describedby": void 0 },
			children: /* @__PURE__ */ I("div", {
				className: fi.surface,
				children: [
					/* @__PURE__ */ I("div", {
						className: fi.header,
						children: [/* @__PURE__ */ F(Ae.Title, {
							asChild: !0,
							children: /* @__PURE__ */ F("h2", {
								className: fi.title,
								children: r
							})
						}), c && /* @__PURE__ */ F(Ae.Close, {
							asChild: !0,
							children: /* @__PURE__ */ F(Ur, {
								type: "ghost",
								size: "small",
								shape: "round",
								icon: /* @__PURE__ */ F(ne, {}),
								"aria-label": "Close"
							})
						})]
					}),
					i && /* @__PURE__ */ F(Ae.Description, {
						asChild: !0,
						children: /* @__PURE__ */ F("p", {
							className: fi.description,
							children: i
						})
					}),
					a && /* @__PURE__ */ F("div", {
						className: fi.preview,
						children: a
					}),
					/* @__PURE__ */ F("div", {
						className: fi.body,
						children: o
					}),
					s && /* @__PURE__ */ F("div", {
						className: fi.footer,
						children: s
					})
				]
			})
		})
	});
}
var mi = {
	overlay: "_overlay_duofz_4",
	content: "_content_duofz_8",
	surface: "_surface_duofz_18",
	copy: "_copy_duofz_34",
	title: "_title_duofz_42",
	description: "_description_duofz_52",
	action: "_action_duofz_61",
	art: "_art_duofz_66",
	close: "_close_duofz_78"
};
//#endregion
//#region src/components/FeatureModal/FeatureModal.tsx
function hi({ open: e, onOpenChange: t, title: n, description: r, action: i, art: a, dismissible: o = !0, closeOnOutsideClick: s = !0, closeOnEscape: c = !0, className: l }) {
	return /* @__PURE__ */ F(Ae.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ F(di, {
			open: e,
			overlayClassName: mi.overlay,
			className: [mi.content, l].filter(Boolean).join(" "),
			onPointerDownOutside: (e) => {
				s || e.preventDefault();
			},
			onEscapeKeyDown: (e) => {
				c || e.preventDefault();
			},
			onOpenAutoFocus: (e) => {
				o || (e.preventDefault(), e.currentTarget?.focus());
			},
			...r ? {} : { "aria-describedby": void 0 },
			children: /* @__PURE__ */ I("div", {
				className: mi.surface,
				children: [
					o && /* @__PURE__ */ F(Ae.Close, {
						asChild: !0,
						children: /* @__PURE__ */ F(Ur, {
							type: "ghost",
							size: "small",
							shape: "round",
							icon: /* @__PURE__ */ F(ne, {}),
							"aria-label": "Close",
							className: mi.close
						})
					}),
					/* @__PURE__ */ I("div", {
						className: mi.copy,
						children: [
							/* @__PURE__ */ F(Ae.Title, {
								asChild: !0,
								children: /* @__PURE__ */ F("h2", {
									className: mi.title,
									children: n
								})
							}),
							r && /* @__PURE__ */ F(Ae.Description, {
								asChild: !0,
								children: /* @__PURE__ */ F("p", {
									className: mi.description,
									children: r
								})
							}),
							i && /* @__PURE__ */ F("div", {
								className: mi.action,
								children: i
							})
						]
					}),
					/* @__PURE__ */ F("div", {
						className: mi.art,
						children: a
					})
				]
			})
		})
	});
}
var gi = {
	controls: "_controls_zrfzm_2",
	button: "_button_zrfzm_15",
	separator: "_separator_zrfzm_47"
};
//#endregion
//#region src/components/PanelControls/PanelControls.tsx
function _i({ expanded: e = !1, onExpand: t, onClose: n, expandLabel: r = "Expand", collapseLabel: i = "Narrower", closeLabel: a = "Close", className: o }) {
	return !t && !n ? null : /* @__PURE__ */ I("span", {
		className: [gi.controls, o].filter(Boolean).join(" "),
		children: [
			t && /* @__PURE__ */ F("button", {
				type: "button",
				className: gi.button,
				"aria-label": e ? i : r,
				"aria-pressed": e,
				onClick: t,
				children: F(e ? s : c, { "aria-hidden": !0 })
			}),
			t && n && /* @__PURE__ */ F("span", {
				className: gi.separator,
				"aria-hidden": "true"
			}),
			n && /* @__PURE__ */ F("button", {
				type: "button",
				className: gi.button,
				"aria-label": a,
				onClick: n,
				children: /* @__PURE__ */ F(ne, { "aria-hidden": !0 })
			})
		]
	});
}
var vi = {
	panel: "_panel_13kc0_3",
	wide: "_wide_13kc0_14",
	head: "_head_13kc0_18",
	hasMeta: "_hasMeta_13kc0_30",
	titles: "_titles_13kc0_35",
	title: "_title_13kc0_35",
	description: "_description_13kc0_53",
	controls: "_controls_13kc0_62",
	meta: "_meta_13kc0_74",
	body: "_body_13kc0_79",
	foot: "_foot_13kc0_86"
};
//#endregion
//#region src/components/Panel/Panel.tsx
function yi({ title: e, description: t, meta: n, controls: r, footer: i, wide: a = !1, onEscape: o, headingLevel: s = 2, children: c, className: l }) {
	let u = le(), d = o ? (e) => {
		e.key === "Escape" && !e.defaultPrevented && (e.stopPropagation(), o());
	} : void 0;
	return /* @__PURE__ */ I("section", {
		"aria-labelledby": u,
		className: [
			vi.panel,
			a && vi.wide,
			l
		].filter(Boolean).join(" "),
		onKeyDown: d,
		children: [
			/* @__PURE__ */ I("div", {
				className: [vi.head, n !== void 0 && vi.hasMeta].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ I("div", {
						className: vi.titles,
						children: [ae(`h${s}`, {
							id: u,
							className: vi.title
						}, e), t && /* @__PURE__ */ F("p", {
							className: vi.description,
							children: t
						})]
					}),
					r && /* @__PURE__ */ F("div", {
						className: vi.controls,
						children: r
					}),
					n !== void 0 && /* @__PURE__ */ F("div", {
						className: vi.meta,
						children: n
					})
				]
			}),
			/* @__PURE__ */ F("div", {
				className: vi.body,
				children: c
			}),
			i && /* @__PURE__ */ F("div", {
				className: vi.foot,
				children: i
			})
		]
	});
}
var bi = {
	split: "_split_12h5u_3",
	list: "_list_12h5u_10",
	open: "_open_12h5u_21",
	panel: "_panel_12h5u_27",
	"dock-in": "_dock-in_12h5u_1",
	swap: "_swap_12h5u_44",
	fade: "_fade_12h5u_56",
	"swap-in": "_swap-in_12h5u_1",
	expanded: "_expanded_12h5u_61"
};
//#endregion
//#region src/components/SplitView/SplitView.tsx
function xi({ list: e, panel: t, panelKey: n, expanded: r = !1, className: i }) {
	let a = t != null, o = H(null), s = H(null);
	V(() => {
		if (a) {
			o.current ||= document.activeElement;
			return;
		}
		let e = o.current;
		o.current = null;
		let t = document.activeElement;
		e && e.isConnected && (!t || t === document.body || s.current?.contains(t)) && e.focus();
	}, [a]);
	let c = H(null), l = H(null);
	a ? c.current ? c.current.key !== n && (c.current = { key: n }, l.current = { key: n }) : c.current = { key: n } : (c.current = null, l.current = null);
	let u = l.current !== null && l.current.key === n, d = a && r;
	return /* @__PURE__ */ I("div", {
		ref: s,
		className: [
			bi.split,
			a && bi.open,
			d && bi.expanded,
			i
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ F("div", {
			className: bi.list,
			inert: d || void 0,
			"aria-hidden": d || void 0,
			children: e
		}), a && /* @__PURE__ */ F("div", {
			className: bi.panel,
			children: /* @__PURE__ */ F("div", {
				className: [bi.swap, u && bi.fade].filter(Boolean).join(" "),
				children: t
			}, n)
		})]
	});
}
var Si = {
	overlay: "_overlay_13ena_3",
	"fade-in": "_fade-in_13ena_1",
	content: "_content_13ena_12",
	"slide-in": "_slide-in_13ena_1",
	wide: "_wide_13ena_33"
};
//#endregion
//#region src/components/Sheet/Sheet.tsx
function Ci({ open: e, onOpenChange: t, title: n, description: r, meta: i, footer: a, children: o, expandable: s = !0, expanded: c, onExpandedChange: l, dismissible: u = !0, closeOnOutsideClick: d = !0, closeOnEscape: f = !0, className: p }) {
	let [m, h] = U(!1), g = c ?? m, _ = (e) => {
		c === void 0 && h(e), l?.(e);
	};
	return /* @__PURE__ */ F(Ae.Root, {
		open: e,
		onOpenChange: (e) => {
			t(e), !e && c === void 0 && h(!1);
		},
		children: /* @__PURE__ */ I(Ae.Portal, { children: [/* @__PURE__ */ F(Ae.Overlay, { className: Si.overlay }), /* @__PURE__ */ F(Ae.Content, {
			className: [
				Si.content,
				g && Si.wide,
				p
			].filter(Boolean).join(" "),
			onPointerDownOutside: (e) => {
				(!d || !u) && e.preventDefault();
			},
			onEscapeKeyDown: (e) => {
				(!f || !u) && e.preventDefault();
			},
			onOpenAutoFocus: (e) => {
				e.preventDefault();
				let t = e.currentTarget;
				(t.querySelector("button[aria-label=\"Close\"]") ?? t).focus();
			},
			...r ? {} : { "aria-describedby": void 0 },
			children: /* @__PURE__ */ F(yi, {
				title: /* @__PURE__ */ F(Ae.Title, {
					asChild: !0,
					children: /* @__PURE__ */ F("span", { children: n })
				}),
				description: r && /* @__PURE__ */ F(Ae.Description, {
					asChild: !0,
					children: /* @__PURE__ */ F("span", { children: r })
				}),
				meta: i,
				footer: a,
				wide: g,
				controls: /* @__PURE__ */ F(_i, {
					expanded: g,
					onExpand: s ? () => _(!g) : void 0,
					onClose: u ? () => t(!1) : void 0
				}),
				children: o
			})
		})] })
	});
}
var wi = {
	highlight: "_highlight_1gng3_3",
	positive: "_positive_1gng3_14",
	neutral: "_neutral_1gng3_18",
	negative: "_negative_1gng3_22"
};
//#endregion
//#region src/components/Highlight/Highlight.tsx
function Ti({ tone: e = "default", className: t, ...n }) {
	return /* @__PURE__ */ F("mark", {
		className: [
			wi.highlight,
			e !== "default" && wi[e],
			t
		].filter(Boolean).join(" "),
		...n
	});
}
var Ei = {
	chip: "_chip_1xdwa_2",
	name: "_name_1xdwa_20",
	link: "_link_1xdwa_27"
};
//#endregion
//#region src/components/CitationChip/CitationChip.tsx
function Di({ name: e, logo: t, href: n, className: r }) {
	let i = [
		Ei.chip,
		n && Ei.link,
		r
	].filter(Boolean).join(" "), a = /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F(qe, {
		src: t,
		name: e,
		alt: "",
		size: 16
	}), /* @__PURE__ */ F("span", {
		className: Ei.name,
		children: e
	})] });
	return n ? /* @__PURE__ */ F("a", {
		className: i,
		href: n,
		target: "_blank",
		rel: "noreferrer",
		children: a
	}) : /* @__PURE__ */ F("span", {
		className: i,
		children: a
	});
}
var Oi = {
	card: "_card_ysjl8_2",
	head: "_head_ysjl8_11",
	engine: "_engine_ysjl8_19",
	date: "_date_ysjl8_33",
	chat: "_chat_ysjl8_43",
	prompt: "_prompt_ysjl8_55",
	reply: "_reply_ysjl8_65",
	fade: "_fade_ysjl8_77",
	before: "_before_ysjl8_89",
	after: "_after_ysjl8_94",
	mention: "_mention_ysjl8_99",
	cited: "_cited_ysjl8_103",
	citedLabel: "_citedLabel_ysjl8_111",
	flat: "_flat_ysjl8_121"
};
//#endregion
//#region src/components/AnswerCard/AnswerCard.tsx
function ki({ engine: e, engineLogo: t, date: n, named: r, prompt: i, before: a, children: o, after: s, citations: c = [], flat: l = !1, className: u }) {
	return /* @__PURE__ */ I("article", {
		className: [
			Oi.card,
			l && Oi.flat,
			u
		].filter(Boolean).join(" "),
		"aria-label": `${e}'s answer`,
		children: [
			/* @__PURE__ */ I("header", {
				className: Oi.head,
				children: [
					/* @__PURE__ */ F(qe, {
						src: t,
						name: e,
						alt: "",
						size: 20
					}),
					/* @__PURE__ */ F("span", {
						className: Oi.engine,
						children: e
					}),
					r !== void 0 && /* @__PURE__ */ F(mr, {
						size: "small",
						type: r ? "success" : "default",
						children: r ? "Names you" : "Doesn’t name you"
					}),
					/* @__PURE__ */ F("span", {
						className: Oi.date,
						children: n
					})
				]
			}),
			/* @__PURE__ */ I("div", {
				className: Oi.chat,
				children: [i && /* @__PURE__ */ F("p", {
					className: Oi.prompt,
					children: i
				}), /* @__PURE__ */ I("div", {
					className: Oi.reply,
					children: [
						a && /* @__PURE__ */ F("p", {
							className: [Oi.fade, Oi.before].join(" "),
							"aria-hidden": "true",
							children: a
						}),
						/* @__PURE__ */ F("p", {
							className: Oi.mention,
							children: o
						}),
						s && /* @__PURE__ */ F("p", {
							className: [Oi.fade, Oi.after].join(" "),
							"aria-hidden": "true",
							children: s
						})
					]
				})]
			}),
			c.length > 0 && /* @__PURE__ */ I("div", {
				className: Oi.cited,
				children: [/* @__PURE__ */ F("span", {
					className: Oi.citedLabel,
					children: "Cited"
				}), c.map((e) => /* @__PURE__ */ F(Di, { ...e }, e.name))]
			})
		]
	});
}
var Ai = {
	arrow: "_arrow_wwlx2_1",
	icon: "_icon_wwlx2_32",
	small: "_small_wwlx2_41",
	medium: "_medium_wwlx2_52",
	large: "_large_wwlx2_61"
}, ji = {
	first: /* @__PURE__ */ F(d, { weight: "bold" }),
	back: /* @__PURE__ */ F(m, { weight: "bold" }),
	next: /* @__PURE__ */ F(h, { weight: "bold" }),
	last: /* @__PURE__ */ F(f, { weight: "bold" })
}, Mi = {
	first: "First page",
	back: "Previous page",
	next: "Next page",
	last: "Last page"
};
function Ni({ type: e, size: t = "medium", className: n, disabled: r, ...i }) {
	let a = [
		Ai.arrow,
		Ai[t],
		n
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("button", {
		type: "button",
		className: a,
		disabled: r,
		"aria-label": Mi[e],
		...i,
		children: /* @__PURE__ */ F("span", {
			className: Ai.icon,
			children: ji[e]
		})
	});
}
var Pi = {
	pill: "_pill_7snyr_4",
	muted: "_muted_7snyr_28",
	value: "_value_7snyr_43",
	caretSlot: "_caretSlot_7snyr_52",
	caretClip: "_caretClip_7snyr_58",
	caret: "_caret_7snyr_52"
};
//#endregion
//#region src/components/PillMenu/PillMenu.tsx
function Fi({ "aria-label": e, value: t, muted: n, children: r, closeOnSelect: i = !0, open: a, onOpenChange: o }) {
	let [s, c] = U(!1);
	return /* @__PURE__ */ F(ut, {
		open: a ?? s,
		onOpenChange: (e) => {
			c(e), o?.(e);
		},
		align: "start",
		closeOnSelect: i,
		trigger: /* @__PURE__ */ I("button", {
			type: "button",
			"aria-label": e,
			"data-pill": "",
			className: [Pi.pill, n && Pi.muted].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ F("span", {
				className: Pi.value,
				children: t
			}), /* @__PURE__ */ F("span", {
				className: Pi.caretSlot,
				"aria-hidden": "true",
				children: /* @__PURE__ */ F("span", {
					className: Pi.caretClip,
					children: /* @__PURE__ */ F(p, {
						weight: "bold",
						className: Pi.caret
					})
				})
			})]
		}),
		children: r
	});
}
var Ii = {
	pager: "_pager_1kta8_4",
	dot: "_dot_1kta8_11",
	mark: "_mark_1kta8_23",
	current: "_current_1kta8_38",
	next: "_next_1kta8_56"
};
//#endregion
//#region src/components/Pager/Pager.tsx
function Li({ count: e, index: t, onChange: n, "aria-label": r = "Pages", className: i }) {
	return e < 2 ? null : /* @__PURE__ */ I("div", {
		role: "group",
		"aria-label": r,
		className: [Ii.pager, i].filter(Boolean).join(" "),
		children: [Array.from({ length: e }, (r, i) => /* @__PURE__ */ F("button", {
			type: "button",
			className: [Ii.dot, i === t && Ii.current].filter(Boolean).join(" "),
			"aria-label": `Show ${i + 1} of ${e}`,
			"aria-current": i === t ? "true" : void 0,
			onClick: () => n(i),
			children: /* @__PURE__ */ F("span", { className: Ii.mark })
		}, i)), /* @__PURE__ */ F(Ni, {
			type: "next",
			size: "small",
			className: Ii.next,
			"aria-label": "Show next",
			onClick: () => n((t + 1) % e)
		})]
	});
}
var Ri = {
	link: "_link_10a17_5",
	action: "_action_10a17_27",
	inline: "_inline_10a17_36",
	lead: "_lead_10a17_47",
	tail: "_tail_10a17_57",
	arrowSlot: "_arrowSlot_10a17_61",
	arrow: "_arrow_10a17_61",
	"text-link-arrow-through": "_text-link-arrow-through_10a17_1"
};
//#endregion
//#region src/components/TextLink/TextLink.tsx
function zi({ children: e, variant: t = "action", className: r, ...i }) {
	let a = [
		Ri.link,
		Ri[t],
		r
	].filter(Boolean).join(" "), o = e;
	if (t === "lead") {
		let t = typeof e == "string" ? e : null, r = t ? t.lastIndexOf(" ") + 1 : 0;
		o = /* @__PURE__ */ I(P, { children: [t ? t.slice(0, r) : e, /* @__PURE__ */ I("span", {
			className: Ri.tail,
			children: [t ? t.slice(r) : null, /* @__PURE__ */ F("span", {
				className: Ri.arrowSlot,
				"aria-hidden": "true",
				children: /* @__PURE__ */ F(n, { className: Ri.arrow })
			})]
		})] });
	}
	return "href" in i && i.href ? /* @__PURE__ */ F("a", {
		className: a,
		...i,
		children: o
	}) : /* @__PURE__ */ F("button", {
		type: "button",
		className: a,
		...i,
		children: o
	});
}
var Bi = {
	badge: "_badge_t5wto_2",
	glyph: "_glyph_t5wto_17",
	small: "_small_t5wto_22",
	inactive: "_inactive_t5wto_31",
	label: "_label_t5wto_45"
};
//#endregion
//#region src/components/GistAdminBadge/GistAdminBadge.tsx
function Vi({ form: e = "mark", state: t = "active", size: n = "medium", label: r = "Only Gist admins see this", tooltip: i = !0, className: a }) {
	let o = /* @__PURE__ */ F("span", {
		role: "img",
		"aria-label": r,
		tabIndex: i ? 0 : void 0,
		className: [
			Bi.badge,
			e === "label" ? Bi.label : n === "small" && Bi.small,
			t === "inactive" && Bi.inactive,
			a
		].filter(Boolean).join(" "),
		children: e === "label" ? /* @__PURE__ */ F("span", {
			"aria-hidden": "true",
			children: "GIST"
		}) : /* @__PURE__ */ F("svg", {
			className: Bi.glyph,
			viewBox: "0 0 11 14",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ F("path", {
				fill: "currentColor",
				d: "M4.9246 14C2.05367 14 0 11.1086 0 7.16805C0 3.22748 1.90735 0 5.67923 0C7.27284 0 8.57125 0.545048 10.101 1.42556L9.17827 3.31182C7.83706 2.5361 6.81022 2.0754 5.80383 2.0754C3.60256 2.0754 2.38722 4.33866 2.38722 7.10543C2.38722 9.87221 3.56102 11.9252 5.53099 11.9252C6.95655 11.9252 8.33994 9.65815 8.33994 7.50415H5.2147V5.80703H10.4569V13.7074H8.33994L9.12843 7.85495C9.12843 7.85495 9.63323 14 4.92332 14H4.9246Z"
			})
		})
	});
	return i ? /* @__PURE__ */ F(gt, {
		content: r,
		children: o
	}) : o;
}
var Hi = {
	trigger: "_trigger_1nh2p_8",
	label: "_label_1nh2p_47",
	divider: "_divider_1nh2p_59",
	value: "_value_1nh2p_66",
	caret: "_caret_1nh2p_79",
	accent: "_accent_1nh2p_86",
	large: "_large_1nh2p_103"
};
//#endregion
//#region src/components/ScopePicker/ScopePicker.tsx
function Ui({ label: e, items: t = [], value: n, onChange: r, tone: i = "default", size: a = "medium", valueLabel: o, children: s, open: c, onOpenChange: l, menuProps: u, className: d }) {
	let [f, m] = U(!1), h = c ?? f, _ = (e) => {
		c === void 0 && m(e), l?.(e);
	}, v = o ?? t.find((e) => e.value === n)?.label ?? "";
	return /* @__PURE__ */ F(ut, {
		open: h,
		onOpenChange: _,
		...u,
		trigger: /* @__PURE__ */ I("button", {
			type: "button",
			className: [
				Hi.trigger,
				i === "accent" && Hi.accent,
				a === "large" && Hi.large,
				d
			].filter(Boolean).join(" "),
			"aria-label": `${e}: ${v}`,
			children: [
				a === "medium" && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
					className: Hi.label,
					children: e
				}), /* @__PURE__ */ F("span", {
					className: Hi.divider,
					"aria-hidden": "true"
				})] }),
				/* @__PURE__ */ F("span", {
					className: Hi.value,
					children: v
				}),
				F(h ? g : p, {
					weight: a === "large" ? "regular" : "bold",
					className: Hi.caret,
					"aria-hidden": "true"
				})
			]
		}),
		children: s ?? t.map((e) => /* @__PURE__ */ F(Vr, {
			label: e.label,
			description: e.description,
			trailingIcon: e.value === n ? /* @__PURE__ */ F(y, { weight: "bold" }) : void 0,
			"aria-current": e.value === n || void 0,
			onClick: () => {
				r?.(e.value), _(!1);
			}
		}, e.value))
	});
}
var Wi = {
	picker: "_picker_er39v_5",
	menu: "_menu_er39v_14",
	find: "_find_er39v_26",
	list: "_list_er39v_30",
	group: "_group_er39v_31",
	rows: "_rows_er39v_42",
	nested: "_nested_er39v_52",
	back: "_back_er39v_57",
	groupLabel: "_groupLabel_er39v_62",
	empty: "_empty_er39v_75",
	add: "_add_er39v_85"
};
//#endregion
//#region src/components/PartnerPicker/PartnerPicker.tsx
function Gi({ partners: e, value: t, onChange: n, onAddPartner: r, onAddWebsite: i, label: a = "Partner", admin: o = !0, className: s }) {
	let [c, l] = U(!1), [u, d] = U({ kind: "partners" }), [f, p] = U(""), g = le(), _ = le(), v = e.find((e) => e.value === t.partner), b = v?.websites?.find((e) => e.value === t.website)?.label ?? v?.label ?? "All partners";
	function x(e) {
		e && (p(""), d(v?.websites?.length ? {
			kind: "websites",
			partner: v
		} : { kind: "partners" })), l(e);
	}
	function S(e) {
		n(e), l(!1);
	}
	let C = /* @__PURE__ */ F(y, { weight: "bold" }), w = f.trim().toLowerCase(), T;
	if (w) {
		let n = e.filter((e) => e.label.toLowerCase().includes(w)), r = e.flatMap((e) => (e.websites ?? []).filter((e) => e.label.toLowerCase().includes(w)).map((t) => ({
			partner: e,
			website: t
		})));
		T = n.length || r.length ? /* @__PURE__ */ I(P, { children: [n.length > 0 && /* @__PURE__ */ I("div", {
			role: "group",
			"aria-labelledby": g,
			className: Wi.group,
			children: [
				/* @__PURE__ */ F("div", {
					id: g,
					className: Wi.groupLabel,
					children: "Partners"
				}),
				/* @__PURE__ */ F(Fr, {}),
				/* @__PURE__ */ F("div", {
					className: Wi.rows,
					children: n.map((e) => /* @__PURE__ */ F(Vr, {
						label: e.label,
						className: Wi.nested,
						selected: t.partner === e.value && !t.website,
						trailingIcon: t.partner === e.value && !t.website ? C : void 0,
						onClick: () => S({ partner: e.value })
					}, e.value))
				})
			]
		}), r.length > 0 && /* @__PURE__ */ I("div", {
			role: "group",
			"aria-labelledby": _,
			className: Wi.group,
			children: [
				/* @__PURE__ */ F("div", {
					id: _,
					className: Wi.groupLabel,
					children: "Websites"
				}),
				/* @__PURE__ */ F(Fr, {}),
				/* @__PURE__ */ F("div", {
					className: Wi.rows,
					children: r.map(({ partner: e, website: n }) => /* @__PURE__ */ F(Vr, {
						label: n.label,
						description: e.label,
						className: Wi.nested,
						selected: t.website === n.value,
						trailingIcon: t.website === n.value ? C : void 0,
						onClick: () => S({
							partner: e.value,
							website: n.value
						})
					}, `${e.value}/${n.value}`))
				})
			]
		})] }) : /* @__PURE__ */ I("p", {
			className: Wi.empty,
			children: [
				"No partners or websites match “",
				f.trim(),
				"”"
			]
		});
	} else if (u.kind === "websites") {
		let e = u.partner, n = t.partner === e.value && !t.website;
		T = /* @__PURE__ */ I(P, { children: [
			/* @__PURE__ */ F(Vr, {
				label: "All partners",
				"aria-label": "Back to all partners",
				className: Wi.back,
				leadingIcon: /* @__PURE__ */ F(m, { weight: "bold" }),
				onClick: () => d({ kind: "partners" })
			}),
			/* @__PURE__ */ F(Vr, {
				label: `${e.label} (All websites)`,
				className: Wi.nested,
				selected: n,
				trailingIcon: n ? C : void 0,
				onClick: () => S({ partner: e.value })
			}),
			/* @__PURE__ */ F(Fr, {}),
			/* @__PURE__ */ F("div", {
				className: Wi.rows,
				children: (e.websites ?? []).map((n) => /* @__PURE__ */ F(Vr, {
					label: n.label,
					className: Wi.nested,
					selected: t.website === n.value,
					trailingIcon: t.website === n.value ? C : void 0,
					onClick: () => S({
						partner: e.value,
						website: n.value
					})
				}, n.value))
			})
		] });
	} else {
		let n = !t.partner;
		T = /* @__PURE__ */ I(P, { children: [
			/* @__PURE__ */ F(Vr, {
				label: "All partners",
				selected: n,
				trailingIcon: n ? C : void 0,
				onClick: () => S({})
			}),
			/* @__PURE__ */ F(Fr, {}),
			/* @__PURE__ */ F("div", {
				className: Wi.rows,
				children: e.map((e) => e.websites?.length ? /* @__PURE__ */ F(Vr, {
					label: e.label,
					"aria-haspopup": "menu",
					trailingIcon: /* @__PURE__ */ F(h, { weight: "bold" }),
					onClick: () => d({
						kind: "websites",
						partner: e
					})
				}, e.value) : /* @__PURE__ */ F(Vr, {
					label: e.label,
					selected: t.partner === e.value,
					trailingIcon: t.partner === e.value ? C : void 0,
					onClick: () => S({ partner: e.value })
				}, e.value))
			})
		] });
	}
	let E = w || u.kind === "websites" ? i && {
		text: "Add website",
		run: () => i(u.kind === "websites" ? u.partner.value : void 0)
	} : r && {
		text: "Add partner",
		run: r
	};
	return /* @__PURE__ */ I("div", {
		className: [Wi.picker, s].filter(Boolean).join(" "),
		children: [o && /* @__PURE__ */ F(Vi, { form: "label" }), /* @__PURE__ */ I(Ui, {
			size: "large",
			label: a,
			valueLabel: b,
			open: c,
			onOpenChange: x,
			menuProps: {
				closeOnSelect: !1,
				menuClassName: Wi.menu
			},
			children: [
				/* @__PURE__ */ F(zr, {
					className: Wi.find,
					placeholder: "Type partner or website name",
					"aria-label": "Find a partner or website",
					value: f,
					onChange: (e) => p(e.target.value)
				}),
				/* @__PURE__ */ I("div", {
					className: Wi.list,
					children: [T, /* @__PURE__ */ F(Fr, {})]
				}),
				E && /* @__PURE__ */ F(it, {
					type: "tertiary",
					className: Wi.add,
					leadingIcon: /* @__PURE__ */ F(j, {}),
					onClick: E.run,
					children: E.text
				})
			]
		})]
	});
}
var Ki = {
	badge: "_badge_1e520_3",
	short: "_short_1e520_21",
	platinum: "_platinum_1e520_25",
	gold: "_gold_1e520_30",
	silver: "_silver_1e520_35"
}, qi = {
	platinum: "Platinum 1",
	gold: "Gold",
	silver: "Silver"
}, Ji = {
	platinum: "1",
	gold: "G",
	silver: "S"
};
function Yi({ tier: e, length: t = "full", className: n }) {
	let r = t === "short";
	return /* @__PURE__ */ F("span", {
		className: [
			Ki.badge,
			Ki[e],
			r && Ki.short,
			n
		].filter(Boolean).join(" "),
		"aria-label": r ? `${qi[e]} tier` : void 0,
		children: /* @__PURE__ */ F("span", {
			"aria-hidden": r || void 0,
			children: r ? Ji[e] : qi[e]
		})
	});
}
var Xi = {
	row: "_row_ktxkf_3",
	tile: "_tile_ktxkf_11",
	selected: "_selected_ktxkf_31",
	titleRow: "_titleRow_ktxkf_55",
	countRow: "_countRow_ktxkf_56",
	title: "_title_ktxkf_55",
	count: "_count_ktxkf_56"
};
//#endregion
//#region src/components/StatusTiles/StatusTiles.tsx
function Zi({ tiles: e, value: t, onChange: n, "aria-label": r, className: i }) {
	let a = H([]);
	function o(t, r) {
		let i = {
			ArrowRight: 1,
			ArrowDown: 1,
			ArrowLeft: -1,
			ArrowUp: -1
		}[t.key], o = t.key === "Home" ? 0 : t.key === "End" ? e.length - 1 : i ? (r + i + e.length) % e.length : null;
		o !== null && (t.preventDefault(), n(e[o].value), a.current[o]?.focus());
	}
	return /* @__PURE__ */ F("div", {
		role: "radiogroup",
		"aria-label": r,
		className: [Xi.row, i].filter(Boolean).join(" "),
		children: e.map((e, r) => {
			let i = e.value === t;
			return /* @__PURE__ */ I("button", {
				ref: (e) => {
					a.current[r] = e;
				},
				type: "button",
				role: "radio",
				"aria-checked": i,
				tabIndex: i ? 0 : -1,
				className: [Xi.tile, i && Xi.selected].filter(Boolean).join(" "),
				onClick: () => n(e.value),
				onKeyDown: (e) => o(e, r),
				children: [/* @__PURE__ */ I("span", {
					className: Xi.titleRow,
					children: [/* @__PURE__ */ F("span", {
						className: Xi.title,
						children: e.label
					}), e.admin && /* @__PURE__ */ F(Vi, {
						size: "small",
						tooltip: !1
					})]
				}), /* @__PURE__ */ I("span", {
					className: Xi.countRow,
					children: [/* @__PURE__ */ F("span", {
						className: Xi.count,
						children: typeof e.count == "number" ? e.count.toLocaleString("en-US") : e.count
					}), e.change && /* @__PURE__ */ F(mr, {
						type: "error",
						size: "small",
						children: e.change
					})]
				})]
			}, e.value);
		})
	});
}
var Qi = {
	list: "_list_17gvr_4",
	items: "_items_17gvr_5",
	row: "_row_17gvr_20",
	rank: "_rank_17gvr_33",
	name: "_name_17gvr_44",
	stat: "_stat_17gvr_59",
	lead: "_lead_17gvr_74",
	next: "_next_17gvr_75",
	missing: "_missing_17gvr_86"
};
//#endregion
//#region src/components/RankedList/RankedList.tsx
function $i({ tone: e, rank: t, name: n, logo: r, label: i, stat: a }) {
	return /* @__PURE__ */ I(P, { children: [
		/* @__PURE__ */ F("span", {
			className: Qi.rank,
			"aria-hidden": e === "missing" || void 0,
			children: t
		}),
		/* @__PURE__ */ F(qe, {
			src: r,
			name: n,
			alt: "",
			size: 24
		}),
		/* @__PURE__ */ F("span", {
			className: Qi.name,
			children: i
		}),
		/* @__PURE__ */ F("span", {
			className: Qi.stat,
			children: a
		})
	] });
}
function ea({ "aria-label": e, items: t, missing: n, className: r }) {
	return /* @__PURE__ */ I("div", {
		className: [Qi.list, r].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ F("ol", {
			className: Qi.items,
			"aria-label": e,
			children: t.map((e, t) => {
				let n = t === 0 ? "lead" : "next";
				return /* @__PURE__ */ F("li", {
					className: `${Qi.row} ${Qi[n]}`,
					children: /* @__PURE__ */ F($i, {
						tone: n,
						rank: String(t + 1),
						name: e.name,
						logo: e.logo,
						label: e.name,
						stat: e.stat
					})
				}, e.key ?? e.name);
			})
		}), n && /* @__PURE__ */ F("div", {
			className: `${Qi.row} ${Qi.missing}`,
			children: /* @__PURE__ */ F($i, {
				tone: "missing",
				rank: "–",
				name: n.name,
				logo: n.logo,
				label: n.label ?? "You",
				stat: n.stat
			})
		})]
	});
}
var ta = {
	results: "_results_owmzc_1",
	small: "_small_owmzc_12",
	medium: "_medium_owmzc_16",
	large: "_large_owmzc_20"
};
//#endregion
//#region src/components/PaginationDropdownResults/PaginationDropdownResults.tsx
function na({ size: e = "medium", className: t, children: n, ...r }) {
	let i = [
		ta.results,
		ta[e],
		t
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("div", {
		role: "listbox",
		className: i,
		...r,
		children: n
	});
}
var ra = {
	item: "_item_17oqo_1",
	check: "_check_17oqo_26",
	label: "_label_17oqo_32",
	small: "_small_17oqo_36",
	medium: "_medium_17oqo_41",
	large: "_large_17oqo_46"
};
//#endregion
//#region src/components/PaginationMenuItem/PaginationMenuItem.tsx
function ia({ size: e = "medium", selected: t = !1, className: n, children: r, ...i }) {
	let a = [
		ra.item,
		ra[e],
		n
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("button", {
		type: "button",
		role: "option",
		"aria-selected": t,
		className: a,
		...i,
		children: [/* @__PURE__ */ F(y, {
			weight: "bold",
			className: ra.check,
			style: { opacity: +!!t }
		}), /* @__PURE__ */ F("span", {
			className: ra.label,
			children: r
		})]
	});
}
var aa = {
	root: "_root_15d0g_1",
	results: "_results_15d0g_6",
	trigger: "_trigger_15d0g_13",
	active: "_active_15d0g_30",
	icon: "_icon_15d0g_39",
	small: "_small_15d0g_48",
	medium: "_medium_15d0g_60",
	large: "_large_15d0g_72"
};
//#endregion
//#region src/components/PaginationDropdown/PaginationDropdown.tsx
function oa({ size: e = "medium", options: t, value: n, onChange: r, className: i, ...a }) {
	let [o, s] = U(!1), c = H(null);
	B(() => {
		if (!o) return;
		function e(e) {
			c.current && !c.current.contains(e.target) && s(!1);
		}
		function t(e) {
			e.key === "Escape" && s(!1);
		}
		return document.addEventListener("pointerdown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", t);
		};
	}, [o]);
	let l = [
		aa.trigger,
		aa[e],
		o && aa.active
	].filter(Boolean).join(" "), u = [aa.root, i].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("div", {
		className: u,
		ref: c,
		children: [/* @__PURE__ */ I("button", {
			type: "button",
			className: l,
			"aria-haspopup": "listbox",
			"aria-expanded": o,
			onClick: () => s((e) => !e),
			...a,
			children: [/* @__PURE__ */ F("span", {
				className: aa.label,
				children: n
			}), /* @__PURE__ */ F("span", {
				className: aa.icon,
				children: F(o ? g : p, { weight: "bold" })
			})]
		}), o && /* @__PURE__ */ F(na, {
			size: e,
			className: aa.results,
			children: t.map((t) => /* @__PURE__ */ F(ia, {
				size: e,
				selected: t === n,
				onClick: () => {
					r(t), s(!1);
				},
				children: t
			}, t))
		})]
	});
}
var sa = {
	page: "_page_1ygh0_1",
	active: "_active_1ygh0_18",
	more: "_more_1ygh0_27",
	small: "_small_1ygh0_31",
	medium: "_medium_1ygh0_41",
	large: "_large_1ygh0_51"
};
//#endregion
//#region src/components/PaginationPage/PaginationPage.tsx
function ca({ size: e = "medium", active: t = !1, more: n = !1, className: r, children: i, ...a }) {
	let o = [
		sa.page,
		sa[e],
		t && sa.active,
		n && sa.more,
		r
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("button", {
		type: "button",
		className: o,
		"aria-current": t ? "page" : void 0,
		"aria-hidden": n || void 0,
		tabIndex: n ? -1 : void 0,
		...a,
		children: n ? /* @__PURE__ */ F(w, { weight: "bold" }) : i
	});
}
var la = {
	bar: "_bar_18cqx_4",
	leading: "_leading_18cqx_21",
	input: "_input_18cqx_27"
};
//#endregion
//#region src/components/InputBar/InputBar.tsx
function ua({ value: e, onValueChange: t, placeholder: n, action: r, onAction: i, leading: a, disabled: o, className: s, ...c }) {
	return /* @__PURE__ */ I("div", {
		className: [la.bar, s].filter(Boolean).join(" "),
		children: [
			a && /* @__PURE__ */ F("span", {
				className: la.leading,
				children: a
			}),
			/* @__PURE__ */ F("input", {
				"aria-label": c["aria-label"],
				value: e,
				placeholder: n,
				disabled: o,
				onChange: (e) => t(e.target.value),
				onKeyDown: (e) => e.key === "Enter" && !o && i(),
				className: la.input
			}),
			/* @__PURE__ */ F(it, {
				type: "primary",
				size: "medium",
				disabled: o,
				onClick: i,
				children: r
			})
		]
	});
}
var da = {
	root: "_root_1tydq_3",
	field: "_field_1tydq_14",
	clear: "_clear_1tydq_19"
};
//#endregion
//#region src/components/SearchInput/SearchInput.tsx
function fa({ value: e, onValueChange: t, size: n = "small", width: r, onClear: i, placeholder: a = "Search", "aria-label": o, className: s, onKeyDown: c, ...l }) {
	let u = H(null);
	function d() {
		t(""), i?.(), u.current?.querySelector("input")?.focus();
	}
	function f(t) {
		c?.(t), t.key === "Escape" && e && (t.stopPropagation(), t.preventDefault(), d());
	}
	return /* @__PURE__ */ F("span", {
		ref: u,
		className: [da.root, s].filter(Boolean).join(" "),
		style: r === void 0 ? void 0 : { width: r },
		children: /* @__PURE__ */ F(zr, {
			size: n,
			htmlType: "search",
			className: da.field,
			leadingIcon: /* @__PURE__ */ F(D, {}),
			trailingIcon: e ? /* @__PURE__ */ F("button", {
				type: "button",
				className: da.clear,
				"aria-label": "Clear search",
				tabIndex: -1,
				onClick: d,
				children: /* @__PURE__ */ F(ne, {})
			}) : void 0,
			placeholder: a,
			"aria-label": o ?? a,
			value: e,
			onChange: (e) => t(e.target.value),
			onKeyDown: f,
			...l
		})
	});
}
var pa = {
	stepper: "_stepper_1x7zi_2",
	steps: "_steps_1x7zi_7",
	step: "_step_1x7zi_2",
	circle: "_circle_1x7zi_49",
	tick: "_tick_1x7zi_66",
	current: "_current_1x7zi_71",
	done: "_done_1x7zi_85",
	count: "_count_1x7zi_91",
	compact: "_compact_1x7zi_101"
};
//#endregion
//#region src/components/Stepper/Stepper.tsx
function ma({ steps: e, current: t, reached: n = t, onStepChange: r, free: i = !1, compact: a = !1, className: o }) {
	let s = `Step ${t + 1} of ${e.length}`;
	return /* @__PURE__ */ I("div", {
		className: [
			pa.stepper,
			a && pa.compact,
			o
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ F("ol", {
			className: pa.steps,
			"aria-label": s,
			children: e.map((e, a) => {
				let o = a === t ? "current" : a <= n ? "done" : "ahead", s = !!r && a !== t && (i || a <= n);
				return /* @__PURE__ */ F("li", {
					className: pa[o],
					"aria-current": a === t ? "step" : void 0,
					children: /* @__PURE__ */ I("button", {
						type: "button",
						className: pa.step,
						disabled: !s,
						onClick: () => r?.(a),
						children: [/* @__PURE__ */ F("span", {
							className: pa.circle,
							"aria-hidden": "true",
							children: o === "done" ? /* @__PURE__ */ F(y, {
								weight: "bold",
								className: pa.tick
							}) : a + 1
						}), e]
					})
				}, a);
			})
		}), /* @__PURE__ */ F("span", {
			className: pa.count,
			children: s
		})]
	});
}
var ha = {
	bar: "_bar_ndkkd_4",
	inner: "_inner_ndkkd_12",
	start: "_start_ndkkd_22",
	steps: "_steps_ndkkd_27",
	end: "_end_ndkkd_33"
};
//#endregion
//#region src/components/FlowBar/FlowBar.tsx
function ga({ onBack: e, backLabel: n = "Back", onClose: r, closeLabel: i = "Close", steps: a, className: o }) {
	return /* @__PURE__ */ F("div", {
		className: [ha.bar, o].filter(Boolean).join(" "),
		children: /* @__PURE__ */ I("div", {
			className: ha.inner,
			children: [
				/* @__PURE__ */ F("div", {
					className: ha.start,
					children: e && /* @__PURE__ */ F(Ur, {
						type: "ghost",
						size: "small",
						shape: "square",
						icon: /* @__PURE__ */ F(t, {}),
						"aria-label": n,
						onClick: e
					})
				}),
				/* @__PURE__ */ F("div", {
					className: ha.steps,
					children: a
				}),
				/* @__PURE__ */ F("div", {
					className: ha.end,
					children: /* @__PURE__ */ F(Ur, {
						type: "ghost",
						size: "small",
						shape: "square",
						icon: /* @__PURE__ */ F(ne, {}),
						"aria-label": i,
						onClick: r
					})
				})
			]
		})
	});
}
var _a = {
	block: "_block_c98j1_5",
	hole: "_hole_c98j1_11",
	dim: "_dim_c98j1_1",
	centred: "_centred_c98j1_23",
	pulse: "_pulse_c98j1_1",
	card: "_card_c98j1_32",
	rise: "_rise_c98j1_1"
};
//#endregion
//#region src/components/Coachmark/Coachmark.tsx
function va({ open: e = !0, getTarget: t, padding: n = 6, placement: r = "right", width: i, label: a, onEscape: o, children: s, className: c }) {
	let [l, u] = U(null), d = H(null), [f, p] = U(180), m = !t, h = H(t);
	if (h.current = t, V(() => {
		if (!e) return;
		let t = 0, r = () => {
			let e = h.current?.() ?? null, i = e ? {
				x: e.x - n,
				y: e.y - n,
				w: e.width + n * 2,
				h: e.height + n * 2
			} : {
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				w: 0,
				h: 0
			};
			u((e) => e && e.x === i.x && e.y === i.y && e.w === i.w && e.h === i.h ? e : i), t = requestAnimationFrame(r);
		};
		return r(), () => cancelAnimationFrame(t);
	}, [e, n]), V(() => {
		d.current && p(d.current.offsetHeight);
	}), B(() => {
		if (!e || !o) return;
		let t = (e) => e.key === "Escape" && o();
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [e, o]), !e || !l || typeof document > "u") return null;
	let g = window.innerWidth, _ = window.innerHeight, v = Math.min(i ?? (m ? 420 : 340), g - 32), y = m ? {
		left: (g - v) / 2,
		top: Math.max(16, (_ - f) / 2)
	} : r === "bottom" ? {
		left: Math.max(16, Math.min(l.x, g - v - 16)),
		top: Math.min(l.y + l.h + 14, _ - f - 16)
	} : {
		left: Math.min(l.x + l.w + 18, g - v - 16),
		top: Math.max(16, Math.min(l.y + l.h / 2 - f / 2, _ - f - 16))
	};
	return De(/* @__PURE__ */ I("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": a,
		className: c,
		children: [
			/* @__PURE__ */ F("div", { className: _a.block }),
			/* @__PURE__ */ F("div", {
				"aria-hidden": !0,
				className: [_a.hole, m && _a.centred].filter(Boolean).join(" "),
				style: {
					top: l.y,
					left: l.x,
					width: l.w,
					height: l.h
				}
			}),
			/* @__PURE__ */ F("div", {
				ref: d,
				className: _a.card,
				style: {
					...y,
					width: v
				},
				children: /* @__PURE__ */ F(Zt, { children: s })
			})
		]
	}), document.body);
}
var ya = {
	dots: "_dots_i4eer_4",
	hidden: "_hidden_i4eer_14",
	dot: "_dot_i4eer_4",
	now: "_now_i4eer_37"
};
//#endregion
//#region src/components/StepDots/StepDots.tsx
function ba({ steps: e, current: t, className: n }) {
	let r = t !== void 0;
	return /* @__PURE__ */ F("ol", {
		"aria-label": r ? `Step ${t + 1} of ${e.length}: ${e[t]}` : void 0,
		"aria-hidden": !r || void 0,
		className: [
			ya.dots,
			!r && ya.hidden,
			n
		].filter(Boolean).join(" "),
		children: e.map((e, n) => /* @__PURE__ */ F("li", {
			"aria-current": n === t ? "step" : void 0,
			className: [ya.dot, n === t && ya.now].filter(Boolean).join(" ")
		}, e))
	});
}
var xa = {
	page: "_page_1mctm_4",
	narrow: "_narrow_1mctm_15",
	medium: "_medium_1mctm_19",
	wide: "_wide_1mctm_23",
	xwide: "_xwide_1mctm_27",
	head: "_head_1mctm_31",
	center: "_center_1mctm_38",
	title: "_title_1mctm_43",
	description: "_description_1mctm_55",
	back: "_back_1mctm_66",
	actions: "_actions_1mctm_78",
	actionsRow: "_actionsRow_1mctm_88",
	foot: "_foot_1mctm_95",
	footCenter: "_footCenter_1mctm_107"
};
//#endregion
//#region src/components/FocusPage/FocusPage.tsx
function Sa({ title: e, description: n, lead: r, children: i, actions: a, actionsLayout: o = "stack", foot: s, width: c = "narrow", center: l = !1, onBack: u, className: d }) {
	let f = H(null);
	return B(() => {
		f.current?.focus({ preventScroll: !0 });
	}, []), /* @__PURE__ */ I("div", {
		className: [
			xa.page,
			xa[c],
			d
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ I("div", {
				className: [xa.head, l && xa.center].filter(Boolean).join(" "),
				children: [
					u && /* @__PURE__ */ F("span", {
						className: xa.back,
						children: /* @__PURE__ */ F(Ur, {
							type: "ghost",
							size: "medium",
							icon: /* @__PURE__ */ F(t, {}),
							"aria-label": "Back",
							onClick: u
						})
					}),
					r,
					/* @__PURE__ */ F("h1", {
						ref: f,
						tabIndex: -1,
						className: xa.title,
						children: e
					}),
					n && /* @__PURE__ */ F("p", {
						className: xa.description,
						children: n
					})
				]
			}),
			i,
			a && /* @__PURE__ */ F("div", {
				className: o === "row" ? xa.actionsRow : xa.actions,
				children: a
			}),
			s && /* @__PURE__ */ F("div", {
				className: [xa.foot, l && xa.footCenter].filter(Boolean).join(" "),
				children: s
			})
		]
	});
}
var Ca = {
	page: "_page_yhxrq_5",
	bar: "_bar_yhxrq_15",
	body: "_body_yhxrq_21",
	step: "_step_yhxrq_27",
	column: "_column_yhxrq_33",
	heading: "_heading_yhxrq_41",
	title: "_title_yhxrq_47",
	description: "_description_yhxrq_57",
	actions: "_actions_yhxrq_68",
	preview: "_preview_yhxrq_75",
	previewInner: "_previewInner_yhxrq_83",
	withPreview: "_withPreview_yhxrq_98"
};
//#endregion
//#region src/components/FlowLayout/FlowLayout.tsx
function wa({ bar: e, title: t, description: n, children: r, actions: i, preview: a, className: o }) {
	return /* @__PURE__ */ I("div", {
		className: [Ca.page, o].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ F("div", {
			className: Ca.bar,
			children: e
		}), /* @__PURE__ */ I("div", {
			className: [Ca.body, a != null && Ca.withPreview].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ F("section", {
				className: Ca.step,
				children: /* @__PURE__ */ I("div", {
					className: Ca.column,
					children: [
						/* @__PURE__ */ I("div", {
							className: Ca.heading,
							children: [/* @__PURE__ */ F("h1", {
								className: Ca.title,
								children: t
							}), n && /* @__PURE__ */ F("p", {
								className: Ca.description,
								children: n
							})]
						}),
						r,
						i && /* @__PURE__ */ F("div", {
							className: Ca.actions,
							children: i
						})
					]
				})
			}), a != null && /* @__PURE__ */ F("aside", {
				className: Ca.preview,
				children: /* @__PURE__ */ F("div", {
					className: Ca.previewInner,
					children: a
				})
			})]
		})]
	});
}
var Ta = {
	indicator: "_indicator_88vq2_1",
	dot: "_dot_88vq2_12"
};
//#endregion
//#region src/components/RadioIndicator/RadioIndicator.tsx
function Ea({ checked: e = !1, className: t, ...n }) {
	let r = [Ta.indicator, t].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("span", {
		className: r,
		...n,
		children: e && /* @__PURE__ */ F("span", { className: Ta.dot })
	});
}
var Da = {
	radio: "_radio_fgwha_1",
	indicatorWrapper: "_indicatorWrapper_fgwha_13",
	input: "_input_fgwha_21"
};
//#endregion
//#region src/components/Radio/Radio.tsx
function Oa({ label: e, className: t, checked: n, ...r }) {
	let i = [Da.radio, t].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("label", {
		className: i,
		children: [/* @__PURE__ */ I("span", {
			className: Da.indicatorWrapper,
			children: [/* @__PURE__ */ F("input", {
				type: "radio",
				className: Da.input,
				checked: n,
				...r
			}), /* @__PURE__ */ F(Ea, { checked: n })]
		}), e]
	});
}
var ka = {
	card: "_card_i8180_1",
	metaRow: "_metaRow_i8180_6",
	priority: "_priority_i8180_12",
	scopeGroup: "_scopeGroup_i8180_21",
	scopeGroupPushed: "_scopeGroupPushed_i8180_28",
	contentType: "_contentType_i8180_32",
	categoryPill: "_categoryPill_i8180_38",
	dot: "_dot_i8180_52",
	body: "_body_i8180_59",
	title: "_title_i8180_65",
	description: "_description_i8180_74",
	footer: "_footer_i8180_82",
	quickActions: "_quickActions_i8180_89"
}, Aa = {
	"on-site": {
		label: "On your site",
		hue: 1
	},
	"third-party": {
		label: "Third-party",
		hue: 2
	},
	community: {
		label: "Community",
		hue: 6
	}
}, ja = [
	{
		value: "todo",
		label: "To do"
	},
	{
		value: "done",
		label: "Done"
	},
	{
		value: "declined",
		label: "Declined"
	}
];
function Ma({ priorityLabel: e, scope: t, contentType: n, title: r, description: i, status: a, onStatusChange: o, onView: s, onDecline: c, className: l }) {
	let u = Aa[t];
	return /* @__PURE__ */ I(Zt, {
		className: [ka.card, l].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ I("div", {
				className: ka.metaRow,
				children: [e && /* @__PURE__ */ I("div", {
					className: ka.priority,
					children: [/* @__PURE__ */ F(v, {
						weight: "bold",
						size: 16
					}), /* @__PURE__ */ F("span", { children: e })]
				}), /* @__PURE__ */ I("div", {
					className: [ka.scopeGroup, e ? ka.scopeGroupPushed : ""].filter(Boolean).join(" "),
					children: [/* @__PURE__ */ I("div", {
						className: ka.categoryPill,
						children: [/* @__PURE__ */ F("span", {
							className: ka.dot,
							style: { background: `var(--content-categorical-${u.hue})` }
						}), /* @__PURE__ */ F("span", { children: u.label })]
					}), n && /* @__PURE__ */ F("span", {
						className: ka.contentType,
						children: n
					})]
				})]
			}),
			/* @__PURE__ */ I("div", {
				className: ka.body,
				children: [/* @__PURE__ */ F("div", {
					className: ka.title,
					children: r
				}), /* @__PURE__ */ F("div", {
					className: ka.description,
					children: i
				})]
			}),
			/* @__PURE__ */ I("div", {
				className: ka.footer,
				children: [/* @__PURE__ */ I("div", {
					className: ka.quickActions,
					children: [/* @__PURE__ */ F(it, {
						type: "secondary",
						size: "small",
						onClick: s,
						children: "View"
					}), /* @__PURE__ */ F(it, {
						type: "ghost",
						size: "small",
						onClick: c,
						children: "Decline"
					})]
				}), /* @__PURE__ */ F(Kr, {
					options: ja,
					value: a,
					onChange: (e) => o?.(e),
					"aria-label": "Recommendation status"
				})]
			})
		]
	});
}
var Na = { row: "_row_u1z31_1" };
//#endregion
//#region src/components/Row/Row.tsx
function Pa({ className: e, children: t, ...n }) {
	let r = [Na.row, e].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("div", {
		role: "row",
		className: r,
		...n,
		children: t
	});
}
//#endregion
//#region src/internal/RailTooltip.tsx
function Fa({ label: e, enabled: t, children: n, ...r }) {
	let [i, a] = U(!1);
	return /* @__PURE__ */ F(gt, {
		content: e,
		side: "right",
		showArrow: !1,
		open: t && i,
		onOpenChange: a,
		...r,
		children: n
	});
}
var Ia = {
	sidebar: "_sidebar_1kpyh_29",
	collapsed: "_collapsed_1kpyh_39",
	inner: "_inner_1kpyh_24",
	bottomNav: "_bottomNav_1kpyh_24",
	footer: "_footer_1kpyh_24",
	header: "_header_1kpyh_75",
	banner: "_banner_1kpyh_83",
	surfacePage: "_surfacePage_1kpyh_91",
	headerContent: "_headerContent_1kpyh_114",
	actions: "_actions_1kpyh_146",
	iconButton: "_iconButton_1kpyh_162",
	iconSlot: "_iconSlot_1kpyh_204",
	navArea: "_navArea_1kpyh_220",
	footerRow: "_footerRow_1kpyh_247",
	footerMain: "_footerMain_1kpyh_259",
	bell: "_bell_1kpyh_272",
	unread: "_unread_1kpyh_314"
}, La = 240, Ra = 80;
function za({ header: e, banner: t, children: n, bottomNav: r, status: i, footer: a, collapsed: o = !1, onCollapseToggle: s, toggleTooltip: c = "default", surface: u = "raised", onNotificationsClick: d, unreadNotifications: f = 0, className: p }) {
	let m = Y(), h = m ? { duration: 0 } : {
		duration: .2,
		ease: "linear"
	}, [g, _] = q(), v = H(!0);
	B(() => {
		if (v.current) {
			v.current = !1;
			return;
		}
		m || _(g.current, { opacity: [0, 1] }, {
			duration: .2,
			ease: [
				.16,
				1,
				.3,
				1
			]
		});
	}, [
		o,
		m,
		_,
		g
	]);
	let y = f > 0 ? `Notifications, ${f} unread` : "Notifications", b = d && /* @__PURE__ */ F(Fa, {
		label: y,
		enabled: o,
		children: /* @__PURE__ */ I("button", {
			type: "button",
			className: Ia.bell,
			onClick: d,
			"aria-label": y,
			children: [/* @__PURE__ */ F(l, {
				weight: "bold",
				"aria-hidden": "true"
			}), f > 0 && /* @__PURE__ */ F("span", {
				className: Ia.unread,
				"aria-hidden": "true"
			})]
		})
	}, "bell"), x = o ? "Expand sidebar" : "Collapse sidebar", S = /* @__PURE__ */ F(Fa, {
		label: c === "short" ? o ? "Expand" : "Collapse" : x,
		enabled: o,
		children: /* @__PURE__ */ F("button", {
			type: "button",
			className: Ia.iconButton,
			onClick: s,
			"aria-label": x,
			children: /* @__PURE__ */ F("span", {
				className: Ia.iconSlot,
				children: /* @__PURE__ */ F(M, { weight: "bold" })
			})
		})
	});
	return /* @__PURE__ */ I(K.nav, {
		className: [
			Ia.sidebar,
			o && Ia.collapsed,
			u === "page" && Ia.surfacePage,
			p
		].filter(Boolean).join(" "),
		animate: { width: o ? Ra : La },
		transition: h,
		style: {
			"--sidebar-width-expanded": `${La}px`,
			"--sidebar-width-collapsed": `${Ra}px`
		},
		children: [
			/* @__PURE__ */ I("div", {
				className: Ia.inner,
				children: [
					/* @__PURE__ */ I("div", {
						className: Ia.header,
						children: [/* @__PURE__ */ F("div", {
							className: [Ia.headerContent, o && Ia.collapsed].filter(Boolean).join(" "),
							"aria-hidden": o || void 0,
							children: e
						}), /* @__PURE__ */ F("div", {
							ref: g,
							className: Ia.actions,
							children: S
						})]
					}),
					t && !o && /* @__PURE__ */ F("div", {
						className: Ia.banner,
						children: t
					}),
					/* @__PURE__ */ F("div", {
						className: Ia.navArea,
						children: n
					})
				]
			}),
			r && /* @__PURE__ */ I("div", {
				className: Ia.bottomNav,
				children: [/* @__PURE__ */ F(Fr, {}), r]
			}),
			/* @__PURE__ */ I("div", {
				className: Ia.footer,
				children: [i && !o && i, /* @__PURE__ */ F("div", {
					className: Ia.footerRow,
					children: o ? [b, /* @__PURE__ */ F("div", {
						className: Ia.footerMain,
						children: a
					}, "footer")] : [/* @__PURE__ */ F("div", {
						className: Ia.footerMain,
						children: a
					}, "footer"), b]
				})]
			})
		]
	});
}
var Ba = {
	card: "_card_bf072_1",
	action: "_action_bf072_18",
	header: "_header_bf072_47",
	title: "_title_bf072_54",
	count: "_count_bf072_73",
	dismissSpacer: "_dismissSpacer_bf072_86",
	dismiss: "_dismiss_bf072_12",
	dismissIcon: "_dismissIcon_bf072_120"
};
//#endregion
//#region src/components/SidebarActionItems/SidebarActionItems.tsx
function Va({ title: e = "Action items", completed: t, total: n, onClick: r, onDismiss: i, className: a }) {
	let o = /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ I("div", {
		className: Ba.header,
		children: [
			/* @__PURE__ */ F("span", {
				className: Ba.title,
				children: e
			}),
			/* @__PURE__ */ I("span", {
				className: Ba.count,
				children: [
					t,
					"/",
					n
				]
			}),
			i && /* @__PURE__ */ F("span", {
				className: Ba.dismissSpacer,
				"aria-hidden": "true"
			})
		]
	}), /* @__PURE__ */ F(Gt, {
		value: t,
		max: n,
		status: "success",
		"aria-label": `${t} of ${n} ${e.toLowerCase()} complete`
	})] });
	return /* @__PURE__ */ I("div", {
		className: [Ba.card, a].filter(Boolean).join(" "),
		children: [r ? /* @__PURE__ */ F("button", {
			type: "button",
			className: Ba.action,
			onClick: r,
			"aria-label": `${e}, ${t} of ${n} complete`,
			children: o
		}) : /* @__PURE__ */ F("div", {
			className: Ba.action,
			children: o
		}), i && /* @__PURE__ */ F("button", {
			type: "button",
			className: Ba.dismiss,
			"aria-label": `Dismiss ${e.toLowerCase()}`,
			onClick: i,
			children: /* @__PURE__ */ F(ne, {
				weight: "bold",
				className: Ba.dismissIcon
			})
		})]
	});
}
var Ha = { group: "_group_swupn_1" };
//#endregion
//#region src/components/TabToggleGroup/TabToggleGroup.tsx
function Ua({ children: e, size: t = "medium", className: n, ...r }) {
	let i = [Ha.group, n].filter(Boolean).join(" "), a = le(), o = L.map(e, (e) => z(e) ? ie(e, { size: t }) : e);
	return /* @__PURE__ */ F("div", {
		role: "tablist",
		className: i,
		...r,
		children: /* @__PURE__ */ F(pe, {
			id: a,
			children: o
		})
	});
}
var Wa = {
	tab: "_tab_1kkgk_1",
	thumb: "_thumb_1kkgk_26",
	content: "_content_1kkgk_36",
	selected: "_selected_1kkgk_44",
	icon: "_icon_1kkgk_65",
	iconOnly: "_iconOnly_1kkgk_78",
	small: "_small_1kkgk_88",
	medium: "_medium_1kkgk_103",
	large: "_large_1kkgk_118"
};
//#endregion
//#region src/components/TabToggle/TabToggle.tsx
function Ga({ children: e, icon: t, size: n = "medium", selected: r = !1, className: i, "aria-label": a, ...o }) {
	let s = Y(), c = [
		Wa.tab,
		Wa[n],
		!e && Wa.iconOnly,
		r && Wa.selected,
		i
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("button", {
		type: "button",
		role: "tab",
		"aria-selected": r,
		"aria-label": a,
		className: c,
		...o,
		children: [r && /* @__PURE__ */ F(K.span, {
			className: Wa.thumb,
			layoutId: "tab-toggle-thumb",
			"aria-hidden": "true",
			transition: {
				duration: s ? 0 : .25,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		}), /* @__PURE__ */ I("span", {
			className: Wa.content,
			children: [t && /* @__PURE__ */ F("span", {
				className: Wa.icon,
				children: t
			}), e]
		})]
	});
}
var Ka = {
	trigger: "_trigger_1eqrk_1",
	open: "_open_1eqrk_13",
	static: "_static_1eqrk_23",
	avatar: "_avatar_1eqrk_27",
	label: "_label_1eqrk_40",
	caret: "_caret_1eqrk_57",
	topSection: "_topSection_1eqrk_73",
	searchField: "_searchField_1eqrk_84",
	searchIcon: "_searchIcon_1eqrk_91",
	searchInput: "_searchInput_1eqrk_98",
	tabs: "_tabs_1eqrk_116",
	eyebrow: "_eyebrow_1eqrk_124",
	rule: "_rule_1eqrk_141",
	list: "_list_1eqrk_156",
	section: "_section_1eqrk_157",
	selectedIcon: "_selectedIcon_1eqrk_172",
	level: "_level_1eqrk_189",
	levelIn: "_levelIn_1eqrk_195",
	levelBack: "_levelBack_1eqrk_196",
	topRow: "_topRow_1eqrk_205",
	backBar: "_backBar_1eqrk_218",
	backIcon: "_backIcon_1eqrk_242"
};
//#endregion
//#region src/components/SidebarBrandSwitcher/SidebarBrandSwitcher.tsx
function qa(e, t) {
	return z(e) && e.type === qe ? ie(e, { size: t }) : e;
}
function Ja({ label: e, avatar: t, options: n, value: r, onChange: i, tabs: a, activeTabId: o, onTabChange: s, listEyebrow: c, searchable: l = !1, searchPlaceholder: u = "Search brands…", onAddNew: d, addNewLabel: f = "New brand", orgs: p, orgId: g, innerOrgId: v, onOrgChange: b, orgsLabel: x = "Your orgs", orgsBackLabel: S = "Other orgs", orgsSearchPlaceholder: C = "Search orgs…", className: w }) {
	let [T, E] = U(!1), [O, k] = U(""), A = !!p && p.length > 0, M = !A || !!v && g === v, [ee, te] = U(M ? "inner" : "orgs"), [N, ne] = U(null), L = H(null), re = H(!1);
	function ie(e) {
		re.current = !0, k(""), ne(e === "inner" ? "in" : "back"), te(e);
	}
	B(() => {
		re.current && (re.current = !1, L.current?.querySelector("button, [role=\"menuitem\"]")?.focus());
	}, [ee]);
	let R = H(null), [ae, oe] = U(!1);
	function z(e) {
		let t = R.current;
		oe(e && !!t && t.scrollWidth > t.clientWidth);
	}
	let se = M ? n?.find((e) => e.id === r) : void 0, [ce, le] = U(se);
	B(() => {
		se && le(se);
	}, [se]);
	let ue = se ?? (r && M ? ce : void 0);
	if ((!n || n.length === 0) && !A) return /* @__PURE__ */ F(gt, {
		content: e,
		side: "bottom",
		open: ae,
		onOpenChange: z,
		children: /* @__PURE__ */ I("div", {
			className: [
				Ka.trigger,
				Ka.static,
				w
			].filter(Boolean).join(" "),
			children: [t && /* @__PURE__ */ F("span", {
				className: Ka.avatar,
				children: qa(t, 24)
			}), /* @__PURE__ */ F("span", {
				ref: R,
				className: Ka.label,
				children: e
			})]
		})
	});
	let V = A && ee === "orgs", de = (V ? p : n) ?? [], W = O.trim() ? de.filter((e) => e.label.toLowerCase().includes(O.trim().toLowerCase())) : de, fe = A && !V ? /* @__PURE__ */ I("button", {
		type: "button",
		className: Ka.backBar,
		onClick: () => ie("orgs"),
		children: [/* @__PURE__ */ F(m, { className: Ka.backIcon }), S]
	}) : null, pe = l || !V && a && a.length > 0;
	function G(e) {
		E(e), e && (oe(!1), te(M ? "inner" : "orgs"), ne(null)), e || k("");
	}
	return /* @__PURE__ */ I(Te.Root, {
		open: T,
		onOpenChange: G,
		children: [/* @__PURE__ */ F(gt, {
			content: ue?.label ?? e,
			side: "bottom",
			open: ae && !T,
			onOpenChange: z,
			children: /* @__PURE__ */ F(Te.Trigger, {
				asChild: !0,
				children: /* @__PURE__ */ I("button", {
					type: "button",
					className: [
						Ka.trigger,
						T && Ka.open,
						w
					].filter(Boolean).join(" "),
					"aria-expanded": T,
					children: [
						(ue?.avatar ?? t) && /* @__PURE__ */ F("span", {
							className: Ka.avatar,
							children: qa(ue?.avatar ?? t, 24)
						}),
						/* @__PURE__ */ F("span", {
							ref: R,
							className: Ka.label,
							children: ue?.label ?? e
						}),
						/* @__PURE__ */ F(_, {
							weight: "bold",
							className: Ka.caret
						})
					]
				})
			})
		}), /* @__PURE__ */ F(at, {
			open: T,
			className: Ka.content,
			sideOffset: 4,
			align: "start",
			style: A ? {
				width: "max(var(--radix-popover-trigger-width), 248px)",
				maxWidth: 280
			} : {
				minWidth: "max(var(--radix-popover-trigger-width), 200px)",
				maxWidth: 280
			},
			onOpenAutoFocus: (e) => e.preventDefault(),
			onEscapeKeyDown: (e) => {
				N === "in" && ee === "inner" ? (e.preventDefault(), ie("orgs")) : N === "back" && ee === "orgs" && (e.preventDefault(), ie("inner"));
			},
			children: /* @__PURE__ */ F(ct, {
				style: {
					width: "100%",
					padding: fe ? "0 0 var(--spacing-padding-100)" : "var(--spacing-padding-100) 0",
					...fe ? { maxHeight: "none" } : {}
				},
				children: /* @__PURE__ */ I("div", {
					ref: L,
					className: [
						Ka.level,
						N === "in" && Ka.levelIn,
						N === "back" && Ka.levelBack
					].filter(Boolean).join(" "),
					children: [
						fe,
						pe && /* @__PURE__ */ I("div", {
							className: Ka.topSection,
							children: [l && /* @__PURE__ */ F("div", {
								className: Ka.topRow,
								children: /* @__PURE__ */ I("div", {
									className: Ka.searchField,
									children: [/* @__PURE__ */ F(D, {
										weight: "bold",
										className: Ka.searchIcon
									}), /* @__PURE__ */ F("input", {
										type: "text",
										className: Ka.searchInput,
										placeholder: V ? C : u,
										value: O,
										onChange: (e) => k(e.target.value)
									})]
								})
							}), !V && a && a.length > 0 && /* @__PURE__ */ F(Ua, {
								className: Ka.tabs,
								"aria-label": "Brand ownership",
								size: "small",
								children: a.map((e) => /* @__PURE__ */ F(Ga, {
									selected: e.id === o,
									onClick: () => s?.(e.id),
									children: e.label
								}, e.id))
							})]
						}),
						pe && /* @__PURE__ */ F("hr", { className: Ka.rule }),
						(V ? x : c) && /* @__PURE__ */ F("div", {
							className: Ka.eyebrow,
							children: V ? x : c
						}),
						/* @__PURE__ */ F("div", {
							className: Ka.list,
							children: W.map((e) => {
								let t = V && e.id === v, n = V ? e.id === g : e.id === r;
								return /* @__PURE__ */ F(Vr, {
									label: e.label,
									leadingIcon: qa(e.avatar, 16),
									wrap: !0,
									selected: t && n,
									trailingIcon: t ? /* @__PURE__ */ F(h, {
										weight: "bold",
										className: Ka.selectedIcon
									}) : n ? /* @__PURE__ */ F(y, {
										weight: "bold",
										className: Ka.selectedIcon
									}) : void 0,
									onClick: () => {
										if (t) return ie("inner");
										V ? b?.(e.id) : i?.(e.id), E(!1);
									}
								}, e.id);
							})
						}),
						d && !V && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("hr", { className: Ka.rule }), /* @__PURE__ */ F("div", {
							className: Ka.section,
							children: /* @__PURE__ */ F(Vr, {
								label: f,
								leadingIcon: /* @__PURE__ */ F(j, { weight: "bold" }),
								onClick: d
							})
						})] })
					]
				}, ee)
			})
		})]
	});
}
var Ya = {
	footer: "_footer_1yrei_15",
	collapsed: "_collapsed_1yrei_27",
	interactive: "_interactive_1yrei_39",
	active: "_active_1yrei_33",
	avatar: "_avatar_1yrei_65",
	badge: "_badge_1yrei_75",
	text: "_text_1yrei_7",
	name: "_name_1yrei_127",
	subtitle: "_subtitle_1yrei_139"
};
//#endregion
//#region src/components/SidebarFooter/SidebarFooter.tsx
function Xa({ avatar: e, name: t, subtitle: n, badge: r, collapsed: i = !1, active: a = !1, onClick: o, menu: s, className: c }) {
	let [l, u] = U(!1), d = !!(o || s), f = [
		Ya.footer,
		i && Ya.collapsed,
		d && Ya.interactive,
		d && (a || l) && Ya.active,
		c
	].filter(Boolean).join(" "), p = /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ I("span", {
		className: Ya.avatar,
		children: [e ?? /* @__PURE__ */ F(qe, {
			name: t,
			size: 36
		}), r && /* @__PURE__ */ F("span", {
			className: Ya.badge,
			children: r
		})]
	}), /* @__PURE__ */ I("span", {
		className: [Ya.text, i && Ya.collapsed].filter(Boolean).join(" "),
		"aria-hidden": i || void 0,
		children: [/* @__PURE__ */ F("span", {
			className: Ya.name,
			children: t
		}), n && /* @__PURE__ */ F("span", {
			className: Ya.subtitle,
			children: n
		})]
	})] });
	return s ? /* @__PURE__ */ F(ut, {
		side: "top",
		matchTriggerWidth: !i,
		open: l,
		onOpenChange: u,
		trigger: /* @__PURE__ */ F(Fa, {
			label: t,
			enabled: i,
			children: /* @__PURE__ */ F("button", {
				type: "button",
				className: f,
				onClick: o,
				"aria-label": i ? t : void 0,
				children: p
			})
		}),
		children: s
	}) : o ? /* @__PURE__ */ F(Fa, {
		label: t,
		enabled: i,
		children: /* @__PURE__ */ F("button", {
			type: "button",
			className: f,
			onClick: o,
			"aria-expanded": a,
			"aria-label": i ? t : void 0,
			children: p
		})
	}) : /* @__PURE__ */ F("div", {
		className: f,
		children: p
	});
}
var Za = {
	row: "_row_52v8h_6",
	main: "_main_52v8h_28",
	icon: "_icon_52v8h_50",
	label: "_label_52v8h_65",
	warning: "_warning_52v8h_73",
	error: "_error_52v8h_78",
	action: "_action_52v8h_85"
};
//#endregion
//#region src/components/SidebarStatusRow/SidebarStatusRow.tsx
function Qa({ icon: e, label: t, tone: n = "default", onClick: r, "aria-label": i, action: a, className: o }) {
	let s = /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
		className: Za.icon,
		"aria-hidden": "true",
		children: e
	}), /* @__PURE__ */ F("span", {
		className: Za.label,
		children: t
	})] });
	return /* @__PURE__ */ I("div", {
		className: [
			Za.row,
			n !== "default" && Za[n],
			o
		].filter(Boolean).join(" "),
		children: [r ? /* @__PURE__ */ F("button", {
			type: "button",
			className: Za.main,
			onClick: r,
			"aria-label": i,
			children: s
		}) : /* @__PURE__ */ F("span", {
			className: Za.main,
			children: s
		}), a && /* @__PURE__ */ F("button", {
			type: "button",
			className: Za.action,
			onClick: a.onClick,
			children: a.label
		})]
	});
}
var $a = {
	item: "_item_6ypyz_5",
	collapsed: "_collapsed_6ypyz_16",
	active: "_active_6ypyz_46",
	icon: "_icon_6ypyz_69",
	label: "_label_6ypyz_93",
	labelGroup: "_labelGroup_6ypyz_107",
	tag: "_tag_6ypyz_168"
};
//#endregion
//#region src/components/SidebarNavItem/SidebarNavItem.tsx
function eo({ label: e, icon: t, tag: n, active: r = !1, disabled: i = !1, collapsed: a = !1, onClick: o, className: s }) {
	let c = [
		$a.item,
		r && $a.active,
		i && $a.disabled,
		a && $a.collapsed,
		s
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F(Fa, {
		label: e,
		enabled: a,
		children: /* @__PURE__ */ I("button", {
			type: "button",
			className: c,
			disabled: i,
			onClick: o,
			"aria-current": r ? "page" : void 0,
			"aria-label": a ? e : void 0,
			children: [t && /* @__PURE__ */ F("span", {
				className: $a.icon,
				children: t
			}), /* @__PURE__ */ I("span", {
				className: [$a.labelGroup, a && $a.collapsed].filter(Boolean).join(" "),
				"aria-hidden": a || void 0,
				children: [/* @__PURE__ */ F("span", {
					className: $a.label,
					children: e
				}), n && /* @__PURE__ */ F("span", {
					className: $a.tag,
					children: n
				})]
			})]
		})
	});
}
var to = {
	section: "_section_109i0_1",
	header: "_header_109i0_8",
	items: "_items_109i0_19"
}, no = {
	duration: .2,
	ease: [
		.16,
		1,
		.3,
		1
	]
};
function ro({ label: e, children: t, collapsed: n = !1, className: r }) {
	let i = Y() ? { duration: 0 } : no;
	return /* @__PURE__ */ I("div", {
		className: [to.section, r].filter(Boolean).join(" "),
		children: [e && /* @__PURE__ */ F(K.div, {
			className: to.header,
			animate: {
				opacity: +!n,
				height: n ? 0 : "auto"
			},
			transition: i,
			style: { overflow: "hidden" },
			"aria-hidden": n || void 0,
			children: e
		}), /* @__PURE__ */ F("div", {
			className: to.items,
			children: t
		})]
	});
}
var io = {
	overlay: "_overlay_1f1w3_8",
	content: "_content_1f1w3_12",
	surface: "_surface_1f1w3_21",
	nav: "_nav_1f1w3_35",
	pane: "_pane_1f1w3_46",
	close: "_close_1f1w3_57",
	sectionTitle: "_sectionTitle_1f1w3_64",
	srOnly: "_srOnly_1f1w3_110"
};
//#endregion
//#region src/components/SettingsModal/SettingsModal.tsx
function ao({ open: e, onOpenChange: t, groups: n, activeId: r, onActiveChange: i, children: a, sectionTitle: o, title: s = "Settings", dismissible: c = !0, closeOnOutsideClick: l = !0, closeOnEscape: u = !0, className: d }) {
	let f = H(null), p = n.flatMap((e) => e.items).find((e) => e.id === r)?.label;
	return B(() => {
		f.current && (f.current.scrollTop = 0);
	}, [r]), /* @__PURE__ */ F(Ae.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ F(di, {
			open: e,
			overlayClassName: io.overlay,
			className: [io.content, d].filter(Boolean).join(" "),
			onPointerDownOutside: (e) => {
				l || e.preventDefault();
			},
			onEscapeKeyDown: (e) => {
				u || e.preventDefault();
			},
			"aria-describedby": void 0,
			children: /* @__PURE__ */ I("div", {
				className: io.surface,
				children: [
					/* @__PURE__ */ F(Ae.Title, {
						className: io.srOnly,
						children: s
					}),
					c && /* @__PURE__ */ F(Ae.Close, {
						asChild: !0,
						children: /* @__PURE__ */ F(Ur, {
							className: io.close,
							type: "ghost",
							size: "small",
							shape: "round",
							icon: /* @__PURE__ */ F(ne, {}),
							"aria-label": "Close"
						})
					}),
					/* @__PURE__ */ F("nav", {
						className: io.nav,
						"aria-label": s,
						children: n.map((e, t) => /* @__PURE__ */ F(ro, {
							label: e.label,
							children: e.items.map((e) => /* @__PURE__ */ F(eo, {
								label: e.label,
								active: e.id === r,
								disabled: e.disabled,
								onClick: () => i(e.id)
							}, e.id))
						}, e.label ?? `group-${t}`))
					}),
					/* @__PURE__ */ I("div", {
						ref: f,
						className: io.pane,
						role: "region",
						"aria-label": o ?? p,
						children: [/* @__PURE__ */ F("h2", {
							className: io.sectionTitle,
							children: o ?? p
						}), a]
					})
				]
			})
		})
	});
}
var oo = {
	typing: "_typing_1npqg_4",
	sm: "_sm_1npqg_13",
	md: "_md_1npqg_18",
	lg: "_lg_1npqg_23",
	dot: "_dot_1npqg_28",
	rise: "_rise_1npqg_1",
	breathe: "_breathe_1npqg_1",
	srOnly: "_srOnly_1npqg_70"
};
//#endregion
//#region src/components/Typing/Typing.tsx
function so({ size: e = "md", label: t = "Loading", className: n }) {
	return /* @__PURE__ */ I("span", {
		className: [
			oo.typing,
			oo[e],
			n
		].filter(Boolean).join(" "),
		role: "status",
		children: [[
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ F("span", {
			className: oo.dot,
			style: { "--i": e },
			"aria-hidden": "true"
		}, e)), /* @__PURE__ */ F("span", {
			className: oo.srOnly,
			children: t
		})]
	});
}
var co = {
	text: "_text_1perh_3",
	blink: "_blink_1perh_13",
	dots: "_dots_1perh_28",
	dot: "_dot_1perh_28"
};
//#endregion
//#region src/components/LoadingText/LoadingText.tsx
function lo({ effect: e = "blink", children: t, className: n }) {
	let r = [
		co.text,
		co[e],
		n
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("span", {
		className: r,
		role: "status",
		children: [/* @__PURE__ */ F("span", { children: t }), e === "dots" && /* @__PURE__ */ F("span", {
			className: co.dots,
			"aria-hidden": "true",
			children: [
				0,
				1,
				2
			].map((e) => /* @__PURE__ */ F("span", {
				className: co.dot,
				style: { animationDelay: `${(e + 1) * .2}s` },
				children: "."
			}, e))
		})]
	});
}
var uo = {
	wrap: "_wrap_mdwac_1",
	row: "_row_mdwac_7",
	label: "_label_mdwac_13",
	value: "_value_mdwac_21",
	context: "_context_mdwac_30"
};
//#endregion
//#region src/components/StatDisplay/StatDisplay.tsx
function fo(e) {
	let { label: t, context: n, className: r } = e;
	return /* @__PURE__ */ I("div", {
		className: [uo.wrap, r].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ I("div", {
			className: uo.row,
			children: [t && /* @__PURE__ */ F("span", {
				className: uo.label,
				children: t
			}), e.form === "beforeAfter" ? /* @__PURE__ */ I("span", {
				className: uo.value,
				children: [
					e.before,
					" → ",
					e.after
				]
			}) : /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
				className: uo.value,
				children: e.value
			}), e.delta && /* @__PURE__ */ F(xn, {
				direction: e.delta.direction,
				value: e.delta.value
			})] })]
		}), n && /* @__PURE__ */ F("div", {
			className: uo.context,
			children: n
		})]
	});
}
var po = {
	chip: "_chip_bz101_4",
	leading: "_leading_bz101_34",
	label: "_label_bz101_48",
	swap: "_swap_bz101_55"
};
//#endregion
//#region src/components/SuggestionChip/SuggestionChip.tsx
function mo({ label: e, leading: t, onSelect: n, onSwap: r, showSwap: i = !0, disabled: o = !1, className: s }) {
	return /* @__PURE__ */ I("button", {
		type: "button",
		disabled: o,
		className: [po.chip, s].filter(Boolean).join(" "),
		onClick: n,
		children: [
			t && /* @__PURE__ */ F("span", {
				className: po.leading,
				children: t
			}),
			/* @__PURE__ */ F("span", {
				className: po.label,
				children: e
			}),
			i && /* @__PURE__ */ F("span", {
				role: "button",
				"aria-label": "Show a different suggestion",
				className: po.swap,
				onClick: (e) => {
					e.stopPropagation(), r?.();
				},
				children: /* @__PURE__ */ F(a, { weight: "regular" })
			})
		]
	});
}
var ho = {
	table: "_table_1feqb_1",
	quiet: "_quiet_1feqb_11"
};
//#endregion
//#region src/components/Table/Table.tsx
function go({ variant: e = "default", className: t, children: n, ...r }) {
	let i = [
		ho.table,
		e === "quiet" && ho.quiet,
		t
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ F("div", {
		role: "table",
		className: i,
		...r,
		children: n
	});
}
var _o = {
	bar: "_bar_1tjw0_1",
	bordered: "_bordered_1tjw0_9",
	hover: "_hover_1tjw0_15"
}, vo = [
	.16,
	1,
	.3,
	1
];
function yo({ className: e, children: t, bordered: n = !1, onPointerMove: r, onPointerLeave: i, ...a }) {
	let o = [
		_o.bar,
		n && _o.bordered,
		e
	].filter(Boolean).join(" "), s = le(), c = Y(), l = H(null), [u, d] = U(null), f = H(!1);
	function p(e) {
		r?.(e);
		let t = l.current, n = e.target.closest("[role=\"tab\"]"), i = n?.querySelector("[data-tab-chip]");
		if (!t || !n || !i || !t.contains(n)) return;
		let a = t.getBoundingClientRect(), o = i.getBoundingClientRect(), s = !n.disabled && n.getAttribute("aria-selected") !== "true", c = f.current;
		f.current = !0;
		let u = {
			x: o.left - a.left,
			y: o.top - a.top,
			width: o.width,
			height: o.height,
			shown: s,
			glide: c
		};
		d((e) => e && e.x === u.x && e.y === u.y && e.width === u.width && e.shown === u.shown && e.glide === u.glide ? e : u);
	}
	function m(e) {
		i?.(e), f.current = !1, d((e) => e && {
			...e,
			shown: !1
		});
	}
	let h = {
		duration: c ? 0 : .25,
		ease: vo
	}, g = {
		duration: c ? 0 : .15,
		ease: vo
	}, _ = u?.glide ? h : { duration: 0 };
	return /* @__PURE__ */ I("div", {
		ref: l,
		role: "tablist",
		className: o,
		"data-tab-glide": "",
		onPointerMove: p,
		onPointerLeave: m,
		...a,
		children: [/* @__PURE__ */ F(K.div, {
			className: _o.hover,
			"aria-hidden": !0,
			"data-tab-hover": "",
			initial: !1,
			animate: {
				x: u?.x ?? 0,
				y: u?.y ?? 0,
				width: u?.width ?? 0,
				height: u?.height ?? 0,
				opacity: +!!u?.shown
			},
			transition: {
				x: _,
				y: _,
				width: _,
				height: _,
				opacity: g
			}
		}), /* @__PURE__ */ F(pe, {
			id: s,
			children: t
		})]
	});
}
var bo = {
	tab: "_tab_rm4x6_1",
	underline: "_underline_rm4x6_28",
	chip: "_chip_rm4x6_37",
	selected: "_selected_rm4x6_52",
	icon: "_icon_rm4x6_70",
	badge: "_badge_rm4x6_84"
};
//#endregion
//#region src/components/TabItem/TabItem.tsx
function xo({ children: e, icon: t, badge: n, selected: r = !1, className: i, ...a }) {
	let o = Y(), s = [
		bo.tab,
		r && bo.selected,
		i
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ I("button", {
		type: "button",
		role: "tab",
		"aria-selected": r,
		className: s,
		...a,
		children: [/* @__PURE__ */ I("span", {
			className: bo.chip,
			"data-tab-chip": "",
			children: [
				t && /* @__PURE__ */ F("span", {
					className: bo.icon,
					children: t
				}),
				/* @__PURE__ */ F("span", {
					className: bo.label,
					children: e
				}),
				n !== void 0 && /* @__PURE__ */ F("span", {
					className: bo.badge,
					children: n
				})
			]
		}), r && /* @__PURE__ */ F(K.div, {
			className: bo.underline,
			layoutId: "tab-underline",
			transition: {
				duration: o ? 0 : .25,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		})]
	});
}
var So = {
	field: "_field_1c6fs_2",
	list: "_list_1c6fs_6",
	chip: "_chip_1c6fs_15",
	iconOnly: "_iconOnly_1c6fs_40",
	withText: "_withText_1c6fs_45",
	plus: "_plus_1c6fs_49"
}, Co = oe(function({ text: e, className: t, ...n }, r) {
	return /* @__PURE__ */ I("button", {
		ref: r,
		type: "button",
		"data-add-chip": "",
		className: [
			So.chip,
			e ? So.withText : So.iconOnly,
			t
		].filter(Boolean).join(" "),
		...n,
		children: [/* @__PURE__ */ F(j, {
			weight: "bold",
			className: So.plus,
			"aria-hidden": "true"
		}), e]
	});
});
function wo({ tags: e, counts: t, total: n, onToggle: r, onCreate: i, trigger: a, chipText: o, "aria-label": s = "Edit tags", open: c, onOpenChange: l }) {
	let [u, d] = U(!1), [f, p] = U(""), [m, h] = U([]), g = c ?? u, _ = (e) => t[e] ?? 0, v = (t) => {
		if (d(t), l?.(t), p(""), t) {
			let t = e.filter((e) => _(e) > 0).sort((e, t) => _(t) - _(e));
			h([...t, ...e.filter((e) => !t.includes(e))]);
		}
	}, y = f.trim(), b = y.toLowerCase(), x = [...m, ...e.filter((e) => !m.includes(e))], S = x.filter((e) => !b || e.toLowerCase().includes(b)), C = x.find((e) => e.toLowerCase() === b), w = (e) => r(e, _(e) < n), T = () => {
		y && (C ? w(C) : (h((e) => [...e, y]), i(y)), p(""));
	};
	return /* @__PURE__ */ I(ut, {
		open: g,
		onOpenChange: v,
		align: "start",
		closeOnSelect: !1,
		initialFocus: "menu",
		trigger: a ?? /* @__PURE__ */ F(Co, {
			text: o,
			"aria-label": s
		}),
		children: [/* @__PURE__ */ F("div", {
			className: So.field,
			children: /* @__PURE__ */ F(zr, {
				size: "small",
				leadingIcon: /* @__PURE__ */ F(D, {}),
				"aria-label": "Find or create a tag",
				placeholder: "Find or create",
				value: f,
				onChange: (e) => p(e.target.value),
				onKeyDown: (e) => {
					e.key === "Enter" && (e.preventDefault(), T());
				}
			})
		}), /* @__PURE__ */ I("div", {
			className: So.list,
			children: [S.map((e) => /* @__PURE__ */ F(Bn, {
				size: "small",
				label: e,
				checked: _(e) === n && n > 0,
				indeterminate: _(e) > 0 && _(e) < n,
				onCheckedChange: () => w(e)
			}, e)), y && !C && /* @__PURE__ */ F(Vr, {
				size: "small",
				label: `Create “${y}”`,
				leadingIcon: /* @__PURE__ */ F(j, {}),
				onClick: T
			})]
		})]
	});
}
var To = {
	chip: "_chip_u8m00_1",
	icon: "_icon_u8m00_21",
	hue1: "_hue1_u8m00_35",
	hue2: "_hue2_u8m00_41",
	hue3: "_hue3_u8m00_47",
	hue4: "_hue4_u8m00_53",
	hue5: "_hue5_u8m00_59",
	hue6: "_hue6_u8m00_65",
	pill: "_pill_u8m00_72",
	toggle: "_toggle_u8m00_78",
	off: "_off_u8m00_92"
};
//#endregion
//#region src/components/TopicChip/TopicChip.tsx
function Eo({ hue: e, leadingIcon: t, shape: n = "default", selected: r = !1, onToggle: i, className: a, children: o, ...s }) {
	let c = i !== void 0, l = !c || r, u = [
		To.chip,
		l ? To[`hue${e}`] : To.off,
		c && To.toggle,
		n === "pill" && To.pill,
		a
	].filter(Boolean).join(" "), d = /* @__PURE__ */ I(P, { children: [
		c && r && /* @__PURE__ */ F("span", {
			className: To.icon,
			"aria-hidden": "true",
			children: /* @__PURE__ */ F(y, { weight: "bold" })
		}),
		t && /* @__PURE__ */ F("span", {
			className: To.icon,
			"aria-hidden": "true",
			children: t
		}),
		o
	] });
	return c ? /* @__PURE__ */ F("button", {
		type: "button",
		className: u,
		"aria-pressed": r,
		onClick: () => i(!r),
		children: d
	}) : /* @__PURE__ */ F("span", {
		className: u,
		...s,
		children: d
	});
}
var Do = {
	card: "_card_zmumy_1",
	thumbnail: "_thumbnail_zmumy_14",
	placeholderIllustration: "_placeholderIllustration_zmumy_24",
	content: "_content_zmumy_30",
	header: "_header_zmumy_38",
	title: "_title_zmumy_46",
	menuButton: "_menuButton_zmumy_59"
}, Oo = /* @__PURE__ */ F("svg", {
	className: Do.placeholderIllustration,
	viewBox: "0 0 200 100",
	"aria-hidden": "true",
	children: [
		10,
		30,
		50,
		70,
		90
	].map((e) => /* @__PURE__ */ F("circle", {
		cx: "100",
		cy: "100",
		r: e,
		fill: "none",
		strokeWidth: "1"
	}, e))
});
function ko({ title: e, description: t, status: n, thumbnail: r, ctaLabel: i, onCtaClick: a, onMenuClick: o, className: s }) {
	return /* @__PURE__ */ I("div", {
		className: [Do.card, s].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ F("div", {
			className: Do.thumbnail,
			children: r ?? Oo
		}), /* @__PURE__ */ I("div", {
			className: Do.content,
			children: [
				/* @__PURE__ */ I("div", {
					className: Do.header,
					children: [/* @__PURE__ */ F("span", {
						className: Do.title,
						children: e
					}), o && /* @__PURE__ */ F("button", {
						type: "button",
						className: Do.menuButton,
						onClick: o,
						"aria-label": "More options",
						children: /* @__PURE__ */ F(w, { weight: "bold" })
					})]
				}),
				t && /* @__PURE__ */ F(mr, {
					size: "small",
					type: "default",
					children: t
				}),
				n && /* @__PURE__ */ F(mr, {
					size: "small",
					type: n.type ?? "default",
					children: n.label
				}),
				i && /* @__PURE__ */ F(it, {
					type: "primary",
					size: "small",
					onClick: a,
					children: i
				})
			]
		})]
	});
}
//#endregion
//#region src/arc/motion-tokens.ts
var Q = {
	duration: {
		instant: .12,
		fast: .16,
		exit: .18,
		standard: .24,
		considered: .48
	},
	ease: {
		enter: [
			.16,
			1,
			.3,
			1
		],
		exit: [
			.7,
			0,
			.84,
			0
		],
		standard: [
			.22,
			1,
			.36,
			1
		],
		inOut: [
			.65,
			0,
			.35,
			1
		]
	},
	spring: {
		responsive: {
			type: "spring",
			stiffness: 520,
			damping: 38
		},
		gentle: {
			type: "spring",
			stiffness: 340,
			damping: 34
		},
		snappy: {
			type: "spring",
			visualDuration: .26,
			bounce: .12
		},
		smooth: {
			type: "spring",
			visualDuration: .4,
			bounce: 0
		},
		morph: {
			type: "spring",
			visualDuration: .42,
			bounce: .16
		}
	},
	stagger: {
		char: .016,
		word: .04,
		line: .08,
		item: .035
	},
	blur: {
		subtle: 2,
		soft: 4,
		text: 8
	}
}, Ao = {
	figure: "_figure_fyxz7_3",
	legend: "_legend_fyxz7_6",
	toggle: "_toggle_fyxz7_7",
	toggleLabel: "_toggleLabel_fyxz7_10",
	swatch: "_swatch_fyxz7_12",
	chart: "_chart_fyxz7_19",
	plot: "_plot_fyxz7_20",
	svg: "_svg_fyxz7_21",
	grid: "_grid_fyxz7_22",
	baseline: "_baseline_fyxz7_23",
	crosshair: "_crosshair_fyxz7_24",
	series: "_series_fyxz7_27",
	breathe: "_breathe_fyxz7_1",
	line: "_line_fyxz7_29",
	area: "_area_fyxz7_31",
	dot: "_dot_fyxz7_32",
	tooltip: "_tooltip_fyxz7_36",
	tipTitle: "_tipTitle_fyxz7_38",
	tipRow: "_tipRow_fyxz7_39",
	tipSwatch: "_tipSwatch_fyxz7_40",
	tipName: "_tipName_fyxz7_42",
	tipValue: "_tipValue_fyxz7_43",
	message: "_message_fyxz7_45",
	skeleton: "_skeleton_fyxz7_47",
	gutter: "_gutter_fyxz7_49",
	tick: "_tick_fyxz7_50",
	tickText: "_tickText_fyxz7_51",
	axis: "_axis_fyxz7_53",
	axisLabel: "_axisLabel_fyxz7_54",
	srOnly: "_srOnly_fyxz7_56",
	areaStop: "_areaStop_fyxz7_73"
}, { spring: jo, duration: Mo, ease: No } = Q, Po = ({ visualDuration: e, bounce: t }, n = .001) => {
	let r = 2 * Math.PI / (e * 1.2);
	return {
		type: "spring",
		stiffness: r * r,
		damping: 2 * (1 - t) * r,
		restDelta: n,
		restSpeed: n * 2
	};
}, Fo = Po(jo.smooth), Io = Po(jo.snappy, 1e-4), Lo = {
	stiffness: Io.stiffness,
	damping: Io.damping,
	restDelta: .01
}, Ro = {
	duration: Mo.considered * 1.75,
	ease: [...No.inOut]
}, zo = {
	duration: Mo.instant,
	ease: [...No.standard]
}, Bo = 12, Vo = 14, Ho = [
	"var(--accent)",
	"color-mix(in oklab, var(--foreground) 46%, var(--surface))",
	"color-mix(in oklab, var(--foreground) 26%, var(--surface))"
], Uo = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }), Wo = new Intl.NumberFormat("en-US", {
	notation: "compact",
	maximumFractionDigits: 1
}), Go = (e, t, n) => Math.min(n, Math.max(t, e)), Ko = (e, t) => e.color ?? Ho[Math.min(t, Ho.length - 1)], qo = (e) => Number(e.toPrecision(12));
function Jo(e, t) {
	let n = Math.min(0, e), r = Math.max(t, n + 1), i = r - n, a = 10 ** Math.floor(Math.log10(i / 4));
	for (let e of [
		1,
		2,
		2.5,
		5,
		10
	]) {
		let t = e * a, i = Math.floor(n / t) * t, o = Math.ceil(r / t) * t;
		if ((o - i) / t <= 4 + 1e-9) {
			let e = [];
			for (let n = i; n <= o + t / 2; n += t) e.push(qo(n));
			return {
				min: qo(i),
				max: qo(o),
				ticks: e
			};
		}
	}
	return {
		min: n,
		max: r,
		ticks: [n, r]
	};
}
function Yo(e, t) {
	if (e.length === 0) return [];
	if (e.length === 1) return [[0, e[0]], [1, e[0]]];
	let n = e.length - 1, r = 1 / n;
	if (!t) return e.map((e, t) => [t * r, e]);
	let i = e.slice(1).map((t, n) => (t - e[n]) / r), a = e.map((e, t) => t === 0 || t === n ? 0 : (Math.sign(i[t - 1]) + Math.sign(i[t])) * Math.min(Math.abs(i[t - 1]), Math.abs(i[t]), Math.abs(i[t - 1] + i[t]) / 4) || 0);
	n > 1 ? (a[0] = (3 * i[0] - a[1]) / 2, a[n] = (3 * i[n - 1] - a[n - 1]) / 2) : (a[0] = i[0], a[1] = i[0]);
	let o = Math.max(1, Math.min(16, Math.round(192 / n))), s = [];
	for (let t = 0; t < n; t++) {
		let n = Math.min(e[t], e[t + 1]), i = Math.max(e[t], e[t + 1]);
		for (let c = 0; c < o; c++) {
			let l = c / o, u = l * l, d = u * l, f = (2 * d - 3 * u + 1) * e[t] + (d - 2 * u + l) * r * a[t] + (3 * u - 2 * d) * e[t + 1] + (d - u) * r * a[t + 1];
			s.push([(t + l) * r, Go(f, n, i)]);
		}
	}
	return s.push([1, e[n]]), s;
}
function Xo(e, t) {
	if (!e.length) return 0;
	let n = 0, r = e.length - 1;
	if (t <= e[n][0]) return e[n][1];
	if (t >= e[r][0]) return e[r][1];
	for (; r - n > 1;) {
		let i = n + r >> 1;
		e[i][0] < t ? n = i : r = i;
	}
	let [i, a] = e[n], [o, s] = e[r];
	return o === i ? s : a + (s - a) * (t - i) / (o - i);
}
var Zo = (e, t) => Object.assign(e, t), Qo = Array.from({ length: 241 }, (e, t) => t / 240), $o = () => () => {};
function es() {
	let e = W($o, () => !0, () => !1);
	return !!Y() && e;
}
function ts(e, t, n) {
	return Se(() => {
		let r = t.max.get() - t.min.get() || 1;
		return Math.round(Bo + (1 - (e - t.min.get()) / r) * (n - Bo)) + .5;
	});
}
function ns({ value: e, scale: t, height: n }) {
	let r = ts(e, t, n);
	return /* @__PURE__ */ F(K.line, {
		className: Ao.grid,
		x1: 0,
		x2: "100%",
		y1: r,
		y2: r,
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: zo
		},
		transition: {
			duration: Mo.standard,
			ease: [...No.standard]
		}
	});
}
function rs({ value: e, scale: t, height: n, format: r }) {
	let i = ts(e, t, n);
	return /* @__PURE__ */ F(K.span, {
		className: Ao.tick,
		style: { y: i },
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: zo
		},
		transition: {
			duration: Mo.standard,
			ease: [...No.standard]
		},
		children: /* @__PURE__ */ F("span", {
			className: Ao.tickText,
			children: r(e)
		})
	});
}
function is(e, t) {
	let n = e.flatMap((e, t) => e.axisLabel ? [t] : []);
	if (!t || !n.length) return [];
	let r = Math.max(2, Math.floor(t / 76)), i = Math.ceil(n.length / r);
	return n.reverse().filter((e, t) => t % i === 0).reverse();
}
function as({ data: e, series: t, label: n, unit: r = "", height: i = 220, formatValue: a, formatTick: o = (e) => Wo.format(e), hiddenSeries: s, defaultHiddenSeries: c, onHiddenSeriesChange: l, onActiveChange: u, loading: d = !1, emptyLabel: f = "No data for this range", legend: p, categoryLabel: m = "Date", curve: h = "smooth", valueAxis: g = "left", ref: _, className: v }) {
	let y = es(), b = H(null), x = H(null), S = H(null), C = H(null), w = H(null), T = H(/* @__PURE__ */ new Map()), E = H(/* @__PURE__ */ new Map()), D = H(/* @__PURE__ */ new Map()), O = H(/* @__PURE__ */ new Map());
	ue(_, () => b.current);
	let k = _e(b, {
		once: !0,
		amount: .3
	}), A = `line${le().replace(/[^a-zA-Z0-9_-]/g, "")}`, j = e.length - 1, M = e.length === 0, [ee, te] = U(c ?? []), N = s ?? ee, ne = (e) => {
		let t = N.includes(e) ? N.filter((t) => t !== e) : [...N, e];
		s === void 0 && te(t), l?.(t);
	}, P = t.filter((e) => !N.includes(e.key)), L = p ?? t.length > 1, re = `${h}|${t.map((e) => e.key).join(",")}|${e.map((e) => `${e.key}:${t.map((t) => e.values[t.key] ?? 0).join(",")}`).join(";")}`, ie = de(() => new Map(t.map((t) => [t.key, Yo(e.map((e) => e.values[t.key] ?? 0), h === "smooth")])), [re]), R = Infinity, ae = -Infinity;
	for (let t of P) for (let n of e) {
		let e = n.values[t.key] ?? 0;
		R = Math.min(R, e), ae = Math.max(ae, e);
	}
	let oe = Number.isFinite(R) ? Jo(R, ae) : null, [z, ce] = U(() => oe ?? Jo(0, 100));
	oe && (oe.min !== z.min || oe.max !== z.max) && ce(oe);
	let W = {
		min: J(z.min),
		max: J(z.max)
	}, [pe, me] = U(null), [he, ge] = U(re);
	he !== re && (ge(re), me(null));
	let q = pe === null || M ? null : Math.min(pe, j), ve = q !== null, be = H(0), [Y, Se] = U(0), Ce = H({
		w: 0,
		h: 0
	}), we = H(/* @__PURE__ */ new Map()), Te = J(0), Ee = J(1), De = J(0), Oe = J(0), ke = xe(De, Lo), Ae = xe(Oe, Lo), je = H({
		series: t,
		hidden: N
	});
	V(() => {
		je.current = {
			series: t,
			hidden: N
		};
	});
	let Me = se(() => {
		let e = be.current;
		if (!e) return;
		let t = W.min.get(), n = W.max.get() - t || 1, r = (e) => Bo + (1 - (e - t) / n) * (i - Bo), a = Ee.get(), o = [];
		for (let n of je.current.series) {
			let s = we.current.get(n.key);
			if (!s) continue;
			let c = s.presence, l = (e) => r(t + (e - t) * c), u = s.shape.length ? `M${s.shape.map(([t, n]) => `${(t * e).toFixed(1)},${l(n).toFixed(1)}`).join("L")}` : "";
			T.current.get(n.key)?.setAttribute("d", u), E.current.get(n.key)?.setAttribute("d", u ? `${u}L${e},${i}L0,${i}Z` : "");
			let d = O.current.get(n.key);
			d && (d.style.opacity = String(c));
			let f = D.current.get(n.key);
			if (f && s.shape.length) {
				let t = l(Xo(s.shape, a));
				f.setAttribute("cx", (a * e).toFixed(1)), f.setAttribute("cy", t.toFixed(1)), c > .5 && o.push(t);
			}
		}
		C.current?.setAttribute("width", String(Te.get() * (e + 16)));
		let s = Math.round(a * e) + .5;
		w.current?.setAttribute("x1", String(s)), w.current?.setAttribute("x2", String(s));
		let { w: c, h: l } = Ce.current, u = s + Vo;
		u + c > e && (u = s - Vo - c), De.set(Go(u, 0, Math.max(0, e - c)));
		let d = o.length ? o.reduce((e, t) => e + t, 0) / o.length : i / 2;
		Oe.set(Go(d - l / 2, 0, Math.max(0, i - l)));
	}, [
		Ee,
		Te,
		i,
		W.max,
		W.min,
		De,
		Oe
	]);
	ye(Ee, "change", Me), ye(Te, "change", Me), ye(W.min, "change", Me), ye(W.max, "change", Me), V(Me), V(() => {
		let e = x.current, t = S.current;
		if (!e) return;
		let n = () => {
			be.current = e.clientWidth, Se(e.clientWidth), t && (Ce.current = {
				w: t.offsetWidth,
				h: t.offsetHeight
			}), Me();
		};
		if (n(), typeof ResizeObserver > "u") return;
		let r = new ResizeObserver(n);
		return r.observe(e), t && r.observe(t), () => r.disconnect();
	}, [Me]);
	let Ne = H(null);
	B(() => {
		let e = [];
		for (let [t, n] of ie) {
			let r = we.current.get(t);
			if (!r) {
				we.current.set(t, {
					shape: n,
					presence: +!je.current.hidden.includes(t),
					fade: null
				});
				continue;
			}
			if (!r.shape.length || !n.length || y) {
				Zo(r, { shape: n });
				continue;
			}
			let i = [.../* @__PURE__ */ new Set([...Qo, ...n.map(([e]) => e)])].sort((e, t) => e - t);
			e.push({
				track: r,
				xs: i,
				from: i.map((e) => Xo(r.shape, e)),
				to: i.map((e) => Xo(n, e)),
				target: n
			});
		}
		if (Ne.current?.stop(), !e.length) {
			Me();
			return;
		}
		return Ne.current = G(0, 1, {
			...Fo,
			restDelta: 5e-4,
			onUpdate: (t) => {
				for (let n of e) Zo(n.track, { shape: n.xs.map((e, r) => [e, n.from[r] + (n.to[r] - n.from[r]) * t]) });
				Me();
			},
			onComplete: () => {
				for (let t of e) Zo(t.track, { shape: t.target });
				Me();
			}
		}), () => Ne.current?.stop();
	}, [
		Me,
		y,
		ie
	]);
	let Pe = N.join("|");
	B(() => {
		for (let [e, t] of we.current) {
			let n = +!N.includes(e);
			if (t.presence !== n) {
				if (t.fade?.stop(), y) {
					Zo(t, { presence: n });
					continue;
				}
				Zo(t, { fade: G(t.presence, n, {
					...Fo,
					onUpdate: (e) => {
						Zo(t, { presence: e }), Me();
					}
				}) });
			}
		}
		Me();
	}, [
		Pe,
		Me,
		y
	]), B(() => {
		if (y) {
			W.min.jump(z.min), W.max.jump(z.max);
			return;
		}
		let e = [G(W.min, z.min, Fo), G(W.max, z.max, Fo)];
		return () => e.forEach((e) => e.stop());
	}, [
		y,
		W.max,
		W.min,
		z
	]), B(() => {
		if (M) return;
		if (y) {
			Te.jump(1);
			return;
		}
		if (!k || Te.get() >= 1) return;
		let e = G(Te, 1, Ro);
		return () => e.stop();
	}, [
		Te,
		M,
		k,
		y
	]);
	let Fe = H(!1);
	B(() => {
		if (q === null) {
			Fe.current = !1;
			return;
		}
		let e = j > 0 ? q / j : .5;
		if ((y || !Fe.current) && (Ee.jump(e), ke.jump(De.get()), Ae.jump(Oe.get())), Fe.current = !0, y) return;
		let t = G(Ee, e, Io);
		return () => t.stop();
	}, [
		Ee,
		q,
		j,
		y,
		ke,
		Ae,
		De,
		Oe
	]);
	let Ie = H(u);
	V(() => {
		Ie.current = u;
	}), B(() => {
		Ie.current?.(q, q === null ? null : e[q] ?? null);
	}, [q]);
	let Le = (e) => {
		let t = x.current?.getBoundingClientRect();
		return !t?.width || j < 1 ? Math.max(0, j) : Go(Math.round((e - t.left) / t.width * j), 0, j);
	}, Re = (t) => {
		if (t.key === "Escape" && ve) {
			t.preventDefault(), me(null);
			return;
		}
		let n = q ?? j + 1, r = Math.max(1, Math.round(e.length / 6)), i = {
			ArrowLeft: n - 1,
			ArrowDown: n - 1,
			ArrowRight: q === null ? j : n + 1,
			ArrowUp: q === null ? j : n + 1,
			PageDown: n - r,
			PageUp: n + r,
			Home: 0,
			End: j
		}[t.key];
		i === void 0 || M || (t.preventDefault(), me(Go(i, 0, j)));
	}, ze = (e) => {
		M || (e.pointerType !== "mouse" && e.currentTarget.setPointerCapture?.(e.pointerId), me(Le(e.clientX)));
	}, Be = (e) => {
		!M && (e.pointerType === "mouse" || e.buttons) && me(Le(e.clientX));
	}, Ve = (e, t) => `${a ? a(e, t) : Uo.format(e)}${r ? ` ${r}` : ""}`, He = q === null ? null : e[q], Ue = He ? `${He.label}: ${P.map((e) => `${e.label} ${Ve(He.values[e.key] ?? 0, e)}`).join(", ")}` : M ? f : `${P.length} of ${t.length} series shown`, We = M ? `${n}. ${f}.` : `${n}, ${e[0].label} to ${e[j].label}. ${P.map((t) => `${t.label}, latest ${Ve(e[j].values[t.key] ?? 0, t)}`).join(". ")}.`, Ge = is(e, Y), Ke = !M && P.length === 0, qe = y ? De : ke, Je = y ? Oe : Ae;
	return /* @__PURE__ */ I("figure", {
		ref: b,
		className: [Ao.figure, v].filter(Boolean).join(" "),
		"aria-label": n,
		"aria-busy": d || void 0,
		children: [
			L && /* @__PURE__ */ F("div", {
				className: Ao.legend,
				role: "group",
				"aria-label": `${n} series`,
				children: t.map((e, t) => /* @__PURE__ */ I("button", {
					type: "button",
					className: Ao.toggle,
					"aria-pressed": !N.includes(e.key),
					onClick: () => ne(e.key),
					style: { "--series": Ko(e, t) },
					children: [/* @__PURE__ */ F("span", {
						className: Ao.swatch,
						"data-dashed": e.dashed || void 0,
						"aria-hidden": "true"
					}), /* @__PURE__ */ F("span", {
						className: Ao.toggleLabel,
						children: e.label
					})]
				}, e.key))
			}),
			/* @__PURE__ */ I("div", {
				className: Ao.chart,
				"data-value-axis": g,
				"data-scrubbing": ve || void 0,
				"data-loading": d || void 0,
				children: [
					/* @__PURE__ */ I("div", {
						ref: x,
						className: Ao.plot,
						style: { height: i },
						role: "slider",
						tabIndex: M ? -1 : 0,
						"aria-label": `${n}, explore by ${m.toLowerCase()}`,
						"aria-orientation": "horizontal",
						"aria-valuemin": 1,
						"aria-valuemax": Math.max(1, e.length),
						"aria-valuenow": (q ?? j) + 1,
						"aria-valuetext": Ue,
						onPointerDown: ze,
						onPointerMove: Be,
						onPointerUp: (e) => {
							e.pointerType !== "mouse" && me(null);
						},
						onPointerCancel: () => me(null),
						onPointerLeave: (e) => {
							e.pointerType === "mouse" && me(null);
						},
						onKeyDown: Re,
						onBlur: () => me(null),
						onFocus: (e) => {
							e.currentTarget.matches(":focus-visible") && !M && me((e) => e ?? j);
						},
						children: [
							/* @__PURE__ */ I("svg", {
								className: Ao.svg,
								width: "100%",
								height: i,
								"aria-hidden": "true",
								focusable: "false",
								children: [
									/* @__PURE__ */ I("defs", { children: [/* @__PURE__ */ F("clipPath", {
										id: `${A}-draw`,
										clipPathUnits: "userSpaceOnUse",
										children: /* @__PURE__ */ F("rect", {
											ref: C,
											x: -8,
											y: -16,
											width: 0,
											height: i + 32
										})
									}), t.map((e, t) => (e.area ?? t === 0) && /* @__PURE__ */ I("linearGradient", {
										id: `${A}-area-${t}`,
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										style: { "--series": Ko(e, t) },
										children: [/* @__PURE__ */ F("stop", {
											offset: "0%",
											className: Ao.areaStop,
											stopOpacity: .22
										}), /* @__PURE__ */ F("stop", {
											offset: "100%",
											className: Ao.areaStop,
											stopOpacity: 0
										})]
									}, e.key))] }),
									/* @__PURE__ */ F(fe, {
										initial: !1,
										children: z.ticks.slice(1).map((e) => /* @__PURE__ */ F(ns, {
											value: e,
											scale: W,
											height: i
										}, e))
									}),
									/* @__PURE__ */ F("line", {
										className: Ao.baseline,
										x1: 0,
										x2: "100%",
										y1: i - .5,
										y2: i - .5
									}),
									/* @__PURE__ */ F("line", {
										ref: w,
										className: Ao.crosshair,
										y1: 8,
										y2: i
									}),
									/* @__PURE__ */ F("g", {
										className: Ao.series,
										clipPath: `url(#${A}-draw)`,
										children: t.map((e, t) => /* @__PURE__ */ I("g", {
											ref: (t) => {
												t ? O.current.set(e.key, t) : O.current.delete(e.key);
											},
											style: { "--series": Ko(e, t) },
											children: [(e.area ?? t === 0) && /* @__PURE__ */ F("path", {
												ref: (t) => {
													t ? E.current.set(e.key, t) : E.current.delete(e.key);
												},
												className: Ao.area,
												style: { fill: `url(#${A}-area-${t})` }
											}), /* @__PURE__ */ F("path", {
												ref: (t) => {
													t ? T.current.set(e.key, t) : T.current.delete(e.key);
												},
												className: Ao.line,
												"data-dashed": e.dashed || void 0
											})]
										}, e.key))
									}),
									t.map((e, t) => /* @__PURE__ */ F("circle", {
										ref: (t) => {
											t ? D.current.set(e.key, t) : D.current.delete(e.key);
										},
										className: Ao.dot,
										r: 4,
										"data-hidden": N.includes(e.key) || void 0,
										style: { "--series": Ko(e, t) }
									}, e.key))
								]
							}),
							/* @__PURE__ */ I(K.div, {
								ref: S,
								className: Ao.tooltip,
								style: {
									x: qe,
									y: Je
								},
								"aria-hidden": "true",
								children: [/* @__PURE__ */ F("p", {
									className: Ao.tipTitle,
									children: (He ?? e[j])?.label ?? ""
								}), P.map((n) => /* @__PURE__ */ I("p", {
									className: Ao.tipRow,
									style: { "--series": Ko(n, t.indexOf(n)) },
									children: [
										/* @__PURE__ */ F("span", {
											className: Ao.tipSwatch,
											"data-dashed": n.dashed || void 0
										}),
										/* @__PURE__ */ F("span", {
											className: Ao.tipName,
											children: n.label
										}),
										/* @__PURE__ */ F("span", {
											className: Ao.tipValue,
											children: Ve((He ?? e[j])?.values[n.key] ?? 0, n)
										})
									]
								}, n.key))]
							}),
							/* @__PURE__ */ I(fe, {
								initial: !1,
								children: [(M || Ke) && !d && /* @__PURE__ */ F(K.p, {
									className: Ao.message,
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									exit: {
										opacity: 0,
										transition: zo
									},
									children: M ? f : "Choose a series to show"
								}, M ? "empty" : "hidden"), d && M && /* @__PURE__ */ F(K.span, {
									className: Ao.skeleton,
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									exit: {
										opacity: 0,
										transition: zo
									},
									"aria-hidden": "true"
								}, "skeleton")]
							})
						]
					}),
					/* @__PURE__ */ F("div", {
						className: Ao.gutter,
						"aria-hidden": "true",
						children: /* @__PURE__ */ F(fe, {
							initial: !1,
							children: z.ticks.map((e) => /* @__PURE__ */ F(rs, {
								value: e,
								scale: W,
								height: i,
								format: o
							}, e))
						})
					}),
					/* @__PURE__ */ F("div", {
						className: Ao.axis,
						"aria-hidden": "true",
						children: /* @__PURE__ */ F(fe, {
							initial: !1,
							children: Ge.map((t) => {
								let n = j > 0 ? t / j : .5;
								return /* @__PURE__ */ F(K.span, {
									className: Ao.axisLabel,
									style: {
										left: `${n * 100}%`,
										translateX: `${-n * 100}%`
									},
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									exit: {
										opacity: 0,
										transition: zo
									},
									transition: {
										duration: Mo.standard,
										ease: [...No.standard]
									},
									children: e[t].axisLabel
								}, `${e[t].key}:${e[t].axisLabel}`);
							})
						})
					})
				]
			}),
			/* @__PURE__ */ F("p", {
				className: Ao.srOnly,
				children: We
			}),
			!M && /* @__PURE__ */ F("div", {
				className: Ao.srOnly,
				children: /* @__PURE__ */ I("table", { children: [
					/* @__PURE__ */ F("caption", { children: n }),
					/* @__PURE__ */ F("thead", { children: /* @__PURE__ */ I("tr", { children: [/* @__PURE__ */ F("th", {
						scope: "col",
						children: m
					}), t.map((e) => /* @__PURE__ */ F("th", {
						scope: "col",
						children: e.label
					}, e.key))] }) }),
					/* @__PURE__ */ F("tbody", { children: e.map((e) => /* @__PURE__ */ I("tr", { children: [/* @__PURE__ */ F("th", {
						scope: "row",
						children: e.label
					}), t.map((t) => /* @__PURE__ */ F("td", { children: Ve(e.values[t.key] ?? 0, t) }, t.key))] }, e.key)) })
				] })
			}),
			/* @__PURE__ */ F("p", {
				className: Ao.srOnly,
				"aria-live": "polite",
				"aria-atomic": "true",
				children: d ? "Loading" : ""
			})
		]
	});
}
var os = {
	figure: "_figure_p4i5x_3",
	header: "_header_p4i5x_6",
	kind: "_kind_p4i5x_7",
	when: "_when_p4i5x_7",
	value: "_value_p4i5x_10",
	unit: "_unit_p4i5x_11",
	swap: "_swap_p4i5x_12",
	swapText: "_swapText_p4i5x_13",
	roll: "_roll_p4i5x_15",
	digits: "_digits_p4i5x_16",
	digit: "_digit_p4i5x_16",
	sizer: "_sizer_p4i5x_18",
	chart: "_chart_p4i5x_21",
	plot: "_plot_p4i5x_22",
	svg: "_svg_p4i5x_23",
	grid: "_grid_p4i5x_24",
	baseline: "_baseline_p4i5x_25",
	cursor: "_cursor_p4i5x_26",
	mean: "_mean_p4i5x_27",
	bar: "_bar_p4i5x_29",
	gutter: "_gutter_p4i5x_37",
	tick: "_tick_p4i5x_38",
	meanLabel: "_meanLabel_p4i5x_38",
	tickText: "_tickText_p4i5x_39",
	axis: "_axis_p4i5x_42",
	axisLabel: "_axisLabel_p4i5x_43",
	scrubber: "_scrubber_p4i5x_46",
	srOnly: "_srOnly_p4i5x_48",
	measure: "_measure_p4i5x_50"
}, { spring: ss, duration: cs, ease: ls, blur: us, stagger: ds } = Q, fs = ({ visualDuration: e, bounce: t }, n = .01) => {
	let r = 2 * Math.PI / (e * 1.2);
	return {
		type: "spring",
		stiffness: r * r,
		damping: 2 * (1 - t) * r,
		restDelta: n,
		restSpeed: n * 2
	};
}, ps = fs(ss.smooth), ms = fs(ss.morph), hs = fs(ss.snappy), gs = fs(ss.smooth, 1e-5), _s = fs({
	visualDuration: cs.standard,
	bounce: 0
}), vs = {
	duration: cs.instant,
	ease: [...ls.standard]
};
function ys(e) {
	let t = null, n = () => {
		t = e();
	};
	return he.update(n), () => {
		me(n), t?.stop();
	};
}
var bs = 12, xs = .58, Ss = 28, Cs = 4, ws = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }), Ts = (e, t, n) => Math.min(n, Math.max(t, e));
function Es(e) {
	let t = Math.max(e, 1), n = 10 ** Math.floor(Math.log10(t / 4));
	for (let e of [
		1,
		2,
		3,
		5,
		10
	]) {
		let r = e * n, i = Math.ceil(t / r);
		if (i <= 4) return {
			top: i * r,
			ticks: Array.from({ length: i + 1 }, (e, t) => t * r)
		};
	}
	return {
		top: t,
		ticks: [0, t]
	};
}
function Ds(e, t, n, r) {
	if (t <= 0 || n <= .01) return `M${e.toFixed(2)} ${r}H${(e + Math.max(t, 0)).toFixed(2)}Z`;
	let i = Math.min(Cs, t / 2, n), a = r - n, o = (e) => e.toFixed(2);
	return `M${o(e)} ${r}V${o(a + i)}A${o(i)} ${o(i)} 0 0 1 ${o(e + i)} ${o(a)}H${o(e + t - i)}A${o(i)} ${o(i)} 0 0 1 ${o(e + t)} ${o(a + i)}V${r}Z`;
}
function Os(e, t) {
	let n = J(e);
	return B(() => {
		if (n.get() !== e) {
			if (t) {
				n.jump(e);
				return;
			}
			return ys(() => G(n, e, ps));
		}
	}, [
		e,
		t,
		n
	]), n;
}
var ks = ({ width: e, unit: t }, n) => e.get() - (n + .5) * e.get() * t.get();
function As({ id: e, place: t, value: n, delay: r, shown: i, active: a, frame: o, scale: s, height: c, reduced: l }) {
	let [u, d] = be(), f = J(0), p = Os(t, l), [m] = U(r), h = H(!1), g = H(d);
	B(() => {
		g.current = d;
	}, [d]), B(() => {
		if (!u) return;
		if (l) {
			f.jump(n), h.current = !0;
			return;
		}
		if (!i) return;
		let e = !h.current;
		return h.current = !0, ys(() => G(f, n, e ? {
			...ms,
			delay: m
		} : ps));
	}, [
		f,
		m,
		u,
		l,
		i,
		n
	]), B(() => {
		if (!u) {
			if (l) {
				g.current?.();
				return;
			}
			return ys(() => G(f, 0, {
				..._s,
				onComplete: () => g.current?.()
			}));
		}
	}, [
		f,
		u,
		l
	]);
	let _ = Se(() => {
		let e = o.width.get() * o.unit.get(), t = Math.min(e * xs, Ss);
		return Ds(ks(o, p.get()) - t / 2, t, f.get() / s.get() * (c - bs), c);
	});
	return /* @__PURE__ */ F(K.path, {
		className: os.bar,
		"data-key": e,
		"data-active": a || void 0,
		d: _
	});
}
function js(e, t, n) {
	return Se(() => Math.round(n - e / t.get() * (n - bs)) + .5);
}
function Ms({ value: e, scale: t, height: n }) {
	let r = js(e, t, n);
	return e === 0 ? null : /* @__PURE__ */ F(K.line, {
		className: os.grid,
		x1: 0,
		x2: "100%",
		y1: r,
		y2: r,
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: vs
		},
		transition: {
			duration: cs.standard,
			ease: [...ls.standard]
		}
	});
}
function Ns({ value: e, scale: t, height: n, avoid: r, format: i }) {
	let a = js(e, t, n), o = Se(() => r ? Ts((Math.abs(a.get() - r.get()) - 10) / 6, 0, 1) : 1);
	return /* @__PURE__ */ F(K.span, {
		className: os.tick,
		style: { y: a },
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: vs
		},
		transition: {
			duration: cs.standard,
			ease: [...ls.standard]
		},
		children: /* @__PURE__ */ F(K.span, {
			className: os.tickText,
			style: { opacity: o },
			children: i(e)
		})
	});
}
function Ps({ text: e, size: t, shift: n, place: r, frame: i, reduced: a }) {
	let o = Os(r, a), s = Se(() => ks(i, o.get()) - t / 2 + n);
	return /* @__PURE__ */ F(K.span, {
		className: os.axisLabel,
		style: { x: s },
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: vs
		},
		transition: {
			duration: cs.standard,
			ease: [...ls.standard]
		},
		children: e
	});
}
function Fs(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	if (!t) return r;
	let i = Math.max(1, e.length), a = e.flatMap((r, a) => {
		let o = r.axisLabel ? n[r.axisLabel] : void 0;
		if (o === void 0) return [];
		let s = t - (e.length - 1 - a + .5) * (t / i) - o / 2;
		return [{
			key: r.key,
			size: o,
			natural: s,
			left: Ts(s, 0, Math.max(0, t - o))
		}];
	}).reverse();
	for (let e = 1; e <= a.length; e++) {
		let t = a.filter((t, n) => n % e === 0);
		if (e === a.length || t.every((e, n) => n === 0 || e.left + e.size + 10 <= t[n - 1].left)) {
			t.forEach((e) => r.set(e.key, e.left - e.natural));
			break;
		}
	}
	return r;
}
var Is = {
	hidden: (e) => ({
		opacity: 0,
		y: `${.3 * e}em`,
		filter: `blur(${us.soft}px)`
	}),
	shown: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: cs.standard,
			ease: [...ls.enter]
		}
	},
	gone: (e) => ({
		opacity: 0,
		y: `${-.3 * e}em`,
		filter: `blur(${us.subtle}px)`,
		transition: {
			duration: cs.instant,
			ease: [...ls.standard]
		}
	})
}, Ls = {
	hidden: {
		opacity: 0,
		y: 0,
		filter: "blur(0px)"
	},
	shown: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: cs.fast }
	},
	gone: {
		opacity: 0,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: cs.instant }
	}
};
function Rs({ text: e, direction: t, reduced: n }) {
	return /* @__PURE__ */ F("span", {
		className: os.swap,
		children: /* @__PURE__ */ F(fe, {
			mode: "popLayout",
			initial: !1,
			custom: t,
			children: /* @__PURE__ */ F(K.span, {
				className: os.swapText,
				custom: t,
				variants: n ? Ls : Is,
				initial: "hidden",
				animate: "shown",
				exit: "gone",
				children: e
			}, e)
		})
	});
}
function zs({ text: e, direction: t, reduced: n }) {
	let r = H(null), i = J("auto");
	V(() => {
		let e = r.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = null, a = new ResizeObserver(() => {
			let r = e.offsetWidth;
			t !== null && t !== e.textContent && !n ? G(i, r, ms) : i.jump(r), t = e.textContent;
		});
		return a.observe(e), () => a.disconnect();
	}, [n, i]);
	let a = [...e], o = n ? Ls : Is;
	return /* @__PURE__ */ I(K.span, {
		className: os.roll,
		style: { width: i },
		children: [/* @__PURE__ */ F("span", {
			ref: r,
			className: os.sizer,
			"aria-hidden": "true",
			children: e
		}), /* @__PURE__ */ F("span", {
			className: os.digits,
			children: /* @__PURE__ */ F(fe, {
				mode: "popLayout",
				initial: !1,
				custom: t,
				anchorX: "right",
				children: a.map((e, n) => /* @__PURE__ */ F(K.span, {
					className: os.digit,
					custom: t,
					variants: o,
					initial: "hidden",
					animate: "shown",
					exit: "gone",
					children: /* @__PURE__ */ F(fe, {
						mode: "popLayout",
						initial: !1,
						custom: t,
						anchorX: "right",
						children: /* @__PURE__ */ F(K.span, {
							className: os.digit,
							custom: t,
							variants: o,
							initial: "hidden",
							animate: "shown",
							exit: "gone",
							children: e
						}, e)
					})
				}, `p${a.length - n}`))
			})
		})]
	});
}
var Bs = () => () => {};
function Vs() {
	let e = W(Bs, () => !0, () => !1);
	return !!Y() && e;
}
function Hs({ data: e, label: t, period: n, unit: r = "", averageLabel: i = "Daily average", valueLabel: a = "Total", categoryLabel: o = "Day", showAverage: s = !0, height: c = 176, formatValue: l = (e) => ws.format(e) }) {
	let u = Vs(), d = H(null), f = H(null), p = _e(d, {
		once: !0,
		amount: .35
	}), m = le(), h = Math.max(e.length, 1), g = e.length - 1, _ = e.length ? e.reduce((e, t) => e + t.value, 0) / e.length : 0, v = e.reduce((e, t) => Math.max(e, t.value), 0), { top: y, ticks: b } = de(() => Es(v), [v]), x = e.map((e) => e.key).join("|"), S = r ? ` ${r}` : "", [C, w] = U(() => ({
		signature: x,
		keys: new Set(e.map((e) => e.key)),
		fresh: /* @__PURE__ */ new Map(),
		changes: 0
	})), [T, E] = U(null);
	if (C.signature !== x) {
		let t = e.map((e, t) => ({
			key: e.key,
			place: g - t
		})).filter((e) => !C.keys.has(e.key)).sort((e, t) => e.place - t.place), n = Math.min(ds.item, .32 / Math.max(1, t.length));
		w({
			signature: x,
			keys: new Set(e.map((e) => e.key)),
			fresh: new Map(t.map((e, t) => [e.key, t * n])),
			changes: C.changes + 1
		}), E(null);
	}
	let D = Math.min(ds.item, .36 / h), O = T === null ? null : Math.min(T, g), k = O !== null && g >= 0, A = k ? e[O].value : _, [j, M] = U({
		value: A,
		index: O,
		valueWay: 1,
		indexWay: 1
	});
	(j.value !== A || j.index !== O) && M({
		value: A,
		index: O,
		valueWay: A === j.value ? j.valueWay : A > j.value ? 1 : -1,
		indexWay: O === null || j.index === null ? 1 : Math.sign(O - j.index) || 1
	});
	let ee = J(0), te = J(1 / h), N = J(y), ne = J(0), P = J(0), L = de(() => ({
		width: ee,
		unit: te
	}), [ee, te]), [re, ie] = U(0), [R, ae] = U({}), oe = H(null), z = [...new Set(e.map((e) => e.axisLabel).filter((e) => !!e))].join("\n");
	V(() => {
		let e = f.current, t = oe.current;
		if (!e || !t) return;
		let n = () => {
			ee.set(e.clientWidth), ie(e.clientWidth);
			let n = {};
			t.querySelectorAll("[data-text]").forEach((e) => {
				n[e.dataset.text ?? ""] = e.offsetWidth;
			}), ae((e) => Object.keys(n).every((t) => e[t] === n[t]) ? e : n);
		};
		if (n(), typeof ResizeObserver > "u") return;
		let r = new ResizeObserver(n);
		return r.observe(e), r.observe(t), () => r.disconnect();
	}, [z, ee]);
	let se = de(() => Fs(e, re, R), [
		e,
		re,
		R
	]);
	B(() => {
		if (u) {
			te.jump(1 / h), N.jump(y);
			return;
		}
		return ys(() => {
			let e = [G(te, 1 / h, gs), G(N, y, ps)];
			return { stop: () => e.forEach((e) => e.stop()) };
		});
	}, [
		h,
		u,
		N,
		y,
		te
	]);
	let ce = H(!1);
	B(() => {
		if (u) {
			ne.jump(_);
			return;
		}
		if (!p) return;
		let e = !ce.current;
		return ce.current = !0, ys(() => G(ne, _, e ? {
			...ps,
			delay: .12
		} : ps));
	}, [
		_,
		p,
		ne,
		u
	]);
	let ue = H(!1);
	B(() => {
		if (O === null) {
			ue.current = !1;
			return;
		}
		let e = g - O;
		if ((u || !ue.current) && P.jump(e), ue.current = !0, u) return;
		let t = G(P, e, hs);
		return () => t.stop();
	}, [
		P,
		O,
		g,
		u
	]);
	let W = Se(() => Math.round(ks(L, P.get())) + .5), pe = Se(() => Math.round(c - ne.get() / N.get() * (c - bs)) + .5), me = Se(() => `Avg ${l(Math.round(ne.get()))}`), he = (e) => {
		let t = f.current?.getBoundingClientRect();
		if (!t?.width) return g;
		let n = Math.floor((t.right - e) / t.width * h);
		return Ts(g - n, 0, g);
	}, ge = (e) => {
		if (e.key === "Escape" && k) {
			e.preventDefault(), E(null);
			return;
		}
		let t = O ?? g + 1, n = Math.min(7, h), r = {
			ArrowLeft: t - 1,
			ArrowDown: t - 1,
			ArrowRight: O === null ? g : t + 1,
			ArrowUp: O === null ? g : t + 1,
			PageDown: t - n,
			PageUp: t + n,
			Home: 0,
			End: g
		}[e.key];
		r === void 0 || g < 0 || (e.preventDefault(), E(Ts(r, 0, g)));
	}, q = (e) => {
		e.pointerType !== "mouse" && e.currentTarget.setPointerCapture?.(e.pointerId), E(he(e.clientX));
	}, ve = (e) => {
		(e.pointerType === "mouse" || e.buttons) && E(he(e.clientX));
	}, ye = (e) => {
		e.pointerType !== "mouse" && E(null);
	}, be = k ? e[O] : null, Y = be ?? e[g], xe = Y ? `${Y.label}: ${l(Y.value)}${S}` : "No data", Ce = e.reduce((e, t) => !e || t.value > e.value ? t : e, null), we = e.reduce((e, t) => !e || t.value < e.value ? t : e, null), Te = `${t}, ${n}. ${i} ${l(Math.round(_))}${S}.${Ce ? ` Highest ${Ce.label}, ${l(Ce.value)}${S}.` : ""}${we && we !== Ce ? ` Lowest ${we.label}, ${l(we.value)}${S}.` : ""}`, Ee = p || u, De = s ? pe : null;
	return /* @__PURE__ */ I("figure", {
		ref: d,
		className: os.figure,
		"aria-labelledby": m,
		children: [
			/* @__PURE__ */ I("figcaption", {
				id: m,
				className: os.srOnly,
				children: [
					t,
					", ",
					n
				]
			}),
			/* @__PURE__ */ I("div", {
				className: os.header,
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ F("span", {
						className: os.kind,
						children: /* @__PURE__ */ F(Rs, {
							text: k ? a : i,
							direction: 1,
							reduced: u
						})
					}),
					/* @__PURE__ */ I("span", {
						className: os.value,
						children: [/* @__PURE__ */ F(zs, {
							text: l(k ? e[O].value : Math.round(_)),
							direction: j.valueWay,
							reduced: u
						}), r && /* @__PURE__ */ F("span", {
							className: os.unit,
							children: r
						})]
					}),
					/* @__PURE__ */ F("span", {
						className: os.when,
						children: /* @__PURE__ */ F(Rs, {
							text: be ? be.label : n,
							direction: k ? j.indexWay : 1,
							reduced: u
						})
					})
				]
			}),
			/* @__PURE__ */ I("div", {
				className: os.chart,
				"data-scrubbing": k || void 0,
				children: [
					/* @__PURE__ */ F("div", {
						ref: f,
						className: os.plot,
						style: { height: c },
						children: /* @__PURE__ */ I("svg", {
							className: os.svg,
							width: "100%",
							height: c,
							role: "img",
							"aria-label": Te,
							children: [
								/* @__PURE__ */ F(fe, {
									initial: !1,
									children: b.map((e) => /* @__PURE__ */ F(Ms, {
										value: e,
										scale: N,
										height: c
									}, e))
								}),
								/* @__PURE__ */ F(K.line, {
									className: os.cursor,
									x1: W,
									x2: W,
									y1: bs,
									y2: c,
									initial: !1,
									animate: { opacity: +!!k },
									transition: u ? { duration: 0 } : vs
								}),
								/* @__PURE__ */ F(fe, {
									initial: !1,
									children: e.map((e, t) => /* @__PURE__ */ F(As, {
										id: e.key,
										place: g - t,
										value: e.value,
										delay: C.fresh.get(e.key) ?? t * D,
										shown: Ee,
										active: O === t,
										frame: L,
										scale: N,
										height: c,
										reduced: u
									}, e.key))
								}),
								/* @__PURE__ */ F("line", {
									className: os.baseline,
									x1: 0,
									x2: "100%",
									y1: c - .5,
									y2: c - .5
								}),
								s && /* @__PURE__ */ F(K.line, {
									className: os.mean,
									x1: 0,
									x2: "100%",
									y1: pe,
									y2: pe,
									initial: !1,
									animate: { opacity: +!!Ee },
									transition: u ? { duration: 0 } : {
										duration: cs.standard,
										delay: .12
									}
								})
							]
						})
					}),
					/* @__PURE__ */ I("div", {
						className: os.gutter,
						"aria-hidden": "true",
						children: [/* @__PURE__ */ F(fe, {
							initial: !1,
							children: b.map((e) => /* @__PURE__ */ F(Ns, {
								value: e,
								scale: N,
								height: c,
								avoid: De,
								format: l
							}, e))
						}), s && /* @__PURE__ */ F(K.span, {
							className: os.meanLabel,
							style: { y: pe },
							initial: !1,
							animate: { opacity: +!!Ee },
							transition: u ? { duration: 0 } : {
								duration: cs.standard,
								delay: .12
							},
							children: /* @__PURE__ */ F(K.span, {
								className: os.tickText,
								children: me
							})
						})]
					}),
					/* @__PURE__ */ I("div", {
						className: os.axis,
						"aria-hidden": "true",
						children: [/* @__PURE__ */ F(fe, {
							initial: !1,
							children: e.map((e, t) => e.axisLabel && se.has(e.key) ? /* @__PURE__ */ F(Ps, {
								text: e.axisLabel,
								size: R[e.axisLabel] ?? 0,
								shift: se.get(e.key) ?? 0,
								place: g - t,
								frame: L,
								reduced: u
							}, `${e.key}:${e.axisLabel}`) : null)
						}), /* @__PURE__ */ F("span", {
							ref: oe,
							className: os.measure,
							children: z.split("\n").filter(Boolean).map((e) => /* @__PURE__ */ F("span", {
								"data-text": e,
								children: e
							}, e))
						})]
					}),
					/* @__PURE__ */ F("div", {
						className: os.scrubber,
						role: "slider",
						tabIndex: 0,
						"aria-label": `${t}, explore by ${o.toLowerCase()}`,
						"aria-orientation": "horizontal",
						"aria-valuemin": 1,
						"aria-valuemax": Math.max(1, e.length),
						"aria-valuenow": (O ?? g) + 1,
						"aria-valuetext": xe,
						onPointerDown: q,
						onPointerMove: ve,
						onPointerUp: ye,
						onPointerCancel: () => E(null),
						onPointerLeave: (e) => {
							e.pointerType === "mouse" && E(null);
						},
						onKeyDown: ge,
						onBlur: () => E(null),
						onFocus: (e) => {
							e.currentTarget.matches(":focus-visible") && g >= 0 && E((e) => e ?? g);
						}
					})
				]
			}),
			/* @__PURE__ */ F("div", {
				className: os.srOnly,
				children: /* @__PURE__ */ I("table", { children: [
					/* @__PURE__ */ I("caption", { children: [
						t,
						", ",
						n
					] }),
					/* @__PURE__ */ F("thead", { children: /* @__PURE__ */ I("tr", { children: [/* @__PURE__ */ F("th", {
						scope: "col",
						children: o
					}), /* @__PURE__ */ F("th", {
						scope: "col",
						children: t
					})] }) }),
					/* @__PURE__ */ F("tbody", { children: e.map((e) => /* @__PURE__ */ I("tr", { children: [/* @__PURE__ */ F("th", {
						scope: "row",
						children: e.label
					}), /* @__PURE__ */ I("td", { children: [l(e.value), S] })] }, e.key)) })
				] })
			}),
			/* @__PURE__ */ F("p", {
				className: os.srOnly,
				"aria-live": "polite",
				"aria-atomic": "true",
				children: C.changes ? `${n}. ${i} ${l(Math.round(_))}${S}.` : ""
			})
		]
	});
}
var Us = {
	figure: "_figure_7uwlv_4",
	ring: "_ring_7uwlv_11",
	svg: "_svg_7uwlv_12",
	track: "_track_7uwlv_15",
	segment: "_segment_7uwlv_18",
	center: "_center_7uwlv_22",
	readout: "_readout_7uwlv_23",
	centerLabel: "_centerLabel_7uwlv_24",
	centerMeta: "_centerMeta_7uwlv_24",
	centerValue: "_centerValue_7uwlv_27",
	legend: "_legend_7uwlv_31",
	item: "_item_7uwlv_32",
	row: "_row_7uwlv_33",
	dot: "_dot_7uwlv_37",
	rowLabel: "_rowLabel_7uwlv_40",
	rowValue: "_rowValue_7uwlv_40",
	rowShare: "_rowShare_7uwlv_40",
	rowText: "_rowText_7uwlv_42",
	rowMembers: "_rowMembers_7uwlv_43",
	srOnly: "_srOnly_7uwlv_49"
}, Ws = "__other", Gs = Math.PI * 2, { spring: Ks, ease: qs, stagger: Js, duration: Ys } = Q, Xs = ({ visualDuration: e, bounce: t }, n = 5e-4) => {
	let r = 2 * Math.PI / (e * 1.2);
	return {
		type: "spring",
		stiffness: r * r,
		damping: 2 * (1 - t) * r,
		restDelta: n,
		restSpeed: n * 2
	};
}, Zs = Xs({
	visualDuration: .72,
	bounce: 0
}), Qs = Xs({
	visualDuration: .5,
	bounce: 0
}), $s = Xs(Ks.snappy, .002), ec = [
	56,
	42,
	32
], tc = (e) => e < 4 ? `var(--series-${e + 1})` : `color-mix(in oklab, var(--foreground) ${ec[(e - 4) % ec.length]}%, var(--surface))`, nc = "color-mix(in oklab, var(--foreground) 26%, var(--surface))", rc = 4, ic = 2, ac = 7, oc = 3, sc = 4, cc = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }), lc = new Intl.NumberFormat("en-US", {
	style: "percent",
	maximumFractionDigits: 0
}), uc = (e) => e > 0 && e < .01 ? "<1%" : lc.format(e);
function dc(e, t, n, r) {
	let i = e.filter((e) => e.value > 0), a = i.reduce((e, t) => e + t.value, 0);
	if (!a) return [];
	let o = [...i].sort((e, t) => t.value - e.value), s = new Set(o.filter((e, r) => e.value / a >= t && r < n - 1).map((e) => e.key)), c = i.filter((e) => !s.has(e.key));
	return c.length < 2 ? i.map((e) => ({ ...e })) : [...i.filter((e) => s.has(e.key)).map((e) => ({ ...e })), {
		key: Ws,
		label: r,
		value: c.reduce((e, t) => e + t.value, 0),
		members: c
	}];
}
function fc(e, t) {
	let n = e.reduce((e, n) => e + (t.has(n.key) ? 0 : n.value), 0) || 1, r = 0;
	return new Map(e.map((e) => {
		let i = {
			start: r,
			end: r + (t.has(e.key) ? 0 : e.value / n)
		};
		return r = i.end, [e.key, i];
	}));
}
function pc(e, t, n, r) {
	let i = n - t;
	return i >= 1 - 1e-6 ? Infinity : Math.sin(Math.min(i * Math.PI, Math.PI / 2)) * e - Math.min(r / 2, (1 - i) * Gs * e / 2);
}
var mc = (e) => (Math.round(e * 100) / 100).toString();
function hc(e, t, n, r, i, a, o) {
	let s = i - r;
	if (s <= 1e-6) return "";
	let c = (t, n) => `${mc(e + t * Math.cos(n))} ${mc(e + t * Math.sin(n))}`;
	if (s >= 1 - 1e-6) return `M${c(t, -Math.PI / 2)}A${mc(t)} ${mc(t)} 0 1 1 ${c(t, Math.PI / 2)}A${mc(t)} ${mc(t)} 0 1 1 ${c(t, -Math.PI / 2)}ZM${c(n, -Math.PI / 2)}A${mc(n)} ${mc(n)} 0 1 0 ${c(n, Math.PI / 2)}A${mc(n)} ${mc(n)} 0 1 0 ${c(n, -Math.PI / 2)}Z`;
	let l = Math.min(a / 2, (1 - s) * Gs * t / 2), u = r * Gs - Math.PI / 2, d = i * Gs - Math.PI / 2, f = (d - u) / 2, p = Math.sin(Math.min(f, Math.PI / 2));
	if (p * t <= l + 1e-6) return "";
	let m = (t, n, r) => `${mc(e + t * Math.cos(n) - r * l * Math.sin(n))} ${mc(e + t * Math.sin(n) + r * l * Math.cos(n))}`, h = (t - n) / 2, g = Math.max(0, Math.min(o, h, p >= .9999 ? Infinity : (p * t - l) / (1 + p))), _ = Math.asin(Math.min(1, (l + g) / (t - g))), v = Math.sqrt(Math.max(0, (t - g) ** 2 - (l + g) ** 2)), y = +(d - u - 2 * _ > Math.PI), b = `M${m(v, u, 1)}`;
	if (g > .01 && (b += `A${mc(g)} ${mc(g)} 0 0 1 ${c(t, u + _)}`), b += `A${mc(t)} ${mc(t)} 0 ${y} 1 ${c(t, d - _)}`, g > .01 && (b += `A${mc(g)} ${mc(g)} 0 0 1 ${m(v, d, -1)}`), p * n > l + 1e-6 || p >= .9999) {
		let e = Math.max(0, Math.min(o, h, p >= .9999 ? Infinity : (p * n - l) / (1 - p))), t = Math.asin(Math.min(1, (l + e) / (n + e))), r = Math.sqrt(Math.max(0, (n + e) ** 2 - (l + e) ** 2)), i = +(d - u - 2 * t > Math.PI);
		b += `L${m(r, d, -1)}`, e > .01 && (b += `A${mc(e)} ${mc(e)} 0 0 1 ${c(n, d - t)}`), b += `A${mc(n)} ${mc(n)} 0 ${i} 0 ${c(n, u + t)}`, e > .01 && (b += `A${mc(e)} ${mc(e)} 0 0 1 ${m(r, u, 1)}`);
	} else b += `L${c(l / p, (u + d) / 2)}`;
	return `${b}Z`;
}
function gc({ value: e, format: t, reduced: n }) {
	let r = H(null), [i] = U(() => t(e)), a = H(null);
	return V(() => {
		let i = r.current;
		if (!i) return;
		if (!a.current) {
			let n = {
				mv: ge(e),
				format: t,
				target: e
			};
			n.mv.on("change", (e) => {
				i.textContent = n.format(Number.isInteger(n.target) ? Math.round(e) : e);
			}), a.current = n;
		}
		let o = a.current;
		if (o.format = t, o.target === e && !n) {
			o.mv.isAnimating() || (i.textContent = t(e));
			return;
		}
		if (o.target = e, n) {
			o.mv.jump(e), i.textContent = t(e);
			return;
		}
		G(o.mv, e, Xs({
			visualDuration: .4,
			bounce: 0
		}, Math.max(Math.abs(e - o.mv.get()) * .001, 1e-6)));
	}, [
		e,
		t,
		n
	]), B(() => () => {
		a.current?.mv.destroy(), a.current = null;
	}, []), /* @__PURE__ */ F("span", {
		ref: r,
		children: i
	});
}
var _c = (e, t) => ({
	animate: {
		opacity: +(e === 0),
		y: `${.45 * Math.sign(e)}em`
	},
	transition: t ? { duration: 0 } : e === 0 ? {
		duration: Ys.standard,
		ease: [...qs.enter]
	} : {
		duration: Ys.fast,
		ease: [...qs.standard]
	}
}), vc = () => () => {};
function yc() {
	let e = W(vc, () => !0, () => !1);
	return !!Y() && e;
}
function bc({ data: e, label: t, unit: n = "", formatValue: r = (e) => cc.format(e), totalLabel: i = "Total", size: a = 208, thickness: o = 24, groupBelow: s = .04, maxSegments: c = 6, otherLabel: l = "Other", activeKey: u, defaultActiveKey: d = null, onActiveChange: f, hiddenKeys: p, defaultHiddenKeys: m, onHiddenKeysChange: h, legendAction: g = "toggle", legend: _ = !0, emptyLabel: v = "No data yet", ref: y, className: b }) {
	let x = yc(), S = H(null);
	ue(y, () => S.current);
	let C = _e(S, {
		once: !0,
		amount: .35
	}), w = le(), T = dc(e, s, c, l), [E, D] = U(m ?? []), O = p ?? E, k = new Set(O.filter((e) => T.some((t) => t.key === e))), A = T.filter((e) => !k.has(e.key)), j = A.reduce((e, t) => e + t.value, 0), M = `${T.map((e) => `${e.key}:${e.value}${k.has(e.key) ? "h" : ""}`).join("|")}`, ee = n ? ` ${n}` : "", [te, N] = U(() => new Map(e.map((e, t) => [e.key, t])));
	if (e.some((e) => !te.has(e.key))) {
		let t = new Map(te);
		for (let n of e) t.has(n.key) || t.set(n.key, t.size);
		N(t);
	}
	let ne = (e) => e.color ?? (e.key === Ws ? nc : tc(te.get(e.key) ?? 0)), [L, re] = U(T), [ie, R] = U(M);
	if (ie !== M) {
		R(M);
		let e = [...T];
		L.forEach((t, n) => {
			if (e.some((e) => e.key === t.key)) return;
			let r = L.slice(0, n).reverse().find((t) => e.some((e) => e.key === t.key));
			e.splice(r ? e.findIndex((e) => e.key === r.key) + 1 : 0, 0, {
				...t,
				value: 0
			});
		}), re(e);
	}
	let [ae, oe] = U(d), z = u === void 0 ? ae : u, [ce, de] = U(null), W = (e) => {
		u === void 0 && oe(e), f?.(e);
	}, pe = [ce, z].find((e) => e && A.some((t) => t.key === e)) ?? null, q = A.find((e) => e.key === pe) ?? null, [ve, J] = U(""), ye = (e) => {
		let t = k.has(e);
		if (!t && A.length <= 1) return;
		let n = t ? O.filter((t) => t !== e) : [...O, e];
		p === void 0 && D(n), h?.(n);
		let a = T.find((t) => t.key === e), o = T.reduce((e, t) => e + (n.includes(t.key) ? 0 : t.value), 0);
		a && J(`${a.label} ${t ? "shown" : "hidden"}. ${i} ${r(o)}${ee}.`);
	}, be = a / 2, Y = be - ac, xe = Math.max(8, Y - o), Se = Math.min(sc, o / 4), Ce = H({
		c: be,
		outer: Y,
		inner: xe,
		corner: Se
	}), we = H(/* @__PURE__ */ new Map()), Te = H(/* @__PURE__ */ new Map()), Ee = se((e) => {
		let t = e?.dataset.key;
		if (!(!e || !t)) return Te.current.set(t, e), () => {
			Te.current.get(t) === e && Te.current.delete(t);
		};
	}, []), De = se(() => {
		let { c: e, outer: t, inner: n, corner: r } = Ce.current;
		for (let [i, a] of Te.current) {
			let o = we.current.get(i);
			if (!o) {
				a.setAttribute("d", "");
				continue;
			}
			let s = o.start.get(), c = o.end.get(), l = Math.max(0, o.lift.get()), u = t + l * ic;
			a.setAttribute("d", hc(e, u, n - l * ic * .5, s, c, oc, r)), a.setAttribute("fill-opacity", mc(Math.min(1, Math.max(0, (pc(u, s, c, oc) - 1) / 3))));
			let d = (s + c) / 2 * Gs - Math.PI / 2, f = l * rc;
			a.setAttribute("transform", `translate(${mc(Math.cos(d) * f)} ${mc(Math.sin(d) * f)})`);
		}
	}, []), Oe = se(() => {
		he.render(De);
	}, [De]);
	V(() => {
		Ce.current = {
			c: be,
			outer: Y,
			inner: xe,
			corner: Se
		}, De();
	}), B(() => () => {
		me(De);
		for (let e of we.current.values()) e.off();
		we.current.clear();
	}, [De]);
	let ke = H(/* @__PURE__ */ new Map()), Ae = H({
		drawn: L,
		slices: T
	});
	V(() => {
		Ae.current = {
			drawn: L,
			slices: T
		};
	});
	let je = C || x;
	B(() => {
		if (!je) return;
		let { drawn: e, slices: t } = Ae.current, n = fc(t, k);
		ke.current = n;
		let r = we.current.size === 0, i = (t) => {
			let r = e.slice(0, t).reverse().find((e) => n.has(e.key));
			return r ? n.get(r.key).end : 0;
		}, a = (e) => {
			Ae.current.slices.some((t) => t.key === e) || (we.current.get(e)?.off(), we.current.delete(e), re((t) => t.filter((t) => t.key !== e)));
		};
		e.forEach((t, o) => {
			let s = !n.has(t.key), c = n.get(t.key) ?? {
				start: i(o),
				end: i(o)
			}, l = we.current.get(t.key);
			if (!l) {
				let n = e.slice(0, o).reverse().map((e) => we.current.get(e.key)).find(Boolean), i = r ? 0 : n ? n.end.get() : 0, a = ge(i), s = ge(i), c = ge(0), u = [
					a.on("change", Oe),
					s.on("change", Oe),
					c.on("change", Oe)
				];
				l = {
					start: a,
					end: s,
					lift: c,
					off: () => {
						u.forEach((e) => e()), a.destroy(), s.destroy(), c.destroy();
					}
				}, we.current.set(t.key, l);
			}
			if (x) {
				l.start.jump(c.start), l.end.jump(c.end), s && a(t.key);
				return;
			}
			if (r) {
				G(l.start, c.start, Zs), G(l.end, c.end, {
					...Zs,
					delay: .04 + o * Js.item
				});
				return;
			}
			G(l.start, c.start, Qs), G(l.end, c.end, {
				...Qs,
				onComplete: s ? () => a(t.key) : void 0
			});
		}), Oe();
	}, [
		je,
		M,
		x,
		Oe
	]), B(() => {
		for (let [e, t] of we.current) {
			let n = +(e === pe);
			x ? t.lift.jump(n) : (t.lift.get() !== n || t.lift.isAnimating()) && G(t.lift, n, $s);
		}
	}, [
		pe,
		x,
		L,
		je
	]);
	let Me = H(null), Ne = (e) => {
		let t = Me.current?.getBoundingClientRect();
		if (!t || !t.width) return;
		let n = a / t.width, r = (e.clientX - t.left) * n - be, i = (e.clientY - t.top) * n - be, o = Math.hypot(r, i);
		if (o < xe - 6 || o > be) return null;
		let s = (Math.atan2(i, r) + Math.PI / 2) / Gs;
		s < 0 && (s += 1);
		for (let [e, t] of ke.current) if (t.end > t.start && s >= t.start && s < t.end && A.some((t) => t.key === e)) return e;
	}, Pe = (e) => {
		if (e.pointerType !== "mouse") return;
		let t = Ne(e);
		t !== void 0 && t !== ce && de(t);
	}, Fe = (e) => {
		let t = Ne(e);
		t && W(z === t ? null : t);
	}, Ie = (e) => `${r(e)}${ee}`, Le = (e) => `${e.label}, ${Ie(e.value)}, ${uc(e.value / (j || 1))}${e.members ? `. Includes ${e.members.map((e) => e.label).join(", ")}` : ""}`, Re = H([]), ze = (e, t, n) => ({
		ArrowDown: t + 1,
		ArrowRight: t + 1,
		ArrowUp: t - 1,
		ArrowLeft: t - 1,
		Home: 0,
		End: n - 1
	})[e], Be = (e, t) => {
		if (e.key === "Escape" && z) {
			e.preventDefault(), W(null);
			return;
		}
		let n = ze(e.key, t, T.length);
		n !== void 0 && (e.preventDefault(), Re.current[(n + T.length) % T.length]?.focus());
	}, Ve = (e) => {
		if (!A.length) return;
		if (e.key === "Escape") {
			e.preventDefault(), de(null), z && W(null);
			return;
		}
		if ((e.key === "Enter" || e.key === " ") && pe) {
			e.preventDefault(), W(z === pe ? null : pe);
			return;
		}
		let t = A.findIndex((e) => e.key === pe), n = ze(e.key, t < 0 ? e.key.endsWith("Up") || e.key.endsWith("Left") ? 0 : -1 : t, A.length);
		if (n === void 0) return;
		e.preventDefault();
		let r = A[(n + A.length) % A.length];
		de(r.key), J(Le(r));
	}, He = (e) => {
		e.relatedTarget instanceof Node && e.currentTarget.closest("ul")?.contains(e.relatedTarget) || de(null);
	}, Ue = q ? q.key : j ? "__total" : "__empty", We = [{
		key: "__total",
		label: j ? i : v,
		value: j,
		meta: null
	}, ...T.map((e) => ({
		key: e.key,
		label: e.label,
		value: e.value,
		meta: e
	}))], Ge = Math.max(0, We.findIndex((e) => e.key === (Ue === "__empty" ? "__total" : Ue))), Ke = j ? `${t}. ${i} ${Ie(j)}. ${A.map(Le).join(". ")}.` : `${t}. ${v}.`, qe = (e) => e.members ? e.members.length > 2 ? `${e.members.slice(0, 2).map((e) => e.label).join(", ")} and ${e.members.length - 2} more` : e.members.map((e) => e.label).join(" and ") : null, Je = `${t}. Use the arrow keys to read each segment.`;
	return /* @__PURE__ */ I("figure", {
		ref: S,
		className: [Us.figure, b].filter(Boolean).join(" "),
		"aria-label": t,
		"data-legend": _ || void 0,
		children: [
			/* @__PURE__ */ I("div", {
				className: Us.ring,
				style: {
					width: a,
					"--inner": `${xe * 2 / a * 100}%`
				},
				tabIndex: _ ? void 0 : 0,
				role: _ ? void 0 : "group",
				"aria-label": _ ? void 0 : Je,
				onKeyDown: _ ? void 0 : Ve,
				onBlur: _ ? void 0 : () => de(null),
				children: [/* @__PURE__ */ I("svg", {
					ref: Me,
					className: Us.svg,
					viewBox: `0 0 ${a} ${a}`,
					"aria-hidden": "true",
					focusable: "false",
					onPointerMove: Pe,
					onPointerLeave: () => de(null),
					onClick: Fe,
					"data-hovering": pe !== null || void 0,
					children: [/* @__PURE__ */ F("circle", {
						className: Us.track,
						cx: be,
						cy: be,
						r: (Y + xe) / 2,
						strokeWidth: Y - xe,
						"data-idle": !je || !j || void 0
					}), L.map((e) => /* @__PURE__ */ F("path", {
						ref: Ee,
						"data-key": e.key,
						className: Us.segment,
						"data-active": e.key === pe || void 0,
						"data-dim": pe !== null && e.key !== pe || void 0,
						style: { "--slice": ne(e) }
					}, e.key))]
				}), /* @__PURE__ */ F("div", {
					className: Us.center,
					"aria-hidden": "true",
					children: We.map((e, t) => /* @__PURE__ */ I(K.span, {
						className: Us.readout,
						initial: !1,
						..._c(t - Ge, x),
						children: [
							/* @__PURE__ */ F("span", {
								className: Us.centerLabel,
								children: e.label
							}),
							/* @__PURE__ */ F("span", {
								className: Us.centerValue,
								children: e.value || e.meta ? /* @__PURE__ */ F(gc, {
									value: e.value,
									format: r,
									reduced: x
								}) : " "
							}),
							/* @__PURE__ */ F("span", {
								className: Us.centerMeta,
								children: e.meta ? /* @__PURE__ */ I(P, { children: [
									/* @__PURE__ */ F(gc, {
										value: j && !k.has(e.key) ? e.value / j : 0,
										format: uc,
										reduced: x
									}),
									" of ",
									i.toLowerCase()
								] }) : n || " "
							})
						]
					}, e.key))
				})]
			}),
			_ && T.length > 0 && /* @__PURE__ */ F("ul", {
				className: Us.legend,
				"aria-label": `${t}, segments${g === "toggle" ? ". Press a segment to show or hide it" : ""}`,
				id: w,
				onPointerLeave: () => de(null),
				children: /* @__PURE__ */ F(fe, {
					initial: !1,
					children: T.map((e, t) => {
						let n = k.has(e.key);
						return /* @__PURE__ */ F(K.li, {
							className: Us.item,
							initial: {
								height: 0,
								opacity: 0
							},
							animate: {
								height: "auto",
								opacity: 1
							},
							exit: {
								height: 0,
								opacity: 0
							},
							transition: x ? { duration: 0 } : Ks.smooth,
							children: /* @__PURE__ */ I("button", {
								ref: (e) => {
									e && (Re.current[t] = e);
								},
								type: "button",
								className: Us.row,
								"aria-pressed": g === "toggle" ? !n : z === e.key,
								"aria-label": n ? `${e.label}, hidden` : Le(e),
								"data-active": e.key === pe || void 0,
								"data-pinned": z === e.key || void 0,
								"data-hidden": n || void 0,
								style: { "--slice": ne(e) },
								onClick: () => g === "toggle" ? ye(e.key) : W(z === e.key ? null : e.key),
								onPointerEnter: (t) => {
									t.pointerType === "mouse" && de(n ? null : e.key);
								},
								onFocus: (t) => {
									t.currentTarget.matches(":focus-visible") && de(n ? null : e.key);
								},
								onBlur: He,
								onKeyDown: (e) => Be(e, t),
								children: [
									/* @__PURE__ */ F("span", {
										className: Us.dot,
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ I("span", {
										className: Us.rowText,
										children: [/* @__PURE__ */ F("span", {
											className: Us.rowLabel,
											children: e.label
										}), e.members && /* @__PURE__ */ F("span", {
											className: Us.rowMembers,
											children: qe(e)
										})]
									}),
									/* @__PURE__ */ F("span", {
										className: Us.rowValue,
										"aria-hidden": "true",
										children: /* @__PURE__ */ F(gc, {
											value: e.value,
											format: r,
											reduced: x
										})
									}),
									/* @__PURE__ */ F("span", {
										className: Us.rowShare,
										"aria-hidden": "true",
										children: /* @__PURE__ */ F(gc, {
											value: n || !j ? 0 : e.value / j,
											format: uc,
											reduced: x
										})
									})
								]
							})
						}, e.key);
					})
				})
			}),
			/* @__PURE__ */ F("p", {
				className: Us.srOnly,
				children: Ke
			}),
			/* @__PURE__ */ F("p", {
				className: Us.srOnly,
				"aria-live": "polite",
				children: ve
			}),
			j > 0 && /* @__PURE__ */ F("div", {
				className: Us.srOnly,
				children: /* @__PURE__ */ I("table", { children: [
					/* @__PURE__ */ F("caption", { children: t }),
					/* @__PURE__ */ F("thead", { children: /* @__PURE__ */ I("tr", { children: [
						/* @__PURE__ */ F("th", {
							scope: "col",
							children: "Segment"
						}),
						/* @__PURE__ */ F("th", {
							scope: "col",
							children: "Value"
						}),
						/* @__PURE__ */ F("th", {
							scope: "col",
							children: "Share"
						})
					] }) }),
					/* @__PURE__ */ F("tbody", { children: A.flatMap((e) => e.members ? e.members.map((e) => ({
						key: e.key,
						label: `${e.label} (${l})`,
						value: e.value
					})) : [e]).map((e) => /* @__PURE__ */ I("tr", { children: [
						/* @__PURE__ */ F("th", {
							scope: "row",
							children: e.label
						}),
						/* @__PURE__ */ F("td", { children: Ie(e.value) }),
						/* @__PURE__ */ F("td", { children: uc(e.value / j) })
					] }, e.key)) })
				] })
			})
		]
	});
}
var xc = {
	figure: "_figure_1ba1u_3",
	stage: "_stage_1ba1u_7",
	columns: "_columns_1ba1u_8",
	column: "_column_1ba1u_8",
	plot: "_plot_1ba1u_11",
	svg: "_svg_1ba1u_12",
	axis: "_axis_1ba1u_13",
	item: "_item_1ba1u_16",
	line: "_line_1ba1u_20",
	dot: "_dot_1ba1u_21",
	leader: "_leader_1ba1u_22",
	labels: "_labels_1ba1u_24",
	start: "_start_1ba1u_26",
	end: "_end_1ba1u_26",
	name: "_name_1ba1u_30",
	value: "_value_1ba1u_31",
	rank: "_rank_1ba1u_36",
	rankSwap: "_rankSwap_1ba1u_38",
	tooltip: "_tooltip_1ba1u_40",
	tipTitle: "_tipTitle_1ba1u_42",
	tipRow: "_tipRow_1ba1u_43",
	tipName: "_tipName_1ba1u_44",
	tipValue: "_tipValue_1ba1u_45",
	tipMeta: "_tipMeta_1ba1u_46",
	message: "_message_1ba1u_48",
	srOnly: "_srOnly_1ba1u_49"
}, { spring: Sc } = Q, Cc = {
	stiffness: 480,
	damping: 42,
	restDelta: .01
}, wc = 20, Tc = 14, Ec = 28, Dc = (e, t, n) => Math.min(n, Math.max(t, e)), Oc = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }), kc = () => () => {};
function Ac() {
	let e = W(kc, () => !0, () => !1);
	return !!Y() && e;
}
function jc(e, t, n, r) {
	let i = e.map((e, t) => ({
		y: e,
		index: t
	})).sort((e, t) => e.y - t.y).map((e) => ({
		members: [e],
		top: e.y
	}));
	for (let e = !0; e;) {
		e = !1;
		let a = [];
		for (let n of i) {
			let r = a[a.length - 1];
			if (r && r.top + r.members.length * t > n.top) {
				let i = [...r.members, ...n.members];
				a[a.length - 1] = {
					members: i,
					top: i.reduce((e, n, r) => e + n.y - r * t, 0) / i.length
				}, e = !0;
			} else a.push(n);
		}
		i = a.map((e) => ({
			...e,
			top: Dc(e.top, n, Math.max(n, r - (e.members.length - 1) * t))
		}));
	}
	let a = Array(e.length);
	return i.forEach((e) => e.members.forEach((n, r) => {
		a[n.index] = e.top + r * t;
	})), a;
}
function Mc({ move: e, reduced: t }) {
	let n = e === 0 ? "=" : `${Math.abs(e)}`;
	return /* @__PURE__ */ I("span", {
		className: xc.rank,
		"data-move": e > 0 ? "up" : e < 0 ? "down" : "level",
		"aria-hidden": "true",
		children: [e !== 0 && /* @__PURE__ */ F("svg", {
			width: "8",
			height: "8",
			viewBox: "0 0 8 8",
			children: /* @__PURE__ */ F("path", {
				d: e > 0 ? "M4 7V1M1.5 3.5 4 1l2.5 2.5" : "M4 1v6M1.5 4.5 4 7l2.5-2.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.3",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		}), /* @__PURE__ */ F("span", {
			className: xc.rankSwap,
			children: /* @__PURE__ */ F(fe, {
				mode: "popLayout",
				initial: !1,
				children: /* @__PURE__ */ F(K.span, {
					initial: t ? { opacity: 0 } : {
						opacity: 0,
						y: e >= 0 ? 6 : -6
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: t ? { opacity: 0 } : {
						opacity: 0,
						y: e >= 0 ? -6 : 6
					},
					transition: t ? { duration: 0 } : Sc.snappy,
					children: n
				}, n)
			})
		})]
	});
}
function Nc({ data: e, label: t, startLabel: n, endLabel: r, formatValue: i, formatChange: a, height: o, highlightKey: s = null, activeKey: c, onActiveChange: l, ranks: u = !0, emptyLabel: d = "No data", ref: f, className: p }) {
	let m = Ac(), h = H(null), g = H(null), _ = H(null);
	ue(f, () => h.current);
	let v = _e(h, {
		once: !0,
		amount: .3
	}), y = e.length === 0, b = o ?? Math.max(200, e.length * 44), [x, S] = U(0);
	V(() => {
		let e = g.current;
		if (!e) return;
		let t = () => S(e.clientWidth);
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, []);
	let C = x < 440, w = C ? x < 300 ? 116 : 132 : 168, T = u ? C ? 76 : 96 : C ? 52 : 64, E = w, D = Math.max(E + 40, x - T), O = e.flatMap((e) => [e.start, e.end]), k = Math.min(...O), A = Math.max(...O);
	Number.isFinite(k) || (k = 0, A = 1), A - k < 1e-9 && (--k, A += 1);
	let j = (e) => Tc + (1 - (e - k) / (A - k)) * (b - 28), M = (t) => {
		let n = [...e].sort((e, n) => n[t] - e[t]);
		return (e) => n.indexOf(e) + 1;
	}, ee = M("start"), te = M("end"), N = jc(e.map((e) => j(e.start)), wc, 8, b - 8), ne = jc(e.map((e) => j(e.end)), wc, 8, b - 8), L = e.map((e, t) => ({
		item: e,
		y0: j(e.start),
		y1: j(e.end),
		l0: N[t],
		l1: ne[t],
		rank0: ee(e),
		rank1: te(e),
		order: 0
	})), re = [...L].sort((e, t) => e.rank1 - t.rank1);
	re.forEach((e, t) => {
		e.order = t;
	});
	let [ie, R] = U(null), ae = c === void 0 ? ie : c, oe = ae && e.some((e) => e.key === ae) ? ae : null, z = (e) => {
		c === void 0 && R(e), e !== oe && l?.(e);
	}, se = J(0), ce = J(0), B = xe(se, Cc), le = xe(ce, Cc), de = H(!1), W = L.find((e) => e.item.key === oe) ?? null, [fe, pe] = U(null);
	oe && oe !== fe && pe(oe);
	let G = W ?? L.find((e) => e.item.key === fe) ?? null;
	V(() => {
		let e = _.current;
		if (!W || !e || !x) {
			de.current = !1;
			return;
		}
		let t = e.offsetWidth, n = e.offsetHeight, r = (W.y0 + W.y1) / 2, i = (E + D) / 2, a = r - n - 16 >= 0, o = Dc(i - t / 2, 0, Math.max(0, x - t)), s = Dc(Ec + (a ? r - n - 16 : r + 16), 0, Math.max(0, b + Ec - n));
		se.set(o), ce.set(s), (!de.current || m) && (B.jump(o), le.jump(s)), de.current = !0;
	});
	let me = (e, t) => {
		let n = g.current?.getBoundingClientRect();
		if (!n || y) return null;
		let r = Dc(e - n.left, E, D), i = t - n.top - Ec, a = (r - E) / Math.max(1, D - E), o = null, s = Infinity;
		for (let t of L) {
			let r = Math.abs(t.y0 + (t.y1 - t.y0) * a - i), c = e - n.left < E ? Math.abs(t.l0 - i) : e - n.left > D ? Math.abs(t.l1 - i) : Infinity, l = Math.min(r, c);
			l < s && (s = l, o = t);
		}
		return s <= 22 ? o?.item.key ?? null : null;
	}, he = (e) => {
		(e.pointerType === "mouse" || e.buttons) && z(me(e.clientX, e.clientY));
	}, ge = (e) => {
		if (y) return;
		if (e.key === "Escape" && oe) {
			e.preventDefault(), z(null);
			return;
		}
		let t = W ? W.order : -1, n = {
			ArrowDown: t + 1,
			ArrowRight: t + 1,
			ArrowUp: t < 0 ? 0 : t - 1,
			ArrowLeft: t < 0 ? 0 : t - 1,
			Home: 0,
			End: re.length - 1
		};
		e.key in n && (e.preventDefault(), z(re[Dc(n[e.key], 0, re.length - 1)].item.key));
	}, q = (e) => i ? i(e) : Oc.format(e), ve = (e) => a ? a(e.end - e.start, e) : `${e.end >= e.start ? "+" : "−"}${q(Math.abs(e.end - e.start))}`, ye = (e) => e.rank0 === e.rank1 ? "same rank" : e.rank1 < e.rank0 ? `up ${e.rank0 - e.rank1} to rank ${e.rank1}` : `down ${e.rank1 - e.rank0} to rank ${e.rank1}`, be = W ? `${W.item.label}, ${n} ${q(W.item.start)}, ${r} ${q(W.item.end)}, ${ve(W.item)}, ${ye(W)}` : "", Y = y ? `${t}. ${d}.` : `${t}, ${n} to ${r}. ${re.map((e) => `${e.item.label} ${q(e.item.start)} to ${q(e.item.end)}`).join(", ")}.`, Se = m ? { duration: 0 } : Sc.morph, Ce = v || m;
	return /* @__PURE__ */ I("figure", {
		ref: h,
		className: [xc.figure, p].filter(Boolean).join(" "),
		"aria-label": t,
		children: [
			/* @__PURE__ */ I("div", {
				ref: g,
				className: xc.stage,
				"data-narrow": C || void 0,
				"data-active": oe ? !0 : void 0,
				role: "group",
				tabIndex: y ? -1 : 0,
				"aria-roledescription": "slope chart",
				"aria-label": `${t}. Use up and down arrows to move between items in ${r} order.`,
				onPointerMove: he,
				onPointerDown: (e) => {
					e.pointerType !== "mouse" && (e.currentTarget.setPointerCapture?.(e.pointerId), z(me(e.clientX, e.clientY)));
				},
				onPointerUp: (e) => {
					e.pointerType !== "mouse" && z(null);
				},
				onPointerCancel: () => z(null),
				onPointerLeave: (e) => {
					e.pointerType === "mouse" && z(null);
				},
				onKeyDown: ge,
				onBlur: () => z(null),
				onFocus: (e) => {
					e.currentTarget.matches(":focus-visible") && !y && !oe && z(re[0].item.key);
				},
				children: [
					x > 0 && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ I("div", {
						className: xc.columns,
						"aria-hidden": "true",
						children: [/* @__PURE__ */ F("span", {
							className: xc.column,
							style: {
								left: E,
								translate: "-50% 0"
							},
							children: n
						}), /* @__PURE__ */ F("span", {
							className: xc.column,
							style: {
								left: D,
								translate: "-50% 0"
							},
							children: r
						})]
					}), /* @__PURE__ */ I("div", {
						className: xc.plot,
						style: { height: b },
						children: [/* @__PURE__ */ I("svg", {
							className: xc.svg,
							width: x,
							height: b,
							"aria-hidden": "true",
							focusable: "false",
							children: [
								/* @__PURE__ */ F("line", {
									className: xc.axis,
									x1: E,
									x2: E,
									y1: 0,
									y2: b
								}),
								/* @__PURE__ */ F("line", {
									className: xc.axis,
									x1: D,
									x2: D,
									y1: 0,
									y2: b
								}),
								L.map((e, t) => {
									let n = e.item.key, r = oe === n, i = s === n, a = m ? 0 : t * .05;
									return /* @__PURE__ */ I("g", {
										className: xc.item,
										"data-on": r || void 0,
										"data-accent": i || void 0,
										"data-dim": oe !== null && !r || void 0,
										children: [
											/* @__PURE__ */ F(K.path, {
												className: xc.leader,
												initial: !1,
												animate: { d: `M${E - 6},${e.l0}L${E - 1},${e.y0}` },
												transition: Se
											}),
											/* @__PURE__ */ F(K.path, {
												className: xc.leader,
												initial: !1,
												animate: { d: `M${D + 6},${e.l1}L${D + 1},${e.y1}` },
												transition: Se
											}),
											/* @__PURE__ */ F(K.line, {
												className: xc.line,
												x1: E,
												x2: D,
												initial: !m && {
													y1: e.y0,
													y2: e.y1,
													pathLength: 0
												},
												animate: {
													y1: e.y0,
													y2: e.y1,
													pathLength: +!!Ce
												},
												transition: {
													y1: Se,
													y2: Se,
													pathLength: m ? { duration: 0 } : {
														duration: .7,
														ease: Q.ease.inOut,
														delay: .1 + a
													}
												}
											}),
											/* @__PURE__ */ F(K.circle, {
												className: xc.dot,
												cx: E,
												r: 4,
												initial: !m && {
													cy: e.y0,
													scale: 0
												},
												animate: {
													cy: e.y0,
													scale: +!!Ce
												},
												transition: {
													cy: Se,
													scale: m ? { duration: 0 } : {
														...Sc.snappy,
														delay: a
													}
												}
											}),
											/* @__PURE__ */ F(K.circle, {
												className: xc.dot,
												cx: D,
												r: 4,
												initial: !m && {
													cy: e.y1,
													scale: 0
												},
												animate: {
													cy: e.y1,
													scale: +!!Ce
												},
												transition: {
													cy: Se,
													scale: m ? { duration: 0 } : {
														...Sc.snappy,
														delay: .7 + a
													}
												}
											})
										]
									}, n);
								})
							]
						}), L.map((e, t) => {
							let n = e.item.key, r = oe === n, i = s === n, a = m ? 0 : t * .05;
							return /* @__PURE__ */ I("div", {
								className: xc.labels,
								"data-on": r || void 0,
								"data-accent": i || void 0,
								"data-dim": oe !== null && !r || void 0,
								"aria-hidden": "true",
								children: [/* @__PURE__ */ I(K.span, {
									className: xc.start,
									style: {
										right: x - E + 10,
										maxWidth: E - 10
									},
									initial: !m && {
										y: e.l0,
										opacity: 0
									},
									animate: {
										y: e.l0,
										opacity: +!!Ce
									},
									transition: {
										y: Se,
										opacity: {
											duration: .3,
											delay: a
										}
									},
									children: [/* @__PURE__ */ F("span", {
										className: xc.name,
										children: e.item.label
									}), /* @__PURE__ */ F("span", {
										className: xc.value,
										children: q(e.item.start)
									})]
								}), /* @__PURE__ */ I(K.span, {
									className: xc.end,
									style: { left: D + 10 },
									initial: !m && {
										y: e.l1,
										opacity: 0
									},
									animate: {
										y: e.l1,
										opacity: +!!Ce
									},
									transition: {
										y: Se,
										opacity: {
											duration: .3,
											delay: .7 + a
										}
									},
									children: [/* @__PURE__ */ F("span", {
										className: xc.value,
										children: q(e.item.end)
									}), u && /* @__PURE__ */ F(Mc, {
										move: e.rank0 - e.rank1,
										reduced: m
									})]
								})]
							}, n);
						})]
					})] }),
					/* @__PURE__ */ I(K.div, {
						ref: _,
						className: xc.tooltip,
						style: {
							x: m ? se : B,
							y: m ? ce : le
						},
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ F("p", {
								className: xc.tipTitle,
								children: G?.item.label ?? ""
							}),
							/* @__PURE__ */ I("p", {
								className: xc.tipRow,
								children: [/* @__PURE__ */ F("span", {
									className: xc.tipName,
									children: n
								}), /* @__PURE__ */ F("span", {
									className: xc.tipValue,
									children: G ? q(G.item.start) : ""
								})]
							}),
							/* @__PURE__ */ I("p", {
								className: xc.tipRow,
								children: [/* @__PURE__ */ F("span", {
									className: xc.tipName,
									children: r
								}), /* @__PURE__ */ F("span", {
									className: xc.tipValue,
									children: G ? q(G.item.end) : ""
								})]
							}),
							/* @__PURE__ */ F("p", {
								className: xc.tipMeta,
								children: G ? `${ve(G.item)}, ${ye(G)}` : ""
							})
						]
					}),
					y && /* @__PURE__ */ F("p", {
						className: xc.message,
						children: d
					})
				]
			}),
			/* @__PURE__ */ F("p", {
				className: xc.srOnly,
				"aria-live": "polite",
				"aria-atomic": "true",
				children: be
			}),
			/* @__PURE__ */ F("p", {
				className: xc.srOnly,
				children: Y
			}),
			!y && /* @__PURE__ */ F("div", {
				className: xc.srOnly,
				children: /* @__PURE__ */ I("table", { children: [
					/* @__PURE__ */ F("caption", { children: t }),
					/* @__PURE__ */ F("thead", { children: /* @__PURE__ */ I("tr", { children: [
						/* @__PURE__ */ F("th", {
							scope: "col",
							children: "Item"
						}),
						/* @__PURE__ */ F("th", {
							scope: "col",
							children: n
						}),
						/* @__PURE__ */ F("th", {
							scope: "col",
							children: r
						}),
						/* @__PURE__ */ F("th", {
							scope: "col",
							children: "Change"
						}),
						/* @__PURE__ */ F("th", {
							scope: "col",
							children: "Rank"
						})
					] }) }),
					/* @__PURE__ */ F("tbody", { children: re.map((e) => /* @__PURE__ */ I("tr", { children: [
						/* @__PURE__ */ F("th", {
							scope: "row",
							children: e.item.label
						}),
						/* @__PURE__ */ F("td", { children: q(e.item.start) }),
						/* @__PURE__ */ F("td", { children: q(e.item.end) }),
						/* @__PURE__ */ F("td", { children: ve(e.item) }),
						/* @__PURE__ */ I("td", { children: [
							e.rank0,
							" to ",
							e.rank1
						] })
					] }, e.item.key)) })
				] })
			})
		]
	});
}
var Pc = {
	figure: "_figure_117ho_3",
	caption: "_caption_117ho_3",
	label: "_label_117ho_3",
	accent: "_accent_117ho_4",
	success: "_success_117ho_4",
	warning: "_warning_117ho_4",
	danger: "_danger_117ho_4",
	point: "_point_117ho_6",
	roll: "_roll_117ho_9",
	track: "_track_117ho_11",
	slot: "_slot_117ho_11",
	glyph: "_glyph_117ho_11",
	sizer: "_sizer_117ho_13",
	plot: "_plot_117ho_16",
	chart: "_chart_117ho_19",
	baseline: "_baseline_117ho_20",
	area: "_area_117ho_22",
	line: "_line_117ho_23",
	trail: "_trail_117ho_23",
	cursor: "_cursor_117ho_26",
	end: "_end_117ho_27"
}, Fc = {
	hidden: (e) => ({
		opacity: 0,
		y: `${.3 * e}em`,
		filter: `blur(${Q.blur.soft}px)`
	}),
	shown: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: Q.duration.standard,
			ease: [...Q.ease.enter]
		}
	},
	gone: (e) => ({
		opacity: 0,
		y: `${-.3 * e}em`,
		filter: `blur(${Q.blur.subtle}px)`,
		transition: {
			duration: Q.duration.fast,
			ease: [...Q.ease.standard]
		}
	})
}, Ic = {
	hidden: {
		opacity: 0,
		y: 0,
		filter: "blur(0px)"
	},
	shown: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: Q.duration.instant }
	},
	gone: {
		opacity: 0,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: Q.duration.instant }
	}
}, Lc = (e) => Number(e.replace(/,/g, "").replace(/−/g, "-").match(/-?\d+(?:\.\d+)?/)?.[0] ?? NaN), Rc = new Intl.NumberFormat("en-US"), zc = {
	duration: Q.duration.considered * 1.75,
	ease: [...Q.ease.inOut]
}, Bc = {
	duration: Q.duration.fast,
	ease: [...Q.ease.standard]
};
function Vc(e, t) {
	if (!e) return [];
	if (t) return [{
		slot: "all",
		key: e,
		text: e
	}];
	if (!/\p{L}/u.test(e)) return [...e].map((e, t, n) => ({
		slot: `n${n.length - t}`,
		key: e,
		text: e
	}));
	let n = e.split(/(?<=\s)/);
	return n.map((e, t) => ({
		slot: `w${t}`,
		key: n.slice(0, t + 1).join(""),
		text: e
	}));
}
function Hc({ text: e, direction: t, whole: n = !1, morph: r = !1, tone: i }) {
	let a = !!Y(), o = H(null), s = J("auto"), [c, l] = U({
		text: e,
		direction: 1
	});
	c.text !== e && l({
		text: e,
		direction: t ?? (Lc(e) < Lc(c.text) ? -1 : 1)
	}), B(() => {
		let e = o.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = null, n = new ResizeObserver(([n]) => {
			if (!n) return;
			let r = n.borderBoxSize?.[0]?.inlineSize ?? e.offsetWidth;
			t !== null && t !== e.textContent && !a ? G(s, r, Q.spring.morph) : s.jump(r), t = e.textContent;
		});
		return n.observe(e), () => n.disconnect();
	}, [
		r,
		a,
		s
	]);
	let u = !n && !/\p{L}/u.test(e), d = a ? Ic : Fc, f = u ? "right" : "left";
	return /* @__PURE__ */ I(K.span, {
		className: Pc.roll,
		"data-end": u || void 0,
		"data-whole": n || void 0,
		style: r ? { width: s } : void 0,
		children: [r && /* @__PURE__ */ F("span", {
			ref: o,
			className: Pc.sizer,
			"aria-hidden": "true",
			children: e
		}), /* @__PURE__ */ F("span", {
			className: Pc.track,
			children: /* @__PURE__ */ F(fe, {
				mode: "popLayout",
				initial: !1,
				custom: c.direction,
				anchorX: f,
				children: Vc(e, n).map((e) => /* @__PURE__ */ F(K.span, {
					className: Pc.slot,
					custom: c.direction,
					variants: d,
					initial: "hidden",
					animate: "shown",
					exit: "gone",
					children: /* @__PURE__ */ F(fe, {
						mode: "popLayout",
						initial: !1,
						custom: c.direction,
						anchorX: f,
						children: /* @__PURE__ */ F(K.span, {
							className: i ? `${Pc.glyph} ${i}` : Pc.glyph,
							custom: c.direction,
							variants: d,
							initial: "hidden",
							animate: "shown",
							exit: "gone",
							children: e.text
						}, `${i ?? ""}${e.key}`)
					})
				}, e.slot))
			})
		})]
	});
}
var Uc = 5, Wc = 1.25, Gc = Array.from({ length: 161 }, (e, t) => t / 160);
function Kc(e) {
	let t = Math.min(...e), n = Math.max(...e) - t, r = e.map((e) => n ? (e - t) / n : .5), i = r.length - 1, a = 1 / i, o = r.slice(1).map((e, t) => (e - r[t]) / a), s = r.map((e, t) => t === 0 || t === i ? o[0] : (Math.sign(o[t - 1]) + Math.sign(o[t])) * Math.min(Math.abs(o[t - 1]), Math.abs(o[t]), Math.abs(o[t - 1] + o[t]) / 4) || 0);
	i > 1 && (s[0] = (3 * o[0] - s[1]) / 2, s[i] = (3 * o[i - 1] - s[i - 1]) / 2);
	let c = Math.max(1, Math.min(16, Math.round(128 / i))), l = [];
	for (let e = 0; e < i; e++) for (let t = 0; t < c; t++) {
		let n = t / c, i = n * n, o = i * n, u = (2 * o - 3 * i + 1) * r[e] + (o - 2 * i + n) * a * s[e] + (3 * i - 2 * o) * r[e + 1] + (o - i) * a * s[e + 1];
		l.push([(e + n) * a, Math.min(1, Math.max(0, u))]);
	}
	return l.push([1, r[i]]), l;
}
function qc(e, t) {
	let n = 0, r = e.length - 1;
	if (t <= e[n][0]) return e[n][1];
	if (t >= e[r][0]) return e[r][1];
	for (; r - n > 1;) {
		let i = n + r >> 1;
		e[i][0] < t ? n = i : r = i;
	}
	let [i, a] = e[n], [o, s] = e[r];
	return o === i ? s : a + (s - a) * (t - i) / (o - i);
}
function Jc(e, t, n, r) {
	let i = (e) => Uc + (1 - e) * (n - 10), a = e.map(([e, n]) => [e * t, i(n)]), o = a.map(([e, t]) => `${e.toFixed(2)},${t.toFixed(2)}`), s = r * t, c = i(qc(e, r));
	return {
		points: a,
		line: o.join(" "),
		trail: `M${o.join("L")}`,
		fill: `M${o.join("L")}L${t},${n}L0,${n}Z`,
		dot: `${s},${c} ${s},${c}`,
		cx: s
	};
}
function Yc(e, t) {
	let n = e.slice(1).map(([t, n], r) => Math.hypot(t - e[r][0], n - e[r][1])), r = t * n.reduce((e, t) => e + t, 0);
	for (let t = 0; t < n.length; t++) {
		let i = n[t], a = e[t][0];
		if (r <= i) return a + (e[t + 1][0] - a) * (i ? r / i : 1);
		r -= i;
	}
	return e[e.length - 1][0];
}
function Xc({ data: e, label: t, value: n, change: r, tone: i = "accent", width: a = 160, height: o = 52, labels: s, formatValue: c, area: l = !0, interactive: u = !0 }) {
	let d = e.length > 1 ? e : [e[0] ?? 0, e[0] ?? 0], f = d.length - 1, p = d.join(","), m = de(() => Kc(p.split(",").map(Number)), [p]), h = `${t}: ${n ?? d[f]}. ${r ?? ""}`.trim(), g = `sparkline${le().replace(/[^a-zA-Z0-9_-]/g, "")}`, _ = H(null), v = H(null), y = _e(_, {
		once: !0,
		amount: .5
	}), b = !!Y(), [x, S] = U({
		w: a,
		h: o
	}), [C, w] = U(null), [T, E] = U(!1), D = C === null ? null : Math.min(C, f), [O, k] = U({
		index: D,
		direction: 1
	});
	O.index !== D && k({
		index: D,
		direction: D === null || O.index === null ? 1 : Math.sign(D - O.index) || 1
	});
	let [A] = U(() => Jc(m, a, o, 1)), j = H(m), M = H(x), ee = J(0), te = J(1), N = J(A.line), ne = J(A.trail), P = J(A.fill), L = J(A.dot), re = J(A.cx), ie = J(A.cx + Wc + 16), R = J(A.cx + Wc), ae = J(0), oe = Se(ee, (e) => +(e > .001)), z = se(() => {
		let { w: e, h: t } = M.current, n = ee.get(), r = Jc(j.current, e, t, te.get());
		N.set(r.line), ne.set(r.trail), P.set(r.fill), L.set(r.dot), re.set(r.cx), ie.set(r.cx + Wc + 16), R.set(r.cx + Wc), ae.set(n >= 1 ? e + 32 : Yc(r.points, n) + 16);
	}, [
		te,
		re,
		R,
		L,
		ee,
		P,
		N,
		ie,
		ae,
		ne
	]);
	ye(te, "change", z), ye(ee, "change", z), V(() => {
		let e = v.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => {
			let t = e.clientWidth;
			t && S((e) => Math.abs(e.w - t) < .5 ? e : {
				w: t,
				h: t * o / a
			});
		});
		return t.observe(e), () => t.disconnect();
	}, [o, a]), V(() => {
		M.current = x, z();
	}, [x, z]), B(() => {
		if (b) {
			ee.jump(1);
			let e = requestAnimationFrame(() => E(!0));
			return () => cancelAnimationFrame(e);
		}
		if (!y) return;
		let e = G(ee, 1, {
			...zc,
			onComplete: () => E(!0)
		});
		return () => e.stop();
	}, [
		ee,
		y,
		b
	]), B(() => {
		let e = j.current;
		if (e === m) return;
		if (b) {
			j.current = m, z();
			return;
		}
		let t = [.../* @__PURE__ */ new Set([...Gc, ...m.map(([e]) => e)])].sort((e, t) => e - t), n = t.map((t) => qc(e, t)), r = t.map((e) => qc(m, e)), i = G(0, 1, {
			...Q.spring.smooth,
			onUpdate: (e) => {
				j.current = t.map((t, i) => [t, n[i] + (r[i] - n[i]) * e]), z();
			},
			onComplete: () => {
				j.current = m, z();
			}
		});
		return () => i.stop();
	}, [
		z,
		b,
		m
	]), B(() => {
		let e = D === null ? 1 : D / f;
		if (b) {
			te.jump(e);
			return;
		}
		let t = G(te, e, Q.spring.snappy);
		return () => t.stop();
	}, [
		te,
		D,
		f,
		b
	]);
	let ce = D !== null, ue = ((e) => c ? c(d[e], e) : Rc.format(d[e]))(D ?? f), W = s?.[D ?? f], fe = n === void 0 ? void 0 : ce ? ue : n, pe = D === null ? r ?? "" : n === void 0 ? [ue, W].filter(Boolean).join(" · ") : W ?? `${D + 1} of ${f + 1}`, me = (e) => {
		let t = v.current?.getBoundingClientRect();
		return t?.width ? Math.max(0, Math.min(f, Math.round((e - t.left) / t.width * f))) : f;
	}, he = u ? {
		role: "slider",
		tabIndex: 0,
		"aria-label": `${t}, explore values`,
		"aria-valuemin": 1,
		"aria-valuemax": f + 1,
		"aria-valuenow": (D ?? f) + 1,
		"aria-valuetext": `${W ?? (D === null ? "Latest" : `Point ${D + 1} of ${f + 1}`)}: ${ue}`,
		onPointerDown: (e) => w(me(e.clientX)),
		onPointerMove: (e) => {
			(e.pointerType === "mouse" || e.buttons) && w(me(e.clientX));
		},
		onPointerUp: (e) => {
			e.pointerType !== "mouse" && w(null);
		},
		onPointerLeave: () => w(null),
		onPointerCancel: () => w(null),
		onBlur: () => w(null),
		onKeyDown: (e) => {
			if (e.key === "Escape" && ce) {
				e.preventDefault(), w(null);
				return;
			}
			let t = D ?? f, n = Math.max(1, Math.round((f + 1) / 6)), r = {
				ArrowLeft: t - 1,
				ArrowDown: t - 1,
				ArrowRight: t + 1,
				ArrowUp: t + 1,
				PageDown: t - n,
				PageUp: t + n,
				Home: 0,
				End: f
			}[e.key];
			r !== void 0 && (e.preventDefault(), w(Math.max(0, Math.min(f, r))));
		}
	} : {};
	return /* @__PURE__ */ I("figure", {
		ref: _,
		className: Pc.figure,
		"aria-label": h,
		children: [/* @__PURE__ */ I("figcaption", {
			className: Pc.caption,
			children: [
				/* @__PURE__ */ F("span", {
					className: Pc.label,
					children: /* @__PURE__ */ F(Hc, {
						text: t,
						whole: !0
					})
				}),
				fe !== void 0 && /* @__PURE__ */ F("strong", { children: /* @__PURE__ */ F(Hc, {
					text: fe,
					morph: !0
				}) }),
				/* @__PURE__ */ F("small", {
					className: Pc[i],
					children: /* @__PURE__ */ F(Hc, {
						text: pe,
						direction: ce ? O.direction : void 0,
						tone: ce ? Pc.point : void 0,
						morph: !0
					})
				})
			]
		}), /* @__PURE__ */ F("div", {
			ref: v,
			className: Pc.plot,
			"data-interactive": u || void 0,
			...he,
			children: /* @__PURE__ */ I("svg", {
				className: Pc.chart,
				viewBox: `0 0 ${x.w} ${x.h}`,
				"aria-hidden": "true",
				focusable: "false",
				children: [
					/* @__PURE__ */ I("defs", { children: [
						/* @__PURE__ */ F("clipPath", {
							id: `${g}-lit`,
							clipPathUnits: "userSpaceOnUse",
							children: /* @__PURE__ */ F(K.rect, {
								x: -16,
								y: -16,
								width: ie,
								height: x.h + 32
							})
						}),
						/* @__PURE__ */ F("clipPath", {
							id: `${g}-dim`,
							clipPathUnits: "userSpaceOnUse",
							children: /* @__PURE__ */ F(K.rect, {
								x: R,
								y: -16,
								width: x.w + 32,
								height: x.h + 32
							})
						}),
						/* @__PURE__ */ F("clipPath", {
							id: `${g}-fill`,
							clipPathUnits: "userSpaceOnUse",
							children: /* @__PURE__ */ F(K.rect, {
								x: -16,
								y: -16,
								width: ae,
								height: x.h + 32
							})
						})
					] }),
					l && /* @__PURE__ */ F(K.path, {
						className: `${Pc.area} ${Pc[i]}`,
						d: P,
						clipPath: `url(#${g}-fill)`
					}),
					/* @__PURE__ */ F("line", {
						className: Pc.baseline,
						x1: "0",
						y1: x.h - .5,
						x2: x.w,
						y2: x.h - .5
					}),
					/* @__PURE__ */ F(K.path, {
						className: Pc.trail,
						d: ne,
						clipPath: `url(#${g}-dim)`,
						initial: !1,
						animate: { opacity: ce && T ? 1 : 0 },
						transition: b ? { duration: 0 } : Bc
					}),
					/* @__PURE__ */ F(K.polyline, {
						className: [Pc.line, Pc[i]].join(" "),
						points: N,
						clipPath: `url(#${g}-lit)`,
						style: {
							pathLength: ee,
							opacity: oe
						}
					}),
					/* @__PURE__ */ F(K.line, {
						className: Pc.cursor,
						x1: re,
						x2: re,
						y1: 0,
						y2: x.h,
						initial: !1,
						animate: { opacity: +!!ce },
						transition: b ? { duration: 0 } : Bc
					}),
					/* @__PURE__ */ F(K.polyline, {
						className: [Pc.end, Pc[i]].join(" "),
						points: L,
						initial: !1,
						animate: {
							opacity: +!!T,
							strokeWidth: T ? ce ? 10 : 7 : 0
						},
						transition: b ? { duration: 0 } : {
							opacity: Bc,
							strokeWidth: Q.spring.snappy
						},
						fill: "none",
						strokeLinecap: "round"
					})
				]
			})
		})]
	});
}
var Zc = {
	counter: "_counter_hc5xv_3",
	label: "_label_hc5xv_4",
	value: "_value_hc5xv_6",
	column: "_column_hc5xv_8",
	sizer: "_sizer_hc5xv_9",
	glyph: "_glyph_hc5xv_10",
	labelText: "_labelText_hc5xv_11",
	labelSwap: "_labelSwap_hc5xv_12",
	symbol: "_symbol_hc5xv_13",
	srOnly: "_srOnly_hc5xv_14"
}, Qc = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9
], $c = {
	hidden: {
		opacity: 0,
		y: "0.3em",
		filter: `blur(${Q.blur.soft}px)`
	},
	shown: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: Q.duration.standard,
			ease: [...Q.ease.enter]
		}
	},
	gone: {
		opacity: 0,
		y: "-0.3em",
		filter: `blur(${Q.blur.subtle}px)`,
		transition: {
			duration: Q.duration.fast,
			ease: [...Q.ease.standard]
		}
	}
}, el = {
	hidden: {
		opacity: 0,
		y: 0,
		filter: "blur(0px)"
	},
	shown: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: Q.duration.instant }
	},
	gone: {
		opacity: 0,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: Q.duration.instant }
	}
}, tl = {
	...Q.spring.smooth,
	visualDuration: Q.duration.considered
};
function nl(e, t, n) {
	let r = new Intl.NumberFormat(n, {
		minimumFractionDigits: t,
		maximumFractionDigits: t,
		numberingSystem: "latn"
	}).formatToParts(e), i = r.reduce((e, t) => e + (t.type === "integer" ? t.value.length : 0), 0), a = 0, o = 0;
	return r.flatMap((e, t) => e.type === "integer" ? [...e.value].map((e) => ({
		key: `i${--i}`,
		digit: Number(e),
		order: o++
	})) : e.type === "fraction" ? [...e.value].map((e) => ({
		key: `f${a++}`,
		digit: Number(e),
		order: o++
	})) : [{
		key: e.type === "group" ? `g${i}` : e.type === "decimal" ? "d" : `${e.type}${t}`,
		text: e.value
	}]);
}
function rl({ position: e, digit: t }) {
	let n = Se(e, (e) => ((t - e) % 10 + 15) % 10 - 5), r = Se(n, (e) => `${e}em`), i = Se(n, (e) => Math.max(0, 1 - Math.abs(e))), a = Se(n, (e) => Math.abs(e) >= 1 ? "hidden" : "visible"), o = Se(n, (e) => Math.abs(e) < .02 || Math.abs(e) >= 1 ? "none" : `blur(${(Math.abs(e) * Q.blur.subtle).toFixed(2)}px)`);
	return /* @__PURE__ */ F(K.span, {
		className: Zc.glyph,
		style: {
			y: r,
			opacity: i,
			filter: o,
			visibility: a
		},
		children: t
	});
}
var il = {
	initial: {
		width: 0,
		opacity: 0
	},
	animate: {
		width: "auto",
		opacity: 1
	},
	exit: {
		width: 0,
		opacity: 0
	}
};
function al({ digit: e, direction: t, armed: n, delay: r, reduceMotion: i }) {
	let a = J(n ? 0 : e), o = H({
		digit: n ? 0 : e,
		target: n ? 0 : e,
		revealed: !n
	});
	return B(() => {
		let s = o.current;
		if (n || s.digit === e) {
			n || (s.revealed = !0);
			return;
		}
		s.target += t < 0 && s.revealed ? -((s.digit - e + 10) % 10) : (e - s.digit + 10) % 10, s.digit = e, i ? a.jump(s.target) : G(a, s.target, s.revealed ? Q.spring.smooth : {
			...tl,
			delay: r
		}), s.revealed = !0;
	}, [
		n,
		r,
		e,
		t,
		a,
		i
	]), /* @__PURE__ */ I(K.span, {
		className: Zc.column,
		...il,
		transition: i ? { duration: 0 } : Q.spring.morph,
		children: [/* @__PURE__ */ F("span", {
			className: Zc.sizer,
			children: "0"
		}), Qc.map((e) => /* @__PURE__ */ F(rl, {
			position: a,
			digit: e
		}, e))]
	});
}
function ol({ value: e, label: t, prefix: n = "", suffix: r = "", decimals: i = 0, animateOnView: a = !1, locale: o = "en-US" }) {
	let s = H(null), c = _e(s, {
		once: !0,
		amount: .6
	}), l = !!Y(), [u, d] = U(e), [f, p] = U(1);
	e !== u && (d(e), p(e > u ? 1 : -1));
	let m = nl(e, i, o), h = `${n}${m.map((e) => "text" in e ? e.text : e.digit).join("")}${r}`, g = a && !c;
	return /* @__PURE__ */ I("span", {
		ref: s,
		className: Zc.counter,
		children: [
			t && /* @__PURE__ */ F("span", {
				className: Zc.label,
				children: /* @__PURE__ */ F("span", {
					className: Zc.labelSwap,
					children: /* @__PURE__ */ F(fe, {
						mode: "popLayout",
						initial: !1,
						children: /* @__PURE__ */ F(K.span, {
							className: Zc.labelText,
							variants: l ? el : $c,
							initial: "hidden",
							animate: "shown",
							exit: "gone",
							children: t
						}, t)
					})
				})
			}),
			/* @__PURE__ */ F("span", {
				className: Zc.srOnly,
				children: h
			}),
			/* @__PURE__ */ I("span", {
				className: Zc.value,
				"aria-hidden": "true",
				children: [
					n && /* @__PURE__ */ F("span", {
						className: Zc.symbol,
						children: n
					}),
					/* @__PURE__ */ F(fe, {
						initial: !1,
						children: m.map((e) => "digit" in e ? /* @__PURE__ */ F(al, {
							digit: e.digit,
							direction: f,
							armed: g,
							delay: Math.min(e.order * Q.stagger.item, .25),
							reduceMotion: l
						}, e.key) : /* @__PURE__ */ F(K.span, {
							className: Zc.symbol,
							...il,
							transition: l ? { duration: 0 } : Q.spring.morph,
							children: e.text
						}, e.key))
					}),
					r && /* @__PURE__ */ F("span", {
						className: Zc.symbol,
						children: r
					})
				]
			})
		]
	});
}
var sl = {
	card: "_card_4wx45_3",
	top: "_top_4wx45_4",
	swap: "_swap_4wx45_10",
	swapBlock: "_swapBlock_4wx45_10",
	text: "_text_4wx45_13",
	sizer: "_sizer_4wx45_15"
}, cl = {
	hidden: (e) => ({
		opacity: 0,
		y: `${.3 * e}em`,
		filter: `blur(${Q.blur.soft}px)`
	}),
	shown: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: Q.duration.standard,
			ease: [...Q.ease.enter]
		}
	},
	gone: (e) => ({
		opacity: 0,
		y: `${-.3 * e}em`,
		filter: `blur(${Q.blur.subtle}px)`,
		transition: {
			duration: Q.duration.fast,
			ease: [...Q.ease.standard]
		}
	})
}, ll = {
	hidden: {
		opacity: 0,
		y: 0,
		filter: "blur(0px)"
	},
	shown: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: Q.duration.instant }
	},
	gone: {
		opacity: 0,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: Q.duration.instant }
	}
}, ul = (e) => Number(e.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/)?.[0] ?? NaN);
function dl({ text: e, morph: t = !1, block: n = !1 }) {
	let r = !!Y(), i = H(null), a = J("auto"), [o, s] = U({
		text: e,
		direction: 1
	});
	return o.text !== e && s({
		text: e,
		direction: ul(e) < ul(o.text) ? -1 : 1
	}), B(() => {
		let e = i.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = null, n = new ResizeObserver(([n]) => {
			if (!n) return;
			let i = n.borderBoxSize?.[0]?.inlineSize ?? e.offsetWidth;
			i && t !== null && t !== e.textContent && !r ? G(a, i, Q.spring.morph) : a.jump(i || "auto"), t = i ? e.textContent : null;
		});
		return n.observe(e), () => n.disconnect();
	}, [
		t,
		r,
		a
	]), /* @__PURE__ */ I(K.span, {
		className: n ? sl.swapBlock : sl.swap,
		style: t ? { width: a } : void 0,
		children: [t && /* @__PURE__ */ F("span", {
			ref: i,
			className: sl.sizer,
			"aria-hidden": "true",
			children: e
		}), /* @__PURE__ */ F(fe, {
			mode: "popLayout",
			initial: !1,
			custom: o.direction,
			children: /* @__PURE__ */ F(K.span, {
				className: sl.text,
				custom: o.direction,
				variants: r ? ll : cl,
				initial: "hidden",
				animate: "shown",
				exit: "gone",
				children: e
			}, e)
		})]
	});
}
function fl({ label: e, value: t, suffix: n, context: r, change: i }) {
	let a = !!Y();
	return /* @__PURE__ */ I("article", {
		className: sl.card,
		children: [
			/* @__PURE__ */ I("div", {
				className: sl.top,
				children: [/* @__PURE__ */ F("span", { children: /* @__PURE__ */ F(dl, {
					text: e,
					block: !0
				}) }), /* @__PURE__ */ F(fe, {
					initial: !1,
					children: i && /* @__PURE__ */ F(K.small, {
						"data-trend": /^[+]/.test(i) ? "up" : /^[-−]/.test(i) ? "down" : void 0,
						initial: {
							opacity: 0,
							scale: a ? 1 : .96
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: a ? 1 : .96,
							transition: {
								duration: Q.duration.fast,
								ease: [...Q.ease.standard]
							}
						},
						transition: a ? { duration: 0 } : Q.spring.snappy,
						children: /* @__PURE__ */ F(dl, {
							text: i,
							morph: !0
						})
					}, "change")
				})]
			}),
			/* @__PURE__ */ F(ol, {
				value: t,
				suffix: n,
				animateOnView: !0
			}),
			/* @__PURE__ */ F("p", { children: /* @__PURE__ */ F(dl, {
				text: r,
				block: !0
			}) })
		]
	});
}
var pl = {
	root: "_root_luvk4_4",
	track: "_track_luvk4_6",
	button: "_button_luvk4_11",
	selection: "_selection_luvk4_14",
	label: "_label_luvk4_15"
};
//#endregion
//#region src/arc/components/segmented-control/segmented-control.tsx
function ml({ options: e, value: t, onValueChange: n, label: r, onOptionIntent: i, size: a = "default", className: o }) {
	let s = le(), c = Y(), l = H(null);
	V(() => {
		let e = l.current;
		if (!e) return;
		let t = () => {
			let t = e.scrollWidth - e.clientWidth - e.scrollLeft;
			e.toggleAttribute("data-fade-start", e.scrollLeft > 1), e.toggleAttribute("data-fade-end", t > 1);
		};
		t(), e.addEventListener("scroll", t, { passive: !0 });
		let n = typeof ResizeObserver > "u" ? null : new ResizeObserver(t);
		return n?.observe(e), () => {
			e.removeEventListener("scroll", t), n?.disconnect();
		};
	}, [e.length]);
	let u = H(!0);
	B(() => {
		let e = l.current, t = e?.querySelector("[aria-pressed=\"true\"]");
		if (!e || !t || e.scrollWidth <= e.clientWidth) {
			u.current = !1;
			return;
		}
		let n = t.offsetLeft - 20, r = t.offsetLeft + t.offsetWidth + 20 - e.clientWidth, i = e.scrollLeft > n ? n : e.scrollLeft < r ? r : e.scrollLeft;
		i !== e.scrollLeft && e.scrollTo({
			left: Math.max(0, i),
			behavior: u.current || c ? "auto" : "smooth"
		}), u.current = !1;
	}, [t, c]);
	let d = Math.max(0, e.findIndex((e) => e.value === t)), f = (t) => {
		let r = e.length - 1, i = t.key === "ArrowRight" || t.key === "ArrowDown" ? d === r ? 0 : d + 1 : t.key === "ArrowLeft" || t.key === "ArrowUp" ? d === 0 ? r : d - 1 : t.key === "Home" ? 0 : t.key === "End" ? r : -1;
		i < 0 || !e[i] || (t.preventDefault(), n(e[i].value), l.current?.querySelector(`[data-value="${CSS.escape(e[i].value)}"]`)?.focus({ preventScroll: !0 }));
	};
	return /* @__PURE__ */ F("div", {
		className: `${pl.root} ${o ?? ""}`,
		"data-size": a === "small" ? "small" : void 0,
		role: "group",
		"aria-label": r,
		children: /* @__PURE__ */ F(pe, {
			id: s,
			children: /* @__PURE__ */ F(K.div, {
				ref: l,
				layoutScroll: !0,
				className: pl.track,
				children: e.map((e, r) => /* @__PURE__ */ I("button", {
					id: `${s}-${e.value}`,
					className: pl.button,
					type: "button",
					"data-value": e.value,
					"aria-pressed": t === e.value,
					tabIndex: r === d ? 0 : -1,
					onClick: () => n(e.value),
					onKeyDown: f,
					onPointerEnter: i ? () => i(e.value) : void 0,
					onFocus: i ? () => i(e.value) : void 0,
					children: [t === e.value && /* @__PURE__ */ F(K.span, {
						className: pl.selection,
						layoutId: "selection",
						layoutDependency: t,
						transition: c ? { duration: 0 } : Q.spring.morph,
						"aria-hidden": "true"
					}), /* @__PURE__ */ I("span", {
						className: pl.label,
						children: [e.label, e.accessory]
					})]
				}, e.value))
			})
		})
	});
}
//#endregion
//#region src/arc/icons.tsx
var hl = ({ size: e, strokeWidth: t, ...n }) => /* @__PURE__ */ F(u, {
	size: 16,
	...n
}), gl = ({ size: e, strokeWidth: t, ...n }) => /* @__PURE__ */ F(p, {
	size: 12,
	weight: "bold",
	...n
}), _l = ({ size: e, strokeWidth: t, ...n }) => /* @__PURE__ */ F(m, {
	size: 16,
	...n
}), vl = ({ size: e, strokeWidth: t, ...n }) => /* @__PURE__ */ F(h, {
	size: 16,
	...n
}), yl = (e) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`, bl = (e) => {
	let [t = 1970, n = 1, r = 1] = e.split("-").map(Number);
	return new Date(t, n - 1, r);
}, xl = (e) => {
	let t = 0, n = () => {
		let r = /* @__PURE__ */ new Date(), i = new Date(r.getFullYear(), r.getMonth(), r.getDate() + 1);
		t = window.setTimeout(() => {
			e(), n();
		}, i.getTime() - r.getTime() + 1e3);
	}, r = () => {
		document.visibilityState === "visible" && e();
	};
	return n(), document.addEventListener("visibilitychange", r), window.addEventListener("focus", e), () => {
		window.clearTimeout(t), document.removeEventListener("visibilitychange", r), window.removeEventListener("focus", e);
	};
}, Sl = () => yl(/* @__PURE__ */ new Date()), Cl = () => "";
function wl() {
	let e = W(xl, Sl, Cl);
	return de(() => e ? bl(e) : void 0, [e]);
}
var $ = {
	root: "_root_29ua2_4",
	surface: "_surface_29ua2_17",
	trigger: "_trigger_29ua2_36",
	triggerIcon: "_triggerIcon_29ua2_56",
	chevron: "_chevron_29ua2_56",
	value: "_value_29ua2_58",
	rolling: "_rolling_29ua2_62",
	word: "_word_29ua2_63",
	wordInner: "_wordInner_29ua2_64",
	panel: "_panel_29ua2_67",
	body: "_body_29ua2_68",
	rail: "_rail_29ua2_70",
	railHighlight: "_railHighlight_29ua2_71",
	preset: "_preset_29ua2_72",
	calendars: "_calendars_29ua2_92",
	navButton: "_navButton_29ua2_93",
	viewport: "_viewport_29ua2_116",
	months: "_months_29ua2_118",
	month: "_month_29ua2_118",
	monthTitle: "_monthTitle_29ua2_120",
	grid: "_grid_29ua2_121",
	weekdays: "_weekdays_29ua2_122",
	weeks: "_weeks_29ua2_123",
	week: "_week_29ua2_122",
	cell: "_cell_29ua2_125",
	blank: "_blank_29ua2_125",
	layer: "_layer_29ua2_128",
	bar: "_bar_29ua2_129",
	thumb: "_thumb_29ua2_130",
	day: "_day_29ua2_133",
	footer: "_footer_29ua2_160",
	summary: "_summary_29ua2_161",
	summaryValue: "_summaryValue_29ua2_162",
	summaryCount: "_summaryCount_29ua2_163",
	actions: "_actions_29ua2_164",
	ghost: "_ghost_29ua2_165",
	primary: "_primary_29ua2_165",
	srOnly: "_srOnly_29ua2_187"
}, Tl = 864e5, El = (e) => new Date(e.getFullYear(), e.getMonth(), e.getDate()), Dl = (e) => new Date(e.getFullYear(), e.getMonth(), 1), Ol = (e) => new Date(e.getFullYear(), e.getMonth() + 1, 0), kl = (e, t) => new Date(e.getFullYear(), e.getMonth(), e.getDate() + t), Al = (e, t) => new Date(e.getFullYear(), e.getMonth() + t, 1), jl = (e, t) => new Date(e.getFullYear(), e.getMonth() + t, Math.min(e.getDate(), new Date(e.getFullYear(), e.getMonth() + t + 1, 0).getDate())), Ml = (e, t) => Math.round((El(e).getTime() - El(t).getTime()) / Tl), Nl = (e, t) => (e.getFullYear() - t.getFullYear()) * 12 + e.getMonth() - t.getMonth(), Pl = (e, t) => !!(e && t && Ml(e, t) === 0), Fl = (e) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`, Il = (e) => {
	let [t, n, r] = e.split("-").map(Number);
	return new Date(t, n - 1, r);
}, Ll = (e, t) => Ml(e, t) <= 0 ? {
	start: e,
	end: t
} : {
	start: t,
	end: e
}, Rl = (e, t) => !!(e && t && Pl(e.start, t.start) && Pl(e.end, t.end)), zl = (e, t, n) => t && Ml(e, t) < 0 ? El(t) : n && Ml(e, n) > 0 ? El(n) : e, Bl = [
	{
		label: "Today",
		range: (e) => ({
			start: e,
			end: e
		})
	},
	{
		label: "Yesterday",
		range: (e) => ({
			start: kl(e, -1),
			end: kl(e, -1)
		})
	},
	{
		label: "Last 7 days",
		range: (e) => ({
			start: kl(e, -6),
			end: e
		})
	},
	{
		label: "Last 30 days",
		range: (e) => ({
			start: kl(e, -29),
			end: e
		})
	},
	{
		label: "This month",
		range: (e) => ({
			start: Dl(e),
			end: e
		})
	},
	{
		label: "Last month",
		range: (e) => ({
			start: Al(e, -1),
			end: Ol(Al(e, -1))
		})
	},
	{
		label: "This quarter",
		range: (e) => ({
			start: new Date(e.getFullYear(), Math.floor(e.getMonth() / 3) * 3, 1),
			end: e
		})
	},
	{
		label: "Year to date",
		range: (e) => ({
			start: new Date(e.getFullYear(), 0, 1),
			end: e
		})
	}
], Vl = () => () => {};
function Hl() {
	let e = W(Vl, () => !0, () => !1);
	return !!Y() && e;
}
var { blur: Ul } = Q, Wl = [...Q.ease.enter], Gl = [...Q.ease.standard], Kl = (e, t) => {
	let n = 2 * Math.PI / (e * 1.2);
	return {
		type: "spring",
		stiffness: n * n,
		damping: 2 * (1 - t) * n,
		mass: 1
	};
}, ql = Kl(.48, 0), Jl = Kl(.38, 0), Yl = Kl(.3, 0), Xl = Kl(.3, 0), Zl = Kl(.4, 0), Ql = !0, $l = [{
	opacity: 0,
	scale: "0.96",
	translate: "0 -4px"
}, {
	opacity: 1,
	scale: "1",
	translate: "0 0"
}], eu = {
	duration: 150,
	easing: "cubic-bezier(0.16, 1, 0.3, 1)"
}, tu = 18, nu = 26, ru = 36, iu = 712, au = 8, ou = (e, t, n) => {
	let r = e ? parseFloat(getComputedStyle(e).getPropertyValue(t)) : NaN;
	return Number.isFinite(r) ? r : n;
}, su = {
	enter: (e) => ({
		opacity: 0,
		y: `${e * .45}em`,
		filter: `blur(${Ul.subtle}px)`
	}),
	center: {
		opacity: 1,
		y: "0em",
		filter: "blur(0px)",
		transition: {
			duration: .26,
			ease: Wl
		}
	},
	exit: (e) => ({
		opacity: 0,
		y: `${e * -.45}em`,
		filter: `blur(${Ul.subtle}px)`,
		transition: {
			duration: .14,
			ease: Gl
		}
	})
}, cu = {
	enter: { opacity: 0 },
	center: {
		opacity: 1,
		y: "0em",
		filter: "blur(0px)",
		transition: { duration: .12 }
	},
	exit: {
		opacity: 0,
		transition: { duration: .08 }
	}
};
`${Ul.soft}`, `${Ul.soft}`;
var lu = {
	hidden: { opacity: 0 },
	shown: {
		opacity: 1,
		transition: { duration: .12 }
	},
	gone: {
		opacity: 0,
		transition: { duration: .08 }
	}
}, uu = {
	enter: (e) => ({
		opacity: 0,
		x: e * 48
	}),
	center: {
		opacity: 1,
		x: 0,
		transition: {
			x: Zl,
			opacity: {
				duration: .22,
				ease: Wl
			}
		}
	},
	exit: (e) => ({
		opacity: 0,
		x: e * -36,
		transition: {
			x: Zl,
			opacity: {
				duration: .14,
				ease: Gl
			}
		}
	})
};
function du({ text: e, direction: t, reduced: n }) {
	let r = e.split(/\s+/).filter(Boolean);
	return /* @__PURE__ */ F("span", {
		className: $.rolling,
		"aria-hidden": "true",
		children: r.map((e, r) => /* @__PURE__ */ F("span", {
			className: $.word,
			children: /* @__PURE__ */ F(fe, {
				initial: !1,
				mode: "popLayout",
				custom: t,
				children: /* @__PURE__ */ F(K.span, {
					className: $.wordInner,
					custom: t,
					variants: n ? cu : su,
					initial: "enter",
					animate: "center",
					exit: "exit",
					children: e
				}, e)
			})
		}, r))
	});
}
function fu(e) {
	let t = e ? e.start.getTime() * 2 + e.end.getTime() : null, [n, r] = U(t), [i, a] = U(1);
	return t !== n && (r(t), a(t === null || n === null || t >= n ? 1 : -1)), i;
}
var pu = (e, t) => {
	let n = Ml(e, t);
	return {
		row: Math.floor(n / 7),
		col: n % 7
	};
};
function mu({ row: e, segment: t, reduced: n }) {
	let r = J(t?.left ?? 0), i = J(t?.width ?? 0), a = J(+!!t), o = Se(r, (e) => `${e}%`), s = Se(i, (e) => `${e}%`), c = H(!t);
	return V(() => {
		if (!t) {
			c.current = !0, G(a, 0, { duration: n ? 0 : .14 });
			return;
		}
		c.current || n ? (r.jump(t.left), i.jump(t.width)) : (G(r, t.left, Yl), G(i, t.width, Yl)), c.current = !1, G(a, 1, { duration: n ? 0 : .16 });
	}, [
		r,
		a,
		n,
		t,
		i
	]), /* @__PURE__ */ F(K.span, {
		className: $.bar,
		style: {
			left: o,
			width: s,
			opacity: a,
			top: `calc(${e} * var(--cell) + 3px)`
		}
	});
}
function hu({ cell: e, reduced: t }) {
	let n = J(e?.col ?? 0), r = J(e?.row ?? 0), i = J(+!!e), a = J(e ? 1 : .8), o = Se(() => `translate(${n.get() * 100}%, ${r.get() * 100}%) scale(${a.get()})`), s = H(!e);
	return V(() => {
		if (!e) {
			s.current = !0, G(i, 0, { duration: t ? 0 : .12 }), G(a, .8, { duration: t ? 0 : .12 });
			return;
		}
		s.current || t ? (n.jump(e.col), r.jump(e.row)) : (G(n, e.col, Xl), G(r, e.row, Xl)), s.current = !1, G(i, 1, { duration: t ? 0 : .16 }), G(a, 1, t ? { duration: 0 } : Xl);
	}, [
		e,
		i,
		t,
		a,
		n,
		r
	]), /* @__PURE__ */ F(K.span, {
		className: $.thumb,
		style: {
			transform: o,
			opacity: i
		}
	});
}
function gu({ month: e, range: t, tabbable: n, today: r, minDate: i, maxDate: a, weekStartsOn: o, reduced: s, formatters: c, onPick: l, onHover: u, onKey: d, onFocusDay: f, idBase: p }) {
	let m = de(() => kl(e, -((e.getDay() - o + 7) % 7)), [e, o]), h = de(() => Array.from({ length: 6 }, (e, t) => Array.from({ length: 7 }, (e, n) => kl(m, t * 7 + n))), [m]), g = `${p}-${Fl(e)}`, _ = (t) => Nl(t, e) === 0, v = t?.start, y = t?.end, b = v ? Fl(v) : "", x = y ? Fl(y) : "", S = de(() => {
		if (!b || !x) return h.map(() => null);
		let t = Il(b), n = Il(x), r = 100 / 7, i = (e) => Ml(e, m) % 7;
		return h.map((a) => {
			let o = a.filter((t) => Nl(t, e) === 0);
			if (!o.length) return null;
			let s = o[0], c = o[o.length - 1], l = Ml(t, s) > 0 ? t : s, u = Ml(n, c) < 0 ? n : c;
			if (Ml(l, u) <= 0) {
				let e = i(l), t = i(u);
				return {
					left: e * r,
					width: (t - e + 1) * r
				};
			}
			return Ml(c, t) < 0 ? {
				left: (i(c) + 1) * r,
				width: 0
			} : {
				left: i(s) * r,
				width: 0
			};
		});
	}, [
		m,
		x,
		b,
		e,
		h
	]), C = de(() => b && Nl(Il(b), e) === 0 ? pu(Il(b), m) : null, [
		b,
		e,
		m
	]), w = de(() => x && x !== b && Nl(Il(x), e) === 0 ? pu(Il(x), m) : null, [
		x,
		b,
		e,
		m
	]);
	return /* @__PURE__ */ I("div", {
		className: $.month,
		children: [/* @__PURE__ */ F("p", {
			id: g,
			className: $.monthTitle,
			children: c.title.format(e)
		}), /* @__PURE__ */ I("div", {
			role: "grid",
			"aria-labelledby": g,
			className: $.grid,
			children: [/* @__PURE__ */ F("div", {
				role: "row",
				className: $.weekdays,
				children: h[0].map((e) => /* @__PURE__ */ F("span", {
					role: "columnheader",
					"aria-label": c.weekdayLong.format(e),
					children: c.weekday.format(e).slice(0, 2)
				}, e.getDay()))
			}), /* @__PURE__ */ I("div", {
				className: $.weeks,
				children: [/* @__PURE__ */ I("span", {
					className: $.layer,
					"aria-hidden": "true",
					children: [
						S.map((e, t) => /* @__PURE__ */ F(mu, {
							row: t,
							segment: e,
							reduced: s
						}, t)),
						/* @__PURE__ */ F(hu, {
							cell: C,
							reduced: s
						}),
						/* @__PURE__ */ F(hu, {
							cell: w,
							reduced: s
						})
					]
				}), h.map((e, t) => /* @__PURE__ */ F("div", {
					role: "row",
					className: $.week,
					children: e.map((e) => {
						if (!_(e)) return /* @__PURE__ */ F("span", {
							role: "gridcell",
							className: $.blank
						}, Fl(e));
						let t = Fl(e), o = !!(i && Ml(e, i) < 0 || a && Ml(e, a) > 0), s = !!(v && y && Ml(e, v) >= 0 && Ml(e, y) <= 0), p = Pl(e, v) || Pl(e, y), m = Pl(e, r);
						return /* @__PURE__ */ F("span", {
							role: "gridcell",
							"aria-selected": s,
							className: $.cell,
							children: /* @__PURE__ */ F("button", {
								type: "button",
								className: $.day,
								"data-date": t,
								"data-edge": p || void 0,
								"data-range": s || void 0,
								"data-today": m || void 0,
								tabIndex: t === n ? 0 : -1,
								disabled: o,
								"aria-current": m ? "date" : void 0,
								"aria-label": c.day.format(e),
								onClick: () => l(e),
								onPointerEnter: () => {
									o || u(e);
								},
								onFocus: () => f(e),
								onKeyDown: (t) => d(t, e),
								children: /* @__PURE__ */ F("span", { children: e.getDate() })
							})
						}, t);
					})
				}, t))]
			})]
		})]
	});
}
function _u({ children: e, direction: t, reduced: n }) {
	let r = ve();
	return /* @__PURE__ */ F(K.div, {
		className: $.months,
		"data-current": r || void 0,
		inert: !r || void 0,
		custom: t,
		variants: n ? cu : uu,
		initial: "enter",
		animate: "center",
		exit: "exit",
		children: e
	});
}
function vu({ value: e, defaultValue: t = null, onChange: n, label: r = "Date range", placeholder: i = "Select dates", presets: a = Bl, minDate: o, maxDate: s, weekStartsOn: c = 0, locale: l = "en-US", months: u = "auto", boundary: d, className: f }) {
	let p = Hl(), m = wl(), h = le(), [g, _] = U(t), v = e === void 0 ? g : e, [y, b] = U(!1), [x, S] = U(!1), [C, w] = U(0), [T, E] = U(() => Dl(v?.end ?? new Date(2e3, 0, 1))), [D, O] = U(1), [k, A] = U(v), [j, M] = U(null), [ee, te] = U(null), [N, ne] = U(""), P = de(() => ({
		label: new Intl.DateTimeFormat(l, {
			month: "short",
			day: "numeric",
			year: "numeric"
		}),
		title: new Intl.DateTimeFormat(l, {
			month: "long",
			year: "numeric"
		}),
		day: new Intl.DateTimeFormat(l, {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric"
		}),
		weekday: new Intl.DateTimeFormat(l, { weekday: "short" }),
		weekdayLong: new Intl.DateTimeFormat(l, { weekday: "long" })
	}), [l]), L = se((e) => e ? Pl(e.start, e.end) ? P.label.format(e.start) : P.label.formatRange(e.start, e.end) : i, [P, i]), re = x ? 1 : 2, ie = de(() => Array.from({ length: re }, (e, t) => Al(T, t)), [re, T]), R = j ? Ll(j, ee ?? j) : k, ae = m && !j ? a.findIndex((e) => Rl(e.range(m), k)) : -1, oe = R ? Ml(R.end, R.start) + 1 : 0, z = fu(v), ce = fu(R), ue = H(null), W = H(null), pe = H(null), me = H(null), he = H(null), ge = H(null), q = H(null), _e = J("100%"), ve = J("100%"), ye = J(`var(--trigger-radius, ${tu}px)`), be = J(0), Y = J("auto"), xe = H({
		trigger: {
			w: 0,
			h: 0
		},
		panel: null
	}), Se = H({
		open: !1,
		reduced: !1,
		ready: !1
	}), Ce = H(!1), we = H(d);
	V(() => {
		we.current = d;
	}, [d]);
	let Te = se(() => {
		let e = we.current?.(), t = {
			left: 0,
			right: document.documentElement.clientWidth
		};
		if (!e) return t;
		let n = e.getBoundingClientRect();
		return {
			left: Math.max(t.left, n.left),
			right: Math.min(t.right, n.right)
		};
	}, []), Ee = se(() => {
		Ce.current = !1;
		let { trigger: e, panel: t } = xe.current, n = Se.current;
		if (!e.w) return;
		let r = n.open && t ? t : null, i = r ?? e, a = 0;
		if (r && ue.current) {
			let e = ue.current.getBoundingClientRect(), t = Te();
			a = Math.min(0, t.right - au - (e.left + r.w)), a = Math.max(a, t.left + au - e.left);
		}
		let o = r ? ou(ue.current, "--panel-radius", nu) : ou(ue.current, "--trigger-radius", tu), s = ge.current;
		if (n.ready && s) {
			let t = () => {
				_e.jump(i.w), ve.jump(i.h), ye.jump(o), be.jump(a), Y.jump(e.w);
			};
			if (r) t(), q.current?.cancel(), q.current = null, s.hasAttribute("data-panel") || (s.setAttribute("data-panel", ""), n.reduced || s.animate($l, eu));
			else if (s.hasAttribute("data-panel") && !n.open && !q.current) {
				let e = () => {
					q.current?.cancel(), q.current = null, !Se.current.open && (s.removeAttribute("data-panel"), Ee());
				};
				n.reduced ? e() : (q.current = s.animate($l, {
					...eu,
					direction: "reverse",
					fill: "forwards"
				}), q.current.onfinish = e);
			} else s.hasAttribute("data-panel") || t();
			return;
		}
		if (!n.ready || n.reduced || Ql) {
			_e.jump(i.w), ve.jump(i.h), ye.jump(o), be.jump(a), Y.jump(e.w), n.ready = !0;
			return;
		}
		let c = r || n.open ? ql : Jl;
		G(_e, i.w, c), G(ve, i.h, c), G(ye, o, c), G(be, a, c), G(Y, e.w, Q.spring.morph);
	}, [
		Te,
		ve,
		ye,
		Y,
		_e,
		be
	]), De = se(() => {
		Ce.current || (Ce.current = !0, queueMicrotask(Ee));
	}, [Ee]);
	V(() => {
		Se.current.open = y, Se.current.reduced = p, y || (xe.current.panel = null), De();
	}, [
		y,
		p,
		De
	]), V(() => {
		let e = W.current;
		if (!e) return;
		let t = () => {
			xe.current.trigger = {
				w: e.offsetWidth,
				h: e.offsetHeight
			}, De();
		};
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [De]), V(() => {
		let e = pe.current;
		if (!y || !e) return;
		let t = () => {
			xe.current.panel = {
				w: e.offsetWidth,
				h: e.offsetHeight
			}, De();
		};
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [y, De]), B(() => {
		if (!y) return;
		let e = requestAnimationFrame(() => {
			let e = pe.current;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = t.bottom - (window.innerHeight - au);
			n <= 0 || window.scrollBy({
				top: Math.min(n, Math.max(0, t.top - au)),
				behavior: p ? "instant" : "smooth"
			});
		});
		return () => cancelAnimationFrame(e);
	}, [y, p]), B(() => {
		if (y) return;
		let e = W.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		(t.bottom < 0 || t.top > window.innerHeight) && e.scrollIntoView({
			block: "center",
			behavior: p ? "instant" : "smooth"
		});
	}, [y, p]);
	let Oe = se(() => {
		let e = Te(), t = Math.max(0, e.right - e.left - 16);
		return {
			single: u === 1 || u === "auto" && t < iu,
			width: Math.min(352, t)
		};
	}, [Te, u]);
	B(() => {
		if (!y) return;
		let e = () => {
			let e = Oe();
			S(e.single), w(e.width), De();
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [
		Oe,
		y,
		De
	]);
	let ke = (e, t, n) => {
		let r = Dl(e?.end ?? n);
		return t ? r : Al(r, -1);
	}, Ae = () => {
		if (!m) return;
		let e = Oe();
		S(e.single), w(e.width), A(v), M(null), te(null), E(ke(v, e.single, m)), O(0), ne(Fl(v?.start ?? m)), he.current = "day", b(!0);
	}, je = se((e) => {
		e && (he.current = "trigger"), O(0), b(!1), M(null), te(null);
	}, []), Me = () => {
		let t = j ? {
			start: j,
			end: j
		} : k;
		t && (e === void 0 && _(t), n?.(t), je(!0));
	};
	V(() => {
		let e = he.current;
		if (e) {
			if (e === "trigger" && !y) {
				he.current = null, W.current?.focus({ preventScroll: !0 });
				return;
			}
			if (e === "day" && y) {
				let e = pe.current?.querySelector(`[data-current] [data-date="${N}"]`);
				e && (he.current = null, e.focus({ preventScroll: !0 }));
			}
		}
	}, [
		N,
		y,
		T,
		x
	]);
	let Ne = y && (j !== null || !!(k || v) && !Rl(k, v)), Pe = H(Ne);
	V(() => {
		Pe.current = Ne;
	}, [Ne]);
	let [Fe, Ie] = U(""), Le = `${j ? Fl(j) : ""}|${k ? Fl(k.start) + Fl(k.end) : ""}`, Re = H(Le);
	V(() => {
		Re.current = Le;
	}, [Le]);
	let ze = se(() => {
		Ie(Re.current), pe.current?.querySelector(`.${$.primary}`)?.focus({ preventScroll: !0 }), Se.current.reduced || ge.current?.animate([
			{ translate: "0" },
			{ translate: "4px" },
			{ translate: "0" }
		], {
			duration: 240,
			easing: "cubic-bezier(0.16, 1, 0.3, 1)"
		});
	}, []);
	B(() => {
		if (!y) return;
		let e = !1, t = (t) => {
			if (e = !1, !ue.current?.contains(t.target)) {
				if (!Pe.current) {
					je(!1);
					return;
				}
				t.preventDefault(), t.stopPropagation(), e = !0, ze();
			}
		}, n = (t) => {
			e && (t.type === "click" && (e = !1), t.preventDefault(), t.stopPropagation());
		};
		document.addEventListener("pointerdown", t, !0);
		for (let e of [
			"mousedown",
			"mouseup",
			"click"
		]) document.addEventListener(e, n, !0);
		return () => {
			document.removeEventListener("pointerdown", t, !0);
			for (let e of [
				"mousedown",
				"mouseup",
				"click"
			]) document.removeEventListener(e, n, !0);
		};
	}, [
		je,
		ze,
		y
	]);
	let Be = (e) => {
		e.key === "Escape" && y && (e.preventDefault(), e.stopPropagation(), je(!0));
	}, Ve = (e) => {
		let t = e.relatedTarget;
		y && t && !e.currentTarget.contains(t) && (Pe.current ? requestAnimationFrame(ze) : je(!1));
	}, He = (e) => {
		let t = Nl(e, T);
		t && (O(Math.sign(t)), E(e));
	}, Ue = (e) => {
		let t = T, n = Al(T, re - 1);
		Nl(e.start, t) >= 0 && Nl(e.end, n) <= 0 || He(ke(e, x, e.end));
	}, We = (e) => {
		if (ne(Fl(e)), !j) {
			M(e), te(e);
			return;
		}
		A(Ll(j, e)), M(null), te(null);
	}, Ge = (e) => {
		if (!m) return;
		let t = e.range(m);
		A(t), M(null), te(null), ne(Fl(t.start)), Ue(t);
	}, Ke = (e, t) => {
		let n = (t.getDay() - c + 7) % 7, r = {
			ArrowLeft: () => kl(t, -1),
			ArrowRight: () => kl(t, 1),
			ArrowUp: () => kl(t, -7),
			ArrowDown: () => kl(t, 7),
			Home: () => kl(t, -n),
			End: () => kl(t, 6 - n),
			PageUp: () => jl(t, e.shiftKey ? -12 : -1),
			PageDown: () => jl(t, e.shiftKey ? 12 : 1)
		}[e.key];
		if (!r) return;
		e.preventDefault();
		let i = zl(r(), o, s);
		ne(Fl(i)), j && te(i), he.current = "day";
		let a = T, l = Al(T, re - 1);
		Nl(i, a) < 0 ? He(Dl(i)) : Nl(i, l) > 0 && He(Al(Dl(i), -(re - 1)));
	}, qe = (e) => {
		let t = x ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
		if (!t.includes(e.key)) return;
		let n = Array.from(e.currentTarget.querySelectorAll("[data-preset]")), r = n.indexOf(document.activeElement);
		r < 0 || (e.preventDefault(), n[(r + (e.key === t[1] ? 1 : -1) + n.length) % n.length]?.focus());
	}, Je = de(() => {
		let e = (e) => ie.some((t) => Nl(e, t) === 0);
		return N && e(Il(N)) ? N : R && e(R.start) ? Fl(R.start) : Fl(ie[0]);
	}, [
		N,
		R,
		ie
	]), Ye = J(0), Xe = J(0), Ze = J(0), Qe = J(0), $e = J(0);
	V(() => {
		let e = me.current, t = ae < 0 ? null : e?.querySelector(`[data-preset="${ae}"]`);
		if (!e || !t) {
			G($e, 0, { duration: p ? 0 : .14 });
			return;
		}
		let n = [
			t.offsetLeft,
			t.offsetTop,
			t.offsetWidth,
			t.offsetHeight
		];
		$e.get() < .05 || p ? (Ye.jump(n[0]), Xe.jump(n[1]), Ze.jump(n[2]), Qe.jump(n[3])) : (G(Ye, n[0], Xl), G(Xe, n[1], Xl), G(Ze, n[2], Xl), G(Qe, n[3], Xl)), G($e, 1, { duration: p ? 0 : .16 }), x && (t.offsetLeft < e.scrollLeft || t.offsetLeft + t.offsetWidth > e.scrollLeft + e.clientWidth) && e.scrollTo({
			left: t.offsetLeft - 12,
			behavior: p ? "auto" : "smooth"
		});
	}, [
		ae,
		x,
		$e,
		Qe,
		Ze,
		Ye,
		Xe,
		y,
		p
	]);
	let et = L(v), tt = R ? L(R) : "No dates", nt = R ? `${oe} ${oe === 1 ? "day" : "days"}` : "", rt = y ? Ne && Fe === Le ? "Apply or cancel your changes." : j ? `Start ${P.label.format(j)}. Choose an end date.` : R ? `${tt}, ${nt}` : "" : "", it = x && C ? Math.max(32, Math.min(42, Math.floor((C - 24) / 7))) : ru, at = {
		opacity: 1,
		filter: "blur(0px)"
	}, ot = y ? {
		duration: .12,
		ease: Gl
	} : {
		duration: .22,
		ease: Wl,
		delay: p ? 0 : .1
	};
	return /* @__PURE__ */ I(K.div, {
		ref: ue,
		className: [$.root, f].filter(Boolean).join(" "),
		style: { width: Y },
		"data-open": y || void 0,
		onKeyDown: Be,
		onBlur: Ve,
		children: [/* @__PURE__ */ I("button", {
			ref: W,
			type: "button",
			className: $.trigger,
			"aria-haspopup": "dialog",
			"aria-expanded": y,
			"aria-controls": y ? `${h}-panel` : void 0,
			"aria-label": `${r}: ${et}`,
			disabled: !m,
			inert: void 0,
			onClick: y && Ql ? () => Ne ? ze() : je(!0) : Ae,
			children: [
				/* @__PURE__ */ F(K.span, {
					className: $.triggerIcon,
					initial: !1,
					animate: at,
					transition: ot,
					children: /* @__PURE__ */ F(hl, {
						size: 16,
						strokeWidth: 1.75,
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ F(K.span, {
					className: $.value,
					"data-empty": !v || void 0,
					initial: !1,
					animate: { opacity: 1 },
					transition: ot,
					children: /* @__PURE__ */ F(du, {
						text: et,
						direction: z,
						reduced: p
					})
				}, "resting"),
				/* @__PURE__ */ F(K.span, {
					className: $.chevron,
					initial: !1,
					animate: at,
					transition: ot,
					children: /* @__PURE__ */ F(gl, {
						size: 16,
						strokeWidth: 1.75,
						"aria-hidden": "true"
					})
				})
			]
		}), /* @__PURE__ */ F(K.div, {
			ref: ge,
			className: $.surface,
			style: {
				width: _e,
				height: ve,
				borderRadius: ye,
				x: be
			},
			children: /* @__PURE__ */ F(fe, { children: y && m && /* @__PURE__ */ I(K.div, {
				ref: pe,
				id: `${h}-panel`,
				className: $.panel,
				role: "dialog",
				"aria-label": r,
				"data-compact": x || void 0,
				style: {
					"--cell": `${it}px`,
					width: x && C ? C : void 0
				},
				exit: {
					opacity: 1,
					transition: { duration: .14 }
				},
				children: [
					/* @__PURE__ */ I(K.div, {
						className: $.body,
						variants: lu,
						initial: "hidden",
						animate: "shown",
						exit: "gone",
						children: [/* @__PURE__ */ I("div", {
							ref: me,
							className: $.rail,
							role: "group",
							"aria-label": "Presets",
							onKeyDown: qe,
							children: [/* @__PURE__ */ F(K.span, {
								className: $.railHighlight,
								style: {
									x: Ye,
									y: Xe,
									width: Ze,
									height: Qe,
									opacity: $e
								},
								"aria-hidden": "true"
							}), a.map((e, t) => /* @__PURE__ */ F("button", {
								type: "button",
								className: $.preset,
								"data-preset": t,
								"aria-pressed": t === ae,
								onClick: () => Ge(e),
								children: e.label
							}, e.label))]
						}), /* @__PURE__ */ I("div", {
							className: $.calendars,
							onPointerLeave: () => {
								j && te(null);
							},
							children: [
								/* @__PURE__ */ F("button", {
									type: "button",
									className: $.navButton,
									"data-side": "prev",
									"aria-label": "Previous month",
									onClick: () => He(Al(T, -1)),
									disabled: !!(o && Nl(T, o) <= 0),
									children: /* @__PURE__ */ F(_l, {
										size: 16,
										strokeWidth: 1.75,
										"aria-hidden": "true"
									})
								}),
								/* @__PURE__ */ F("button", {
									type: "button",
									className: $.navButton,
									"data-side": "next",
									"aria-label": "Next month",
									onClick: () => He(Al(T, 1)),
									disabled: !!(s && Nl(Al(T, re - 1), s) >= 0),
									children: /* @__PURE__ */ F(vl, {
										size: 16,
										strokeWidth: 1.75,
										"aria-hidden": "true"
									})
								}),
								/* @__PURE__ */ F("div", {
									className: $.viewport,
									children: /* @__PURE__ */ F(fe, {
										initial: !1,
										custom: D,
										children: /* @__PURE__ */ F(_u, {
											direction: D,
											reduced: p,
											children: ie.map((e) => /* @__PURE__ */ F(gu, {
												month: e,
												range: R,
												tabbable: Je,
												today: m,
												minDate: o,
												maxDate: s,
												weekStartsOn: c,
												reduced: p,
												formatters: P,
												idBase: h,
												onPick: We,
												onHover: (e) => {
													j && te(e);
												},
												onKey: Ke,
												onFocusDay: (e) => ne(Fl(e))
											}, Fl(e)))
										}, `${Fl(T)}-${re}`)
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ I("div", {
						className: $.footer,
						children: [/* @__PURE__ */ I("div", {
							className: $.summary,
							children: [/* @__PURE__ */ F(K.span, {
								layoutId: void 0,
								layout: void 0,
								className: $.summaryValue,
								transition: ql,
								variants: lu,
								initial: "hidden",
								animate: "shown",
								exit: "gone",
								children: /* @__PURE__ */ F(du, {
									text: tt,
									direction: ce,
									reduced: p
								})
							}), /* @__PURE__ */ F(K.span, {
								className: $.summaryCount,
								variants: lu,
								initial: "hidden",
								animate: "shown",
								exit: "gone",
								children: nt && /* @__PURE__ */ F(du, {
									text: j && Pl(j, ee) ? "Pick an end date" : nt,
									direction: ce,
									reduced: p
								})
							})]
						}), /* @__PURE__ */ I(K.div, {
							className: $.actions,
							variants: lu,
							initial: "hidden",
							animate: "shown",
							exit: "gone",
							children: [/* @__PURE__ */ F("button", {
								type: "button",
								className: $.ghost,
								onClick: () => je(!0),
								children: "Cancel"
							}), /* @__PURE__ */ F("button", {
								type: "button",
								className: $.primary,
								onClick: Me,
								disabled: !R,
								children: "Apply"
							})]
						})]
					}),
					/* @__PURE__ */ F("p", {
						className: $.srOnly,
						"aria-live": "polite",
						children: rt
					})
				]
			}, "panel") })
		})]
	});
}
var yu = {
	theme: "_theme_1vbma_9",
	noCenter: "_noCenter_1vbma_88",
	donutFigure: "_donutFigure_1vbma_95",
	dateRangePicker: "_dateRangePicker_1vbma_104"
};
//#endregion
//#region src/arc/index.tsx
function bu(e) {
	return /* @__PURE__ */ F("span", {
		className: yu.theme,
		children: /* @__PURE__ */ F(as, { ...e })
	});
}
function xu(e) {
	return /* @__PURE__ */ F("span", {
		className: yu.theme,
		children: /* @__PURE__ */ F(Hs, { ...e })
	});
}
function Su({ center: e, ...t }) {
	let n = t.size ?? 208, r = e ?? n >= 160;
	return /* @__PURE__ */ F("span", {
		className: [yu.theme, !r && yu.noCenter].filter(Boolean).join(" "),
		style: { "--donut-size": `${n}px` },
		children: /* @__PURE__ */ F(bc, {
			...t,
			className: [yu.donutFigure, t.className].filter(Boolean).join(" ")
		})
	});
}
function Cu(e) {
	return /* @__PURE__ */ F("span", {
		className: yu.theme,
		children: /* @__PURE__ */ F(Nc, { ...e })
	});
}
function wu(e) {
	return /* @__PURE__ */ F("span", {
		className: yu.theme,
		children: /* @__PURE__ */ F(Xc, { ...e })
	});
}
function Tu(e) {
	return /* @__PURE__ */ F("span", {
		className: yu.theme,
		children: /* @__PURE__ */ F(ol, { ...e })
	});
}
function Eu(e) {
	return /* @__PURE__ */ F("span", {
		className: yu.theme,
		children: /* @__PURE__ */ F(fl, { ...e })
	});
}
function Du(e) {
	return /* @__PURE__ */ F("span", {
		className: yu.theme,
		children: /* @__PURE__ */ F(ml, { ...e })
	});
}
function Ou(e) {
	return /* @__PURE__ */ F("span", {
		className: `${yu.theme} ${yu.dateRangePicker}`,
		children: /* @__PURE__ */ F(vu, { ...e })
	});
}
//#endregion
export { Le as Accordion, Ue as AccordionItem, Co as AddTagChip, Ne as Alert, Tu as AnimatedCounter, ki as AnswerCard, qe as Avatar, Ye as AvatarGroup, Ut as Banner, xu as BarChart, Tn as BarList, pt as BulkBar, mt as BulkBarMenu, it as Button, Zt as Card, kn as CardHeader, Nn as Cell, In as ChartSlot, Rn as Checkbox, jn as CheckboxIndicator, Bn as CheckboxOption, Hn as Checklist, Kn as ChecklistActions, Gn as ChecklistItem, Zn as ChoiceChip, Di as CitationChip, va as Coachmark, cr as Combobox, $t as CreateCard, Er as DataTable, Mr as DataTableBar, jr as DataTableCell, Or as DataTableRow, Nr as DataTableTags, ur as DateChip, Ou as DateRangePicker, xn as Delta, Fr as Divider, Su as DonutChart, bt as DotGrid, Lr as EmptyState, cn as FactStrip, hi as FeatureModal, Kr as FilterDropdown, Zr as FilterToggle, ga as FlowBar, wa as FlowLayout, Sa as FocusPage, Vi as GistAdminBadge, ni as GroupLayout, ti as GroupList, Ti as Highlight, Ur as IconButton, vt as InfoTip, zr as Input, ua as InputBar, ii as InputHeading, St as KeyValueList, li as LightDarkToggle, bu as LineChart, pn as LinkRow, nn as List, rn as ListRow, lo as LoadingText, ct as Menu, Wr as MenuAddItem, ar as MenuHeader, Vr as MenuItem, ut as MenuPopover, Eu as MetricCard, pi as Modal, un as OpenableRow, nr as OptionCard, Li as Pager, Ni as PaginationArrow, oa as PaginationDropdown, na as PaginationDropdownResults, ia as PaginationMenuItem, ca as PaginationPage, yi as Panel, _i as PanelControls, Gi as PartnerPicker, Fi as PillMenu, $n as PlanCard, er as PlanCardGroup, Gt as ProgressBar, on as PropertyList, Oa as Radio, Ea as RadioIndicator, ea as RankedList, Ma as RecommendationCard, Pa as Row, dn as RowChevron, $r as RowMenuTrigger, Ui as ScopePicker, fa as SearchInput, Du as SegmentedControl, Jn as SelectPill, Yn as SelectPills, ao as SettingsModal, Ci as Sheet, za as Sidebar, Va as SidebarActionItems, Ja as SidebarBrandSwitcher, Xa as SidebarFooter, eo as SidebarNavItem, ro as SidebarSection, Qa as SidebarStatusRow, fr as Skeleton, Cu as SlopeChart, wu as Sparkline, nt as Spinner, xi as SplitView, Cn as StatCard, fo as StatDisplay, Zi as StatusTiles, ba as StepDots, ma as Stepper, qt as Strip, mo as SuggestionChip, Yt as SummaryBand, yo as TabBar, xo as TabItem, Ga as TabToggle, Ua as TabToggleGroup, go as Table, mr as Tag, wo as TagMenu, ko as TemplateCard, zi as TextLink, Yi as TierBadge, Vt as Toaster, Yr as Toggle, gt as Tooltip, Eo as TopicChip, wt as TruncatedText, so as Typing, hn as ValueChip, _n as Widget, Bl as defaultDateRangePresets, It as engineMarks, Ft as initOverlayScrollbars, Bt as toast };
