"use client";

interface ElevatorLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

/**
 * Navigation link with "Elevator" hover effect.
 * Text slides up and out while duplicate slides up from below.
 * Creates a slot-machine reel effect.
 */
export function ElevatorLink({ href, label, onClick }: ElevatorLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative block overflow-hidden h-5"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Primary text - visible by default, slides up on hover */}
      <span
        className="block text-sm transition-transform duration-500 group-hover:-translate-y-full"
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {label}
      </span>

      {/* Duplicate text - hidden below, slides up on hover */}
      <span
        className="absolute top-0 left-0 block text-sm translate-y-full transition-transform duration-500 group-hover:translate-y-0"
        style={{
          color: "var(--liquid-accent)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {label}
      </span>
    </a>
  );
}
