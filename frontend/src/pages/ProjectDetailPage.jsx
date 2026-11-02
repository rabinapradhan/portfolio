import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { client } from "../lib/sanity";
import { PROJECT_DETAIL_QUERY } from "../lib/queries";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import ScrollImagePreview from "../components/ScrollImagePreview";
import { StarLoader } from "../components/PageStates";
import Seo from "../components/Seo";

const ProjectDetailPage = () => {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await client.fetch(PROJECT_DETAIL_QUERY, { slug });

        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) return <StarLoader fullPage />;

  if (error) return <p className="p-8">Error: {error}</p>;

  if (!project) {
    return (
      <section className="p-8">
        <h1 className="text-2xl font-semibold">Project not found</h1>

        <Link to="/#projects" className="underline">
          Back to projects
        </Link>
      </section>
    );
  }

  return (
    <>
      <Seo
        title={`${project.title} | Rabina Pradhan`}
        description={
          project.shortDescription ||
          `Explore ${project.title}, a web development project by Rabina Pradhan.`
        }
      />

      <main className="pt-16">
        <article>
          <section className="relative overflow-hidden pb-16 pt-28">
            <div
              className="pointer-events-none absolute inset-0 bg-[#FCF9FD]"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-6xl px-6">
              <Link
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-lavender"
                to="/#projects"
              >
                <FiArrowLeft size={16} />
                All projects
              </Link>

              <div className="mt-10">
                <span className="rounded-full bg-card px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground shadow-sm">
                  {project.status}
                </span>
              </div>

              <h1 className="mt-5 max-w-3xl font-instrument text-5xl leading-[1.05] tracking-tight sm:text-6xl">
                {project.title}
              </h1>

              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                {project.shortDescription}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm hover:bg-lavender hover:text-card-foreground transition-colors"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-8 gap-5 rounded-full border inline-block border-border bg-lavender p-2.5 transition-colors hover:bg-secondary">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-lavender"
                  >
                    <FiGithub size={16} />
                    GitHub
                  </a>
                )}

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-lavender"
                  >
                    Live demo
                    <FiArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </section>

          <section className="pb-20">
            <div className="mx-auto max-w-5xl px-6">
              <div
                className="mx-auto max-w-4xl overflow-hidden rounded-3xl border p-4 sm:p-6"
                style={{ backgroundColor: project.cardColor || "#e2e0fa" }}
              >
                <div className="overflow-hidden rounded-2xl border bg-card/80 shadow-sm">
                  {project.thumbnailUrl ? (
                    <ScrollImagePreview
                      src={project.thumbnailUrl}
                      alt={`${project.title} thumbnail`}
                    />
                  ) : (
                    <div className="flex aspect-video items-center justify-center">
                      No thumbnail available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {project.overview && (
            <section className="border-t border-border py-20">
              <div className="mx-auto  max-w-6xl px-6">
                <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
                  Overview
                </p>

                <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                  {project.overview}
                </p>
              </div>
            </section>
          )}

          {/* Project gallery */}
          {project.galleryUrls?.length > 0 && (
            <section className="border-t border-border py-20">
              <div className="mx-auto max-w-6xl px-6">
                <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
                  Visuals
                </p>

                <h2 className="mt-3 font-instrument text-4xl tracking-tight sm:text-5xl">
                  Project Gallery
                </h2>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {project.galleryUrls.map((image, index) => (
                    <div
                      key={image || index}
                      className="overflow-hidden rounded-3xl border border-border p-3 sm:p-5"
                      style={{
                        backgroundColor: project.cardColor || "#e2e0fa",
                      }}
                    >
                      <ScrollImagePreview
                        src={image}
                        loading="lazy"
                        alt={`${project.title} gallery image ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
};

export default ProjectDetailPage;
