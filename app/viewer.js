!(function () {
    (document.body.style.margin = 0), (document.body.style.background = "#000"), (document.body.style.overflow = "hidden");
    const e = document.createElement("img"),
        t = new URLSearchParams(location.search).get("src");
    (e.src = t), (e.style.width = "100vw"), (e.style.height = "100vh"), (e.style.objectFit = "contain"), (e.style.objectPosition = "center"), document.body.appendChild(e);
})();
