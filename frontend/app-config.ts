export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  audioVisualizerType?: 'bar' | 'wave' | 'grid' | 'radial' | 'aura';
  audioVisualizerColor?: `#${string}`;
  audioVisualizerColorDark?: `#${string}`;
  audioVisualizerColorShift?: number;
  audioVisualizerBarCount?: number;
  audioVisualizerGridRowCount?: number;
  audioVisualizerGridColumnCount?: number;
  audioVisualizerRadialBarCount?: number;
  audioVisualizerRadialRadius?: number;
  audioVisualizerWaveLineWidth?: number;

  // agent dispatch configuration
  agentName?: string;

  // LiveKit Cloud Sandbox configuration
  sandboxId?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'JanSahayak AI',
  pageTitle: 'JanSahayak AI - Your Voice. Your Government.',
  pageDescription: 'An AI-powered voice assistant that helps Indian citizens access government schemes, public services, and file civic complaints.',

  supportsChatInput: true,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/jansahayak-logo.svg', // Assuming a generic logo name, we can just use text in the navbar
  accent: '#1E40AF', // Deep Blue
  logoDark: '/jansahayak-logo-dark.svg',
  accentDark: '#60A5FA',
  startButtonText: 'Start Voice Conversation',

  audioVisualizerType: 'wave',
  audioVisualizerColor: '#1E40AF',
  audioVisualizerColorDark: '#60A5FA',
  audioVisualizerWaveLineWidth: 3,

  agentName: process.env.AGENT_NAME ?? undefined,
  sandboxId: undefined,
};
