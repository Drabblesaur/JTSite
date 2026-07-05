import React, { useRef, useState } from 'react';

/**
 * A user-fillable image placeholder. Drag an image file onto it (or click to
 * browse) and it shows that image for the session. Swap this out for real
 * <img> tags once you have final photos.
 *
 * Props: placeholder (caption), radius (px), style (extra CSS on the wrapper).
 */
export default function PhotoSlot({ placeholder = 'Drop an image', radius = 12, style }) {
  const [url, setUrl] = useState(null);
  const inputRef = useRef(null);

  const setFile = (file) => {
    if (file && file.type.startsWith('image/')) setUrl(URL.createObjectURL(file));
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files[0]); }}
      onClick={() => inputRef.current && inputRef.current.click()}
      style={{ display: 'block', cursor: 'pointer', overflow: 'hidden', borderRadius: radius, ...style }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: 'none' }}
      />
      {url ? (
        <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div
          style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'repeating-linear-gradient(45deg,#f0ece1 0 10px,#f6f3ea 10px 20px)',
            fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#b0a996', textAlign: 'center', padding: 8, boxSizing: 'border-box',
          }}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}
