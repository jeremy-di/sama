import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRouter from './pages/public/PublicRouter'
import StaffRouter from './pages/formateur/staff/StaffRouter'
import FormateurRouter from './pages/formateur/FormateurRouter'
import PatientRouter from './pages/Patient/PatientRouter'
import CPRouter from './pages/caissePrimaire/CPRouter'
import MutuelleRouter from './pages/mutuelles/MutuelleRouter'
import MedecinRouter from './pages/medecin/MedecinRouter'
import DocumentRouter from './pages/secretaryDocuments/DocumentRouter'
import DocumentTrainerRouter from './pages/trainerDocuments/DocumentRouter'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicRouter />} />
        <Route path="/formateur/*" element={<FormateurRouter />} />
        <Route path="/staff/*" element={<StaffRouter />} />
        <Route path="/patient/*" element={<PatientRouter />} />
        <Route path="/caisseprimaire/*" element={<CPRouter />} />
        <Route path="/mutuelle/*" element={<MutuelleRouter />} />
        <Route path="/medecin/*" element={<MedecinRouter />} />
        <Route path="/secretarydocuments/*" element={<DocumentRouter />} />
        <Route path="/trainerdocuments/*" element={<DocumentTrainerRouter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
