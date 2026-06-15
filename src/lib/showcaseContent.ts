import { getCollection } from "astro:content";

export async function getShowcaseData() {
  const appEntries = await getCollection("apps");
  const patchNoteEntries = await getCollection("patchNotes");
  const postEntries = await getCollection("posts");

  const apps = appEntries
    .filter((entry) => !entry.data.draft)
    .map((entry) => ({ ...entry.data, slug: entry.id.replace(/\/index$/, "") }))
    .sort((a, b) => a.id - b.id);

  const patchNotes = patchNoteEntries
    .filter((entry) => !entry.data.draft)
    .map((entry) => entry.data)
    .sort((a, b) => b.date.localeCompare(a.date));

  const posts = postEntries
    .filter((entry) => !entry.data.draft)
    .map((entry) => ({ ...entry.data, slug: entry.id.replace(/\/index$/, "") }))
    .sort((a, b) => a.id - b.id);

  return { apps, patchNotes, posts };
}
