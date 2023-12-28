window.addEventListener('yt-navigate-finish', main, false);

function main() {
    let attempts = 0;
    let videoLoaded = false;

    let jsLoadTimer = setInterval(() => {
        if (attempts > 10) {
            console.log('[RecapBlock] Failed to wait for page to load, aborting after 10 attempts');
            clearInterval(jsLoadTimer);
            return;
        }
        attempts++;
        console.log('[RecapBlock] Attempting to check if page is loaded, this is attempt ' + attempts);

        // Check if video is loaded
        videoLoaded = document.getElementById('movie_player');
        if (!videoLoaded) return;

        // Get the channel ID from the webpage
        const classes = document.getElementById('text')?.getElementsByTagName('a');
        if (!classes || classes.length === 0) return;
        const channelId = classes[0]?.href?.split('/')[3].substring(1);
        if (!channelId) return;
        console.log('[RecapBlock] channelId: ', channelId);

        // Hide the video player and display a message (with option to show video)
        fetch('https://srnyx.com/recapblock/data')
            .then(response => response.json())
            .then(json => {
                console.log('[RecapBlock] Response: ', json);
                if (!json.channels.includes(channelId.toLowerCase())) {
                    document.getElementById('movie_player').style.display = 'block';
                    document.getElementById('recapblock-message')?.remove();
                    console.log(document.getElementById('recapblock-message'));
                    console.log('[RecapBlock] Channel not blacklisted, video shown and warning message removed');
                    return;
                }
                console.log('[RecapBlock] Blacklisted channel: ', channelId)

                // Pause and hide video
                document.querySelector('.ytp-play-button').click();
                document.getElementById('movie_player').style.display = 'none';

                // Create message
                const message = document.createElement('div');
                message.id = 'recapblock-message';
                message.innerHTML = '<b>This video may spoil an entire movie!</b> <br> Are you sure you want to ruin the movie for yourself? <br>';
                message.style.color = '#d9d9d9';
                message.style.backgroundColor = '#d11b1b';
                message.style.border = 'solid';
                message.style.borderRadius = '20px';
                message.style.borderWidth = '5px';
                message.style.borderColor = 'maroon';
                message.style.fontSize = '20px';
                message.style.textAlign = 'center';
                message.style.padding = '20px';
                message.style.width = '50%';
                message.style.position = 'absolute';
                message.style.top = '50%';
                message.style.left = '50%';
                message.style.transform = 'translate(-50%, -50%)';

                // Create button
                const button = document.createElement('button');
                button.id = 'recapblock-show-video';
                button.innerHTML = "Yes, I'm sure, gimme the spoilers!";
                button.style.color = '#d9d9d9';
                button.style.backgroundColor = 'maroon';
                button.style.border = 'dashed';
                button.style.borderRadius = '10px';
                button.style.fontSize = '15px';
                button.style.padding = '10px';
                button.style.marginTop = '20px';
                button.style.cursor = 'pointer';

                // Add message and button to page
                message.appendChild(button);
                document.getElementById('ytd-player').appendChild(message);

                // Add event listener to button
                button.addEventListener('click', () => {
                    document.getElementById('movie_player').style.display = 'block';
                    document.querySelector('.ytp-play-button').click();
                    message.remove();
                    console.log('[RecapBlock] Video shown and warning message removed');
                });

                console.log('[RecapBlock] Video hidden and warning message displayed');
            });

        clearInterval(jsLoadTimer);
    }, 500);
}