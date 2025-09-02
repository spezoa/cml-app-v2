'use client';
import * as React from 'react';
import { Card } from './card';
export type TileProps = React.ComponentProps<typeof Card>;
export default function Tile(props: TileProps) { return <Card {...props} />; }