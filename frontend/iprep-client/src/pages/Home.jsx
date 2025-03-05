import React from "react";


function Home() {
  return (
    // <div class="flex items-center justify-center min-h-screen bg-gray-100">
    //   <section class="hero-body">
    //     <div>
    //       <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">iPrep</h1>
    //       <h2 class="subtitle">FDM's AI powered interviewer!</h2>
    //     </div>
    //   </section>
    // </div>
    <div className="min-h-screen bg-[#1A1C1B] text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 bg-[#2A2E2E] text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#95FF77]">
          Unlock Your Potential with AI-Powered Interviews
        </h1>
        <p className="mt-4 text-lg text-[#555D58] max-w-2xl">
          Prepare for your dream job with real-time AI-powered interview simulations tailored to your experience and skills.
        </p>
        <a
          href="#start"
          className="mt-6 px-8 py-3 bg-[#59FF00] text-[#1A1C1B] font-semibold text-xl rounded-lg hover:bg-[#95FF77] transition duration-300"
        >
          Start Your Free Trial
        </a>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#555D58] text-center">
        <h2 className="text-3xl font-bold text-[#95FF77]">Why Choose Our AI Interview Tool?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-[#2A2E2E] rounded-lg">
            <h3 className="text-2xl font-semibold text-[#95FF77]">Tailored Interviews</h3>
            <p className="mt-4 text-[#E0E0E0]">
              Receive questions based on the job description and your experience.
            </p>
          </div>
          <div className="p-6 bg-[#2A2E2E] rounded-lg">
            <h3 className="text-2xl font-semibold text-[#95FF77]">Instant Feedback</h3>
            <p className="mt-4 text-[#E0E0E0]">
              Get valuable insights into your performance and improve for the real interview.
            </p>
          </div>
          <div className="p-6 bg-[#2A2E2E] rounded-lg">
            <h3 className="text-2xl font-semibold text-[#95FF77]">24/7 Access</h3>
            <p className="mt-4 text-[#E0E0E0]">
              Practice anytime and anywhere with our online AI tool.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="start" className="py-20 bg-[#1A1C1B] text-center">
        <h2 className="text-3xl font-bold text-[#95FF77]">
          Ready to Ace Your Next Interview?
        </h2>
        <p className="mt-4 text-lg text-[#555D58] max-w-2xl mx-auto">
          Take the first step towards your future career by signing up for our AI-powered interview simulator.
        </p>
        <a
          href="#"
          className="mt-6 px-8 py-3 bg-[#59FF00] text-[#1A1C1B] font-semibold text-xl rounded-lg hover:bg-[#95FF77] transition duration-300"
        >
          Sign Up Now
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-[#2A2E2E] text-center text-[#95FF77]">
        <p>&copy; 2025 AI Interview Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
