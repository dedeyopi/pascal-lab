import { MissionShell } from './MissionShell';
import { MISSIONS } from '../data/missions';
import { ApplicationCard } from '../components/ApplicationCard';
import { ConceptCard } from '../components/ConceptCard';
import {
  HydraulicBrakeArt,
  HydraulicJackArt,
  HydraulicLiftArt,
  HydraulicPressArt,
  HydraulicBedArt,
} from '../components/Illustrations';
import { useLab } from '../state/LabContext';

interface Props {
  onNext: () => void;
  onBackToMap: () => void;
}

interface AppItem {
  emoji: string;
  title: string;
  art: React.ReactNode;
  how: string;
  role: string;
  question: string;
  modelAnswer: string;
}

const APPLICATIONS: AppItem[] = [
  {
    emoji: '🚗',
    title: 'Rem Hidrolik',
    art: <HydraulicBrakeArt />,
    how: 'Ketika pengemudi menekan pedal rem, gaya diteruskan ke piston kecil pada silinder master. Piston ini menekan fluida rem (minyak hidrolik) yang berada di dalam pipa tertutup. Tekanan tersebut diteruskan melalui pipa menuju silinder roda di setiap roda kendaraan.',
    role: 'Tekanan dari silinder master diteruskan sama besar ke silinder roda. Karena piston di silinder roda memiliki luas penampang lebih besar, gaya yang dihasilkan menjadi lebih besar sehingga mampu menekan kampas rem ke cakram.',
    question:
      'Ketika pengemudi menekan pedal rem, bagaimana tekanan dapat diteruskan hingga membantu menekan komponen rem?',
    modelAnswer:
      'Gaya pada pedal diteruskan ke piston kecil di silinder master. Piston menekan fluida rem sehingga timbul tekanan. Menurut Hukum Pascal, tekanan ini diteruskan sama besar melalui fluida di dalam pipa menuju silinder roda. Di sana tekanan bekerja pada piston yang lebih luas sehingga gaya menjadi lebih besar dan menekan kampas rem ke cakram.',
  },
  {
    emoji: '🔧',
    title: 'Dongkrak Hidrolik',
    art: <HydraulicJackArt />,
    how: 'Dongkrak memiliki piston pompa berukuran kecil dan piston pengangkat berukuran besar. Ketika tuas pompa ditekan, gaya kecil diberikan pada piston kecil sehingga tekanan fluida meningkat.',
    role: 'Tekanan yang sama bekerja pada piston pengangkat yang luas penampangnya jauh lebih besar, sehingga gaya angkatnya menjadi jauh lebih besar dan mampu mengangkat badan mobil.',
    question:
      'Mengapa gaya tangan yang kecil dapat mengangkat mobil yang massanya ratusan kilogram?',
    modelAnswer:
      'Karena tekanan yang sama dari piston kecil diteruskan ke piston besar yang luasnya jauh lebih besar. Dengan F₂ = P × A₂, luas yang besar menghasilkan gaya keluaran yang besar. Namun piston besar hanya naik dengan jarak yang pendek, sehingga usaha tetap seimbang.',
  },
  {
    emoji: '🏗️',
    title: 'Lift Hidrolik',
    art: <HydraulicLiftArt />,
    how: 'Lift hidrolik menggunakan pompa untuk menekan fluida ke dalam silinder besar. Fluida yang tertekan mendorong piston pengangkat ke atas, mengangkat platform dan beban di atasnya.',
    role: 'Tekanan dari pompa diteruskan melalui fluida tertutup ke piston besar. Luas piston yang besar menghasilkan gaya angkat yang besar pula, cukup untuk mengangkat kendaraan atau barang berat.',
    question:
      'Apa yang harus dilakukan agar lift hidrolik dapat mengangkat beban yang lebih berat lagi?',
    modelAnswer:
      'Memperbesar luas piston pengangkat, memperbesar gaya dari pompa, atau keduanya. Jika luas piston pengangkat diperbesar sementara tekanan tetap, gaya angkat akan bertambah besar.',
  },
  {
    emoji: '🏭',
    title: 'Mesin Press Hidrolik',
    art: <HydraulicPressArt />,
    how: 'Mesin press menggunakan pompa hidrolik untuk menekan piston berukuran besar ke arah benda kerja. Fluida bertekanan tinggi mendorong piston tersebut dengan gaya yang sangat besar.',
    role: 'Tekanan dari pompa diteruskan sama besar ke piston besar. Karena luas piston besar sangat besar, gaya yang dihasilkan pun sangat besar sehingga mampu memadatkan atau membentuk logam.',
    question:
      'Mengapa mesin press hidrolik dapat memberi gaya yang jauh lebih besar daripada gaya yang diberikan pompa?',
    modelAnswer:
      'Karena luas piston press jauh lebih besar daripada luas piston pompa. Tekanan yang sama bekerja pada luas yang jauh lebih besar, sehingga gaya keluaran menjadi jauh lebih besar (F = P × A).',
  },
  {
    emoji: '🛏️',
    title: 'Tempat Tidur Pasien Hidrolik',
    art: <HydraulicBedArt />,
    how: 'Beberapa tempat tidur rumah sakit menggunakan pompa injak hidrolik. Saat petugas menginjak pedal, fluida tertekan dan mendorong piston pengangkat di bawah rangka tempat tidur.',
    role: 'Tekanan dari pompa diteruskan melalui fluida ke piston besar di bawah rangka tempat tidur, sehingga gaya kecil dari injakan kaki mampu mengangkat beban pasien dengan tenaga yang jauh lebih kecil.',
    question:
      'Mengapa sistem hidrolik sangat membantu perawat atau pengguna tempat tidur pasien?',
    modelAnswer:
      'Karena sistem hidrolik memungkinkan gaya kecil dari injakan kaki menghasilkan gaya angkat yang besar. Ini mengurangi tenaga yang dibutuhkan manusia untuk mengangkat beban berat, sehingga lebih aman dan efisien.',
  },
];

