# Guia: VSCode + Claude Code

## Duas formas de usar o Claude Code

### 1. Extensao do VSCode (Painel lateral)

A forma mais visual e integrada de usar o Claude Code.

**Como abrir:**

- Clicar no icone do Claude na barra lateral esquerda do VSCode
- Ou usar o atalho `Ctrl+Shift+P` e escrever "Claude"

**Funcionalidades principais:**

- O Claude ve automaticamente os ficheiros que tens abertos no editor
- Podes selecionar codigo no editor e o Claude recebe essa selecao como contexto
- As respostas aparecem diretamente no painel lateral
- Podes aprovar ou rejeitar alteracoes a ficheiros diretamente na interface

**Dicas de uso:**

- Seleciona codigo antes de fazer uma pergunta para dar contexto ao Claude
- Usa `@` para referenciar ficheiros especificos na conversa
- O Claude consegue ler, editar e criar ficheiros diretamente no teu projeto

---

### 2. Terminal integrado do VSCode

Para quem prefere a linha de comandos ou precisa de mais controlo.

**Como abrir o terminal:**

- Usar o atalho `` Ctrl+J `` (Ctrl + J)
- Ou ir ao menu: `Terminal > New Terminal`
- Ou usar `Ctrl+Shift+P` e escrever "Terminal: Create New Terminal"

**Como iniciar o Claude Code no terminal:**

```bash
# Iniciar uma sessao interativa
claude

# Iniciar com uma pergunta direta
claude "explica-me este projeto"

# Continuar a ultima conversa
claude --continue

# Retomar uma conversa especifica
claude --resume
```

**Comandos uteis dentro da sessao do Claude:**

| Comando | O que faz |
|---------|-----------|
| `/help` | Mostra todos os comandos disponiveis |
| `/clear` | Limpa a conversa atual |
| `/compact` | Compacta o contexto (util para conversas longas) |
| `/cost` | Mostra o custo da sessao atual |
| `/doctor` | Diagnostica problemas de configuracao |
| `/init` | Cria um ficheiro CLAUDE.md para o projeto |
| `/review` | Faz review do codigo |
| `/commit` | Cria um commit com mensagem gerada pelo Claude |

**Atalhos de teclado no terminal:**

| Atalho | Acao |
|--------|------|
| `Enter` | Enviar mensagem (com nova linha: `Shift+Enter`) |
| `Ctrl+C` | Cancelar a resposta atual |
| `Escape` | Interromper o Claude |
| Setas cima/baixo | Navegar no historico de mensagens |

---

## Quando usar cada modo?

| Situacao | Modo recomendado |
|----------|------------------|
| Editar ficheiros rapidamente | Extensao (painel lateral) |
| Dar contexto visual (selecionar codigo) | Extensao (painel lateral) |
| Tarefas complexas com muitos passos | Terminal |
| Executar comandos git, npm, etc. | Terminal |
| Sessoes longas de desenvolvimento | Terminal |
| Ver alteracoes lado a lado | Extensao (painel lateral) |

---

## Configuracao importante: CLAUDE.md

O ficheiro `CLAUDE.md` na raiz do projeto da instrucoes permanentes ao Claude. Aqui defines:

- Regras do projeto (stack, convencoes)
- Comandos de build/test/lint
- Estrutura do projeto
- Qualquer instrucao que o Claude deve seguir sempre

O Claude le este ficheiro automaticamente no inicio de cada conversa.

---

## Dicas gerais

1. **Se claro e especifico** - Quanto mais contexto deres, melhor o resultado
2. **Usa o CLAUDE.md** - Define regras para nao teres de repetir instrucoes
3. **Aprova com cuidado** - Revisa sempre as alteracoes antes de aceitar
4. **Usa /compact em conversas longas** - Evita perder contexto quando a conversa fica grande
5. **Combina os dois modos** - Podes ter a extensao e o terminal abertos ao mesmo tempo
