import { FormGroup } from "@/widget/form-group";
import { CheckoutFormProps } from "../props/checkout-form.props";
import { Input } from "@/shared/ui";

export const CheckoutForm = ({
    productTotal: _productTotal,
}: CheckoutFormProps) => {
    return (
        <form>
            <FormGroup title="Contact">
                <Input placeholder="First name" />

                <Input placeholder="Last name" />

                <Input placeholder="Email" />

                <Input placeholder="Phone" />
            </FormGroup>
        </form>
    );
};
