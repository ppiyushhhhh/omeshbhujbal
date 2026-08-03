import tls from "node:tls";
import { config } from "../config.js";
import { check, PASS, WARN, FAIL, INFO } from "../lib/status.js";

function peerCert(hostname, port = 443) {
  return new Promise((resolve) => {
    const socket = tls.connect(
      { host: hostname, port, servername: hostname, timeout: config.timeoutMs },
      () => {
        const cert = socket.getPeerCertificate();
        const authorized = socket.authorized;
        socket.end();
        resolve({ cert, authorized });
      }
    );
    socket.on("error", (e) => resolve({ error: e.message }));
    socket.on("timeout", () => {
      socket.destroy();
      resolve({ error: "TLS handshake timeout" });
    });
  });
}

/** SSL certificate validity, issuer and days remaining. */
export async function sslCheck(state) {
  const hostname = new URL(config.siteUrl).hostname;
  const { cert, authorized, error } = await peerCert(hostname);

  if (error || !cert || !cert.valid_to) {
    return {
      id: "ssl",
      title: "SSL / TLS Certificate",
      checks: [check("Certificate", FAIL, "Unavailable", error || "No certificate returned")],
    };
  }

  const validTo = new Date(cert.valid_to);
  const days = Math.floor((validTo - Date.now()) / 86400000);
  state.sslDaysRemaining = days;

  return {
    id: "ssl",
    title: "SSL / TLS Certificate",
    checks: [
      check("Chain trusted", authorized ? PASS : FAIL, authorized ? "Valid" : "Untrusted"),
      check(
        "Days until expiry",
        days > config.thresholds.sslExpiryDays ? PASS : days > 0 ? WARN : FAIL,
        `${days} days`,
        `Expires ${validTo.toUTCString()}`
      ),
      check("Issuer", INFO, cert.issuer?.O || cert.issuer?.CN || "Unknown"),
      check("Subject", INFO, cert.subject?.CN || hostname),
    ],
  };
}
