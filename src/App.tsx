import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

interface Presentation {
  Presentation: React.LazyExoticComponent<() => JSX.Element>;
  name: string;
  path: string;
}

const presentations: ReadonlyArray<Presentation> = [
  {
    Presentation: React.lazy(
      () => import('./presentations/ExamplePresentation'),
    ),
    name: 'Example',
    path: '/example',
  },
];

export default function App() {
  return (
    <Router>
      <Suspense fallback="Loading...">
        <div>
          <nav>
            <ul>
              {presentations.map(({ name, path }) => (
                <li key={path}>
                  <Link to={path}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <Switch>
            {presentations.map(({ Presentation, path }) => (
              <Route key={path} path={path}>
                <Presentation />
              </Route>
            ))}
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
