!(function () {
    var e = {
        get: async function (e) {
            const o = await t();
            return (
                await r,
                (r = new Promise((r, t) => {
                    const n = o.transaction("data", "readonly").objectStore("data").get(e);
                    (n.onsuccess = (e) => {
                        r(e.target.result ? e.target.result.value : void 0);
                    }),
                        (n.onerror = () => {
                            console.error("idb-controller → get", { key: e, req: n, error: n.error }), t(n.error);
                        });
                })),
                r
            );
        },
        set: async function (e, o) {
            const n = await t();
            return (
                await r,
                (r = new Promise((r, t) => {
                    const a = n.transaction("data", "readwrite").objectStore("data").put({ id: e, value: o });
                    (a.onsuccess = () => {
                        r();
                    }),
                        (a.onerror = () => {
                            console.error("idb-controller → set", { key: e, req: a, error: a.error }), t(a.error);
                        });
                })),
                r
            );
        },
        delete: async function (e) {
            const o = await t();
            return (
                await r,
                (r = new Promise((r, t) => {
                    const n = o.transaction("data", "readwrite").objectStore("data").delete(e);
                    (n.onsuccess = () => {
                        r();
                    }),
                        (n.onerror = () => {
                            console.error("idb-controller → delete", { key: e, req: n, error: n.error }), t(n.error);
                        });
                })),
                r
            );
        },
        getAllKeys: async function () {
            const e = await t();
            return (
                await r,
                (r = new Promise((r, t) => {
                    const o = e.transaction("data", "readonly").objectStore("data").getAllKeys();
                    (o.onsuccess = (e) => {
                        const t = e.target.result;
                        r(t);
                    }),
                        (o.onerror = () => {
                            t(o.error);
                        });
                })),
                r
            );
        },
    };
    let r = Promise.resolve();
    async function t() {
        const e = t;
        return (
            e.db ||
                (e.db = await new Promise((e, r) => {
                    const t = indexedDB.open("inssist", 1);
                    (t.onupgradeneeded = (e) => {
                        e.target.result.createObjectStore("data", { keyPath: "id" });
                    }),
                        (t.onsuccess = (r) => {
                            e(r.target.result);
                        }),
                        (t.onerror = () => {
                            console.error("idb-controller → getDb", { req: t, error: t.error }), r(t.error);
                        });
                })),
            e.db
        );
    }
    var o = { controller: e };
    let n;
    function a(e) {
        const r = e.data.url;
        let t;
        if (r in n) {
            const e = n[r].blob;
            t = URL.createObjectURL(e);
        } else t = null;
        self.postMessage({ originalUrl: r, objectUrl: t });
    }
    ({
        init: async function () {
            (n = (await o.controller.get("image-proxy.cache")) || {}), self.addEventListener("message", a);
        },
    }.init());
})();
