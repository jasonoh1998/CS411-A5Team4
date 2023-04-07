import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

let isSaving = false; // prevents fast click save

export default async function saveSong(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail, artist, song, lyrics } = req.body;

  if (isSaving) {
    res.status(429).json({ message: 'A save operation is already in progress' });
    return;
  }

  isSaving = true

  try {
    const existingSong = await prisma.SavedSong.findFirst({
        where: {
            artist: artist,
            song: song,
            user: {
                email: userEmail,
            },
        },
    });

    if (!existingSong) {
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

    } else {
        res.status(409).json({ message: 'Song already exists' });
    }
    
  } catch (error) {
      console.error('Error saving song:', error);
      res.status(500).json({ message: error });
  } finally {
      isSaving = false; // reset to original
  }
}
