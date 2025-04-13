// src/app/blog/page.tsx
import React from 'react';
import Link from 'next/link';

const BlogPage = () => {
  const blogPosts = [
    {
      slug: 'scenario-testing-tool',
      title: 'From Unit Tests to Real-World Confidence',
      subtitle: 'Building a Scenario Testing Tool for Physical System Validation',
      date: 'April 13, 2025',
      excerpt: "When you're building software that controls the physical world — biometric scanners, gate systems, permission services — validating behavior goes far beyond simple unit tests.",
      tags: ['Testing', 'Architecture', 'Development Tools']
    },
    // You can add more blog posts here as you create them
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600">Insights & Experiences</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Blog
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Thoughts on software development, architecture, and technical problem-solving
            from my years of experience building robust systems.
          </p>
        </div>
      </div>
      
      {/* Blog Posts List */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article key={post.slug} className="bg-white shadow-lg border border-gray-100 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
                  <div className="px-6 py-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                      <div>
                        <div className="flex space-x-2 mb-2">
                          {post.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="mt-1 text-lg font-medium text-indigo-600">{post.subtitle}</p>
                      </div>
                      <time className="text-sm text-gray-500 mt-2 sm:mt-0">{post.date}</time>
                    </div>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center group"
                    >
                      Read more
                      <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;