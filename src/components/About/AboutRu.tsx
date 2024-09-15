import { FC } from "react";

const AboutRu: FC = () => {
  return (
    <article
      data-testid="about-ru"
      className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg"
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">
          Getman: Инструмент для работы с API
        </h1>
        <p className="text-lg text-gray-700">
          Getman — это продвинутый инструмент для работы с GraphQL и REST API,
          который объединяет в себе функциональность GraphiQL и Postman.
          Приложение позволяет легко тестировать запросы, отслеживать историю, и
          работать с API в интуитивно понятном интерфейсе. Getman идеально
          подходит для разработчиков, которым нужен быстрый и легкий инструмент
          для взаимодействия с API.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Используемые технологии
        </h2>
        <p className="text-lg text-gray-700">
          Getman создан с использованием современных технологий, таких как
          TypeScript для строгой типизации, React для построения интерфейса и
          Redux для управления состоянием приложения. Валидация данных
          осуществляется с помощью Yup, а Jest и @testing-library обеспечивают
          надежное тестирование. Приложение построено на Next.js для оптимизации
          и серверного рендеринга, а развертывание производится через Vercel.
          Статические данные хранятся в LocalStorage API, а Firebase
          используется для управления аутентификацией. Визуальная часть
          оформлена с использованием Tailwind CSS, что обеспечивает современный
          и адаптивный дизайн.
        </p>
      </section>

      <details>
        <summary className="cursor-pointer p-2 pl-0">more...</summary>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
            Работа с GraphQL
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-700">
            <li>Выполнение запросов и мутаций.</li>
            <li>
              Автоматическая подсказка запросов благодаря встроенному GraphQL
              Schema Introspection.
            </li>
            <li>
              Возможность выполнения сложных запросов с аргументами и
              переменными.
            </li>
            <li>Поддержка фрагментов и директив.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
            Работа с REST API
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-700">
            <li>
              Поддержка всех основных HTTP методов (GET, POST, PUT, DELETE и
              др.).
            </li>
            <li>
              Ввод и настройка параметров запроса, заголовков и тела запроса.
            </li>
            <li>Поддержка различных типов данных (JSON, XML, и др.).</li>
            <li>
              Работа с разными схемами авторизации, включая Bearer Token и Basic
              Auth.
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
            История запросов (History)
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-700">
            <li>Автоматическое сохранение истории запросов.</li>
            <li>
              Возможность быстро повторить или редактировать предыдущие запросы.
            </li>
            <li>
              Сохранение запросов в избранное для удобного доступа в будущем.
            </li>
            <li>
              Фильтрация истории запросов по дате или типу API (REST/GraphQL).
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Команда разработчиков
          </h2>

          <p className="text-lg text-gray-700 mb-6">
            Проект Getman был создан благодаря усилиям талантливых
            разработчиков:
          </p>

          <section className="mb-4">
            <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
              Aliaksandr Naumavets
            </h3>
            <p className="text-lg text-gray-700">
              Опытный QA-инженер, работающий в компании, разрабатывающей
              электронные медицинские карты. Стремится расширить свои знания в
              IT через RS School, совмещая удалённую работу и учёбу.
            </p>
          </section>

          <section className="mb-4">
            <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
              Dmitrii Barilkin
            </h3>
            <p className="text-lg text-gray-700">
              Будущий front-end разработчик с опытом работы инженером в
              конструкторском бюро. Работал над радиоэлектронной аппаратурой для
              различных проектов, включая АЭС. Активно осваивает веб-разработку.
            </p>
          </section>

          <section className="mb-4">
            <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
              <a
                href="https://www.linkedin.com/in/maria-kulikova"
                className="underline text-neutral-800 hover:text-neutral-800"
              >
                Maria Kulikova
              </a>
            </h3>
            <p className="text-lg text-gray-700">
              Опытный front-end разработчик (JS/TS/React.js/Next.js), с
              успешными проектами в e-commerce и fintech. Специализируется на
              разработке современных веб-приложений и бизнес-решений.
            </p>
          </section>
        </section>
        <div className="info">
          <h2
            className="_widget-title_1q6pu_2 _medium_1q6pu_18 _asterisk_1q6pu_48"
            data-testid="widget-title"
          >
            О RS School
          </h2>
          <p
            className="_paragraph_vtk71_1 _large-font-size_vtk71_11"
            data-testid="paragraph"
          >
            Неважно, сколько вам лет, где вы работаете или где живёте.
          </p>
          <p
            className="_paragraph_vtk71_1 _medium-font-size_vtk71_6"
            data-testid="paragraph"
          >
            RS School предлагает уникальный образовательный опыт в формате
            бесплатного, основанного на сообществе онлайн-обучения. RS School
            проводится сообществом Rolling Scopes с 2013 года. Сегодня более 600
            разработчиков-добровольцев из разных стран и компаний помогают в
            качестве наставников. Мы верим в важные идеи, которые определяют
            нашу миссию.
          </p>
        </div>
      </details>
    </article>
  );
};

export default AboutRu;
