import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 
   font-semibold tracking-wide transition-all duration-150
   focus-visible:outline-none focus-visible:ring-2 
   focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900
   disabled:opacity-40 disabled:pointer-events-none
   active:scale-[0.98]`,
  {
    variants: {
      variant: {
        primary: `
          bg-indimba-red-500 text-white 
          hover:bg-indimba-red-700 
          focus-visible:ring-indimba-red-500
          shadow-[0_4px_24px_rgba(200,16,46,0.3)]
        `,
        secondary: `
          bg-transparent text-white border border-white/10
          hover:bg-white/5 hover:border-white/20
          focus-visible:ring-white/30
        `,
        gold: `
          bg-indimba-gold-500 text-black font-bold
          hover:bg-indimba-gold-700
          focus-visible:ring-indimba-gold-500
          shadow-[0_4px_24px_rgba(255,215,0,0.2)]
        `,
        ghost: `
          bg-transparent text-surface-200
          hover:bg-white/5 hover:text-white
          focus-visible:ring-white/20
        `,
        danger: `
          bg-red-600 text-white
          hover:bg-red-700
          focus-visible:ring-red-600
        `,
        sports: `bg-blue-700 text-white hover:bg-blue-900`,
        music:  `bg-purple-700 text-white hover:bg-purple-900`,
        events: `bg-teal-700 text-white hover:bg-teal-900`,
      },
      size: {
        xs: 'h-7 px-3 text-xs rounded-md',
        sm: 'h-8 px-4 text-sm rounded-md',
        md: 'h-10 px-5 text-sm rounded-md',
        lg: 'h-12 px-6 text-base rounded-lg',
        xl: 'h-14 px-8 text-lg rounded-lg',
        icon: 'h-10 w-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({ 
  variant, size, loading, leftIcon, rightIcon, 
  children, className, disabled, ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
