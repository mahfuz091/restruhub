export function safeImageSrc(src?: string | null) {
  const fallback = "/banner.png"; // public/banner.png
  if (!src || typeof src !== "string") return fallback;

  // absolute url validate
  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      new URL(src);
      return src;
    } catch {
      return fallback;
    }
  }

  // relative must start with /
  if (src.startsWith("/")) return src;

  return fallback;
}

export function safeAvatarSrc(src?: string | null) {
  const fallback = "/avatar.png"; // public/avatar.png
  if (!src || typeof src !== "string") return fallback;

  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      new URL(src);
      return src;
    } catch {
      return fallback;
    }
  }

  if (src.startsWith("/")) return src;

  return fallback;
}