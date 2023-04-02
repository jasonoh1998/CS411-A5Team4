# CS411-A5 Team4 Project
<p align="center">
  <img src="https://github.com/jasonoh1998/CS411-A5Team4/blob/main/pic.png" />
</p>

## Requirements
Oauth2 : Discord <br>
2+ APIS : OpenAI, Genius API <br>
DATABASE : sqlite <br>
FRONT END : React <br>
BACK END : Next.js <br>

## Project Description
This is a web application called Lyric Lab. It finds your favorite author's song lryics that you can edit and save it for later on.
It uses OpenAI text-davinci-003 to find the songs of the author you searched. When you press the song, it will show you lyrics that you can play with on your seperate page! Have fun playing with the lyrics!

## Project Install Guide
For Windows,
1. Clone
2. <pre><code>npm install // inside lyriclab</code></pre>
3. <pre><code>npx prisma init --datasource-provider sqlite</code></pre>
4. Copy paste .env.example change it to .env and fill in the blank ApiKeys
5. <pre><code>npm run dev</code></pre>

## Member
Cheolmin Oh (email: jasonoh@bu.edu) <br>
Cheng Lin (email: chengl@bu.edu) <br>
Nolan Turi (email: nturi@bu.edu)

## Extra Features That Will Be Added
- [x] Basic project that full fills all requirements
- [ ] Shorter session time for the user (Could switch to JWT)
- [ ] Delete button to delete saved songs
- [ ] No duplicated songs when artist and song name are the same
