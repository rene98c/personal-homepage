# Software Design Patterns in Practice: My Implementation Catalog

## Introduction

Throughout my career as a software developer, I've implemented numerous design patterns to solve complex problems with elegant, maintainable solutions. This catalog showcases practical examples of design patterns I've used in real-world applications, particularly in my work on secure access control systems.

Design patterns represent proven solutions to common software design challenges. By leveraging these established patterns, I create robust, flexible code that can adapt to changing requirements and scale effectively. This catalog documents my hands-on experience with key patterns across different categories.

## Creational Patterns

Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

### Factory Method

**Problem It Solves**: Creating objects without specifying the exact class to create, deferring instantiation to subclasses.

**My Implementation**:
```csharp
// Test Factory implementation
public class ApplicationFactory : WebApplicationFactory<Program>
{
    // Configuration delegates
    private Action<IServiceCollection>? _serviceConfiguration;
    private Action<TestingOptions>? _mockConfiguration;
    
    // Methods to configure the factory
    public ApplicationFactory WithServiceConfiguration(Action<IServiceCollection> configuration)
    {
        _serviceConfiguration = configuration;
        return this;
    }

    public ApplicationFactory WithMockConfiguration(Action<TestingOptions> configuration)
    {
        _mockConfiguration = configuration;
        return this;
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Apply custom service configuration if provided
            _serviceConfiguration?.Invoke(services);

            // Configure mock services based on options
            services.Configure<TestingOptions>(options =>
            {
                // Default mock settings
                options.UseMockServices.BiometricService = true;
                options.UseMockServices.PermissionService = true;
                options.UseMockServices.GateController = true;

                // Apply custom mock configuration if provided
                _mockConfiguration?.Invoke(options);
            });
        });
    }
}
```

**Benefits I've Realized**:
- Created configurable test environments with selective component replacement
- Enabled integration tests that mix real and mock services
- Simplified the process of testing with different configurations

### Builder Pattern

**Problem It Solves**: Separating the construction of complex objects from their representation.

**My Implementation**:
```csharp
// Mock builder with fluent interface
public class MockGateController : AbstractGateController
{
    // Fluent interface methods
    public MockGateController WithNextVisitorFailingToEnterSecurityArea()
    {
        visitorIsEnteringSecurityArea = false;
        return this;
    }
    
    public MockGateController WithNextVisitorEnteringSecurityArea()
    {
        visitorIsEnteringSecurityArea = true;
        return this;
    }

    public MockGateController WithNextVisitorExitingSecurityArea()
    {
        visitorIsExitingSecurityArea = true;
        return this;
    }

    // Usage in tests
    // gateController.WithNextVisitorEnteringSecurityArea()
    //               .WithNextVisitorExitingSecurityArea();
}
```

**Benefits I've Realized**:
- Created expressive, readable test setup code
- Improved test maintenance through fluent interfaces
- Simplified complex object configurations

### Dependency Injection

**Problem It Solves**: Achieving loose coupling between classes by moving the responsibility of creating dependencies outside the dependent class.

**My Implementation**:
```csharp
public static IServiceCollection AddApplicationServices(this IServiceCollection services)
{
    // Register step services
    services.AddSingleton<IDocumentValidationStep, DocumentValidationStep>();
    services.AddSingleton<IPermissionStep, PermissionStep>();
    services.AddSingleton<IEntryGateStep, EntryGateStep>();
    services.AddSingleton<IVisitorResponseStep, VisitorResponseStep>();
    services.AddSingleton<IBiometricScanStep, BiometricScanStep>();
    services.AddSingleton<IExitGateStep, ExitGateStep>();
    services.AddSingleton<IManualControl, ManualControl>();

    // Register utility services 
    services.AddSingleton<IErrorHandler, ErrorHandler>(); 
    services.AddSingleton<IScreen, Screen>();
       
    // Conditional registration based on configuration
    services.AddScoped<IVisitorEventSource>(sp =>
       sp.GetRequiredService<IOptions<TestingOptions>>().Value.UseMockServices.VisitorEventSource == true
           ? sp.GetRequiredService<MockVisitorEventSource>()
           : sp.GetRequiredService<VisitorEventSource>()
    );

    return services;
}
```

**Benefits I've Realized**:
- Achieved highly decoupled, testable components
- Enabled runtime service resolution based on configuration
- Simplified testing through easy dependency replacement

## Structural Patterns

Structural patterns deal with object composition, creating relationships between objects to form larger structures.

### Adapter Pattern

**Problem It Solves**: Converting the interface of a class into another interface clients expect.

