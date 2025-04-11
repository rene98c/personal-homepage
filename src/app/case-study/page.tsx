'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Code, Clock, Layers, Check } from 'lucide-react';

// Phase Section Component
const PhaseSection = ({ number, title, approach, steps, results, codeSnippet }: { 
  number: string | number, 
  title: string, 
  approach: string, 
  steps: string[], 
  results: string[], 
  codeSnippet: string 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl mb-6">
      <div 
        className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center cursor-pointer transition-colors hover:bg-slate-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
            {number}
          </div>
          <h4 className="font-semibold text-slate-800">{title}</h4>
        </div>
        {isExpanded ? 
          <ChevronDown size={20} className="text-slate-600 transition-transform duration-200" /> : 
          <ChevronRight size={20} className="text-slate-600 transition-transform duration-200" />
        }
      </div>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div>
            <h5 className="font-medium text-slate-800 mb-2 flex items-center">
              <Layers size={16} className="mr-2 text-blue-600" />
              Approach
            </h5>
            <p className="text-slate-700">{approach}</p>
          </div>
          
          <div>
            <h5 className="font-medium text-slate-800 mb-2 flex items-center">
              <Clock size={16} className="mr-2 text-blue-600" />
              Key Implementation Steps
            </h5>
            <ul className="space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-slate-800 mb-2 flex items-center">
              <Check size={16} className="mr-2 text-green-600" />
              Results
            </h5>
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-slate-800 mb-2 flex items-center">
              <Code size={16} className="mr-2 text-blue-600" />
              Code Implementation
            </h5>
            <div className="bg-slate-900 border border-slate-700 text-gray-200 p-4 rounded overflow-x-auto">
              <pre className="whitespace-pre-wrap">{codeSnippet}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CaseStudyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white border-b border-blue-700 pb-2 inline-block">Building Mission-Critical Access Control Systems</h2>
      
      <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Executive Summary</h3>
        <p className="text-slate-700 mb-4">
          This case study documents my development approach for creating SecureAccess - a mission-critical software 
          system that integrates biometric verification, physical gate control, and permission systems to secure 
          facility entrances. This project demonstrates how I&apos;ve successfully applied Domain-Driven Design principles, 
          Clean Architecture, and resilience engineering to systems with physical components and high reliability requirements.
        </p>
        <p className="text-slate-700">
          The methodical approach described represents my synthesis of established software engineering principles 
          with practical implementation techniques, resulting in a robust, maintainable system delivered over 
          approximately 15 days.
        </p>
      </div>
      
      <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Project Overview</h3>
        
        <h4 className="font-medium text-slate-800 mb-2">System Context</h4>
        <p className="text-slate-700 mb-4">
          The SecureAccess system manages physical access control through a series of validation steps:
        </p>
        
        <div className="pl-4 border-l-4 border-blue-500 mb-6">
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-slate-700"><span className="font-medium">Document Validation:</span> Verify visitor identification documents</li>
            <li className="text-slate-700"><span className="font-medium">Permission Check:</span> Verify visitor has necessary permissions</li>
            <li className="text-slate-700"><span className="font-medium">Entry Gate Control:</span> Manage the entry gate to the security area</li>
            <li className="text-slate-700"><span className="font-medium">Visitor Response:</span> Confirm visitor&apos;s intention to proceed</li>
            <li className="text-slate-700"><span className="font-medium">Biometric Verification:</span> Match visitor to registered biometric data</li>
            <li className="text-slate-700"><span className="font-medium">Exit Gate Control:</span> Control exit from security area to secure zone</li>
          </ol>
        </div>
        
        <p className="text-slate-700 mb-4">
          The system integrates with industry-standard biometric verification systems, permission management services,
          and hardware controllers for physical gates and sensors.
        </p>
        
        <h4 className="font-medium text-slate-800 mb-2">Development Timeline</h4>
        <p className="text-slate-700">
          The system was developed over approximately 15 days with distinct phases reflecting my methodical 
          approach to building complex systems.
        </p>
      </div>
      
      <h3 className="text-2xl font-semibold mb-6 text-white border-b border-slate-700 pb-2">The Methodical Approach: Step-by-Step</h3>
      
      <PhaseSection 
        number="1"
        title="Domain-First Foundation (Days 1-3)"
        approach="I established the core domain model with proper entity relationships and process steps before introducing technical concerns."
        steps={[
          "Defined the primary domain entities (Visitor, ProcessStep, CompletedStep)",
          "Modeled the access control workflow as a sequence of discrete steps",
          "Implemented core domain logic in the AccessControlService",
          "Created mock implementations of external dependencies for early testing"
        ]}
        results={[
          "Clean separation between domain logic and external systems",
          "Early clarity on the overall process flow",
          "Testable components with minimal dependencies"
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
            // Security staff manually managing the situation
            return;
        }
    }

    private async Task ProcessPermittedVisitorUntilCompleted(IVisitorContext context)
    {
        // Logic for processing the visitor through gates...
    }
}`}
      />
      
      <PhaseSection 
        number="2"
        title="Interface-Based External Systems Modeling (Days 3-6)"
        approach="I defined clean interfaces for external dependencies and implemented mocks before tackling real integrations, enabling early testing of application flow."
        steps={[
          "Defined precise interfaces for each external system (IBiometricService, IPermissionService, IGateController)",
          "Created abstract base classes that handle common logic for each integration",
          "Implemented mock versions for each external service",
          "Established service registration patterns with dependency injection"
        ]}
        results={[
          "Ability to test the full application flow without real external systems",
          "Clear separation between interface contract and implementation details",
          "Simplified integration testing with the ability to mix real and mock services"
        ]}
        codeSnippet={`// Interface definition
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
}`}
      />
      
      <PhaseSection 
        number="3"
        title="Incremental Integration with Resilience Patterns (Days 7-10)"
        approach="I integrated each external system individually, immediately applying resilience patterns rather than treating them as an afterthought."
        steps={[
          "Implemented the real external service integrations",
          "Added a comprehensive resilience framework with retry policies and circuit breakers",
          "Distinguished between critical and non-critical operations with different resilience strategies",
          "Implemented graceful degradation paths for non-critical failures"
        ]}
        results={[
          "Robust handling of transient failures in external systems",
          "Prevention of cascading failures through circuit breakers",
          "Clear operational boundaries for different types of failures"
        ]}
        codeSnippet={`public class ResilientRetry : IRetryPolicy
{
    // Properties and dependencies...

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
            .AddRetry(new RetryStrategyOptions {
                // Configure retry with appropriate backoff strategy
            })
            .AddCircuitBreaker(new CircuitBreakerStrategyOptions {
                // Configure circuit breaker with appropriate thresholds
            })
            .Build();
        
        try {
            // Execute operation through the pipeline...
            return await pipeline.ExecuteAsync(async cancellationToken => {
                // Attempt operation with instrumentation
                return await operation();
            }, CancellationToken.None);
        }
        catch (BrokenCircuitException) {
            // Handle circuit breaker open state based on criticality
            if (!isCritical) {
                return default;
            }
            throw new CircuitBreakerException(/*...*/);
        }
    }
}`}
      />
      
      <PhaseSection 
        number="4"
        title="Comprehensive Testing Strategy (Days 10-14)"
        approach="I implemented a multi-layered testing approach including unit tests, integration tests, and a dedicated testing tool for scenario validation."
        steps={[
          "Created unit tests for domain logic and individual components",
          "Implemented integration tests with selective mocking capabilities",
          "Built a scenario testing tool for end-to-end validation",
          "Created load testing capabilities to verify performance under stress"
        ]}
        results={[
          "High test coverage across all components",
          "Ability to test realistic end-to-end scenarios",
          "Confidence in system behavior under various conditions",
          "Tool for manual testing and demonstration"
        ]}
        codeSnippet={`[TestFixture]
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
                options.UseMockServices.BiometricService = true;
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
}`}
      />
      
      <PhaseSection 
        number="5"
        title="Operational Readiness Focus (Days 14-17)"
        approach="I added health checks, monitoring, and diagnostics capabilities well before completion, ensuring the system would be easily troubleshooted in production."
        steps={[
          "Implemented component health checks with standardized reporting",
          "Added metrics collection for performance and reliability monitoring",
          "Implemented structured logging with context enrichment",
          "Created health endpoints for external monitoring systems"
        ]}
        results={[
          "Comprehensive health monitoring capabilities",
          "Easy identification of system component issues",
          "Rich metrics for performance analysis",
          "Structured logs for troubleshooting"
        ]}
        codeSnippet={`public abstract class StandardizedHealthCheck : IComponentHealthCheck
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
}`}
      />
      
      <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Distinctive Aspects and Innovations</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-slate-800 mb-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">1</div>
              Explicit Criticality Classification
            </h4>
            <p className="text-slate-700">
              I explicitly classified operations as &quot;critical&quot; or &quot;non-critical&quot; with different resilience strategies:
            </p>
            <ul className="list-disc pl-10 mt-2 space-y-1">
              <li className="text-slate-700">
                <span className="font-medium">Critical operations:</span> Must eventually succeed for system integrity, use unlimited retries with circuit breakers
              </li>
              <li className="text-slate-700">
                <span className="font-medium">Non-critical operations:</span> Can fail without breaking core functionality, use limited retries with fallbacks
              </li>
            </ul>
            <p className="text-slate-700 mt-2">
              This classification went beyond typical retry strategies to provide a nuanced approach to failure handling based on operational impact.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-800 mb-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">2</div>
              Purpose-Built Scenario Testing Tool
            </h4>
            <p className="text-slate-700">
              I developed a dedicated scenario testing tool that allows for testing specific failure scenarios,
              toggling between mock and real external systems, and interactive verification of system behavior.
              This tool bridged the gap between automated testing and manual verification, proving invaluable for
              validating complex physical interactions.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-800 mb-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">3</div>
              Physical Integration Testing Strategy
            </h4>
            <p className="text-slate-700">
              I implemented a unique approach to testing physical integrations with mock implementations that simulate
              realistic physical behavior, integration tests that could selectively use real or mocked hardware, and health checks
              specifically designed for physical hardware components. This strategy allowed for comprehensive testing
              without requiring physical hardware for every test scenario.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-800 mb-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">4</div>
              Manual Override Design
            </h4>
            <p className="text-slate-700">
              The system included carefully designed manual override capabilities for security staff with
              explicit exception types for manual interventions, clear workflow for handling manual overrides, and
              logging and auditing of manual interventions. This design recognized that physical access control systems
              must accommodate human intervention in exceptional circumstances.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Lessons Learned and Best Practices</h3>
        
        <div className="mb-6">
          <h4 className="font-medium text-slate-800 mb-3">Key Success Factors</h4>
          <ol className="list-decimal pl-10 space-y-2">
            <li className="text-slate-700">
              <span className="font-medium">Start with the domain model:</span> Establishing a clear domain model before tackling technical concerns provided a stable foundation.
            </li>
            <li className="text-slate-700">
              <span className="font-medium">Interfaces before implementations:</span> Defining clean interfaces for external systems enabled early testing and simplified integration.
            </li>
            <li className="text-slate-700">
              <span className="font-medium">Build resilience in from the start:</span> Implementing resilience patterns alongside core functionality ensured robust behavior.
            </li>
            <li className="text-slate-700">
              <span className="font-medium">Test at multiple levels:</span> The combination of unit tests, integration tests, and scenario-based testing provided comprehensive coverage.
            </li>
            <li className="text-slate-700">
              <span className="font-medium">Consider operational needs early:</span> Adding health checks, monitoring, and diagnostics early made the system production-ready.
            </li>
          </ol>
        </div>
        
        <div>
          <h4 className="font-medium text-slate-800 mb-3">Challenges and Solutions</h4>
          <div className="space-y-4">
            <div>
              <p className="text-slate-700">
                <span className="font-medium">Challenge:</span> Integrating with physical hardware that might be unavailable during development.
              </p>
              <p className="text-slate-700 pl-6">
                <span className="font-medium">Solution:</span> Created a flexible mock infrastructure that could simulate various hardware behaviors.
              </p>
            </div>
            <div>
              <p className="text-slate-700">
                <span className="font-medium">Challenge:</span> Handling failures in critical vs. non-critical operations differently.
              </p>
              <p className="text-slate-700 pl-6">
                <span className="font-medium">Solution:</span> Implemented a resilience framework with explicit criticality classification.
              </p>
            </div>
            <div>
              <p className="text-slate-700">
                <span className="font-medium">Challenge:</span> Testing complex physical interaction scenarios.
              </p>
              <p className="text-slate-700 pl-6">
                <span className="font-medium">Solution:</span> Developed a dedicated scenario testing tool with configurable components.
              </p>
            </div>
            <div>
              <p className="text-slate-700">
                <span className="font-medium">Challenge:</span> Ensuring configuration flexibility across environments.
              </p>
              <p className="text-slate-700 pl-6">
                <span className="font-medium">Solution:</span> Created a hierarchical configuration system with validation and clear documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg p-6 transition-all duration-200 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Conclusion</h3>
        <p className="text-slate-700 mb-4">
          The SecureAccess system demonstrates how I applied established software engineering principles to a mission-critical
          system with physical integration requirements. By focusing on domain modeling, clean interfaces, comprehensive 
          testing, and operational readiness from the beginning, I delivered a robust, maintainable solution that could 
          be confidently deployed in high-security environments.
        </p>
        <p className="text-slate-700">
          The distinctive aspects of my approach—particularly the explicit criticality classification, purpose-built 
          testing tools, and manual override design—demonstrate my ability to adapt established patterns to meet 
          unique requirements in specialized domains.
        </p>
      </div>
    </div>
  );
}