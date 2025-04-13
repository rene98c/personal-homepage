import React from 'react';

const BlogPostPreview = ({ title, excerpt, date, readTime, slug, isRaw }: { title: string, excerpt: string, date: string, readTime: string, slug: string, isRaw: boolean }) => {
  return (
    <div className="bg-indigo-800 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-600/20 transition-shadow duration-300 border border-indigo-700">
      <div className="p-6">
        {isRaw && (
          <span className="inline-block bg-indigo-200 text-indigo-900 text-xs px-2 py-1 rounded-full uppercase font-medium tracking-wide mb-2">
            Unedited
          </span>
        )}
        
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
        
        <div className="text-sm text-indigo-300 mb-4 flex items-center">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime} min read</span>
        </div>
        
        <p className="text-indigo-100 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <a 
          href={`/blog/${slug}`} 
          className="inline-flex items-center text-indigo-300 hover:text-indigo-100 font-medium"
        >
          Read more
          <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default BlogPostPreview;

// Example usage:
export const BlogPostPreviewExample = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 py-12">
      <BlogPostPreview 
        title="The AI-Powered Developer: Reflections on My Journey" 
        excerpt="The landscape of software development has fundamentally changed. As I look at the SecureAccess system and this website—both projects I'm deeply proud of—I can't help but reflect on the role AI played in bringing them to life." 
        date="April 13, 2025" 
        readTime="8" 
        slug="ai-powered-developer" 
        isRaw={false}
      />
      
      <BlogPostPreview 
        title="Raw Thoughts: AI and My Development Journey" 
        excerpt="I was wondering, i did use lots of AI help to build this personal website and also AI help was used to build secureaccess system. AI tools have been of tremendous help..."
        date="April 13, 2025" 
        readTime="3" 
        slug="raw-thoughts-ai-development" 
        isRaw={true}
      />
    </div>
  );
};