# Assistente Pessoal IA - Interface Modernizada

## Visão Geral

Este projeto implementa uma interface web moderna, responsiva e acessível para um assistente pessoal com reconhecimento de voz. A interface foi completamente refatorada seguindo as melhores práticas de desenvolvimento web, com foco em semântica HTML5, CSS modular, acessibilidade e performance.

## Estrutura do Projeto

```
assistente-pessoal/
├── assets/
│   └── audio/
│       └── button-3.mp3
├── css/
│   ├── base/
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── variables.css
│   ├── components/
│   │   └── orb.css
│   ├── layout/
│   │   └── main-layout.css
│   └── style.css
├── docs/
│   └── roteiro_modernizacao.md
├── js/
│   ├── components/
│   │   └── speech-recognition.js
│   ├── utils/
│   │   └── api-service.js
│   └── main.js
└── source/
    ├── assistente_interface.html
    └── fluxo_n8n.json
```

## Características Implementadas

### HTML Semântico
- Uso de tags semânticas HTML5 (`header`, `main`, `footer`, `section`, `figure`, etc.)
- Atributos ARIA para melhor acessibilidade
- Estrutura de documento clara e bem organizada

### CSS Modular
- Sistema de design baseado em variáveis CSS
- Arquitetura modular com separação de responsabilidades
- Abordagem mobile-first para responsividade

### JavaScript Modular
- Arquitetura baseada em componentes
- Separação de responsabilidades (reconhecimento de voz, comunicação com API)
- Melhor tratamento de erros e feedback ao usuário

### Acessibilidade
- Suporte completo a navegação por teclado
- Feedback para leitores de tela via ARIA
- Skip links para melhor navegação
- Alto contraste e foco visível

### Performance
- Carregamento otimizado de recursos
- Código modular para melhor manutenção
- Suporte a diferentes formatos de mídia

## Como Usar

1. Abra o arquivo `source/assistente_interface.html` em um navegador moderno
2. Configure a URL do webhook no arquivo `js/main.js` (substitua "COLOQUE AQUI SEU WEBHOOK")
3. Clique no orb central ou pressione Enter/Espaço quando ele estiver focado
4. Fale sua pergunta quando o orb estiver no estado "Ouvindo..."
5. Aguarde o processamento e a resposta em áudio

## Requisitos

- Navegador moderno com suporte a Web Speech API (Chrome, Edge, Safari)
- Conexão com a internet para comunicação com o backend
- Permissões de microfone habilitadas

## Desenvolvimento

Para continuar o desenvolvimento deste projeto:

1. Clone o repositório
2. Modifique os arquivos conforme necessário
3. Teste em diferentes navegadores e dispositivos
4. Consulte o documento `docs/roteiro_modernizacao.md` para mais detalhes sobre a implementação

## Próximos Passos

- Implementar testes automatizados
- Adicionar suporte a temas claro/escuro
- Melhorar o feedback visual durante o reconhecimento de voz
- Implementar cache de respostas frequentes

---

Desenvolvido com foco em acessibilidade, responsividade e boas práticas de desenvolvimento web.