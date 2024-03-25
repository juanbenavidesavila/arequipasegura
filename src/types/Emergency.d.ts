declare module "@alerta-ciudadana/entity" {
  interface Emergency {
    id: string;
    date: string;
    emergency: string;
    phone: string;
    place: string;
    status: string;
    timestamp: string;
    token: string;
    user: string;
    userId: string;
    video: string;
    coor: [number, number];
    values: string;
    attended: boolean;
    assessment: boolean;
    voz: Record<string, { mensaje_voz: string }>;
  }
}
