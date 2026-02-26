import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MediaContent } from "@/components/media/media-content";
import { PageBackground } from "@/components/layout/page-background";
import { coachInfo, mediaContent } from "@/lib/coaching-data";

export const metadata = {
  title: `Analysis & Media | ${coachInfo.name}`,
  description:
    "Football analysis articles, opinions, podcast episodes and press appearances by Daniel de Sousa, UEFA B Football Coach.",
};

async function fetchLatestYoutubeVideo(channelId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } } // cache 1 hour
    );
    if (!res.ok) return null;
    const xml = await res.text();
    const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export default async function MediaPage() {
  const coachesVoiceChannel = mediaContent.recommendedChannels.find(
    (c) => c.youtubeChannelId
  );
  const latestVideoId = coachesVoiceChannel?.youtubeChannelId
    ? await fetchLatestYoutubeVideo(coachesVoiceChannel.youtubeChannelId)
    : null;

  return (
    <>
      <Header />
      <PageBackground imageUrl="/images/backgrounds/bench.png" showGlowOrbs />
      <MediaContent latestVideoId={latestVideoId ?? undefined} />
      <Footer />
    </>
  );
}
