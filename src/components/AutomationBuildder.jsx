import { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  ArrowLeftIcon,
  PlusIcon,
  EyeIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Instagram } from "lucide-react";

const AutomationBuilder = ({ automation, onViewChange }) => {
  const canvasRef = useRef(null);

  const [whenPos, setWhenPos] = useState({ x: 100, y: 100 });
  const [actionPos, setActionPos] = useState({ x: 400, y: 300 });
  const [dragTarget, setDragTarget] = useState(null);

  const boxSize = { width: 200, height: 120 };

  const handleMouseDown = (target) => (e) => {
    e.preventDefault();
    setDragTarget({
      id: target,
      offsetX: e.clientX - (target === "when" ? whenPos.x : actionPos.x),
      offsetY: e.clientY - (target === "when" ? whenPos.y : actionPos.y),
    });
  };

  const handleMouseMove = (e) => {
    if (!dragTarget) return;
    
    const { offsetX, offsetY, id } = dragTarget;
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    if (id === "when") {
      setWhenPos({ x: newX, y: newY });
    } else {
      setActionPos({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragTarget(null);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragTarget]);

  const [selectedPosts, setSelectedPosts] = useState(["all"]);
  const [workflowSteps, setWorkflowSteps] = useState([
    {
      id: "trigger",
      type: "trigger",
      title: "User comments on your Post or Reel",
      subtitle: "Post or Reel Comments #25",
    },
    { id: "action", type: "action", title: "Instagram", subtitle: "AI Step" },
  ]);

  const containerRef = useRef(null);
  const [heights, setHeights] = useState([]);

  const posts = [
    { id: 1, image: "/placeholder.svg?height=100&width=100" },
    { id: 2, image: "/placeholder.svg?height=100&width=100" },
    { id: 3, image: "/placeholder.svg?height=100&width=100" },
    { id: 4, image: "/placeholder.svg?height=100&width=100" },
    { id: 5, image: "/placeholder.svg?height=100&width=100" },
    { id: 6, image: "/placeholder.svg?height=100&width=100" },
  ];

  const stepOptions = [
    { id: "ai", label: "AI", icon: "🤖" },
    { id: "actions", label: "Actions", icon: "⚡" },
    { id: "condition", label: "Condition", icon: "🔀" },
    { id: "randomizer", label: "Randomizer", icon: "🎲" },
    { id: "delay", label: "Smart Delay", icon: "⏱️" },
  ];

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(".step-item");
      const newHeights = Array.from(elements).map((el) => el.clientHeight);
      setHeights(newHeights);
    }
  }, []);

  const getEdgeToEdgeCurvePath = () => {
    const startX = whenPos.x + boxSize.width;
    const startY = whenPos.y + boxSize.height / 2;
    const endX = actionPos.x;
    const endY = actionPos.y + boxSize.height / 2;
    const curvature = 0.5 * Math.abs(endX - startX);

    return `M ${startX},${startY} C ${startX + curvature},${startY} ${
      endX - curvature
    },${endY} ${endX},${endY}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-screen overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-6 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 h-full">
            <button
              onClick={() => onViewChange("dashboard")}
              className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 h-full">
              <span className="text-gray-500 h-6 flex items-center">
                Automations
              </span>
              <span className="text-gray-400 h-6 flex items-center">{">"}</span>
              <span className="text-gray-900 h-6 flex items-center">
                Untitled
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 h-full">
            <span className="text-green-600 text-sm h-6 flex items-center">
              ✓ Saved
            </span>
            <button className="h-10 flex items-center space-x-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <EyeIcon className="w-4 h-4" />
              <span>Preview</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            <button className="h-10 bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg">
              Set Live
            </button>
            <button className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4 h-8">
              <ArrowLeftIcon className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold h-6 flex items-center">
                Post or Reel Comments #25
              </h2>
            </div>
            <div className="text-sm text-gray-500 mb-2 h-5 flex items-center">
              Step 1 of 3
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "33%" }}
              ></div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-6 h-7 flex items-center">
              Which Post or Reel do you want to use in automation?
            </h3>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 h-6">
                <h4 className="font-medium">Specific Post or Reel</h4>
                <button className="text-blue-500 text-sm hover:underline h-6 flex items-center">
                  See More
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {posts.map((post) => (
                  <div key={post.id} className="relative aspect-square">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Post ${post.id}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <div className="absolute top-2 right-2 h-6 w-6 bg-white rounded-full border border-gray-300 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full border border-gray-400"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors h-16 flex flex-col justify-center ${
                  selectedPosts.includes("all")
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPosts(["all"])}
              >
                <div className="flex items-center justify-between h-6">
                  <span className="font-medium">All Posts or Reels</span>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded h-5 flex items-center">
                    PRO
                  </span>
                </div>
              </div>

              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors h-16 flex flex-col justify-center ${
                  selectedPosts.includes("next")
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPosts(["next"])}
              >
                <div className="flex items-center justify-between h-6">
                  <span className="font-medium">Next Post or Reel</span>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded h-5 flex items-center">
                    PRO
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center">
              Continue
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div
            ref={canvasRef}
            className="relative w-full h-screen bg-gray-100 overflow-hidden"
            style={{ cursor: dragTarget ? 'grabbing' : 'default' }}
          >
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="gray" />
                </marker>
              </defs>
              <path
                d={getEdgeToEdgeCurvePath()}
                stroke="gray"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrow)"
              />
            </svg>

            <div
              className="absolute p-4 bg-white rounded-lg shadow-lg cursor-move border border-gray-200"
              onMouseDown={handleMouseDown("when")}
              style={{ 
                left: whenPos.x, 
                top: whenPos.y,
                width: `${boxSize.width}px`,
                userSelect: 'none'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  ⚡ When...
                </span>
              </div>
              <div className="mt-2 p-2 text-xs text-gray-600 border border-green-400 rounded bg-gray-50">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  <span>User comments on your post or reel</span>
                </div>
                <div className="text-center text-xs text-gray-400 mt-1">
                  Post or Reel comments #25
                </div>
              </div>
              <button className="w-full mt-2 p-2 text-blue-500 text-sm border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50">
                + New Trigger
              </button>
            </div>

            <div
              className="absolute p-4 bg-white rounded-lg shadow-lg cursor-move border border-gray-200"
              onMouseDown={handleMouseDown("action")}
              style={{ 
                left: actionPos.x, 
                top: actionPos.y,
                width: `${boxSize.width}px`,
                userSelect: 'none'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  💡 Choose first step
                </span>
              </div>
              <div className="mt-2 p-2 text-xs text-gray-600 border border-blue-400 rounded bg-gray-50">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram AI</span>
                </div>
              </div>
              <button className="w-full mt-2 p-2 text-blue-500 text-sm border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50">
                + Add Step
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-20 right-8">
        <button className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center">
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="fixed bottom-1/2 right-24 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center justify-center">
          <span className="text-lg">✱</span>
        </button>
        <button className="w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center justify-center">
          <PlusIcon className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center justify-center">
          <span className="text-lg">−</span>
        </button>
      </div>
    </div>
  );
};

export default AutomationBuilder;