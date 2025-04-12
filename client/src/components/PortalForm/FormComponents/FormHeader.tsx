import { Mode } from '../../../lib/types/mode'

type FormHeaderProps = {
    mode: Mode
}

export const FormHeader = ({ mode }: FormHeaderProps) => {
    return (
        <>
            <div className="login-text">
                {mode === 'login' ? 'Login' : 'Sign Up'}
            </div>
            <div className="enter-text">
                {mode === 'login'
                    ? 'Enter your details below to login to your account'
                    : 'Enter your details below to create a new account'}
            </div>
        </>
    )
}
