import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { AUDIO_FILES } from "../config/voiceover";
import { DEMO, df } from "../config/demo-timing";
import { AnimatedCursor, CursorKeyframe } from "../components/AnimatedCursor";
import { SceneFade } from "../components/SceneFade";
import { D1Intro } from "../scenes/demo/D1Intro";
import { D2Scanner } from "../scenes/demo/D2Scanner";
import { D3SignalDetail } from "../scenes/demo/D3SignalDetail";
import { D4Backtests } from "../scenes/demo/D4Backtests";
import { D5Performance } from "../scenes/demo/D5Performance";
import { D6MarketHealth } from "../scenes/demo/D6MarketHealth";
import { D7Journal } from "../scenes/demo/D7Journal";
import { D8Alerts } from "../scenes/demo/D8Alerts";
import { D9CTA } from "../scenes/demo/D9CTA";

// Cursor keyframes — positions expressed as fractions of 1920×1080
const CURSOR_KEYFRAMES: CursorKeyframe[] = [
  // D1 Intro
  { frame: df(0),   x: 0.5,  y: 0.5,  action: "idle" },

  // D2 Scanner — slingshot chip click + spotlight on RELIANCE
  { frame: df(8),   x: 0.50, y: 0.50, action: "idle"  },
  { frame: df(14),  x: 0.44, y: 0.37, action: "hover" },
  { frame: df(14) + 30, x: 0.44, y: 0.37, action: "click" },
  { frame: df(17),  x: 0.55, y: 0.55, action: "idle"  },
  { frame: df(19),  x: 0.38, y: 0.48, action: "hover" },
  { frame: df(19) + 15, x: 0.38, y: 0.48, action: "click" },
  { frame: df(21),  x: 0.80, y: 0.48, action: "hover" },
  { frame: df(24),  x: 0.60, y: 0.60, action: "idle"  },

  // D3 Signal Detail
  { frame: df(30),  x: 0.42, y: 0.52, action: "idle"  },
  { frame: df(31),  x: 0.26, y: 0.50, action: "hover" },
  { frame: df(31) + 18, x: 0.26, y: 0.50, action: "click" },
  { frame: df(34),  x: 0.55, y: 0.45, action: "idle"  },
  { frame: df(38),  x: 0.68, y: 0.40, action: "idle"  },
  { frame: df(38) + df(9) - df(30), x: 0.84, y: 0.53, action: "hover" },
  { frame: df(38) + df(9) - df(30) + 12, x: 0.84, y: 0.53, action: "click" },

  // D4 Backtests
  { frame: df(48),  x: 0.50, y: 0.50, action: "idle"  },
  { frame: df(51),  x: 0.29, y: 0.48, action: "hover" },
  { frame: df(51) + 18, x: 0.29, y: 0.48, action: "click" },
  { frame: df(56),  x: 0.55, y: 0.38, action: "idle"  },
  { frame: df(58),  x: 0.55, y: 0.38, action: "hover" },
  { frame: df(58) + 15, x: 0.55, y: 0.38, action: "click" },
  { frame: df(62),  x: 0.62, y: 0.58, action: "idle"  },

  // D5 Performance
  { frame: df(64),  x: 0.50, y: 0.50, action: "idle"  },
  { frame: df(72),  x: 0.42, y: 0.30, action: "hover" },
  { frame: df(72) + 12, x: 0.42, y: 0.30, action: "click" },
  { frame: df(76),  x: 0.60, y: 0.55, action: "idle"  },

  // D6 Market Health
  { frame: df(78),  x: 0.50, y: 0.50, action: "idle"  },
  { frame: df(83),  x: 0.40, y: 0.50, action: "hover" },
  { frame: df(87),  x: 0.65, y: 0.55, action: "idle"  },

  // D7 Journal
  { frame: df(90),  x: 0.50, y: 0.50, action: "idle"  },
  { frame: df(96),  x: 0.55, y: 0.55, action: "idle"  },

  // D8 Alerts
  { frame: df(102), x: 0.50, y: 0.50, action: "idle"  },
  { frame: df(105), x: 0.55, y: 0.41, action: "hover" },
  { frame: df(105) + 15, x: 0.55, y: 0.41, action: "click" },
  { frame: df(109), x: 0.55, y: 0.56, action: "idle"  },

  // D9 CTA
  { frame: df(112), x: 0.50, y: 0.55, action: "idle" },
  { frame: df(119), x: 0.50, y: 0.60, action: "idle" },
];

