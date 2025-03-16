import { useState } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '../Components/Navbar';

const HelpSupport = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const faqCategories = [
    {
      title: 'Account Setup',
      questions: [
        { q: 'How do I create an account?', a: 'Click "Sign Up" and follow the verification process...' },
        { q: 'How to reset password?', a: 'Use the "Forgot Password" link on login page...' }
      ]
    },
    {
      title: 'Digital Detox Tips',
      questions: [
        { q: 'Best practices for beginners?', a: 'Start with small screen-free intervals...' },
        { q: 'How to track progress?', a: 'maintain your novel or diary ...' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar/>
      {/* Search Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 mt-10">
        <div className="relative">
          <input
            type="text"
            placeholder="How can we help you?"
            className="w-full p-4 pl-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <MagnifyingGlassIcon className="w-6 h-6 absolute left-4 top-5 text-slate-400" />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        {faqCategories.map((category, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">{category.title}</h2>
            {category.questions.map((question, qIndex) => (
              <div 
                key={qIndex}
                className="bg-white rounded-lg shadow-sm mb-2 transition-all duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => setActiveSection(activeSection === qIndex ? null : qIndex)}
                  className="w-full p-4 text-left flex justify-between items-center"
                >
                  <span className="text-slate-700">{question.q}</span>
                  <ChevronDownIcon className={`w-5 h-5 transform transition-transform ${
                    activeSection === qIndex ? 'rotate-180' : ''
                  }`} />
                </button>
                {activeSection === qIndex && (
                  <div className="p-4 pt-0 text-slate-600">
                    {question.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Contact Button */}
      <button
        onClick={() => setShowContactForm(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <ChatBubbleLeftIcon className="w-6 h-6" />
      </button>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="Describe your issue"
                rows="4"
                className="w-full p-3 border rounded-lg"
              ></textarea>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;