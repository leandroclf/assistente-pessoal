/**
 * Módulo de reconhecimento de voz
 * Responsável por gerenciar a captura e processamento de áudio do usuário
 */

class SpeechRecognitionManager {
  constructor(options = {}) {
    this.lang = options.lang || 'pt-BR';
    this.onStart = options.onStart || (() => {});
    this.onResult = options.onResult || (() => {});
    this.onEnd = options.onEnd || (() => {});
    this.onError = options.onError || (() => {});
    this.recognition = null;
    this.isListening = false;
    this.transcript = "";
    this.silenceTimeout = null;
    this.silenceDelay = options.silenceDelay || 1000;
    this.initialize();
  }

  initialize() {
    // Verificar suporte ao reconhecimento de voz
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Este navegador não suporta reconhecimento de voz.');
      return false;
    }

    // Criar instância de reconhecimento
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = this.lang;
    this.recognition.interimResults = true;
    this.recognition.continuous = true;

    // Configurar eventos
    this.recognition.onstart = () => {
      this.isListening = true;
      this.onStart();
    };

    this.recognition.onresult = (event) => {
      let currentTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.transcript += event.results[i][0].transcript;
        } else {
          currentTranscript += event.results[i][0].transcript;
        }
      }

      this.onResult({
        finalTranscript: this.transcript,
        interimTranscript: currentTranscript
      });

      // Reiniciar o timeout de silêncio
      clearTimeout(this.silenceTimeout);
      this.silenceTimeout = setTimeout(() => this.stop(), this.silenceDelay);
    };

    this.recognition.onerror = (event) => {
      console.error('Erro de reconhecimento:', event.error);
      this.onError(event);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.onEnd(this.transcript);
    };

    return true;
  }

  start() {
    if (!this.recognition) {
      return false;
    }
    
    this.transcript = "";
    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Erro ao iniciar reconhecimento:', error);
      return false;
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      clearTimeout(this.silenceTimeout);
      this.recognition.stop();
    }
  }
}

export default SpeechRecognitionManager;