// shield.js - LensBrowser Ad Shield CSS
// Blocks ads instantly with CSS
// GitHub: https://github.com/Flagodna-Developer/lensbrowser-data/js/clean-ads/shield.js

(function () {
  "use strict";

  console.log("[LensBrowser] Loading ad shield...");

  const styleId = "lens-shield";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.innerHTML = `
        /* 1. Sticky Footer & Floating Banners (New) */
        .footer_banner, .ssb-hide, .ssb-show, .ssb-content, 
        #rmb_ssb, [id*="sticky_static"], [class*="footer_banner"],
        
        /* 2. AMP & Billboard Specifics */
        #billboard, .box-ads, [class*="box-ads"], amp-ad, amp-embed, 
        amp-analytics, .i-amphtml-element,
        
        /* 3. Detik/News Static & Parallax Containers */
        .staticdetail_container, .staticdetail_ads, .para_caption,
        [id^="div-gpt-ad"], [class*="staticdetail"],
        
        /* 4. AP News & FreeStar Specifics */
        .FreeStar, [class*="FreeStar"], [data-freestar-ad], .fs-feed-ad,
        
        /* 5. Targeted data attributes (Vivaldi style) */
        [data-component*="advertisement"], [data-component*="ad-slot"],
        [data-testid*="ad-unit"], [data-testid*="ad-component"],
        [class*="dotcom-ad"], [id*="dotcom-ad"],
        
        /* 6. Common ad patterns */
        ins.adsbygoogle, .trc_rbox_container, .outbrain, .taboola-ad,
        iframe[src*="doubleclick.net"], iframe[src*="googleads"],
        
        /* Universal Layout Force-Collapse & Teleportation */
        div:empty, .staticdetail_container, #billboard, .footer_banner { 
            display: none !important; 
            height: 0 !important; 
            min-height: 0 !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            visibility: hidden !important;
            position: absolute !important;
            top: -9999px !important; /* Moves stickies off-screen */
        }
    `;

  document.documentElement.appendChild(style);
  console.log("[LensBrowser] Ad shield loaded");
})();
