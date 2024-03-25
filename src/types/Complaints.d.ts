declare module "@alerta-ciudadana/entity" {
  interface Complaint {
    id: string;
    userId: string;
    avatarUrl: string;
    coordinates: [number, number];
    date: string;
    message: string;
    phone: string;
    place: string;
    status: string;
    timestamp: string;
    token: string;
    user: string;
    description: string;
    type: string;
    fecha?:string;
    imgperfil?:string;
    nombres?:string
    descripciondenuncia?:string;
    telefono?:string;
    direccion?:string;
    mensaje?:string;
    ocurrencia?:string;
    tiporeporte?:string;
    imagen1?:string;
    imagen2?:string;
    imagen3?:string;
    interes?:string;
    identificacion?:string
  }
}
