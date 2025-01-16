import React, { useState } from "react";

const EditableText = ({ text }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(text.content);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <textarea
          value={content}
          onBlur={handleBlur}
          onChange={handleChange}
          className="text-xl font-semibold bg-inherit outline-none text-center"
          autoFocus
        />
      ) : (
        <div
          contentEditable={true}
          className="text-xl font-semibold outline-none text-center"
          onDoubleClick={handleDoubleClick}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default EditableText;
