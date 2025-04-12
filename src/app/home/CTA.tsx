import Link from "next/link";

// CTA Section (inspired by examplestwui_ctablue.js)
export const CTA = () => {
    return (
      <div className="bg-indigo-700">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              See how I translate creative thinking into elegant code
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-indigo-200">
              Check out my case study on building a mission-critical access control system to see how I apply creative problem-solving and technical excellence in practice.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/case-study"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View Case Study
              </Link>
              <Link href="/contact" className="text-sm/6 font-semibold text-white">
                Contact Me →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default CTA;