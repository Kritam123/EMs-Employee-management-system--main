
const Services = () => {
  return (
    <section id="services" className="py-16 bg-gray-50">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Our Services</h2>
      <p className="text-gray-600 mb-12">We offer a range of services to keep your organization running smoothly.</p>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Attendance Tracking</h3>
          <p className="text-gray-600">Monitor employee attendance and leave in real-time.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Payroll Management</h3>
          <p className="text-gray-600">Automate salary processing and tax deductions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Employee Data Management</h3>
          <p className="text-gray-600">Maintain accurate employee records in one place.</p>
        </div>
      </div>
    </div>
  </section>

  )
}

export default Services