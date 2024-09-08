"use client";
// import { jelly } from 'ldrs';
import React, { useEffect } from 'react';
import { LoaderProps } from './types';

export default function Quantum({
  color = "white",
  size = "32",
  speed,
}: LoaderProps) {
  useEffect(() => {
    async function getLoader() {
      const { quantum } = await import('ldrs')
      quantum.register()
    }
    getLoader()
  }, [])
  return <l-quantum color={color} size={size} speed={speed} />
}