# Connect mobile app to backend

Read:

- docs/active/current-plan.md
- docs/active/current-task.md
- docs/reference/api-contract.md
- .github/copilot-instructions.md

We are connecting the Expo mobile app to the existing backend.

Task:
Implement the minimum upload flow from mobile to backend using the agreed API contract.

Before editing files:

1. Explain the request shape in plain English
2. List the files you will change
3. Give the exact implementation plan
4. State any assumptions about backend URL, field names, and response shape

Rules:

- Keep the solution simple
- Prefer standard Expo / React Native request patterns
- Do not redesign the backend unless necessary
- Call out anything that cannot work on a physical device with localhost

After approval:

- Implement only the agreed changes
- Explain how to test with simulator and physical device
- Suggest a commit message
