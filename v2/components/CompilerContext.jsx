'use client';
import { createContext, useContext, useState } from 'react';
import { classify } from './blueprint.js';

const DEFAULT_USECASE = 'automate KYC onboarding for retail customers';
const Ctx = createContext(null);

export function CompilerProvider({ children }) {
  // a default blueprint is drafted on load
  const [result, setResult] = useState({ t: classify(DEFAULT_USECASE), input: DEFAULT_USECASE, initial: true });
  const compile = (input) => setResult({ t: classify(input), input, initial: false });
  return <Ctx.Provider value={{ result, compile }}>{children}</Ctx.Provider>;
}

export const useCompiler = () => useContext(Ctx);
