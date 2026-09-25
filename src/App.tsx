import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Shell } from "./components/layout/Shell";
import Home from "./pages/Home";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import About from "./pages/About";
import Start from "./pages/Start";
import NotFound from "./pages/NotFound";
import Styleguide from "./pages/Styleguide";

// Pages are small, so they ship together: a page change never waits on a network request,
// which keeps the view transition between pages smooth.
function Layout() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}
const children = [
  { index: true, element: <Home /> },
  { path: "work", element: <Work /> },
  { path: "work/:slug", element: <WorkDetail /> },
  { path: "about", element: <About /> },
  { path: "start", element: <Start /> },
  ...(import.meta.env.DEV ? [{ path: "styleguide", element: <Styleguide /> }] : []),
  { path: "*", element: <NotFound /> },
];
const router = createBrowserRouter([{ path: "/", element: <Layout />, children }]);
export default function App() {
  return <RouterProvider router={router} />;
}
