// src/data/design-patterns/resilience-patterns.ts

export const resiliencePatterns = [
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
  }`,
      category: "resilience"
    },
    // Added Timeout Pattern
    {
      name: "Timeout Pattern",
      problem: "Preventing operations from waiting indefinitely by setting maximum timeouts.",
      benefits: [
        "Prevented system hangs due to unresponsive external services",
        "Implemented graceful failure handling for user-facing operations",
        "Created consistent timeout behavior across the application"
      ],
      codeSnippet: `public async Task Handle(Action<BiometricVerificationResult> callback, TimeSpan timeout)
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
  }`,
      category: "resilience"
    }
  ];