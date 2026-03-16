export default function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-mono bg-surface border border-border text-text-secondary rounded">
      {name}
    </span>
  )
}
