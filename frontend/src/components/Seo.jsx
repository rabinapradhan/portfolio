import { Helmet } from "react-helmet-async";

const Seo = ({
  title = "Rabina Pradhan | Full-Stack Developer in Nepal",
  description = "Explore Rabina Pradhan's portfolio, web development projects, and services. Specializing in React, JavaScript, Node.js, and full-stack development.",
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="author" content="Rabina Pradhan" />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default Seo;
