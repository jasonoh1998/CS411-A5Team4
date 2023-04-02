import type { NextApiRequest, NextApiResponse } from 'next';
import { getLyrics } from 'genius-lyrics-api';
import { env } from "~/env.mjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, artist } = req.query;

  try {
    const options = {
      apiKey: env.GENIUS_ACCESS_TOKEN,
      title: title as string,
      artist: artist as string,
      optimizeQuery: true,
    };

    const lyrics = await getLyrics(options);
    res.status(200).json({ lyrics });
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    res.status(500).json({ error: 'Error fetching lyrics' });
  }
}