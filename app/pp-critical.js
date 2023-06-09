!(function () {
    let e;
    var n = {
        controller: {
            getVersion: function () {
                if (void 0 === e) {
                    const n = /Chrome\/([0-9.]+)/.exec(globalThis.navigator.userAgent)[1];
                    e = n ? Number(n.split(".")[0]) : -1;
                }
                return e;
            },
        },
    };
    !(async function () {
        "?popup" !== location.search
            ? ((function () {
                  let e = localStorage.getItem("theme");
                  if (!e) {
                      e = window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
                  }
                  document.documentElement.classList.add(`theme-${e}`);
              })(),
              (function () {
                  const e = 72,
                      t = n.controller.getVersion();
                  if (-1 === t) return;
                  if (t >= e) return;
                  document.addEventListener("DOMContentLoaded", () => {
                      document.body.innerHTML =
                          '\n      <style>\n        .update-browser {\n          width: 100%;\n          text-align: center;\n          margin-top: 15%;\n          font-size: 24px;\n          color: #3F3E3F;\n          line-height: 1.8;\n        }\n      </style>\n      <div class="update-browser">\n        Could not initialize Inssist extension, browser is not supported.<br/>\n        Please consider updating your browser / OS.\n      </div>\n    ';
                  });
              })(),
              (function () {
                  const e = (e) => {
                      (e.message.toLowerCase() || "").includes("unexpected end of input") && location.reload();
                  };
                  window.addEventListener("error", e),
                      setTimeout(() => {
                          window.removeEventListener("error", e);
                      }, 5e3);
              })())
            : chrome.tabs.create({ url: location.href.split("?")[0], active: !0 });
    })();
})();
