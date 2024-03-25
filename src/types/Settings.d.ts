interface Settings {
  app: AppSettings;
  map: MapSettings;
}

interface Message {
  id: string;
  message: string;
  timestamp: string;
}

interface AppSettings {
  version: string;
  phone: string;
  defaultMessages: Message[];
}

interface MapSettings {
  center: google.maps.LatLngAltitude;
  key: string;
}
