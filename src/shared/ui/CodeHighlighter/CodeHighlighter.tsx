import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
import styles from './CodeHighlighter.module.scss';

SyntaxHighlighter.registerLanguage('javascript', js);

interface Props {
  children: string;
}

export const CodeHighlighter = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <SyntaxHighlighter
        language="javascript"
        style={docco}
        customStyle={{ background: '#ffffff', borderRadius: 6, paddingTop: 6, paddingBottom: 6, margin: 6 }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
