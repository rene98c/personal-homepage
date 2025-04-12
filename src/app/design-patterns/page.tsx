'use client';

import React, { useState } from 'react';
import { Code, CheckCircle, AlertCircle, Award } from 'lucide-react';

// Category Button Component
const CategoryButton = ({ text, isActive, onClick }: { text: string, isActive: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'
      }`}
    >
      {text}
    </button>
  );
};

// Pattern Detail Component
const PatternDetail = ({ name, problem, benefits, codeSnippet, category }: { name: string, problem: string, benefits: string[], codeSnippet: string, category: string }) => {
  const getCategoryBorderColor = () => {
    switch (category) {
      case 'creational':
        return 'border-t-amber-500';
      case 'structural':
        return 'border-t-green-500';
      case 'behavioral':
        return 'border-t-blue-500';
      case 'architectural':
        return 'border-t-purple-500';
      case 'resilience':
        return 'border-t-red-500';
      case 'testing':
        return 'border-t-indigo-500';
      default:
        return 'border-t-gray-500';
    }
  };

  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-100 transition-all duration-200 hover:shadow-xl ${getCategoryBorderColor()} border-t-4`}>
      <div className="flex items-center gap-2 mb-4">
        <Code className="w-5 h-5 text-indigo-600" />
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      </div>
      
      <div className="mb-6">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <p className="text-gray-700">{problem}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-green-600" />
          <h4 className="text-lg font-medium text-gray-800">Benefits</h4>
        </div>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-3">Implementation</h4>
        <div className="bg-gray-900 border border-gray-700 text-gray-200 p-4 rounded overflow-x-auto">
          <pre className="whitespace-pre-wrap">
            <code className="text-sm">
              {codeSnippet}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

