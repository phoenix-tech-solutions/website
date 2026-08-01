import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Shell } from "./components/layout/Shell";
import Home from "./pages/Home";
const Work = lazy(() => import("./pages/Work"));
const WorkDetail = lazy(() => import("./pages/WorkDetail"));
const About = lazy(() => import("./pages/About"));
const Start = lazy(() => import("./pages/Start"));
const Join = lazy(() => import("./pages/Join"));
const Badge = lazy(() => import("./pages/Badge"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Styleguide = lazy(() => import("./pages/Styleguide"));
function Layout() {
  return (
    <Shell>
      <Suspense
        fallback={
          <div className="route-loading t-mono" role="status">
            Loading page
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Shell>
  );
}
const children = [
  { index: true, element: <Home /> },
  { path: "work", element: <Work /> },
  { path: "work/:slug", element: <WorkDetail /> },
  { path: "about", element: <About /> },
  { path: "start", element: <Start /> },
  { path: "join", element: <Join /> },
  { path: "badge", element: <Badge /> },
  ...(import.meta.env.DEV ? [{ path: "styleguide", element: <Styleguide /> }] : []),
  { path: "*", element: <NotFound /> },
];
const router = createBrowserRouter([{ path: "/", element: <Layout />, children }]);
export default function App() {
  return <RouterProvider router={router} />;
}
