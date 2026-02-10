export type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'white';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon: React.ReactNode;
    iconPosition?: 'left' | 'right';
    size?: 'small' | 'medium' | 'large';
    variant?: ButtonVariant;
}