// Design Patterns Page Component
const DesignPatternsPage = () => {
  const [activeCategory, setActiveCategory] = useState('creational');

  // Design pattern data
  const creationalPatterns = [
    {
      name: "Factory Method",
      problem: "Creating objects without specifying the exact class to create, deferring instantiation to subclasses.",
      benefits: [
        "Created configurable test environments with selective component replacement",
        "Enabled integration tests that mix real and mock services",
        "Simplified the process of testing with different configurations"
      ],
      codeSnippet: `// Test Factory implementation
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
}`,
      category: "creational"
    },
    {
      name: "Builder Pattern",
      problem: "Separating the construction of complex objects from their representation.",
      benefits: [
        "Created expressive, readable test setup code",
        "Improved test maintenance through fluent interfaces",
        "Simplified complex object configurations"
      ],
      codeSnippet: `// Mock builder with fluent interface
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
}`,
      category: "creational"
    }
  ];

  const structuralPatterns = [
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
    }
  ];

  const behavioralPatterns = [
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
    }
  ];

  const architecturalPatterns = [
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
    }
  ];

  const resiliencePatterns = [
    {
      name: "Circuit Breaker",
      problem: "Preventing cascading failures by detecting failures and stopping operation temporarily.",
      benefits: [
        "Prevented cascading failures when external services were unavailable",
        "Implemented automatic service recovery after temporary failures",
        "Created different circuit breaker strategies for critical and non-critical operations"
      ],
      codeSnippet: `public class ResilientRetry : IRetryPolicy
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
                    logger.LogError(
                        "Circuit opened for {ServiceName}.{OperationName} after {FailureCount} failures",
                        serviceName, operationName, retryOptions.CircuitBreaker.FailureThreshold);
                    return ValueTask.CompletedTask;
                }
            })
            .Build();

        try {
            // Execute operation through the resilience pipeline
            return await pipeline.ExecuteAsync(async cancellationToken => {
                return await operation();
            }, CancellationToken.None);
        }
        catch (BrokenCircuitException) {
            // Handle circuit breaker open state
            if (!isCritical) {
                return default;
            }
            throw new CircuitBreakerException();
        }
    }
}`,
      category: "resilience"
    },
    {
      name: "Retry Pattern",
      problem: "Handling transient failures by automatically retrying a failed operation.",
      benefits: [
        "Handled transient failures in external services automatically",
        "Implemented exponential backoff to avoid overwhelming recovering services",
        "Created differentiated retry strategies based on operation criticality"
      ],
      codeSnippet: `public class ResilientRetry : IRetryPolicy
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
                BackoffType = retryOptions.UseExponentialBackoff ? 
                    DelayBackoffType.Exponential : DelayBackoffType.Constant,
                Delay = baseDelay,
                MaxRetryAttempts = isCritical ? 
                    int.MaxValue : retryOptions.MaxRetries,
                MaxDelay = TimeSpan.FromMilliseconds(retryOptions.MaxDelayMs),
                UseJitter = true,
                OnRetry = args =>
                {
                    var errorMessage = args.Outcome.Exception?.Message ?? 
                        "No exception details";
                    logger.LogWarning(
                        "Retry attempt {RetryCount} for {Operation}: {Error}",
                        args.AttemptNumber, operationName, errorMessage);
                    return ValueTask.CompletedTask;
                }
            })
            .Build();
        
        // Execute with pipeline...
    }
}`,
      category: "resilience"
    }
  ];

  const testingPatterns = [
    {
      name: "Test Factory",
      problem: "Creating configurable test environments with all necessary dependencies.",
      benefits: [
        "Created precisely configured test environments for different scenarios",
        "Enabled integration tests with selective real/mock components",
        "Simplified test setup and improved test readability"
      ],
      codeSnippet: `public class ApplicationFactory : WebApplicationFactory<Program>
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
}`,
      category: "testing"
    },
    {
      name: "Mock Objects",
      problem: "Creating test doubles that simulate the behavior of real objects in a controlled way.",
      benefits: [
        "Created configurable mock implementations for reliable testing",
        "Simulated various failure scenarios for robust error handling testing",
        "Enabled testing of difficult-to-reproduce conditions"
      ],
      codeSnippet: `public class MockBiometricScanSubscription : IBiometricScanSubscription
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
                callback(isSuccessful ? 
                    BiometricVerificationResult.Success : 
                    BiometricVerificationResult.Failure);
                nextScanSuccessful = null;
                return;
            }

            // Default random behavior
            var scanResult = new Random().NextDouble() < 0.8;
            callback(scanResult ? 
                BiometricVerificationResult.Success : 
                BiometricVerificationResult.Failure);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in mock biometric scan handling");
            callback(BiometricVerificationResult.Failure);
        }
    }
}`,
      category: "testing"
    }
  ];

  // Render patterns based on active category
  const renderPatterns = () => {
    switch (activeCategory) {
      case 'creational':
        return creationalPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} />
        ));
      case 'structural':
        return structuralPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} />
        ));
      case 'behavioral':
        return behavioralPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} />
        ));
      case 'architectural':
        return architecturalPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} />
        ));
      case 'resilience':
        return resiliencePatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} />
        ));
      case 'testing':
        return testingPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} />
        ));
      default:
        return null;
    }
  };

  // Render category description
  const renderCategoryDescription = () => {
    switch (activeCategory) {
      case 'creational':
        return (
          <p className="text-gray-700">
            Creational patterns deal with object creation mechanisms, trying to create objects in a manner 
            suitable to the situation. These patterns provide flexibility in what gets created, how it gets 
            created, and who creates it. They abstract the instantiation process, helping make a system independent
            of how its objects are created, composed, and represented.
          </p>
        );
      case 'structural':
        return (
          <p className="text-gray-700">
            Structural patterns deal with object composition, creating relationships between objects to form 
            larger structures. These patterns help ensure that when one part of a system changes, the entire 
            structure doesn&apos;t need to change. They help build flexible, loosely coupled systems that can be
            easily maintained and adapted to new requirements over time.
          </p>
        );
      case 'behavioral':
        return (
          <p className="text-gray-700">
            Behavioral patterns are concerned with the assignment of responsibilities between objects and how 
            they communicate. These patterns help make complex flows more manageable and improve communication 
            between different objects. They characterize how objects interact and distribute responsibility, 
            increasing flexibility in carrying out this communication.
          </p>
        );
      case 'architectural':
        return (
          <p className="text-gray-700">
            Architectural patterns address fundamental structural organization of software systems. These 
            high-level patterns define the overall shape and structure of applications and guide the 
            relationships between major components. They provide reusable solutions to commonly occurring
            organizational problems in software architecture.
          </p>
        );
      case 'resilience':
        return (
          <p className="text-gray-700">
            Resilience patterns help applications handle failures gracefully and continue functioning under 
            adverse conditions. These patterns enable systems to recover from failures and maintain service 
            even when components are degraded. They are essential for mission-critical systems that must maintain
            high availability and reliability, even when faced with transient failures or unexpected conditions.
          </p>
        );
      case 'testing':
        return (
          <p className="text-gray-700">
            Testing patterns ensure software quality through systematic verification approaches. These patterns 
            provide structured ways to create reliable tests and test environments for complex systems. They help
            in creating maintainable, repeatable tests that can verify application behavior across various scenarios,
            from unit testing to integration testing and end-to-end validation.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600">Software Design</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Design Patterns Implementation
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Throughout my career as a software developer, I&apos;ve implemented numerous design patterns to solve 
            complex problems with elegant, maintainable solutions. This catalog showcases practical examples 
            of design patterns I&apos;ve used in real-world applications.
          </p>
          <p className="text-gray-700">
            The distinctive aspects of my approach—particularly the explicit criticality classification, purpose-built 
            testing tools, and manual override design—demonstrate my ability to adapt established patterns to meet 
            unique requirements in specialized domains.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Introduction */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Introduction</h3>
              <p className="text-gray-700 mb-4">
                Design patterns represent proven solutions to common software design challenges. By leveraging these 
                established patterns, I create robust, flexible code that can adapt to changing requirements and scale 
                effectively. This catalog documents my hands-on experience with key patterns across different categories.
              </p>
              <p className="text-gray-700">
                The patterns demonstrated here reflect not just theoretical knowledge, but practical experience implementing 
                and refining these solutions in production systems. Each implementation has been battle-tested in 
                mission-critical environments.
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
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Patterns
              </h3>
              {renderCategoryDescription()}
            </div>
            
            {/* Pattern Details */}
            <div className="space-y-6">
              {renderPatterns()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPatternsPage;