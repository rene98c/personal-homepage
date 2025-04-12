// src/data/design-patterns/testing-patterns.ts

export const testingPatterns = [
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
    },
    // Added Scenario Testing pattern
    {
      name: "Scenario Testing",
      problem: "Testing complex interaction scenarios to validate system behavior.",
      benefits: [
        "Created a tool for comprehensive end-to-end testing",
        "Enabled testing of complex interaction sequences",
        "Provided interactive demonstration capability for stakeholders"
      ],
      codeSnippet: `private async Task RunScenario(ApplicationFactory factory, ScenarioType scenario)
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
          Console.WriteLine("\\nScenario completed!");
          Console.WriteLine($"Final visitor status: {processedVisitor.Status}");
  
          // Show which steps were processed
          Console.WriteLine("\\nSteps processed:");
          foreach (var step in Enum.GetValues<ProcessStep>())
          {
              string result = processedVisitor.IsStepProcessed(step) ? "✓" : "✗";
              Console.WriteLine($"  {step}: {result}");
          }
      }
      catch (Exception ex)
      {
          Console.WriteLine($"\\nError during scenario: {ex.Message}");
      }
  }`,
      category: "testing"
    }
  ];