// src/data/design-patterns/behavioral-patterns.ts

export const behavioralPatterns = [
    {
      name: "Strategy Pattern",
      problem: "Defining a family of algorithms, encapsulating each one, and making them interchangeable.",
      benefits: [
        "Created interchangeable algorithm implementations for different environments",
        "Enabled runtime strategy selection based on context",
        "Improved testability by substituting strategies during testing"
      ],
      codeSnippet: `// Strategy interface
  public interface IBiometricScanSubscription : IDisposable
  {
      Task Handle(Action<BiometricVerificationResult> callback, TimeSpan timeout);
  }
  
  // Concrete strategy implementations
  public class BiometricScanSubscription : IBiometricScanSubscription
  {
      // Implementation for real biometric scanner...
  }
  
  public class MockBiometricScanSubscription : IBiometricScanSubscription
  {
      // Implementation for mock scanner...
  }
  
  // Context that uses the strategy
  public class BiometricScanStep : IBiometricScanStep
  { 
      private readonly IBiometricService biometricService;
      
      public async Task<bool> Process(IVisitorContext context)
      {
          await context.ActivateBiometricScannerAsync();
  
          // Get the appropriate strategy from the context
          using IBiometricScanSubscription scanSubscription = context.CreateScanSubscription();
          
          var success = false;
  
          await scanSubscription.Handle((scanResult) =>
          {
              // Process the result
              success = scanResult == BiometricVerificationResult.Success;
          }, this.options.BiometricScanTimeout);
  
          // Further processing...
          return success;
      }
  }`,
      category: "behavioral"
    },
    {
      name: "Observer Pattern",
      problem: "Defining a one-to-many dependency between objects so when one object changes state, all dependents are notified.",
      benefits: [
        "Implemented loosely coupled event communication between system components",
        "Created responsive user interactions based on asynchronous events",
        "Enabled multiple components to react to the same events independently"
      ],
      codeSnippet: `public class BiometricEventService : BackgroundService, IBiometricEventService
  {
      // Event for biometric verification - observer pattern
      public event EventHandler<BiometricVerificationEventArgs> BiometricVerificationEvent;
  
      // Method to raise the event
      protected virtual void OnBiometricVerificationEvent(BiometricVerificationEventArgs e)
      {
          BiometricVerificationEvent?.Invoke(this, e);
      }
  
      private async Task ProcessEventMessageAsync(string message)
      {
          try {
              // Parse biometric verification events  
              var verificationEvent = await ParseVerificationEventAsync(message);
              if (verificationEvent != null)
              {
                  logger.LogInformation("Biometric verification event detected: {PersonalId}, success: {IsSuccessful}",
                      verificationEvent.PersonalId, verificationEvent.IsSuccessful);
  
                  // Raise the event to notify subscribers
                  OnBiometricVerificationEvent(new BiometricVerificationEventArgs(
                      verificationEvent.PersonalId,
                      verificationEvent.IsSuccessful,
                      verificationEvent.Timestamp));
              }
          }
          catch (Exception ex) {
              logger.LogError(ex, "Error processing event message");
          }
      }
  }`,
      category: "behavioral"
    },
    // Added Command pattern
    {
      name: "Command Pattern",
      problem: "Encapsulating a request as an object, allowing parameterization of clients with different requests.",
      benefits: [
        "Encapsulated each access control step as a self-contained command",
        "Enabled flexible sequencing and conditional execution of steps",
        "Improved testability by testing commands individually"
      ],
      codeSnippet: `// Each process step is effectively a command
  public interface IGateProcessStep
  {
      Task<bool> Process(IVisitorContext context);
  }
  
  // Concrete command implementation
  public class BiometricScanStep : IBiometricScanStep
  { 
      private readonly IManualControl manualControl;
      private readonly IGateController gateController;
      private readonly IBiometricService biometricService;
      
      private readonly ProcessingOptions options;
      private readonly ILogger<BiometricScanStep> logger;
  
      public async Task<bool> Process(IVisitorContext context)
      {
          logger.LogInformation("Processing Step 5: Biometric Verification");
          
          if (context.IsStepProcessed(ProcessStep.BiometricScan))
          {
              logger.LogInformation("Step already processed, skipping");
              return true;
          }
  
          await context.ActivateBiometricScannerAsync();
  
          using IBiometricScanSubscription scanSubscription = context.CreateScanSubscription();
          
          var success = false;
  
          await scanSubscription.Handle((scanResult) =>
          {
              // Process the result
              success = scanResult == BiometricVerificationResult.Success;
          }, this.options.BiometricScanTimeout);
  
          if (!success)
          {
              logger.LogInformation("Visitor {PersonalId} biometric scan failed", context.Visitor.PersonalId);
              await gateController.ActivateBiometricScanFailedSignal();
              await manualControl.TriggerManualEntryGateControlAsync(context.Visitor, this);
              context.ManualOverrideActive();
          }
  
          await context.StepProcessed(ProcessStep.BiometricScan, success);
          return success;
      }
  }`,
      category: "behavioral"
    },
    // Added State pattern
    {
      name: "State Pattern",
      problem: "Allowing an object to alter its behavior when its internal state changes.",
      benefits: [
        "Created a self-managing visitor entity that maintains its own state",
        "Implemented clear state transitions based on process outcomes",
        "Ensured consistent state management across the application"
      ],
      codeSnippet: `public class Visitor
  {
      public VisitorStatus Status { get; private set; }
      
      public void StepProcessed(ProcessStep step, bool success)
      {
          if(this.Status == VisitorStatus.ManuallyOverridden)
          {
              throw new InvalidOperationException("Visitor process was manually overridden, cannot change state");
          }
          if (this.Status == VisitorStatus.Abandoned)
          {
              throw new InvalidOperationException("Abandoned visitors can't be processed");
          }
  
          if (success)
          {
              if (stepsProcessed.Any(x => x.Step == step)) 
                  throw new Exception("Step already processed: " + step);
                  
              stepsProcessed.Add(new CompletedStep(this, step, DateTime.Now));
          }
          
          // State transitions based on current step and success
          switch (step)
          {
              case ProcessStep.DocumentValidation:
                  Status = success ? VisitorStatus.DocumentValidated : VisitorStatus.DocumentInvalid;
                  break;
              case ProcessStep.Permission:
                  Status = success ? VisitorStatus.PermissionGranted : VisitorStatus.PermissionDenied;
                  break;
              case ProcessStep.EntryGate:
                  Status = success ? VisitorStatus.EntryCompleted : VisitorStatus.EntryFailed;
                  break;
              // Additional state transitions...
          }
      }
      
      public void ManuallyOverridden() 
      {
          this.Status = VisitorStatus.ManuallyOverridden;
      }
      
      public void Abandoned()
      {
          this.Status = VisitorStatus.Abandoned;
      }
  }`,
      category: "behavioral"
    },
    // Added Template Method pattern
    {
      name: "Template Method",
      problem: "Defining the skeleton of an algorithm in a base class while allowing subclasses to override specific steps.",
      benefits: [
        "Reused common gate control logic across different hardware implementations",
        "Simplified adding support for new hardware devices",
        "Ensured consistent behavior while allowing device-specific customization"
      ],
      codeSnippet: `public abstract class AbstractGateController : IGateController
  {
      // Template methods that implement common algorithm
      public async Task<bool> IsEntryGateClosed()
      {
          return await GetInput(pinMappings.EntryGate.ClosedSensorPin) == true;
      }
  
      public async Task OpenEntryGate()
      {
          logger.LogDebug("Opening entry gate");
          await SetOutput(pinMappings.EntryGate.ControlPin, true);
      }
  
      // Abstract methods to be implemented by concrete classes
      protected abstract Task<bool> SetOutputOnDevice(int number, bool state);
      protected abstract Task<bool> GetInputFromDevice(int number);
  }
  
  // Concrete implementation
  public class HardwareGateController : AbstractResilientGateController
  {
      protected override async Task<bool> GetInputFromDevice(int number)
      { 
          // Add brief delay between operations
          await Task.Delay(50);
          using var client = new HardwareClient(this.options.Value.Host, this.options.Value.Port); 
          return await client.GetDigitalInputAsync(number); 
      }
      
      protected override async Task<bool> SetOutputOnDevice(int number, bool state)
      {
          using (var client = new HardwareClient(this.options.Value.Host, this.options.Value.Port))
          {
              await client.SetDigitalOutputAsync(number, state);
              // Add delay after sending command
              await Task.Delay(100);
          }
          return true;
      }
  }`,
      category: "behavioral"
    }
  ];