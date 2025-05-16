# TODO - Planejamento de Desenvolvimento

1. **Configurar Webhook no HTML**
   - Definir a URL do backend no arquivo `assistente_interface.html`.
   - Prioridade: Alto
   - Dependências: Nenhuma

2. **Ajustar Fluxo n8n para Produção**
   - Revisar e adaptar o fluxo `fluxo_n8n.json` para ambiente real.
   - Prioridade: Alto
   - Dependências: 1

3. **Implementar Validação de Entrada**
   - Garantir que apenas perguntas válidas sejam processadas.
   - Prioridade: Médio
   - Dependências: 2

4. **Adicionar Logs e Monitoramento**
   - Incluir logs de requisições e respostas para auditoria.
   - Prioridade: Médio
   - Dependências: 2

5. **Documentar Exemplos de Uso**
   - Adicionar exemplos práticos de requisições e respostas na documentação.
   - Prioridade: Baixo
   - Dependências: 3

6. **Testes de Integração Completa**
   - Realizar testes ponta-a-ponta do fluxo voz → IA → áudio.
   - Prioridade: Alto
   - Dependências: 4 