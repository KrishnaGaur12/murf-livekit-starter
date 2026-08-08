'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'motion/react';
import { useSessionContext } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { AgentSessionView_01 } from '@/components/agents-ui/blocks/agent-session-view-01';
import { WelcomeView } from '@/components/app/welcome-view';

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(AgentSessionView_01);

const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.5,
    ease: 'linear',
  },
};

interface ViewControllerProps {
  appConfig: AppConfig;
}

export function ViewController({ appConfig }: ViewControllerProps) {
  const { isConnected, start } = useSessionContext();
  const { resolvedTheme } = useTheme();

  const [micError, setMicError] = useState<string | null>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [wasConnected, setWasConnected] = useState(false);
  const [initialTopic, setInitialTopic] = useState<string | undefined>();

  useEffect(() => {
    if (isConnected) setWasConnected(true);
    if (!isConnected && wasConnected) {
      setHasEnded(true);
      setInitialTopic(undefined); // Reset on end
    }
  }, [isConnected, wasConnected]);

  const handleStartCall = async (topic?: string) => {
    setMicError(null);
    if (topic) {
      setInitialTopic(topic);
    }
    try {
      await start();
    } catch (e: any) {
      console.error('Failed to start session', e);
      if (e?.name === 'NotAllowedError' || e?.message?.includes('Permission denied') || e?.message?.includes('Permission denied by system')) {
        setMicError('JanSahayak AI needs microphone permission to hear your voice. Please enable microphone access in your browser to continue.');
      } else {
        setMicError('An error occurred while connecting to the agent. Please try again.');
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {/* Welcome view */}
      {!isConnected && (
        <MotionWelcomeView
          key="welcome"
          {...VIEW_MOTION_PROPS}
          startButtonText={hasEnded ? 'Start New Conversation' : appConfig.startButtonText}
          onStartCall={handleStartCall}
          micError={micError}
          hasEnded={hasEnded}
        />
      )}
      {/* Session view */}
      {isConnected && (
        <MotionSessionView
          key="session-view"
          {...VIEW_MOTION_PROPS}
          initialTopic={initialTopic}
          supportsChatInput={appConfig.supportsChatInput}
          supportsVideoInput={appConfig.supportsVideoInput}
          supportsScreenShare={appConfig.supportsScreenShare}
          isPreConnectBufferEnabled={appConfig.isPreConnectBufferEnabled}
          audioVisualizerType={appConfig.audioVisualizerType}
          audioVisualizerColor={
            resolvedTheme === 'dark'
              ? appConfig.audioVisualizerColorDark
              : appConfig.audioVisualizerColor
          }
          audioVisualizerColorShift={appConfig.audioVisualizerColorShift}
          audioVisualizerBarCount={appConfig.audioVisualizerBarCount}
          audioVisualizerGridRowCount={appConfig.audioVisualizerGridRowCount}
          audioVisualizerGridColumnCount={appConfig.audioVisualizerGridColumnCount}
          audioVisualizerRadialBarCount={appConfig.audioVisualizerRadialBarCount}
          audioVisualizerRadialRadius={appConfig.audioVisualizerRadialRadius}
          audioVisualizerWaveLineWidth={appConfig.audioVisualizerWaveLineWidth}
          className="fixed inset-0"
        />
      )}
    </AnimatePresence>
  );
}
