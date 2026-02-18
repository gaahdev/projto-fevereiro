import React, { useState } from 'react';

const defaultHtml = `<h1>Olá, React!</h1>
<p>Este é seu preview HTML.</p>`;

const defaultCss = `body { font-family: Arial, sans-serif; color: #ffffff; background-color: #121212;} 
h1 { color: #ffffff; }`;

const defaultJs = `console.log('Bem-vindo ao Mini IDE!');`;

const styles = {
  container: {
    borderRadius: '30px',
    width: '100%',  
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    height: '100%',
    padding: '20px',
    background: "linear-gradient(135deg, #4b0082, #000000)",
    color: '#e0e0e0',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  editors: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  editorSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  editorTitle: {
    fontSize: '30px',
    marginLeft: '300px',
    marginBottom: '6px',
    fontWeight: '600',
    color: 'withe',
  },
  textarea: {
    border: 'none',
    width: '100%',
    height: '150px',
    borderRadius: '30px',
    // eslint-disable-next-line no-dupe-keys
    border: 'none',
    background: "linear-gradient(135deg, #4b0082, #000000)",
    color: '#e0e0e0',
    fontFamily: "'Fira Code', monospace",
    fontSize: '14px',
    padding: '12px',
    resize: 'vertical',
    outline: 'none',
    boxShadow: 'inset 0 0 5px #241371',
    transition: 'border-color 0.2s ease',
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  previewTitle: {
    fontSize: '30px',
    marginLeft: '300px',
    marginBottom: '6px',
    fontWeight: '600',
    color: "white",
  },
  iframe: {
    marginLeft: '20px',
    flexGrow: 1,
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#ffffff',
    height: '100%',
  },
};

function CodeEditor({ language, code, onChange }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <textarea
      value={code}
      onChange={e => onChange(e.target.value)}
      placeholder={`Digite seu código ${language} aqui`}
      style={{
        ...styles.textarea,
        borderColor: isFocused ? '#00ffff' : '#333',
        boxShadow: isFocused ? 'inset 0 0 8px #00ffff' : 'inset 0 0 5px #00ffff',
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

function Preview({ html, css, js }) {
  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="preview"
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-same-origin"
      style={styles.iframe}
    />
  );
}

export default function App() {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);

  return (
    <div style={styles.container}>
      <div style={styles.editors}>
        <div style={styles.editorSection}>
          <h3 style={styles.editorTitle}>HTML</h3>
          <CodeEditor language="HTML" code={html} onChange={setHtml} />
        </div>
        <div style={styles.editorSection}>
          <h3 style={styles.editorTitle}>CSS</h3>
          <CodeEditor language="CSS" code={css} onChange={setCss} />
        </div>
        <div style={styles.editorSection}>
          <h3 style={styles.editorTitle}>JavaScript</h3>
          <CodeEditor language="JS" code={js} onChange={setJs} />
        </div>
      </div>
      <div style={styles.previewContainer}>
        <h3 style={styles.previewTitle}>Preview</h3>
        <Preview html={html} css={css} js={js} />
      </div>
    </div>
  );
}