import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'

export const FormFooter = () => {
    return (
        <div className="social-login-container">
            <button className="social-login">
                <AiFillGithub size={20} />
                Github
            </button>
            <button className="social-login">
                <AiFillGoogleCircle size={20} />
                Google
            </button>
        </div>
    )
}
