"use client"

import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "Как заказать услугу по выгулу собак?",
    answer: "Вам нужно открыть приложение и зарегистрироваться. Затем вы можете создать запрос, указать адрес, а также дополнительные пожелания. После этого вы сможете видеть доступных исполнителей и выбрать того, кто вам больше подходит.",
  },
  {
    question: "Как оплатить заказ?",
    answer: "Вы можете оплатить заказ при встрече с исполнителем по окончанию оказания услуги.",
  },
  {
    question: "Что делать, если я не доволен результатом работы?",
    answer:
      "Если вы не довольны результатом работы, вы можете обратиться в нашу службу поддержки по электронной почте или чату. Мы рассмотрим вашу жалобу и постараемся решить проблему.",
  },
];

export default Faq;