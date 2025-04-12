export const Stats = () => {
    // Stats Section (inspired by examplestwui_stats.js)
const stats = [
    { label: 'Years of Experience', value: '20+' },
    { label: 'Projects Involved With', value: '30+' },
    { label: 'Technologies Mastered', value: '15+' },
  ];
  
    return (
        
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Professional Journey</h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl/8 text-gray-600">
                  I&apos;ve been writing and developing software on the .NET platform in C# since 2003. Throughout my career, 
                  I&apos;ve worked across a variety of industries including government systems, transportation, and enterprise solutions.
                </p>
                <p className="mt-10 max-w-xl text-base/7 text-gray-700">
                  My approach to software development emphasizes clean architecture, design patterns, and resilient 
                  systems that can adapt to changing requirements. I believe in building software that not only meets 
                  current needs but is flexible enough to evolve over time.
                </p>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                      <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Stats;