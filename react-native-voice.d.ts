declare module 'react-native-voice' {
  export type VoiceStartEvent = {
    error: boolean;
  };

  export type VoiceResultsEvent = {
    value: string[];
  };

  export type VoiceErrorEvent = {
    error: {
      code: string;
      message: string;
    };
  };

  export interface Voice {
    onSpeechStart: (e: VoiceStartEvent) => void;
    onSpeechResults: (e: VoiceResultsEvent) => void;
    onSpeechError: (e: VoiceErrorEvent) => void;
    start: (locale: string) => Promise<void>;
    stop: () => Promise<void>;
    destroy: () => Promise<void>;
    removeAllListeners: () => void;
  }

  const Voice: Voice;
  export default Voice;
}
