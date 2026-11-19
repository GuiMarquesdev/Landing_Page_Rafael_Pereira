import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface BirthDatePickerProps {
  id: string;
  value: string;
  onChange: (formattedDate: string) => void;
  onAgeCalculated?: (age: string) => void;
  className?: string;
}

const MONTHS_PT = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const WEEKDAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const MIN_YEAR = 1920;

function parseBrDate(val: string): { day: number; month: number; year: number } | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(val.trim());
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const currentYear = new Date().getFullYear();
  if (year < MIN_YEAR || year > currentYear || month < 1 || month > 12 || day < 1) return null;
  const maxDay = new Date(year, month, 0).getDate();
  if (day > maxDay) return null;
  const candidate = new Date(year, month - 1, day);
  if (candidate > new Date()) return null;
  return { day, month: month - 1, year };
}

function calculateAgeFromBrDate(day: number, monthIndex: number, year: number): string {
  const today = new Date();
  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() - monthIndex;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    age -= 1;
  }
  return age >= 0 && age <= 120 ? String(age) : '';
}

function formatMaskedDate(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export const BirthDatePicker: React.FC<BirthDatePickerProps> = ({
  id,
  value,
  onChange,
  onAgeCalculated,
  className = '',
}) => {
  const today = useMemo(() => new Date(), []);
  const currentYear = today.getFullYear();

  const parsed = useMemo(() => parseBrDate(value), [value]);

  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'days' | 'years'>('days');
  const [viewMonth, setViewMonth] = useState<number>(parsed ? parsed.month : today.getMonth());
  const [viewYear, setViewYear] = useState<number>(parsed ? parsed.year : currentYear);

  const containerRef = useRef<HTMLDivElement>(null);

  // Anos estritamente em ordem decrescente (do ano atual descendo até 1920)
  const yearsDescending = useMemo(() => {
    const list: number[] = [];
    for (let y = currentYear; y >= MIN_YEAR; y -= 1) {
      list.push(y);
    }
    return list;
  }, [currentYear]);

  useEffect(() => {
    if (parsed) {
      setViewMonth(parsed.month);
      setViewYear(parsed.year);
    }
  }, [parsed]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode('days');
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setViewMode('days');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatMaskedDate(e.target.value);
    onChange(masked);
    const maybeDate = parseBrDate(masked);
    if (maybeDate && onAgeCalculated) {
      const age = calculateAgeFromBrDate(maybeDate.day, maybeDate.month, maybeDate.year);
      if (age) onAgeCalculated(age);
    }
  };

  const handleSelectDay = (day: number) => {
    const candidate = new Date(viewYear, viewMonth, day);
    if (candidate > today) return;

    const dd = String(day).padStart(2, '0');
    const mm = String(viewMonth + 1).padStart(2, '0');
    const formatted = `${dd}/${mm}/${viewYear}`;
    onChange(formatted);

    if (onAgeCalculated) {
      const age = calculateAgeFromBrDate(day, viewMonth, viewYear);
      if (age) onAgeCalculated(age);
    }

    setIsOpen(false);
    setViewMode('days');
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      if (viewYear > MIN_YEAR) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      }
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewYear === currentYear && viewMonth >= today.getMonth()) return;
    if (viewMonth === 11) {
      if (viewYear < currentYear) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      }
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        inputMode="numeric"
        maxLength={10}
        placeholder="DD/MM/AAAA"
        value={value}
        onChange={handleInputChange}
        onFocus={() => {
          if (!isOpen) setIsOpen(true);
        }}
        className={`${className} pr-10`}
      />

      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setViewMode('days');
        }}
        aria-label="Abrir calendário de data de nascimento"
        aria-expanded={isOpen}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#395D89] hover:bg-[#395D89]/10 transition-colors cursor-pointer"
      >
        <Calendar size={16} />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Selecionar data de nascimento"
          className="absolute left-0 top-full mt-2 z-30 w-72 sm:w-80 bg-white rounded-2xl border border-[#DFD8CC] shadow-xl p-4 text-[#2B2F2A]"
        >
          {/* Cabeçalho do Calendário */}
          <div className="flex items-center justify-between gap-1.5 mb-3 pb-2.5 border-b border-[#EAE3D7]">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Mês anterior"
              className="p-1.5 rounded-lg hover:bg-[#EBE5DB] text-[#2B2F2A] transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5 flex-1 justify-center">
              <select
                aria-label="Mês"
                value={viewMonth}
                onChange={(e) => {
                  const nextMonth = Number(e.target.value);
                  setViewMonth(nextMonth);
                  setViewMode('days');
                }}
                className="font-oswald text-xs font-bold uppercase tracking-wide bg-[#FAF8F5] border border-[#DFD8CC] rounded-lg px-2 py-1 text-[#2B2F2A] focus:outline-none focus:ring-2 focus:ring-[#395D89] cursor-pointer"
              >
                {MONTHS_PT.map((mName, idx) => (
                  <option
                    key={mName}
                    value={idx}
                    disabled={viewYear === currentYear && idx > today.getMonth()}
                  >
                    {mName}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setViewMode((m) => (m === 'years' ? 'days' : 'years'))}
                className={`font-oswald inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  viewMode === 'years'
                    ? 'bg-[#395D89] text-white border-[#395D89]'
                    : 'bg-[#FAF8F5] text-[#1E3A5F] border-[#DFD8CC] hover:border-[#395D89]'
                }`}
                title="Escolher ano (ordem decrescente)"
              >
                <span>{viewYear}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform ${viewMode === 'years' ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              disabled={viewYear === currentYear && viewMonth >= today.getMonth()}
              aria-label="Próximo mês"
              className="p-1.5 rounded-lg hover:bg-[#EBE5DB] disabled:opacity-30 disabled:cursor-not-allowed text-[#2B2F2A] transition-colors cursor-pointer shrink-0"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {viewMode === 'years' ? (
            <div>
              <p className="font-oswald text-[10px] font-bold uppercase tracking-wider text-[#395D89] mb-2 text-center">
                Selecione o ano ({currentYear} → {MIN_YEAR})
              </p>
              <div className="grid grid-cols-4 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {yearsDescending.map((y) => {
                  const isSelectedYear = y === viewYear;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => {
                        setViewYear(y);
                        if (y === currentYear && viewMonth > today.getMonth()) {
                          setViewMonth(today.getMonth());
                        }
                        setViewMode('days');
                      }}
                      className={`font-oswald py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isSelectedYear
                          ? 'bg-[#1E3A5F] text-white shadow-xs'
                          : 'bg-[#FAF8F5] hover:bg-[#395D89]/15 text-[#2B2F2A]'
                      }`}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              {/* Dias da semana */}
              <div className="grid grid-cols-7 gap-1 mb-1.5 text-center">
                {WEEKDAYS_PT.map((wd) => (
                  <span
                    key={wd}
                    className="font-oswald text-[10px] font-bold uppercase text-[#2B2F2A]/55"
                  >
                    {wd}
                  </span>
                ))}
              </div>

              {/* Grade de dias */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstWeekday }).map((_, idx) => (
                  <span key={`empty-${idx}`} />
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const candidate = new Date(viewYear, viewMonth, day);
                  const isFuture = candidate > today;
                  const isSelected =
                    parsed?.day === day &&
                    parsed?.month === viewMonth &&
                    parsed?.year === viewYear;

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={isFuture}
                      onClick={() => handleSelectDay(day)}
                      className={`h-8 rounded-lg text-xs font-semibold transition-colors ${
                        isFuture
                          ? 'text-[#2B2F2A]/25 cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#1E3A5F] text-white shadow-xs cursor-pointer'
                          : 'hover:bg-[#395D89]/15 text-[#2B2F2A] cursor-pointer'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
