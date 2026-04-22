# API contract

## Purpose

Describe the minimum payload expected between the Expo app and the backend.

## Upload endpoint

- Method: POST
- Path: /events/upload

## Request content type

multipart/form-data

## Fields

- id: string
- type: string
- description: string
- tags: string # comma-separated initially
- image: file

## Example values

- id: EVT-20260422-001
- type: Damaged Item
- description: Crack visible on lower casing
- tags: damaged,inspection,warehouse

## Response

### Success

- HTTP 200 or 201
- JSON success response

### Failure

- HTTP 4xx or 5xx
- JSON error response

## Notes

- Confirm exact route and response shape before wiring mobile form submission
- Confirm any backend field naming constraints
