// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-404-js": () => import("../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-about-js": () => import("../src/pages/about.js" /* webpackChunkName: "component---src-pages-about-js" */),
  "component---src-pages-app-js": () => import("../src/pages/App.js" /* webpackChunkName: "component---src-pages-app-js" */),
  "component---src-pages-carpentry-js": () => import("../src/pages/carpentry.js" /* webpackChunkName: "component---src-pages-carpentry-js" */),
  "component---src-pages-eagle-js": () => import("../src/pages/eagle.js" /* webpackChunkName: "component---src-pages-eagle-js" */),
  "component---src-pages-portfolio-js": () => import("../src/pages/portfolio.js" /* webpackChunkName: "component---src-pages-portfolio-js" */),
  "component---src-pages-skills-js": () => import("../src/pages/skills.js" /* webpackChunkName: "component---src-pages-skills-js" */)
}

