import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  url: z.string(),
  tags: z.array(z.string()).optional(),
});

export const InternSchema = z.object({
  name: z.string(),
  title: z.string(),
  image: z.string(),
  url: z.string(),
  university: z.string().optional(),
  major: z.string(),
});

export const ButtonPropsSchema = z.object({
  variant: z
    .enum([
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "outline",
      "ghost",
    ])
    .optional(),
  size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional(),
  disabled: z.boolean().optional(),
  loading: z.boolean().optional(),
  fullWidth: z.boolean().optional(),
  type: z.enum(["button", "submit", "reset"]).optional(),
  href: z.string().optional(),
  target: z.string().optional(),
  icon: z.string().optional(),
  iconPosition: z.enum(["left", "right", "top"]).optional(),
  surface: z.enum(["flat", "glass", "elevated", "gradient", "mesh"]).optional(),
  motionProfile: z
    .enum(["none", "minimal", "respectful", "expressive", "playful"])
    .optional(),
  hapticFeedback: z.boolean().optional(),
  shortcut: z.string().optional(),
  intent: z.string().optional(),
  class: z.string().optional(),
});

export type ButtonProps = z.infer<typeof ButtonPropsSchema>;

export function validateButtonProps(props: unknown): ButtonProps {
  return ButtonPropsSchema.parse(props);
}

export const TestimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  avatar: z.string().optional(),
});

export const TestimonialsPropsSchema = z.object({
  testimonials: z.array(TestimonialSchema),
});

export type TestimonialsProps = z.infer<typeof TestimonialsPropsSchema>;

export function validateTestimonialsProps(props: unknown): TestimonialsProps {
  return TestimonialsPropsSchema.parse(props);
}
