import React, { FC, memo } from 'react'

interface HealthCardItemProps {
  name: string
  value: string
}

const HealthCardItem: FC<HealthCardItemProps> = ({ name, value }) => {
  return (
    <div className='flex w-full flex-row items-center justify-start space-x-4 px-6 py-4 text-left text-sm odd:bg-gray-50 even:bg-white'>
      <div className='flex-1 font-mono text-gray-500'>{name}</div>

      <div className='flex-1 basis-1/3 break-all font-mono font-medium text-gray-900'>{value}</div>
    </div>
  )
}

export default memo(HealthCardItem)
