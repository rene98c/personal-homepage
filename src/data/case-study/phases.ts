// src/data/case-study/phases.ts

export const phases = [
    {
      number: "1",
      title: "Domain-First Foundation (Days 1-3)",
      approach: "I established the core domain model with proper entity relationships and process steps before introducing technical concerns.",
      steps: [
        "Defined the primary domain entities (Visitor, ProcessStep, CompletedStep)",
        "Modeled the access control workflow as a sequence of discrete steps",
        "Implemented core domain logic in the AccessControlService",
        "Created mock implementations of external dependencies for early testing"
      ],
      results: [
        "Clean separation between domain logic and external systems",
        "Early clarity on the overall process flow",
        "Testable components with minimal dependencies"
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
              // Security staff manually managing the situation
              return;
          }
      }
  
      private async Task ProcessPermittedVisitorUntilCompleted(IVisitorContext context)
      {
          // Logic for processing the visitor through gates...
      }
  }`
    },
    {
      number: "2",
      title: "Interface-Based External Systems Modeling (Days 3-6)",
      approach: "I defined clean interfaces for external dependencies and implemented mocks before tackling real integrations, enabling early testing of application flow.",
      steps: [
        "Defined precise interfaces for each external system (IBiometricService, IPermissionService, IGateController)",
        "Created abstract base classes that handle common logic for each integration",
        "Implemented mock versions for each external service",
        "Established service registration patterns with dependency injection"
      ],
      results: [
        "Ability to test the full application flow without real external systems",
        "Clear separation between interface contract and implementation details",
        "Simplified integration testing with the ability to mix real and mock services"
      ],
      codeSnippet: `// Interface definition
  public interface IBiometricService
  {
      Task<bool> DeleteUserAsync(string personalId);
      Task<bool> ActivateBiometricVerificationAsync(string personalId);
      Task<bool> DeactivateBiometricVerificationAsync(string personalId);
  }
  
  // Abstract base class with common logic
  public abstract class AbstractBiometricService : IBiometricService
  {
      protected readonly BiometricOptions options;
      protected readonly ILogger<AbstractBiometricService> logger;
      
      // Constructor with options & logger...
      
      protected abstract Task<bool> HttpActivateRequestAsync(string personalId);
      protected abstract Task<bool> HttpDeactivateRequestAsync(string personalId);
      protected abstract Task<bool> HttpDeleteUserAsync(string personalId);
      
      // Implementation of interface methods calling abstract methods...
  }
  
  // Mock implementation for testing
  public class MockBiometricService : IBiometricService
  {
      private readonly ILogger<MockBiometricService> logger;
      
      // Implementation of interface methods with simulated behavior...
  }`
    },
    {
      number: "3",
      title: "Incremental Integration with Resilience Patterns (Days 7-10)",
      approach: "I integrated each external system individually, immediately applying resilience patterns rather than treating them as an afterthought.",
      steps: [
        "Implemented the real external service integrations",
        "Added a comprehensive resilience framework with retry policies and circuit breakers",
        "Distinguished between critical and non-critical operations with different resilience strategies",
        "Implemented graceful degradation paths for non-critical failures"
      ],
      results: [
        "Robust handling of transient failures in external systems",
        "Prevention of cascading failures through circuit breakers",
        "Clear operational boundaries for different types of failures"
      ],
      codeSnippet: `public class ResilientRetry : IRetryPolicy
  {
      // Properties and dependencies...
  
      public async Task<T> Execute<T>(
          Func<Task<T>> operation,
          string serviceName,
          string operationName,
          TimeSpan baseDelay,
          bool isCritical = true)
      {
          // Metrics setup...
  
          // Select appropriate retry strategy based on criticality
          RetryOptions retryOptions = isCritical
              ? options.Critical
              : options.NonCritical;
  
          // Create resilience pipeline with retry and circuit breaker
          var pipeline = new ResiliencePipelineBuilder()
              .AddRetry(new RetryStrategyOptions {
                  BackoffType = retryOptions.UseExponentialBackoff ? 
                      DelayBackoffType.Exponential : DelayBackoffType.Constant,
                  Delay = baseDelay,
                  MaxRetryAttempts = isCritical ? int.MaxValue : retryOptions.MaxRetries,
                  MaxDelay = TimeSpan.FromMilliseconds(retryOptions.MaxDelayMs),
                  UseJitter = true,
                  OnRetry = args => {
                      var errorMessage = args.Outcome.Exception?.Message ?? "No exception details";
                      logger.LogWarning(
                          "Retry attempt {RetryCount} for {ServiceName}.{OperationName}: {ErrorMessage}",
                          args.AttemptNumber, serviceName, operationName, errorMessage);
                      return ValueTask.CompletedTask;
                  }
              })
              .AddCircuitBreaker(new CircuitBreakerStrategyOptions {
                  FailureRatio = 1.0,
                  MinimumThroughput = retryOptions.CircuitBreaker.FailureThreshold,
                  SamplingDuration = TimeSpan.FromMilliseconds(
                      Math.Max(500, retryOptions.CircuitBreaker.DurationMs)),
                  BreakDuration = TimeSpan.FromMilliseconds(
                      Math.Max(500, retryOptions.CircuitBreaker.DurationMs)),
                  OnOpened = args => {
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
                  // Attempt operation with instrumentation
                  return await operation();
              }, CancellationToken.None);
          }
          catch (BrokenCircuitException) {
              // Handle circuit breaker open state
              if (!isCritical) {
                  // For non-critical operations, return default value
                  return default;
              }
              // For critical operations, throw CircuitBreakerException
              throw new CircuitBreakerException(/*...*/);
          }
          catch (Exception ex) {
              // Handle other exceptions based on criticality
              if (isCritical) {
                  throw; // Rethrow for critical operations
              }
              logger.LogError(ex, "Non-critical operation failed: {Operation}", operationName);
              return default; // Return default value for non-critical operations
          }
      }
  }`
    },
    {
      number: "4",
      title: "Comprehensive Testing Strategy (Days 10-14)",
      approach: "I implemented a multi-layered testing approach including unit tests, integration tests, and a dedicated testing tool for scenario validation.",
      steps: [
        "Created unit tests for domain logic and individual components",
        "Implemented integration tests with selective mocking capabilities",
        "Built a scenario testing tool for end-to-end validation",
        "Created load testing capabilities to verify performance under stress"
      ],
      results: [
        "High test coverage across all components",
        "Ability to test realistic end-to-end scenarios",
        "Confidence in system behavior under various conditions",
        "Tool for manual testing and demonstration"
      ],
      codeSnippet: `[TestFixture]
  public class WorkerIntegrationTests
  {
      private ApplicationFactory factory;
      private MockBiometricSubscription biometricScan;
      private MockPermissionService permissionService;
      private MockGateController gateController;
      private MockVisitorPersistence persistence;
  
      [SetUp]
      public void Setup()
      {
          // Configure the factory specifically for this test
          factory = new ApplicationFactory()
              .WithMockConfiguration(options => {
                  options.UseMockServices.Biometric = true;
                  // Configure other mock services...
              });
  
          factory.StartHost();
          // Get service references...
      }
  
      [Test]
      public async Task Worker_Processes_Visitor_Successfully_Through_The_Gate()
      {
          // Create a visitor with a specific ID
          var visitor = new Visitor("VISITOR123", 1, 54321, true, "Valid");
          visitor.Id = Guid.NewGuid();
  
          // Setup mocks for positive scenario
          ((MockVisitorEventSource)scope.ServiceProvider
              .GetRequiredService<IVisitorEventSource>())
              .WithNextVisitor(visitor);
  
          biometricScan.WithNextSuccessful();
          permissionService.WithAccess(visitor.PersonalId, UserResponseResult.Ok);
          gateController.WithNextVisitorEnteringSecurityArea()
                       .WithNextVisitorExitingSecurityArea();
  
          // Wait for processing to complete
          await WaitForVisitorProcessing(visitor.Id, TimeSpan.FromSeconds(60));
  
          // Assertions...
      }
  }`
    },
    {
      number: "5",
      title: "Operational Readiness Focus (Days 14-17)",
      approach: "I added health checks, monitoring, and diagnostics capabilities well before completion, ensuring the system would be easily troubleshooted in production.",
      steps: [
        "Implemented component health checks with standardized reporting",
        "Added metrics collection for performance and reliability monitoring",
        "Implemented structured logging with context enrichment",
        "Created health endpoints for external monitoring systems"
      ],
      results: [
        "Comprehensive health monitoring capabilities",
        "Easy identification of system component issues",
        "Rich metrics for performance analysis",
        "Structured logs for troubleshooting"
      ],
      codeSnippet: `public abstract class StandardizedHealthCheck : IComponentHealthCheck
  {
      public abstract string ComponentName { get; }
  
      public async Task<HealthCheckResult> CheckHealthAsync(CancellationToken cancellationToken)
      {
          var stopwatch = Stopwatch.StartNew();
          try
          {
              var (status, reason, diagnostics) = await PerformHealthCheckAsync(cancellationToken);
              stopwatch.Stop();
  
              // Add response time to diagnostics
              diagnostics["ResponseTimeMs"] = stopwatch.ElapsedMilliseconds;
  
              return status switch
              {
                  HealthStatus.Healthy => HealthCheckResult.Healthy(reason, diagnostics),
                  HealthStatus.Degraded => HealthCheckResult.Degraded(reason, null, diagnostics),
                  _ => HealthCheckResult.Unhealthy(reason, null, diagnostics)
              };
          }
          catch (Exception ex)
          {
              // Handle exception and return unhealthy status
              return HealthCheckResult.Unhealthy(
                  $"Health check failed: {ex.Message}", 
                  ex, 
                  new Dictionary<string, object> { 
                      { "ExceptionType", ex.GetType().Name },
                      { "ComponentName", ComponentName }
                  }
              );
          }
      }
  
      protected abstract Task<(HealthStatus Status, string Reason, Dictionary<string, object> Diagnostics)>
          PerformHealthCheckAsync(CancellationToken cancellationToken);
  }`
    },
    {
      number: "6",
      title: "Configuration Management and Environment Flexibility (Days 17-19)",
      approach: "I implemented a comprehensive configuration system supporting different deployment environments with clear documentation.",
      steps: [
        "Created a hierarchical configuration structure with sensible defaults",
        "Implemented configuration validation with meaningful error messages",
        "Added support for different configuration sources (JSON, environment variables)",
        "Created Docker deployment configurations with environment variable support"
      ],
      results: [
        "Flexible deployment across different environments",
        "Explicit validation of configuration at startup",
        "Comprehensive documentation of all configuration options",
        "Docker-ready deployment with environment variable support"
      ],
      codeSnippet: `public class ConfigurationValidator
  {
      private readonly ApplicationOptions options;
      private readonly ILogger<ConfigurationValidator> logger;
      private readonly StringBuilder validationErrors = new();
  
      // Constructor...
  
      public bool Validate()
      {
          // Validate Core settings
          ValidateCoreSettings();
  
          // Validate External Services settings
          ValidateExternalServices();
  
          // Validate Resilience settings
          ValidateResilienceSettings();
  
          // Log all validation errors if any were found
          if (validationErrors.Length > 0)
          {
              logger.LogCritical("Configuration validation failed: {Errors}", 
                  validationErrors.ToString());
              return false;
          }
  
          logger.LogInformation("Configuration validation completed successfully");
          return true;
      }
  
      private void ValidateCoreSettings()
      {
          if (string.IsNullOrEmpty(options.Core.ApplicationName))
          {
              validationErrors.AppendLine("Core:ApplicationName is required");
          }
  
          if (options.Core.WorkerInterval < TimeSpan.FromMilliseconds(100))
          {
              validationErrors.AppendLine($"Core:WorkerInterval must be at least 100ms, current value: {options.Core.WorkerInterval.TotalMilliseconds}ms");
          }
  
          // Additional validations...
      }
  
      // Additional validation methods for different configuration sections...
  }`
    }
  ];