**My Implementation**:
```csharp
// External service interface
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
}
```

**Benefits I've Realized**:
- Successfully integrated with third-party systems using different interfaces
- Isolated the application from external API changes
- Enabled seamless switching between different service implementations

### Facade Pattern

**Problem It Solves**: Providing a simplified interface to a complex subsystem of classes.

**My Implementation**:
```csharp
public class AccessControlService : IAccessControlService
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
}
```

**Benefits I've Realized**:
- Simplified client interaction with complex access control process
- Reduced dependencies between subsystems
- Created a clear, high-level interface for the access control workflow

### Composite Pattern

**Problem It Solves**: Composing objects into tree structures to represent part-whole hierarchies.

**My Implementation**:
```csharp
public class CompositeStatusNotifier : IStatusNotifier
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
}
```

**Benefits I've Realized**:
- Created unified notification system that supports multiple channels
- Easily extended system with new notification targets
- Maintained consistent notification interface across different platforms

## Behavioral Patterns

Behavioral patterns are concerned with the assignment of responsibilities between objects and how they communicate.

### Strategy Pattern

**Problem It Solves**: Defining a family of algorithms, encapsulating each one, and making them interchangeable.

**My Implementation**:
```csharp
// Strategy interface
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
}
```

**Benefits I've Realized**:
- Created interchangeable algorithm implementations for different environments
- Enabled runtime strategy selection based on context
- Improved testability by substituting strategies during testing

### Template Method

**Problem It Solves**: Defining the skeleton of an algorithm in a base class while allowing subclasses to override specific steps.

**My Implementation**:
```csharp
public abstract class AbstractGateController : IGateController
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
}
```

**Benefits I've Realized**:
- Reused common gate control logic across different hardware implementations
- Simplified adding support for new hardware devices
- Ensured consistent behavior while allowing device-specific customization

### Observer Pattern

**Problem It Solves**: Defining a one-to-many dependency between objects so when one object changes state, all dependents are notified.

**My Implementation**:
```csharp
public class BiometricEventService : BackgroundService, IBiometricEventService
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
}
```

**Benefits I've Realized**:
- Implemented loosely coupled event communication between system components
- Created responsive user interactions based on asynchronous events
- Enabled multiple components to react to the same events independently

### Command Pattern

**Problem It Solves**: Encapsulating a request as an object, allowing parameterization of clients with different requests.

**My Implementation**:
```csharp
// Each process step is effectively a command
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
}
```

**Benefits I've Realized**:
- Encapsulated each access control step as a self-contained command
- Enabled flexible sequencing and conditional execution of steps
- Improved testability by testing commands individually

### State Pattern

**Problem It Solves**: Allowing an object to alter its behavior when its internal state changes.

**My Implementation**:
```csharp
public class Visitor
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
            case ProcessStep.VisitorResponse:
                Status = success ? VisitorStatus.VisitorResponseOk : VisitorStatus.VisitorResponseNotOk;
                break;
            case ProcessStep.BiometricScan:
                Status = success ? VisitorStatus.BiometricVerified : VisitorStatus.BiometricFailed;
                break;
            case ProcessStep.ExitGate:
                Status = success ? VisitorStatus.ExitCompleted : VisitorStatus.ExitFailed;
                break;
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
}
```

**Benefits I've Realized**:
- Created a self-managing visitor entity that maintains its own state
- Implemented clear state transitions based on process outcomes
- Ensured consistent state management across the application

## Architectural Patterns

Architectural patterns address fundamental structural organization of software systems.

### Hexagonal Architecture (Ports and Adapters)

**Problem It Solves**: Isolating the core application from external concerns to improve maintainability and testability.

**My Implementation**:
```csharp
// Port (interface) - primary port for the application core
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
);
```

**Benefits I've Realized**:
- Achieved complete isolation of the domain model from external dependencies
- Created a highly testable architecture with easy dependency substitution
- Enabled flexible adaptation to different external systems

### Clean Architecture

**Problem It Solves**: Creating a separation of concerns with dependencies pointing inward toward the domain layer.

**My Implementation**:
```csharp
// Domain layer (innermost, no external dependencies)
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
}

// External interfaces layer (entry points to the system)
public class Worker : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Main application flow
        await resilientRetry.Execute(
            async () =>
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    await ProcessVisitorEvents(stoppingToken);
                    await Task.Delay(options.Value.WorkerInterval, stoppingToken);
                }
                return true;
            },
            "WorkerService",
            "MainProcessingLoop",
            TimeSpan.FromSeconds(5),
            true // Critical operation
        );
    }
}
```

