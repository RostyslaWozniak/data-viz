/** @format */
import { SignUpForm } from "../../components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};
export default function Page() {
  return <SignUpForm />;
}
