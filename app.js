const app = ()=>{
	const song = document.querySelector('.song');
	const play = document.querySelector('.play');
	const outline = document.querySelector('.moving-outline circle');
	const video = document.querySelector('.vid-container video');
	const timeSelect = document.querySelectorAll(".time-select button");
	// Sounds
	const sounds = document.querySelectorAll('.sound-picker button');
	// Time display
	const timeDisplay = document.querySelector('.time-display');
	// Get Length of the outline
	const outlineLenght = outline.getTotalLength();
	// Duration
	let fakeDuration = 600;
	outline.style.strokeDasharray = outlineLenght;
	outline.style.strokeDashoffset = outlineLenght;
	
	// Pick song
	sounds.forEach(sound =>{
		sound.addEventListener('click',function(){
			song.src = this.getAttribute('data-sound');
			video.src = this.getAttribute('data-video');
			checkPlaying(song);
		})
	});
	
	
	//Play Sound
	play.addEventListener('click',()=>{
		checkPlaying(song);
	});
	
	//Create function to stop and play the sounds
	const checkPlaying = song =>{
			if(song.paused){
				song.play();
				video.play();
				play.src='./svg/pause.svg';
			
			}else{
				song.pause();
				video.pause();
				play.src='./svg/play.svg';
			}
						
	}
	//Select sound
	timeSelect.forEach(option => {
		option.addEventListener("click",function(){
			  fakeDuration = this.getAttribute("data-time");
			  console.log("fakeDuration="+fakeDuration);
  timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
	});});
	
	
	
	
	
	// WE can animate the circle
	song.ontimeupdate = () =>{
		let currentTime = song.currentTime;
		let elapsed = fakeDuration - currentTime;
		let seconds = Math.floor(elapsed % 60); // reset counter at 60;
		let minutes = Math.floor(elapsed / 60); 
		
		// Animate progress bar
		let progress = outlineLenght - (currentTime / fakeDuration) * outlineLenght;
		outline.style.strokeDashoffset = progress;
		
		//Animate the Text
		timeDisplay.textContent = `${minutes}:${seconds}`;
		
		if(currentTime>=fakeDuration){
			song.pause();
			song.currentTime=0;
			play.src='./svg/play.svg';
			video.pause;
		}
		
	}
}

app();