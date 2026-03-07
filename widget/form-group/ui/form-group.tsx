import { FormGroupProps } from "../props/form-group.props";

export const FormGroup = ({ title, children }: FormGroupProps) => {
    return (
        <div>
            <p className="text-black text-[24px] leading-none mb-4">{title}</p>

            <div className="grid grid-cols-2 gap-2">{children}</div>
        </div>
    );
};
