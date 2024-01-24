document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');
    let recognition;

    const startRecognition = () => {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        outputDiv.innerText = transcript;
        
        // Check for security threat keywords
        checkSecurityKeywords(transcript);
      };

      recognition.onerror = (event) => {
        outputDiv.innerText = 'Error occurred. Please try again.';
      };

      recognition.onend = () => {
        outputDiv.innerText += '\nRecording stopped. Click the button to start again.';
        setTimeout(() => {
          startRecognition(); // Restart recognition after a delay (adjust as needed)
        }, 3000); // Restart after 3 seconds (adjust as needed)
      };

      recognition.start();
      outputDiv.innerText = 'Listening...';
    };

    const checkSecurityKeywords = (transcript) => {
      const threatKeywords = ['guns', 'knives', 'kills', 'weapons'];

      for (const keyword of threatKeywords) {
        if (transcript.toLowerCase().includes(keyword)) {
          notifySecurityBreach();
          return;
        }
      }
    };

    const notifySecurityBreach = () => {
      // This is a basic example; you would typically use a more robust notification mechanism
      alert('Security Breach: Detected threat-related keywords!');
    };

    const startButton = document.createElement('button');
    startButton.innerText = 'Start Recording';
    startButton.className = 'recording';
    startButton.onclick = startRecognition;

    document.body.appendChild(startButton);
  });