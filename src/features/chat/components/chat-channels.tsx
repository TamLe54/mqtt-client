import { Select } from 'antd'

export const ChatChannels = () => {
  return (
    <div className='h-full px-9 py-5 flex flex-col items-center gap-2'>
      <Select
        allowClear
        className='w-full'
        showSearch
        onSearch={(v: string) => {
          console.log(v)
        }}
      />
    </div>
  )
}
