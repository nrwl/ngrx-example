export interface Filters {
  speaker: string;
  title: string;
  minRating: number;
}

export function createFiltersObject({
  title,
  speaker,
  highRating
}: {
  title: string;
  speaker: string;
  highRating: false;
}): Filters {
  const minRating = highRating ? 9 : 0;
  return { speaker: speaker || null, title: title || null, minRating };
}
