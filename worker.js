const PAGES_ORIGIN = "https://downingwow.github.io";
const PAGES_PREFIX = "/CoA-Research";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const pathname = incoming.pathname || "/";
    if (pathname.includes("\\") || pathname.split("/").includes("..")) {
      return new Response("Invalid path", { status: 400 });
    }

    const target = new URL(PAGES_PREFIX + (pathname === "/" ? "/" : pathname), PAGES_ORIGIN);
    target.search = incoming.search;

    const headers = new Headers(request.headers);
    headers.delete("host");
    const method = request.method.toUpperCase();
    if (method !== "GET" && method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" }
      });
    }

    let upstream = await fetch(new Request(target, { method, headers, redirect: "manual" }), {
      cf: { cacheEverything: true, cacheTtl: 0 }
    });

    if (upstream.status === 404 && method === "GET" &&
        (request.headers.get("accept") || "").includes("text/html")) {
      const fallback = new URL(PAGES_PREFIX + "/index.html", PAGES_ORIGIN);
      upstream = await fetch(new Request(fallback, { method, headers, redirect: "manual" }), {
        cf: { cacheEverything: true, cacheTtl: 60 }
      });
    }

    const response = new Response(upstream.body, upstream);
    const location = response.headers.get("location");
    const pagesBase = PAGES_ORIGIN + PAGES_PREFIX;
    if (location && location.startsWith(pagesBase)) {
      response.headers.set("location", incoming.origin + location.slice(pagesBase.length));
    }
    response.headers.set("cache-control", "public, max-age=0, must-revalidate");
    return response;
  }
};
