/* @ds-bundle: {"format":4,"namespace":"ClayDesignSystem_b18087","components":[{"name":"ExpertCard","sourcePath":"components/cards/ExpertCard.jsx"},{"name":"FeatureCard","sourcePath":"components/cards/FeatureCard.jsx"},{"name":"HeroIllustrationCard","sourcePath":"components/cards/HeroIllustrationCard.jsx"},{"name":"PricingTierCard","sourcePath":"components/cards/PricingTierCard.jsx"},{"name":"ProductMockupCard","sourcePath":"components/cards/ProductMockupCard.jsx"},{"name":"TestimonialCard","sourcePath":"components/cards/TestimonialCard.jsx"},{"name":"BadgePill","sourcePath":"components/core/BadgePill.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CategoryTab","sourcePath":"components/core/CategoryTab.jsx"},{"name":"TextLink","sourcePath":"components/core/TextLink.jsx"},{"name":"TextInput","sourcePath":"components/forms/TextInput.jsx"},{"name":"CtaBand","sourcePath":"components/layout/CtaBand.jsx"},{"name":"Footer","sourcePath":"components/layout/Footer.jsx"},{"name":"HeroBand","sourcePath":"components/layout/HeroBand.jsx"},{"name":"TopNav","sourcePath":"components/layout/TopNav.jsx"}],"sourceHashes":{"components/cards/ExpertCard.jsx":"320127afa590","components/cards/FeatureCard.jsx":"cd09f2d26771","components/cards/HeroIllustrationCard.jsx":"8b36ba5a1e5a","components/cards/PricingTierCard.jsx":"a587f49e2ee5","components/cards/ProductMockupCard.jsx":"39a07811ff09","components/cards/TestimonialCard.jsx":"b4e7f6ae2d27","components/core/BadgePill.jsx":"fd8290c13fab","components/core/Button.jsx":"f71727c4f2b6","components/core/CategoryTab.jsx":"395f157824ad","components/core/TextLink.jsx":"906106457061","components/forms/TextInput.jsx":"b9114830430e","components/layout/CtaBand.jsx":"5190cc652629","components/layout/Footer.jsx":"35eaf0d1c92f","components/layout/HeroBand.jsx":"3200b63dd10e","components/layout/TopNav.jsx":"adce0b5eceaf","ui_kits/marketing/Experts.jsx":"04988da4fb8f","ui_kits/marketing/Home.jsx":"5472c649290b","ui_kits/marketing/Pricing.jsx":"d0a737254d90","ui_kits/marketing/SignUp.jsx":"1400094cc19c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ClayDesignSystem_b18087 = window.ClayDesignSystem_b18087 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/FeatureCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  pink: {
    background: 'var(--brand-pink)',
    color: 'var(--on-dark)'
  },
  teal: {
    background: 'var(--brand-teal)',
    color: 'var(--on-dark)'
  },
  lavender: {
    background: 'var(--brand-lavender)',
    color: 'var(--ink)'
  },
  peach: {
    background: 'var(--brand-peach)',
    color: 'var(--ink)'
  },
  ochre: {
    background: 'var(--brand-ochre)',
    color: 'var(--ink)'
  },
  cream: {
    background: 'var(--surface-card)',
    color: 'var(--ink)'
  }
};
function FeatureCard({
  tone = 'pink',
  eyebrow,
  title,
  body,
  children,
  style,
  ...rest
}) {
  const t = tones[tone];
  const soft = t.color === 'var(--on-dark)' ? 'rgba(255,255,255,0.78)' : 'rgba(10,10,10,0.68)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...t,
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-xl)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--caption-upper-size)',
      fontWeight: 'var(--caption-upper-weight)',
      letterSpacing: 'var(--caption-upper-ls)',
      textTransform: 'uppercase',
      opacity: .8
    }
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--title-md-size)',
      fontWeight: 'var(--title-md-weight)',
      lineHeight: 'var(--title-md-lh)'
    }
  }, title) : null, body ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--body-md-size)',
      lineHeight: 'var(--body-md-lh)',
      color: soft
    }
  }, body) : null, children);
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/HeroIllustrationCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function HeroIllustrationCard({
  src,
  alt = '',
  caption = '3D claymation illustration',
  minHeight = 360,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-soft)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      minHeight,
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--caption-size)',
      color: 'var(--muted-soft)',
      letterSpacing: 'var(--caption-upper-ls)',
      textTransform: 'uppercase'
    }
  }, caption));
}
Object.assign(__ds_scope, { HeroIllustrationCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/HeroIllustrationCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProductMockupCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProductMockupCard({
  title,
  meta,
  rows = [],
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--canvas)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-lg)',
      fontFamily: 'var(--font-body)',
      color: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      ...style
    }
  }, rest), title || meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-sm)'
    }
  }, title ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--title-sm-size)',
      fontWeight: 'var(--title-sm-weight)'
    }
  }, title) : null, meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--caption-size)',
      color: 'var(--muted)'
    }
  }, meta) : null) : null, rows.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 'var(--space-sm)',
      padding: '10px 0',
      borderTop: i ? '1px solid var(--hairline-soft)' : 'none',
      fontSize: 'var(--body-sm-size)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--body)'
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: r.status === 'error' ? 'var(--error)' : r.status === 'pending' ? 'var(--warning)' : 'var(--body-strong)',
      fontWeight: 500
    }
  }, r.value)))) : null, children);
}
Object.assign(__ds_scope, { ProductMockupCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProductMockupCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/TestimonialCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-lg)',
      fontFamily: 'var(--font-body)',
      color: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      background: 'var(--surface-strong)',
      display: 'grid',
      placeItems: 'center',
      fontSize: 'var(--caption-size)',
      color: 'var(--muted)',
      flex: '0 0 auto'
    }
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: name || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : (name || '').slice(0, 1)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--title-sm-size)',
      fontWeight: 'var(--title-sm-weight)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--body-sm-size)',
      color: 'var(--muted)'
    }
  }, role))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--body-md-size)',
      lineHeight: 'var(--body-md-lh)',
      color: 'var(--body)'
    }
  }, quote));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/core/BadgePill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  cream: {
    background: 'var(--surface-card)',
    color: 'var(--ink)'
  },
  mint: {
    background: 'var(--brand-mint)',
    color: 'var(--ink)'
  },
  ochre: {
    background: 'var(--brand-ochre)',
    color: 'var(--ink)'
  },
  dark: {
    background: 'var(--ink)',
    color: 'var(--on-primary)'
  }
};
function BadgePill({
  tone = 'cream',
  uppercase = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 'var(--radius-pill)',
      padding: '4px 12px',
      fontFamily: 'var(--font-body)',
      fontSize: uppercase ? 'var(--caption-upper-size)' : 'var(--caption-size)',
      fontWeight: uppercase ? 'var(--caption-upper-weight)' : 'var(--caption-weight)',
      lineHeight: 'var(--caption-lh)',
      letterSpacing: uppercase ? 'var(--caption-upper-ls)' : '0',
      textTransform: uppercase ? 'uppercase' : 'none',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { BadgePill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BadgePill.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--button-size)',
  fontWeight: 'var(--button-weight)',
  lineHeight: 'var(--button-lh)',
  borderRadius: 'var(--radius-md)',
  padding: '12px 20px',
  height: 'var(--control-height)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-xs)',
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap'
};
const variants = {
  primary: {
    background: 'var(--primary)',
    color: 'var(--on-primary)'
  },
  secondary: {
    background: 'var(--canvas)',
    color: 'var(--ink)',
    borderColor: 'var(--hairline)'
  },
  onColor: {
    background: 'var(--canvas)',
    color: 'var(--ink)'
  },
  text: {
    background: 'transparent',
    color: 'var(--ink)',
    padding: '12px 4px',
    height: 'auto'
  }
};
function Button({
  variant = 'primary',
  disabled = false,
  href,
  children,
  style,
  ...rest
}) {
  const s = {
    ...base,
    ...variants[variant],
    ...(disabled ? {
      background: 'var(--primary-disabled)',
      color: 'var(--muted)',
      borderColor: 'transparent',
      cursor: 'not-allowed'
    } : null),
    ...style
  };
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: s
  }, rest), children);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: s
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/PricingTierCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PricingTierCard({
  name,
  price,
  cadence = '/mo',
  blurb,
  features = [],
  cta = 'Get started',
  featured = false,
  style,
  ...rest
}) {
  const onDark = featured;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: featured ? 'var(--brand-teal)' : 'var(--canvas)',
      color: onDark ? 'var(--on-dark)' : 'var(--ink)',
      border: featured ? '1px solid transparent' : '1px solid var(--hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-xl)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--title-lg-size)',
      fontWeight: 'var(--title-lg-weight)',
      letterSpacing: 'var(--title-lg-ls)'
    }
  }, name), featured ? /*#__PURE__*/React.createElement(__ds_scope.BadgePill, {
    uppercase: true,
    tone: "ochre"
  }, "Featured") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--display-sm-size)',
      fontWeight: 'var(--display-sm-weight)',
      letterSpacing: 'var(--display-sm-ls)'
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--body-sm-size)',
      color: onDark ? 'var(--on-dark-soft)' : 'var(--muted)'
    }
  }, cadence)), blurb ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--body-sm-size)',
      lineHeight: 'var(--body-sm-lh)',
      color: onDark ? 'var(--on-dark-soft)' : 'var(--muted)'
    }
  }, blurb) : null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: featured ? 'onColor' : 'primary',
    style: {
      width: '100%'
    }
  }, cta), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xs)',
      fontSize: 'var(--body-sm-size)',
      color: onDark ? 'rgba(255,255,255,0.85)' : 'var(--body)'
    }
  }, features.map((x, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '16px 1fr',
      gap: 'var(--space-xs)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, x)))));
}
Object.assign(__ds_scope, { PricingTierCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PricingTierCard.jsx", error: String((e && e.message) || e) }); }

// components/core/CategoryTab.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CategoryTab({
  active = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--nav-link-size)',
      fontWeight: 'var(--nav-link-weight)',
      lineHeight: 'var(--nav-link-lh)',
      borderRadius: 'var(--radius-pill)',
      padding: '8px 16px',
      border: 'none',
      cursor: 'pointer',
      background: active ? 'var(--surface-card)' : 'transparent',
      color: active ? 'var(--ink)' : 'var(--muted)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { CategoryTab });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CategoryTab.jsx", error: String((e && e.message) || e) }); }

// components/core/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextLink({
  href = '#',
  underline = true,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--body-md-size)',
      lineHeight: 'var(--body-md-lh)',
      color: 'var(--ink)',
      textDecoration: underline ? 'underline' : 'none',
      textUnderlineOffset: '2px',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/cards/ExpertCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ExpertCard({
  name,
  specialization,
  tags = [],
  avatar,
  action = 'Book session',
  href = '#',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--canvas)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-lg)',
      fontFamily: 'var(--font-body)',
      color: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      background: 'var(--surface-strong)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--muted)',
      fontSize: 'var(--title-md-size)'
    }
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: name || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : (name || '').slice(0, 1)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--title-md-size)',
      fontWeight: 'var(--title-md-weight)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--body-sm-size)',
      color: 'var(--muted)'
    }
  }, specialization)), tags.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-xxs)'
    }
  }, tags.map((t, i) => /*#__PURE__*/React.createElement(__ds_scope.BadgePill, {
    key: i
  }, t))) : null, /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: href,
    style: {
      fontSize: 'var(--button-size)',
      fontWeight: 'var(--button-weight)'
    }
  }, action));
}
Object.assign(__ds_scope, { ExpertCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ExpertCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextInput({
  label,
  hint,
  error,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xs)',
      fontFamily: 'var(--font-body)'
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--title-sm-size)',
      fontWeight: 'var(--title-sm-weight)',
      color: 'var(--ink)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      background: 'var(--canvas)',
      color: 'var(--ink)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--body-md-size)',
      height: 'var(--control-height)',
      padding: '12px 16px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (error ? 'var(--error)' : focus ? 'var(--ink)' : 'var(--hairline)'),
      outline: 'none',
      boxSizing: 'border-box',
      ...style
    }
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--body-sm-size)',
      color: 'var(--error)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--body-sm-size)',
      color: 'var(--muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextInput.jsx", error: String((e && e.message) || e) }); }

