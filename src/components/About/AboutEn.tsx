import { FC } from "react";

const AboutEn: FC = () => {
  return (
    <article
      data-testid="about-en"
      className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg"
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">
          Getman: A Tool for Working with APIs
        </h1>
        <p className="text-lg text-gray-700">
          Getman is an advanced tool for working with GraphQL and REST APIs,
          combining the functionality of GraphiQL and Postman. The application
          allows for easy request testing, tracking history, and working with
          APIs in an intuitive interface. Getman is ideal for developers who
          need a fast and simple tool for interacting with APIs.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Technologies Used
        </h2>
        <p className="text-lg text-gray-700">
          Getman is built using modern technologies such as TypeScript for
          strong typing, React for UI construction, and Redux for application
          state management. Data validation is handled by Yup, while Jest and
          @testing-library ensure reliable testing. The application is powered
          by Next.js for optimization and server-side rendering, with deployment
          handled by Vercel. Static data is stored in LocalStorage API, and
          Firebase is used for authentication management. The UI is styled using
          Tailwind CSS, providing a modern and responsive design.
        </p>
      </section>

      <details>
        <summary className="cursor-pointer p-2 pl-0">more...</summary>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Main Features of Getman
        </h2>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
            Working with GraphQL
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-700">
            <li>Executing queries and mutations.</li>
            <li>
              Automatic query suggestions thanks to the built-in GraphQL Schema
              Introspection.
            </li>
            <li>
              Ability to perform complex queries with arguments and variables.
            </li>
            <li>Support for fragments and directives.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
            Working with REST API
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-700">
            <li>
              Support for all major HTTP methods (GET, POST, PUT, DELETE, etc.).
            </li>
            <li>
              Input and configuration of request parameters, headers, and body.
            </li>
            <li>Support for various data types (JSON, XML, etc.).</li>
            <li>
              Works with different authorization schemes, including Bearer Token
              and Basic Auth.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
            Request History (History)
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-700">
            <li>Automatic saving of request history.</li>
            <li>Ability to quickly repeat or edit previous requests.</li>
            <li>Save requests to favorites for easy access later.</li>
            <li>Filter request history by date or API type (REST/GraphQL).</li>
          </ul>
        </section>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Development Team
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          The Getman project was created thanks to the efforts of talented
          developers:
        </p>

        <section className="mb-4">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
            Aliaksandr Naumavets
          </h3>
          <p className="text-lg text-gray-700">
            An experienced QA engineer working at a company that develops
            electronic medical records. He aims to expand his IT knowledge
            through RS School, balancing remote work and study.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
            Dmitrii Barilkin
          </h3>
          <p className="text-lg text-gray-700">
            A future front-end developer with experience as an engineer in a
            design bureau. He worked on radio-electronic equipment for various
            projects, including nuclear power plants. Now he is actively
            mastering web development.
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
            An experienced front-end developer (JS/TS/React.js/Next.js) with
            successful projects in e-commerce and fintech. Specializes in
            developing modern web applications and business solutions.
          </p>
        </section>
        <div className="info">
          <h2
            className="_widget-title_1q6pu_2 _medium_1q6pu_18 _asterisk_1q6pu_48"
            data-testid="widget-title"
          >
            About RS School
          </h2>
          <p
            className="_paragraph_vtk71_1 _large-font-size_vtk71_11"
            data-testid="paragraph"
          >
            No matter your age, professional employment, or place of residence.
          </p>
          <p
            className="_paragraph_vtk71_1 _medium-font-size_vtk71_6"
            data-testid="paragraph"
          >
            RS School offers a unique learning experience as a free,
            community-based online education initiative. The RS School has been
            run by the Rolling Scopes community since 2013. Today, over 600
            developer-volunteers from various countries and companies assist as
            mentors. We believe in important ideas that guide our mission.
          </p>
        </div>
      </details>
    </article>
  );
};

export default AboutEn;
