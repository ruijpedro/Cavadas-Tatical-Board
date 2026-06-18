# Cavadas Tactical V10 Estável

Esta versão foi preparada para estabilizar WebApp e APK.

Inclui:
- `npm run build` validado localmente na base enviada.
- Workflows GitHub Actions revistos:
  - `build-web.yml`
  - `build-android.yml`
- Android recriado automaticamente se `android/gradlew` estiver em falta.
- Base Vite com `base: './'`.
- Mantém:
  - campos SVG profissionais;
  - identidade 2YOU;
  - timeline;
  - controlo + / - de jogadores;
  - biblioteca;
  - IA Cavadas;
  - IA Vision;
  - PDF;
  - preparação MP4.

## Como usar

1. Extrai o ZIP.
2. Faz upload dos ficheiros e pastas soltos para o GitHub.
3. Vai a Actions.
4. Corre primeiro `Build Cavadas Tactical WebApp`.
5. Se passar, corre `Build Cavadas Tactical Android APK`.
6. No telemóvel, desinstala a versão antiga antes de instalar a nova APK.


## Validação local
Build WebApp validado com `npm install` e `npm run build` usando cache temporária.
Resultado: OK
