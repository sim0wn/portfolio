import { SVGProps } from "react"

export function Lettermark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={"1em"}
      viewBox="0 0 300 300"
      width={"1em"}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <linearGradient id="a">
          <stop offset={0} stopColor="#7c3aed" />
          <stop offset={1} stopColor="#4e216b" />
        </linearGradient>
        <linearGradient id="b">
          <stop offset={0} stopColor="#7c3aed" />
          <stop offset={1} stopColor="#4e216b" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="d"
          x1={241.818}
          x2={56.221}
          xlinkHref="#a"
          y1={176.329}
          y2={-9.268}
        />
        <linearGradient
          gradientTransform="rotate(180 149.51 147.079)"
          gradientUnits="userSpaceOnUse"
          id="c"
          x1={209.639}
          x2={88.4}
          xlinkHref="#b"
          y1={188.526}
          y2={-21.465}
        />
      </defs>
      <g
        fontFamily="Lato"
        fontSize={392.027}
        fontWeight={900}
        paintOrder="stroke fill markers"
        strokeWidth={0.5}
        textAnchor="middle"
      >
        <path
          d="M150.588 291.167c57.628 0 92.91-31.363 92.91-82.326a90 90 0 0 0-.393-8.238c-2.94-32.108-23.13-57.328-54.882-70.278v74.596c0 7.063-1.522 13.22-4.381 18.342-6.028 10.795-18.071 16.941-34.822 16.941-6.716 0-12.648-1.018-17.77-2.894-11.218-4.988-17.514-14.82-17.514-28.077H56.502c0 17.013 4.202 31.901 11.988 44.159.259.393.507.793.772 1.181.15.226.308.446.46.67 7.04 10.064 16.44 18.3 27.882 24.332l.26.135c.856.448 1.736.87 2.615 1.293.87.411 1.736.824 2.628 1.21l.239.104c13.178 5.676 28.805 8.743 46.425 8.836.275.001.542.014.817.014"
          fill="url(#c)"
          style={{
            textAlign: "center",
          }}
          transform="translate(6.835 9.162)scale(.95757)"
        />
        <path
          d="M116.797 165.74c7.734 2.765 15.852 4.583 23.904 6.488 9.136 2.167 18.352 4.219 27.447 6.626 5.519 1.468 10.564 4.349 15.055 7.828v-57.91c-9.795-2.963-19.839-4.825-29.772-7.222-7.482-1.73-15.03-3.25-22.362-5.562-5.22-1.823-10.08-4.655-14.272-8.26z"
          fill="#4e216b"
          style={{
            textAlign: "center",
          }}
          transform="translate(6.835 9.162)scale(.95757)"
        />
        <path
          d="M148.432 2.99c-57.628 0-92.91 31.363-92.91 82.326 0 2.796.145 5.537.392 8.239 2.94 32.107 23.131 57.328 54.883 70.277V89.236c0-7.063 1.521-13.22 4.38-18.341 6.03-10.796 18.073-16.942 34.823-16.942 6.716 0 12.648 1.018 17.77 2.895 11.218 4.987 17.513 14.819 17.513 28.076h57.235c0-17.013-4.203-31.9-11.989-44.158-.258-.394-.506-.794-.771-1.182-.15-.226-.309-.446-.461-.67-7.04-10.063-16.44-18.3-27.881-24.332l-.26-.135c-.856-.448-1.736-.87-2.615-1.293-.87-.41-1.737-.823-2.629-1.21l-.238-.104c-13.179-5.676-28.806-8.743-46.426-8.836-.274-.002-.541-.014-.816-.014"
          fill="url(#d)"
          style={{
            textAlign: "center",
          }}
          transform="translate(6.835 9.162)scale(.95757)"
        />
      </g>
    </svg>
  )
}
