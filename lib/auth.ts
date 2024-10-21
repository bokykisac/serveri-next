import { NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import UAParser from "ua-parser-js";
import dns from "dns";

function getIPv4Address(ipAddress: string) {
  // Check if it's IPv6 format
  if (ipAddress === "::1") {
    return "127.0.0.1";
  }

  // Handle full IPv6 to IPv4-mapped address (e.g., "::ffff:192.168.1.1")
  if (ipAddress.startsWith("::ffff:")) {
    return ipAddress.split(":").pop(); // Extract the IPv4 part
  }

  // If it's already IPv4, just return it
  if (ipAddress.includes(".")) {
    return ipAddress;
  }

  // Otherwise, it's an IPv6 address, and we might not have a direct IPv4 equivalent
  return "?";
}

async function getGeolocation(ipAddress: string) {
  const apiKey = process.env.IPINFO_API_KEY;

  try {
    const response = await axios.get(
      `https://ipinfo.io/${ipAddress}?token=${apiKey}`,
    );
    const data = response.data;

    return {
      ip: data.ip,
      city: data.city || "Unknown",
      region: data.region || "Unknown",
      country: data.country || "Unknown",
      loc: data.loc || "Unknown",
      postal: data.postal || "Unknown",
      timezone: data.timezone || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    return {};
  }
}

async function getHostname(ipAddress: string) {
  return new Promise((resolve, reject) => {
    dns.reverse(ipAddress, (err, hostnames) => {
      if (err) {
        console.error("Reverse DNS lookup failed:", err);
        resolve(null); // If reverse lookup fails, return null
      } else {
        resolve(hostnames[0]); // Return the first hostname found
      }
    });
  });
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProviders({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        axios.defaults.baseURL = process.env.JAVA_API_URL;

        let ipAddress = "Unknown";
        let userAgent = "";

        if (req.headers) {
          // Get client IP address
          ipAddress = req.headers["x-forwarded-for"];
          // Get User-Agent (device information)
          userAgent = req.headers["user-agent"];
        }

        const ip = getIPv4Address(ipAddress);

        const parser = new UAParser(userAgent);
        const result = parser.getResult();

        const browserName = result.browser.name || "Unknown";
        const browserVersion = result.browser.version || "Unknown";
        const osName = result.os.name || "Unknown";
        const osVersion = result.os.version || "Unknown";
        const deviceName = result.device.vendor || "Unknown";
        const deviceModel = result.device.model || "Unknown";

        const geoData = await getGeolocation(ipAddress);

        const hostname = await getHostname(ipAddress);

        await axios.post("/activity-log/save", {
          username,
          browserName,
          browserVersion,
          osName,
          osVersion,
          deviceName,
          deviceModel,
          hostname,
          action: "login",
          date: Date.now(),
          ...geoData,
          ip,
        });

        try {
          const { data } = await axios.post("/auth/login", {
            username,
            password,
          });

          return data;
        } catch (err) {
          //TODO: refactor those errors
          if (err instanceof AxiosError) {
            if (err?.response?.status !== 401) {
              throw new Error("Internal Server Error.");
            }

            throw new Error("Invalid credentials.");
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ token, session }) {
      session.user = token;
      return session;
    },
  },
};
