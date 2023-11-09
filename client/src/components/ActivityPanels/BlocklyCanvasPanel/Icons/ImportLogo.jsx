import React from 'react';

const ImportLogo = ( ) => {
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
       width="512" 
       height="512"
       viewBox="0 0 512 512"
       version="1.1"
       onClick={onButtonClick}>

      <path d="" stroke="none" fill="#080404" fill-rule="evenodd"/>
      <path d="M 250.381 85.910 C 248.665 86.956, 246.753 89.271, 246.131 91.055 C 245.325 93.366, 245 118.168, 245 177.368 L 245 260.439 223.697 239.219 L 202.394 218 197.774 218 C 193.948 218, 192.625 218.529, 190.077 221.077 C 187.522 223.632, 187 224.944, 187 228.809 L 187 233.465 218.750 265.173 C 239.633 286.029, 251.441 297.110, 253.250 297.549 C 254.762 297.916, 257.237 297.918, 258.750 297.554 C 260.561 297.117, 271.798 286.585, 291.673 266.695 C 317.699 240.649, 321.939 235.988, 322.529 232.775 C 323.786 225.932, 318.494 220.047, 311.056 220.015 C 307.906 220.001, 305.872 221.732, 287.306 240.218 L 267 260.436 267 176.783 C 267 124.860, 266.630 92.157, 266.025 90.566 C 264.865 87.514, 259.504 84.007, 256 84.007 C 254.625 84.007, 252.096 84.863, 250.381 85.910 M 99.348 153.420 C 81.587 157.728, 67.373 171.986, 61.335 191.552 C 59.625 197.095, 59.500 202.539, 59.500 271.500 C 59.500 340.461, 59.625 345.905, 61.335 351.448 C 67.538 371.549, 82.440 386.066, 100.799 389.895 C 107.822 391.360, 404.242 391.461, 412.114 390.001 C 430.888 386.520, 447.790 369.721, 452.463 349.897 C 454.708 340.369, 454.708 202.631, 452.463 193.103 C 447.790 173.279, 430.888 156.480, 412.114 152.999 C 409.151 152.449, 393.694 152, 377.765 152 C 353.715 152, 348.250 152.262, 345.546 153.545 C 337.627 157.303, 337.627 168.697, 345.546 172.455 C 348.254 173.740, 353.760 174, 378.223 174 C 411.529 174, 413.720 174.361, 421.388 181.111 C 423.898 183.320, 427.128 187.598, 428.694 190.786 L 431.500 196.500 431.500 271.500 L 431.500 346.500 428.694 352.214 C 427.123 355.414, 423.897 359.681, 421.364 361.910 C 412.658 369.574, 425.236 369.056, 254.954 368.763 L 102.500 368.500 98.387 366.300 C 92.571 363.188, 85.481 354.915, 83.320 348.720 C 81.625 343.859, 81.500 338.555, 81.500 271.500 C 81.500 189.714, 81.145 193.505, 89.708 183.980 C 98.252 174.476, 97.818 174.573, 134.680 174 C 165.408 173.523, 166.986 173.405, 169.671 171.398 C 175.447 167.082, 175.140 158.359, 169.070 154.268 C 165.746 152.028, 165.323 152.001, 135.102 152.085 C 114.314 152.143, 102.848 152.571, 99.348 153.420" stroke="none" fill="#040404" fill-rule="evenodd"/>
      <input type='file' id='file' ref={outFile} style={{display: 'none'}}/>
      

    </svg>
  );
};

export default ImportLogo;
