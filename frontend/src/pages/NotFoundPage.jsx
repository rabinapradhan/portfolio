import { Link } from "react-router-dom";
import star from "../assets/star.svg";
import { FaArrowRight } from "react-icons/fa";
const NotFoundPage = () => {
  return (
    <main class="flex min-h-screen items-center justify-center px-6 pb-16 pt-28">
      <div class="mx-auto w-full max-w-xl text-center">
        <div
          aria-hidden="true"
          class="mb-8 flex items-center justify-center gap-5"
        >
          <img className="w-30 h-30 " src={star} alt="Star" />
        </div>
        <p class="text-sm font-medium text-muted-foreground">
          404 · A little off course
        </p>
        <h1 class="mt-4 font-display text-5xl sm:text-6xl">
          This page wandered off.
        </h1>
        <p class="mx-auto mt-5 max-w-sm leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or may have moved. Let's get
          you back somewhere familiar.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors    bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 rounded-full"
            to="/"
          >
            Back home
            <FaArrowRight size={14} />
          </Link>
          <Link
            class="inline-flex  items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors  border  border-border bg-background shadow-sm hover:bg-lavender hover:text-accent-foreground h-10 px-8 rounded-full"
            to="/projects"
          >
            Explore projects <FaArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
