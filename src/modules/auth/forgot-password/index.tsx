import { Button, FormInput, Link } from '@nbsdev/naini-react'
// import { useNavigate } from '@tanstack/react-router'
import React, { FC, MouseEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useCountdown } from 'usehooks-ts'

import { useForgotPasswordMutation } from '@/services/auth'
import { AuthForgotPasswordRequestData } from '@/types/auth'
import { BaseResponse, Maybe } from '@/types/common'

const AuthForgotPassword: FC = () => {
  // const navigate = useNavigate()

  const { i18n } = useTranslation()

  const [data, setData] = useState<Maybe<AuthForgotPasswordRequestData>>()
  const [submitted, setSubmitted] = useState(false)
  const [eligibleToResend, setEligibleToResend] = useState(false)

  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
  })

  const {
    register,
    setError,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<AuthForgotPasswordRequestData>({ shouldUseNativeValidation: true })

  const [forgotPassword, { isLoading, isSuccess, isError, reset, error }] = useForgotPasswordMutation()

  const handleSubmit: SubmitHandler<AuthForgotPasswordRequestData> = async (data) => {
    setData(data)

    await forgotPassword({ data }).unwrap()
  }

  const handleResendMail = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (eligibleToResend) {
      stopCountdown()

      setEligibleToResend(false)

      await forgotPassword({ data }).unwrap()
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setSubmitted(true)

      resetCountdown()

      startCountdown()

      setTimeout(() => {
        setEligibleToResend(true)
      }, 60000)

      reset()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      const { data } = error as BaseResponse<null>

      if (data) {
        // TODO: handle error code
        setError('email', {
          message: i18n.t('common:attempt'),
        })
      } else {
        setError('email', {
          message: i18n.t('common:error'),
        })
      }
    }
  }, [isError])

  return (
    <>
      {submitted ? (
        <div className='flex flex-col space-y-6'>
          <hr />

          <div className='flex flex-col items-center space-y-3'>
            <Button
              type='button'
              size='large'
              label={`Resend Mail${count !== 0 ? ` (${count}s)` : ''}`}
              variant='outline'
              className='w-full'
              onClick={handleResendMail}
              disabled={!eligibleToResend}
            />

            <span className='text-xs text-error'>Resend mail 2 more times</span>
          </div>
        </div>
      ) : (
        <form
          noValidate
          className='flex flex-col space-y-6'
          onSubmit={onSubmit(handleSubmit)}
        >
          <div className='flex flex-col space-y-4'>
            <FormInput
              id='email'
              type='email'
              autoComplete='off'
              label={{ text: 'Email' }}
              error={{
                text: errors.email?.message,
              }}
              {...register('email', {
                required: {
                  value: true,
                  message: i18n.t('validation:required'),
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: i18n.t('validation:email'),
                },
              })}
            />
          </div>

          <div className='flex flex-col space-y-6'>
            <Button
              type='submit'
              size='large'
              variant='primary'
              label='Send Mail'
              disabled={isLoading}
            />

            <hr />

            <Link
              href='/auth/login'
              size='large'
              label='Already have an account?'
              variant='outline'
              className='text-center'
            />
          </div>
        </form>
      )}
    </>
  )
}

export default AuthForgotPassword
