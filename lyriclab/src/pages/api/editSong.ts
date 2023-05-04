import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// this is the API call to edit selected song from your account
export default async function editSong(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userName, userEmail, artist, song, lyrics } = req.body;
        try {
            // First, find the existing song
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
                res.status(404).json({ message: 'Song not found' });
                return;
            } else {
                const editedPrefix = `${userName}'s edited `;
                if(!artist.startsWith(editedPrefix)){
                // Create a new song with the updated artist name and lyrics
                const updatedSong = await prisma.SavedSong.create({
                    data: {
                    artist: userName + "'s edited "+artist,
                    song: song,
                    lyrics: lyrics,
                    user: {
                        connect: {
                        email: userEmail,
                        },
                    },
                    },
                });
                res.status(200).json(updatedSong);
                } else {
                    // Update the existing song with new lyrics
                    const updatedSong = await prisma.SavedSong.update({
                    where: { id: existingSong.id },
                    data: { lyrics: lyrics },
                    });
                    res.status(200).json(updatedSong);
                }
            }
        } catch (error) {
            console.error('Error editing song:', error);
            res.status(500).json({ message: error });
        }
    }
}