// components/layout/CtaBand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CtaBand({
  headline,
  sub,
  actions,
  illustration,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      padding: '0 var(--space-lg) var(--space-section)',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      background: 'var(--surface-soft)',
      borderRadius: 'var(--radius-xl)',
      padding: '80px',
      display: 'grid',
      gridTemplateColumns: illustration ? '1fr auto' : '1fr',
      gap: 'var(--space-xxl)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      maxWidth: '22ch',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--display-md-size)',
      fontWeight: 'var(--display-md-weight)',
      lineHeight: 'var(--display-md-lh)',
      letterSpacing: 'var(--display-md-ls)',
      color: 'var(--ink)'
    }
  }, headline), sub ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '48ch',
      fontSize: 'var(--body-md-size)',
      lineHeight: 'var(--body-md-lh)',
      color: 'var(--body)'
    }
  }, sub) : null, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)'
    }
  }, actions) : null), illustration));
}
Object.assign(__ds_scope, { CtaBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/CtaBand.jsx", error: String((e && e.message) || e) }); }

// components/layout/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Footer({
  brand = 'Clay',
  columns = [],
  note,
  horizon = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: 'var(--surface-soft)',
      color: 'var(--body)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--body-sm-size)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '80px var(--space-lg)',
      display: 'grid',
      gridTemplateColumns: '1fr repeat(' + Math.max(columns.length, 1) + ',auto)',
      gap: 'var(--space-xxl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--title-lg-size)',
      fontWeight: 500,
      letterSpacing: '-0.05em',
      color: 'var(--ink)'
    }
  }, brand), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--muted)',
      maxWidth: '32ch',
      lineHeight: 'var(--body-sm-lh)'
    }
  }, note) : null), columns.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xs)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--caption-upper-size)',
      fontWeight: 'var(--caption-upper-weight)',
      letterSpacing: 'var(--caption-upper-ls)',
      textTransform: 'uppercase',
      color: 'var(--ink)'
    }
  }, c.title), c.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      color: 'var(--muted)',
      textDecoration: 'none',
      lineHeight: 1.8
    }
  }, l))))), horizon ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 120,
      background: 'var(--surface-strong)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--muted-soft)',
      fontSize: 'var(--caption-size)',
      letterSpacing: 'var(--caption-upper-ls)',
      textTransform: 'uppercase'
    }
  }, "3D mountain horizon illustration") : null);
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Footer.jsx", error: String((e && e.message) || e) }); }

