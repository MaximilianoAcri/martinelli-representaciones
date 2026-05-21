"use client";

import { useEffect, useRef } from "react";

let lockCount = 0;

export function useScrollLock(locked: boolean) {
  const wasLocked = useRef(false);

  useEffect(() => {
    if (locked && !wasLocked.current) {
      lockCount++;
      wasLocked.current = true;
      if (lockCount === 1) {
        document.body.style.overflow = "hidden";
      }
    } else if (!locked && wasLocked.current) {
      lockCount = Math.max(0, lockCount - 1);
      wasLocked.current = false;
      if (lockCount === 0) {
        document.body.style.overflow = "";
      }
    }

    return () => {
      if (wasLocked.current) {
        lockCount = Math.max(0, lockCount - 1);
        wasLocked.current = false;
        if (lockCount === 0) {
          document.body.style.overflow = "";
        }
      }
    };
  }, [locked]);
}
