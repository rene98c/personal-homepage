'use client'

import React, { useState } from 'react';
import PatternDetail from '@/components/UI/PatternDetail';
import CategoryButton from '@/components/UI/CategoryButton';


export default function DesignPatternsPage() {
  const [activeCategory, setActiveCategory] = useState('creational');

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white border-b border-blue-700 pb-2 inline-block">
        Design Patterns Implementation
      </h2>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-100 transition-all duration-200 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Introduction</h3>
        <p className="text-slate-700 mb-4">
          Throughout my career as a software developer, I&apos;ve implemented numerous design patterns to solve 
          complex problems with elegant, maintainable solutions. This catalog showcases practical examples 
          of design patterns I&apos;ve used in real-world applications, particularly in my work on secure access 
          control systems.
        </p>
        <p className="text-slate-700">
          Design patterns represent proven solutions to common software design challenges. By leveraging these 
          established patterns, I create robust, flexible code that can adapt to changing requirements and scale 
          effectively. This catalog documents my hands-on experience with key patterns across different categories.
        </p>
      </div>
      
      {/* Pattern Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        <CategoryButton 
          text="Creational" 
          isActive={activeCategory === 'creational'} 
          onClick={() => setActiveCategory('creational')} 
        />
        <CategoryButton 
          text="Structural" 
          isActive={activeCategory === 'structural'} 
          onClick={() => setActiveCategory('structural')} 
        />
        <CategoryButton 
          text="Behavioral" 
          isActive={activeCategory === 'behavioral'} 
          onClick={() => setActiveCategory('behavioral')} 
        />
        <CategoryButton 
          text="Architectural" 
          isActive={activeCategory === 'architectural'} 
          onClick={() => setActiveCategory('architectural')} 
        />
        <CategoryButton 
          text="Resilience" 
          isActive={activeCategory === 'resilience'} 
          onClick={() => setActiveCategory('resilience')} 
        />
        <CategoryButton 
          text="Testing" 
          isActive={activeCategory === 'testing'} 
          onClick={() => setActiveCategory('testing')} 
        />
      </div>
      
      {/* Category Description */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-100 transition-all duration-200 hover:shadow-xl">
        {activeCategory === 'creational' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Creational Patterns</h3>
            <p className="text-slate-700">
              Creational patterns deal with object creation mechanisms, trying to create objects in a manner 
              suitable to the situation. These patterns provide flexibility in what gets created, how it gets 
              created, and who creates it.
            </p>
          </div>
        )}
        
        {activeCategory === 'structural' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Structural Patterns</h3>
            <p className="text-slate-700">
              Structural patterns deal with object composition, creating relationships between objects to form 
              larger structures. These patterns help ensure that when one part of a system changes, the entire 
              structure doesn&apos;t need to change.
            </p>
          </div>
        )}
        
        {activeCategory === 'behavioral' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Behavioral Patterns</h3>
            <p className="text-slate-700">
              Behavioral patterns are concerned with the assignment of responsibilities between objects and how 
              they communicate. These patterns help make complex flows more manageable and improve communication 
              between different objects.
            </p>
          </div>
        )}
        
        {activeCategory === 'architectural' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Architectural Patterns</h3>
            <p className="text-slate-700">
              Architectural patterns address fundamental structural organization of software systems. These 
              high-level patterns define the overall shape and structure of applications and guide the 
              relationships between major components.
            </p>
          </div>
        )}
        
        {activeCategory === 'resilience' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Resilience Patterns</h3>
            <p className="text-slate-700">
              Resilience patterns help applications handle failures gracefully and continue functioning under 
              adverse conditions. These patterns enable systems to recover from failures and maintain service 
              even when components are degraded.
            </p>
          </div>
        )}
        
        {activeCategory === 'testing' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Testing Patterns</h3>
            <p className="text-slate-700">
              Testing patterns ensure software quality through systematic verification approaches. These patterns 
              provide structured ways to create reliable tests and test environments for complex systems.
            </p>
          </div>
        )}
      </div>
      
      {/* Pattern Details */}
      <div className="space-y-6">
        {/* Render patterns based on active category */}
        {activeCategory === 'creational' && (
          <>
            <PatternDetail 
              name="Factory Method"
              problem="Creating objects without specifying the exact class to create, deferring instantiation to subclasses."
              benefits={[
                "Created configurable test environments with selective component replacement",
                "Enabled integration tests that mix real and mock services",
                "Simplified the process of testing with different configurations"
              ]}
              codeSnippet={`// Test Factory implementation
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
}`}
              category="creational"
            />
            
            <PatternDetail 
              name="Builder Pattern"
              problem="Separating the construction of complex objects from their representation."
              benefits={[
                "Created expressive, readable test setup code",
                "Improved test maintenance through fluent interfaces",
                "Simplified complex object configurations"
              ]}
              codeSnippet={`// Mock builder with fluent interface
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
}`}
              category="creational"
            />
            
            <PatternDetail 
              name="Dependency Injection"
              problem="Achieving loose coupling between classes by moving the responsibility of creating dependencies outside the dependent class."
              benefits={[
                "Achieved highly decoupled, testable components",
                "Enabled runtime service resolution based on configuration",
                "Simplified testing through easy dependency replacement"
              ]}
              codeSnippet={`public static IServiceCollection AddApplicationServices(this IServiceCollection services)
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
}`}
              category="creational"
            />
          </>
        )}
        
        {activeCategory === 'structural' && (
          <>
            <PatternDetail 
              name="Adapter Pattern"
              problem="Converting the interface of a class into another interface clients expect."
              benefits={[
                "Successfully integrated with third-party systems using different interfaces",
                "Isolated the application from external API changes",
                "Enabled seamless switching between different service implementations"
              ]}
              codeSnippet={`// External service interface
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
}`}
              category="structural"
            />
            
            <PatternDetail 
              name="Facade Pattern"
              problem="Providing a simplified interface to a complex subsystem of classes."
              benefits={[
                "Simplified client interaction with complex access control process",
                "Reduced dependencies between subsystems",
                "Created a clear, high-level interface for the access control workflow"
              ]}
              codeSnippet={`public class AccessControlService : IAccessControlService
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
}`}
              category="structural"
            />
            
            <PatternDetail 
              name="Composite Pattern"
              problem="Composing objects into tree structures to represent part-whole hierarchies."
              benefits={[
                "Created unified notification system that supports multiple channels",
                "Easily extended system with new notification targets",
                "Maintained consistent notification interface across different platforms"
              ]}
              codeSnippet={`public class CompositeStatusNotifier : IStatusNotifier
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
} `}
              category="structural"
            />
          </>
        )}
        
        {activeCategory === 'behavioral' && (
          <>
            <PatternDetail 
              name="Strategy Pattern"
              problem="Defining a family of algorithms, encapsulating each one, and making them interchangeable."
              benefits={[
                "Created interchangeable algorithm implementations for different environments",
                "Enabled runtime strategy selection based on context",
                "Improved testability by substituting strategies during testing"
              ]}
              codeSnippet={`// Strategy interface
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
}`}
              category="behavioral"
            />
            
            <PatternDetail 
              name="Template Method"
              problem="Defining the skeleton of an algorithm in a base class while allowing subclasses to override specific steps."
              benefits={[
                "Reused common gate control logic across different hardware implementations",
                "Simplified adding support for new hardware devices",
                "Ensured consistent behavior while allowing device-specific customization"
              ]}
              codeSnippet={`public abstract class AbstractGateController : IGateController
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
}`}
              category="behavioral"
            />
            
            <PatternDetail 
              name="State Pattern"
              problem="Allowing an object to alter its behavior when its internal state changes."
              benefits={[
                "Created a self-managing visitor entity that maintains its own state",
                "Implemented clear state transitions based on process outcomes",
                "Ensured consistent state management across the application"
              ]}
              codeSnippet={`public class Visitor
{
    public VisitorStatus Status { get; private set; }
    
    public void StepProcessed(ProcessStep step, bool success)
    {
        if(this.Status == VisitorStatus.ManuallyOverridden)
        {
            // State remains unchanged
            return;
        }
        
        // State transition logic based on step outcome
        this.Status = success ? VisitorStatus.Processed : VisitorStatus.Failed;
    }
}`}
              category="behavioral"
            />
          </>
        )}
        
        {activeCategory === 'architectural' && (
          <>
            <PatternDetail 
              name="Hexagonal Architecture (Ports and Adapters)"
              problem="Isolating the core application from external concerns to improve maintainability and testability."
              benefits={[
                "Achieved complete isolation of the domain model from external dependencies",
                "Created a highly testable architecture with easy dependency substitution",
                "Enabled flexible adaptation to different external systems"
              ]}
              codeSnippet={`// Port (interface) - primary port for the application core
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
);`}
              category="architectural"
            />
            
            <PatternDetail 
              name="Clean Architecture"
              problem="Creating a separation of concerns with dependencies pointing inward toward the domain layer."
              benefits={[
                "Created a highly maintainable system with clear separation of concerns",
                "Ensured that business rules are isolated from infrastructure details",
                "Simplified testing by focusing on domain logic without external dependencies"
              ]}
              codeSnippet={`// Domain layer (innermost, no external dependencies)
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
}`}
              category="architectural"
            />
          </>
        )}
        
        {activeCategory === 'resilience' && (
          <>
            <PatternDetail 
              name="Circuit Breaker"
              problem="Preventing cascading failures by detecting failures and stopping operation temporarily."
              benefits={[
                "Prevented cascading failures when external services were unavailable",
                "Implemented automatic service recovery after temporary failures",
                "Created different circuit breaker strategies for critical and non-critical operations"
              ]}
              codeSnippet={`public class ResilientRetry : IRetryPolicy
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
}`}
              category="resilience"
            />
            
            <PatternDetail 
              name="Timeout Pattern"
              problem="Preventing operations from waiting indefinitely by setting maximum timeouts."
              benefits={[
                "Prevented system hangs due to unresponsive external services",
                "Implemented graceful failure handling for user-facing operations",
                "Created consistent timeout behavior across the application"
              ]}
              codeSnippet={`public async Task Handle(Action<BiometricVerificationResult> callback, TimeSpan timeout)
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
}`}
              category="resilience"
            />
          </>
        )}
        
        {activeCategory === 'testing' && (
          <>
            <PatternDetail 
              name="Test Factory"
              problem="Creating configurable test environments with all necessary dependencies."
              benefits={[
                "Created precisely configured test environments for different scenarios",
                "Enabled integration tests with selective real/mock components",
                "Simplified test setup and improved test readability"
              ]}
              codeSnippet={`public class ApplicationFactory : WebApplicationFactory<Program>
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
}`}
              category="testing"
            />
            
            <PatternDetail 
              name="Mock Objects"
              problem="Creating test doubles that simulate the behavior of real objects in a controlled way."
              benefits={[
                "Created configurable mock implementations for reliable testing",
                "Simulated various failure scenarios for robust error handling testing",
                "Enabled testing of difficult-to-reproduce conditions"
              ]}
              codeSnippet={`public class MockBiometricScanSubscription : IBiometricScanSubscription
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
}`}
              category="testing"
            />
          </>
        )}
      </div>
    </div>
  );
}