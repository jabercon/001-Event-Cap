# Architecture

## Current system shape

- `backend/` contains the Express + TypeScript API
- `mobile/` will contain the Expo + React Native + TypeScript app
- Copilot guidance lives under `.github/`
- Current working notes live under `docs/active/`
- Long-term reference notes live under `docs/reference/`
- Completed notes move to `docs/archive/`

## Mobile responsibility

The mobile app is responsible for:

- image capture or image selection
- generating a temporary unique id
- collecting type, description, and tags
- sending the payload to the backend

## Backend responsibility

The backend is responsible for:

- receiving multipart/form-data
- saving the uploaded image
- returning success/failure
- later: persisting metadata in a database
