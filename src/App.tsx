import { useState } from "react";
import styles from "./App.module.css";
import { CompositeDecorator, ContentState, convertToRaw, DraftDecorator, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import RichEditorExample from "./RichEditorExample";

function App() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorators));

  const [showingDataStructure, setShowingDataStructure] = useState<
    "Raw" | "EditorState" | "ContentState"
  >("Raw");

  return (
    <div className={styles.container}>
      <div>
        <RichEditorExample editorState={editorState} onChange={setEditorState} />
      </div>
      <div className={styles.data}>
        <div>
          <button onClick={() => setShowingDataStructure("Raw")}>raw</button>
          <button onClick={() => setShowingDataStructure("EditorState")}>
            EditorState
          </button>
          <button onClick={() => setShowingDataStructure("ContentState")}>
            ContentState
          </button>
        </div>
        <pre className={styles.json}>
          {showingDataStructure === "Raw"
            ? JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)
            : showingDataStructure === "EditorState"
            ? JSON.stringify(editorState, null, 2)
            : showingDataStructure === "ContentState"
            ? JSON.stringify(editorState.getCurrentContent(), null, 2)
            : undefined}
        </pre>
      </div>
    </div>
  );
}

export default App;


type DecoratorComponentProps = {
  blockKey: string;
  contentState: ContentState;
  decoratedText: string;
  dir?: "ltr" | "rtl";
  end: number;
  entityKey?: string;
  offsetKey: string;
  start: number;
};
const LinkEntityComponent: React.FC<DecoratorComponentProps> = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey ?? "").getData();
  return (
    <a href={url} style={{ color: "#3b5998", textDecoration: "underline" }}>
      {props.children}
    </a>
  );
};

const linkStrategy: DraftDecorator["strategy"] = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
  }, callback);
};

const decorators = new CompositeDecorator([
  {
    strategy: linkStrategy,
    component: LinkEntityComponent,
  },
]);
