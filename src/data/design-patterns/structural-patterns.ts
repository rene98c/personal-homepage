// src/data/design-patterns/structural-patterns.ts

export const structuralPatterns = [
    {
      name: "Adapter Pattern",
      problem: "Converting the interface of a class into another interface clients expect.",
      benefits: [
        "Successfully integrated with third-party systems using different interfaces",
        "Isolated the application from external API changes",
        "Enabled seamless switching between different service implementations"
      ],
      codeSnippet: `// External service interface
  public interface IBiometricService
  {
      Task<bool> DeleteUserAsync(string personalId);
      Task<bool> ActivateBiometricVerificationAsync(string personalId);
      Task<bool> DeactivateBiometricVerificationAsync(string personalId);
  }
  
  // Adapter implementation for the real biometric service
  public class BiometricService : AbstractResilientBiometricService
  {
      private readonly IBiometricDeviceManager deviceManager;
      private readonly IBiometricUserManager userManager;  
      
      // Adapting external system methods to the interface
      protected override async Task<bool> HttpActivateRequestAsync(string personalId)
      {
          return await deviceManager.EnableBiometricVerificationAsync(options.DeviceId);
      }
  
      protected override async Task<bool> HttpDeactivateRequestAsync(string personalId)
      {
          return await deviceManager.DisableBiometricVerificationAsync(options.DeviceId);
      }
  
      protected override async Task<bool> HttpDeleteUserAsync(string personalId)
      {
          return await userManager.DeleteUserAsync(personalId);
      }
  }`,
      category: "structural"
    },
    {
      name: "Facade Pattern",
      problem: "Providing a simplified interface to a complex subsystem of classes.",
      benefits: [
        "Simplified client interaction with complex access control process",
        "Reduced dependencies between subsystems",
        "Created a clear, high-level interface for the access control workflow"
      ],
      codeSnippet: `public class AccessControlService : IAccessControlService
  {
      private readonly IDocumentValidationStep documentValidationStep;
      private readonly IPermissionStep permissionStep;
      private readonly IEntryGateStep entryGateStep;
      private readonly IVisitorResponseStep visitorResponseStep;
      private readonly IBiometricScanStep biometricScanStep;
      private readonly IExitGateStep exitGateStep;
  
      // Constructor with dependency injection...
  
      public async Task ProcessAsync(IVisitorContext context)
      {
          if (!await documentValidationStep.Process(context))
          {
              return;
          }
          if (!await permissionStep.Process(context))
          {
              return;
          }
          try
          {
              await ProcessPermittedVisitorUntilCompleted(context);
          }
          catch (ManualOverrideException)
          {
              // Security staff manually handling the situation
              return;
          }
      }
  
      private async Task ProcessPermittedVisitorUntilCompleted(IVisitorContext context)
      {
          // Logic for processing the visitor through gates...
      }
  }`,
      category: "structural"
    },
    // Added the Composite Pattern
    {
      name: "Composite Pattern",
      problem: "Composing objects into tree structures to represent part-whole hierarchies.",
      benefits: [
        "Created unified notification system that supports multiple channels",
        "Easily extended system with new notification targets",
        "Maintained consistent notification interface across different platforms"
      ],
      codeSnippet: `public class CompositeStatusNotifier : IStatusNotifier
  {
      private readonly ILogger<CompositeStatusNotifier> logger; 
      private readonly List<IStatusNotifier> notifiers = new List<IStatusNotifier>();
  
      public CompositeStatusNotifier(ILogger<CompositeStatusNotifier> logger)
      {
          this.logger = logger;
          
          // Add default notifiers
          notifiers.Add(new LoggingStatusNotifier(logger));
          
          // Add platform-specific notifiers
          if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
          {
              notifiers.Add(new WindowsEventLogNotifier("SecureAccessService"));
          }
      }
  
      public Task NotifyHealthyStatus(string component, string? details = null)
      {
          // Dispatch to all child notifiers
          foreach (var notifier in notifiers)
          {
              notifier.NotifyHealthyStatus(component, details);
          }
  
          return Task.CompletedTask;
      }
  
      // Other notification methods...
  } `,
      category: "structural"
    }
  ];