// src/data/design-patterns/creational-patterns.ts

export const creationalPatterns = [
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
    },
    // Added the Dependency Injection pattern
    {
      name: "Dependency Injection",
      problem: "Achieving loose coupling between classes by moving the responsibility of creating dependencies outside the dependent class.",
      benefits: [
        "Achieved highly decoupled, testable components",
        "Enabled runtime service resolution based on configuration",
        "Simplified testing through easy dependency replacement"
      ],
      codeSnippet: `public static IServiceCollection AddApplicationServices(this IServiceCollection services)
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
  }`,
      category: "creational"
    }
  ];