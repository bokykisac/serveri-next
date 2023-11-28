export type Query = {
  type: "all" | "partner" | "server";
  hostname?: string;
  partnerName?: string;
};
