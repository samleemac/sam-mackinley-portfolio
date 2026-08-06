const STORAGE_KEY = "portal_preview_unlocked";

export function hasPreviewAccess(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function grantPreviewAccess(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // sessionStorage can be blocked in private mode; the redirect still works once
  }
}

export const PREVIEW_PASSWORD = "Benji";
