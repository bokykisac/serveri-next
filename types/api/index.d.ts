export type Partner = {
  id: string;
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
  serverVpnType: VPNType[];
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
  installationDate: Date;
  ipAddress: string;
  ipAddress2: string;
  model: string;
  ram: string;
  role: string;
  serverOs: OS;
};
