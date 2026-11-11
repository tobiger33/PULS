import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { pulsEnglish } from './localization';

/** Localise the same reference strings before paint, without DOM mutation. */
export function localizeTree(node: ReactNode, path = 'puls'): ReactNode {
  if (typeof node === 'string') return pulsEnglish(node);
  if (Array.isArray(node)) {
    // The reference emitted a single text node for adjacent interpolations.
    // Keep that boundary so kerning and localisation stay pixel-consistent.
    const children: ReactNode[] = [];
    let text = '';
    const flush = () => {
      if (text) children.push(pulsEnglish(text));
      text = '';
    };
    node.forEach((child, index) => {
      if (typeof child === 'string' || typeof child === 'number') text += String(child);
      else {
        flush();
        children.push(localizeTree(child, `${path}.${index}`));
      }
    });
    flush();
    return children;
  }
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  const props: Record<string, unknown> = { key: element.key ?? path };
  for (const name of ['aria-label', 'title', 'placeholder']) {
    if (typeof element.props[name] === 'string') props[name] = pulsEnglish(element.props[name]);
  }
  if ('children' in element.props)
    props.children = localizeTree(element.props.children as ReactNode, `${path}.children`);
  return cloneElement(element, props);
}
