export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xl font-bold tabular-nums tracking-tight sm:text-2xl">
        {value}
      </p>
      <p className="mt-0.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  );
}
