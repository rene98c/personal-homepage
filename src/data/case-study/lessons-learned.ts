// src/data/case-study/lessons-learned.ts

export const lessonsLearned = {
    successFactors: [
      {
        title: "Start with the domain model",
        description: "Establishing a clear domain model before tackling technical concerns provided a stable foundation."
      },
      {
        title: "Interfaces before implementations",
        description: "Defining clean interfaces for external systems enabled early testing and simplified integration."
      },
      {
        title: "Build resilience in from the start",
        description: "Implementing resilience patterns alongside core functionality ensured robust behavior."
      },
      {
        title: "Test at multiple levels",
        description: "The combination of unit tests, integration tests, and scenario-based testing provided comprehensive coverage."
      },
      {
        title: "Consider operational needs early",
        description: "Adding health checks, monitoring, and diagnostics early made the system production-ready."
      }
    ],
    
    challenges: [
      {
        challenge: "Integrating with physical hardware that might be unavailable during development.",
        solution: "Created a flexible mock infrastructure that could simulate various hardware behaviors."
      },
      {
        challenge: "Handling failures in critical vs. non-critical operations differently.",
        solution: "Implemented a resilience framework with explicit criticality classification."
      },
      {
        challenge: "Testing complex physical interaction scenarios.",
        solution: "Developed a dedicated scenario testing tool with configurable components."
      },
      {
        challenge: "Ensuring configuration flexibility across environments.",
        solution: "Created a hierarchical configuration system with validation and clear documentation."
      }
    ]
  };