import { Track } from "@/utils/types"
import { Client, LyricLine } from "lrclib-api"

const client = new Client()

function getParsedTrackInfo(track: Track) {
  let title = track.title.trim()
  let artists: string[] = []

  // 1. Try to extract "artist - " from the title
  const artistDashRegex = /^(.*?)[\s]*[-–—][\s]+(.*)$/

  const titleMatch = title.match(artistDashRegex)

  if (titleMatch && titleMatch.length > 2) {
    // We found the "Artist - Title" pattern
    const newArtist = titleMatch[1].trim()
    title = titleMatch[2].trim() // New title is the part after the dash

    // Use the extracted artist as the *only* artist
    // We assume the comma separation method is ONLY for publisher_metadata
    artists = [newArtist]
  } else {
    // soundcloud still does not support multiple artists :/
    // Use comma separation method for publisher_metadata, else use username
    if (track.publisher_metadata?.artist) {
      artists = track.publisher_metadata.artist
        .split(",")
        .map((artist) => artist.trim())
        .filter((artist) => artist.length > 0)
    } else {
      artists = [track.user.username.trim()]
    }
  }

  // 3. Remove trailing brackets from the title
  const trailingBracketsRegex = /[\s]*([\(\[][^\]\)]+[\)\]]|[\{][^\}]+[\}])$/g

  let prevTitle = ""
  // Loop to handle cases like "Song (Mix) [Edit]"
  while (title !== prevTitle) {
    prevTitle = title
    title = title.replace(trailingBracketsRegex, "").trim()
  }

  return {
    title: title,
    artists: artists,
  }
}

export async function fetchTrackLyrics(track: Track) {
  const { title, artists } = getParsedTrackInfo(track)

  for (const a of artists) {
    console.log("querying lyrics: ", title, a)
    const query = {
      track_name: title,
      artist_name: a,
    }

    try {
      let lyrics: LyricLine[] | null = null
      let synced = false

      lyrics = await client.getSynced(query)

      if (lyrics) {
        console.log("found synced lyrics for track", track.title, lyrics)
        synced = true
      } else {
        lyrics = await client.getUnsynced(query)
        if (lyrics) {
          console.log("found unsynced lyrics for track", track.title, lyrics)
        }
      }

      if (lyrics) {
        return {
          lyrics,
          synced,
        }
      } else {
        console.log("no lyrics found for track", track)
        return null
      }
    } catch (error) {
      console.error("Error fetching lyrics:", error)
      return null
    }
  }
}
