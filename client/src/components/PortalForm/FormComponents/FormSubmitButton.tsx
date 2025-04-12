import { Mode } from '../../../lib/types/mode'

interface FormSubmitButtonProps {
    isSubmitting: boolean
    mode: Mode
}

export const FormSubmitButton = ({
    mode,
    isSubmitting,
}: FormSubmitButtonProps) => {
    return (
        <button
            type="submit"
            className="sign-in-button"
            disabled={isSubmitting}
        >
            {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
    )
}
