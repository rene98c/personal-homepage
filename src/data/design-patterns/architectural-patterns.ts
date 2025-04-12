// src/data/design-patterns/architectural-patterns.ts

export const architecturalPatterns = [
    {
      name: "Clean Architecture",
      problem: "Creating a separation of concerns with dependencies pointing inward toward the domain layer.",
      benefits: [
        "Created a highly maintainable system with clear separation of concerns",
        "Ensured that business rules are isolated from infrastructure details",
        "Simplified testing by focusing on domain logic without external dependencies"
      ],
      codeSnippet: `// Domain layer (innermost, no external dependencies)
  public interface IGateProcessStep
  {
      Task<bool> Process(IVisitorContext context);
  }
  
  public interface IAccessControlService
  {
      Task ProcessAsync(IVisitorContext visitorSession);
  }
  
  // Application layer (depends only on domain)
  public class BiometricScanStep : IBiometricScanStep
  {
      private readonly IManualControl manualControl;
      private readonly IGateController gateController;
      private readonly IBiometricService biometricService;
      // Dependencies...
      
      public async Task<bool> Process(IVisitorContext context)
      {
          // Implementation...
      }
  }
  
  // Infrastructure layer (implements interfaces from domain and application)
  public class HardwareGateController : AbstractResilientGateController
  {
      // Implementation of interfaces defined in inner layers...
  }`,
      category: "architectural"
    },
    // Added Hexagonal Architecture pattern
    {
      name: "Hexagonal Architecture (Ports and Adapters)",
      problem: "Isolating the core application from external concerns to improve maintainability and testability.",
      benefits: [
        "Achieved complete isolation of the domain model from external dependencies",
        "Created a highly testable architecture with easy dependency substitution",
        "Enabled flexible adaptation to different external systems"
      ],
      codeSnippet: `// Port (interface) - primary port for the application core
  public interface IBiometricService
  {
      Task<bool> DeleteUserAsync(string personalId);
      Task<bool> ActivateBiometricVerificationAsync(string personalId);
      Task<bool> DeactivateBiometricVerificationAsync(string personalId);
  }
  
  // Primary adapter - adapting the application to external world
  public class BiometricService : AbstractResilientBiometricService
  {
      private readonly IBiometricDeviceManager deviceManager;
      private readonly IBiometricUserManager userManager;  
      
      // Implementation...
      
      protected override async Task<bool> HttpActivateRequestAsync(string personalId)
      {
          return await deviceManager.EnableBiometricVerificationAsync(options.DeviceId);
      }
      // Other methods...
  }
  
  // Secondary adapter (mock for testing) - adapting external world to application
  public class MockBiometricService : IBiometricService
  {
      // Mock implementation...
  }
  
  // Service registration with adapter selection
  services.AddSingleton<IBiometricService>(sp =>
      sp.GetRequiredService<IOptions<TestingOptions>>().Value.UseMockServices.BiometricService
          ? sp.GetRequiredService<MockBiometricService>()
          : sp.GetRequiredService<BiometricService>()
  );`,
      category: "architectural"
    }
  ];