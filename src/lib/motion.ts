/**
 * Physics-driven motion system.
 *
 * Every animation in the site derives from one of these models instead of
 * hand-tuned magic numbers:
 *
 * 1. Damped harmonic oscillator (Hooke's law, F = -kx − cẋ):
 *      m·ẍ + c·ẋ + k·x = 0
 *    parameterized by damping ratio ζ = c / (2√(mk)) and natural
 *    frequency ω₀ = √(k/m).  ζ = 1 → critically damped (no overshoot),
 *    ζ < 1 → underdamped (overshoot of e^(−πζ/√(1−ζ²)) at first peak).
 *
 * 2. Exponential decay (Newton's law of cooling, dx/dt = −λx):
 *    x(t) = 1 − e^(−λt) — fast approach, asymptotic settle.
 *
 * 3. Logistic growth (Verhulst equation, dP/dt = rP(1 − P/K)):
 *    P(t) = 1 / (1 + e^(−k(t−t₀))) — the S-curve used for the loader.
 *
 * 4. Perspective projection (parallax): a layer at depth z shifts by
 *    s = S·(1 − 1/z) relative to the camera plane.
 *
 * 5. Gaussian field: f(r) = e^(−r²/2σ²) — smooth spatial falloff for
 *    magnetic attraction.
 *
 * 6. Simple harmonic motion / pendulum: T = 2π√(L/g).
 */

export type SpringPhysics = { stiffness: number; damping: number; mass: number };

/** Solve k and c for a desired damping ratio ζ and natural frequency ω₀ (rad/s). */
export function springFromPhysics(zeta: number, omega: number, mass = 1): SpringPhysics {
  const stiffness = mass * omega * omega; // k = m·ω₀²
  const damping = 2 * zeta * Math.sqrt(stiffness * mass); // c = 2ζ√(km)
  return { stiffness, damping, mass };
}

/* Spring presets — ζ chosen per role, ω₀ sets the speed (settling ≈ 4/(ζω₀) s) */
export const SPRING_DOT = springFromPhysics(1, 45); // cursor dot: critically damped, tight
export const SPRING_RING = springFromPhysics(0.65, 18); // cursor ring: lags with ~7% overshoot
export const SPRING_MAGNET = springFromPhysics(0.35, 15); // magnetic return: wobbly release
export const SPRING_MODAL = springFromPhysics(0.85, 16); // card→modal morph: barely overshoots
export const SPRING_NAV = springFromPhysics(1, 14); // nav slide: critically damped
export const SPRING_PILL = springFromPhysics(0.75, 22); // filter pill: snappy with a kiss of bounce
export const SPRING_TEXT = springFromPhysics(0.72, 9); // text masks: ~4% overshoot, ~0.6s settle

/**
 * Analytic step response of the underdamped oscillator, usable as an easing
 * function: x(t) = 1 − e^(−ζω₀t)(cos(ω_d t) + (ζω₀/ω_d)·sin(ω_d t)),
 * with damped frequency ω_d = ω₀√(1−ζ²).
 */
export function underdampedStep(zeta = 0.72, omega = 10) {
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  return (t: number) =>
    1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
}

/** Exponential decay ease, normalized so x(1) = 1 exactly: (1 − 2^(−10t)) / (1 − 2^(−10)). */
export function easeOutExpo(t: number) {
  return t >= 1 ? 1 : (1 - Math.pow(2, -10 * t)) / (1 - Math.pow(2, -10));
}

/** Exponential in-out — accelerating then decaying e^t curve, for curtain wipes. */
export function easeInOutExpo(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

/** Logistic S-curve normalized to [0,1] — organic "loading" progression. */
export function logistic(k = 9, t0 = 0.5) {
  const raw = (x: number) => 1 / (1 + Math.exp(-k * (x - t0)));
  const lo = raw(0);
  const hi = raw(1);
  return (t: number) => (raw(t) - lo) / (hi - lo);
}

/** Parallax factor for a layer at depth z (z = 1 is the content plane, larger = farther). */
export function parallaxFactor(z: number) {
  return 1 - 1 / z;
}

/** Gaussian falloff of attraction with distance r from an element's center. */
export function gaussianFalloff(r: number, sigma: number) {
  return Math.exp(-(r * r) / (2 * sigma * sigma));
}

/** Period of a pendulum of length L metres: T = 2π√(L/g). */
export function pendulumPeriod(lengthM: number, g = 9.81) {
  return 2 * Math.PI * Math.sqrt(lengthM / g);
}
