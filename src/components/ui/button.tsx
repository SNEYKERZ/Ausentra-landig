import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-brand-600 text-white shadow-[0_1px_2px_oklch(0.3_0.1_274/0.25),inset_0_1px_0_oklch(1_0_0/0.15)] hover:bg-brand-700",
        destructive: "bg-no text-white hover:bg-no/90",
        outline:
          "bg-white text-ink ring-1 ring-inset ring-line hover:bg-paper hover:ring-brand-200",
        secondary: "bg-paper text-ink hover:bg-brand-50",
        ghost: "text-ink-soft hover:bg-paper hover:text-ink",
        link: "text-brand-700 underline-offset-4 hover:underline",
        inverse: "bg-white text-brand-900 hover:bg-brand-50",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 px-6 text-[0.9375rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
