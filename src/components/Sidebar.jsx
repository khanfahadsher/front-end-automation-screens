
import {
  HomeIcon,
  UserIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

const Sidebar = ({ currentView, onViewChange }) => {
  const menuItems = [
    { icon: HomeIcon,  id: "home" },
    { icon: UserIcon,  id: "profile" },
    { icon: XMarkIcon,  id: "x" },
    { icon: ChatBubbleLeftRightIcon,  id: "messages" },
    { icon: CogIcon,  id: "settings" },
    { icon: QuestionMarkCircleIcon,  id: "help" },
  ]

  const automationItems = [
    // { label: "My Automations", id: "dashboard", active: true },
    // { label: "Basic", id: "basic" },
    // { label: "Sequences", id: "sequences" },
  ]

  return (
    <div className="w-[80px] bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
      <div className=" h-10 bg-black text-white rounded flex items-center justify-center font-bold">M</div>

       
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4">
        {/* Main Menu */}
        <div className="px-3 mb-6  ">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className="w-full flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon className="size-7 " />
                <span className="text-sm">{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Automation Section */}
        <div className="px-3">
          <div className="mb-2">
            <div className="flex items-center px-3 py-1">
              <div className="w-6 h-6 bg-blue-500 text-white rounded text-xs flex items-center justify-center mr-2">
                PRO
              </div>
            </div>
          </div>
          {automationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                item.active || currentView === item.id ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">🔧</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
