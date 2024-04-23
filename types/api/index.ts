export type SelectOption = {
  id: string | number;
  name: string;
};

export type PartnerDetail = {
  contact: string;
  email: string;
  id: string;
  name: string;
  phone: string;
};

export type VPNType = {
  id: number;
  name: string;
};

export type VPNConnection = {
  description: string;
  file: string;
  filename: string;
  groupPassword: string;
  groupUsername: string;
  id: number;
  ipAddress: string;
  password: string;
  presharedKey: string;
  serverVpnType: VPNType;
  username: string;
};

export type OS = {
  id: string;
  name: string;
};

export type Server = {
  active: boolean;
  comment: string;
  consultant: string;
  consultantId: number;
  cpuNumber: number;
  cpuType: string;
  hddDescription: string;
  hostname: string;
  id: number;
  installationDate: string;
  ipAddress: string;
  ipAddress2: string;
  model: string;
  ram: string;
  role: string;
  serverOS: OS;
};

export type ServerFunctionType = {
  id: string;
  name: string;
};

export type ServerFunction = {
  adminAccount: boolean;
  custom1: string;
  custom2: string;
  custom3: string;
  description: string;
  id: number;
  location: string;
  password: string;
  port: string;
  proccessInstanceUrl: string;
  serverFunctionType: ServerFunctionType;
  username: string;
  version: string;
};

export type Backupinfo = {
  id: number;
  time: string;
  partnerName: string;
  hostname: string;
  publicIp: string;
  name: string;
  actionObject: string;
  size: string;
  duration: string;
  speed: string;
  comment: string;
  actionOk: boolean;
  version: number;
};
