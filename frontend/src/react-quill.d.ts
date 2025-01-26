declare module 'react-quill' {
    import * as React from 'react';
  
    interface QuillEditorProps {
      value: string;
      onChange: (content: string) => void;
      placeholder?: string;
      style?: React.CSSProperties;
      ref?: React.RefObject<any>;
    }
  
    class QuillEditor extends React.Component<QuillEditorProps> {}
  
    export default QuillEditor;
  }