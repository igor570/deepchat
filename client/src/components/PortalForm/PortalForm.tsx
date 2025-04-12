import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormFields, schema } from '../../lib/schema/formFields.ts'
import { Mode } from '../../lib/types/mode.ts'
import { useSignIn, useSignUp } from '../../lib/hooks/auth.ts'
import { omit } from 'lodash-es'

import {
    FormModeToggle,
    FormHeader,
    FormInput,
    FormSubmitButton,
    FormFooter,
} from './FormComponents'

import './PortalForm.scss'

import './PortalForm.scss'

export const PortalForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({ resolver: zodResolver(schema) })

    const [mode, setMode] = useState<Mode>('login')

    // const signup = useSignUp()
    // const signin = useSignIn()

    const onSubmit = (data: FormFields) => {
        console.log('Form Submitted:', data)
        // if (mode === 'login') signin.mutate(data)
        // else signup.mutate({ ...omit(data, 'confirmPassword') })
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
                    {mode === 'signup' && (
                        <FormInput
                            register={register}
                            errors={errors}
                            registerName="name"
                            label="Name"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                        />
                    )}
                    <FormInput
                        register={register}
                        errors={errors}
                        registerName="email"
                        label="Email"
                        id="email"
                        type="text"
                        placeholder="m@example.com"
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
                    <div className="continue-text">OR CONTINUE WITH</div>
                    <FormFooter />
                </div>
            </form>
        </div>
    )
}