**Benefits I've Realized**:
- Created a highly maintainable system with clear separation of concerns
- Ensured that business rules are isolated from infrastructure details
- Simplified testing by focusing on domain logic without external dependencies

## Resilience Patterns

Resilience patterns help applications handle failures gracefully and continue functioning under adverse conditions.

### Circuit Breaker

**Problem It Solves**: Preventing cascading failures by detecting failures and stopping operation temporarily.

**My Implementation**:
```csharp
public class ResilientRetry : IRetryPolicy
{
    public async Task<T> Execute<T>(
        Func<Task<T>> operation,
        string serviceName,
        string operationName,
        TimeSpan baseDelay,
        bool isCritical = true)
    {
        // Create resilience pipeline with retry and circuit breaker
        var pipeline = new ResiliencePipelineBuilder()
            // Add retry strategy...
            .AddCircuitBreaker(new CircuitBreakerStrategyOptions
            {
                FailureRatio = 1.0,
                MinimumThroughput = retryOptions.CircuitBreaker.FailureThreshold,
                SamplingDuration = TimeSpan.FromMilliseconds(Math.Max(500, retryOptions.CircuitBreaker.DurationMs)),
                BreakDuration = TimeSpan.FromMilliseconds(Math.Max(500, retryOptions.CircuitBreaker.DurationMs)),
                OnOpened = args =>
                {
                    CircuitBreakerEvents
                    .WithLabels(serviceName, operationName, "opened")
                    .Inc();
                    logger.LogError(
                        "Circuit opened for {ServiceName}.{OperationName} after {FailureCount} consecutive failures",
                        serviceName, operationName, retryOptions.CircuitBreaker.FailureThreshold);
                    return ValueTask.CompletedTask;
                },
                // More event handlers...
            })
            .Build();

        try
        {
            // Execute operation through the pipeline...
            return await pipeline.ExecuteAsync(async cancellationToken =>
            {
                // Attempt operation with instrumentation
                return await operation();
            }, CancellationToken.None);
        }
        catch (BrokenCircuitException)
        {
            // Handle circuit breaker open state
            if (!isCritical)
            {
                // For non-critical operations, return default value
                return default;
            }
            
            // For critical operations, throw exception
            throw new CircuitBreakerException(
                $"Service {serviceName} is currently unavailable. Operation: {operationName}",
                operationKey,
                CircuitState.Open);
        }
    }
}
```

**Benefits I've Realized**:
- Prevented cascading failures when external services were unavailable
- Implemented automatic service recovery after temporary failures
- Created different circuit breaker strategies for critical and non-critical operations

### Retry Pattern

**Problem It Solves**: Handling transient failures by automatically retrying a failed operation.

**My Implementation**:
```csharp
public class ResilientRetry : IRetryPolicy
{
    public async Task<T> Execute<T>(
        Func<Task<T>> operation,
        string serviceName,
        string operationName,
        TimeSpan baseDelay,
        bool isCritical = true)
    {
        // Select retry options based on criticality
        RetryOptions retryOptions = isCritical
            ? options.Critical
            : options.NonCritical;
            
        var pipeline = new ResiliencePipelineBuilder()
            .AddRetry(new RetryStrategyOptions
            {
                BackoffType = retryOptions.UseExponentialBackoff ? DelayBackoffType.Exponential : DelayBackoffType.Constant,
                Delay = baseDelay,
                MaxRetryAttempts = isCritical ? int.MaxValue : retryOptions.MaxRetries,
                MaxDelay = TimeSpan.FromMilliseconds(retryOptions.MaxDelayMs),
                UseJitter = true,
                // Other options...
                OnRetry = args =>
                {
                    var errorMessage = args.Outcome.Exception?.Message ?? "No exception details available";

                    if (args.AttemptNumber == 1)
                    {
                        logger.LogWarning(
                            "Operation {ServiceName}.{OperationName} failed: {ErrorMessage}. Starting retry sequence.",
                            serviceName, operationName, errorMessage);
                    }
                    else
                    {
                        logger.LogWarning(
                            "Retry attempt {RetryCount} for {ServiceName}.{OperationName} after error: {ErrorMessage}",
                            args.AttemptNumber, serviceName, operationName, errorMessage);
                    }

                    // Check if operation has exceeded the maximum retry duration
                    var retryDuration = DateTime.UtcNow - operationStartTime;
                    if (retryDuration > options.SafetyLimit)
                    {
                        logger.LogCritical(
                            "Operation {ServiceName}.{OperationName} has been retrying for over {Duration} without success. Marking as unrecoverable.",
                            serviceName, operationName, options.SafetyLimit);
                       
                        throw unrecoverableException;
                    }

                    return ValueTask.CompletedTask;
                }
            })
            // Add circuit breaker...
            .Build();
        
        // Execute with pipeline...
    }
}
```

