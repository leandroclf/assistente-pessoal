# Módulos e Responsabilidades

## Interface Web (`assistente_interface.html`)
- Captura de voz do usuário via Web Speech API.
- Envio da transcrição para o backend via webhook.
- Recebimento e reprodução de resposta em áudio.
- Feedback visual de status (ouvindo, processando, respondendo).

## Fluxo de Automação (`fluxo_n8n.json`)
- Orquestração dos webhooks e processamento de perguntas.
- Integração com IA (OpenAI) para geração de resposta.
- Conversão de texto para áudio.
- Retorno da resposta em áudio para a interface.

## Configuração e Regras de Atendimento (`Assistente Hive.txt`)
- Define personalidade, objetivos e regras do assistente virtual jurídico.
- Especifica passos do atendimento e padrões de resposta.

## Integrações
- **OpenAI**: Geração de texto e síntese de voz.
- **n8n**: Automação de fluxos, webhooks e controle de contexto/memória. 