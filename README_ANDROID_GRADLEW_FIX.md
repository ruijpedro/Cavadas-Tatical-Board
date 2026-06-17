# Correção Android Gradle Wrapper

Erro corrigido:
`chmod: cannot access 'gradlew': No such file or directory`

Causa:
A pasta `android` existia, mas estava incompleta e não tinha `android/gradlew`.

Correção:
O workflow agora verifica:
- se `android/gradlew` não existir;
- apaga a pasta `android`;
- recria com `npx cap add android`;
- corre `npx cap sync android`;
- compila com `./gradlew assembleDebug`.
