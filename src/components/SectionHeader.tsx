"use client";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8 text-center">
      <div className="font-display text-[11px] tracking-[0.3em] text-orange-400">{eyebrow}</div>
      <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">{subtitle}</p>
    </div>
  );
}
