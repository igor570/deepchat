import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormFields } from '../../../lib/schema/formFields'

interface FormInputProps {
    register: UseFormRegister<FormFields>
    errors: FieldErrors<FormFields>
    registerName: RegisterName
    label: string
    id: string
    type: string
    placeholder: string
}

type RegisterName = keyof FormFields

export const FormInput = ({
    register,
    errors,
    label,
    id,
    type,
    placeholder,
    registerName,
}: FormInputProps) => {
    return (
        <div className="input-container">
            <label htmlFor={id} className="input-label">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className="input"
                {...register(registerName)}
            />
            {errors[registerName] && (
                <p className="error-text">{errors[registerName]?.message}</p>
            )}
        </div>
    )
}
