import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import { PROJECTS_QUERY } from "../lib/queries";
import Project from "./Project";
import { StarLoader } from "./PageStates";

const ProjectListings = ({ isHome = false }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(PROJECTS_QUERY);
        setProjects(isHome ? data.slice(0, 3) : data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  if (loading) return <StarLoader />;

  if (error) return <p>Error: {error}</p>;

  return (
    <section id="projects" className="scroll-mt-16  py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
            02 · Work
          </p>
          <h2 className="mt-3 font-instrument text-4xl tracking-tight sm:text-5xl">
            Selected Projects
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <Project key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectListings;
