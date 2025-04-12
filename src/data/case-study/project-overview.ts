// src/data/case-study/project-overview.ts

export const projectOverview = {
    title: "Building Mission-Critical Access Control System",
    subtitle: "A detailed case study of SecureAccess - a mission-critical software system integrating biometric verification, access control, and permission systems to secure facility entrances.",
    
    executiveSummary: {
      content: [
        "This case study documents my development approach for creating SecureAccess - a mission-critical software system that integrates biometric verification, physical gate control, and permission systems to secure facility entrances. This project demonstrates how I've successfully applied Domain-Driven Design principles, Clean Architecture, and resilience engineering to systems with physical components and high reliability requirements.",
        "The methodical approach described represents my synthesis of established software engineering principles with practical implementation techniques, resulting in a robust, maintainable system delivered over approximately 15 days."
      ]
    },
    
    systemContext: {
      description: "The SecureAccess system manages physical access control through a series of validation steps:",
      steps: [
        { title: "Document Validation", description: "Verify visitor identification documents" },
        { title: "Permission Check", description: "Verify visitor has necessary permissions" },
        { title: "Entry Gate Control", description: "Manage the entry gate to the security area" },
        { title: "Visitor Response", description: "Confirm visitor's intention to proceed" },
        { title: "Biometric Verification", description: "Match visitor to registered biometric data" },
        { title: "Exit Gate Control", description: "Control exit from security area to secure zone" }
      ],
      integration: "The system integrates with industry-standard biometric verification systems, permission management services, and hardware controllers for physical gates and sensors."
    },
    
    developmentTimeline: {
      description: "The system was developed over approximately 15 days with distinct phases reflecting my methodical approach to building complex systems. Each phase built upon the foundation of the previous one, resulting in a comprehensive solution delivered efficiently."
    }
  };