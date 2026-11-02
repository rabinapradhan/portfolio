import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import ScrollImagePreview from "./ScrollImagePreview";
const Project = ({ project }) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative aspect-[4/3] p-6"
        style={{ backgroundColor: project.cardColor || "#e2e0fa" }}
      >
        <div className="relative h-full overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-sm transition-transform duration-500 group-hover:scale-[1.03]">
          {project.thumbnailUrl ? (
            <ScrollImagePreview
              src={project.thumbnailUrl}
              alt={`${project.title} thumbnail`}
            />
          ) : (
            /* Placeholder */
            <div className="h-full p-4">
              <div className="mb-3 flex gap-1.5">
                <span className="size-2 rounded-full bg-pink-300" />
                <span className="size-2 rounded-full bg-purple-300" />
                <span className="size-2 rounded-full bg-cyan-300" />
              </div>

              <div className="space-y-2">
                <div className="h-2 w-2/3 rounded bg-gray-100" />
                <div className="h-2 w-1/2 rounded bg-gray-100" />

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="h-10 rounded bg-purple-100" />
                  <div className="h-10 rounded bg-purple-100" />
                  <div className="h-10 rounded bg-purple-100" />
                </div>
              </div>
            </div>
          )}
        </div>

        {project.status && (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600 shadow-sm">
            {project.status.replace("-", " ")}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold">
          <Link
            to={`/projects/${project.slug.current}`}
            className="transition-colors hover:text-lavender"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-secondary px-3 py-1.5 text-xs"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium">
          <Link
            to={`/projects/${project.slug.current}`}
            className="inline-flex items-center gap-1 text-lavender transition-colors hover:text-lavender/80"
          >
            View project
            <FaArrowRight size={14} />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-1 hover:text-lavender"
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
              className="inline-flex cursor-pointer items-center gap-1 hover:text-lavender"
            >
              Live demo
              <FiArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default Project;
