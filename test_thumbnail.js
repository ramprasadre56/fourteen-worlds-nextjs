const https = require("https");

async function fetchBlogThumbnail(blogUrl) {
  try {
    const response = await fetch(blogUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!response.ok) return "";

    const html = await response.text();

    // Look for og:image meta tag first (most reliable)
    const ogImageMatch =
      html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
      html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
    if (ogImageMatch && ogImageMatch[1]) {
      console.log("Found og:image:", ogImageMatch[1]);
      return ogImageMatch[1];
    }

    console.log("No og:image found. Checking img tags...");

    // Look for images in content area
    const imgMatches = [...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)];
    for (const match of imgMatches) {
      const src = match[1];
      if (!src) continue;

      console.log("Found image candidate:", src);
      if (
        /avatar|icon|logo|profile|gravatar|badge|16x16|32x32|48x48|spinner/i.test(
          src,
        )
      ) {
        console.log("  -> Skipped (matches ignore list)");
        continue;
      }
      if (src.includes("ning.com") || src.includes("iskcondesiretree.com")) {
        console.log("  -> Accepted");
        return src.startsWith("//") ? `https:${src}` : src;
      } else {
        console.log("  -> Skipped (not ning.com or iskcondesiretree.com)");
      }
    }

    return "";
  } catch (e) {
    console.error(e);
    return "";
  }
}

async function test() {
    const response = await fetch('https://iskcondesiretree.com/profiles/blogs?sort=newestPosts', {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });
    const html = await response.text();
    const blogUrlPattern = /<a[^>]*href="(https:\/\/iskcondesiretree\.com\/profiles\/blogs\/[a-z0-9-]+)"[^>]*>[\s\S]*?<\/a>/gi;
    
    const urls = [];
    let match;
    while ((match = blogUrlPattern.exec(html)) !== null && urls.length < 20) {
        const url = match[1];
        if (!urls.includes(url) && !url.includes('feed') && !url.includes('list') && !url.includes('newest')) {
            urls.push(url);
        }
    }

    console.log("Testing URLs:");
    for (const url of urls) {
        if (url.includes('jagannath') || url.includes('ekanatha') || url.includes('rasikananda')) {
            console.log(`\nURL: ${url}`);
            const thumb = await fetchBlogThumbnail(url);
            console.log(`Final Thumbnail: ${thumb}`);
        }
    }
}

test();
