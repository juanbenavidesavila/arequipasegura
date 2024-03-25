declare module "@alerta-ciudadana/entity" {
  interface Tracker {
    id: string;
    activator: boolean;
    foto: string;
    g: string;
    observacion: string;
    l: [number, number];
    lat_old: number;
    lng_old: number;
    phone: string;
    place: string;
    tipe: string;
    token: string;
    user: string;
    video: string;
    idemergencia: string;
    voz: Record<string, { mensaje_voz: string }>;
    componente: string;
  }
}
