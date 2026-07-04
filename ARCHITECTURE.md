
## Model Routing Rationale
As requested in Section 06, I routed both Hermes (planning) and OpenClaw (coding) to `google/gemini-2.5-flash`. The rationale for this is that the Kanban task was straightforward enough that it did not require the heavy reasoning of a pro model. Using the flash model across the board ensured maximum execution speed, reduced latency in the chat loop, and kept the entire stack neatly within a single free ecosystem without hitting any rate limits.
