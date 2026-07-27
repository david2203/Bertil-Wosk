// Embeds a Spotify track, episode, playlist, album or show.
// Accepts a normal share link (with or without an /intl-xx/ segment and
// ?si= tracking param) or a spotify:track:… URI.
function parseSpotify(
  url: string
): { type: string; id: string } | null {
  const uri = url.match(/^spotify:(track|episode|playlist|album|show):([\w]+)/);
  if (uri) return { type: uri[1], id: uri[2] };

  const web = url.match(
    /open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|episode|playlist|album|show)\/([\w]+)/
  );
  if (web) return { type: web[1], id: web[2] };

  return null;
}

// Single items get Spotify's compact player; collections need the taller one.
const HEIGHTS: Record<string, number> = {
  track: 152,
  episode: 152,
  playlist: 352,
  album: 352,
  show: 352,
};

export function SpotifyEmbed({ url, title }: { url: string; title: string }) {
  const parsed = parseSpotify(url);
  if (!parsed) return null;

  const height = HEIGHTS[parsed.type] ?? 152;

  return (
    <iframe
      title={title}
      src={`https://open.spotify.com/embed/${parsed.type}/${parsed.id}`}
      width="100%"
      height={height}
      loading="lazy"
      allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      style={{ border: 0, borderRadius: "12px" }}
    />
  );
}
