import { track, useEditor, exportAs } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useEffect } from "react";
import "./DrawUI.css";

const DrawUI = track(() => {
  const editor = useEditor();
  const shapes = editor.getCurrentPageShapes();

  useEffect(() => {
    const handleKeyUp = (e) => {
      switch (e.key) {
        case "Delete":
        case "Backspace": {
          editor.deleteShapes(editor.getSelectedShapeIds());
          break;
        }
        case "v": {
          editor.setCurrentTool("select");
          break;
        }
        case "e": {
          editor.setCurrentTool("eraser");
          break;
        }
        case "x":
        case "s": {
          exportAs(
            editor,
            shapes.map((s) => s.id),
            "png",
            { background: editor.getInstanceState().exportBackground }
          );
          break;
        }
        case "b":
        case "d": {
          editor.setCurrentTool("draw");
          break;
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className="custom-layout">
      <div className="custom-toolbar">
        <button
          className="custom-button"
          data-isactive={editor.getCurrentToolId() === "select"}
          onClick={() => editor.setCurrentTool("select")}
        >
          Select
        </button>
        <button
          className="custom-button"
          data-isactive={editor.getCurrentToolId() === "draw"}
          onClick={() => editor.setCurrentTool("draw")}
        >
          Pencil
        </button>
        <button
          className="custom-button"
          data-isactive={editor.getCurrentToolId() === "eraser"}
          onClick={() => editor.setCurrentTool("eraser")}
        >
          Eraser
        </button>
        <button
          className="custom-button save-button"
          // data-isactive={editor.getCurrentToolId() === 'eraser'}
          onClick={() =>
            exportAs(
              editor,
              shapes.map((s) => s.id),
              "png",
              { background: editor.getInstanceState().exportBackground }
            )
          }
        >
          Save
        </button>
      </div>
    </div>
  );
});

export default DrawUI;
