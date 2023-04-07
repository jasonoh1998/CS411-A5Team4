import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function deleteSong(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
		const { userEmail, artist, song } = req.body;
    try {
      	const deletedSong = await prisma.SavedSong.deleteMany({
			where: {
				artist: artist,
				song: song,
				user: {
					email: userEmail,
				},
			},
      	});

      	res.status(200).json(deletedSong);
    } catch (error) {
		console.error('Error deleting song:', error);
		res.status(500).json({ message: error });
    }
  }
}

// if (req.method === 'DELETE') {
// 	const { userEmail, artist, song } = req.body;

// 	console.log("Received values in the API:", userEmail, artist, song); // Add this line

// 	try {
// 		const deletedSong = await prisma.SavedSong.delete({
// 			where: {
// 				artist: artist,
// 				song: song,
// 				email: userEmail,
// 			},
// 		});
// 		res.status(200).json(deletedSong);
// 	} catch (error) {
// 		console.error('Error deleting song:', error);
// 		res.status(500).json({ message: error });
// 	}
// }