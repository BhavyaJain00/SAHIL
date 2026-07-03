"use client";

export default function Home() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0a0908] z-50">
      <iframe
        src="/tour.html"
        className="w-full h-full border-none block"
        title="FLUX — 3D Night Studio Walkthrough"
      />
    </div>
  );
}
