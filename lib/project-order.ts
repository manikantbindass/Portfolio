// Owner-selected positions. Keep these separate from project metadata and update dates.
export const pinnedProjectSlugs = ["dsa", "chainpass", "enterprise-rag"] as const;

export function isProjectPinned(slug: string): boolean {
  return pinnedProjectSlugs.some(pinned => pinned === slug);
}

export function orderProjects<T extends { slug: string; updatedAt: string }>(
  projects: readonly T[],
): T[] {
  const positions = new Map<string, number>(pinnedProjectSlugs.map((slug, index) => [slug, index]));
  return [...projects].sort((a, b) => {
    const aPosition = positions.get(a.slug);
    const bPosition = positions.get(b.slug);
    if (aPosition !== undefined || bPosition !== undefined)
      return (aPosition ?? pinnedProjectSlugs.length) - (bPosition ?? pinnedProjectSlugs.length);
    return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
  });
}
