'use strict';

var React = require('react');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

// src/themes/theme-provider.tsx
function ThemeProvider({
  children,
  ...props
}) {
  const [NextThemesProvider, setNextThemesProvider] = React__namespace.useState(void 0);
  const [mounted, setMounted] = React__namespace.useState(false);
  React__namespace.useEffect(() => {
    import('next-themes').then(({ ThemeProvider: Provider }) => {
      setNextThemesProvider(() => Provider);
      setMounted(true);
    });
  }, []);
  if (!mounted || !NextThemesProvider) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    NextThemesProvider,
    {
      attribute: "class",
      defaultTheme: "system",
      enableSystem: true,
      disableTransitionOnChange: true,
      ...props,
      children
    }
  );
}
function ThemeProviderNoSSR({
  children,
  ...props
}) {
  const [mounted, setMounted] = React__namespace.useState(false);
  React__namespace.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeProvider, { ...props, children });
}
function ClientThemeProvider({
  children,
  ...props
}) {
  const [mounted, setMounted] = React__namespace.useState(false);
  React__namespace.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeProvider, { ...props, children });
}
function ClientThemeToggle(props) {
  const [mounted, setMounted] = React__namespace.useState(false);
  const [isDark, setIsDark] = React__namespace.useState(false);
  React__namespace.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
      setIsDark(currentTheme === "dark");
    }
  }, []);
  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      const newTheme = isDark ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      setIsDark(newTheme === "dark");
    }
  };
  if (!mounted) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        className: "inline-flex items-center justify-center rounded-md border border-input bg-background h-10 w-10",
        "aria-label": "Toggle theme",
        ...props,
        children: /* @__PURE__ */ jsxRuntime.jsxs(
          "svg",
          {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "4" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 2v2" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 20v2" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m4.93 4.93 1.41 1.41" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m17.66 17.66 1.41 1.41" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M2 12h2" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 12h2" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6.34 17.66-1.41 1.41" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m19.07 4.93-1.41 1.41" })
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      onClick: toggleTheme,
      className: "inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10",
      "aria-label": "Toggle theme",
      ...props,
      children: isDark ? /* @__PURE__ */ jsxRuntime.jsxs(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "4" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 2v2" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 20v2" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m4.93 4.93 1.41 1.41" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m17.66 17.66 1.41 1.41" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M2 12h2" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 12h2" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6.34 17.66-1.41 1.41" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m19.07 4.93-1.41 1.41" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntime.jsx(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" })
        }
      )
    }
  );
}
function useThemeServer() {
  return {
    theme: "system",
    setTheme: (theme) => {
    },
    resolvedTheme: "light",
    isDark: false
  };
}

exports.ClientThemeProvider = ClientThemeProvider;
exports.ClientThemeToggle = ClientThemeToggle;
exports.ThemeProvider = ThemeProvider;
exports.ThemeProviderNoSSR = ThemeProviderNoSSR;
exports.useThemeServer = useThemeServer;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map