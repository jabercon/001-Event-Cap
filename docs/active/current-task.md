# Current task: scaffold Expo mobile app

## Objective

Create the first working mobile app in Expo that captures an image and item metadata, then posts the payload to the backend.

## In scope

- Create Expo app under `mobile/`
- Use TypeScript
- Add one main screen only
- Add fields:
  - id (generated in app)
  - type
  - description
  - tags
- Add image capture / selection
- Add upload action to backend
- Display success / error message

## Out of scope

- Authentication
- Offline sync
- Database persistence redesign
- Multi-screen navigation
- Advanced UI polish
- Cloud hosting

## Assumptions

- Backend upload endpoint already works
- Backend can accept multipart/form-data
- Local mobile testing will be done first
- For simulator/device testing, backend URL may need local network IP rather than localhost

## Files expected to change

- mobile/\*\*
- docs/reference/api-contract.md
- docs/reference/structure.txt
- README.md (optional)
