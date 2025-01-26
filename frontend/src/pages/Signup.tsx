import { Quote, SignupAuth } from "../components/export.ts"
export const Signup = () => {
    return (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
            <SignupAuth {...{type: "signup"}} />
            </div>
            <div className="hidden lg:block">
            <Quote />
            </div>
        </div>
        </>
    )
}