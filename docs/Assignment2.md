# CS411 Lab Team Assignment 2

## Requirements

- 5 user stories
- Descriptions of what each user story covers
- "Happy path" and "exceptions"
- Information about how the user will interact with the application
- Due March 24th

## What is a User Story
- Description with prompts if needed of a set of interactions with the app from a user or subsystem's perspective
- Perspective of the end user
- Informal, general explanation of a software feature
- Further converted into use cases, then formalized requirements

# User Stories for Spotify Liked Songs Lyric Generator

## User Story 1
"As a user, I want to be able to generate lyrics based on a specific artist."

### Happy Path:
- User opens our web app
- User types a preferred artist on input search box
- Web app uses its algorithm to generate lyrics in the style of the selected artist
- Lyrics are displayed to the user on seperate page

### Unhappy Path:
- Even if the system can generate lyrics for a specific artist, there is a chance that the lyrics may be inaccurate or incomplete
- The system may only have a limited selection of artists to choose from, which could limit the user's ability to find the lyrics they are looking for
- Web app displays an error message to the user

This feature is important because users may want to create lyrics in the style of their favorite artist or a specific genre for their own creative projects or just for fun.


&nbsp;
&nbsp;
&nbsp;


## User Story 2
"As a user, I want to be able to translate the generated lyrics into different languages."

### Happy Path:
- User generates lyrics using our web app
- User chooses wanted language under the drop down menu
- User clicks a "generate" button
- Web app translates the lyrics into a selected language
- Translated lyrics are displayed to the user on seperate page

### Unhappy Path:
- Web app is unable to translate the lyrics due to a lack of available translations for the selected language
- The translation software used to generate the translated lyrics may not be accurate
- Web app displays an error message to the user

This feature is important because users may want to translate their lyrics into different languages to reach a wider audience or connect with listeners who speak different languages.

&nbsp;
&nbsp;
&nbsp;

## User Story 3
"As a user, I want to be able to personalize the generated lyrics based on my own inputs."

### Happy Path:
- User opens the Spotify lyric generator application
- User inputs the keywords or phrases they would like to be included in the lyrics then save it
- User can edit or customize the lyrics and access them (same storage as User Story 2)
- This saved lyrics will be displayed on a seperate tab distinct from the main page
- It can still use features like translate, comment, analyze

### Unhappy Path:
- The user inputs invalid characters or symbols in their personalized input, causing an error message to appear and preventing the lyrics from being generated
- The user may find that the available options for personalizing the generated lyrics are limited, preventing them from truly personalizing the output to their liking
- The lyrics generator does not respond and freezes

This feature is important because it allows users to create personalized lyrics that match their own preferences and interests.

&nbsp;
&nbsp;
&nbsp;

## User Story 4
"As a user, I want to be able to rate the generated lyrics and songs."

### Happy Path:
- User opens the Spotify lyric generator application
- Application displays a list of recently generated lyrics and songs
- User can choose analyze drop down menu and press generate
- The rate of the lyrics out of a scale of 1 to 5 stars are given with analysis

### Unhappy Path:
- If the user does not want to rate the lyrics or songs, they can skip this step
- The rating or analysis was bad for their favorite song
- When the user tries to rate a song, the system encounters a technical error that prevents the rating

This feature is important because it allows users to provide feedback on the quality of the generated lyrics and songs, and helps to improve the overall user experience.
However, the language used on analysis has to be kind to not offend people.

&nbsp;
&nbsp;
&nbsp;

## User Story 5
"As a user, I want to be able to share my favorite lyrics and songs with my friends."

### Happy Path:
- User opens the Spotify lyric generator application
- User goes to their favorite song tab or saved song/lyrics tab
- Application generates lyrics to the song and displays them on the screen
- User can press button that gives option to copy or share the lyrics
- User can press share the lyrics to social media, or send copy of text through email or message

### Unhappy Path:
- When the user tries to share a song or lyric, but the content is inappropriate or violates copyright laws, resulting in the sharing feature being disabled
- The user tries to share a song or lyric, but the sharing feature is unavailable due to technical difficulties or maintenance

This feature is important because it allows users to share their favorite music and lyrics with their friends, and helps to discover new music through social networks.

&nbsp;
&nbsp;
&nbsp;

## User Story 6
"As a user I want to be able to get an explanation of what the lyrics mean."

### Happy Path:
- User opens the Spotify lyric generator application
- User generates lyrics using our web app
- User can press button that generates an analysis of the lyrics using Genius API
- Analysis appears on seperate page

### Unhappy Path:
- When the user tries to generate an analysis, but the feature incorrectly identifies the lyrics/song.
- The feature generates an analysis that is not accurate to the song/lyrics inputed.
- The Genius API has a limited selection of songs with lyrical explanations.
- Web app displays an error message to the user.

This feature is important because it allows the user to break down the meaning behind the lyrics in existing songs, as well as analyzes original generated lyrics and gives an analysis on the meaning behind them.