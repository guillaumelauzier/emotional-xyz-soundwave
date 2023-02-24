/*
Create an analyzer node: The analyzer node is 
used to analyze the audio data in real-time. 
You can create an analyzer node using the 
createAnalyser() method of the AudioContext object, like this:
*/

const analyzer = audioContext.createAnalyser();
analyzer.fftSize = 2048;
