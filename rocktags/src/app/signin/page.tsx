// app/signin/page.tsx
import { SignInForm } from "@/components/signin-form";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#4E2A17] flex items-center justify-center p-4">
      <SignInForm />
    </div>
  );
}