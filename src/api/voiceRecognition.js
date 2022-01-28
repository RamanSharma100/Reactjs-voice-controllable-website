const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || false;
if (!SpeechRecognition) {
  console.log("not allowed");
}
export const recognition = new SpeechRecognition();
export const speak = (
  message,
  stopReco = false,
  greet,
  setGreet,
  setStopReco
) => {
  const speech = new window.SpeechSynthesisUtterance(message);
  // speech.text = message;
  // speech.pitch = 1;
  // speech.volume = 1;

  if (stopReco) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }

  speech.onend = () => {
    if (!greet) {
      setGreet(true);
    }
    if (greet && stopReco) {
      recognition.start();
      setStopReco(false);
    }
  };
};
