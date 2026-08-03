export const PASS = "pass";
export const WARN = "warn";
export const FAIL = "fail";
export const INFO = "info";

export function check(name, status, value, detail = "") {
  return { name, status, value: String(value ?? "—"), detail };
}

/** Worst status across a list of checks. */
export function rollup(checks) {
  if (checks.some((c) => c.status === FAIL)) return FAIL;
  if (checks.some((c) => c.status === WARN)) return WARN;
  return PASS;
}

/** 0-100 health score weighted by severity. */
export function score(sections) {
  const all = sections.flatMap((s) => s.checks).filter((c) => c.status !== INFO);
  if (!all.length) return 100;
  const points = all.reduce(
    (sum, c) => sum + (c.status === PASS ? 1 : c.status === WARN ? 0.5 : 0),
    0
  );
  return Math.round((points / all.length) * 100);
}
