import React, { useMemo } from 'react';
import katex from 'katex';

interface MathEquationProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const MathEquation: React.FC<MathEquationProps> = ({
  math,
  displayMode = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return math;
    }
  }, [math, displayMode]);

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
