import React from 'react';
import { Award, Calendar, Check } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      name: "Developing and Implementing Web Applications with Microsoft Visual C# .NET",
      issuer: "Microsoft",
      year: 2006
    },
    {
      name: "Designing and Implementing Databases with Microsoft SQL Server 2000 Enterprise Edition",
      issuer: "Microsoft",
      year: 2006
    },
    {
      name: "Developing XML Web Services and Server Components with Microsoft Visual C# .NET",
      issuer: "Microsoft",
      year: 2006
    },
    {
      name: "MOC#2273 Designing IT Managing and Maintaining a Microsoft Windows Server 2003 Environment",
      issuer: "BCS Koolituse AS",
      year: 2005
    },
    {
      name: "Enterasys ESE Network Specialist Fastrack",
      issuer: "TELEGRUPP",
      year: 2005
    }
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Professional Development</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Certifications & Training
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            I&apos;ve invested in formal training and certifications to complement my practical experience,
            ensuring my technical knowledge stays current and comprehensive.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                  </div>
                </div>
                <div className="ml-10">
                  <p className="text-gray-700 flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Issued by {cert.issuer}
                  </p>
                  <p className="text-gray-700 flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsSection;