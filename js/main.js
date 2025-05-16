/**
 * Assistente Pessoal IA - Script Principal
 * Implementação modular e acessível do assistente de voz
 */

// Importação de módulos
import SpeechRecognitionManager from './components/speech-recognition.js';
import ApiService from './utils/api-service.js';

// Elementos do DOM
const orb = document.getElementById('orb');
const ring = document.getElementById('ring');
const statusText = document.getElementById('status');
const beep = document.getElementById('beep');
const srAnnouncer = document.getElementById('screen-reader-announcer');

// Configuração
const WEBHOOK_URL = "https://n8n.yukz.com.br/webhook/receber-audio"; // URL do webhook para processamento da IA

// Inicialização dos serviços
const apiService = new ApiService({
  webhookUrl: WEBHOOK_URL
});

// Gerenciador de reconhecimento de voz
const speechRecognition = new SpeechRecognitionManager({
  lang: 'pt-BR',
  silenceDelay: 1000,
  
  // Evento de início do reconhecimento
  onStart: () => {
    orb.classList.add('listening');
    ring.classList.add('listening');
    statusText.textContent = "Ouvindo...";
    srAnnouncer.textContent = "Ouvindo sua pergunta";
  },
  
  // Evento de resultado do reconhecimento
  onResult: (result) => {
    // Feedback visual opcional para resultados parciais
    // console.log("Transcrição parcial:", result.interimTranscript);
  },
  
  // Evento de fim do reconhecimento
  onEnd: async (transcript) => {
    orb.classList.remove('listening');
    ring.classList.remove('listening');
    
    if (transcript && transcript.trim() !== '') {
      statusText.textContent = "Processando...";
      srAnnouncer.textContent = "Processando sua pergunta";
      
      try {
        // Enviar pergunta para o backend
        const audioBlob = await apiService.enviarPergunta(transcript);
        
        // Reproduzir resposta
        apiService.reproduzirAudio(audioBlob, {
          onplay: () => {
            orb.classList.add('playing');
            ring.classList.add('playing');
            statusText.textContent = "Respondendo...";
            srAnnouncer.textContent = "Reproduzindo resposta";
          },
          onended: () => {
            orb.classList.remove('playing');
            ring.classList.remove('playing');
            statusText.textContent = "Clique para falar";
            srAnnouncer.textContent = "Assistente pronto para nova pergunta";
          },
          onerror: (error) => {
            console.error("Erro ao reproduzir áudio:", error);
            statusText.textContent = "Erro ao reproduzir resposta";
            srAnnouncer.textContent = "Erro ao reproduzir resposta";
          }
        });
        
      } catch (error) {
        console.error("Erro ao processar pergunta:", error);
        statusText.textContent = "Erro ao falar com a IA";
        srAnnouncer.textContent = "Ocorreu um erro ao processar sua pergunta";
      }
    } else {
      statusText.textContent = "Clique para falar";
    }
  },
  
  // Evento de erro do reconhecimento
  onError: (event) => {
    console.error('Erro de reconhecimento:', event.error);
    orb.classList.remove('listening');
    ring.classList.remove('listening');
    statusText.textContent = "Erro: " + event.error;
    srAnnouncer.textContent = "Erro no reconhecimento de voz: " + event.error;
  }
});

/**
 * Inicia o processo de reconhecimento de voz
 */
function startListening() {
  // Reproduzir som de feedback
  beep.play().catch(error => {
    console.warn("Não foi possível reproduzir o som de feedback:", error);
  });
  
  // Iniciar reconhecimento
  if (!speechRecognition.start()) {
    statusText.textContent = "Seu navegador não suporta reconhecimento de voz";
    srAnnouncer.textContent = "Seu navegador não suporta reconhecimento de voz";
  }

    orb.click();
  };


// Evento de clique no orb
orb.addEventListener('click', () => {
  startListening();
});

// Acessibilidade: ativar por teclado (Enter ou Espaço)
orb.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    startListening();
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se o webhook está configurado
  if (WEBHOOK_URL === "COLOQUE AQUI SEU WEBHOOK") {
    console.warn("⚠️ Webhook não configurado. Configure a URL do webhook para funcionamento completo.");
  }
  
  // Verificar suporte a recursos necessários
  if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    statusText.textContent = "Seu navegador não suporta reconhecimento de voz";
    srAnnouncer.textContent = "Seu navegador não suporta reconhecimento de voz";
    orb.classList.add('disabled');
  }
});