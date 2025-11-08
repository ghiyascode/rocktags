// app/signin/page.tsx
import { SignInForm } from "@/app/components/components_landing_page/signin-form";

export default function SignInPage() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <SignInForm />
    </div>
  );
}