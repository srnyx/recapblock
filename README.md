# RecapBlock

**Extension page:** [chrome.srnyx.com/recapblock](https://chrome.srnyx.com/recapblock)

RecapBlock is a Chrome extension that blocks movie/TV show recap videos from playing on YouTube. This way, you won't accidentally spoil any movies/shows for yourself!

## How it works

1. The extension checks if you're on a YouTube video page
2. If you are, it will get the channel that uploaded the video
3. It will then get that channel's ID
4. It will check that ID against a list of [**known** recap channels](https://srnyx.com/recapblock/data)
5. If the channel is a known recap channel, the video player will be hidden and a message will be displayed
6. If you want to play the video anyway, you can click the `Yes, I'm sure, gimme the spoilers!` button in the message

Maybe one day it can use AI to detect if a video is a recap or not...
