#!/bin/bash

# Define o caminho para o Node local
export PATH="$(pwd)/.node_local/bin:$PATH"

echo "Usando Node: $(node -v)"
echo "Usando NPM: $(npm -v)"

# Se node_modules não existir, instala as dependências
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências (isso pode demorar na primeira vez)..."
    npm install
fi

# Inicia o jogo
echo "Iniciando o jogo..."
npm start
