$(document).ready(function() {
    // Function to load music files and count
    function loadMusicFiles() {
        let owner = 'DreamStudioCode'; // owner_username
        let repo = 'music'; // repository_name
        let branch = 'main'; // or whichever branch you want to access

        $.ajax({
            url: `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
            method: 'GET',
            success: function(data) {
                const mp3Files = data.tree.filter(file => /\.mp3$/i.test(file.path));

                // Update music file count in dropdown
                if (mp3Files.length > 0) {
                    $('#file-type-select').append(`<option value="music">Music (${mp3Files.length})</option>`);
                    $('#mp3-select').empty();

                    // Populate the dropdown with MP3 file options
                    mp3Files.forEach(function(file, index) {
                        const filePath = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`;
                        $('#mp3-select').append(`<option value="${filePath}">${file.path.split('/').pop()}</option>`);
                        
                        // Set the first file as the default
                        if (index === 0) {
                            $('#mp3-select').val(filePath);
                            $('#audio-player').attr('src', filePath);
                        }
                    });

                    // Event listener to change the audio source when a new file is selected
                    $('#mp3-select').on('change', function() {
                        const selectedFile = $(this).val();
                        if (selectedFile) {
                            $('#audio-player').attr('src', selectedFile);
                            $('#audio-player')[0].pause();
                            $('#audio-player')[0].currentTime = 0;
                        }
                    });
                } else {
                    // Hide music-related elements if no files are found
                    $('#mp3-select, #audio-player').hide();
                }
            },
            error: function(err) {
                console.error('Error fetching music files:', err);
            }
        });
    }

    // Function to load image files and count
    function loadImageFiles() {
        let owner = 'modelearth'; // owner_username
        let repo = 'requests'; // repository_name
        let branch = 'main'; // or whichever branch you want to access

        $.ajax({
            url: `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
            method: 'GET',
            success: function(data) {
                const imageFiles = data.tree.filter(file => /\.(jpg|jpeg|gif)$/i.test(file.path));

                if (imageFiles.length > 0) {
                    $('#file-type-select').append(`<option value="images">Images(${imageFiles.length})</option>`);

                    // Clear the gallery and append new images
                    $('.gallery').empty();
                    imageFiles.forEach(function(file) {
                        const imagePath = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`;
                        const thumbnail = `<div class="thumbnail">
                            <a href="${imagePath}" alt="${file.path}"><img src="${imagePath}" alt="${file.path}"></a>
                        </div>`;
                        $('.gallery').append(thumbnail);
                    });
                } else {
                    // Hide image-related elements if no files are found
                    $('.gallery').hide();
                }
            },
            error: function(err) {
                console.error('Error fetching image files:', err);
            }
        });
    }

    // Automatically load music and image files, and count
    loadMusicFiles();  // Music files will be pulled and displayed on page load
    loadImageFiles();  // Image files will be pulled and displayed on page load

    // Dropdown listener to switch between music and image files
    $('#file-type-select').on('change', function() {
        const selectedType = $(this).val();
        
        if (selectedType === 'music') {
            $('.gallery').hide();        // Hide the gallery
            $('#mp3-select, #audio-player').show();   // Show the audio player and mp3 select
        } else if (selectedType === 'images') {
            $('#mp3-select, #audio-player').hide();   // Hide the audio player and mp3 select
            $('.gallery').show();        // Show the gallery
        }
    });
});
