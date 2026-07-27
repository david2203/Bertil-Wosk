import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CollectionBlock } from "@/lib/types";
import { localePath } from "@/lib/routes";
import { Section } from "@/components/ui/Section";
import { ResourceGrid } from "@/components/blocks/ResourceGrid";
import { ResourceCard } from "@/components/blocks/ResourceCard";
import { AudioPlayer } from "@/components/blocks/AudioPlayer";
import { SpotifyEmbed } from "@/components/blocks/SpotifyEmbed";
import { PostGrid } from "@/components/blocks/PostGrid";
import { VideoGrid } from "@/components/blocks/VideoGrid";
import { SearchableCollection } from "@/components/blocks/SearchableCollection";

// Renders items pulled from one collection. Each source gets the
// presentation that suits it: players for audio, embeds for video,
// cards for talks and posts.
export function CollectionSection({
  block,
  lang,
  dict,
}: {
  block: CollectionBlock;
  lang: Locale;
  dict: Dictionary;
}) {
  // GROQ slices need constant bounds, so the editor's "Max antal" is applied
  // here. Items without a slug (unpublished drafts) can't be linked to.
  const items = (block.items ?? [])
    .filter((i) => i.slug)
    .slice(0, block.limit ?? 100);
  const tone = block.tone ?? "surface";
  const onDark = tone === "petrol";

  if (items.length === 0) return null;

  // Search and the featured item are opt-in per block, so a short "latest
  // three" module stays a plain grid. Only when one is enabled do we hand
  // rendering to the client component (and ship its JavaScript).
  const isFeed = block.source === "video" || block.source === "post";
  const interactive =
    isFeed && (block.showSearch === true || block.showFeatured === true);

  if (interactive) {
    return (
      <Section tone={tone}>
        <SearchableCollection
          source={block.source as "video" | "post"}
          items={items}
          heading={block.heading}
          intro={block.intro}
          lang={lang}
          labels={dict.search}
          readMore={dict.blog.readMore}
          onDark={onDark}
          hrefBase={localePath(lang, "/blogg")}
          featuredLabels={dict.featured}
          showSearch={block.showSearch === true}
          showFeatured={block.showFeatured === true}
        />
      </Section>
    );
  }

  return (
    <Section tone={tone}>
      {block.heading || block.intro ? (
        <div className="mb-8">
          {block.heading ? (
            <h2 className={`text-2xl md:text-3xl ${onDark ? "text-white" : ""}`}>
              {block.heading}
            </h2>
          ) : null}
          {block.intro ? (
            <p className={`mt-2 ${onDark ? "text-white/70" : "text-muted"}`}>
              {block.intro}
            </p>
          ) : null}
        </div>
      ) : null}

      {block.source === "meditation" ? (
        <div className="max-w-2xl space-y-4">
          {items.map((m) =>
            m.sourceType === "spotify" && m.spotifyUrl ? (
              <SpotifyEmbed key={m._id} url={m.spotifyUrl} title={m.title} />
            ) : (
              <AudioPlayer
                key={m._id}
                src={m.audioUrl}
                title={m.title}
                durationMinutes={m.durationMinutes}
                minutesLabel={dict.meditations.minutes}
                playLabel={dict.meditations.play}
                pauseLabel={dict.meditations.pause}
              />
            )
          )}
        </div>
      ) : null}

      {block.source === "foredrag" ? (
        <ResourceGrid>
          {items.map((f) => (
            <ResourceCard
              key={f._id}
              title={f.title}
              description={f.description}
              href={localePath(lang, `/foredrag/${f.slug}`)}
              sources={["foredrag"]}
            />
          ))}
        </ResourceGrid>
      ) : null}

      {block.source === "video" ? (
        <VideoGrid items={items} lang={lang} onDark={onDark} />
      ) : null}

      {block.source === "post" ? (
        <PostGrid
          items={items}
          hrefBase={localePath(lang, "/blogg")}
          readMore={dict.blog.readMore}
          lang={lang}
        />
      ) : null}
    </Section>
  );
}
