import ProjectListings from "../components/ProjectListings";
import Seo from "../components/Seo";
const ProjectsPage = () => {
  return (
    <>
      <Seo
        title="Projects | Rabina Pradhan"
        description="Explore web development projects built with React, JavaScript, Node.js, and modern web technologies."
      />
      <main className="pt-16">
        <ProjectListings />
      </main>
    </>
  );
};

export default ProjectsPage;
