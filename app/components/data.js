import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

const benefitOne = {
  title: "Простота использования",
  desc: "Вы можете просто зайти на сайт и начать пользоваться сервисом. Вам не нужно ничего скачивать и устанавливать.",
  image: '/benefit-one.png',
  bullets: [
    {
      title: "Понимай своих пользователей",
      desc: "Мы ценим ваше время и делаем наше приложение быстрым и доступным",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Просто в понимании",
      desc: "Приложение простое и понятное, даже для новичков.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Удержание клиентов",
      desc: "Мы заботимся о наших клиентах и делаем все возможное для их удержания.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Найдите лучшего исполнителя для вашего заказа",
  desc: "Вы можете сравнивать разных специалистов по рейтингу, отзывам, цене и срокам. Выбирайте того, кто подходит вам больше всего и согласовывайте детали заказа в чате.",
  image: '/benefit-two.png',
  bullets: [
    {
      title: "Большой выбор услуг",
      desc: "У нас вы можете заказать выгул, дрессировку, няньку для вашего питомца и многое другое",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Проверенные профессионалы",
      desc: "Все наши исполнители проходят проверку качества, опыта и надежности. Мы следим за их работой и отзывами клиентов.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Гарантия безопасности",
      desc: "Мы защищаем ваши данные, платежи и права. Вы можете отменить заказ или вернуть деньги в случае недовольства результатом.",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
