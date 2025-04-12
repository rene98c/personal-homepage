// src/data/case-study/distinctive-aspects.ts

export const distinctiveAspects = [
    {
      number: 1,
      title: "Explicit Criticality Classification",
      description: "I explicitly classified operations as \"critical\" or \"non-critical\" with different resilience strategies:",
      details: [
        {
          title: "Critical operations",
          description: "Must eventually succeed for system integrity, use unlimited retries with circuit breakers"
        },
        {
          title: "Non-critical operations",
          description: "Can fail without breaking core functionality, use limited retries with fallbacks"
        }
      ],
      conclusion: "This classification went beyond typical retry strategies to provide a nuanced approach to failure handling based on operational impact."
    },
    {
      number: 2,
      title: "Purpose-Built Scenario Testing Tool",
      description: "I developed a dedicated scenario testing tool that allows for testing specific failure scenarios, toggling between mock and real external systems, and interactive verification of system behavior. This tool bridged the gap between automated testing and manual verification, proving invaluable for validating complex physical interactions."
    },
    {
      number: 3,
      title: "Physical Integration Testing Strategy",
      description: "I implemented a unique approach to testing physical integrations with mock implementations that simulate realistic physical behavior, integration tests that could selectively use real or mocked hardware, and health checks specifically designed for physical hardware components. This strategy allowed for comprehensive testing without requiring physical hardware for every test scenario."
    },
    {
      number: 4,
      title: "Manual Override Design",
      description: "The system included carefully designed manual override capabilities for security staff with explicit exception types for manual interventions, clear workflow for handling manual overrides, and logging and auditing of manual interventions. This design recognized that physical access control systems must accommodate human intervention in exceptional circumstances."
    }
  ];