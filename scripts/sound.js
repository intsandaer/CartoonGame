//play sound
function playSound(soundobj) {
    var sound=document.getElementById(soundobj);
    sound.play();
}

//stop sound
function stopSound(soundobj) {
    var sound=document.getElementById(soundobj);
    sound.pause();
    sound.currentTime = 0;
}
