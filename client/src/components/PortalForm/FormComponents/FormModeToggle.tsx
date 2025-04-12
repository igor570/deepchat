import { Mode } from '../../../lib/types/mode'

interface FormModeToggleProps {
    mode: Mode
    setMode: (mode: Mode) => void
}

export const FormModeToggle = ({ mode, setMode }: FormModeToggleProps) => {
    return (
        <div className="mode-toggle">
            <div
                className={`mode-toggle-text ${
                    mode === 'login' ? 'toggle-selected' : ''
                }`}
                onClick={() => setMode('login')}
            >
                Login
            </div>
            <div
                className={`mode-toggle-text ${
                    mode === 'signup' ? 'toggle-selected' : ''
                }`}
                onClick={() => setMode('signup')}
            >
                Sign Up
            </div>
        </div>
    )
}
