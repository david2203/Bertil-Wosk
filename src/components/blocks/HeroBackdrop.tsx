// Flat layered-landscape placeholder shown until a real hero photo is added.
// Swap for a <next/image> nature photo via the Hero `image` prop.
export function HeroBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 460"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="1200" height="460" fill="#DCE7E5" />
      <circle cx="960" cy="130" r="70" fill="#E7C879" />
      <ellipse cx="300" cy="520" rx="720" ry="300" fill="#7C9A92" />
      <ellipse cx="950" cy="570" rx="760" ry="300" fill="#3E6157" />
      <ellipse cx="560" cy="700" rx="900" ry="320" fill="#1F4E5F" />
    </svg>
  );
}
