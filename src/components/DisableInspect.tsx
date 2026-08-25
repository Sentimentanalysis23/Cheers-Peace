"use client";

import { useEffect } from "react";

export default function DisableInspect() {
  useEffect(() => {
    // Disable right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable common DevTools shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        // F12
        e.key === "F12" ||
        // Ctrl+Shift+I / Cmd+Option+I
        ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && (e.key === "I" || e.key === "i")) ||
        // Ctrl+Shift+J / Cmd+Option+J
        ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && (e.key === "J" || e.key === "j")) ||
        // Ctrl+Shift+C / Cmd+Option+C
        ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && (e.key === "C" || e.key === "c")) ||
        // Ctrl+U / Cmd+Option+U
        ((e.ctrlKey || (e.metaKey && e.altKey)) && (e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
