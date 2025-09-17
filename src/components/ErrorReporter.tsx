"use client";

import { useEffect } from "react";

export default function ErrorReporter() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      // Silently listen; hook for future logging if needed
      // console.error("App Error:", event.error || event.message);
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      // console.error("Unhandled Rejection:", event.reason);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}