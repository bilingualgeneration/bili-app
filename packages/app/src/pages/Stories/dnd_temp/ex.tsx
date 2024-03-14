import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { Container } from './container'
import { CustomDragLayer } from './customDragLayer'

export const Example: FC = () => {

  return (
    <div>
      <Container  />
      <CustomDragLayer  />
    </div>
  )
}