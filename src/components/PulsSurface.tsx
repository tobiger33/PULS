'use dom';

import { useEffect, useReducer, useState } from 'react';
import type { DOMProps } from 'expo/dom';
import { createPulsApp } from '../application/createPulsApp';
import '../styles/reference.css';

export default function PulsSurface({ native = false }: { native?: boolean; dom?: DOMProps }) {
  const [, refresh] = useReducer((value: number) => value + 1, 0);
  const [app] = useState(() => createPulsApp(refresh));
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') app.back();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      app.dispose();
    };
  }, [app]);
  return <div className={native ? 'puls-native' : 'puls-web'}>{app.view()}</div>;
}
