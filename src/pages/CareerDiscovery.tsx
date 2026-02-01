import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { careerTracks } from '../data/dummyData';
import { ArrowLeft } from 'lucide-react';

interface CareerDiscoveryProps {
  onNext: (track: string) => void;
  userName: string;
}

export default function CareerDiscovery({ onNext, userName }: CareerDiscoveryProps) {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const handleSelect = (trackId: string) => {
    setSelectedTrack(trackId);
  };

  const handleNext = () => {
    if (selectedTrack) {
      onNext(selectedTrack);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              أهلاً {userName}! 👋
            </h1>
            <p className="text-xl text-slate-600">دعنا نكتشف المسار المهني المثالي لك</p>
          </motion.div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#FF4B4B] text-white flex items-center justify-center font-bold">1</div>
              <span className="font-semibold text-slate-700">اكتشاف المسار</span>
            </div>
            <div className="w-16 h-1 bg-slate-300"></div>
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold">2</div>
              <span className="font-semibold text-slate-600">التقييم الذاتي</span>
            </div>
            <div className="w-16 h-1 bg-slate-300"></div>
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold">3</div>
              <span className="font-semibold text-slate-600">اختبار الذكاء</span>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-slate-700 mb-8">ما الذي يثير اهتمامك أكثر؟</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {careerTracks.map((track) => {
            const IconComponent = Icons[track.icon as keyof typeof Icons] as React.ElementType;
            return (
              <Card
                key={track.id}
                selected={selectedTrack === track.id}
                onClick={() => handleSelect(track.id)}
                className="cursor-pointer"
              >
                <div className="text-center space-y-4">
                  <div
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                    style={{ backgroundColor: track.color + '20' }}
                  >
                    {IconComponent && <IconComponent size={40} style={{ color: track.color }} />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{track.title}</h3>
                    <p className="text-sm text-slate-500 mb-2">{track.subtitle}</p>
                    <p className="text-slate-600">{track.description}</p>
                  </div>
                  {selectedTrack === track.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-semibold"
                    >
                      ✓ مسارك المقترح
                    </motion.div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!selectedTrack}
            variant="primary"
            size="lg"
            icon={ArrowLeft}
          >
            التالي: التقييم الذاتي
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
