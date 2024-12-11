
const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-6">Contact Us</h2>
      <p className="text-center text-gray-600 mb-12">
        Have any questions? We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
      </p>
  
      <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="Your Name" 
              required 
            />
          </div>
  
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="Your Email" 
              required 
            />
          </div>
  
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="Subject of your message" 
              required 
            />
          </div>
  
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="Write your message here..." 
              required
            ></textarea>
          </div>
  
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
  )
}

export default ContactSection