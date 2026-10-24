import type { IllustrationName } from '../data';

const ink = '#17324d';

function Picture({ children }: { children: React.ReactNode }) {
  return (
    <g stroke={ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  );
}

const pictures: Record<IllustrationName, React.ReactNode> = {
  casa: (
    <Picture>
      <path d="M67 91L130 39l63 52v80H67z" fill="#fff4d6" />
      <path d="M48 94l82-66 82 66-17 15-65-51-65 51z" fill="#ef665f" />
      <path d="M160 52V29h24v42" fill="#f5a94f" />
      <path d="M157 29h30" fill="none" />
      <rect x="112" y="111" width="39" height="60" rx="4" fill="#48a89b" />
      <circle cx="141" cy="141" r="3.5" fill="#ffd84d" stroke="none" />
      <rect x="78" y="105" width="25" height="27" rx="3" fill="#88d9ee" />
      <path d="M90.5 106v25M79 118.5h23" fill="none" strokeWidth="3" />
      <rect x="159" y="105" width="23" height="27" rx="3" fill="#88d9ee" />
      <path d="M170.5 106v25M160 118.5h21" fill="none" strokeWidth="3" />
      <path d="M42 171h176" fill="none" />
      <path d="M45 170v-19c11-10 23-3 24 9 7-5 15 0 16 10M177 170v-13c8-11 22-7 23 4 8-6 15 0 16 9" fill="#62c777" />
      <path d="M82 76h96" stroke="#d94c50" strokeWidth="4" />
    </Picture>
  ),
  sole: (
    <Picture>
      <g fill="none" stroke="#f2a93b" strokeWidth="9">
        <path d="M130 20v17M130 162v17M50 100H33M227 100h-17M73 43l12 13M187 157l-12-13M73 157l12-13M187 43l-12 13M96 27l7 16M164 173l-7-16M164 27l-7 16M96 173l7-16" />
      </g>
      <circle cx="130" cy="100" r="63" fill="#ffd84d" />
      <path d="M91 72c16-24 53-31 76-10" fill="none" stroke="#fff0a0" strokeWidth="8" />
      <rect x="101" y="88" width="10" height="14" rx="4" fill={ink} stroke="none" />
      <rect x="150" y="88" width="10" height="14" rx="4" fill={ink} stroke="none" />
      <path d="M112 122c10 12 27 12 37 0" fill="none" />
      <circle cx="91" cy="116" r="8" fill="#f5a077" stroke="none" />
      <circle cx="169" cy="116" r="8" fill="#f5a077" stroke="none" />
    </Picture>
  ),
  mela: (
    <Picture>
      <path d="M132 65c-4-25 8-38 21-45" fill="none" stroke="#825539" strokeWidth="8" />
      <path d="M139 47c8-25 37-28 52-20-4 24-28 34-52 20z" fill="#62c777" />
      <path d="M130 69c38-26 78-2 74 43-4 43-37 68-72 49-4-2-8-2-12 0-35 19-68-6-72-49-4-45 36-69 74-43z" fill="#ef665f" />
      <path d="M130 69c-7 12-8 20-7 30" fill="none" stroke="#d94c50" />
      <path d="M80 89c-12 13-14 30-9 43" fill="none" stroke="#ffaaa0" strokeWidth="9" />
      <path d="M103 166c16 6 38 6 54-1" fill="none" stroke="#d94c50" strokeWidth="4" />
    </Picture>
  ),
  gatto: (
    <Picture>
      <path d="M173 130c38 5 43-29 23-36-12-4-20 5-15 15" fill="none" stroke="#e99645" strokeWidth="17" />
      <path d="M173 130c38 5 43-29 23-36-12-4-20 5-15 15" fill="none" />
      <ellipse cx="128" cy="132" rx="57" ry="43" fill="#f5a94f" />
      <path d="M82 146l-8 25h34l4-21M155 151l3 20h34l-14-31" fill="#f5a94f" />
      <path d="M78 89L72 37l36 25M148 62l35-25-5 55" fill="#f5a94f" />
      <path d="M82 55l3 24 15-13zM169 55l-4 24-14-13z" fill="#f6a38d" strokeWidth="3" />
      <path d="M75 84c0-34 25-50 54-50s54 16 54 50v25c0 29-24 43-54 43s-54-14-54-43z" fill="#f5a94f" />
      <path d="M116 39l-4 19M132 37v20M148 41l4 18" fill="none" stroke="#c97838" strokeWidth="5" />
      <path d="M95 92h12M152 92h12" fill="none" strokeWidth="7" />
      <path d="M123 105l6 5 6-5-6-5z" fill="#d86f6b" strokeWidth="3" />
      <path d="M129 110v7m0 0c-6 7-13 4-15 0m15 0c6 7 13 4 15 0" fill="none" strokeWidth="3" />
      <path d="M105 108H69M103 118H67M153 108h36M155 118h36" fill="none" strokeWidth="3" />
      <path d="M89 171h104" fill="none" />
    </Picture>
  ),
  fiore: (
    <Picture>
      <path d="M130 100v73" fill="none" stroke="#429e62" strokeWidth="9" />
      <path d="M127 135c-28 1-40-13-42-30 25-3 41 8 42 30zM133 150c27 0 39-13 42-29-24-4-40 8-42 29z" fill="#62c777" />
      <path d="M107 66c-31-12-31-44-12-50 15-5 27 8 33 23 3-25 18-36 33-29 20 9 14 36-1 52 26-10 45 2 43 20-2 21-29 26-51 16 16 22 11 47-8 49-17 2-26-17-25-36-11 21-35 25-46 10-14-19 4-40 34-55z" fill="#f28db5" />
      <circle cx="132" cy="82" r="34" fill="#ffd84d" />
      <circle cx="120" cy="75" r="4" fill={ink} stroke="none" />
      <circle cx="144" cy="75" r="4" fill={ink} stroke="none" />
      <path d="M122 91c6 6 14 6 20 0" fill="none" strokeWidth="3" />
      <path d="M87 174h88" fill="none" />
    </Picture>
  ),
  pesce: (
    <Picture>
      <path d="M71 102L26 65c-7 27-7 51 0 76z" fill="#ffd84d" />
      <path d="M186 74c-5-32-30-45-49-43l-5 37M180 132c-4 26-25 39-43 39l-7-32" fill="#55b8dc" />
      <path d="M49 101c23-55 89-72 140-38 14 9 25 23 33 38-8 16-19 29-33 39-51 34-117 16-140-39z" fill="#67c9e8" />
      <path d="M92 67c16 21 16 48 0 68M127 54c17 30 17 63 0 93" fill="none" stroke="#3aa5ca" strokeWidth="4" />
      <path d="M157 83c8-7 18-7 26 0" fill="none" stroke="#9de4f3" strokeWidth="6" />
      <circle cx="184" cy="94" r="8" fill="white" />
      <circle cx="187" cy="94" r="4" fill={ink} stroke="none" />
      <path d="M200 119c7 4 13 3 18-2" fill="none" strokeWidth="3" />
      <circle cx="203" cy="47" r="8" fill="none" stroke="#67c9e8" strokeWidth="4" />
      <circle cx="225" cy="29" r="5" fill="none" stroke="#67c9e8" strokeWidth="4" />
    </Picture>
  ),
  albero: (
    <Picture>
      <path d="M108 102l-8 69h64l-15-69z" fill="#a96e43" />
      <path d="M128 114l-19-22M139 121l24-28" fill="none" stroke="#825539" strokeWidth="6" />
      <path d="M65 115c-28-4-35-40-14-54-4-30 31-46 52-30 13-29 56-25 64 5 30-8 52 19 41 43 23 17 11 52-17 52-15 20-45 18-57 2-20 19-52 15-69-18z" fill="#62c777" />
      <path d="M73 60c16-20 39-18 50-10M153 45c16 1 27 10 30 23" fill="none" stroke="#93df8c" strokeWidth="8" />
      <circle cx="83" cy="88" r="9" fill="#ef665f" />
      <circle cx="169" cy="91" r="9" fill="#ef665f" />
      <circle cx="125" cy="56" r="9" fill="#ef665f" />
      <path d="M76 172h113" fill="none" />
      <path d="M83 171c2-13 8-17 15-17M174 171c-1-12-7-17-14-18" fill="none" stroke="#429e62" strokeWidth="4" />
    </Picture>
  ),
  libro: (
    <Picture>
      <path d="M29 55c37-13 70-8 101 14 31-22 64-27 101-14v103c-38-11-71-5-101 17-30-22-63-28-101-17z" fill="#ef665f" />
      <path d="M39 45c34-10 64-3 91 19v97c-27-21-57-28-91-18z" fill="#fff8e8" />
      <path d="M221 45c-34-10-64-3-91 19v97c27-21 57-28 91-18z" fill="#fff8e8" />
      <path d="M130 64v97" fill="none" />
      <path d="M55 74c20-3 38 1 55 11M55 94c20-3 38 1 55 11M55 114c20-3 38 1 55 11M150 85c17-10 35-14 55-11M150 105c17-10 35-14 55-11M150 125c17-10 35-14 55-11" fill="none" stroke="#7db4cf" strokeWidth="4" />
      <path d="M151 53v50l12-9 12 7V49" fill="#ffd84d" />
      <path d="M48 41c29-6 56 2 82 23 26-21 53-29 82-23" fill="none" stroke="#fff" strokeWidth="4" />
    </Picture>
  ),
  tartaruga: (
    <Picture>
      <path d="M66 133l-17 28h35l12-24M151 137l7 25h35l-20-35" fill="#79c96b" />
      <path d="M183 105c23-25 50-12 48 10-2 20-23 28-45 16" fill="#79c96b" />
      <circle cx="215" cy="109" r="4" fill={ink} stroke="none" />
      <path d="M218 124c4 2 8 1 10-2" fill="none" strokeWidth="3" />
      <path d="M39 120c-16 0-22-9-25-17 14-4 25 0 32 10" fill="#79c96b" />
      <path d="M40 125c0-57 42-91 91-85 44 5 70 41 64 94-47 24-107 23-155-9z" fill="#62b95e" />
      <path d="M58 116c3-39 31-62 68-60 33 2 53 28 53 67-35 17-83 15-121-7z" fill="#9bd264" strokeWidth="4" />
      <path d="M111 57L93 88l22 29 34-4 10-34-28-21zM93 88l-35 28M115 117l-8 18M149 113l16 19M159 79l22-6M111 57L99 47" fill="none" stroke="#5c9d50" strokeWidth="4" />
      <path d="M51 139c37 21 100 29 144 5" fill="none" stroke="#429e62" strokeWidth="5" />
    </Picture>
  ),
  elefante: (
    <Picture>
      <path d="M71 130v41h31l7-39M139 132v39h31l4-50" fill="#93b9cb" />
      <path d="M47 93c0-40 34-62 76-55 42 6 66 35 59 78-7 40-47 49-88 38-32-8-47-29-47-61z" fill="#a9ccda" />
      <path d="M50 84C30 76 20 60 24 44c20 2 34 14 42 32" fill="#a9ccda" />
      <path d="M147 66c15-37 61-29 66 4 4 28-12 50-39 51" fill="#a9ccda" />
      <path d="M181 84c7 33 2 65-12 86-7 10-24 5-21-8 2-8 12-7 18-3" fill="none" stroke="#a9ccda" strokeWidth="25" />
      <path d="M181 84c7 33 2 65-12 86-7 10-24 5-21-8 2-8 12-7 18-3" fill="none" />
      <path d="M166 53c-23 2-35 25-25 45 8 16 25 18 39 8" fill="#83adbf" />
      <circle cx="187" cy="67" r="5" fill={ink} stroke="none" />
      <path d="M198 91c5 2 9 1 12-3" fill="none" strokeWidth="3" />
      <path d="M69 171h105" fill="none" />
      <path d="M79 153h20M145 153h20" fill="none" stroke="#7b9dad" strokeWidth="3" />
    </Picture>
  ),
  aquilone: (
    <Picture>
      <path d="M132 17l66 67-66 67-66-67z" fill="#ffd84d" />
      <path d="M132 17v134L66 84z" fill="#ef665f" />
      <path d="M132 17l66 67h-66z" fill="#67c9e8" />
      <path d="M132 17v134M66 84h132" fill="none" strokeWidth="4" />
      <path d="M132 151c-5 22 29 20 20 39-6 13-28 2-36 12" fill="none" stroke="#825539" strokeWidth="4" />
      <path d="M145 172l-16-9-2 16zM136 190l-15-8-3 14z" fill="#62c777" />
      <path d="M48 43l4 9 10 1-8 7 3 10-9-5-9 5 2-10-7-7 10-1zM207 137l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#fff9df" strokeWidth="3" />
    </Picture>
  ),
  cane: (
    <Picture>
      <path d="M70 132c-28-4-35-29-19-37 10-5 19 2 17 12" fill="none" stroke="#b77b4d" strokeWidth="16" />
      <path d="M70 132c-28-4-35-29-19-37 10-5 19 2 17 12" fill="none" />
      <ellipse cx="128" cy="128" rx="61" ry="40" fill="#d99a61" />
      <path d="M88 145l-5 27h32l6-25M151 146l4 26h33l-12-32" fill="#d99a61" />
      <path d="M78 80c-13-25-7-47 9-49 17-2 28 15 28 35M145 65c5-26 21-39 35-30 15 10 11 35-3 55" fill="#9a633f" />
      <path d="M75 88c0-35 24-53 55-53 34 0 58 21 55 58-3 35-25 53-56 53-32 0-54-23-54-58z" fill="#d99a61" />
      <path d="M101 104c5-19 46-22 58 0 12 23-6 40-29 40-22 0-35-20-29-40z" fill="#fff0d2" />
      <circle cx="103" cy="84" r="5" fill={ink} stroke="none" />
      <circle cx="155" cy="84" r="5" fill={ink} stroke="none" />
      <path d="M121 103l8 6 8-6-8-6z" fill={ink} />
      <path d="M129 110v7m0 0c-7 7-14 3-16-1m16 1c7 7 14 3 16-1" fill="none" strokeWidth="3" />
      <path d="M135 125c4 14 17 12 18 1" fill="#f08f9d" strokeWidth="3" />
      <path d="M78 172h110" fill="none" />
      <path d="M169 56l12 10" fill="none" stroke="#ffd84d" strokeWidth="7" />
    </Picture>
  ),
  luna: (
    <Picture>
      <path d="M165 24c-51-8-96 33-92 86 4 51 50 76 96 54-48-4-70-79-4-140z" fill="#ffd84d" />
      <path d="M110 62c-16 19-21 44-13 65" fill="none" stroke="#fff0a6" strokeWidth="8" />
      <circle cx="113" cy="102" r="4.5" fill={ink} stroke="none" />
      <path d="M104 125c8 6 17 6 24 0" fill="none" strokeWidth="3" />
      <circle cx="93" cy="119" r="7" fill="#f3a58d" stroke="none" />
      <path d="M47 44l4 9 10 1-8 7 3 10-9-5-9 5 2-10-7-7 10-1zM204 82l4 9 10 1-8 7 3 10-9-5-9 5 2-10-7-7 10-1zM192 151l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#fff9df" strokeWidth="3" />
    </Picture>
  ),
  palla: (
    <Picture>
      <circle cx="130" cy="102" r="70" fill="#ffd84d" />
      <path d="M130 32c-23 18-35 42-35 70s12 52 35 70c23-18 35-42 35-70s-12-52-35-70z" fill="#67c9e8" />
      <path d="M130 32c-42 0-72 29-70 65 20-9 42-8 60 3-4-28 1-51 10-68z" fill="#ef665f" />
      <path d="M130 172c42 0 72-29 70-65-20 9-42 8-60-3 4 28-1 51-10 68z" fill="#62c777" />
      <circle cx="130" cy="102" r="70" fill="none" />
      <path d="M95 102c0-28 12-52 35-70 23 18 35 42 35 70s-12 52-35 70c-23-18-35-42-35-70zM60 97c20-9 42-8 60 3M140 100c18-11 40-12 60-3" fill="none" strokeWidth="3" />
      <circle cx="130" cy="102" r="10" fill="#fff9e9" />
      <path d="M83 60c10-11 23-18 36-21" fill="none" stroke="#fff" strokeWidth="6" opacity="0.65" />
    </Picture>
  ),
  nave: (
    <Picture>
      <path d="M130 29v101" fill="none" stroke="#825539" strokeWidth="7" />
      <path d="M122 42L63 108h59z" fill="#fff5d6" />
      <path d="M139 38l51 70h-51z" fill="#67c9e8" />
      <path d="M130 29h35l-8 12h-27z" fill="#ffd84d" />
      <path d="M39 119h183l-25 48H67z" fill="#ef665f" />
      <path d="M53 132h157l-6 11H59z" fill="#fff5d6" strokeWidth="3" />
      <path d="M67 167h130" fill="none" />
      <path d="M26 179c14-8 27-8 41 0s27 8 41 0 27-8 41 0 27 8 41 0 27-8 44 0" fill="none" stroke="#67c9e8" strokeWidth="5" />
      <circle cx="94" cy="151" r="5" fill="#ffd84d" strokeWidth="3" />
      <circle cx="130" cy="151" r="5" fill="#ffd84d" strokeWidth="3" />
      <circle cx="166" cy="151" r="5" fill="#ffd84d" strokeWidth="3" />
    </Picture>
  ),
  gelato: (
    <Picture>
      <path d="M93 106h76l-38 80z" fill="#dfa15e" />
      <path d="M108 126l43 36M151 121l-31 49M101 112h61" fill="none" stroke="#ad7145" strokeWidth="3" />
      <circle cx="99" cy="91" r="31" fill="#f3a5c5" />
      <circle cx="161" cy="91" r="31" fill="#8fd8b0" />
      <circle cx="130" cy="65" r="38" fill="#fff0c2" />
      <path d="M112 44c8-12 25-16 37-8" fill="none" stroke="#fff" strokeWidth="6" opacity="0.7" />
      <path d="M130 28c-2-12 5-19 15-21" fill="none" stroke="#429e62" strokeWidth="4" />
      <circle cx="130" cy="27" r="11" fill="#ef665f" />
      <circle cx="119" cy="62" r="4" fill={ink} stroke="none" />
      <circle cx="141" cy="62" r="4" fill={ink} stroke="none" />
      <path d="M122 77c5 5 11 5 16 0" fill="none" strokeWidth="3" />
    </Picture>
  ),
  fungo: (
    <Picture>
      <path d="M104 97h53l13 72H91z" fill="#fff0d2" />
      <path d="M103 133c15 8 37 8 54 0" fill="none" stroke="#e1cba8" strokeWidth="4" />
      <path d="M41 99c0-48 39-77 89-77s89 29 89 77c-49 15-129 15-178 0z" fill="#ef665f" />
      <path d="M42 99c49 15 129 15 178 0" fill="none" />
      <circle cx="84" cy="63" r="13" fill="#fff9e9" stroke="none" />
      <circle cx="139" cy="45" r="15" fill="#fff9e9" stroke="none" />
      <circle cx="179" cy="74" r="11" fill="#fff9e9" stroke="none" />
      <circle cx="119" cy="83" r="9" fill="#fff9e9" stroke="none" />
      <circle cx="120" cy="128" r="4" fill={ink} stroke="none" />
      <circle cx="142" cy="128" r="4" fill={ink} stroke="none" />
      <path d="M123 143c5 5 11 5 16 0" fill="none" strokeWidth="3" />
      <path d="M63 171c2-15 8-22 17-25M184 171c-2-15-8-22-17-25" fill="none" stroke="#62c777" strokeWidth="6" />
    </Picture>
  ),
  bicicletta: (
    <Picture>
      <circle cx="65" cy="137" r="38" fill="#eaf7f7" />
      <circle cx="195" cy="137" r="38" fill="#eaf7f7" />
      <circle cx="65" cy="137" r="6" fill="#ffd84d" />
      <circle cx="195" cy="137" r="6" fill="#ffd84d" />
      <path d="M65 137l39-60 34 60H65l28-39h69l33 39M138 137l24-66M104 77H87M151 71h28M162 71l33 66M93 98l-12-25" fill="none" stroke="#ef665f" strokeWidth="6" />
      <path d="M104 77l34 60M93 98l45 39" fill="none" stroke="#67c9e8" strokeWidth="5" />
      <path d="M76 67h27" fill="none" stroke="#17324d" strokeWidth="7" />
      <path d="M156 61h29v10" fill="none" strokeWidth="5" />
      <path d="M177 81h43l-7 30h-31z" fill="#ffd84d" />
      <path d="M187 84v24M201 84v24M180 94h36" fill="none" stroke="#c99b35" strokeWidth="3" />
      <path d="M65 99v76M27 137h76M195 99v76M157 137h76" fill="none" stroke="#9ab0b8" strokeWidth="2" />
    </Picture>
  ),
  dinosauro: (
    <Picture>
      <path d="M76 131c-31 3-49-6-61-25 24 4 39-3 53-17" fill="#62c777" />
      <ellipse cx="120" cy="124" rx="60" ry="41" fill="#62c777" />
      <path d="M151 121c9-30 2-73 27-88 20-12 45 2 43 25-2 20-18 28-38 24l-5 54" fill="#62c777" />
      <path d="M83 145l-8 28h33l10-27M139 145l4 28h34l-14-34" fill="#62c777" />
      <path d="M79 91l4-20 16 12M107 80l8-20 14 15M137 79l12-18 11 18" fill="#ffd84d" />
      <circle cx="199" cy="50" r="4.5" fill={ink} stroke="none" />
      <path d="M202 67c6 3 12 2 16-2" fill="none" strokeWidth="3" />
      <circle cx="202" cy="64" r="6" fill="#f3a58d" stroke="none" opacity="0.7" />
      <circle cx="104" cy="113" r="10" fill="#429e62" stroke="none" />
      <circle cx="136" cy="132" r="8" fill="#429e62" stroke="none" />
      <path d="M94 135c14 11 35 14 54 7" fill="none" stroke="#8fdc83" strokeWidth="6" />
      <path d="M67 174h110" fill="none" />
    </Picture>
  ),
};

const labels: Record<IllustrationName, string> = {
  casa: 'Una casa',
  sole: 'Il sole',
  mela: 'Una mela',
  gatto: 'Un gatto',
  cane: 'Un cane',
  luna: 'La luna',
  palla: 'Una palla',
  nave: 'Una nave',
  fiore: 'Un fiore',
  pesce: 'Un pesce',
  albero: 'Un albero',
  libro: 'Un libro',
  gelato: 'Un gelato',
  fungo: 'Un fungo',
  tartaruga: 'Una tartaruga',
  elefante: 'Un elefante',
  aquilone: 'Un aquilone',
  bicicletta: 'Una bicicletta',
  dinosauro: 'Un dinosauro',
};

export default function WordPicture({ name }: { name: IllustrationName }) {
  return (
    <svg
      className="word-picture"
      viewBox="0 0 260 205"
      role="img"
      aria-label={labels[name]}
    >
      <title>{labels[name]}</title>
      {pictures[name]}
    </svg>
  );
}
