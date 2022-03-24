import React, { Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";
import NewPasswordForm from "./components/new-password-form/NewPasswordForm";
import Layout from "./components/layout/Layout";
import Comments from "./components/comments/Comments";

const Quotes = React.lazy(() => import("./pages/Quotes"));
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const HomePage = React.lazy(() => import("./pages/homepage/HomePage"));
const AuthPage = React.lazy(() => import("./pages/authpage/AuthPage"));
const ProfilePage = React.lazy(() => import("./pages/profile/Profile"));

export default function App() {
  return (
    <div className="App">
      <Layout>
        <Suspense
          fallback={
            <div>
              <h1>Loading...</h1>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/auth" element={<AuthPage />} />

            <Route path="/quotes" element={<Quotes />} />
            {/*One to many route linking 
            i.e. one quote can belong to many comments
            quote id is used as key to connect its comment(s); 
          */}
            <Route path="/quotes/:quoteId" element={<QuoteDetail />}>
              <Route
                path=""
                element={
                  <div>
                    <Link to={`comments`}>Load Comments</Link>
                  </div>
                }
              />
              <Route path={`comments`} element={<Comments />} />
            </Route>

            <Route path="/new-quote" element={<NewQuote />} />
            <Route path="/profile" element={<ProfilePage />}>
              <Route
                path=""
                element={
                  <div>
                    <Link to="change-password">Change Password</Link>
                  </div>
                }
              />
              <Route path="change-password" element={<NewPasswordForm />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}
