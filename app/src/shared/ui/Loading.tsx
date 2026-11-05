export default function Loading() {
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center">
      <div className="size-12 rounded-full border-4 border-white/20 border-t-white motion-safe:animate-spin" />
    </div>
  );
}
