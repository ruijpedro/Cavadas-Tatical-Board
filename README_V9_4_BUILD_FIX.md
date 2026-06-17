# Cavadas Tactical V9.4 — Build Fix

Corrigido erro de build:

Expected ";" but found "const"

Causa:
Dois hooks ficaram colados na mesma linha:

const [configJogadoresV94...] = useState(...)const [configTreino...] = useState(...)

Correção:
Separação dos `const` em linhas distintas no `src/main.jsx`.
