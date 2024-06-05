import Image from "next/image";
import React from "react";
import Container from "./container";

const Testimonials  = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              Я очень довольна сервисом. Заказала выгул перед своим
              уездом и была <Mark>приятно удивлена</Mark>
            </p>

            <Avatar
              image="/user1.jpg"
              name="Анастасия"
              title="Минск, Беларусь"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              Я рекомендую всем, кто нуждается в услугах с выгулом своего питомца.
              Я уже несколько раз пользовался их приложением и
              <Mark>всегда</Mark> оставался доволен результатом.
            </p>

            <Avatar
              image="/user2.jpg"
              name="Эндрю"
              title="Гродно, Беларусь"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              <Mark>Лучшее приложение</Mark> для заказа услуг по выгулу собак.
              Я часто путешествую по работе и не всегда успеваю
              заниматься домашними делами. С помощью приложения я могу
              могу быть уверен что с моим пёсиком всё хорошо
            </p>

            <Avatar
              image="/user3.jpg"
              name="Владимир"
              title="Брест, Беларусь"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

function Avatar(props) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
}

export default Testimonials;