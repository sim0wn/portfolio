import { SVGProps } from "react"

export function Lettermark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 300 300"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <linearGradient id="a">
          <stop offset={0} stopColor="#35243d" />
          <stop offset={0.6} stopColor="#732961" />
        </linearGradient>
        <linearGradient
          xlinkHref="#a"
          id="b"
          x1={34.757}
          x2={237.31}
          y1={273.326}
          y2={27.728}
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        />
      </defs>
      <path
        fill="url(#b)"
        stroke="#34233c"
        d="M159.035.525q-24.094.001-42.765 7.43-18.671 7.228-31.52 19.475Q71.9 39.676 65.275 55.336t-6.627 32.123q.001 20.479 5.623 34.533 5.622 13.853 14.657 23.29a79.8 79.8 0 0 0 20.879 15.058 194 194 0 0 0 23.892 9.637 760 760 0 0 0 23.89 7.027q11.646 3.212 20.68 7.428 9.236 4.215 14.858 10.64t5.621 16.664q0 17.669-10.238 25.9-10.24 8.032-28.711 8.032-13.653 0-23.692-3.814-10.038-3.816-17.867-8.434a2938 2938 0 0 1-13.853-8.432q-6.024-3.814-12.047-3.814-4.618 0-8.633 2.408-3.815 2.21-6.225 5.623l-20.076 31.72q8.633 8.634 20.278 15.66 11.645 7.029 24.896 12.249a172.4 172.4 0 0 0 27.305 7.83q14.254 2.81 27.906 2.81 24.896 0 44.371-7.43 19.675-7.628 32.926-20.679 13.452-13.251 20.478-30.918 7.028-17.667 7.028-37.945 0-18.27-5.621-31.12-5.621-13.05-14.858-22.085-9.035-9.035-20.88-14.858a196 196 0 0 0-23.891-10.037 386 386 0 0 0-24.094-7.83q-11.644-3.614-20.879-7.83-9.034-4.215-14.656-10.039-5.621-5.822-5.621-14.656 0-13.854 9.234-21.885 9.436-8.231 28.51-8.23 11.042 0 19.676 3.011 8.632 2.81 15.257 6.424 6.827 3.614 12.047 6.625 5.42 2.81 10.04 2.81 5.22.001 8.431-2.407 3.412-2.41 6.424-7.229l16.865-31.521q-7.83-7.227-17.869-12.848-9.838-5.823-21.281-9.838-11.445-4.216-24.293-6.225-12.649-2.208-26.1-2.209Z"
        fontFamily="Lato"
        fontSize={401.542}
        fontWeight={900}
        paintOrder="stroke fill markers"
      />
    </svg>
  )
}