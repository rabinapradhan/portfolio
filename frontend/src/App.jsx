import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
