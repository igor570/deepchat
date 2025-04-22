import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormFields, schema } from '../../lib/schema/formFields.ts'
import { Mode } from '../../lib/types/mode.ts'
import { useSignIn, useSignUp } from '../../lib/hooks/auth.ts'
import { omit } from 'lodash-es'
import { useNavigate } from 'react-router-dom'

import {
    FormModeToggle,
    FormHeader,
    FormInput,
    FormSubmitButton,
} from './FormComponents'

import './PortalForm.scss'
import { useAppStore } from '../../lib/store/useAppStore.ts'

export const PortalForm = () => {
    const setUserId = useAppStore((s) => s.setUserId)
    const signup = useSignUp()
    const signin = useSignIn()
    const navigate = useNavigate()
    const [mode, setMode] = useState<Mode>('login')

    //Form State
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({ resolver: zodResolver(schema) })

    //Submit Handler
    const onSubmit = (data: FormFields) => {
        if (mode === 'login') {
            signin.mutate(omit(data, 'confirmPassword'), {
                onSuccess: () => {
                    if (signin.data) setUserId(signin.data.userId)
                    navigate('/chat')
                },
            })
        } else {
            signup.mutate({ ...omit(data, 'confirmPassword') })
        }
        reset()
    }

    return (
        <div className="form-container">
            {/* Mode Toggle */}
            <FormModeToggle mode={mode} setMode={setMode} />

            {/* Form */}
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <FormHeader mode={mode} />
                <div className="input-container">
                    <FormInput
                        register={register}
                        errors={errors}
                        registerName="username"
                        label="Username"
                        id="username"
                        type="text"
                        placeholder="jimbob123"
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        registerName="password"
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    {mode === 'signup' && (
                        <FormInput
                            register={register}
                            errors={errors}
                            registerName="confirmPassword"
                            label="Confirm Password"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                        />
                    )}
                    <FormSubmitButton mode={mode} isSubmitting={isSubmitting} />
                </div>
            </form>
        </div>
    )
}
