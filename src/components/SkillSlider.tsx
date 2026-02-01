import { useState } from 'react';

interface SkillSliderProps {
  skill: {
    id: string;
    name: string;
    category: string;
    required: number;
  };
  onChange: (skillId: string, value: number) => void;
}

export default function SkillSlider({ skill, onChange }: SkillSliderProps) {
  const [value, setValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onChange(skill.id, newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-lg font-semibold text-slate-700">{skill.name}</label>
        <span className="text-2xl font-bold text-[#FF4B4B]">{value}/10</span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={handleChange}
        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF4B4B]"
        style={{
          background: `linear-gradient(to left, #FF4B4B ${value * 10}%, #e2e8f0 ${value * 10}%)`
        }}
      />
      <div className="flex justify-between text-sm text-slate-500">
        <span>مبتدئ</span>
        <span>متوسط</span>
        <span>متقدم</span>
        <span>خبير</span>
      </div>
    </div>
  );
}