export function Mission06({ onNext, onBackToMap }: Props) {
  const meta = MISSIONS[5];
  const { completeMission } = useLab();

  return (
    <MissionShell
      meta={meta}
      onBackToMap={onBackToMap}
      onNext={() => {
        completeMission(6, 20, 'thinker');
        onNext();
      }}
      nextLabel="LANJUT KE PASCAL CHALLENGE →"
    >
      <ConceptCard icon="🌍" title="Dunia Hidrolik" tone="info">
        <p>
          Hukum Pascal bukan hanya teori di buku. Prinsip ini bekerja di dalam rem kendaraanmu, lift di
          bengkel, mesin press di pabrik, bahkan tempat tidur pasien di rumah sakit. Selidiki lima penerapan
          berikut dan coba jawab pertanyaan di setiap kartu.
        </p>
      </ConceptCard>

      <div className="grid gap-5 md:grid-cols-2">
        {APPLICATIONS.map((a) => (
          <ApplicationCard
            key={a.title}
            emoji={a.emoji}
            title={a.title}
            illustration={a.art}
            how={a.how}
            role={a.role}
            question={a.question}
            modelAnswer={a.modelAnswer}
          />
        ))}
      </div>

      <ConceptCard icon="🧠" title="Benang Merah" tone="violet">
        <p>
          Perhatikan pola yang muncul di semua penerapan tadi: sebuah <strong>gaya kecil</strong> menekan
          fluida pada <strong>luas penampang kecil</strong>, lalu tekanan yang sama bekerja pada{' '}
          <strong>luas penampang besar</strong> dan menghasilkan <strong>gaya besar</strong>. Tekanannya tidak
          berubah — yang berubah hanyalah luas tempat tekanan itu bekerja.
        </p>
      </ConceptCard>

      <ConceptCard icon="⚠️" title="Perlu Diingat" tone="warn">
        <p>
          Sistem hidrolik tidak menciptakan energi. Gaya keluaran yang lebih besar selalu disertai dengan
          jarak perpindahan yang lebih pendek pada piston keluaran. Selain itu, Hukum Pascal berlaku untuk
          fluida tertutup pada umumnya — tidak hanya air. Sistem hidrolik di kendaraan biasanya menggunakan
          minyak hidrolik khusus.
        </p>
      </ConceptCard>
    </MissionShell>
  );
}