**Benefits I've Realized**:
- Handled transient failures in external services automatically
- Implemented exponential backoff to avoid overwhelming recovering services
- Created differentiated retry strategies based on operation criticality

### Timeout Pattern

**Problem It Solves**: Preventing operations from waiting indefinitely by setting maximum timeouts.

**My Implementation**:
```csharp
public async Task Handle(Action<BiometricVerificationResult> callback, TimeSpan timeout)
{
    // Create a TaskCompletionSource to handle the async event waiting
    var tcs = new TaskCompletionSource<BiometricVerificationResult>();

    // Create a cancellation token source for timeout
    using var cts = new CancellationTokenSource(timeout);

    try
    {
        // Register for cancellation
        cts.Token.Register(() => {
            try
            {
                tcs.TrySetResult(BiometricVerificationResult.Failure);
                logger.LogWarning("Biometric verification timed out after '{Timeout}' for visitor {PersonalId}",
                    timeout, context.Visitor.PersonalId);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error during timeout cancellation");
            }
        }, false);

        // Subscribe to events and wait for completion or timeout
        // ...

        // Wait for either the event to fire or the timeout to occur
        BiometricVerificationResult scanResult = await tcs.Task;

        // Call the callback with the result
        callback(scanResult);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Unexpected error in biometric scan subscription");
        callback(BiometricVerificationResult.Failure);
    }
}
```

**Benefits I've Realized**:
- Prevented system hangs due to unresponsive external services
- Implemented graceful failure handling for user-facing operations
- Created consistent timeout behavior across the application

## Testing Patterns

Testing patterns ensure software quality through systematic verification approaches.

### Test Factory

**Problem It Solves**: Creating configurable test environments with all necessary dependencies.

**My Implementation**:
```csharp
public class ApplicationFactory : WebApplicationFactory<Program>
{
    // Configuration delegates that can be set by test classes
    private Action<IServiceCollection>? _serviceConfiguration;
    private Action<TestingOptions>? _mockConfiguration;
    private Action<ProcessingOptions>? _processingConfiguration;
    
    // Methods to configure the factory
    public ApplicationFactory WithServiceConfiguration(Action<IServiceCollection> configuration)
    {
        _serviceConfiguration = configuration;
        return this;
    }

    public ApplicationFactory WithMockConfiguration(Action<TestingOptions> configuration)
    {
        _mockConfiguration = configuration;
        return this;
    }
    
    // More configuration methods...
    
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment(environment);

        builder.ConfigureServices(services =>
        {
            // Apply custom service configuration if provided
            _serviceConfiguration?.Invoke(services);

            // Configure mock services by default
            services.Configure<TestingOptions>(options =>
            {
                // Default mock settings
                options.UseMockServices.BiometricService = true;
                options.UseMockServices.PermissionService = true;
                options.UseMockServices.GateController = true;

                // Apply custom mock configuration if provided
                _mockConfiguration?.Invoke(options);
            });
            
            // More service configuration...
        });
    }
}

// Usage in tests
[Test]
public async Task Worker_Processes_Visitor_Successfully_Through_The_Gate()
{
    // Configure the factory specifically for this test
    factory = new ApplicationFactory() 
        .WithMockConfiguration(options =>
        {
            options.UseMockServices.BiometricService = true;
            options.UseMockServices.PermissionService = true;
            options.UseMockServices.GateController = true;
            options.UseMockServices.BiometricScanner = true;
        });
        
    factory.StartHost();
    // Test implementation...
}
```

**Benefits I've Realized**:
- Created precisely configured test environments for different scenarios
- Enabled integration tests with selective real/mock components
- Simplified test setup and improved test readability

### Scenario Testing

**Problem It Solves**: Testing complex interaction scenarios to validate system behavior.

