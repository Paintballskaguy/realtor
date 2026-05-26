import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Listings = lazy(() => import('./pages/Listings'));
const ListingDetail = lazy(() => import('./pages/ListingDetail'));
const Contact = lazy(() => import('./pages/Contact'));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
        <Route path="/listings" element={<Suspense fallback={<PageLoader />}><Listings /></Suspense>} />
        <Route path="/listings/:id" element={<Suspense fallback={<PageLoader />}><ListingDetail /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
      </Route>
    </Routes>
  );
}
