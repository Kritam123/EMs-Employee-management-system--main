import featuredLogo from "@/assets/featured-logo.jpg"
const Featured = () => {
  return (
    <section id="features" className="py-16">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
      <img src={featuredLogo || "https://via.placeholder.com/500x300"} alt="Features" className="w-full md:w-1/2 mb-6 md:mb-0"/>
      <div className="md:ml-8">
        <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
        <ul className="space-y-2 text-gray-700">
          <li><span className="text-indigo-600 font-semibold">✓</span> Easy integration with existing systems</li>
          <li><span className="text-indigo-600 font-semibold">✓</span> Cloud-based and accessible anywhere</li>
          <li><span className="text-indigo-600 font-semibold">✓</span> Role-based access control</li>
        </ul>
      </div>
    </div>
  </section>
  )
}

export default Featured