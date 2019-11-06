const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/SeanHiggins/ProjectLand/Website/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/SeanHiggins/ProjectLand/Website/src/pages/404.js"))),
  "component---src-pages-about-js": hot(preferDefault(require("/Users/SeanHiggins/ProjectLand/Website/src/pages/about.js"))),
  "component---src-pages-app-js": hot(preferDefault(require("/Users/SeanHiggins/ProjectLand/Website/src/pages/App.js"))),
  "component---src-pages-carpentry-js": hot(preferDefault(require("/Users/SeanHiggins/ProjectLand/Website/src/pages/carpentry.js"))),
  "component---src-pages-eagle-js": hot(preferDefault(require("/Users/SeanHiggins/ProjectLand/Website/src/pages/eagle.js"))),
  "component---src-pages-portfolio-js": hot(preferDefault(require("/Users/SeanHiggins/ProjectLand/Website/src/pages/portfolio.js"))),
  "component---src-pages-skills-js": hot(preferDefault(require("/Users/SeanHiggins/ProjectLand/Website/src/pages/skills.js")))
}

