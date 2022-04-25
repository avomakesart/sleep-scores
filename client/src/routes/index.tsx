import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import { SuspenseSpinner } from '../components'

const Home = lazy(() => import('../pages/home'))
const NotFound = lazy(() => import('../pages/not-found'))
const Activity = lazy(() => import('../pages/activity'))
const ActivityDetails = lazy(() => import('../pages/activity/[id]'))
const UpdateScore = lazy(() => import('../pages/activity/update'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<SuspenseSpinner />}>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activity/:id" element={<ActivityDetails />} />
        <Route path="/activity/update/:id" element={<UpdateScore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
