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
