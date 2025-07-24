"use client";

import {Snowfall} from "@/.react-snowfall/packages/react-snowfall";

export function SnowfallWrapper() {
  return (
    <Snowfall
      snowflakeCount={200}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}
