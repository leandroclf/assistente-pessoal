/**
 * Serviço de API
 * Responsável por gerenciar a comunicação com o backend
 */

class ApiService {
  constructor(options = {}) {
    this.webhookUrl = options.webhookUrl || "";
    this.headers = options.headers || { "Content-Type": "application/json" };
  }

  /**
   * Define a URL do webhook
   * @param {string} url - URL do webhook
   */
  setWebhookUrl(url) {
    this.webhookUrl = url;
  }

  /**
   * Envia uma pergunta para o backend e recebe uma resposta em áudio
   * @param {string} pergunta - Texto da pergunta do usuário
   * @returns {Promise<Blob>} - Blob de áudio com a resposta
   */
  async enviarPergunta(pergunta) {
    if (!this.webhookUrl) {
      throw new Error("URL do webhook não configurada");
    }

    if (!pergunta || pergunta.trim() === "") {
      throw new Error("Pergunta vazia");
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ pergunta: pergunta.trim() })
      });

      if (!response.ok) {
        throw new Error(`Erro na resposta do servidor: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
      throw error;
    }
  }

  /**
   * Cria um objeto de URL para um blob de áudio
   * @param {Blob} audioBlob - Blob de áudio
   * @returns {string} - URL do áudio
   */
  createAudioUrl(audioBlob) {
    return URL.createObjectURL(audioBlob);
  }

  /**
   * Reproduz um áudio a partir de um blob
   * @param {Blob} audioBlob - Blob de áudio para reproduzir
   * @param {Object} callbacks - Callbacks para eventos de áudio
   * @returns {HTMLAudioElement} - Elemento de áudio
   */
  reproduzirAudio(audioBlob, callbacks = {}) {
    const audioURL = this.createAudioUrl(audioBlob);
    const audio = new Audio(audioURL);

    // Configurar callbacks
    if (callbacks.onplay) audio.onplay = callbacks.onplay;
    if (callbacks.onended) audio.onended = callbacks.onended;
    if (callbacks.onerror) audio.onerror = callbacks.onerror;

    // Reproduzir áudio
    audio.play().catch(error => {
      console.error("Erro ao reproduzir áudio:", error);
      if (callbacks.onerror) callbacks.onerror(error);
    });

    return audio;
  }
}

export default ApiService;