# 🥊 Fighters TJRR

Jogo de luta online para amigos de trabalho!

## 🚀 Como Começar

### 1) Instalar e rodar local
```bash
git clone https://github.com/EricLucasTrindade/SondaLutadoresTJRR.git
cd SondaLutadoresTJRR/game
npm i
npm run dev  # acesse http://localhost:5173
```

### 2) Fluxo de Desenvolvimento

#### Para HOMOLOGAÇÃO (desenvolvimento):
```bash
# Sempre partir da develop
cd ..
git checkout develop
git pull

# Criar sua feature
git checkout -b feature/minha-feature

# Trabalhar, commitar e enviar
git add .
git commit -m "feat: descreva o que mudou"
git push -u origin feature/minha-feature

# Abrir PR para 'develop' no GitHub
# Aguardar CI verde e aprovação
```

#### Para PRODUÇÃO:
```bash
# Quando estiver pronto, criar PR de develop → main
# Após aprovação, merge para main
# Deploy automático para GitHub Pages!
```

## 🎮 Controles

**Jogador 1 (Azul):**
- WASD - Movimento
- Espaço - Pular  
- F - Atacar

**Jogador 2 (Verde):**
- Setas - Movimento
- Enter - Pular
- Shift Direito - Atacar

## 🌐 URLs

- **Local**: http://localhost:5173
- **Produção**: https://ericlucastrindade.github.io/SondaLutadoresTJRR

## 📋 Checklist

- [ ] Código testado localmente
- [ ] `npm run lint` sem erros
- [ ] `npm run build` funcionando
- [ ] PR criado para develop
- [ ] CI verde
- [ ] Aprovado por review
