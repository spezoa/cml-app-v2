'use client';

import * as React from 'react';
import { Card } from './card';

export type TileProps = React.ComponentProps<typeof Card>;

/** Wrapper retrocompatible: Tile = Card con mismas props */
export default function Tile(props: TileProps) {
  return <Card {...props} />;
}