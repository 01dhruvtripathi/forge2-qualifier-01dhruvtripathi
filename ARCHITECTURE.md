# Architecture

This project was built using a **two-agent system**: Hermes acting as the planner (Brain) and OpenClaw acting as the executor (Hands).

## Agent Roles
- **Hermes (Brain)**: Responsible for reading the high-level product requirements, translating them into a technical specification, breaking them down into steps, and delegating those steps to the coder.
- **OpenClaw (Hands)**: Responsible for taking the step-by-step instructions from Hermes, running terminal commands, generating code files, and iterating based on test results.

## Model Routing
- **Hermes**: Routed to a heavy reasoning model (`google/gemini-3.1-pro-preview`) to ensure a flawless implementation plan and edge-case handling.
- **OpenClaw**: Routed to a fast execution model (`google/gemini-2.5-flash`) to ensure quick terminal interactions, fast code generation, and rapid iterations.

## Slack Channel Scheme
- `#sprint-main`: The main coordination channel where the Human (Product Owner) posts the requirements and Hermes posts the technical plans.
- `#agent-coder`: The channel where Hermes delegates coding tasks to OpenClaw.
- `#agent-log`: Used for verbose logging and internal status updates.
