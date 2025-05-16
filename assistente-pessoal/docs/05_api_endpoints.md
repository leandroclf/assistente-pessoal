# API e Endpoints

## Webhooks (n8n)

### 1. Receber Pergunta (POST)
- **Endpoint:** `/jarvison`
- **Método:** POST
- **Parâmetros:**
  - `pergunta` (string): Texto transcrito da fala do usuário.
- **Retorno:**
  - Áudio (binário) com a resposta da IA.
- **Exemplo de Requisição:**
```json
POST /jarvison
{
  "pergunta": "Qual o prazo para recurso?"
}
```

### 2. Receber Áudio (POST)
- **Endpoint:** `/receber-audio`
- **Método:** POST
- **Parâmetros:**
  - `pergunta` (string): Texto transcrito da fala do usuário.
- **Retorno:**
  - Áudio (binário) com a resposta da IA.

## Observações
- Os endpoints são configurados no fluxo n8n e podem ser customizados conforme necessidade.
- O retorno é sempre um áudio gerado a partir da resposta textual da IA. 