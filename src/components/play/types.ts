/** Data shapes for the /play page components. */

export interface Poster {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** scattered start state, relative to the poster's final grid slot (px / deg) */
  from: { x: number; y: number; s: number; rz?: number; rx?: number; ry?: number };
}

export interface Painting {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** image width as a fraction of the 400px card (default 354/400) */
  size?: number;
  /** start tilt in degrees (default −40) */
  tilt?: number;
}
