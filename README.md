<<<<<<< HEAD
# 🥊 Fighters TJRR

Um jogo de luta online desenvolvido em React + TypeScript para ser jogado com amigos de trabalho!

## 🎮 Sobre o Jogo

Fighters TJRR é um jogo de luta 2D onde dois jogadores podem batalhar usando controles de teclado ou gamepad. O jogo inclui sistema de vida, ataques, pulos e física realista.

### 🎯 Controles

**Jogador 1 (Azul):**
- **WASD** - Movimento
- **Espaço** - Pular
- **F** - Atacar

**Jogador 2 (Verde):**
- **Setas** - Movimento
- **Enter** - Pular
- **Shift Direito** - Atacar

**Gamepad:**
- **Analógico esquerdo** - Movimento
- **Botão A** - Pular
- **Botão X** - Atacar

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/FightersTJRR.git
cd FightersTJRR

# Instale as dependências
cd game
npm install
```

### Desenvolvimento Local
```bash
# Executar em modo desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 🌍 Ambientes de Deploy

O projeto está configurado com dois ambientes principais:

### 🧪 Homologação (HML)
- **Branch**: `develop`
- **URL**: Configurada via variáveis de ambiente
- **Deploy**: Automático ao fazer push para `develop`

### 🚀 Produção (PRD)
- **Branch**: `main`
- **URL**: Configurada via variáveis de ambiente
- **Deploy**: Automático ao fazer push para `main`

## 📦 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento
npm run dev:hmg      # Desenvolvimento (modo homologação)
npm run build:dev    # Build para desenvolvimento
npm run build:hmg    # Build para homologação
npm run preview:hmg  # Preview da build de homologação
```

### Produção
```bash
npm run build        # Build para produção
npm run preview:prod # Preview da build de produção
```

### Qualidade
```bash
npm run lint         # Executar linter
```

## 🔧 Configuração de Ambientes

### Variáveis de Ambiente

Crie os arquivos de configuração na pasta `game/`:

#### `.env.development`
```env
VITE_APP_ENV=development
VITE_APP_API_URL=http://localhost:3000
VITE_APP_DEBUG=true
VITE_APP_VERSION=dev
```

#### `.env.production`
```env
VITE_APP_ENV=production
VITE_APP_API_URL=https://api.fighterstjrr.com
VITE_APP_DEBUG=false
VITE_APP_VERSION=1.0.0
```

## 🚀 Deploy Automático

O projeto usa GitHub Actions para deploy automático:

### Workflow de Desenvolvimento
1. Crie uma branch feature a partir de `develop`
2. Faça suas alterações
3. Teste localmente com `npm run dev`
4. Faça commit e push para sua branch
5. Crie um Pull Request para `develop`
6. Após aprovação, merge para `develop` → **Deploy automático para HML**

### Workflow de Produção
1. Quando estiver pronto para produção, crie PR de `develop` para `main`
2. Após revisão e aprovação, merge para `main` → **Deploy automático para PRD**

## 🛡️ Segurança

O projeto inclui várias medidas de segurança:

- ✅ **Validação de input** para gamepad e teclado
- ✅ **Rate limiting** para ataques (500ms cooldown)
- ✅ **Sanitização** de dados de entrada
- ✅ **Headers de segurança** HTTP
- ✅ **Content Security Policy (CSP)**
- ✅ **Limpeza adequada** de recursos

## 📁 Estrutura do Projeto

```
game/
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   └── GameCanvas.tsx    # Componente principal do jogo
│   │   ├── engine/
│   │   │   ├── input.ts          # Sistema de input
│   │   │   └── physics.ts        # Física do jogo
│   │   └── game/
│   │       └── fighter.ts        # Classe do lutador
│   ├── config/
│   │   └── environment.ts        # Configuração de ambientes
│   ├── App.tsx
│   └── main.tsx
├── .github/workflows/
│   └── deploy.yml                # GitHub Actions
├── vite.config.ts                # Configuração do Vite
└── package.json
```

## 🔄 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📋 Checklist de Deploy

### Antes do Deploy para HML
- [ ] Código testado localmente
- [ ] Linter executado sem erros (`npm run lint`)
- [ ] Build de desenvolvimento funcionando (`npm run build:dev`)
- [ ] Variáveis de ambiente configuradas

### Antes do Deploy para PRD
- [ ] Testado em ambiente de homologação
- [ ] Build de produção funcionando (`npm run build`)
- [ ] Variáveis de produção configuradas
- [ ] Documentação atualizada

## 🐛 Solução de Problemas

### Problemas Comuns

**Erro de execução de scripts no PowerShell:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Dependências não instaladas:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build falhando:**
```bash
npm run lint  # Verificar erros de linting
npm run build:dev  # Testar build de desenvolvimento
```

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma [Issue](https://github.com/seu-usuario/FightersTJRR/issues)
- Consulte a documentação em `DEPLOYMENT.md`
- Verifique as melhorias em `IMPROVEMENTS.md`

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para os amigos de trabalho!** 🥊
=======
# FightersTJRR
# 1) Clonar o repositório e instalar
git clone https://github.com/<org_ou_user>/FightersTJRR.git
cd FightersTJRR/game
npm i
npm run dev  # roda local

# 2) Voltar pra raiz e pegar a develop
cd ..
git fetch origin
git checkout develop
git pull

# 3) Criar sua branch de feature a partir da develop
git checkout -b feature/minha-feature

# 4) Trabalhar, commitar e enviar
git add .
git commit -m "feat: descreva o que mudou"
git push -u origin feature/minha-feature

# 5) Abrir PR para 'develop' no GitHub
#    - peça review
#    - aguarde o CI verde
>>>>>>> origin/main
