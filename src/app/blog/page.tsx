import React from 'react';
import BlogPostPreview from './BlogPostPreview';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 'ai-powered-developer',
      title: 'The AI-Powered Developer: Reflections on My Journey',
      excerpt: "The landscape of software development has fundamentally changed. As I look at the SecureAccess system and this website—both projects I'm deeply proud of—I can't help but reflect on the role AI played in bringing them to life.",
      date: 'April 13, 2025',
      readTime: '8',
      slug: 'ai-powered-developer',
      isRaw: false
    },
    {
      id: 'raw-thoughts',
      title: 'Raw Thoughts: AI and My Development Journey',
      excerpt: "I was wondering, i did use lots of AI help to build this personal website and also AI help was used to build secureaccess system. AI tools have been of tremendous help...",
      date: 'April 13, 2025',
      readTime: '3',
      slug: 'raw-thoughts-ai-development',
      isRaw: true
    },
   /*  {
      id: 'scenario-testing-tool',
      title: 'From Unit Tests to Real-World Confidence',
      excerpt: "When you're building software that controls the physical world — biometric scanners, gate systems, permission services — validating behavior goes far beyond simple unit tests.",
      date: 'April 5, 2025',
      readTime: '6',
      slug: 'scenario-testing-tool',
      isRaw: false
    } */
  ];

  return (
    <div className="bg-indigo-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Thoughts on software development, architecture, resilience engineering, and the evolving role of AI in our craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostPreview 
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              slug={post.slug}
              isRaw={post.isRaw}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;