// Scene label config
const SCENES = [
  { start: DEMO.intro.start,        duration: DEMO.intro.duration,        label: "Intro"                   },
  { start: DEMO.scanner.start,      duration: DEMO.scanner.duration,      label: "Signal Scanner"          },
  { start: DEMO.signalDetail.start, duration: DEMO.signalDetail.duration, label: "Signal Detail"           },
  { start: DEMO.backtests.start,    duration: DEMO.backtests.duration,    label: "Backtests"               },
  { start: DEMO.performance.start,  duration: DEMO.performance.duration,  label: "Performance"             },
  { start: DEMO.marketHealth.start, duration: DEMO.marketHealth.duration, label: "Market Health"           },
  { start: DEMO.journal.start,      duration: DEMO.journal.duration,      label: "Trade Journal"           },
  { start: DEMO.alerts.start,       duration: DEMO.alerts.duration,       label: "Alerts & Notifications"  },
  { start: DEMO.cta.start,          duration: DEMO.cta.duration,          label: ""                        },
] as const;

const SCENE_COLORS = [
  "#2a73cc", "#1d8f52", "#2a73cc", "#8f6e0a",
  "#2a73cc", "#1d8f52", "#8f6e0a", "#c44a1d", "#2a73cc",
];

export const DemoComposition: React.FC = () => {
  const { width, height } = useVideoConfig();

  const audioFile = AUDIO_FILES["demo"];
  const hasAudio = typeof audioFile === "string";

  const scenes = [
    { scene: DEMO.intro,        label: SCENES[0].label,        color: SCENE_COLORS[0], children: <D1Intro /> },
    { scene: DEMO.scanner,      label: SCENES[1].label,        color: SCENE_COLORS[1], children: <D2Scanner /> },
    { scene: DEMO.signalDetail, label: SCENES[2].label,        color: SCENE_COLORS[2], children: <D3SignalDetail /> },
    { scene: DEMO.backtests,    label: SCENES[3].label,        color: SCENE_COLORS[3], children: <D4Backtests /> },
    { scene: DEMO.performance,  label: SCENES[4].label,        color: SCENE_COLORS[4], children: <D5Performance /> },
    { scene: DEMO.marketHealth, label: SCENES[5].label,        color: SCENE_COLORS[5], children: <D6MarketHealth /> },
    { scene: DEMO.journal,      label: SCENES[6].label,        color: SCENE_COLORS[6], children: <D7Journal /> },
    { scene: DEMO.alerts,       label: SCENES[7].label,        color: SCENE_COLORS[7], children: <D8Alerts /> },
    { scene: DEMO.cta,          label: SCENES[8].label,        color: SCENE_COLORS[8], children: <D9CTA /> },
  ];

  return (
    <>
      {/* Voiceover audio */}
      {hasAudio && <Audio src={staticFile(audioFile)} volume={0.85} />}

      {/* Scenes with fade transitions + labels */}
      {scenes.map(({ scene, label, color, children }) => (
        <Sequence
          key={scene.start}
          from={df(scene.start)}
          durationInFrames={df(scene.duration)}
        >
          <SceneFade
            durationInFrames={df(scene.duration)}
            label={label || undefined}
            labelColor={color}
          >
            {children}
          </SceneFade>
        </Sequence>
      ))}

      {/* Global cursor layer */}
      <AnimatedCursor
        keyframes={CURSOR_KEYFRAMES}
        compositionWidth={width}
        compositionHeight={height}
        size={28}
      />
    </>
  );
};
