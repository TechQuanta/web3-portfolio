"use client";

import { useEffect } from "react";
import { ghostCursor } from "cursor-effects";

export default function GhostCursorEffect() {
  useEffect(() => {
    // Initialize the ghost cursor
    const cursor = new ghostCursor();

    // Clean up on unmount
    return () => cursor.destroy();
  }, []);

  return null; // It doesn’t render anything visible
}
