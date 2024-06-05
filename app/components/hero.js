import Image from "next/image";
import Link from "next/link";
import Container from "./container";

const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Удобный и надежный сервис для заказа услуг по выгулу собак.
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              С нашим приложением вы можете легко и быстро выбрать
              подходящего специалиста, ознакомиться с его рейтингом,
              согласовать цену и время выполнения.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link
                href="/issues/list"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                Начать
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src="/hero.png"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Доверяют более <span className="text-indigo-600">2000</span>{" "}
            клиентов по всей Беларуси
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <AmazonLogo />
            </div>
            <div className="text-gray-400 dark:text-gray-400">
              <VerizonLogo />
            </div>
            <div className="text-gray-400 dark:text-gray-400">
              <MicrosoftLogo />
            </div>
            <div className="pt-1 text-gray-400 dark:text-gray-400">
              <NetflixLogo />
            </div>
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <SonyLogo />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function AmazonLogo() {
  return (
    <Image src="logo.svg" height="60" width="60" alt="BNTO logo" />
  );
}

function MicrosoftLogo() {
  return (
    <Image src="/logo.svg" height="60" width="60" alt="BNTO logo" />
  );
}

function NetflixLogo() {
  return (
    <Image src="/logo.svg" height="60" width="60" alt="BNTO logo" />
  );
}

function SonyLogo() {
  return (
    <Image src="logo.svg" height="60" width="60" alt="BNTO logo" />
  );
}

function VerizonLogo() {
  return (
    <Image src="logo.svg" height="60" width="60" alt="BNTO logo" />
  );
}

export default Hero;