**My Implementation**:
```csharp
private async Task RunScenario(ApplicationFactory factory, ScenarioType scenario)
{
    Console.Clear();
    Console.WriteLine($"Running scenario: {scenario}");
    Console.WriteLine("═════════════════════════════════════════════════════");

    using var scope = factory.GetServer().Services.CreateScope();

    // Get services
    var biometricService = scope.ServiceProvider.GetRequiredService<IBiometricService>();
    var permissionService = scope.ServiceProvider.GetRequiredService<IPermissionService>();
    var gateController = scope.ServiceProvider.GetRequiredService<IGateController>();
    var biometricScan = scope.ServiceProvider.GetRequiredService<MockBiometricScanSubscription>();
    var visitorEventSource = scope.ServiceProvider.GetRequiredService<IVisitorEventSource>();

    // Create a test visitor
    var visitor = new Visitor("TEST-" + Guid.NewGuid().ToString().Substring(0, 8), 1, 0, true, "Test Visitor");
    
    // Configure mocks for the specific scenario
    ConfigureMocksForScenario(visitor, scenario, permissionService, gateController, biometricScan);

    // Inject the visitor into the system
    ((MockVisitorEventSource)visitorEventSource).WithNextVisitor(visitor);

    Console.WriteLine("Starting visitor processing...");

    try
    {
        // Wait for visitor processing to complete and verify results
        await WaitForVisitorProcessingCompletion(visitor);
        
        // Show results
        Console.WriteLine("\nScenario completed!");
        Console.WriteLine($"Final visitor status: {processedVisitor.Status}");

        // Show which steps were processed
        Console.WriteLine("\nSteps processed:");
        foreach (var step in Enum.GetValues<ProcessStep>())
        {
            string result = processedVisitor.IsStepProcessed(step) ? "✓" : "✗";
            Console.WriteLine($"  {step}: {result}");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"\nError during scenario: {ex.Message}");
    }
}
```

**Benefits I've Realized**:
- Created a tool for comprehensive end-to-end testing
- Enabled testing of complex interaction sequences
- Provided interactive demonstration capability for stakeholders

### Mock Objects

**Problem It Solves**: Creating test doubles that simulate the behavior of real objects in a controlled way.

**My Implementation**:
```csharp
public class MockBiometricScanSubscription : IBiometricScanSubscription
{
    private readonly ILogger<MockBiometricScanSubscription> logger;
    private bool? nextScanSuccessful;
    private bool? nextScanTimeout;
    private Exception? nextScanException;

    public MockBiometricScanSubscription(ILogger<MockBiometricScanSubscription> logger)
    {
        this.logger = logger;
    }

    public void Dispose()
    {
        // Nothing to dispose
    }

    public MockBiometricScanSubscription WithNextSuccessful()
    {
        nextScanSuccessful = true;
        nextScanTimeout = false;
        nextScanException = null;
        return this;
    }

    public MockBiometricScanSubscription WithNextFailure()
    {
        nextScanSuccessful = false;
        nextScanTimeout = false;
        nextScanException = null;
        return this;
    }

    public async Task Handle(Action<BiometricVerificationResult> callback, TimeSpan timeout)
    {
        // Simulate network delay
        await Task.Delay(10);

        try
        {
            if (nextScanException != null)
            {
                var ex = nextScanException;
                nextScanException = null;
                throw ex;
            }

            if (nextScanTimeout == true)
            {
                logger.LogInformation("Simulating biometric scan timeout");
                await Task.Delay(10);
                nextScanTimeout = null;
                callback(BiometricVerificationResult.Failure);
                return;
            }

            if (nextScanSuccessful.HasValue)
            {
                bool isSuccessful = nextScanSuccessful.Value;
                logger.LogInformation("Simulating {Result} biometric scan",
                    isSuccessful ? "successful" : "failed");
                callback(isSuccessful ? BiometricVerificationResult.Success : BiometricVerificationResult.Failure);
                nextScanSuccessful = null;
                return;
            }

            // Default random behavior
            var scanResult = new Random().NextDouble() < 0.8;
            callback(scanResult ? BiometricVerificationResult.Success : BiometricVerificationResult.Failure);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in mock biometric scan handling");
            callback(BiometricVerificationResult.Failure);
        }
    }
}
```

**Benefits I've Realized**:
- Created configurable mock implementations for reliable testing
- Simulated various failure scenarios for robust error handling testing
- Enabled testing of difficult-to-reproduce conditions

## Conclusion

This catalog showcases my practical implementation of key design patterns across different categories. By applying these established patterns to real-world challenges, I've created robust, maintainable software systems that can adapt to changing requirements and handle failure gracefully.

Each pattern in this catalog represents not just theoretical knowledge, but practical experience implementing and refining these solutions in production systems. I continue to expand my pattern knowledge and application as I tackle new challenges in software development.

## References

1. Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
3. Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley.
4. Nygard, M. T. (2018). *Release It!: Design and Deploy Production-Ready Software*. Pragmatic Bookshelf.
5. Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
