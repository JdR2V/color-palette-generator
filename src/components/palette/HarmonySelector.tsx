"use client";

import { type HarmonyType, HARMONY_META } from "@/lib/color";

interface HarmonySelectorProps {
  value: HarmonyType;
  onChange: (type: HarmonyType) => void;
}

export function HarmonySelector({ value, onChange }: HarmonySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {(
        Object.entries(HARMONY_META) as [
          HarmonyType,
          (typeof HARMONY_META)[HarmonyType],
        ][]
      ).map(([type, meta]) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className="text-xs px-3 py-1.5 rounded-full border transition-all duration-150
                       tracking-wider"
          style={{
            backgroundColor:
              value === type ? "var(--accent)" : "var(--bg-surface)",
            color: value === type ? "#ffffff" : "var(--text-secondary)",
            borderColor: value === type ? "var(--accent)" : "var(--border)",
          }}
        >
          {meta.label}
        </button>
      ))}
    </div>
  );
}
