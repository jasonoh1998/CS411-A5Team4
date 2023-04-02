import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function saveSong(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail, artist, song, lyrics } = req.body;

  try {
    const savedSong = await prisma.SavedSong.create({
        data: {
            artist: artist,
            song: song,
            lyrics: lyrics,
            user: {
                connect: {
                email: userEmail,
                },
            },
        },
    });

    res.status(200).json(savedSong);
  } catch (error) {
    console.error('Error saving song:', error);
    res.status(500).json({ message: error });
  }
}