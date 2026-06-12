import { useState } from 'react';
import './CopyButton.css';

/**
 * Button that copies a string to the clipboard and briefly shows feedback.
 * Falls back gracefully when the Clipboard API is unavailable.
 * @param {object} props
 * @param {string} props.value - the text to copy
 * @param {string} [props.label] - accessible label / default content
 * @param {React.ReactNode} [props.children] - custom trigger content
 */
export default function CopyButton({ value, label = 'Copy', children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      /* clipboard unavailable (insecure context, denied permission, …) */
    }
  };

  return (
    <button
      type="button"
      className="copy-button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : label}
    >
      {children || (copied ? '✓ Copied' : '⧉ Copy')}
    </button>
  );
}
