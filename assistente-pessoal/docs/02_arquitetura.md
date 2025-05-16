# Arquitetura do Sistema

## Descrição Geral
O sistema é composto por uma interface web para interação por voz, um backend de automação (n8n) e integrações com serviços de IA (OpenAI) e síntese de áudio.

## Componentes Principais
- **Interface Web**: HTML/JS para captura de voz, envio de perguntas e reprodução de áudio.
- **n8n**: Orquestração dos fluxos, recebimento de webhooks, processamento de linguagem natural e resposta em áudio.
- **OpenAI**: Geração de respostas em linguagem natural e síntese de voz.

## Fluxo de Dados
1. Usuário interage com a interface web (voz).
2. Pergunta é enviada via webhook para o n8n.
3. n8n processa a entrada, utiliza IA para gerar resposta e converte para áudio.
4. Resposta em áudio é retornada à interface e reproduzida ao usuário.

## Diagrama (Textual)
```
[Usuário] ⇄ [Interface Web] ⇄ [Webhook n8n] ⇄ [IA/Processamento] ⇄ [Áudio de Resposta]
``` 