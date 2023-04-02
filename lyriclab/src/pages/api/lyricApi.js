import { getLyrics, getSong } from 'genius-lyrics-api';
import { env } from "~/env.mjs";

const options = {
	apiKey: env.GENIUS_ACCESS_TOKEN,
	title: 'Blinding Lights',
	artist: 'The Weeknd',
	optimizeQuery: true
};

getLyrics(options).then((lyrics) => console.log(lyrics));


// const path = require('path')
// require("dotenv").config({path: path.resolve(__dirname, '../../../../.env')});

// const getLyrics = require("./getLyrics")
// const options = {
// 	apiKey: process.env.GENIUS_ACCESS_TOKEN,
// 	title: 'baby',
// 	artist: 'justin',
// 	optimizeQuery: true,
// }
// getLyrics(options).then((lyrics)=>console.log(lyrics));


// const getSong = require("./getSong")
// getSong(options).then((song)=>
// console.log(`
// ${song.lyrics}`)
// )


// const searchSong = require("./searchSong")
// const options = {
// 	apiKey: process.env.GENIUS_ACCESS_TOKEN,
// 	title: 'baby',
// 	artist: 'justin'
// }
// searchSong(options).then((song)=>
// 	console.log(song)
// )