import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import UAParser, { IResult } from 'ua-parser-js'
import { useIsomorphicLayoutEffect, useScreen, useWindowSize } from 'usehooks-ts'

import { apiBaseUrl, appBuildSignature, appName, appVersion } from '@/config/env'
import clsxm from '@/utils/clsxm'

import HealthCardItem from './HealthCardItem'

type Data = {
  key: string
  value: string
}

const HealthCard = () => {
  const [apiLoaded, setApiLoaded] = useState(false)
  const [apiStatus, setApiStatus] = useState('Checking...')
  const [userAgent, setUserAgent] = useState<IResult | undefined>()
  const [data, setData] = useState<Data[]>([])
  const [copyText, setCopyText] = useState('Checking...')
  const [copied, setCopied] = useState(false)
  const viewport = useWindowSize()
  const screen = useScreen()

  useIsomorphicLayoutEffect(() => {
    fetch(apiBaseUrl)
      .then((response) => response.json())
      .then((response) => {
        setApiStatus(`Connected (v${response.data.appVersion})`)

        setApiLoaded(true)
      })
      .catch(() => {
        setApiStatus('Error')

        setApiLoaded(true)
      })

    const ua = new UAParser()

    setUserAgent(ua.getResult())
  }, [])

  useEffect(() => {
    if (apiLoaded) {
      const data = [
        {
          key: 'App Name',
          value: appName,
        },
        {
          key: 'App Version',
          value: appVersion,
        },
        {
          key: 'App Build Signature',
          value: appBuildSignature,
        },
        {
          key: 'API Status',
          value: apiStatus,
        },
        {
          key: 'Viewport',
          value: `${viewport.width} x ${viewport.height}`,
        },
        {
          key: 'Screen Size',
          value: `${screen?.width} x ${screen?.height}`,
        },
        {
          key: 'Browser',
          value: `${userAgent?.browser?.name} (${userAgent?.browser?.version})`,
        },
        {
          key: 'Operating System',
          value: `${userAgent?.os?.name} (${userAgent?.os?.version})`,
        },
      ]

      setData(data)

      setCopyText(data.map((d) => `${d.key}: ${d.value}`).join('\n'))
    }
  }, [apiLoaded, viewport.width, viewport.height, screen?.width, screen?.height])

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  return (
    <main className='flex h-full min-h-screen items-start justify-center bg-gray-100 sm:items-center'>
      <section className='w-screen max-w-screen-sm overflow-hidden rounded-lg bg-white shadow sm:m-auto'>
        <div className='flex place-content-between px-6 py-5'>
          <div className=''>
            <h3 className='font-mono text-lg font-medium leading-6 text-gray-900'>Health Check</h3>

            <p className='mt-1 font-mono text-sm text-gray-500'>App & Browser Information</p>
          </div>

          <CopyToClipboard
            text={copyText}
            onCopy={() => setCopied(true)}
          >
            <div className='my-auto flex cursor-pointer flex-col items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-8 w-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75'
                />
              </svg>

              <span className={clsxm('font-mono text-xs', !copied && 'invisible')}>Copied</span>
            </div>
          </CopyToClipboard>
        </div>

        <div className='flex flex-col items-center justify-center border-t border-gray-200 text-center'>
          {data.map((d, idx) => (
            <HealthCardItem
              key={idx}
              name={d.key}
              value={d.value}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default HealthCard
