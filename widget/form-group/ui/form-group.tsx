import { FormGroupProps } from "../props/form-group.props";

export const FormGroup = ({ title, children }: FormGroupProps) => {
    return (
        <div>
            <p className="text-black mob:text-[24px] text-[18px] leading-none mob:mb-4 mb-3.5">
                {title}
            </p>

            <div className="grid mob:grid-cols-2 gap-2">{children}</div>
        </div>
    );
};
