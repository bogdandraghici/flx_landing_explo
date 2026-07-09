'use client';
import { useEffect } from 'react';
import { initFlowxCode } from '@/lib/v1/flowxCode';

export default function FlowxCodeInit() {
  useEffect(() => {
    initFlowxCode();
  }, []);
  return null;
}
