import React, { useEffect, useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AgentWorkFeed } from './pages/AgentWorkFeed';
import { AdminDashboard } from './pages/AdminDashboard';
import { InvestorDeck } from './pages/InvestorDeck';
import { ApexPlatform } from './pages/ApexPlatform';
import { EntryPoint } from './pages/EntryPoint';
import { SignupFlow } from './pages/SignupFlow';
type Route =
'entry' |
'landing' |
'feed' |
'dashboard' |
'deck' |
'apex' |
'signup' |
'trial' |
'growth-trial';
export function App() {
  const [route, setRoute] = useState<Route>('entry');
  useEffect(() => {
    const resolve = () => {
      const h = window.location.hash;
      if (h === '#/apex') setRoute('apex');else
      if (h === '#/landing') setRoute('landing');else
      if (h === '#/feed') setRoute('feed');else
      if (h === '#/dashboard') setRoute('dashboard');else
      if (h === '#/deck') setRoute('deck');else
      if (h === '#/signup') setRoute('signup');else
      if (h === '#/trial') setRoute('trial');else
      if (h === '#/trial/growth') setRoute('growth-trial');else
      setRoute('entry');
    };
    resolve();
    window.addEventListener('hashchange', resolve);
    return () => window.removeEventListener('hashchange', resolve);
  }, []);
  if (route === 'apex') return <ApexPlatform />;
  if (route === 'landing') return <LandingPage />;
  if (route === 'feed') return <AgentWorkFeed />;
  if (route === 'dashboard') return <AdminDashboard />;
  if (route === 'deck') return <InvestorDeck />;
  if (route === 'signup') return <SignupFlow plan="free" />;
  if (route === 'trial') return <SignupFlow plan="starter" />;
  if (route === 'growth-trial') return <SignupFlow plan="growth" />;
  return <EntryPoint />;
}