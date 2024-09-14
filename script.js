document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const channelList = document.getElementById('channel-list');
    const jsonURL = 'channels.json'; // Ruta al archivo JSON con la lista de canales

    let player;

    function initPlayer(manifestUrl, drmConfig) {
        if (player) {
            player.destroy();
        }

        player = dashjs.MediaPlayer().create();
        player.initialize(videoPlayer, manifestUrl, true);

        if (drmConfig) {
            player.setProtectionData(drmConfig);
        }
    }

    function loadChannels() {
        fetch(jsonURL)
            .then(response => response.json())
            .then(channels => {
                channels.forEach(channel => {
                    const channelItem = document.createElement('div');
                    channelItem.classList.add('channel-item');
                    channelItem.textContent = channel.name;
                    channelItem.addEventListener('click', () => {
                        initPlayer(channel.manifestUrl, channel.drmConfig);
                    });
                    channelList.appendChild(channelItem);
                });
            })
            .catch(error => console.error('Error loading channels:', error));
    }

    loadChannels();
});
