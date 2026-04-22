# Copilot Instructions for Event Cap

- Use TypeScript for both backend and mobile code
- Keep changes small and easy to review
- Before making multi-file changes, propose a short plan first
- Backend code lives in `backend/`
- Mobile code lives in `mobile/`
- Treat only `docs/active/` as current planning context
- Treat `docs/archive/` as historical context only
- Prefer simple Expo and React Native patterns over unnecessary abstraction
- Do not add libraries unless they are justified for the current task
- Do not introduce authentication, cloud services, or database complexity unless explicitly requested
- Explain package installs before suggesting them
- Current priority: get the first Expo capture-and-upload flow working cleanly
