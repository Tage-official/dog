import dynamic from "next/dynamic";

const VerificationForm = dynamic(
  () => import('@/app/verification/components/VerificationForm'),
  { 
    ssr: false,
  }
);

const NewVerPage = async () => {
  return (
    <VerificationForm />
  )
}

export default NewVerPage