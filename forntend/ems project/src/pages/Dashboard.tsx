import ViewPageComponents from "@/components/Reuseable_components/view-page-components"
import { Button } from "@/components/ui/button";
import featuredLogo from "@/assets/featured-logo.jpg"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useStore from "@/store/useStore"
interface TasksProps {
  tasks: { id: number; title: string; status: string }[]
}
const DashboardPage = ({tasks}:TasksProps) => {
  const {user} = useStore();

  
  return (
    <ViewPageComponents >
      <div className="p-6">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={JSON.parse(user?.photo_url).secure_url || featuredLogo}
          alt="Employee Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-semibold">{user?.firstName}</h1>
          <p className="text-gray-500">Department: {user?.id}</p>
        </div>
      </div>

      {/* Task Overview Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tasks Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks && tasks.length > 0 ? (
            <ul className="list-disc list-inside">
              {tasks.map((task: { id: number; title: string; status: string }) => (
                <li key={task.id} className="flex justify-between">
                  <span>{task.title}</span>
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks assigned.</p>
          )}
        </CardContent>
      </Card>

      {/* Actions Section */}
      <div className="flex space-x-4">
        <Button>View Attendance</Button>
        <Button variant="outline">Request Leave</Button>
      </div>
    </div>
    </ViewPageComponents>
  )
}

export default DashboardPage