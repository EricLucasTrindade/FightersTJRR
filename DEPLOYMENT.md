# Guia de Deploy - Fighters TJRR

## Estrutura de Branches

- **`main`**: Branch de produção (deploy automático)
- **`develop`**: Branch de homologação/desenvolvimento (deploy automático)

## Ambientes

### Desenvolvimento Local
```bash
# Instalar dependências
cd game
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para desenvolvimento
npm run build:dev
```

### Homologação (Staging)
```bash
# Build para homologação
npm run build:hmg

# Preview da build de homologação
npm run preview:hmg
```

### Produção
```bash
# Build para produção
npm run build

# Preview da build de produção
npm run preview:prod
```

## Deploy Automático

O projeto está configurado com GitHub Actions para deploy automático:

1. **Push para `develop`**: Deploy automático para ambiente de homologação
2. **Push para `main`**: Deploy automático para ambiente de produção

## Configuração de Variáveis de Ambiente

Crie os seguintes arquivos na pasta `game/`:

### `.env.development`
```
VITE_APP_ENV=development
VITE_APP_API_URL=http://localhost:3000
VITE_APP_DEBUG=true
VITE_APP_VERSION=dev
```

### `.env.production`
```
VITE_APP_ENV=production
VITE_APP_API_URL=https://api.fighterstjrr.com
VITE_APP_DEBUG=false
VITE_APP_VERSION=1.0.0
```

## Workflow de Desenvolvimento

1. Crie uma branch feature a partir de `develop`
2. Faça suas alterações
3. Teste localmente com `npm run dev`
4. Faça commit e push para sua branch
5. Crie um Pull Request para `develop`
6. Após aprovação, merge para `develop` (deploy automático para homologação)
7. Quando estiver pronto para produção, crie PR de `develop` para `main`
8. Merge para `main` (deploy automático para produção)

## Verificação de Build

Antes de cada deploy, o GitHub Actions executa:
- ✅ Instalação de dependências
- ✅ Linting do código
- ✅ Build do projeto
- ✅ Deploy para o ambiente correspondente
