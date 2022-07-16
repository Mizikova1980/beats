(function() {
    window.onload = function() {

        // Video
        const video = document.getElementById("yt-player");
      
        // Buttons
        const playButton = document.getElementById("play-pause");
        const muteButton = document.getElementById("mute");
          
        // Sliders
        const seekBar = document.getElementById("seek-bar");
        const volumeBar = document.getElementById("volume-bar");
       
       
       const rangeInputs = document.querySelectorAll('input[type="range"]');
       
       
        // Event listener for the play/pause button
        playButton.addEventListener("click", function() {
            if (video.paused == true) {
            // Play the video
            video.play();
                
            playButton.classList.add("paused");
            } else {
            // Pause the video
            video.pause();
                
            playButton.classList.remove("paused");
            }
    
        });
    
        // Event listener for the mute button
        muteButton.addEventListener("click", function() {
            if (video.muted == false) {
            // Mute the video
            video.muted = true;
            } else {
                // Unmute the video
                video.muted = false;
              }
                
        });
    
        // Event listener for the seek bar
        seekBar.addEventListener("input", function() {
            // Calculate the new time
            const time = video.duration * (seekBar.value / 100);
        
            // Update the video time
            video.currentTime = time;
        });
        
        // Update the seek bar as the video plays
        video.addEventListener("timeupdate", function() {
            // Calculate the slider value
            const value = (100 / video.duration) * video.currentTime;
            
        
            // Update the slider value
            seekBar.value = value;
            seekBar.style.background = `linear-gradient(90deg, #E01F3D ${value}%, #333333 ${value}%)`;
    
        });
    
        // Pause the video when the slider handle is being dragged
        seekBar.addEventListener("mousedown", function() {
            video.pause();
        });
      
      // Play the video when the slider handle is dropped
        seekBar.addEventListener("mouseup", function() {
            video.play();
        });
    
        // Event listener for the volume bar
        volumeBar.addEventListener("change", function(e) {
            // Update the video volume
           e.preventDefault();
            const value = (100 / video.volume) * volumeBar.value;
           
            video.volume = volumeBar.value;
            console.log(value);
            volumeBar.style.background = `linear-gradient(90deg, #E01F3D ${value}%, #333333 ${value}%)`;

        });
    
             
          
    }
})()



