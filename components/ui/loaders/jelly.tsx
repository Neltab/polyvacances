"use client";
// import { jelly } from 'ldrs';
import React, { useEffect } from 'react';
import { LoaderProps } from './types';

export default function Jelly({
  color = "white",
  size = "16",
  speed,
}: LoaderProps) {
  useEffect(() => {
    async function getLoader() {
      const { jelly } = await import('ldrs')
      jelly.register()
    }
    getLoader()
  }, [])
  return <l-jelly color={color} size={size} speed={speed} />
}