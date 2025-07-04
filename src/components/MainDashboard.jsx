import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

import { MagnifyingGlassIcon, PlusIcon, TrashIcon, Squares2X2Icon, FolderIcon } from "@heroicons/react/24/outline"

const MainDashboard = ({ onViewChange }) => {
  const [automations, setAutomations] = useState([
    {
      id: "1",
      name: "Untitled",
      description: "User comments on your Live and comment contains",
      status: "Off",
      runs: "n/a",
      ctr: "n/a",
      modified: "24 minutes ago",
      type: "comment",
    },
    {
      id: "2",
      name: "「気になる」から収益化の方法を伝える",
      description: "User comments on any Post or Reel and comment contains 気になる",
      status: "Active",
      runs: "1",
      ctr: "100%",
      modified: "3 days ago",
      type: "comment",
    },
    {
      id: "3",
      name: "Untitled",
      description: "User replies on any Story and message contains インスタ",
      status: "Active",
      runs: "13",
      ctr: "84.6%",
      modified: "2 weeks ago",
      type: "story",
    },
  ])

  const [draggedOver, setDraggedOver] = useState(null)
  const [showGuidelines, setShowGuidelines] = useState(false)

  const handleDragEnd = (result) => {
    setShowGuidelines(false)
    setDraggedOver(null)

    if (!result.destination) return

    const items = Array.from(automations)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setAutomations(items)
  }

  const handleDragStart = () => {
    setShowGuidelines(true)
  }

  const handleDragUpdate = (update) => {
    setDraggedOver(update.destination?.index || null)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">My Automations</h1>
          <button
            onClick={() => onViewChange("builder")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>New Automation</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search all Automations"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Any Trigger</option>
            <option>Comment Trigger</option>
            <option>Story Trigger</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Any Trigger states</option>
            <option>Active</option>
            <option>Off</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* New Folder Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 p-3 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
              <FolderIcon className="w-5 h-5 text-blue-500" />
              <span className="text-blue-600 font-medium">FAQ</span>
            </div>
            <button className="flex items-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <PlusIcon className="w-5 h-5 text-blue-500" />
              <span className="text-blue-600 font-medium">New Folder</span>
            </button>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrashIcon className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500">Trash</span>
          </div>
          <div className="flex items-center space-x-2">
            <Squares2X2Icon className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500">View as grid</span>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-gray-50 px-4 py-3 rounded-t-lg border border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Runs</div>
            <div className="col-span-2">CTR</div>
            <div className="col-span-3">Modified</div>
          </div>
        </div>

        {/* Draggable Automations List */}
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragUpdate={handleDragUpdate}>
          <Droppable droppableId="automations">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`relative ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}
              >
                {/* Visual Guidelines */}
                {showGuidelines && (
                  <div className="absolute inset-0 pointer-events-none">
                    {automations.map((_, index) => (
                      <div
                        key={`guideline-${index}`}
                        className={`absolute left-0 right-0 h-px bg-blue-300 transition-opacity ${
                          draggedOver === index ? "opacity-100" : "opacity-30"
                        }`}
                        style={{ top: `${index * 80}px` }}
                      />
                    ))}
                  </div>
                )}

                {automations.map((automation, index) => (
                  <Draggable key={automation.id} draggableId={automation.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-white border-l border-r border-b border-gray-200 px-4 py-4 transition-all ${
                          snapshot.isDragging ? "shadow-lg rotate-1 bg-blue-50 border-blue-300" : "hover:bg-gray-50"
                        } ${draggedOver === index ? "border-t-2 border-t-blue-400" : ""}`}
                        onClick={() => onViewChange("builder", automation)}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-5">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <div>
                                <div className="font-medium text-gray-900">{automation.name}</div>
                                <div className="text-sm text-gray-500 flex items-center space-x-2">
                                  <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  </div>
                                  <span>{automation.description}</span>
                                  {automation.status === "Off" && (
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Off</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 text-gray-900">{automation.runs}</div>
                          <div className="col-span-2 text-gray-900">{automation.ctr}</div>
                          <div className="col-span-3 text-gray-500">{automation.modified}</div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default MainDashboard
