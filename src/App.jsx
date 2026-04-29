import { Routes, Route } from "react-router-dom";

import OAuthSuccess from "./pages/auth/OAuthSuccess";
// import AlgoCrush from "./pages/landing/AlgoCrushLandingPage";
import AlgoCrush from "./pages/Landing/AlgoCrushLandingPage";
import Home from "./pages/Home/Home";
import ProtectedLayout from "./Components/ProtectedLayout";
import Onboarding from "./pages/onboarding/Onboarding";
import { ProfileDashboard } from "./pages/profile/ProfileDashboard";
import { EditProfile } from "./pages/profile/EditProfile";
import DiscoveryFeed from "./pages/peopleDisovery/DiscoveryCard";


function App() {

  return (
    <Routes>
    {/*PUBLIC */}
    <Route path="/" element={<AlgoCrush />} />
    <Route path="/oauth-success" element={<OAuthSuccess />} />

    {/*PROTECTED GROUP */}
    <Route element={<ProtectedLayout />}>
      <Route path="/people/discovery" element={<DiscoveryFeed />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/profile" element={ <ProfileDashboard/>} />
      <Route path='/profile/edit' element={<EditProfile/>}/>
    </Route>
  </Routes>
  );
}

export default App;