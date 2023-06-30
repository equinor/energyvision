import React from 'react'
import { useColorSchemeValue } from 'sanity'

export default function FotowareIcon() {
  const colorTheme = useColorSchemeValue()

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 400.000000 400.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
        fill={colorTheme === 'dark' ? '#fff' : '#000'}
        stroke="none"
      >
        <path
          d="M1797 3962 l-47 -7 631 -630 c383 -382 650 -657 680 -699 125 -176
133 -410 19 -568 -104 -146 -286 -208 -479 -163 -123 29 -169 62 -406 295
-265 260 -288 275 -432 275 -86 0 -94 -2 -135 -30 -67 -48 -93 -103 -93 -200
0 -131 19 -160 274 -420 177 -179 222 -232 249 -285 44 -88 62 -160 62 -252 0
-214 -134 -384 -342 -433 -78 -18 -125 -19 -209 -1 -140 30 -184 61 -420 293
-254 250 -281 268 -414 268 -124 0 -168 -25 -337 -192 l-138 -137 31 -55 c136
-242 353 -476 594 -640 226 -154 444 -247 725 -308 118 -26 139 -27 385 -27
244 0 267 1 385 26 407 88 750 275 1025 560 271 279 438 596 523 988 25 118
26 141 26 385 0 247 -1 266 -27 388 -86 395 -266 728 -541 1002 -291 289 -637
471 -1041 546 -116 22 -451 34 -548 21z"
        />
        <path
          d="M1370 3870 c-290 -99 -551 -261 -765 -475 -470 -471 -667 -1134 -534
-1800 19 -95 80 -293 99 -325 7 -12 36 12 137 112 108 107 140 133 203 162
144 68 300 69 445 3 62 -28 94 -55 290 -247 261 -257 287 -274 425 -274 69 -1
93 3 126 21 121 65 168 212 113 359 -20 53 -44 81 -230 270 -217 221 -274 294
-308 397 -117 351 144 650 501 576 29 -6 87 -27 128 -47 67 -32 98 -59 296
-254 181 -178 232 -223 280 -245 68 -31 166 -41 230 -24 54 15 127 80 149 133
25 61 22 154 -5 230 -22 62 -39 79 -724 766 -479 480 -707 702 -721 701 -11 0
-72 -18 -135 -39z"
        />
      </g>
    </svg>
  )
}
