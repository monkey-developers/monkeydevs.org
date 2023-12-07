import type React from "react";

export function ProjectsPage({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center">
      <div className="h-[700px]"></div>
      {children}
    </section>
  );
}
