import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { FaRedoAlt } from "react-icons/fa"; // Import rotation icon

const Home = () => {
  const [textContainers, setTextContainers] = useState([
    { id: 3, texts: [], devices: [] },
  ]);

  const handleAddContainer = () => {
    setTextContainers((prev) => [
      ...prev,
      {
        id: Date.now(),
        texts: [],
        devices: [],
      },
    ]);
  };
  const handleRemoveContainer = (containerId) => {
    setTextContainers((prev) =>
      prev.filter((container) => container.id !== containerId)
    );
  };
  const handleAddText = (containerId) => {
    setTextContainers((prev) =>
      prev.map((container, containerIndex) =>
        container.id === containerId
          ? {
              ...container,
              texts: [
                ...container.texts,
                {
                  content: `New Text ${container.texts.length + 1}`,
                  rotation: 0,
                  x: 50,
                  y: 50,
                },
              ],
            }
          : container
      )
    );
  };

  const handleAddImage = (containerId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setTextContainers((prev) =>
        prev.map((container) =>
          container.id === containerId
            ? {
                ...container,
                texts: [
                  ...container.texts,
                  {
                    content: imageUrl,
                    type: "image",
                    rotation: 0,
                    x: 50,
                    y: 100,
                  },
                ],
              }
            : container
        )
      );
    };
    input.click();
  };
  const handleAddDevice = (containerId) => {
    setTextContainers((prev) =>
      prev.map((container) =>
        container.id === containerId
          ? {
              ...container,
              devices: [
                ...container.devices,
                {
                  id: Date.now(),
                  type: "device",
                  content: `
            <div style="position : relative  ; background : green; width : 200px;">
            <img src="/images/hijib.jpg" style="height : 100% ;object-fit: fill ;"/>
            <img src="/images/iphone_t1.png" alt="Placeholder Image" style="position: absolute;top: 0px;  width : 200px; object-fit: cover;" />
            </div>
                  `,
                  x: 0, // Initial position
                  y: 0, // Initial position
                },
              ],
            }
          : container
      )
    );
  };
  console.log("container", textContainers);

  const handleDeleteText = (containerId, textIndex) => {
    setTextContainers((prev) =>
      prev.map((container) =>
        container.id === containerId
          ? {
              ...container,
              texts: container.texts.filter((_, index) => index !== textIndex),
            }
          : container
      )
    );
  };
  const handleDeleteDevice = (containerId, deviceIndex) => {
    setTextContainers((prev) =>
      prev.map((container) =>
        container.id === containerId
          ? {
              ...container,
              devices: container.devices.filter(
                (_, index) => index !== deviceIndex
              ),
            }
          : container
      )
    );
  };
  const handleDuplicateText = (containerId, textIndex, content) => {
    console.log("text", content);

    setTextContainers((prev) =>
      prev.map((container) =>
        container.id === containerId
          ? {
              ...container,
              texts: [
                ...container.texts,
                {
                  ...container.texts[textIndex],
                  x: container.texts[textIndex].x + 20, // Offset position for better visibility
                  y: container.texts[textIndex].y + 20,
                },
              ],
            }
          : container
      )
    );
  };
  const handleDeleteElement = (containerId, elementId) => {
    setTextContainers((prev) =>
      prev.map((container) =>
        container.id === containerId
          ? {
              ...container,
              texts: container.texts.filter(
                (element) => element.id !== elementId
              ),
            }
          : container
      )
    );
  };

  const handleRotate = (containerId, textIndex) => {
    setTextContainers((prev) =>
      prev.map((container) =>
        container.id === containerId
          ? {
              ...container,
              texts: container.texts.map((text, index) =>
                index === textIndex
                  ? {
                      ...text,
                      rotation: text.rotation + 10,
                    }
                  : text
              ),
            }
          : container
      )
    );
  };

  return (
    <div className="px-10  absolute py-2 flex gap-5">
      {textContainers.map((container) => (
        <div key={container.id} className="flex object-fill flex-col">
          <div className="w-full flex justify-end gap-3">
            <div
              className="bg-red-600/50 cursor-pointer hover:shadow-lg rounded-lg text-sm px-2 mb-1"
              onClick={() => handleAddText(container.id)}
            >
              Add Text
            </div>
            <div
              className="bg-red-600/50 cursor-pointer hover:shadow-lg rounded-lg text-sm px-2 mb-1"
              onClick={() => handleAddImage(container.id)}
            >
              Add Image
            </div>
            <div
              className="bg-red-600/50 cursor-pointer hover:shadow-lg rounded-lg text-sm px-2 mb-1"
              onClick={() => handleAddDevice(container.id)}
            >
              Add Device
            </div>
            <div
              className="bg-blue-300/50 cursor-pointer hover:shadow-lg rounded-lg text-sm px-2 mb-1"
              onClick={() => handleAddContainer()}
            >
              Add Template
            </div>
            <div
              className="bg-red-300/50 cursor-pointer hover:shadow-lg rounded-lg text-sm px-2 mb-1"
              onClick={() => handleRemoveContainer(container.id)}
            >
              X
            </div>
          </div>
          <div className="bg-[#E3FDFD] rounded-md w-[322.961px] h-[530px] relative overflow-hidden">
            {container.texts.map((text, textIndex) => (
              <Rnd
                key={textIndex}
                default={{
                  x: text.x,
                  y: text.y,
                }}
                bounds="parent"
                className="flex relative items-center  group justify-center border hover:border-blue-500 border-dashed hover:border-solid border-gray-400"
                onDragStop={(e, d) => {
                  setTextContainers((prev) =>
                    prev.map((cont) =>
                      cont.id === container.id
                        ? {
                            ...cont,
                            texts: cont.texts.map((t, i) =>
                              i === textIndex ? { ...t, x: d.x, y: d.y } : t
                            ),
                          }
                        : cont
                    )
                  );
                }}
              >
                <div className="bg-blue-500 hidden group-hover:block !w-2 !h-2 rounded-full absolute -bottom-1 -right-1"></div>
                <span
                  className="absolute -top-5 right-4 text-xs bg-green-500 text-white rounded px-1 cursor-pointer"
                  onClick={() =>
                    handleDuplicateText(container.id, textIndex, text.content)
                  }
                >
                  D
                </span>
                <span
                  className="absolute -top-5 -right-1 text-xs bg-red-400 text-white rounded px-1 cursor-pointer"
                  onClick={() => handleDeleteText(container.id, textIndex)}
                >
                  X
                </span>
                {text.type === "image" && (
                  <div className="w-full h-full absolute inset-0"></div>
                )}
                {text.type === "image" ? (
                  <img
                    src={text.content}
                    alt="Uploaded"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div
                    contentEditable={true}
                    className="text-xl font-semibold outline-none text-center"
                  >
                    {text.content}
                  </div>
                )}
              </Rnd>
            ))}
            {container?.devices.map((device, deviceIndex) => (
              <Rnd
                key={deviceIndex}
                default={{
                  x: device.x,
                  y: device.y,
                }}
                bounds="parent"
                className="flex relative items-center  group justify-center border hover:border-blue-500 border-dashed hover:border-solid border-gray-400"
                onDragStop={(e, d) => {
                  setTextContainers((prev) =>
                    prev.map((cont) =>
                      cont.id === container.id
                        ? {
                            ...cont,
                            devices: cont.devices.map((t, i) =>
                              i === deviceIndex ? { ...t, x: d.x, y: d.y } : t
                            ),
                          }
                        : cont
                    )
                  );
                }}
              >
                <div className="bg-blue-500 hidden group-hover:block !w-2 !h-2 rounded-full absolute -bottom-1 -right-1"></div>
                <span
                  className="absolute -top-5 right-4 text-xs bg-green-500 text-white rounded px-1 cursor-pointer"
                  onClick={() => handleDuplicateText(container.id, deviceIndex)}
                >
                  D
                </span>
                <span
                  className="absolute -top-5 -right-1 text-xs bg-red-400 text-white rounded px-1 cursor-pointer"
                  onClick={() => handleDeleteDevice(container.id, deviceIndex)}
                >
                  X
                </span>
                <div className="w-full h-full bg-red-300">
                  <img
                    src="/images/iphone_t1.png"
                    alt="Uploaded"
                    className="w-full h-full object-contain"
                  />
                  <img
                    src="/images/hijib.jpg"
                    alt="Uploaded"
                    className="w-full h-full object-contain absolute inset-0"
                  />
                </div>
              </Rnd>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
