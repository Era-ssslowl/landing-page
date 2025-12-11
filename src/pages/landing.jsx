export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          Yerasyl.dev
        </div>
        <button className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition">
          Contact Me
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Hello, I am Yerasyl
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            I am a software developer skilled in React, Android (Kotlin), Go, 
            backend architecture, and machine learning. I enjoy building clean, 
            scalable systems and intuitive UI experiences.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition"
            >
              View Projects
            </a>

            <a
              href="#skills"
              className="px-6 py-3 rounded-md border border-gray-800 text-gray-800 font-medium hover:bg-gray-100 transition"
            >
              Skills
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Yerasyl. All rights reserved.
      </footer>
    </div>
  );
}