// components/layout/HeroBand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function HeroBand({
  eyebrow,
  headline,
  sub,
  actions,
  illustration,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: 'var(--canvas)',
      padding: 'var(--space-section) var(--space-lg)',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '7fr 5fr',
      gap: 'var(--space-xxl)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)',
      alignItems: 'flex-start'
    }
  }, eyebrow, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--display-xl-size)',
      fontWeight: 'var(--display-xl-weight)',
      lineHeight: 'var(--display-xl-lh)',
      letterSpacing: 'var(--display-xl-ls)',
      color: 'var(--ink)',
      textWrap: 'balance'
    }
  }, headline), sub ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '44ch',
      fontSize: 'var(--body-md-size)',
      lineHeight: 'var(--body-md-lh)',
      color: 'var(--body)'
    }
  }, sub) : null, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)',
      flexWrap: 'wrap'
    }
  }, actions) : null), /*#__PURE__*/React.createElement("div", null, illustration)));
}
Object.assign(__ds_scope, { HeroBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/HeroBand.jsx", error: String((e && e.message) || e) }); }

// components/layout/TopNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TopNav({
  brand = 'Clay',
  links = ['Product', 'Solutions', 'Resources', 'Pricing', 'Customers'],
  signInLabel = 'Sign in',
  ctaLabel = 'Try free',
  onNavigate,
  active,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      height: 'var(--nav-height)',
      background: 'var(--canvas)',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      height: '100%',
      padding: '0 var(--space-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-xl)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(links[0]);
    },
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--title-lg-size)',
      fontWeight: 500,
      letterSpacing: '-0.05em',
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, brand), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-lg)',
      flex: 1
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(l);
    },
    style: {
      fontSize: 'var(--nav-link-size)',
      fontWeight: 'var(--nav-link-weight)',
      color: active === l ? 'var(--ink)' : 'var(--body)',
      textDecoration: 'none'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "text",
    onClick: () => onNavigate && onNavigate(signInLabel)
  }, signInLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: () => onNavigate && onNavigate(ctaLabel)
  }, ctaLabel))));
}
Object.assign(__ds_scope, { TopNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/TopNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Experts.jsx
try { (() => {
const {
  TopNav,
  Footer,
  Button,
  BadgePill,
  CategoryTab,
  ExpertCard,
  TextInput,
  FeatureCard
} = window.ClayDesignSystem_b18087;
const EXPERTS = [{
  name: 'Priya Nair',
  specialization: 'Outbound systems',
  tags: ['Sequencer', 'Claygent'],
  cat: 'Outbound'
}, {
  name: 'Tom Adeyemi',
  specialization: 'Data enrichment architecture',
  tags: ['Waterfall', 'CRM'],
  cat: 'Enrichment'
}, {
  name: 'Sara Lindqvist',
  specialization: 'Agent workflows',
  tags: ['Claygent', 'Prompting'],
  cat: 'Agents'
}, {
  name: 'Diego Rivas',
  specialization: 'RevOps migrations',
  tags: ['Salesforce', 'Sync'],
  cat: 'Enrichment'
}, {
  name: 'Mei Chen',
  specialization: 'Inbound signal capture',
  tags: ['Signals', 'Routing'],
  cat: 'Outbound'
}, {
  name: 'Jonas Weber',
  specialization: 'Enterprise rollouts',
  tags: ['Governance', 'SSO'],
  cat: 'Agents'
}];
function Experts({
  onNavigate
}) {
  const [cat, setCat] = React.useState('All');
  const [q, setQ] = React.useState('');
  const list = EXPERTS.filter(e => (cat === 'All' || e.cat === cat) && (e.name + e.specialization).toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    active: "Resources",
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-xxl) var(--space-lg) var(--space-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(BadgePill, {
    uppercase: true
  }, "Experts"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--display-lg-size)',
      fontWeight: 500,
      lineHeight: 'var(--display-lg-lh)',
      letterSpacing: 'var(--display-lg-ls)'
    }
  }, "Hire someone who has built it before"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '52ch',
      fontSize: 'var(--body-md-size)',
      lineHeight: 'var(--body-md-lh)',
      color: 'var(--body)'
    }
  }, "Vetted operators who set up tables, agents and sequences with your team.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-lg)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, ['All', 'Outbound', 'Enrichment', 'Agents'].map(c => /*#__PURE__*/React.createElement(CategoryTab, {
    key: c,
    active: cat === c,
    onClick: () => setCat(c)
  }, c))), /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "Search experts",
    value: q,
    onChange: e => setQ(e.target.value),
    style: {
      width: 280
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-lg)'
    }
  }, list.map(e => /*#__PURE__*/React.createElement(ExpertCard, {
    key: e.name,
    name: e.name,
    specialization: e.specialization,
    tags: e.tags
  })), !list.length ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 'var(--body-md-size)'
    }
  }, "No experts match that search.") : null), /*#__PURE__*/React.createElement(FeatureCard, {
    tone: "ochre",
    eyebrow: "Become an expert",
    title: "Apply to the Clay expert directory",
    body: "Show your workflows, get matched with teams that need them."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onColor",
    style: {
      alignSelf: 'flex-start'
    }
  }, "Apply now")))), /*#__PURE__*/React.createElement(Footer, {
    note: "Clay is a GTM data orchestration platform.",
    columns: [{
      title: 'Product',
      links: ['Claygent', 'Sequencer', 'Waterfall']
    }, {
      title: 'Resources',
      links: ['Docs', 'University', 'Experts']
    }, {
      title: 'Company',
      links: ['Careers', 'Blog', 'Security']
    }],
    horizon: false
  }));
}
Object.assign(window, {
  Experts
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Experts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Home.jsx
try { (() => {
const {
  TopNav,
  HeroBand,
  CtaBand,
  Footer,
  Button,
  BadgePill,
  FeatureCard,
  ProductMockupCard,
  TestimonialCard,
  HeroIllustrationCard
} = window.ClayDesignSystem_b18087;
function Section({
  label,
  headline,
  sub,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 var(--space-lg) var(--space-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      alignItems: 'flex-start'
    }
  }, label ? /*#__PURE__*/React.createElement(BadgePill, {
    uppercase: true
  }, label) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      maxWidth: '26ch',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--display-lg-size)',
      fontWeight: 'var(--display-lg-weight)',
      lineHeight: 'var(--display-lg-lh)',
      letterSpacing: 'var(--display-lg-ls)',
      color: 'var(--ink)'
    }
  }, headline), sub ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '54ch',
      fontSize: 'var(--body-md-size)',
      lineHeight: 'var(--body-md-lh)',
      color: 'var(--body)'
    }
  }, sub) : null), children));
}
function Home({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    active: "Product",
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(HeroBand, {
    eyebrow: /*#__PURE__*/React.createElement(BadgePill, {
      uppercase: true
    }, "GTM data orchestration"),
    headline: "Go to market with unique data",
    sub: "Clay combines 100+ data providers, AI research agents and outbound sequencing in one table, so your team stops stitching tools together.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      onClick: () => onNavigate('Try free')
    }, "Start building free"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => onNavigate('Pricing')
    }, "See pricing")),
    illustration: /*#__PURE__*/React.createElement(HeroIllustrationCard, {
      minHeight: 380
    })
  }), /*#__PURE__*/React.createElement(Section, {
    label: "Platform",
    headline: "One table, every source",
    sub: "Waterfall enrichment, research agents and sequencing sit side by side on the same rows."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    tone: "pink",
    eyebrow: "Sequencer",
    title: "Outbound that lands",
    body: "Write once, send across email and LinkedIn from the same enriched row."
  }, /*#__PURE__*/React.createElement(ProductMockupCard, {
    title: "Sequence",
    meta: "Step 2 of 4",
    rows: [{
      label: 'Opened',
      value: '62%'
    }, {
      label: 'Replied',
      value: '11%'
    }]
  })), /*#__PURE__*/React.createElement(FeatureCard, {
    tone: "lavender",
    eyebrow: "Claygent",
    title: "Research agents",
    body: "Ask a question in plain language and let the agent fill the column."
  }, /*#__PURE__*/React.createElement(ProductMockupCard, {
    title: "Claygent run",
    meta: "3 of 12",
    rows: [{
      label: 'acme.com',
      value: 'Enriched'
    }, {
      label: 'globex.io',
      value: 'Running',
      status: 'pending'
    }, {
      label: 'initech.dev',
      value: 'No match',
      status: 'error'
    }]
  })), /*#__PURE__*/React.createElement(FeatureCard, {
    tone: "peach",
    eyebrow: "Waterfall",
    title: "100+ providers",
    body: "Chain providers by priority and only pay for the hit that lands."
  }, /*#__PURE__*/React.createElement(ProductMockupCard, {
    title: "Waterfall",
    rows: [{
      label: 'Provider A',
      value: 'Miss'
    }, {
      label: 'Provider B',
      value: 'Hit'
    }]
  })))), /*#__PURE__*/React.createElement(Section, {
    label: "Teams",
    headline: "Built for the whole GTM motion"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    tone: "teal",
    eyebrow: "Enterprise",
    title: "Governed access to every source",
    body: "SOC 2 controls, workspace-level credit budgets and audit trails on each run."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onColor",
    style: {
      alignSelf: 'flex-start'
    }
  }, "Talk to sales")), /*#__PURE__*/React.createElement(FeatureCard, {
    tone: "ochre",
    eyebrow: "Experts",
    title: "Hire a Clay expert",
    body: "Vetted operators who build your first ten workflows."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onColor",
    style: {
      alignSelf: 'flex-start'
    },
    onClick: () => onNavigate('Experts')
  }, "Browse experts")))), /*#__PURE__*/React.createElement(Section, {
    headline: "Teams that run on Clay"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(TestimonialCard, {
    name: "Dana Reyes",
    role: "Head of Growth, Northwind",
    quote: "We replaced four tools with one Clay table and cut our research time in half."
  }), /*#__PURE__*/React.createElement(TestimonialCard, {
    name: "Marcus Hale",
    role: "RevOps, Verity",
    quote: "Waterfall enrichment alone paid for the plan in the first month."
  }), /*#__PURE__*/React.createElement(TestimonialCard, {
    name: "Ines Okonkwo",
    role: "Founder, Slate",
    quote: "Claygent writes the account research our SDRs used to do by hand."
  }))), /*#__PURE__*/React.createElement(CtaBand, {
    headline: "Turn your growth ideas into reality today",
    sub: "Start with 100 free credits. No card, no call required.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      onClick: () => onNavigate('Try free')
    }, "Start free"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary"
    }, "Book a demo")),
    illustration: /*#__PURE__*/React.createElement(HeroIllustrationCard, {
      minHeight: 200,
      style: {
        width: 320,
        background: 'var(--surface-strong)'
      },
      caption: "Mascot scene"
    })
  }), /*#__PURE__*/React.createElement(Footer, {
    note: "Clay is a GTM data orchestration platform.",
    columns: [{
      title: 'Product',
      links: ['Claygent', 'Sequencer', 'Waterfall', 'Integrations']
    }, {
      title: 'Resources',
      links: ['Docs', 'University', 'Templates', 'Experts']
    }, {
      title: 'Company',
      links: ['Careers', 'Blog', 'Customers', 'Security']
    }]
  }));
}
Object.assign(window, {
  Home,
  Section
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Pricing.jsx
try { (() => {
const {
  TopNav,
  Footer,
  CtaBand,
  Button,
  BadgePill,
  PricingTierCard,
  CategoryTab,
  FeatureCard
} = window.ClayDesignSystem_b18087;
function Pricing({
  onNavigate
}) {
  const [cadence, setCadence] = React.useState('Monthly');
  const mult = cadence === 'Monthly' ? 1 : 0.8;
  const money = n => '$' + Math.round(n * mult).toLocaleString();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    active: "Pricing",
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-xxl) var(--space-lg) var(--space-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(BadgePill, {
    uppercase: true
  }, "Pricing"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--display-lg-size)',
      fontWeight: 500,
      lineHeight: 'var(--display-lg-lh)',
      letterSpacing: 'var(--display-lg-ls)'
    }
  }, "Credits, not seats"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '52ch',
      fontSize: 'var(--body-md-size)',
      lineHeight: 'var(--body-md-lh)',
      color: 'var(--body)'
    }
  }, "Every plan includes unlimited users. You only pay for the data you pull."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      background: 'var(--surface-soft)',
      borderRadius: 'var(--radius-pill)',
      padding: 4
    }
  }, ['Monthly', 'Annual'].map(c => /*#__PURE__*/React.createElement(CategoryTab, {
    key: c,
    active: cadence === c,
    onClick: () => setCadence(c)
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-lg)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(PricingTierCard, {
    name: "Free",
    price: "$0",
    cadence: "",
    blurb: "Explore the table with 100 credits.",
    cta: "Start free",
    features: ['100 credits', '2 workspaces', 'Community support']
  }), /*#__PURE__*/React.createElement(PricingTierCard, {
    name: "Starter",
    price: money(149),
    blurb: "For a first outbound motion.",
    cta: "Choose Starter",
    features: ['2k credits', 'Sequencer', 'Email support']
  }), /*#__PURE__*/React.createElement(PricingTierCard, {
    featured: true,
    name: "Pro",
    price: money(349),
    blurb: "For growing GTM teams.",
    cta: "Choose Pro",
    features: ['10k credits', 'Claygent research', 'CRM two-way sync', 'Waterfall enrichment']
  }), /*#__PURE__*/React.createElement(PricingTierCard, {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    blurb: "Governed rollout across regions.",
    cta: "Talk to sales",
    features: ['Credit budgets', 'SSO + SCIM', 'Audit trails', 'Named support']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    tone: "cream",
    eyebrow: "Credits",
    title: "What uses a credit?",
    body: "One provider call, one agent step, or one sequenced send."
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    tone: "lavender",
    eyebrow: "Rollover",
    title: "Unused credits roll",
    body: "Monthly credits carry for one cycle on paid plans."
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    tone: "peach",
    eyebrow: "Startups",
    title: "Discounted plans",
    body: "Pre-seed and seed teams get 50% off the first year."
  })))), /*#__PURE__*/React.createElement(CtaBand, {
    headline: "Not sure which plan fits?",
    sub: "Tell us your motion and we'll size the credits.",
    actions: /*#__PURE__*/React.createElement(Button, null, "Talk to sales")
  }), /*#__PURE__*/React.createElement(Footer, {
    note: "Clay is a GTM data orchestration platform.",
    columns: [{
      title: 'Product',
      links: ['Claygent', 'Sequencer', 'Waterfall']
    }, {
      title: 'Resources',
      links: ['Docs', 'University', 'Experts']
    }, {
      title: 'Company',
      links: ['Careers', 'Blog', 'Security']
    }],
    horizon: false
  }));
}
Object.assign(window, {
  Pricing
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Pricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/SignUp.jsx
try { (() => {
const {
  TopNav,
  Button,
  TextInput,
  TextLink,
  BadgePill,
  HeroIllustrationCard,
  TestimonialCard
} = window.ClayDesignSystem_b18087;
function SignUp({
  onNavigate
}) {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const valid = /@/.test(email) && !/@(gmail|yahoo|outlook)\./.test(email);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--canvas)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    active: "Try free",
    onNavigate: onNavigate,
    links: ['Product', 'Solutions', 'Resources', 'Pricing']
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-xxl) var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-xxl)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)',
      alignItems: 'flex-start',
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement(BadgePill, {
    uppercase: true
  }, "100 free credits"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--display-md-size)',
      fontWeight: 500,
      lineHeight: 'var(--display-md-lh)',
      letterSpacing: 'var(--display-md-ls)'
    }
  }, "Create your workspace"), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-lg)',
      fontSize: 'var(--body-md-size)',
      color: 'var(--body)'
    }
  }, "Check ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, email), " for your magic link. It expires in 15 minutes.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Work email",
    placeholder: "you@company.com",
    value: email,
    onChange: e => setEmail(e.target.value),
    error: email && !valid ? 'Use your company email address' : undefined
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Company",
    placeholder: "Northwind"
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: !valid,
    onClick: () => setDone(true)
  }, "Continue with email"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Continue with Google")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--body-sm-size)',
      color: 'var(--muted)'
    }
  }, "Already have an account? ", /*#__PURE__*/React.createElement(TextLink, {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate('Sign in');
    }
  }, "Sign in")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(HeroIllustrationCard, {
    minHeight: 260
  }), /*#__PURE__*/React.createElement(TestimonialCard, {
    name: "Marcus Hale",
    role: "RevOps, Verity",
    quote: "Setup took an afternoon. The first enriched list shipped the same day."
  })))));
}
Object.assign(window, {
  SignUp
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/SignUp.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ExpertCard = __ds_scope.ExpertCard;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.HeroIllustrationCard = __ds_scope.HeroIllustrationCard;

__ds_ns.PricingTierCard = __ds_scope.PricingTierCard;

__ds_ns.ProductMockupCard = __ds_scope.ProductMockupCard;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.BadgePill = __ds_scope.BadgePill;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CategoryTab = __ds_scope.CategoryTab;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.TextInput = __ds_scope.TextInput;

__ds_ns.CtaBand = __ds_scope.CtaBand;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.HeroBand = __ds_scope.HeroBand;

__ds_ns.TopNav = __ds_scope.TopNav;

})();
