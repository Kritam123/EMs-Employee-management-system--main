
const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <blockquote className="p-6 bg-white rounded-lg shadow-lg">
          <p className="text-lg">"EMS made managing our workforce a breeze. The payroll automation is a game changer!"</p>
          <footer className="mt-4 text-gray-500">— Sarah, HR Manager</footer>
        </blockquote>
        <blockquote className="p-6 bg-white rounded-lg shadow-lg">
          <p className="text-lg">"With EMS, we saved hours every week managing employee records and attendance."</p>
          <footer className="mt-4 text-gray-500">— John, Operations Head</footer>
        </blockquote>
      </div>
    </div>
  </section>
  )
}

export default Testimonials