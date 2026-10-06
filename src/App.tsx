import { useState } from 'react';
import { LabProvider, useLab } from './state/LabContext';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { ProfileGate } from './components/ProfileGate';
import { MissionMap } from './components/MissionMap';
import { ReflectionForm } from './components/ReflectionForm';
import { ResultScreen } from './pages/ResultScreen';
import { CertificateScreen } from './pages/CertificateScreen';
import { TeacherDashboard } from './pages/TeacherDashboard';

import { Mission01 } from './missions/Mission01';
import { Mission02 } from './missions/Mission02';
import { Mission03 } from './missions/Mission03';
import { Mission04 } from './missions/Mission04';
import { Mission05 } from './missions/Mission05';
import { Mission06 } from './missions/Mission06';
import { Mission07 } from './missions/Mission07';

type View = 'hero' | 'profile' | 'map' | 'mission' | 'reflection' | 'result';

export default function App() {
  const isTeacher =
    typeof window !== 'undefined' &&
    window.location.pathname.replace(/\/+$/, '').startsWith('/teacher');

  if (isTeacher) return <TeacherDashboard />;

  return (
    <LabProvider>
      <StudentApp />
    </LabProvider>
  );
}

function StudentApp() {
  const { state, setCurrentMission } = useLab();
  const [view, setView] = useState<View>('hero');
  const [missionId, setMissionId] = useState<number>(1);

  const openMission = (id: number) => {
    setMissionId(id);
    setCurrentMission(id);
    setView('mission');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToMap = () => {
    setView('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextMission = () => {
    if (missionId < 7) {
      openMission(missionId + 1);
    } else {
      setView('reflection');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {view !== 'hero' && (
        <TopBar onOpenMap={goToMap} onOpenResult={() => setView('result')} />
      )}

      <main>
        {view === 'hero' && (
          <Hero
            hasProgress={state.completedMissions.length > 0}
            onStart={() => {
              if (state.completedMissions.length > 0 || state.student) {
                goToMap();
              } else {
                setView('profile');
              }
            }}
            onSeeMap={() => {
              if (!state.student) setView('profile');
              else goToMap();
            }}
          />
        )}

        {view === 'profile' && (
          <ProfileGate onDone={goToMap} onBack={() => setView('hero')} />
        )}

        {view === 'map' && <MissionMap onOpenMission={openMission} />}

        {view === 'mission' && (
          <>
            {missionId === 1 && <Mission01 onNext={nextMission} onBackToMap={goToMap} />}
            {missionId === 2 && <Mission02 onNext={nextMission} onBackToMap={goToMap} />}
            {missionId === 3 && <Mission03 onNext={nextMission} onBackToMap={goToMap} />}
            {missionId === 4 && <Mission04 onNext={nextMission} onBackToMap={goToMap} />}
            {missionId === 5 && <Mission05 onNext={nextMission} onBackToMap={goToMap} />}
            {missionId === 6 && <Mission06 onNext={nextMission} onBackToMap={goToMap} />}
            {missionId === 7 && (
              <Mission07
                onFinish={() => {
                  setView('reflection');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBackToMap={goToMap}
              />
            )}
          </>
        )}

        {view === 'reflection' && (
          <ReflectionForm
            onFinish={() => {
              setView('result');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {view === 'result' && (
          <ResultScreen
            onBackToMap={goToMap}
            onReviewReflection={() => setView('reflection')}
          />
        )}
      </main>

      <footer className="border-t border-white/12 bg-navy-950/40 px-4 py-8 text-center backdrop-blur-sm sm:px-6">
        <p className="text-sm font-semibold text-slate-200">
          PASCAL LAB — Laboratorium Virtual Hukum Pascal · IPA SMP Kelas 9 · Fase D
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Dibuat untuk pembelajaran berbasis inkuiri. Data kemajuan tersimpan di perangkatmu.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Belajar IPA bersama Pak Dede.
        </p>
      </footer>
    </div>
  );
}
