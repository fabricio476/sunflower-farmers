# Sunflower Farmer - Offline Edition 🌻

Uma versão offline do jogo Sunflower Farmers, sem dependência de blockchain.

![Game Screenshot](https://user-images.githubusercontent.com/11745561/130713259-f87fd1b4-a6f1-4b25-b8b9-4eff6beee9e9.png)

## 🎮 Sobre

Esta é uma versão modificada do Sunflower Farmers que funciona completamente offline, sem necessidade de:
- Carteira MetaMask
- Tokens de criptomoeda
- Conexão com blockchain

O jogo salva automaticamente seu progresso no navegador (localStorage).

## 🚀 Como Rodar

### Opção 1: Script Local (Recomendado)
```bash
./run_local.sh
```

### Opção 2: Manual
```bash
npm install
npm start
```

O jogo abrirá automaticamente em `http://localhost:3000`

## 🎯 Funcionalidades

- **1.000.000 moedas iniciais** - para testar todas as funcionalidades
- **Salva automático** - progresso salvo no navegador
- **Pan/Arrastar tela** - Shift + clique ou botão do meio do mouse
- **Upgrade de fazenda** - expanda seus campos de plantio
- **Crafting** - crie ferramentas e itens

## 📁 Estrutura do Código

```
src/
  dapp/           # Aplicação React
    components/   # Componentes do jogo
    utils/        # Utilitários (localStorage, etc)
    Blockchain.ts # Mock do blockchain (localStorage)
```

## 🎨 Créditos

O código é licenciado sob MIT. 

Sprites base: [Sunnyside Asset Pack](https://danieldiggle.itch.io/sunnyside) por [Daniel Diggle](https://twitter.com/DanielDiggle)

> ⚠️ Verifique permissões antes de usar os assets gráficos em outros projetos.

## 📝 Mudanças desta Versão

- ❌ Removida dependência de Web3/Blockchain
- ❌ Removidos contratos Solidity
- ✅ Adicionado armazenamento local (localStorage)
- ✅ Adicionado pan/arrastar da tela
- ✅ Corrigidos bugs de upgrade
- ✅ Melhorada a experiência de desenvolvimento local
