export type Query = {
  type: "all" | "partner" | "server";
  hostname?: string;
  partnerName?: string;
};

export type Colleauge = {
  id: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  premise: string | null;
  email: string;
};
