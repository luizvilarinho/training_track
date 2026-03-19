import React from "react";
import styles from './homeCardCalorias.module.css';
import Link from "next/link";

type Props = {
  calculo: {
    success: boolean
    cal: number
    p: number
    c: number
    g: number
    f: number
  },
  healthData?: {
    weight: number
    height: number
    meta_calorias: number
    meta_macros: {
      p: number
      c: number
      g: number
    }
  }
}

const CalorieRing: React.FC<{ consumed: number; meta: number }> = ({ consumed, meta }) => {
  const size = 160;
  const strokeWidth = 13;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = meta > 0 ? Math.min(consumed / meta, 1) : 0;
  const offset = circumference - percentage * circumference;
  const isOver = meta > 0 && consumed > meta;

  return (
    <div className={styles.ringWrapper}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7d60d3" />
            <stop offset="100%" stopColor="#c8f33e" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#1e1a30" strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={isOver ? "#ff4d6d" : "url(#ringGrad)"}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className={styles.ringCenter}>
        <span className={styles.ringValue}>{consumed || 0}</span>
        <span className={styles.ringLabel}>kcal</span>
        {meta > 0 && <span className={styles.ringMeta}>/ {meta}</span>}
      </div>
    </div>
  );
};

type MacroChipProps = {
  label: string
  value: number
  meta: number
  color: string
}

const MacroChip: React.FC<MacroChipProps> = ({ label, value, meta, color }) => {
  const pct = meta > 0 ? Math.min(value / meta, 1) * 100 : 0;
  return (
    <div className={styles.macroChip}>
      <div className={styles.macroHeader}>
        <span className={styles.macroLabel}>{label}</span>
        <span className={styles.macroValue}>{value || 0}g</span>
      </div>
      <div className={styles.macroBar}>
        <div className={styles.macroBarFill} style={{ width: `${pct}%`, background: color }} />
      </div>
      {meta > 0 && <span className={styles.macroMeta}>meta: {meta}g</span>}
    </div>
  );
};

const HomeCardCalorias: React.FC<Props> = ({ calculo, healthData }) => {
  const meta = healthData?.meta_calorias || 0;
  const consumed = calculo?.cal || 0;
  const remaining = Math.max(meta - consumed, 0);

  return (
    <div className={styles.homeCardCalorias}>

      <div className={styles.ringSection}>
        <CalorieRing consumed={consumed} meta={meta} />

        {meta > 0 && (
          <div className={styles.ringStats}>
            <div className={styles.ringStatItem}>
              <span className={`${styles.ringStatValue} ${styles.purple}`}>{meta}</span>
              <span className={styles.ringStatLabel}>meta</span>
            </div>
            <div className={styles.ringStatItem}>
              <span className={`${styles.ringStatValue} ${consumed > meta ? styles.red : styles.green}`}>
                {remaining}
              </span>
              <span className={styles.ringStatLabel}>restam</span>
            </div>
          </div>
        )}
      </div>

      {healthData?.meta_macros && (
        <div className={styles.macrosSection}>
          <div className={styles.macrosSectionTitle}>macros</div>
          <div className={styles.macroChips}>
            <MacroChip label="Prot." value={calculo?.p || 0} meta={healthData.meta_macros.p} color="#9b7ef0" />
            <MacroChip label="Carb." value={calculo?.c || 0} meta={healthData.meta_macros.c} color="#c8f33e" />
            <MacroChip label="Gord." value={calculo?.g || 0} meta={healthData.meta_macros.g} color="#7d60d3" />
          </div>
        </div>
      )}

      <div className={styles.containerBtn}>
        <Link href={'/calorias'} passHref>
          <button>registrar</button>
        </Link>
        <Link href={'/metas'} passHref>
          <button className={'secundary-btn'}>metas</button>
        </Link>
      </div>

    </div>
  );
};

export default HomeCardCalorias;
