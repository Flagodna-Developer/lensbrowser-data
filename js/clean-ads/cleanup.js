// cleanup.js - LensBrowser Dynamic Ad Cleanup
// Removes ad containers and neutralizes ad scripts
// GitHub: https://github.com/Flagodna-Developer/lensbrowser-data/js/clean-ads/cleanup.js

(function () {
  "use strict";

  console.log("[LensBrowser] Starting JavaScript ad cleanup...");

  // 1. NEUTRALIZE ENGINES
  window.freestar = { queue: [], config: {}, newAdSlots: function () {} };
  window.googletag = {
    cmd: [],
    display: function () {},
    pubads: function () {
      return {
        refresh: function () {},
        clear: function () {},
        setTargeting: function () {},
      };
    },
  };

  // 2. CONSOLIDATED SELECTORS
  const adSelectors = [
    ".footer_banner",
    ".ssb-hide",
    ".ssb-content",
    "#rmb_ssb", // Sticky Footer
    "#billboard",
    ".box-ads",
    "amp-ad",
    "amp-embed", // AMP/Billboard
    ".staticdetail_container",
    ".staticdetail_ads",
    ".para_caption", // Parallax
    '[id^="div-gpt-ad"]',
    '[data-component*="advertisement"]',
    '[data-testid*="ad-unit"]',
    ".dotcom-ad",
    'iframe[src*="ads"]',
    ".FreeStar",
    "[data-freestar-ad]",
    ".fs-feed-ad",
    ".trc_rbox_container",
    ".outbrain",
    ".taboola-ad",
    "ins.adsbygoogle",
  ];

  function nukeAdContainers() {
    adSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        // Instant kill for specific fixed-position footers or known containers
        const wrapper = el.closest(
          "#billboard, .box-ads, .staticdetail_container, .footer_banner"
        );
        if (wrapper) {
          wrapper.remove();
          return;
        }

        // WALK UP logic for nested ads (frees up layout space)
        let container = el;
        while (
          container.parentElement &&
          container.parentElement.children.length === 1 &&
          container.parentElement.tagName !== "BODY"
        ) {
          container = container.parentElement;
        }

        // Safety: Only remove if it doesn't look like a massive article body
        if (!container.innerText || container.innerText.length < 500) {
          container.remove();
        }
      });
    });

    // 3. CLEANUP REMAINING TEXT LABELS
    document.querySelectorAll("span, div, p").forEach((el) => {
      const txt = el.innerText ? el.innerText.trim().toUpperCase() : "";
      if (txt === "ADVERTISEMENT" || txt === "SPONSORED" || txt === "IKLAN") {
        el.remove();
      }
    });

    // Remove empty divs that might be ad placeholders
    document.querySelectorAll("div:empty, span:empty").forEach((el) => {
      if (
        (el.id && el.id.includes("ad")) ||
        (el.className && el.className.includes("ad"))
      ) {
        el.remove();
      }
    });
  }

  // 4. OBSERVE FOR LAZY LOADING
  const observer = new MutationObserver(() => nukeAdContainers());
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
    nukeAdContainers();
    console.log("[LensBrowser] JavaScript ad cleanup active");
  }

  // Export for debugging
  window.__lensCleanup = { clean: nukeAdContainers, version: "1.0" };
})();
