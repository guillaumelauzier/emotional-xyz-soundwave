/*
Create a media stream source: Next, you need 
to create a media stream source, which represents 
the audio input from the user's microphone. This can 
be done using the getUserMedia() method of the 
navigator.mediaDevices object, like this:
*/

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    const source = audioContext.createMediaStreamSource(stream);
  })
  .catch(function(err) {
    console.log("The following error occurred: " + err);
  });
