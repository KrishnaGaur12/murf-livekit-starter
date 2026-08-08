'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, type MotionProps, motion } from 'motion/react';
import { useAgent, useSessionContext, useSessionMessages, useChat } from '@livekit/components-react';
import { AgentChatTranscript } from '@/components/agents-ui/agent-chat-transcript';
import {
  AgentControlBar,
  type AgentControlBarControls,
} from '@/components/agents-ui/agent-control-bar';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { cn } from '@/lib/shadcn/utils';
import { TileLayout } from './tile-view';

const MotionMessage = motion.create(Shimmer);

const BOTTOM_VIEW_MOTION_PROPS: MotionProps = {
  variants: {
    visible: {
      opacity: 1,
      translateY: '0%',
    },
    hidden: {
      opacity: 0,
      translateY: '100%',
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: 'easeOut',
  },
};

const CHAT_MOTION_PROPS: MotionProps = {
  variants: {
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        ease: 'easeOut',
        duration: 0.3,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

const SHIMMER_MOTION_PROPS: MotionProps = {
  variants: {
    visible: {
      opacity: 1,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
        delay: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
        delay: 0,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        'from-background pointer-events-none h-4 bg-linear-to-b to-transparent',
        top && 'bg-linear-to-b',
        bottom && 'bg-linear-to-t',
        className
      )}
    />
  );
}

export interface AgentSessionView_01Props {
  /**
   * Message shown above the controls before the first chat message is sent.
   *
   * @default 'Agent is listening, ask it a question'
   */
  preConnectMessage?: string;
  /**
   * Enables or disables the chat toggle and transcript input controls.
   *
   * @default true
   */
  supportsChatInput?: boolean;
  /**
   * Enables or disables camera controls in the bottom control bar.
   *
   * @default true
   */
  supportsVideoInput?: boolean;
  /**
   * Enables or disables screen sharing controls in the bottom control bar.
   *
   * @default true
   */
  supportsScreenShare?: boolean;
  /**
   * Shows a pre-connect buffer state with a shimmer message before messages appear.
   *
   * @default true
   */
  isPreConnectBufferEnabled?: boolean;

  /** Selects the visualizer style rendered in the main tile area. */
  audioVisualizerType?: 'bar' | 'wave' | 'grid' | 'radial' | 'aura';
  /** Primary hex color used by supported audio visualizer variants. */
  audioVisualizerColor?: `#${string}`;
  /** Hue shift intensity used by certain visualizers. */
  audioVisualizerColorShift?: number;
  /** Number of bars to render when `audioVisualizerType` is `bar`. */
  audioVisualizerBarCount?: number;
  /** Number of rows in the visualizer when `audioVisualizerType` is `grid`. */
  audioVisualizerGridRowCount?: number;
  /** Number of columns in the visualizer when `audioVisualizerType` is `grid`. */
  audioVisualizerGridColumnCount?: number;
  /** Number of radial bars when `audioVisualizerType` is `radial`. */
  audioVisualizerRadialBarCount?: number;
  /** Base radius of the radial visualizer when `audioVisualizerType` is `radial`. */
  audioVisualizerRadialRadius?: number;
  /** Stroke width of the wave path when `audioVisualizerType` is `wave`. */
  audioVisualizerWaveLineWidth?: number;
  /** The initial topic to start the conversation with */
  initialTopic?: string;
  className?: string;
}

export function AgentSessionView_01({
  preConnectMessage = 'Ready to Assist',
  supportsChatInput = true,
  supportsVideoInput = true,
  supportsScreenShare = true,
  isPreConnectBufferEnabled = true,
  initialTopic,
  audioVisualizerType,
  audioVisualizerColor,
  audioVisualizerColorShift,
  audioVisualizerBarCount,
  audioVisualizerGridRowCount,
  audioVisualizerGridColumnCount,
  audioVisualizerRadialBarCount,
  audioVisualizerRadialRadius,
  audioVisualizerWaveLineWidth,
  ref,
  className,
  ...props
}: React.ComponentProps<'section'> & AgentSessionView_01Props) {
  const session = useSessionContext();
  const { messages } = useSessionMessages(session);
  const { send } = useChat();
  const [chatOpen, setChatOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { state: agentState } = useAgent();
  const initialTopicSent = useRef(false);

  useEffect(() => {
    if (initialTopic && session.isConnected && !initialTopicSent.current && send) {
      initialTopicSent.current = true;
      send(initialTopic);
    }
  }, [initialTopic, session.isConnected, send]);

  const controls: AgentControlBarControls = {
    leave: true,
    microphone: true,
    chat: supportsChatInput,
    camera: supportsVideoInput,
    screenShare: supportsScreenShare,
  };

  useEffect(() => {
    const lastMessage = messages.at(-1);
    const lastMessageIsLocal = lastMessage?.from?.isLocal === true;

    if (scrollAreaRef.current && lastMessageIsLocal) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section
      ref={ref}
      className={cn('bg-background relative z-10 h-full w-full overflow-hidden flex flex-col', className)}
      {...props}
    >
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-6 h-[calc(100vh-220px)]">
        
        {/* Left Panel: Avatar & Status */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <div className="relative mb-6">
            <div className={cn(
              "absolute inset-0 rounded-full blur-xl transition-all duration-500",
              agentState === 'listening' ? "bg-blue-500/30 animate-pulse" :
              agentState === 'speaking' ? "bg-green-500/40 animate-pulse" :
              "bg-gray-200"
            )} />
            <img 
              src="/avatar.png" 
              alt="Jan Sahayak AI Avatar" 
              className={cn(
                "relative size-48 md:size-64 rounded-full border-[6px] shadow-lg object-cover z-10 transition-colors duration-300",
                agentState === 'listening' ? "border-blue-500" :
                agentState === 'speaking' ? "border-green-500" :
                "border-gray-200"
              )}
            />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {agentState === 'connecting' || agentState === 'initializing' ? 'Connecting...' :
             agentState === 'listening' ? 'Listening...' :
             agentState === 'thinking' ? 'Thinking...' :
             agentState === 'speaking' ? 'Jan Sahayak AI is speaking...' : preConnectMessage}
          </h2>
          <p className="text-gray-500 text-center max-w-sm">
            Ask about PM-Kisan, report cyber crimes, verify UPI links, or ask for basic savings guidance.
          </p>
        </div>

        {/* Right Panel: Live Transcript */}
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl shadow-sm flex flex-col relative overflow-hidden">
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between z-10">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Transcript</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-green-600 uppercase">Live</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto relative z-0 p-4">
            <AgentChatTranscript
              agentState={agentState}
              messages={messages}
              className="w-full"
            />
          </div>
        </div>

      </div>

      {/* Bottom Control Bar Container */}
      <div className="bg-[#111111] absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-6 py-2 shadow-2xl border border-gray-800 z-50">
        <AgentControlBar
          variant="livekit"
          controls={controls}
          isChatOpen={true}
          isConnected={session.isConnected}
          onDisconnect={session.end}
          onIsChatOpenChange={() => {}}
        />
      </div>
    </section>
  );
}
