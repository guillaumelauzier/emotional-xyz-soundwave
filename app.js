// Initialize AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Define the sound wave
const frequency = 440; // Frequency of the sound wave in Hz
const duration = 3; // Duration of the sound wave in seconds
const sampleRate = audioContext.sampleRate;
const numSamples = duration * sampleRate;
const waveBuffer = audioContext.createBuffer(1, numSamples, sampleRate);
const waveData = waveBuffer.getChannelData(0);
for (let i = 0; i < numSamples; i++) {
  waveData[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate);
}

// Create the oscillator node and connect to the output
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
oscillator.connect(audioContext.destination);

// Create a stereo panner node for the horizontal positioning
const panner = audioContext.createStereoPanner();
panner.pan.setValueAtTime(0, audioContext.currentTime);
oscillator.connect(panner);

// Define a function to map a value from one range to another
function map(value, fromMin, fromMax, toMin, toMax) {
  return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
}

// Get the user's input (voice pitch and emotion)
const voicePitch = 200; // Sample value, to be replaced with actual input
const emotion = 0.5; // Sample value, to be replaced with actual input

// Map the voice pitch to the vertical positioning
const verticalPosition = map(voicePitch, 0, 1000, -1, 1);

// Map the emotion to the depth positioning
const depthPosition = map(emotion, 0, 1, 1, -1);

// Set the panner position based on the vertical and depth positions
panner.pan.setValueAtTime(verticalPosition, audioContext.currentTime);
panner.setPosition(0, 0, depthPosition);

// Start the oscillator
oscillator.start();
