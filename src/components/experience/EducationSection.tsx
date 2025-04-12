import React from 'react';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';

const EducationSection = () => {
  const education = [
    {
      institution: "Estonian University of Life Sciences",
      degree: "Rural Building (Maaehitus)",
      years: "2001 - 2003",
      description: "Studied rural building engineering. While I didn't complete the full program, the experience provided valuable knowledge in structural engineering principles.",
      completed: false
    },
    {
      institution: "Tartu Tamme Gümnaasium",
      degree: "Secondary Education",
      years: "1998 - 2001",
      description: "Completed secondary education with focus on sciences and mathematics.",
      completed: true
    }
  ];

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Education Background</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Academic Foundation
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white">
                    {edu.completed ? 
                      <GraduationCap className="h-6 w-6" aria-hidden="true" /> : 
                      <BookOpen className="h-6 w-6" aria-hidden="true" />
                    }
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">{edu.institution}</h3>
                  <p className="text-md text-gray-700">{edu.degree}</p>
                  {!edu.completed && (
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 mt-1">
                      Attended
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-16">
                <p className="text-gray-700 flex items-center mb-3">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  {edu.years}
                </p>
                <p className="text-gray-700">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;